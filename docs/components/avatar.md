---
title: "Avatar"
component: Avatar
componentPage: overview
---

## Preview

<ComponentExample name="Avatar" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Images with fallback content during loading or failure.</li>
    <li>Five sizes, four shapes and theme colours.</li>
    <li>Composable image and fallback building blocks.</li>
</ul>

## Images and fallback content

Compose AvatarImage and AvatarFallback inside Avatar. Give the image a meaningful `alt` attribute, or an empty one when nearby text already identifies the person. The fallback is shown while the image loads or if loading fails; `delayMs` can postpone its appearance. AvatarImage forwards `loadingStatusChange` with `idle`, `loading`, `loaded` or `error`.

## Size, shape and colour

Set `size`, `shape` and `tone` on Avatar so the image and fallback share the same appearance. Sizes range from `xs` to `xl`, with `default` between `sm` and `lg`. Shapes are `round`, `square`, `squircle` and `hexagon`; square avatars have rounded corners and hexagons use a rounded mask.

## Stack limits and overlap

AvatarStack provides default size and shape values for its children; individual Avatar props take precedence. `max` limits visible avatars without counting the additional overflow indicator. Omit it to show all avatars, or use 0 for an overflow-only group. Numeric overlap is clamped from 0 to 0.75; `sm`, `default` and `lg` use 0.15, 0.25 and 0.4. The `overflow` slot receives the hidden count. Set `label` to name the group; logical spacing supports right-to-left layouts.

## Dependencies

- **Packages:** [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [class-variance-authority](https://www.npmjs.com/package/class-variance-authority), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Avatar](https://reka-ui.com/docs/components/avatar)

See the [reference](/components/avatar/reference) for the complete component contract.
