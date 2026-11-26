# Miru website

Custom VitePress theme, built around the `@rat.md/miru` Vue library in the adjacent `../package` directory. No Laravel or separate backend is required.

## Local development

Use Node 24 and npm 11+. From the repository root:

```sh
npm --prefix package ci
npm --prefix website ci
npm --prefix website run dev
```

On PowerShell hosts that block npm.ps1, use `npm.cmd` instead of `npm`.

`website/package.json` links `@rat.md/miru` through `file:../package`. Website code uses the package's public exports and compiled stylesheet. Build the package before starting the website; `npm --prefix package ci` runs that build through its prepare script. After library changes, run `npm --prefix package run build` again (or use its build watcher).

The documentation generator also reads Storybook, tokens and component sources from `../package` and uses its development tooling. Both directories must remain available in development and CI. The local dependency keeps the documentation and website runtime on the same package version.

## Lint and format

Run these commands from `website`:

```sh
npm run lint
npm run lint:fix
npm run format
npm run format:fix
```

`lint` and `format` check files; the `:fix` commands apply changes. They target `.vitepress` source files, `scripts` and `tests`. Generated catalogues, API data, palette defaults and formatted examples are excluded. Markdown documentation and build output are outside this scope.

`eslint.config.ts` uses the package's Vue/TypeScript conventions, including sorted imports and the block order `template`, `script`, `script setup`, `style`. `.prettierrc.json` matches the package's formatting rules; `.prettierignore` lists generated files that must remain untouched. All `if` branches require braces. Vue files separate template, script and style blocks with a blank line; script setup uses `<script lang="ts" setup>`. Named functions and handlers use an English docblock with a brief purpose, parameter names and `@returns` when returning a value.

## Scripts

The four synchronization steps run in this order through `npm run docs:sync` before `dev` and `build`: Storybook summaries, brand assets, component API extraction and documentation synchronization. Helper modules are imported by those steps and do not run independently on the deployed site.

| File                         | Purpose and inputs                                                                  | Output or invocation                                                                                                   |
| ---------------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `sync-storybook.mjs`         | Reads the authored VitePress installation page and the full reference sources.      | Writes the package's Getting Started snapshot and brief composable, plugin and support entries.                        |
| `sync-brand.mjs`             | Reads the shared vector mark and default brand colors.                              | Writes the public SVG variants and calls the favicon generator.                                                        |
| `favicon-assets.mjs`         | Rasterizes the supplied SVG with Resvg and adds icon-safe padding.                  | Writes ICO/PNG icons, Apple/Android assets and the web manifest. Called by `sync-brand.mjs`.                           |
| `generate-api.mjs`           | Reads public Vue exports, component metadata and shared API copy from `../package`. | Writes `.vitepress/theme/component-api.json`.                                                                          |
| `package-inventory.mjs`      | Inspects public exports and Storybook metadata.                                     | Returns component ownership, categories and Storybook preview URLs to the generators.                                  |
| `component-copy.mjs`         | Re-exports the library-owned descriptions.                                          | Keeps the website generators on the same component copy as the package.                                                |
| `format-examples.mjs`        | Loads the library ESLint and Prettier configuration.                                | Returns the formatter used for copyable Vue examples.                                                                  |
| `sync-docs.mjs`              | Combines reference sources, authored component pages, API data and examples.        | Refreshes generated reference pages, catalogue/navigation metadata and the search index.                               |
| `check-examples.mjs`         | Builds isolated Vue fixtures from documentation and playground snippets.            | Runs `vue-tsc` through `npm run test:docs`. Its legacy guide paths still need migration to the current authored pages. |
| `check-seo.mjs`              | Inspects the rendered HTML, sitemap, icons and social metadata.                     | Run `npm run seo:check` after a production build.                                                                      |
| `generate-social-images.ps1` | Reads `docs/public/miru-thumbnail.png` on Windows.                                  | Manually creates four centered JPEG crops after artwork changes; excluded from normal builds.                          |
| `install-hooks.mjs`          | Checks for a local development checkout with Husky enabled.                         | Installs the repository hook during `npm prepare`; skips CI and production installs.                                   |

## Tests and pre-commit checks

`npm test` runs the Node test files in `tests/`. They cover documentation and catalogue consistency, Storybook synchronization, color profiles and contrast, generated icons and favicon updates, playground compilation and editing, gallery variants, preview connection retries and SEO URL rules. Test file headers briefly state their individual scope.

`npm run check` runs lint, Vue/TypeScript checking and these tests. Husky runs the same command before a commit in this website repository. `npm install` and `npm ci` install the hook through `prepare`; run `node scripts/install-hooks.mjs` to reinstall it in an existing checkout. The adjacent library retains its own independent hook.

