---
title: "Overlay"
component: Overlay
componentPage: overview
---

## Preview

<ComponentExample name="Overlay" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Dialog presentation on larger screens and a drawer on smaller screens.</li>
    <li>Shared heading, scrollable body and optional footer.</li>
</ul>

## Responsive layout and closing

Overlay uses a dialog from 768px and a drawer below that width. Use OverlayTrigger inside its trigger slot so opening follows the current presentation. The body scrolls separately from the header and footer; `flush`, `fixedFrame` and `bodyClass` adjust that layout.

`loading` blocks component-requested closing. `dismissible=false` also blocks Escape, outside interaction and the slot’s `close()` callback. The application can still close the overlay by updating its bound `open` value.

## Integration guide

[Read the focused integration guide](/reference/overlay-guide).

## Dependencies

- **UI:** [Dialog](/components/dialog), [DialogContent](/components/dialog/reference#dialog-content), [DialogDescription](/components/dialog/reference#dialog-description), [DialogTitle](/components/dialog/reference#dialog-title), [Drawer](/components/drawer), [DrawerContent](/components/drawer/reference#drawer-content), [DrawerDescription](/components/drawer/reference#drawer-description), [DrawerTitle](/components/drawer/reference#drawer-title), [ScrollArea](/components/api/scroll-area)
- **Packages:** [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Dialog](https://reka-ui.com/docs/components/dialog), [Reka UI Drawer](https://reka-ui.com/docs/components/drawer)

See the [reference](/components/overlay/reference) for the complete component contract.
