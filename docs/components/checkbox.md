---
title: "Checkbox"
component: Checkbox
componentPage: overview
---

## Preview

<ComponentExample name="Checkbox" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Boolean, indeterminate or custom checked values.</li>
    <li>Optional labels, keyboard interaction and theme colours.</li>
</ul>

## Values and labels

Use a boolean model, an indeterminate value or custom `trueValue` and `falseValue` values. Supply `label` or the default slot for a linked visible label; `indicator` replaces the checked-state content. With no visible label, provide an accessible name on the control. `class` styles the outer labelled wrapper.

## Colours

The `variant` colours are `default`, `primary`, `secondary`, `accent`, `info`, `success`, `warning` and `danger`. Checked and indeterminate states share the selected colour. Inside a CheckboxGroup, an explicit child variant overrides the inherited group colour. Invalid styling remains danger-coloured and disabled controls keep their disabled treatment.

## Dependencies

- **UI:** [Label](/components/label)
- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Checkbox](https://reka-ui.com/docs/components/checkbox)

See the [reference](/components/checkbox/reference) for the complete component contract.