Production builds, the SEO output check and the separate snippet type-checker are explicit additional checks. The commit hook does not regenerate documentation or build deployment assets.

```js
/**
 * Resolve the canonical destination of a documentation path.
 * @param path
 * @returns
 */
function destination(path) {
    if (!path) {
        return '/';
    }

    return path;
}
```

## Content and architecture

- `.vitepress/theme`: documentation and a combined component/layout catalogue, persisted appearance, Miru Command search and interactive examples.
- `.vitepress/theme/native.css`: native `--ui-*` tokens for light/dark surfaces, palettes, controls, typography and the code editor. Legacy website aliases resolve to these tokens.
- `scripts/package-inventory.mjs`: discovers Storybook categories and preview links and maps display names to actual public Vue exports.
- `docs`: curated website content, integration guides and detailed introductory component pages.
- `scripts/generate-api.mjs`: extracts props, finite enum values, events, slots and exposed members from public Vue components and layouts using `vue-component-meta`.
- `scripts/sync-docs.mjs`: copies the package's prose MDX guides into generated Markdown, creates module/API reference pages and rebuilds the search index. Both scripts run before development and production builds. Rerun `npm run docs:sync` after editing source guides or component APIs during a dev session.
- `docs/reference`, `docs/components/api`, `docs/layouts/api`: generated; edit the library sources, group registry and example registry instead.
- Browser-dependent Miru examples are loaded through `defineClientComponent`. Marketing copy and documentation are rendered as static HTML.
- The component catalogue follows the current Storybook categories. The default view shows main components; “Include building blocks” adds their smaller parts. Every extracted Vue export has a detail page. Generic and inherited types reflect the Vue metadata checker’s inference.

## Component pages and Storybook

`package/src/stories/component-documentation.ts` owns short summaries, focused integration notes and verified introduction versions. Storybook uses the same short introductions before its detailed documentation. Set `componentSince` only when the introduction version is known; otherwise the website labels the current package version without claiming it is the first release.

`docs:sync` discovers categories and preview links from Storybook and combines them with the extracted API. Every component/layout page follows the same order: title and badges, introduction, preview/code, API tables, focused notes and related building blocks. Edit the sources, not generated API Markdown. Detailed variants remain in Storybook.

`ComponentExample.vue` is shared by the introduction and component pages. Native Miru Select and Checkbox controls update the preview and its copyable source. Only finite enum/boolean presentation props become automatic controls; structural props and application data need a complete composition. Minimal examples live in `playground/examples.ts`; unused helper CSS is omitted before ESLint/Prettier formats the generated source.

## Playground

`/playground` is a full-width workspace with a searchable component palette, CodeMirror Vue/TypeScript and CSS editing, and a live preview. Select and load a complete example, insert it with the plus button, or drag it into the editor/preview. Insertions merge imports, create independent reactive variables and keep form-control IDs unique. Layouts use the same workflow as other components.

The preview compiles user-authored Vue SFCs in a same-origin iframe with its own Vue app lifecycle. This is document isolation, not a security sandbox for untrusted third-party code. There is no remote code-sharing URL or external module bundler. Supported imports are `vue`, `@rat.md/miru`, `@rat.md/miru/composables`, `@rat.md/miru/support` and `zod`. Inline TypeScript script setup, Options API, template-only files and plain/scoped CSS are supported. External SFC blocks and CSS preprocessors are not.

- Edit `Theme.css` or apply a color preset to change native Miru tokens without resetting preview state.
- Auto-run is debounced; Ctrl/Cmd+Enter or Run compiles immediately. Errors retain the draft and show a diagnostic.
- Drafts are saved in browser local storage. Import and export use local `.vue` files. Export includes the theme overrides.
- `.vitepress/theme/playground/examples.ts` owns complete examples and insertion snippets. Primitive detail pages show a related composition when available and identify it as such.
- Run `npm test` for compiler, insertion and catalogue tests, and `npm run typecheck` for the website’s Vue/TypeScript sources. The typecheck and API extractor use the existing tooling in `../package`.

## Production

### Search indexing and metadata

Every production build generates `/sitemap.xml` via VitePress. `/robots.txt`
allows crawling and advertises `https://miru.at/sitemap.xml`; the head also links it.
Canonical URLs, Open Graph URLs and sitemap entries use the same HTTPS domain and
clean URL rules. The internal `/playground/preview`, duplicates `/playgrounds`
and `/examples`, and 404 are `noindex` and excluded from the sitemap. Both aliases point their
canonical to `/playground`; crawlers remain allowed so they can read these tags.

