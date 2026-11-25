---
title: "EditorFrame"
component: EditorFrame
componentPage: overview
---

## Preview

<ComponentExample name="EditorFrame" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Local toolbar extensions and a shared editing API.</li>
    <li>Custom surfaces, counters and mutation guards.</li>
</ul>

## Commands and custom surfaces

Bind the source through `v-model` and attach local `extensions` for toolbar commands. The default surface is a textarea; custom surfaces, toolbar controls, counter content and footer content use slots. Commands and the exposed API respect disabled, read-only and maximum-length guards.

[Read the EditorFrame guide](/components/editor-frame/guide) for extensions, selection helpers and custom editing surfaces. [EditorJSON](/components/editor-json) and [EditorMarkdown](/components/editor-markdown) compose this frame; [EditorTinyMCE](/components/editor-tinymce) manages a separate rich-text instance.

## Dependencies

- **UI:** [Button](/components/button), [Label](/components/label), [Textarea](/components/textarea), [Tooltip](/components/tooltip)
- **Packages:** [clsx](https://www.npmjs.com/package/clsx), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/editor-frame/reference) for the complete component contract.
