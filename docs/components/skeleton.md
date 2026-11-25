---
title: "Skeleton"
component: Skeleton
componentPage: overview
---

## Preview

<ComponentExample name="Skeleton" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Placeholder surfaces while content loads.</li>
    <li>Custom dimensions and shape through classes.</li>
    <li>A subtle loading treatment that fits the surrounding layout.</li>
</ul>

## Dimensions and loading announcements

Set width and height with classes or native styles; Skeleton has no sizing props. The width, height and rounded controls in Storybook configure the example. For a group of placeholders, announce loading once on the surrounding region and hide decorative placeholders from assistive technology with `aria-hidden="true"`. Add `motion-reduce:animate-none` to disable the pulse for reduced-motion preferences. Skeleton exposes no component-specific events, slots or model bindings.

## Dependencies

- **Packages:** [clsx](https://www.npmjs.com/package/clsx), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/skeleton/reference) for the complete component contract.
