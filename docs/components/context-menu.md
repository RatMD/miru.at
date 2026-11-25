---
title: "ContextMenu"
component: ContextMenu
componentPage: overview
---

## Preview

<ComponentExample name="ContextMenu" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Contextual actions with keyboard navigation and managed focus.</li>
    <li>Nested menus, checkbox items and radio choices.</li>
</ul>

## Menu interaction

Compose ContextMenuTrigger and ContextMenuContent within ContextMenu. Keep the trigger focusable when keyboard users need to open the menu. Use `asChild` with an existing control to preserve its element.

Bind `v-model` on checkbox items or radio groups to retain selection. Prevent an item’s `select` event to keep the menu open. ContextMenuContent already portals its content; use ContextMenuPortal when composing parts that need an explicit portal. ContextMenuShortcut only displays a label.

## Dependencies

- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Context Menu](https://reka-ui.com/docs/components/context-menu)

See the [reference](/components/context-menu/reference) for the complete component contract.
