---
title: Accordion reference
component: Accordion
componentPage: reference
description: Props, events, slots and models for Accordion, AccordionItem, AccordionHeader, AccordionTrigger and AccordionContent.
---

All five parts share one reference. Types and declared defaults follow the package; native attributes also apply to the rendered elements.

## Accordion

The root shares open state, interaction settings and the default toggle icon with its items.

### Props {#accordion-props}

<ComponentApi name="Accordion" section="props" />

### Events {#accordion-emitted-events}

<ComponentApi name="Accordion" section="events" />

### Slots {#accordion-slots}

<ComponentApi name="Accordion" section="slots" />

### Models {#accordion-models}

<ComponentApi name="Accordion" section="models" />

## AccordionItem {#accordion-item}

A section with a unique value. Its header, trigger and content belong inside the item.

### Props {#accordion-item-props}

<ComponentApi name="AccordionItem" section="props" />

### Slots {#accordion-item-slots}

<ComponentApi name="AccordionItem" section="slots" />

## AccordionHeader {#accordion-header}

Groups the trigger and independent header actions. Nested ButtonAction components inherit a muted resting appearance unless their own props override it.

### Props {#accordion-header-props}

<ComponentApi name="AccordionHeader" section="props" />

### Slots {#accordion-header-slots}

<ComponentApi name="AccordionHeader" section="slots" />

## AccordionTrigger {#accordion-trigger}

The button that toggles a section, with optional descriptions and badges. Give it a clear section title and place independent buttons in AccordionHeader’s actions slot.

### Props {#accordion-trigger-props}

<ComponentApi name="AccordionTrigger" section="props" />

### Slots {#accordion-trigger-slots}

<ComponentApi name="AccordionTrigger" section="slots" />

## AccordionContent {#accordion-content}

The collapsible body. Set `maxHeight` to constrain longer content within a ScrollArea.

### Props {#accordion-content-props}

<ComponentApi name="AccordionContent" section="props" />

### Slots {#accordion-content-slots}

<ComponentApi name="AccordionContent" section="slots" />
