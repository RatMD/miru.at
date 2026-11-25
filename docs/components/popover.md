---
title: "Popover"
component: Popover
componentPage: overview
---

## Preview

<ComponentExample name="Popover" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Flexible positioning beside a trigger or anchor.</li>
    <li>Controlled visibility and optional trigger hints.</li>
</ul>

## Positioning and trigger hints

Configure `side`, `align` and offsets on PopoverContent. Add PopoverArrow for a pointer, or PopoverAnchor for a positioning reference separate from the trigger. The content is portalled automatically.

Use the optional `tooltip` prop on PopoverTrigger for a hint on the same control. It is hidden while the popover is open; `tooltipSide`, `tooltipAlign` and `tooltipDelayDuration` configure its placement and timing. Use `asChild` with an existing button.

## Dependencies

- **UI:** [Tooltip](/components/tooltip), [TooltipContent](/components/tooltip/reference#tooltip-content), [TooltipProvider](/components/tooltip/reference#tooltip-provider), [TooltipTrigger](/components/tooltip/reference#tooltip-trigger)
- **Packages:** [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Popover](https://reka-ui.com/docs/components/popover)

See the [reference](/components/popover/reference) for the complete component contract.
