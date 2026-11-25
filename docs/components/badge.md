---
title: "Badge"
component: Badge
componentPage: overview
---

## Preview

<ComponentExample name="Badge" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Theme colours, appearances and optional icons.</li>
    <li>Composable parts and separators inside a single badge.</li>
    <li>Compact labels that can also be composed as links.</li>
</ul>

## Colour and appearance

`variant` selects the colour, while `appearance="auto"` uses solid semantic colours in light mode and soft tints in dark mode. Choose `solid` or `soft` to keep the same treatment in both themes. The neutral `outline`, `ghost` and `ghostly` variants retain their dedicated styles.

## Parts, separators and links

Compose direct BadgePart children with BadgeSeparator between them. Parts inherit the badge size and colour, and the surrounding badge removes its own padding and gaps. Separators are decorative. For one interactive badge, use an outer link or button and keep its parts non-interactive. `href` selects an anchor by default; `as`, `asTag` and `asChild` support explicit elements and router links. `interactive` enables hover styling without adding navigation or click handling. Badge and its parts expose no component-specific events or model bindings; native events follow the rendered element.

## Dependencies

- **Packages:** [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [class-variance-authority](https://www.npmjs.com/package/class-variance-authority), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Primitive](https://reka-ui.com/docs/utilities/primitive)

See the [reference](/components/badge/reference) for the complete component contract.

## Further reading

[Read the Badge guide](/components/badge) for additional composition examples.
