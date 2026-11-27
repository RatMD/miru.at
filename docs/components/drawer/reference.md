---
title: "Drawer reference"
component: Drawer
componentPage: reference
---

The component and its building blocks share one reference. Types and declared defaults follow the package; native attributes also apply to the rendered elements.

## Drawer {#drawer}

A panel that opens from a screen edge, with swipe dismissal and optional snap positions. Supports managed focus, scrollable content and separate header and footer areas.

### Props {#drawer-props}

<ComponentApi name="Drawer" section="props" />

### Events {#drawer-emitted-events}

<ComponentApi name="Drawer" section="events" />

### Slots {#drawer-slots}

<ComponentApi name="Drawer" section="slots" />

### Models {#drawer-models}

<ComponentApi name="Drawer" section="models" />

## DrawerContent {#drawer-content}

The drawer surface, with a backdrop, optional handle and close button, and configurable scrolling.

### Props {#drawer-content-props}

<ComponentApi name="DrawerContent" section="props" />

### Events {#drawer-content-emitted-events}

<ComponentApi name="DrawerContent" section="events" />

### Slots {#drawer-content-slots}

<ComponentApi name="DrawerContent" section="slots" />

## DrawerHeader {#drawer-header}

A layout for the drawer heading and supporting text.

### Props {#drawer-header-props}

<ComponentApi name="DrawerHeader" section="props" />

### Slots {#drawer-header-slots}

<ComponentApi name="DrawerHeader" section="slots" />

## DrawerFooter {#drawer-footer}

A layout for drawer actions below the main content.

### Props {#drawer-footer-props}

<ComponentApi name="DrawerFooter" section="props" />

### Slots {#drawer-footer-slots}

<ComponentApi name="DrawerFooter" section="slots" />

## DrawerTitle {#drawer-title}

The accessible heading of a drawer.

### Props {#drawer-title-props}

<ComponentApi name="DrawerTitle" section="props" />

### Slots {#drawer-title-slots}

<ComponentApi name="DrawerTitle" section="slots" />

## DrawerDescription {#drawer-description}

Supporting text associated with the drawer for assistive technology.

### Props {#drawer-description-props}

<ComponentApi name="DrawerDescription" section="props" />

### Slots {#drawer-description-slots}

<ComponentApi name="DrawerDescription" section="slots" />


## Inherited building blocks

These public exports use the Reka UI contract directly and are composed inside this component family. Their inherited props, events and slots are documented upstream.

| Export | Purpose | Contract |
| --- | --- | --- |
| `DrawerTrigger` | Opens the drawer; use as-child for a custom trigger. | [Reka UI DrawerTrigger](https://reka-ui.com/docs/components/drawer) |
| `DrawerClose` | Closes the drawer. | [Reka UI DrawerClose](https://reka-ui.com/docs/components/drawer) |
| `DrawerHandle` | Provides the drawer’s drag handle. | [Reka UI DrawerHandle](https://reka-ui.com/docs/components/drawer) |
