---
title: "Slider"
component: Slider
componentPage: overview
---

## Preview

<ComponentExample name="Slider" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Choose a number or range with pointer, touch or keyboard input.</li>
    <li>Configurable bounds, step marks and individual handle labels.</li>
</ul>

## Values, labels and step marks

The model is always a number array: use one value for one handle or two for a range. Supply distinct thumbLabels for range handles. Configure finite bounds with max greater than min and a positive step. minStepsBetweenThumbs sets the minimum gap in step intervals; showSteps draws decorative marks only when there are at most 200 intervals. valueCommit reports a committed interaction, while model updates track changes. Orientation, direction and inverted control the visual axis and keyboard movement.

## Integration guide

[Read the focused integration guide](/reference/slider).

## Dependencies

- **Packages:** [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Slider](https://reka-ui.com/docs/components/slider)

See the [reference](/components/slider/reference) for the complete component contract.
