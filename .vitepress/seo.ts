import type { HeadConfig } from 'vitepress';

/** Shared URL rules for canonical links, social cards and the sitemap. */
export const siteUrl = 'https://miru.at';

/**
 * Normalize a source file into a public page path.
 * @param file
 * @returns
 */
export function pagePath(file: string): string {
    return (
        '/' +
        file
            .replace(/^\//, '')
            .replace(/(^|\/)index\.(md|html)$/, '$1')
            .replace(/\.(md|html)$/, '')
    );
}

/**
 * Resolve the canonical URL path for a documentation page.
 * @param file
 * @returns
 */
export function canonicalPath(file: string): string {
    return pagePath(file);
}

/**
 * Decide whether a page belongs in the public search index and sitemap.
 * @param file
 * @returns
 */
export function isIndexable(file: string): boolean {
    return !['/404', '/playground/preview'].includes(pagePath(file));
}

type SeoPage = {
    relativePath: string;
    title: string;
    description: string;
    titleTemplate?: string | boolean;
};
type SeoSite = { title: string; description: string; titleTemplate?: string | boolean };

/**
 * Build the page title using its content and site metadata.
 * @param page
 * @param site
 * @returns
 */
export function pageTitle(page: SeoPage, site: SeoSite): string {
    const title = page.title || site.title;
    const template = page.titleTemplate ?? site.titleTemplate;
    if (typeof template === 'string' && template.includes(':title')) {
        return template.replace(/:title/g, () => title);
    }
    if (template === false || template === site.title) {
        return title;
    }
    const suffix = typeof template === 'string' ? template : site.title;

    return title === suffix ? title : `${title} | ${suffix}`;
}

/**
 * Build canonical links and social metadata for a rendered page.
 * @param page
 * @param site
 * @returns
 */
export function pageSeoHead(page: SeoPage, site: SeoSite): HeadConfig[] {
    const robots: HeadConfig = [
        'meta',
        {
            name: 'robots',
            content: isIndexable(page.relativePath)
                ? 'index, follow, max-image-preview:large'
                : 'noindex, follow',
        },
    ];
    if (page.relativePath === '404.md') {
        return [robots];
    }
    const title = pageTitle(page, site);
    const description = page.description || site.description;
    const url = new URL(canonicalPath(page.relativePath), siteUrl).href;
    const alt =
        'Miru: Components with character. A turquoise 3D m on a dark perspective grid, with Vue, Tailwind and TypeScript logos.';

    return [
        robots,
        ['link', { rel: 'canonical', href: url }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:site_name', content: 'miru.' }],
        ['meta', { property: 'og:title', content: title }],
        ['meta', { property: 'og:description', content: description }],
        ['meta', { property: 'og:url', content: url }],
        ['meta', { property: 'og:image', content: `${siteUrl}/social/miru-og-1200x630.jpg` }],
        ['meta', { property: 'og:image:type', content: 'image/jpeg' }],
        ['meta', { property: 'og:image:width', content: '1200' }],
        ['meta', { property: 'og:image:height', content: '630' }],
        ['meta', { property: 'og:image:alt', content: alt }],
        ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
        ['meta', { name: 'twitter:title', content: title }],
        ['meta', { name: 'twitter:description', content: description }],
        ['meta', { name: 'twitter:image', content: `${siteUrl}/social/miru-twitter-1200x600.jpg` }],
        ['meta', { name: 'twitter:image:alt', content: alt }],
    ];
}

/**
 * Prefer authored descriptions; otherwise use the first prose paragraph.
 * @param markdown
 * @param title
 * @returns
 */
export function proseDescription(markdown: string, title: string): string {
    const prose = markdown
        .replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, '')
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/^(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1[^\n]*$/gm, '')
        .split(/\r?\n\s*\r?\n/)
        .map((paragraph) => paragraph.trim())
        .find((paragraph) => /^[\p{L}]/u.test(paragraph) && !paragraph.includes('|'));
    const text = (
        prose || `Explore ${title} in miru., with Vue components, examples and API documentation.`
    )
        .replace(/!?\[([^\]]+)\]\([^)]*\)/g, '$1')
        .replace(/<[^>]*>/g, '')
        .replace(/[`*_]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    const summary = prose ? `${title}: ${text}` : text;

    return summary.length <= 165 ? summary : summary.slice(0, 162).replace(/\s+\S*$/, '') + '…';
}
