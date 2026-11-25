---
title: "Item"
component: Item
componentPage: overview
---

## Preview

<ComponentExample name="Item" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Composable content, media and actions.</li>
    <li>Layouts for compact lists, linked rows and richer content.</li>
    <li>Separate heading, description, footer and group parts.</li>
</ul>

## Composition and semantics

Compose ItemMedia, ItemContent and ItemActions inside Item; ItemHeader and ItemFooter span the full row width. Use ItemGroup with ItemSeparator for a vertical collection. Item and ItemGroup render neutral `div` elements by default: choose suitable elements or roles when building a list. For linked rows, use `as="a"` with `href`, or `asChild` with a router link, and keep nested controls out of the link. ItemTitle is a styled `div`, so supply a heading within it when needed. These building blocks expose no component-specific events or model bindings.

## Dependencies

- **UI:** [Separator](/components/separator)
- **Packages:** [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [class-variance-authority](https://www.npmjs.com/package/class-variance-authority), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Primitive](https://reka-ui.com/docs/utilities/primitive), [Reka UI Separator](https://reka-ui.com/docs/components/separator)

See the [reference](/components/item/reference) for the complete component contract.
