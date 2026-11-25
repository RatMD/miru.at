---
title: "OverlayDetail"
component: OverlayDetails
componentPage: overview
---

## Preview

<ComponentExample name="OverlayDetails" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Labelled code sections with tabs for multiple entries.</li>
    <li>Formatting, line numbers and loading or error feedback.</li>
</ul>

## Code sections

The public export is `OverlayDetails`. Supply CodeSection records with a stable `id`, `label`, `value` and optional `language`; omitted languages use JSON. Multiple sections show tabs, and `v-model:activeTab` controls the selected section. Empty sections show an empty-state message; loading and error states replace the code view. The footer close button emits `close`, while other dismissal routes only update `open`.

## Integration guide

[Read the focused integration guide](/components/overlay).

## Dependencies

- **UI:** [Alert](/components/alert), [AlertDescription](/components/alert/reference#alert-description), [Button](/components/button), [CodePanel](/components/code-panel), [Overlay](/components/overlay), [Tabs](/components/tabs)
- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/overlay-detail/reference) for the complete component contract.
