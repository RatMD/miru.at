import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vitepress';
import websitePackage from '../package.json' with { type: 'json' };
import { isIndexable, pageSeoHead, proseDescription, siteUrl } from './seo.ts';
import { bootstrapScript } from './theme/colors/engine.ts';

// Read authored CSS directly so the first paint matches the client-side scheme selector.
const schemeStyles = Object.fromEntries(
    Object.entries({
        original: 'original',
        miru: 'modern',
        aurora: 'northern-lights',
        lagoon: 'lagoon',
        rose: 'rosewood',
        citrus: 'golden-hour',
    }).map(([id, name]) => [
        id,
        readFileSync(new URL(`../../package/src/themes/${name}.css`, import.meta.url), 'utf8'),
    ]),
);
const miruDependency = websitePackage.dependencies['@rat.md/miru'];
const localMiru = miruDependency.startsWith('file:');

export default defineConfig({
    srcDir: 'docs',
    title: 'Miru',
    titleTemplate: ':title · @rat.md/miru',
    description:
        'Thoughtfully crafted Vue components, expressive forms, and application layouts. Build interfaces that feel like you.',
    lang: 'en',
    cleanUrls: true,
    vue: {
        // Use the same scoped CSS identifiers in client and SSR compilation.
        features: { componentIdGenerator: 'filepath' },
    },
    sitemap: {
        hostname: siteUrl,

        /**
         * Normalize sitemap entries using the canonical URL rules.
         * @param items
         * @returns
         */
        transformItems: (items) => items.filter((item) => isIndexable(item.url)),
    },

    /**
     * Attach page-specific SEO metadata before rendering.
     * @param pageData
     * @param siteConfig
     */
    transformPageData(pageData, { siteConfig }) {
        const section = pageData.relativePath.match(/^docs\/(plugins|support|composables)\//)?.[1];
        if (section && pageData.titleTemplate === undefined) {
            const label = { plugins: 'Plugins', support: 'Support', composables: 'Composables' }[
                section
            ];
            pageData.titleTemplate = `:title · ${label} · @rat.md/miru`;
        }
        if (!pageData.description && pageData.relativePath !== '404.md') {
            const source = readFileSync(resolve(siteConfig.srcDir, pageData.filePath), 'utf8');
            pageData.description = proseDescription(source, pageData.title);
        }
        // Frontmatter head is included in SSR and managed by VitePress on client navigation.
        const generated = pageSeoHead(pageData, siteConfig.site);
        const keys = new Set(
            generated.map(([tag, attrs]) => `${tag}:${attrs.name || attrs.property || attrs.rel}`),
        );
        const authored = (pageData.frontmatter.head || []).filter(
            ([tag, attrs]: [string, Record<string, string>]) =>
                !keys.has(`${tag}:${attrs.name || attrs.property || attrs.rel}`),
        );
        pageData.frontmatter.head = [...authored, ...generated];
    },
    appearance: { initialValue: 'dark', disableTransition: false },
    head: [
        [
            'script',
            {
                defer: '',
                src: 'https://sys.pytes.net/script.js',
                'data-website-id': '04fe2471-4013-4fe8-b7b1-676d4101a72d',
            },
        ],
        ['script', { id: 'miru-color-bootstrap' }, bootstrapScript(schemeStyles)],
        ['meta', { name: 'theme-color', content: '#101113' }],
        ['meta', { name: 'application-name', content: 'miru.' }],
        ['meta', { name: 'apple-mobile-web-app-title', content: 'miru.' }],
        ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
        ['link', { rel: 'sitemap', type: 'application/xml', href: '/sitemap.xml' }],
        ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
        ['link', { rel: 'icon', type: 'image/x-icon', sizes: '32x32', href: '/favicon.ico' }],
        ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon.png' }],
        [
            'link',
            {
                id: 'miru-favicon',
                rel: 'icon',
                type: 'image/svg+xml',
                sizes: 'any',
                href: '/miru-mark-squircle.svg',
            },
        ],
    ],
    vite: {
        optimizeDeps: {
            // Local builds change exports without a new dependency version/hash.
            // Serve their ESM directly instead of retaining a prebundled snapshot.
            exclude: localMiru ? ['@rat.md/miru'] : [],
            include: [
                ...(localMiru
                    ? [
                          '@rat.md/miru > dayjs',
                          '@rat.md/miru > dayjs/plugin/advancedFormat.js',
                          '@rat.md/miru > dayjs/plugin/duration.js',
                          '@rat.md/miru > dayjs/plugin/isoWeek.js',
                          '@rat.md/miru > dayjs/plugin/relativeTime.js',
                          '@rat.md/miru > dayjs/plugin/timezone.js',
                          '@rat.md/miru > dayjs/plugin/utc.js',
                          '@rat.md/miru > dayjs/locale/de.js',
                      ]
                    : [
                          '@rat.md/miru',
                          '@rat.md/miru/miru',
                          '@rat.md/miru/composables',
                          '@rat.md/miru/support',
                          '@rat.md/miru/layouts',
                      ]),
                'codemirror',
                '@codemirror/state',
                '@codemirror/view',
                '@codemirror/language',
                '@codemirror/commands',
                '@lezer/highlight',
                '@codemirror/lang-vue',
                '@codemirror/lang-css',
                '@vue/compiler-sfc',
                'sucrase',
                'zod',
            ],
        },
        resolve: {
            dedupe: [
                'vue',
                'reka-ui',
                '@vueuse/core',
                '@codemirror/state',
                '@codemirror/view',
                '@codemirror/language',
                '@lezer/common',
                '@lezer/highlight',
            ],
        },
        ssr: { noExternal: ['@rat.md/miru'] },
        server: { fs: { allow: ['..'] } },
    },
    markdown: {
        headers: true,
        preWrapper: false,

        /**
         * Leave fenced code rendering to the shared documentation renderer.
         * @returns
         */
        highlight: () => '',

        /**
         * Configure Markdown rendering for the documentation.
         * @param md
         */
        config(md) {
            // Preserve the original source and safely pass it to the shared read-only viewer.
            md.renderer.rules.fence = (tokens, index) => {
                const token = tokens[index];
                const language = token.info.trim().split(/\s+/)[0] || 'text';
                const code = md.utils.escapeHtml(JSON.stringify(token.content));

                return `<ReadonlyCode :code="${code}" language="${md.utils.escapeHtml(language)}" />\n`;
            };
            const parts = {
                table: 'MiruDocTable',
                thead: 'MiruDocTableHeader',
                tbody: 'MiruDocTableBody',
                tr: 'MiruDocTableRow',
                th: 'MiruDocTableHead',
                td: 'MiruDocTableCell',
            };
            for (const [tag, component] of Object.entries(parts)) {
                md.renderer.rules[`${tag}_open`] = (tokens, index) => {
                    const style = tokens[index].attrGet('style') || '';
                    const align = style.match(/text-align:\s*(left|center|right)/)?.[1];
                    const attrs =
                        tag === 'table'
                            ? ' class="documentation-table w-full" table-class="w-full"'
                            : align
                              ? ` align="${align}"`
                              : '';

                    return `<${component}${attrs}>\n`;
                };
                md.renderer.rules[`${tag}_close`] = () => `</${component}>\n`;
            }
        },
    },
});
