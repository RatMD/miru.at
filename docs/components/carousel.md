---
title: "Carousel"
component: Carousel
componentPage: overview
---

## Preview

<ComponentExample name="Carousel" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Responsive slide sizing and keyboard navigation.</li>
    <li>Configurable navigation, effects and automatic movement.</li>
    <li>Pause controls and reduced-motion support.</li>
</ul>

## Slides, selection and responsive layout

Pass `items` and render content through the `slide` slot. Selection uses zero-based snap indices, which may represent groups of slides when `slidesToScroll` exceeds one. `slidesPerView` and `gap` accept `base`, `sm`, `md`, `lg` and `xl` values at viewport widths of 0, 640, 768, 1024 and 1280px. Values carry forward until overridden. Fade always uses one full-width slide with no gap and one slide per snap. The dedicated props override corresponding `options`; avoid overriding the container, slides or active state.

## Automatic movement and accessibility

Automatic movement pauses during dragging and while keyboard focus is inside the carousel; `pauseOnHover` also pauses it on hover. An explicit pause remains in effect until resumed. Reduced-motion preferences disable automatic movement and tween effects and make navigation instant. Keep a visible pause control when enabling automatic movement. Arrow keys follow the orientation and reading direction; Home and End select the first and last snaps. The `controls` slot replaces the bottom controls when that area is enabled; overlay arrows remain controlled separately by `navigation` and `navigationPosition`.

## Dependencies

- **UI:** [Button](/components/button), [Progress](/components/progress)
- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [class-variance-authority](https://www.npmjs.com/package/class-variance-authority), [clsx](https://www.npmjs.com/package/clsx), [embla-carousel](https://www.npmjs.com/package/embla-carousel), [embla-carousel-accessibility](https://www.npmjs.com/package/embla-carousel-accessibility), [embla-carousel-auto-height](https://www.npmjs.com/package/embla-carousel-auto-height), [embla-carousel-auto-scroll](https://www.npmjs.com/package/embla-carousel-auto-scroll), [embla-carousel-autoplay](https://www.npmjs.com/package/embla-carousel-autoplay), [embla-carousel-fade](https://www.npmjs.com/package/embla-carousel-fade), [embla-carousel-vue](https://www.npmjs.com/package/embla-carousel-vue), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/carousel/reference) for the complete component contract.
