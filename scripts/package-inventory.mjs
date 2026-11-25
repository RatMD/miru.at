import { readFile, readdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const packageSource = fileURLToPath(new URL('../../package/src/', import.meta.url));
const require = createRequire(new URL('../../package/package.json', import.meta.url));
import { componentSince } from '../../package/src/stories/component-documentation.ts';
import {
    componentPages,
    componentPageOwner,
    componentReferenceLink,
} from '../.vitepress/theme/component-pages.ts';
import { componentSummary } from './component-copy.mjs';
const ts = require('typescript');
export const categoryOrder = [
    'Components',
    'Forms',
    'FormFields',
    'Overlays',
    'Utilities',
    'Extensions',
    'Layouts',
];
export async function sourceFiles(directory, suffix) {
    const entries = await readdir(directory, { withFileTypes: true });
    return (
        await Promise.all(
            entries.map((entry) =>
                entry.isDirectory()
                    ? sourceFiles(path.join(directory, entry.name), suffix)
                    : entry.name.endsWith(suffix)
                      ? [path.join(directory, entry.name)]
                      : [],
            ),
        )
    )
        .flat()
        .sort();
}
export function parseSource(source) {
    return ts.createSourceFile('index.ts', source, ts.ScriptTarget.Latest, true);
}
export function exportModules(source, prefix) {
    return [
        ...new Set(
            parseSource(source)
                .statements.filter(
                    (s) =>
                        ts.isExportDeclaration(s) &&
                        !s.isTypeOnly &&
                        s.moduleSpecifier &&
                        ts.isStringLiteral(s.moduleSpecifier) &&
                        s.moduleSpecifier.text.startsWith(prefix),
                )
                .map((s) => s.moduleSpecifier.text.slice(prefix.length)),
        ),
    ];
}
const unwrap = (node) => {
    while (
        node &&
        (ts.isAsExpression(node) ||
            ts.isSatisfiesExpression(node) ||
            ts.isParenthesizedExpression(node))
    )
        node = node.expression;
    return node;
};
export function storyMeta(source) {
    const file = parseSource(source);
    for (const statement of file.statements) {
        const candidates = ts.isVariableStatement(statement)
            ? statement.declarationList.declarations.map((d) => d.initializer)
            : ts.isExportAssignment(statement)
              ? [statement.expression]
              : [];
        for (const candidate of candidates) {
            const object = unwrap(candidate);
            if (!object || !ts.isObjectLiteralExpression(object)) continue;
            const property = (name) =>
                object.properties.find(
                    (p) => ts.isPropertyAssignment(p) && p.name?.getText(file) === name,
                )?.initializer;
            const title = property('title');
            const id = property('id');
            const component = unwrap(property('component'));
            if (title && ts.isStringLiteral(title) && title.text.includes('/')) {
                return {
                    title: title.text,
                    ...(id && ts.isStringLiteral(id) ? { id: id.text } : {}),
                    component: component && ts.isIdentifier(component) ? component.text : null,
                };
            }
        }
    }
    return null;
}
export async function discoverStories() {
    const stories = [];
    for (const file of await sourceFiles(packageSource, '.stories.ts')) {
        const source = await readFile(file, 'utf8');
        const meta = storyMeta(source);
        if (!meta) continue;
        const relative = path.relative(packageSource, file).replaceAll('\\', '/');
        const module = relative.startsWith('components/') ? relative.split('/')[1] : 'layouts';
        stories.push({
            ...meta,
            preview: (() => {
                const exports = [...source.matchAll(/export const (\w+)/g)].map(
                    (match) => match[1],
                );
                const story = exports.includes('Default') ? 'Default' : exports[0];
                if (!story)
                    return `https://storybook.miru.at/?path=/docs/${meta.id || meta.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}--docs`;
                const storyId = story.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
                return `https://storybook.miru.at/?path=/story/${meta.id || meta.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}--${storyId}`;
            })(),
            module,
            file: relative,
            category: meta.title.split('/')[0],
            label: meta.title.split('/').at(-1),
        });
    }
    stories.push({
        title: 'Utilities/ContextProvider',
        component: 'ContextProvider',
        preview: 'https://storybook.miru.at/?path=/docs/utilities-contextprovider--docs',
        module: 'provider',
        file: 'docs/context-provider.mdx',
        category: 'Utilities',
        label: 'ContextProvider',
    });
    return stories;
}
export async function buildComponentCatalogue(api) {
    const stories = await discoverStories();
    const { version } = JSON.parse(
        await readFile(new URL('../../package/package.json', import.meta.url), 'utf8'),
    );
    const publicComponents = Object.entries(api).flatMap(([module, entries]) =>
        entries.map((component) => ({ module, api: component })),
    );
    const catalogue = publicComponents.map(({ module, api: component }) => {
        // FormGenerator is a composition, not a separate Vue export.
        const story =
            component.name === 'FormSectionRenderer'
                ? stories.find((s) => s.title === 'Forms/Generator')
                : stories.find(
                      (s) => s.component === component.name && s.label === component.name,
                  ) ||
                  stories.find(
                      (s) =>
                          s.component === component.name &&
                          !s.title.endsWith('/Generator') &&
                          !s.title.endsWith('/FormGenerator'),
                  );
        const family = stories.find((s) => s.module === module);
        const category =
            story?.category || family?.category || (module === 'layouts' ? 'Layouts' : 'Utilities');
        const layout = category === 'Layouts';
        const slug = component.name
            .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
            .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
            .toLowerCase();
        return {
            name: component.name,
            version,
            since: componentSince[component.name] || null,
            storybook: story?.preview || family?.preview || null,
            description: componentSummary(
                component.name,
                module,
                !!story || module === 'layouts' || module === 'provider',
            ),
            title: story?.label || component.name,
            module,
            category,
            primary: !!story || module === 'layouts' || module === 'provider',
            layout,
            story: story?.title || null,
            link:
                componentPages[component.name]?.base ??
                (componentPageOwner(component.name)
                    ? componentReferenceLink(component.name)
                    : `/${layout ? 'layouts' : 'components'}/api/${slug}`),
        };
    });
    catalogue.sort(
        (a, b) =>
            categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category) ||
            Number(b.primary) - Number(a.primary) ||
            a.title.localeCompare(b.title),
    );
    return catalogue;
}
