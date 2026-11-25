---
title: Accordion
component: Accordion
componentPage: overview
description: Collapsible sections with single or multiple selection, keyboard navigation and flexible headers.
---

## Preview

<ComponentExample name="Accordion" :show-playground="false" />

## Features

<ul class="component-features">
  <li>Open one section at a time or several together.</li>
  <li>Manage open sections with a model or an initial default value.</li>
  <li>Navigate section triggers with the keyboard.</li>
  <li>Add descriptions, badges and independent header actions.</li>
  <li>Choose toggle icons and limit content height with a scroll area.</li>
</ul>

## Composition

Accordion provides the shared state. Each item contains a header, a trigger and collapsible content.

```vue
<Accordion type="single" collapsible default-value="delivery">
    <AccordionItem value="delivery">
        <AccordionHeader>
            <AccordionTrigger>When will my order arrive?</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
            Standard delivery usually takes three to five working days.
        </AccordionContent>
    </AccordionItem>
    <AccordionItem value="returns">
        <AccordionHeader>
            <AccordionTrigger>Can I return an item?</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>Contact the shop to arrange a return.</AccordionContent>
    </AccordionItem>
</Accordion>
```

### Single or multiple sections

Use `type="single"` with a string value, or `type="multiple"` with an array of values. Add `collapsible` to allow closing the last open item in single mode. Bind `v-model` when the application manages the open sections, or set `defaultValue` for local state.

### Keyboard navigation

Use Up and Down to move between triggers, Home and End to reach the first or last trigger, and Enter or Space to toggle a section. `orientation` changes the arrow-key navigation axis; Miru retains its vertical layout.

### Icons and header content

Set `iconMode` on Accordion or override it on AccordionTrigger: `default` uses a down chevron, `modern` a left chevron, and `operator` a plus/minus symbol. The trigger’s `description` and `badges` slots add supporting content; the header’s `actions` slot keeps independent actions beside the trigger.

### Scrollable content

Set `maxHeight` on AccordionContent to a number of pixels or a CSS length, such as `240` or `12rem`, to scroll longer content within a ScrollArea.

## Dependencies

- **UI:** [ButtonAction](/components/api/button-action), [ScrollArea](/components/api/scroll-area)
- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Accordion](https://reka-ui.com/docs/components/accordion)

For every prop, event, slot and model, see the [Accordion reference](/components/accordion/reference).
