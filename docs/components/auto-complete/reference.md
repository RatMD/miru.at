---
title: "AutoComplete reference"
component: AutoComplete
componentPage: reference
---

The component and its building blocks share one reference. Types and declared defaults follow the package; native attributes also apply to the rendered elements.

## AutoComplete {#auto-complete}

A text input with optional suggestions, keyboard navigation and a clear action. Accepts free text or a suggestion, with support for grouped options and application-loaded results.

### Props {#auto-complete-props}

<ComponentApi name="AutoComplete" section="props" />

### Events {#auto-complete-emitted-events}

<ComponentApi name="AutoComplete" section="events" />

### Slots {#auto-complete-slots}

<ComponentApi name="AutoComplete" section="slots" />

### Models {#auto-complete-models}

<ComponentApi name="AutoComplete" section="models" />

## AutoCompleteAnchor {#auto-complete-anchor}

A positioning anchor for the autocomplete input and suggestion list.

### Props {#auto-complete-anchor-props}

<ComponentApi name="AutoCompleteAnchor" section="props" />

### Slots {#auto-complete-anchor-slots}

<ComponentApi name="AutoCompleteAnchor" section="slots" />

## AutoCompleteInput {#auto-complete-input}

The text input within a composed autocomplete.

### Props {#auto-complete-input-props}

<ComponentApi name="AutoCompleteInput" section="props" />

### Events {#auto-complete-input-emitted-events}

<ComponentApi name="AutoCompleteInput" section="events" />

### Models {#auto-complete-input-models}

<ComponentApi name="AutoCompleteInput" section="models" />

## AutoCompleteList {#auto-complete-list}

The floating autocomplete suggestion list, with positioning and dismissal controls.

### Props {#auto-complete-list-props}

<ComponentApi name="AutoCompleteList" section="props" />

### Events {#auto-complete-list-emitted-events}

<ComponentApi name="AutoCompleteList" section="events" />

### Slots {#auto-complete-list-slots}

<ComponentApi name="AutoCompleteList" section="slots" />

## AutoCompleteViewport {#auto-complete-viewport}

The viewport containing autocomplete suggestions.

### Props {#auto-complete-viewport-props}

<ComponentApi name="AutoCompleteViewport" section="props" />

### Slots {#auto-complete-viewport-slots}

<ComponentApi name="AutoCompleteViewport" section="slots" />

## AutoCompleteItem {#auto-complete-item}

One suggestion that can replace the autocomplete text.

### Props {#auto-complete-item-props}

<ComponentApi name="AutoCompleteItem" section="props" />

### Events {#auto-complete-item-emitted-events}

<ComponentApi name="AutoCompleteItem" section="events" />

### Slots {#auto-complete-item-slots}

<ComponentApi name="AutoCompleteItem" section="slots" />

## AutoCompleteEmpty {#auto-complete-empty}

Content displayed when no autocomplete suggestions match.

### Props {#auto-complete-empty-props}

<ComponentApi name="AutoCompleteEmpty" section="props" />

### Slots {#auto-complete-empty-slots}

<ComponentApi name="AutoCompleteEmpty" section="slots" />

## AutoCompleteGroup {#auto-complete-group}

A group of autocomplete suggestions with an optional heading.

### Props {#auto-complete-group-props}

<ComponentApi name="AutoCompleteGroup" section="props" />

### Slots {#auto-complete-group-slots}

<ComponentApi name="AutoCompleteGroup" section="slots" />

## AutoCompleteSeparator {#auto-complete-separator}

A visual divider between autocomplete suggestions or groups.

### Props {#auto-complete-separator-props}

<ComponentApi name="AutoCompleteSeparator" section="props" />

### Slots {#auto-complete-separator-slots}

<ComponentApi name="AutoCompleteSeparator" section="slots" />


## Inherited building blocks

These public exports use the Reka UI contract directly and are composed inside this component family. Their inherited props, events and slots are documented upstream.

| Export | Purpose | Contract |
| --- | --- | --- |
| `AutoCompleteTrigger` | Opens the suggestion list. | [Reka UI AutoCompleteTrigger](https://reka-ui.com/docs/components/autocomplete) |
| `AutoCompleteCancel` | Clears the input value. | [Reka UI AutoCompleteCancel](https://reka-ui.com/docs/components/autocomplete) |
| `AutoCompleteLabel` | Provides an associated label. | [Reka UI AutoCompleteLabel](https://reka-ui.com/docs/components/autocomplete) |
