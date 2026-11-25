---
title: "Carousel reference"
component: Carousel
componentPage: reference
---

Props, events, slots and models for Carousel. Types and declared defaults follow the package; native attributes also apply to the rendered element.

## Carousel {#carousel}

A carousel for browsing slides with responsive sizing, keyboard navigation and configurable controls. Add visual effects or automatic movement with pause controls and reduced-motion support.

### Props {#carousel-props}

<ComponentApi name="Carousel" section="props" />

### Events {#carousel-emitted-events}

<ComponentApi name="Carousel" section="events" />

### Slots {#carousel-slots}

<ComponentApi name="Carousel" section="slots" />

### Models {#carousel-models}

<ComponentApi name="Carousel" section="models" />

## Template ref {#carousel-template-ref}

A template ref exposes `api` for the Embla instance, `previous()` and `next()` for adjacent snaps, and `goTo(index, instant?)` for a specific snap. Use `play()` and `pause()` to control configured automatic movement, and `reInit()` to recalculate the carousel layout. The instance becomes available after initialisation; the `ready` event also provides it.
