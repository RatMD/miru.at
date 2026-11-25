---
title: "Sheet"
component: Sheet
componentPage: overview
---

## Preview

<ComponentExample name="Sheet" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Dialog-based panels from any screen edge.</li>
    <li>Composed headings, descriptions, body content and actions.</li>
</ul>

## Sheet composition

Sheet uses Reka UI Dialog primitives, with an edge transition controlled by SheetContent’s `side`. Include SheetTitle and SheetDescription for an accessible heading and explanation. Use SheetTrigger and SheetClose for controls, and bind `v-model:open` when the application owns visibility. Hiding or disabling the close button does not block Escape or outside dismissal; prevent the relevant content events when needed.

## Dependencies

- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Dialog](https://reka-ui.com/docs/components/dialog)

See the [reference](/components/sheet/reference) for the complete component contract.
