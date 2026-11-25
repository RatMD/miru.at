---
title: "Label"
component: Label
componentPage: overview
---

## Preview

<ComponentExample name="Label" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Associate a label with its control.</li>
    <li>Show required and validation markers.</li>
    <li>Inherit validation display state from Field.</li>
</ul>

## Association and validation markers

Match `for` to the control’s `id`. The required marker and validation icons describe state without adding validation rules or changing the control’s required attribute. Explicit validation props override Field context. The `ariaValid` alias becomes `data-valid`; no non-standard `aria-valid` attribute is rendered.

## Dependencies

- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Label](https://reka-ui.com/docs/components/label)

See the [reference](/components/label/reference) for the complete component contract.
