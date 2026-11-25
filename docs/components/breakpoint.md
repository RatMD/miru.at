---
title: "Breakpoint"
component: Breakpoint
componentPage: overview
---

## Preview

<ComponentExample name="Breakpoint" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Named or numeric viewport ranges and orientation checks.</li>
    <li>Renderless branches with SSR viewport support.</li>
</ul>

## Viewport ranges

`min` is inclusive and `max` is exclusive. Use CSS pixels or a named threshold; local `breakpoints` override application settings, which override the defaults.

| Name | Width |
| --- | --- |
| xxs | 364 px |
| xs | 576 px |
| sm | 640 px |
| md | 768 px |
| lg | 1024 px |
| xl | 1280 px |
| xxl | 1536 px |

```vue
<Breakpoint min="md" max="xl">
    <template #default="{ width }">Workspace width: {{ width }}</template>
    <template #else>Compact or extra-wide layout</template>
</Breakpoint>
```

Import `defaultBreakpoints` for the immutable default map. Configure shared thresholds with `createMiru({ breakpoints: { md: 900, tablet: 960 } })`; unknown names or invalid thresholds raise RangeError. Both slots receive width, height, orientation and current, without an extra wrapper.

## Server rendering

Without an explicit SSR viewport, the else branch renders on the server and during initial hydration. Browser dimensions initialise after mount. When supplying an initial estimate, pass the same `ssrWidth` and `ssrHeight` on server and client; orientation rules require height as well as width.

Switching branches unmounts their content. Use CSS media queries when both branches should remain mounted or only presentation changes.

## Dependencies

- **Packages:** [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/breakpoint/reference) for the complete component contract.
