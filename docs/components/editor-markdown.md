---
title: "EditorMarkdown"
component: EditorMarkdown
componentPage: overview
---

## Preview

<ComponentExample name="EditorMarkdown" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Formatting commands, list continuation and undo history.</li>
    <li>Shared EditorFrame toolbar, counter and editing surface.</li>
</ul>

## Editing commands and EditorFrame

The model contains Markdown source rather than rendered HTML. Toolbar tools format the current selection, lists continue on Enter, and undo/redo history belongs to this editor instance. `syntax` selects standard or Kleinanzeigen formatting; `syntaxOptions` overrides individual markers. The shared [EditorFrame utility](/components/editor-frame) supplies the toolbar, counter and editing surface.

## Dependencies

- **UI:** [EditorFrame](/components/editor-frame), [Textarea](/components/textarea)
- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/editor-markdown/reference) for the complete component contract.
