---
title: "CheckboxGroup"
component: CheckboxGroup
componentPage: overview
---

## Preview

<ComponentExample name="CheckboxGroup" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Select several values from labelled options.</li>
    <li>Horizontal or vertical layouts with per-option colours.</li>
</ul>

## Options and composition

Pass options with string values and labels, or compose Checkbox children through the default slot. Bind a string-array model to store selection. Group colours are inherited by children unless a child or option supplies its own variant. Disabled options remain visible and cannot be changed.

## Colours

Set `variant` on the group to colour its choices. An option or child with an explicit variant overrides the inherited colour. Checked and indeterminate states use the same palette; invalid and disabled styling remains distinct. Available variants are `default`, `primary`, `secondary`, `accent`, `info`, `success`, `warning` and `danger`.

## Dependencies

- **UI:** [Checkbox](/components/checkbox)
- **Packages:** [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [clsx](https://www.npmjs.com/package/clsx), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/checkbox-group/reference) for the complete component contract.
