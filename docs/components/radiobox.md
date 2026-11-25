---
title: "Radiobox"
component: RadioBox
componentPage: overview
---

## Preview

<ComponentExample name="RadioBox" :show-playground="false" />

## Features

<ul class="component-features">
    <li>A labelled radio choice for grouped or standalone use.</li>
    <li>Shared sizing with an individual colour override.</li>
</ul>

## Group and standalone use

Within RadioGroup, RadioBox follows the group selection, size and colour unless overridden. Standalone use creates a radio group root and reports changes through its own model. Give every choice a distinct value and a label; use a shared RadioGroup when choices belong to one selection.

## Colours

An explicit `variant` overrides the nearest RadioGroup colour. Use `default`, `primary`, `secondary`, `accent`, `info`, `success`, `warning` or `danger`. Invalid and disabled states retain their own feedback.

## Dependencies

- **UI:** [Label](/components/label), [RadioGroupItem](/components/radio-group/reference#radio-group-item)
- **Packages:** [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Radio Group](https://reka-ui.com/docs/components/radio-group)

See the [reference](/components/radiobox/reference) for the complete component contract.
