---
title: "InputTags"
component: InputTags
componentPage: overview
---

## Preview

<ComponentExample name="InputTags" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Keyboard entry and removal of multiple tags.</li>
    <li>Configurable separators, duplicate handling and theme colours.</li>
</ul>

## Tags and input behaviour

Compose InputTagsItem, InputTagsItemText and InputTagsItemDelete with InputTagsInput. Give delete actions accessible names. Root options control delimiters, duplicates, maximum count and when typed or pasted values become tags. Invalid additions are reported through `invalid`; value changes are reported through the model.

## Colours

Set `variant` on InputTags to colour its tags; an explicit item variant overrides the group. Available variants are `default`, `primary`, `secondary`, `accent`, `info`, `success`, `warning` and `danger`. Default tags use neutral muted surfaces in both themes. Invalid fields retain danger styling and disabled controls keep their disabled treatment.

## Dependencies

- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Tags Input](https://reka-ui.com/docs/components/tags-input)

See the [reference](/components/input-tags/reference) for the complete component contract.
