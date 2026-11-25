---
title: "Description"
component: Description
componentPage: overview
---

## Preview

<ComponentExample name="Description" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Popover help on larger screens and a drawer on smaller screens.</li>
    <li>Short descriptions, further details and custom content.</li>
</ul>

## Responsive presentation

The default breakpoint is `(min-width: 768px)`: matching screens use a Popover and smaller screens use a Drawer. Changing presentation closes the current view. Positioning props apply to the popover. The title labels the information trigger and appears as a heading in drawer mode; use the default slot for extra content.

## Dependencies

- **UI:** [Button](/components/button), [Drawer](/components/drawer), [DrawerContent](/components/drawer/reference#drawer-content), [DrawerDescription](/components/drawer/reference#drawer-description), [DrawerHeader](/components/drawer/reference#drawer-header), [DrawerTitle](/components/drawer/reference#drawer-title), [Popover](/components/popover), [PopoverArrow](/components/popover/reference#popover-arrow), [PopoverContent](/components/popover/reference#popover-content), [PopoverTrigger](/components/popover/reference#popover-trigger)
- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/description/reference) for the complete component contract.
