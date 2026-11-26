/**
 * Validate the metadata and public assets of the production website.
 *
 * Reads .vitepress/dist after a production build and checks titles, descriptions, canonical URLs, social cards, icons and sitemap entries.
 *
 * Run with npm run seo:check. A missing or inconsistent output fails the command.
 */

import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { canonicalPath, isIndexable, siteUrl } from '../.vitepress/seo.ts';

const root = process.argv[2]
    ? resolve(process.argv[2])
    : fileURLToPath(new URL('../.vitepress/dist/', import.meta.url));

/**
 * Read the requested fixture or generated file.
 * @param file
 * @returns
 */
const read = (file) => readFileSync(resolve(root, file), 'utf8');

/**
 * Decode HTML entities before validating metadata.
 * @param text
 * @returns
 */
const decode = (text) =>
    text.replace(
        /&(?:amp|quot|apos|lt|gt|#39|#x27);/g,
        (entity) =>
            ({
                '&amp;': '&',
                '&quot;': '"',
                '&apos;': "'",
                '&#39;': "'",
                '&#x27;': "'",
                '&lt;': '<',
                '&gt;': '>',
            })[entity],
    );
const sitemap = read('sitemap.xml');
assert.ok(sitemap.includes('http://www.sitemaps.org/schemas/sitemap/0.9'));
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decode(match[1]));
assert.equal(new Set(urls).size, urls.length, 'duplicate sitemap URLs');
const expectedUrls = new Set();
const titles = new Map();
const descriptions = new Set();
const pages = readdirSync(root, { recursive: true }).filter((file) => file.endsWith('.html'));
const styles = readdirSync(resolve(root, 'assets'))
    .filter((file) => file.endsWith('.css'))
    .map((file) => read(`assets/${file}`))
    .join('\n');
for (const file of pages) {
    const html = read(file);
    const head = html.split('</head>')[0];
    for (const className of ['component-page-header', 'miru-mark', 'themes-stage']) {
        const tag = html.match(new RegExp(`<[^>]+class="${className}"[^>]*>`))?.[0];
        if (!tag) {
            continue;
        }
        const scopes = [...tag.matchAll(/data-v-[a-f\d]+/g)].map((match) => match[0]);
        assert.ok(
            scopes.some((scope) => styles.includes(`.${className}[${scope}]`)),
            `${file}: matching SSR/CSS scope for ${className}`,
        );
    }
    assert.match(html, /<html[^>]+lang="en"/, `${file}: English language`);
    assert.match(head, /<meta[^>]+charset="utf-8"/, `${file}: UTF-8`);
    assert.match(
        head,
        /name="viewport"[^>]+content="width=device-width,initial-scale=1"/,
        `${file}: responsive viewport`,
    );
    const elements = [...head.matchAll(/<(?:meta|link)\s+[^>]+>/g)].map((match) => {
        return Object.fromEntries(
            [...match[0].matchAll(/([\w:-]+)="([^"]*)"/g)].map((attr) => [
                attr[1],
                decode(attr[2]),
            ]),
        );
    });

    /**
     * Read one unique metadata value from the rendered page.
     * @param key
     * @returns
     */
    const meta = (key) => {
        const matches = elements.filter((item) => item.name === key || item.property === key);
        assert.equal(matches.length, 1, `${file}: ${key}`);

        return matches[0].content;
    };
    const robots = meta('robots');
    if (file === '404.html') {
        assert.ok(robots.includes('noindex'), file);
        continue;
    }
    const title = decode(head.match(/<title>([^<]+)<\/title>/)?.[1] || '');
    assert.ok(title.length > 0, `${file}: title`);
    const description = meta('description');
    assert.ok(description.length >= 30, `${file}: useful description`);
    assert.equal(meta('og:title'), title, file);
    assert.equal(meta('twitter:title'), title, file);
    assert.equal(meta('og:description'), description, file);
    assert.equal(meta('twitter:description'), description, file);
    const url = new URL(canonicalPath(file.replaceAll('\\', '/')), siteUrl).href;
    const canonical = elements.filter((item) => item.rel === 'canonical');
    assert.equal(canonical.length, 1, `${file}: one canonical`);
    assert.equal(canonical[0].href, url, file);
    assert.equal(meta('og:url'), url, file);
    assert.equal(meta('twitter:card'), 'summary_large_image', file);
    for (const key of ['og:image', 'twitter:image']) {
        const image = new URL(meta(key));
        assert.equal(image.origin, siteUrl, file);
        assert.ok(readFileSync(resolve(root, image.pathname.slice(1))).length > 0, key);
        assert.ok(meta(`${key}:alt`).length > 0, file);
    }
    for (const link of elements.filter((item) =>
        ['icon', 'apple-touch-icon', 'manifest'].includes(item.rel),
    )) {
        assert.ok(readFileSync(resolve(root, link.href.slice(1))).length > 0, file);
    }
    if (isIndexable(file.replaceAll('\\', '/'))) {
        const main = (html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/) || [])[1] || '';
        const content = main.replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/g, '');
        assert.equal(
            (content.match(/<h1\b/g) || []).length,
            1,
            `${file}: one server-rendered main heading`,
        );
        assert.ok(
            content
                .replace(/<[^>]*>/g, ' ')
                .replace(/\s+/g, ' ')
                .trim().length >= 80,
            `${file}: server-rendered page content`,
        );
        assert.ok(!robots.includes('noindex'), file);
        assert.ok(!titles.has(title), `duplicate title: ${file} and ${titles.get(title)}`);
        titles.set(title, file);
        descriptions.add(description);
        expectedUrls.add(url);
    } else {
        assert.ok(robots.includes('noindex'), file);
    }
}
assert.deepEqual(new Set(urls), expectedUrls, 'sitemap matches all indexable canonical pages');
assert.match(
    read('robots.txt'),
    /User-agent: \*\s+Allow: \/\s+Sitemap: https:\/\/miru\.at\/sitemap\.xml/,
);
console.log(
    `SEO verified: ${pages.length} HTML pages, ${urls.length} canonical sitemap URLs with static headings/content, ${descriptions.size} distinct descriptions, responsive viewport, social images, icons and robots.txt.`,
);
