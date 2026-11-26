/**
 * Check documentation coverage, canonical navigation and component examples.
 */

import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { componentPageOwner, componentReferenceLink } from '../.vitepress/theme/component-pages.ts';
import {
    canonicalDocumentationUrl,
    legacyDocumentationRedirect,
} from '../.vitepress/theme/legacy-routes.ts';
import { examples } from '../.vitepress/theme/playground/examples.ts';
import {
    buildComponentCatalogue,
    discoverStories,
    exportModules,
    sourceFiles,
    packageSource,
    storyMeta,
} from '../scripts/package-inventory.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));

/**
 * Read and parse a JSON fixture.
 * @param file
 * @returns
 */
const json = async (file) => JSON.parse(await readFile(path.join(root, file), 'utf8'));

test('retired documentation URLs resolve to current pages and preserve reference sections', () => {
    assert.equal(canonicalDocumentationUrl('/guide/installation'), '/docs/guide/installation');
    assert.equal(canonicalDocumentationUrl('/reference/theming'), '/docs/guide/theming');
    assert.equal(
        canonicalDocumentationUrl('/components/api/accordion-content#props'),
        componentReferenceLink('AccordionContent') + '-props',
    );
    assert.equal(
        canonicalDocumentationUrl('/guide/installation?from=bookmark#requirements'),
        '/docs/guide/installation?from=bookmark#requirements',
    );
    assert.equal(legacyDocumentationRedirect('/components/accordion'), undefined);
    assert.equal(legacyDocumentationRedirect('/unknown-page'), undefined);
});

test('Storybook metadata ignores nested example titles and unwraps typed components', () => {
    assert.deepEqual(
        storyMeta(
            `const meta = {title: 'Overlay/Dialog', component: Dialog as unknown as ComponentOptions, args: {title: 'Wrong/Category'}} satisfies Meta;`,
        ),
        { title: 'Overlay/Dialog', component: 'Dialog' },
    );
    assert.deepEqual(
        exportModules(
            `export * from './components/button'; export type { Shape } from './components/shape';`,
            './components/',
        ),
        ['button'],
    );
});
test('the catalogue covers public exports and follows each current Storybook category', async () => {
    const api = await json('.vitepress/theme/component-api.json');
    const catalogue = await buildComponentCatalogue(api);
    assert.equal(catalogue.length, Object.values(api).flat().length);
    assert.equal(new Set(catalogue.map((item) => item.link)).size, catalogue.length);
    for (const story of await discoverStories()) {
        if (!story.component || !catalogue.some((item) => item.name === story.component)) {
            continue;
        }
        if (story.title === 'Forms/Generator' || story.title === 'Extensions/FormGenerator') {
            continue;
        }
        const entry = catalogue.find((item) => item.name === story.component);
        assert.equal(entry.category, story.category, story.title);
        assert.ok(entry.primary, story.title);
    }
    assert.equal(catalogue.find((item) => item.name === 'FormSectionRenderer').category, 'Forms');
    for (const name of ['AuthPage', 'DashboardPage', 'PageRoot', 'FloatingAppBar']) {
        assert.ok(catalogue.find((item) => item.name === name)?.layout, name);
    }
});
test('every primary component and layout has a complete composition example', async () => {
    const catalogue = await json('.vitepress/theme/component-catalogue.json');
    for (const item of catalogue.filter((item) => item.primary)) {
        assert.ok(
            examples[item.name] ||
                catalogue.some((other) => other.module === item.module && examples[other.name]),
            item.name,
        );
        const page = await readFile(path.join(root, 'docs', item.link + '.md'), 'utf8');
        if (componentPageOwner(item.name)) {
            assert.match(page, /componentPage: overview/, item.name);
            const reference = componentReferenceLink(item.name).split('#')[0];
            const apiPage = await readFile(path.join(root, 'docs', reference + '.md'), 'utf8');
            assert.match(apiPage, new RegExp(`<ComponentApi name="${item.name}"`), item.name);
        } else {
            assert.match(page, new RegExp(`<ComponentMeta name="${item.name}"`), item.name);
            assert.ok(page.indexOf('## Preview') < page.indexOf('## API'), item.name);
        }
        if (item.name === 'ContextProvider') {
            assert.match(page, /```vue[\s\S]*<ContextProvider/, item.name);
        } else {
            assert.match(page, new RegExp(`<ComponentExample name="${item.name}"`), item.name);
        }
        assert.doesNotMatch(page, /::: details Props/, item.name);
    }
});
test('documentation navigation covers all public composable/support modules and plugin guides', async () => {
    const groups = await json('.vitepress/theme/documentation-groups.json');
    for (const [module, title] of [
        ['composables', 'Composables'],
        ['support', 'Support'],
    ]) {
        const source = await readFile(path.join(packageSource, module, 'index.ts'), 'utf8');
        const links = groups.find((group) => group.title === title).items.map((item) => item.link);
        for (const name of exportModules(source, './')) {
            assert.ok(links.includes(`/docs/${module}/${name}`), name);
        }
    }
    for (const file of await sourceFiles(path.join(packageSource, 'docs/plugins'), '.mdx')) {
        assert.ok(
            groups
                .find((group) => group.title === 'Plugins')
                .items.some((item) => item.link.endsWith('/' + path.basename(file, '.mdx'))),
        );
    }
});
test('source guides keep balanced copyable code fences', async () => {
    for (const file of await sourceFiles(path.join(packageSource, 'docs'), '.mdx')) {
        const source = await readFile(file, 'utf8');
        assert.equal((source.match(/^```/gm) || []).length % 2, 0, file);
    }
});

test('dependency lists sort every group by name on both documentation sites', async () => {
    const { componentDependenciesMarkdown } =
        await import('../../package/src/stories/component-dependencies.ts');
    const dependencies = {
        components: [
            { name: 'Zulu', url: '/z', storybook: '/docs/z' },
            { name: 'alpha', url: '/a', storybook: '/docs/a' },
        ],
        packages: ['vue', 'clsx', '@tabler/icons-vue'],
        primitives: [
            { name: 'Zebra', url: 'https://example.com/z' },
            { name: 'Apple', url: 'https://example.com/a' },
        ],
    };
    for (const storybook of [false, true]) {
        const markdown = componentDependenciesMarkdown(dependencies, storybook);
        assert.ok(markdown.indexOf('[alpha]') < markdown.indexOf('[Zulu]'));
        assert.ok(markdown.indexOf('[@tabler/icons-vue]') < markdown.indexOf('[clsx]'));
        assert.ok(markdown.indexOf('[clsx]') < markdown.indexOf('[vue]'));
        assert.ok(markdown.indexOf('[Apple]') < markdown.indexOf('[Zebra]'));
        assert.ok(markdown.includes(storybook ? '[alpha](/docs/a)' : '[alpha](/a)'));
    }
    assert.equal(dependencies.components[0].name, 'Zulu');
    for (const family of ['accordion', 'alert', 'anchor']) {
        const module = await import(`../../package/src/stories/${family}-documentation.ts`);
        for (const storybook of [false, true]) {
            for (const line of module[family + 'DependencyMarkdown'](storybook).split('\n')) {
                const names = [...line.matchAll(/\[([^\]]+)\]\(/g)].map((match) => match[1]);
                assert.deepEqual(
                    names,
                    [...names].sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' })),
                );
            }
        }
    }
});
