---
title: "RadioGroup"
component: RadioGroup
componentPage: overview
---

## Preview

<ComponentExample name="RadioGroup" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Single selection from labelled options.</li>
    <li>Keyboard navigation with shared or per-option colours.</li>
</ul>

## Options and keyboard navigation

Pass labelled options or compose RadioGroupItem or RadioBox children. The root owns the selected value and supplies orientation, keyboard looping, size and colour. Use an accessible group name and individual option labels. A disabled group prevents changes to all its choices.

## Colours

Set `variant` on RadioGroup for a shared selection colour, or override it on an individual RadioBox or option. Available variants are `default`, `primary`, `secondary`, `accent`, `info`, `success`, `warning` and `danger`. Invalid fields retain danger styling, and disabled controls do not gain interactive hover colours.

## Dependencies

- **UI:** [RadioBox](/components/radiobox)
- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Radio Group](https://reka-ui.com/docs/components/radio-group)

See the [reference](/components/radio-group/reference) for the complete component contract.
