---
title: "EditorJSON"
component: EditorJson
componentPage: overview
---

## Preview

<ComponentExample name="EditorJson" :show-playground="false" />

## Features

<ul class="component-features">
    <li>JSON syntax feedback, formatting and minification.</li>
    <li>Optional preview with the shared EditorFrame toolbar and counter.</li>
</ul>

## JSON validation and EditorFrame

The model remains a JSON string. The `validation` event reports syntax validity and the parsed value, including an initial validation result. `allowEmpty` controls whether blank content is valid. Formatting and minification change the string; preview displays parsed content without replacing the model. The shared [EditorFrame utility](/components/editor-frame) supplies the toolbar and counter. Validate application data separately from JSON syntax.

## Dependencies

- **UI:** [EditorFrame](/components/editor-frame), [ScrollArea](/components/scroll-area), [Textarea](/components/textarea), [Tooltip](/components/tooltip)
- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/editor-json/reference) for the complete component contract.
