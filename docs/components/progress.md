---
title: "Progress"
component: Progress
componentPage: overview
---

## Preview

<ComponentExample name="Progress" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Determinate values or indeterminate loading.</li>
    <li>Theme colours and configurable sizing.</li>
    <li>Accessible progress semantics.</li>
</ul>

## Values and accessibility

Supply a meaningful accessible name with `aria-label` or `aria-labelledby`. The visible fill is clamped between zero and the maximum; use a positive `max` and values within that range. A `null` value exposes an indeterminate state but leaves the visible fill at zero. Animated stripes decorate the filled portion and do not provide an indeterminate loading animation. Update `modelValue` from the application; this wrapper declares no update event or model binding and exposes no custom slots.

## Dependencies

- **Packages:** [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [class-variance-authority](https://www.npmjs.com/package/class-variance-authority), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Progress](https://reka-ui.com/docs/components/progress)

See the [reference](/components/progress/reference) for the complete component contract.
