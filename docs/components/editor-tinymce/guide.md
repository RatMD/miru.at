---
title: EditorTinyMCE guide
component: Editor
componentPage: guide
---

Editor uses a locally loaded TinyMCE instance to edit HTML. Its model, Silver theme, icons and lists plugin come from installed dependencies; it does not require a cloud script or a separate Vue TinyMCE adapter.

## Bind HTML

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { Editor } from '@rat.md/miru';

const html = ref('<p>Start writing.</p>');
</script>

<template>
    <Editor v-model="html" label="Article" placeholder="Write your article…" :height="380" />
</template>
```

`update:modelValue` reports HTML changes. The application owns storage and validation, including sanitising untrusted HTML before rendering it elsewhere. Form’s `richtext` field uses this editor.

## Configure the instance

Use `toolbar` to choose tools, `locale` for the interface language and `height` for the editing area. Height changes update the current instance. Toolbar or locale changes recreate it while retaining the bound HTML; light/dark changes update the toolbar and content colours during the current editing session.

`disabled` and `readonly` prevent editing. Extra attributes such as `id`, `name` and `aria-invalid` reach the source textarea. `ready` emits the TinyMCE instance, and `error` reports initialisation failures; the textarea remains available if initialisation fails. See the [component reference](/components/editor-tinymce/reference) for props and events, and [TinyMCE’s API](https://www.tiny.cloud/docs/tinymce/latest/apis/tinymce.editor/) for instance methods.

## Licence configuration

Supply the licence appropriate for your application through `licenseKey`, or configure it globally with `configureTinymce` from `@rat.md/miru/plugins/tinymce`. The existing GPL fallback remains available; the wrapper does not alter TinyMCE’s licensing terms.

## Appearance

The wrapper adapts TinyMCE’s bundled skin to Miru’s fonts, colours, borders, focus treatment and Tabler icons. Theme variables are copied into the editing iframe without changing stored HTML. Menus remain local to the editor; TinyMCE retains its own commands, shortcuts and keyboard navigation.

Override `--ui-editor-focus`, `--ui-editor-border`, `--ui-editor-radius`, `--ui-editor-content-padding`, `--ui-editor-font-size`, `--ui-editor-toolbar-padding` or `--ui-editor-button-size` on the wrapper or an ancestor. For a custom plain-text surface and local toolbar commands, use [EditorFrame](/components/editor-frame/guide).
