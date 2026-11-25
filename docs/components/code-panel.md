---
title: "CodePanel"
component: CodePanel
componentPage: overview
---

## Preview

<ComponentExample name="CodePanel" :show-playground="false" />

## Features

<ul class="component-features">
    <li>JSON, HTML and plain-text display.</li>
    <li>Optional formatting, line numbers and clipboard copying.</li>
    <li>Constrained scrolling and a condensed embedded appearance.</li>
</ul>

## Formatting and copying

Prettier and its parser plugins load on demand for JSON and HTML when `format` is enabled. Plain text bypasses formatting. If formatting fails, the original serialised text remains visible with a translated message. HTML is displayed as text. The copy button copies the displayed source without line numbers and reports clipboard failures within the panel. CodePanel exposes no component-specific events, slots or model bindings.

## Dependencies

- **UI:** [ButtonAction](/components/button-action), [ScrollArea](/components/scroll-area), [Tooltip](/components/tooltip)
- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [class-variance-authority](https://www.npmjs.com/package/class-variance-authority), [clsx](https://www.npmjs.com/package/clsx), [prettier](https://www.npmjs.com/package/prettier), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/code-panel/reference) for the complete component contract.
