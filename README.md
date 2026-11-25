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

`lint` and `format` check files; the `:fix` commands apply changes. They target only `.vitepress/theme`, `scripts` and `tests`. Generated catalogues, API data, palette defaults and formatted examples are excluded. Markdown documentation and build output are outside this scope.

`eslint.config.ts` uses the package's Vue/TypeScript conventions, including sorted imports and the block order `template`, `script`, `script setup`, `style`. `.prettierrc.json` matches the package's formatting rules; `.prettierignore` lists generated files that must remain untouched.

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

```sh
npm run build
npm run preview
```

Deploy `.vitepress/dist` to static hosting with clean URL support. No deployment configuration or publication is performed by this setup. Once Miru is published to npm, the GitHub dependency can be replaced with the desired package version.

## Documentation sources

Current pages live in `docs/docs/` (general documentation), `docs/components/` and `docs/layouts/`. Component overviews, references and guides are kept together. The remaining top-level pages provide the home page, examples, themes and playground. `docs/public/` contains public assets.

Old documentation URLs are kept centrally in `.vitepress/theme/legacy-routes.ts`, rather than as duplicate Markdown pages. They redirect in the browser, including when the host serves VitePress’s `404.html` for a legacy URL. Configure static hosting to serve that file for unknown paths.

`docs:sync` refreshes public composable, plugin and support references, component metadata and search data. It leaves authored component pages alone and does not recreate the former `guide/`, `forms/`, `data-table/`, `component-guides/` or `reference/` documentation trees. `.qa/`, `.tmp/`, caches and build output are development artefacts, not documentation sources.
