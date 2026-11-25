---
title: "ToggleGroup"
component: ToggleGroup
componentPage: overview
---

## Preview

<ComponentExample name="ToggleGroup" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Single or multiple selection within a segmented group.</li>
    <li>Shared sizing, configurable gaps and optional non-empty selection.</li>
</ul>

## Single and multiple selection

Use type single for one selected value or multiple for an array. `allowEmpty` prevents clearing the last selection when false; it does not invent an initial choice. Items inherit root size and appearance unless overridden. `spacing` adds gaps between segments, and keyboard movement follows orientation and direction.

## Dependencies

- **Packages:** [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [class-variance-authority](https://www.npmjs.com/package/class-variance-authority), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Toggle Group](https://reka-ui.com/docs/components/toggle-group)

See the [reference](/components/toggle-group/reference) for the complete component contract.
