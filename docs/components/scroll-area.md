---
title: "ScrollArea"
component: ScrollArea
componentPage: overview
---

## Preview

<ComponentExample name="ScrollArea" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Vertical, horizontal or combined scrolling.</li>
    <li>Native viewport behaviour with styled scrollbars.</li>
</ul>

## Constrain the viewport

Give the root a height, width or maximum size appropriate to the chosen axis. Vertical scrolling is the default; use `orientation="horizontal"` or `both` for other layouts. Scrolling remains native, with styled bars managed by Reka UI.

```vue
<ScrollArea class="h-64 rounded-lg border">
    <div class="p-4">Long content goes here.</div>
</ScrollArea>
```

`fitContent` lets short content determine the viewport height up to an inherited maximum height. Use `viewportClass` to adjust the actual scrolling surface. The scrollbar visibility type and hide delay are forwarded to Reka UI; content sizing still determines whether scrolling is needed.

## Dependencies

- **Packages:** [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Scroll Area](https://reka-ui.com/docs/components/scroll-area)

See the [reference](/components/scroll-area/reference) for the complete component contract.
