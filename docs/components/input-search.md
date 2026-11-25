---
title: "InputSearch"
component: InputSearch
componentPage: overview
---

## Preview

<ComponentExample name="InputSearch" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Search icon with configurable alignment.</li>
    <li>Clear action that returns focus to the input.</li>
</ul>

## Search behaviour

The clear button empties the value and returns focus to the input. Disabled and read-only states prevent clearing. The component does not emit a search request or apply filtering; observe the value or native events in the application. `class` styles the wrapper and `inputClass` styles the input.

## Dependencies

- **UI:** [Button](/components/button), [Input](/components/input)
- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [clsx](https://www.npmjs.com/package/clsx), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/input-search/reference) for the complete component contract.
