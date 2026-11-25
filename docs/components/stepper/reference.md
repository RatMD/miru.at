---
title: Stepper reference
component: Stepper
componentPage: reference
---

The root and its building blocks share one reference. Native attributes also apply to the rendered elements.

## Stepper {#stepper}

A sequence of steps for guiding people through a task, with progress indicators and optional content. Supports guarded navigation, asynchronous validation and responsive layouts.

### Props {#stepper-props}

<ComponentApi name="Stepper" section="props" />

### Events {#stepper-emitted-events}

<ComponentApi name="Stepper" section="events" />

### Slots {#stepper-slots}

<ComponentApi name="Stepper" section="slots" />

### Models {#stepper-models}

<ComponentApi name="Stepper" section="models" />

### Template ref {#stepper-template-ref}

<ComponentApi name="Stepper" section="exposed" />

## StepperList {#stepper-list}

Arrange the step headings and connectors within a scrollable navigation area.

### Props {#stepper-list-props}

<ComponentApi name="StepperList" section="props" />

### Slots {#stepper-list-slots}

<ComponentApi name="StepperList" section="slots" />

## StepperItem {#stepper-item}

Register a numbered step with its completion, disabled and error state.

### Props {#stepper-item-props}

<ComponentApi name="StepperItem" section="props" />

### Slots {#stepper-item-slots}

<ComponentApi name="StepperItem" section="slots" />

## StepperTrigger {#stepper-trigger}

An accessible control for selecting a step through the navigation guards.

### Props {#stepper-trigger-props}

<ComponentApi name="StepperTrigger" section="props" />

### Slots {#stepper-trigger-slots}

<ComponentApi name="StepperTrigger" section="slots" />

## StepperIndicator {#stepper-indicator}

Show the step number, a custom icon or a completion tick.

### Props {#stepper-indicator-props}

<ComponentApi name="StepperIndicator" section="props" />

### Slots {#stepper-indicator-slots}

<ComponentApi name="StepperIndicator" section="slots" />

## StepperLabel {#stepper-label}

Group a step’s title and description for responsive label visibility.

### Props {#stepper-label-props}

<ComponentApi name="StepperLabel" section="props" />

### Slots {#stepper-label-slots}

<ComponentApi name="StepperLabel" section="slots" />

## StepperTitle {#stepper-title}

Name a step and label its trigger and content region.

### Props {#stepper-title-props}

<ComponentApi name="StepperTitle" section="props" />

### Slots {#stepper-title-slots}

<ComponentApi name="StepperTitle" section="slots" />

## StepperDescription {#stepper-description}

Add supporting text beneath a step title.

### Props {#stepper-description-props}

<ComponentApi name="StepperDescription" section="props" />

### Slots {#stepper-description-slots}

<ComponentApi name="StepperDescription" section="slots" />

## StepperSeparator {#stepper-separator}

Draw a connector between neighbouring step headings.

### Props {#stepper-separator-props}

<ComponentApi name="StepperSeparator" section="props" />

## StepperContent {#stepper-content}

Display content for the active step, with optional state retention while hidden.

### Props {#stepper-content-props}

<ComponentApi name="StepperContent" section="props" />

### Slots {#stepper-content-slots}

<ComponentApi name="StepperContent" section="slots" />

## StepperActions {#stepper-actions}

Provide translated navigation actions, loading feedback and error messages.

### Props {#stepper-actions-props}

<ComponentApi name="StepperActions" section="props" />

### Slots {#stepper-actions-slots}

<ComponentApi name="StepperActions" section="slots" />

## Transition types

```ts
export interface StepperTransition {
    from: number;
    to: number | undefined;
    action: 'next' | 'previous' | 'select' | 'complete';
}

export type StepperGuard = (
    transition: StepperTransition,
) => boolean | string | void | Promise<boolean | string | void>;
```

`to` is undefined for final completion. Navigation methods resolve to whether the request was accepted; with a controlled model, update the bound value when `update:modelValue` is emitted.
