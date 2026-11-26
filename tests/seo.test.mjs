/**
 * Check canonical URL rules and page description extraction.
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import {
    canonicalPath,
    isIndexable,
    pageSeoHead,
    pageTitle,
    proseDescription,
} from '../.vitepress/seo.ts';

test('canonical URLs and sitemap paths use the same clean URL rules', () => {
    for (const [file, expected] of [
        ['index.md', '/'],
        ['', '/'],
        ['components/index.md', '/components/'],
        ['docs/guide/installation.html', '/docs/guide/installation'],
        ['playgrounds.md', '/playground'],
        ['examples.md', '/playground'],
    ]) {
        assert.equal(canonicalPath(file), expected);
    }
    for (const file of ['404.html', '/playground/preview', 'playgrounds.md', 'examples.md']) {
        assert.equal(isIndexable(file), false);
    }
    assert.equal(isIndexable('playground.md'), true);
    assert.equal(isIndexable('components/button.md'), true);
});

test('page metadata follows the current route, title template and indexability', () => {
    const site = {
        title: 'Miru',
        titleTemplate: ':title · @rat.md/miru',
        description: 'Vue components.',
    };
    const page = {
        relativePath: 'components/button.md',
        title: 'Button',
        description: 'Accessible buttons for Vue.',
    };

    /**
     * Read the current value exposed by the reactive model.
     * @param head
     * @param name
     * @returns
     */
    const get = (head, name) =>
        head.find(
            ([, attrs]) => attrs.name === name || attrs.property === name || attrs.rel === name,
        )?.[1];
    const button = pageSeoHead(page, site);
    assert.equal(get(button, 'canonical').href, 'https://miru.at/components/button');
    assert.equal(get(button, 'og:title').content, 'Button · @rat.md/miru');
    assert.equal(get(button, 'og:description').content, page.description);
    const themes = pageSeoHead({ ...page, relativePath: 'themes.md', title: 'Themes' }, site);
    assert.equal(get(themes, 'canonical').href, 'https://miru.at/themes');
    assert.equal(get(themes, 'twitter:title').content, 'Themes · @rat.md/miru');
    const alias = pageSeoHead({ ...page, relativePath: 'examples.md' }, site);
    assert.equal(get(alias, 'canonical').href, 'https://miru.at/playground');
    assert.equal(get(alias, 'robots').content, 'noindex, follow');
    const missing = pageSeoHead({ ...page, relativePath: '404.md' }, site);
    assert.equal(missing.length, 1);
    assert.equal(get(missing, 'robots').content, 'noindex, follow');
    assert.equal(pageTitle({ ...page, titleTemplate: false }, site), 'Button');
    assert.equal(
        pageTitle({ ...page, titleTemplate: ':title · Plugins · @rat.md/miru' }, site),
        'Button · Plugins · @rat.md/miru',
    );
});

test('description extraction skips frontmatter, comments, headings, UI and fenced code', () => {
    const markdown =
        '---\ntitle: Button\n---\n\n<!-- generated -->\n\n# Button\n\n<ComponentExample />\n\n```vue\nimport Example from "example";\n```\n\nUse **Button** with [Vue](https://vuejs.org) and `TypeScript`.\n\nMore details.';
    assert.equal(
        proseDescription(markdown, 'Button'),
        'Button: Use Button with Vue and TypeScript.',
    );
    assert.ok(proseDescription('<ComponentCatalogue />', 'Components').includes('Components'));
    const result = proseDescription('A long paragraph '.repeat(30), 'Example');
    assert.ok(result.length <= 165);
    assert.ok(result.endsWith('…'));
});
