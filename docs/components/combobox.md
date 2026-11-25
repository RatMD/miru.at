---
title: "Combobox"
component: ComboboxField
componentPage: overview
---

## Preview

<ComponentExample name="ComboboxField" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Search labelled options and select one value.</li>
    <li>Exported primitives for custom filtering and multiple selection.</li>
</ul>

## Field and primitives

ComboboxField selects a string value or null and supplies filtering, a visible trigger and optional clearing. Its `option` slot replaces option content. Use Combobox with the exported anchor, input, list, viewport and item components for object values, multiple selection or custom filtering. Name the control and give clear or icon-only actions accessible labels.

## Integration guide

[Read the focused integration guide](/reference/combobox-guide).

## Dependencies

- **UI:** [Button](/components/button)
- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Combobox](https://reka-ui.com/docs/components/combobox)

See the [reference](/components/combobox/reference) for the complete component contract.
