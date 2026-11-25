---
title: Indicator
component: Indicator
componentPage: overview
---

## Preview

<ComponentExample name="Indicator" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Dots, numbers, short labels, icons or custom slot content.</li>
    <li>Nine overlay positions with optional horizontal and vertical offsets.</li>
    <li>Semantic and custom CSS colours, with configurable content foreground.</li>
    <li>Optional numeric caps, zero visibility, pulse and ping animations.</li>
    <li>Inline use in badges and overlays on buttons, icons and avatars.</li>
</ul>

## Composition

Place the target in the default slot and enable `overlay`. Omit `value` and `icon` for a dot. Without `overlay`, the indicator stays in the inline flow.

```vue
<Indicator overlay :value="5" color="danger" aria-label="5 unread notifications">
    <ButtonAction label="Notifications"><IconBell /></ButtonAction>
</Indicator>

<Indicator overlay value="New" color="warning" position="top-left">
    <ButtonAction label="Messages"><IconMail /></ButtonAction>
</Indicator>

<Indicator overlay color="success" position="bottom-right" ping>
    <Avatar><AvatarFallback>AM</AvatarFallback></Avatar>
</Indicator>
```

### Positions and offsets

`position` defaults to `top-right`. Choose the top, centre or bottom row and left, centre or right column; the middle position is named `center`. `offsetX` and `offsetY` accept pixels or CSS lengths. Positive values move right and down. Overlay indicators use a real alpha mask on the wrapped content. The transparent `cutoutGap` defaults to 2px and reveals any background, including gradients. Set `cutout=false` to disable the mask. No surface colour or parent-component configuration is needed; the cutout stays steady during hover and animations.

### Counts and custom content

`max` only caps numeric values: `:value="120" :max="99"` renders `99+`. Text such as `value="00120"` is preserved. Numeric zero is shown by default; `showZero=false` hides it. `visible=false` hides any indicator while retaining the target.

Use `icon` for a Vue icon component, optionally together with `value`, or supply the `indicator` slot. That slot receives the original `value` and capped `displayValue`, allowing custom number formatting and composition.

### Accessibility and themes

Counts and labels remain readable. Plain dots and unlabelled icons are decorative; add `ariaLabel` to describe their meaning or the full count. `announce` opts into polite status updates. Semantic colours use the theme foreground; opaque custom hex colours choose readable black or white. Set `foreground` for other custom CSS colours when needed. Animations respect reduced-motion preferences.

ButtonAction and ButtonShadow retain their existing `statusDot`, `statusDotPulse` and `statusDotPing` options. They use Indicator internally and hide their dots while loading. Wrap a button in Indicator for a count, label or custom placement.

## Dependencies

- **Packages:** [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [clsx](https://www.npmjs.com/package/clsx), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)

For every prop and slot, see the [Indicator reference](/components/indicator/reference).
