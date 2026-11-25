---
title: "EditorTinyMCE"
component: Editor
componentPage: overview
---

## Preview

<ComponentExample name="Editor" :show-playground="false" />

## Features

<ul class="component-features">
    <li>HTML editing through a locally loaded TinyMCE instance.</li>
    <li>Configurable tools, localised labels and read-only display.</li>
</ul>

## TinyMCE instance

The Vue export is Editor; Storybook names it EditorTinyMCE. TinyMCE loads locally on mount. `ready` supplies the instance and `error` reports loading or initialisation failure. `licenseKey` overrides the Miru editor configuration, with the configured fallback used otherwise. This editor has its own surface and does not use EditorFrame.

## Integration guide

[Read the focused integration guide](/components/editor-tinymce/guide).

## Dependencies

- **UI:** [Textarea](/components/textarea)
- **Packages:** [clsx](https://www.npmjs.com/package/clsx), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [tinymce](https://www.npmjs.com/package/tinymce), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/editor-tinymce/reference) for the complete component contract.
