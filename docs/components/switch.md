---
title: "Switch"
component: Switch
componentPage: overview
---

## Preview

<ComponentExample name="Switch" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Two-state control with custom checked and unchecked values.</li>
    <li>Three sizes, track spacing and custom thumb content.</li>
</ul>

## Switch states and track spacing

Variants are default, success and danger-success. Default uses neutral styling, success uses green when on, and danger-success uses red when off and green when on. `trackPadding` adds a non-negative pixel inset while retaining thumb size and travel. Use a linked label or an accessible name; the thumb slot replaces only the moving content.

## Dependencies

- **Packages:** [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Switch](https://reka-ui.com/docs/components/switch)

See the [reference](/components/switch/reference) for the complete component contract.
