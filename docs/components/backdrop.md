---
title: "Backdrop"
component: Backdrop
componentPage: overview
---

## Preview

<ComponentExample name="Backdrop" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Tint, blur and optional radial fading.</li>
    <li>Fixed or container-relative positioning.</li>
</ul>

## Dimming and blur

`blur` accepts false, true (12 px), a pixel number, or sm/default/lg/xl (4/12/20/32 px). `faded` applies a radial mask to both tint and blur, strongest at `origin` and fading towards the farthest corner. Without backdrop-filter support, the tint still provides a backdrop.

```vue
<Backdrop
    :visible="menuOpen"
    blur="lg"
    faded
    :origin="{ x: menuCentreX, y: menuCentreY }"
    interactive
    @click="menuOpen = false" />
```

## Position and interaction

Fixed layers use viewport coordinates. For `position="absolute"`, use a positioned container and subtract its bounds from pixel coordinates; percentage or CSS-length origins also work. The default origin is centred.

Backdrop is decorative and pointer-transparent unless `interactive` is enabled. Keep the active trigger and floating content above it. The application controls visibility; use [Dialog](/components/dialog), [Sheet](/components/sheet) or [Popover](/components/popover) for focus management, keyboard dismissal or modal behaviour. Backdrop does not teleport or lock page scrolling. Its transition respects reduced-motion preferences.

## Dependencies

- **Packages:** [clsx](https://www.npmjs.com/package/clsx), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/backdrop/reference) for the complete component contract.
