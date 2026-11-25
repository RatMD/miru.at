---
title: "AspectRatio"
component: AspectRatio
componentPage: overview
---

## Preview

<ComponentExample name="AspectRatio" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Named presets and custom ratio expressions.</li>
    <li>Responsive media framing without fixed heights.</li>
</ul>

## Ratios and media

Use a positive number or an expression such as `16x9`, `4:3` or `4/3`. A supplied ratio takes precedence over the preset; invalid values fall back to a square. Presets are square (1:1), video (16:9), photo (4:3), portrait (3:4) and cinema (21:9).

```vue
<AspectRatio preset="video" class="rounded-lg">
    <img src="/landscape.jpg" alt="A coastal landscape" class="size-full object-cover" />
</AspectRatio>
```

The frame controls geometry; choose `object-cover` to crop media or `object-contain` to retain the complete image.

## Dependencies

- **Packages:** [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Aspect Ratio](https://reka-ui.com/docs/components/aspect-ratio)

See the [reference](/components/aspect-ratio/reference) for the complete component contract.
