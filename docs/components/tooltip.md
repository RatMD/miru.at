---
title: "Tooltip"
component: Tooltip
componentPage: overview
---

## Preview

<ComponentExample name="Tooltip" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Hints on hover or keyboard focus.</li>
    <li>Shared timing, configurable positioning and theme colours.</li>
</ul>

## Shared timing and composition

Wrap related tooltips in TooltipProvider to share delays; Miru’s provider defaults to 300ms. Compose TooltipTrigger and TooltipContent inside each Tooltip. Put content positioning, `variant` and `showArrow` on TooltipContent; keep the trigger focusable and give icon-only buttons their own accessible label.

Use Tooltip for brief explanatory text. Use [Popover](/components/popover) for content with interactive controls. For a tooltip on a popover’s own trigger, prefer PopoverTrigger’s integrated `tooltip` prop.

## Dependencies

- **Packages:** [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Tooltip](https://reka-ui.com/docs/components/tooltip)

See the [reference](/components/tooltip/reference) for the complete component contract.
