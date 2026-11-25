---
title: "Field"
component: Field
componentPage: overview
---

## Preview

<ComponentExample name="Field" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Compose labels, controls, hints and error messages.</li>
    <li>Arrange fields vertically, horizontally or responsively.</li>
    <li>Share validation display state with nested labels.</li>
</ul>

## Composition and state

Compose FieldLabel, a control, FieldDescription and FieldError within Field. Bind values, disabled state and control-level ARIA attributes to the control itself. Field shares validation display state with labels; it does not run validation or disable arbitrary descendants. Invalid state takes precedence over valid state. Link hints and errors with `aria-describedby`.

## Dependencies

- **UI:** [Label](/components/label), [Separator](/components/separator)
- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [class-variance-authority](https://www.npmjs.com/package/class-variance-authority), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/field/reference) for the complete component contract.
