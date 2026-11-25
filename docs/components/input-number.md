---
title: "InputNumber"
component: InputNumber
componentPage: overview
---

## Preview

<ComponentExample name="InputNumber" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Locale-aware number formatting with configurable bounds.</li>
    <li>Composable input, increment and decrement controls.</li>
</ul>

## Composition and formatting

Compose InputNumberContent, InputNumberInput and the increment/decrement buttons within InputNumber. Set bounds and step on the root and a meaningful accessible name on the input. Locale and Intl formatOptions control number presentation. The model contains the numeric value rather than its formatted display text.

## Dependencies

- **UI:** [Input](/components/input), [InputGroup](/components/input-group)
- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Number Field](https://reka-ui.com/docs/components/number-field)

See the [reference](/components/input-number/reference) for the complete component contract.
