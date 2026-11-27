---
title: "Dialog reference"
component: Dialog
componentPage: reference
---

The component and its building blocks share one reference. Types and declared defaults follow the package; native attributes also apply to the rendered elements.

## Dialog {#dialog}

A dialog for focused tasks, with managed focus, accessible headings and configurable content widths. Compose its content, description and footer around the task.

### Props {#dialog-props}

<ComponentApi name="Dialog" section="props" />

### Events {#dialog-emitted-events}

<ComponentApi name="Dialog" section="events" />

### Slots {#dialog-slots}

<ComponentApi name="Dialog" section="slots" />

### Models {#dialog-models}

<ComponentApi name="Dialog" section="models" />

## DialogContent {#dialog-content}

The centred dialog surface, including its backdrop and optional close button.

### Props {#dialog-content-props}

<ComponentApi name="DialogContent" section="props" />

### Events {#dialog-content-emitted-events}

<ComponentApi name="DialogContent" section="events" />

### Slots {#dialog-content-slots}

<ComponentApi name="DialogContent" section="slots" />

## DialogDescription {#dialog-description}

Supporting text associated with the dialog for assistive technology.

### Props {#dialog-description-props}

<ComponentApi name="DialogDescription" section="props" />

### Slots {#dialog-description-slots}

<ComponentApi name="DialogDescription" section="slots" />

## DialogTitle {#dialog-title}

The accessible heading of a dialog.

### Props {#dialog-title-props}

<ComponentApi name="DialogTitle" section="props" />

### Slots {#dialog-title-slots}

<ComponentApi name="DialogTitle" section="slots" />

## DialogFooter {#dialog-footer}

A layout for dialog actions, with an optional top border.

### Props {#dialog-footer-props}

<ComponentApi name="DialogFooter" section="props" />

### Slots {#dialog-footer-slots}

<ComponentApi name="DialogFooter" section="slots" />


## Inherited building blocks

These public exports use the Reka UI contract directly and are composed inside this component family. Their inherited props, events and slots are documented upstream.

| Export | Purpose | Contract |
| --- | --- | --- |
| `DialogTrigger` | Opens the dialog; use as-child to compose a Miru Button. | [Reka UI DialogTrigger](https://reka-ui.com/docs/components/dialog) |
| `DialogClose` | Closes the dialog; use as-child for a custom close control. | [Reka UI DialogClose](https://reka-ui.com/docs/components/dialog) |
