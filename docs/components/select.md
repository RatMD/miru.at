---
title: "Select"
component: Select
componentPage: overview
---

## Preview

<ComponentExample name="Select" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Single or multiple selection with grouped options.</li>
    <li>Composable controls and an optional searchable single-choice field.</li>
</ul>

## Selection, clearing and search

Select stores one value or an array in multiple mode. Compose SelectTrigger, SelectValue and SelectContent with labelled SelectItem options. SelectClear resets a single value to undefined or multiple values to an empty array, closes the popup and restores trigger focus. SelectSearch is a separate searchable single-choice field with string/null values and optional pinned options. The root size and shape are inherited by its controls; a trigger size can override dropdown density.

## Dependencies

- **UI:** [Button](/components/button), [Input](/components/input)
- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [class-variance-authority](https://www.npmjs.com/package/class-variance-authority), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Combobox](https://reka-ui.com/docs/components/combobox), [Reka UI Select](https://reka-ui.com/docs/components/select)

See the [reference](/components/select/reference) for the complete component contract.
