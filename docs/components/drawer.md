---
title: "Drawer"
component: Drawer
componentPage: overview
---

## Preview

<ComponentExample name="Drawer" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Edge panels with swipe dismissal and optional snap positions.</li>
    <li>Scrollable content with separate header and footer areas.</li>
</ul>

## Snap positions and scrolling

A downward drawer uses `[0.5, 0.9]` snap positions when `snapPoints` is omitted; other directions have no automatic snap points. Positions accept viewport fractions from 0 to 1, pixel values greater than 1, or px/rem strings. The initial position is `defaultSnapPoint` or the first resolved point.

DrawerContent keeps its header and footer outside the default ScrollArea. Set `scrollable=false` when the body provides its own scrolling. DrawerTrigger, DrawerClose and DrawerHandle are re-exported from Reka UI. Handle `update:open` and call the supplied `details.cancel()` to reject a visibility change.

## Dependencies

- **UI:** [Button](/components/button), [ScrollArea](/components/api/scroll-area)
- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Drawer](https://reka-ui.com/docs/components/drawer)

See the [reference](/components/drawer/reference) for the complete component contract.
