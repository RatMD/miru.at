---
title: Carousel guide
component: Carousel
componentPage: guide
---

Carousel combines responsive slides, navigation and optional motion in one component. It uses Embla Carousel and configures its plugins for you; supply slide data and render the content through a slot.

## A responsive carousel

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { Carousel } from '@rat.md/miru';

const page = ref(0);
const slides = [
    { id: 'design', title: 'Design', description: 'Plan the next release.' },
    { id: 'build', title: 'Build', description: 'Turn the plan into working features.' },
    { id: 'review', title: 'Review', description: 'Check the details together.' },
];
</script>

<template>
    <Carousel
        v-model="page"
        :items="slides"
        :get-key="(slide) => slide.id"
        :slides-per-view="{ base: 1, md: 2, lg: 3 }"
        :gap="{ base: 12, md: 20 }"
        align="start"
        label="Release workflow">
        <template #slide="{ item }">
            <article class="rounded-md border p-6">
                <h3 class="font-semibold">{{ item.title }}</h3>
                <p>{{ item.description }}</p>
            </article>
        </template>
    </Carousel>
</template>
```

Use stable keys when slides change. The `slide` slot receives `item`, `index` and `selected`; `empty` replaces the no-items state. Images, their dimensions and meaningful alternative text belong to your slide content.

## Embla packages

The current package pins the following Embla dependencies to `9.0.0-rc04`. The links below lead to the matching official documentation. Miru supplies the plugin configuration; consumers do not pass a plugin array.

| Package                                                                                   | Purpose in Miru                                                                                                                   |
| ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| [embla-carousel](https://www.embla-carousel.com/docs/api/)                                | Core slide measurement, snaps, dragging, navigation and instance API.                                                             |
| [embla-carousel-accessibility](https://www.embla-carousel.com/docs/plugins/accessibility) | Region and slide semantics, control labels and live announcements. Miru suppresses slide announcements during automatic movement. |
| [embla-carousel-auto-height](https://www.embla-carousel.com/docs/plugins/auto-height)     | Adapts the viewport height to visible slides when `autoHeight` is enabled in horizontal layouts.                                  |
| [embla-carousel-auto-scroll](https://www.embla-carousel.com/docs/plugins/auto-scroll)     | Continuous motion controlled by `autoScroll`, `autoScrollSpeed` and `autoScrollDirection`.                                        |
| [embla-carousel-autoplay](https://www.embla-carousel.com/docs/plugins/autoplay)           | Advances between snaps after `autoplayDelay` when `autoplay` is enabled.                                                          |
| [embla-carousel-fade](https://www.embla-carousel.com/docs/plugins/fade)                   | Cross-fades slides when `effect="fade"` is selected.                                                                              |
| [embla-carousel-vue](https://www.embla-carousel.com/docs/get-started/vue)                 | Vue integration, reactive options and cleanup on unmount.                                                                         |

Further reading: [options](https://www.embla-carousel.com/docs/api/options), [methods](https://www.embla-carousel.com/docs/api/methods) and [official examples](https://www.embla-carousel.com/docs/examples/predefined). Scale, parallax and opacity effects are implemented by Miru rather than separate Embla packages.

## Layout and selection

`slidesPerView` and `gap` accept a single value or a map with `base`, `sm`, `md`, `lg` and `xl`. Breakpoints are viewport-based at 0, 640, 768, 1024 and 1280px; values carry forward until overridden. Numeric gaps and heights are pixels. For vertical layouts, set `orientation="vertical"` and a suitable `height`.

`slidesToScroll` determines snap groups. Model values and `goTo(index)` use zero-based **snap indices**, which can differ from slide indices. `change` reports the snap index and total snap count. `loop` can wrap only when enough slide content is available for the chosen layout.

Use `navigationPosition="bottom"` or `overlay` for the arrows. Pagination supports `dots`, `numbers`, `counter`, `progress` and `none`. The `controls` slot replaces the bottom controls when that area is enabled and receives navigation methods, selection, snap count and playback state. Overlay arrows are controlled separately.

## Effects and automatic movement

| Option                           | Behaviour                                                                           |
| -------------------------------- | ----------------------------------------------------------------------------------- |
| `effect`                         | `slide`, `fade`, `scale`, `parallax` or `opacity`.                                  |
| `effectStrength`                 | Scale, parallax or opacity strength; omitted values use an effect-specific default. |
| `duration`                       | Embla transition duration, not milliseconds; 0 is instant.                          |
| `autoplay` / `autoplayDelay`     | Advance between snaps; delay defaults to 4000ms.                                    |
| `autoScroll` / `autoScrollSpeed` | Continuous movement; takes precedence over autoplay.                                |
| `autoHeight`                     | Adapt horizontal viewport height to visible slide content.                          |
| `pauseOnHover`                   | Pause automatic movement while the pointer is over the carousel.                    |
| `showPlayButton`                 | Show the play/pause control when automatic movement is requested.                   |

Fade uses one full-width slide, no gap and one slide per snap, and disables free dragging. Continuous auto-scroll is ignored with fade; use autoplay instead. Scale and opacity transform an inner content wrapper. Parallax clips and moves that wrapper, so image-led content is a useful fit.

## Accessibility and instance access

Automatic movement pauses during dragging, on keyboard focus and, by default, on hover. An explicit pause remains in effect until resumed. Keep a visible pause control for moving content. Reduced-motion preferences disable automatic movement and tween effects and make navigation instant.

Arrow keys follow the orientation and reading direction; Home and End select the first and last snaps. Text inputs and editable content retain their own keys. Use `label` for a meaningful region name; `locale` overrides the language of built-in labels and number formatting.

The `ready` event provides the Embla instance. A template ref exposes `api`, `previous()`, `next()`, `goTo(index, instant?)`, `play()`, `pause()` and `reInit()`. `options` accepts additional Embla options, but dedicated Miru props override their corresponding settings. Keep the wrapper’s container and slide structure intact.

Reference: [Carousel API](/components/carousel).