Build-time HTML titles match Open Graph and Twitter titles. The homepage retains
its existing rotating browser-tab title after hydration; its share title stays stable.
Page metadata is stored in generated frontmatter so VitePress also updates canonical,
social and robots tags on client-side navigation. Unknown URLs get `noindex` without
leaving that directive behind when returning to a normal page. Descriptions use authored
frontmatter when available, then the first prose paragraph, with a page-specific
fallback for pages without prose. Run `npm run seo:check` after `npm run build`
to check all generated pages, sitemap/canonical agreement, unique titles, matching
descriptions, social images, icon files and robots.txt. Deploy the entire
`.vitepress/dist` directory, including the XML, text and manifest files.

The SEO check also requires one static main heading and meaningful main content on
every indexable page, plus matching SSR/CSS scope IDs for shared visual components.
The live collection renders its heading, descriptions and card links on the server;
only the interactive previews wait until their cards approach the viewport.

### Responsive verification

The November 2026 audit sampled the homepage, component catalogue, live collection,
themes, installation guide, DataTable overview/reference, Form, Schedule, playground
and 404. Chromium viewport checks covered 360, 768, 1024 and 1440 px, with additional
320 px checks on the catalogue, collection and 404. Navigation, API tables, source
views and embedded previews were checked separately from document-level overflow.
Wide calendar content scrolls within its own preview rather than widening the page.

Corrections include clipped decorative catalogue orbits, a compact tablet header,
full-width form previews and stable scoped CSS IDs across client/SSR builds. These
are browser viewport tests, not physical-device Safari/Firefox certification.

The catalogue still emits a generic Vue hydration-mismatch console message on a
direct production load. Search/filtering and card links worked in the sampled
viewports, with no visible missing content; the warning remains an open finding.
An isolated build can be checked with `node scripts/check-seo.mjs <output-directory>`.

### Favicons and home screen icons

`miru-mark-squircle.svg` is the default SVG favicon. `scripts/sync-brand.mjs`
generates the same mark as `favicon.svg`, a 32×32 `favicon.ico` and `favicon.png`,
180×180 `apple-touch-icon.png`, 192×192 `icon-192.png`, 512×512 `icon-512.png`,
and a padded, opaque 512×512 `icon-mask.png` for Android launcher masks.
The Apple icon also has an opaque background and extra padding.

The global head links the icons and `manifest.webmanifest`, including application
names and theme color. Existing live favicon palette changes remain available;
installed/home screen icons use the static brand colors. Assets are regenerated
by `npm run docs:sync` before development and production builds, or directly with
`node scripts/sync-brand.mjs`. SVG rasterization uses `@resvg/resvg-js` on Node.

### Social sharing

The VitePress config emits Open Graph and Twitter large-image cards into every built
page (except the 404), with page-specific titles, descriptions and canonical URLs
under `https://miru.at`. The shared images are served from `docs/public/social`:

| File                         | Size       | Use                                          |
| ---------------------------- | ---------- | -------------------------------------------- |
| `miru-og-1200x630.jpg`       | 1200 × 630 | Facebook, Open Graph and other link previews |
| `miru-twitter-1200x600.jpg`  | 1200 × 600 | Twitter/X large-image card                   |
| `miru-reka-1600x900.jpg`     | 1600 × 900 | Reka UI showcase (16:9)                      |
| `miru-thumbnail-800x450.jpg` | 800 × 450  | Compact 16:9 thumbnail                       |

Reka's showcase uses its own image entry rather than a site meta tag. Use
`https://miru.at/social/miru-reka-1600x900.jpg` as the source when preparing a
showcase submission; the repository may require copying it into its showcase assets.

Regenerate all four JPEGs from the original `docs/public/miru-thumbnail.png`
on Windows with `powershell -File scripts/generate-social-images.ps1`. This only
resizes and center-crops; it does not regenerate the artwork. Deploy the site before
testing public previews. Platforms may cache previews of links already shared.

```sh
npm run build
npm run preview
```

Deploy `.vitepress/dist` to static hosting with clean URL support. No deployment configuration or publication is performed by this setup. Once Miru is published to npm, the GitHub dependency can be replaced with the desired package version.

## Documentation sources

Current pages live in `docs/docs/` (general documentation), `docs/components/` and `docs/layouts/`. Component overviews, references and guides are kept together. The remaining top-level pages provide the home page, examples, themes and playground. `docs/public/` contains public assets.

Old documentation URLs are kept centrally in `.vitepress/theme/legacy-routes.ts`, rather than as duplicate Markdown pages. They redirect in the browser, including when the host serves VitePress’s `404.html` for a legacy URL. Configure static hosting to serve that file for unknown paths.

`docs:sync` refreshes public composable, plugin and support references, component metadata and search data. It leaves authored component pages alone and does not recreate the former `guide/`, `forms/`, `data-table/`, `component-guides/` or `reference/` documentation trees. `.qa/`, `.tmp/`, caches and build output are development artefacts, not documentation sources.
