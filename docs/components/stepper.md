---
title: Stepper
component: Stepper
componentPage: overview
---

## Preview

<ComponentExample name="Stepper" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Connected indicators or a bordered, segmented heading.</li>
    <li>Numbers, custom icons, completion ticks and individual error states.</li>
    <li>Guarded navigation with asynchronous validation and loading feedback.</li>
    <li>Horizontal, vertical, compact and scrollable mobile layouts.</li>
    <li>Optional content panels and translated navigation actions.</li>
</ul>

## Composition

Place numbered StepperItem components inside StepperList. Each item contains a StepperTrigger with an indicator and label; add a separator after every item except the last. Use consecutive positive step numbers starting at 1, and bind `v-model` when the application controls the active step.

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
    Stepper, StepperActions, StepperContent, StepperIndicator,
    StepperItem, StepperLabel, StepperList, StepperSeparator,
    StepperTitle, StepperTrigger,
} from '@rat.md/miru';

const step = ref(1);
const finished = ref(false);
</script>

<template>
    <Stepper v-model="step" @complete="finished = true">
        <StepperList>
            <StepperItem :step="1">
                <StepperTrigger>
                    <StepperIndicator />
                    <StepperLabel><StepperTitle>Details</StepperTitle></StepperLabel>
                </StepperTrigger>
                <StepperSeparator />
            </StepperItem>
            <StepperItem :step="2">
                <StepperTrigger>
                    <StepperIndicator />
                    <StepperLabel><StepperTitle>Review</StepperTitle></StepperLabel>
                </StepperTrigger>
            </StepperItem>
        </StepperList>
        <StepperContent :step="1" force-mount>Enter your details.</StepperContent>
        <StepperContent :step="2">Check your details before continuing.</StepperContent>
        <StepperActions complete-label="Confirm" />
    </Stepper>
    <p v-if="finished" role="status">Your details are confirmed.</p>
</template>
```

StepperContent can also sit inside StepperItem, where its step number is inferred. Inactive content is unmounted by default; `force-mount` keeps it mounted but hidden, preserving local field state. A stepper does not provide a form controller or submit data itself.

## Navigation guards

`linear` limits forward navigation to the next registered step. Set it to `false` to allow direct selection of later steps. `beforeChange` checks every navigation request, including backward navigation and final completion; `beforeNext` then checks forward navigation and completion. Both accept a synchronous or asynchronous callback.

Return `false` or an error message to stay on the current step; return `true` or nothing to continue. While an asynchronous guard is pending, selection and actions are blocked. A thrown or rejected error emits `error` and displays translated retry feedback. Direct changes to the bound model bypass these guards, so route validated user navigation through the provided actions or methods.

```ts
import type { StepperGuard } from '@rat.md/miru';

const beforeNext: StepperGuard = async ({ from }) => {
    const valid = await validateStep(from);
    if (!valid) return 'Please check this step before continuing.';
};
```

Here `validateStep` represents your application’s validation function. Pass the callback with `:before-next="beforeNext"`. The final action emits `complete` only after the last step passes its guards; handle persistence or navigation in the application.

## Appearance

Use `variant="default"` for connected indicators or `variant="bordered"` for a segmented heading. `color` and `completedColor` set the active and completed semantic colours; `inactiveAppearance` controls upcoming indicators. StepperIndicator accepts an icon component, and `showCheck` controls the completion tick. Item-level `error`, `disabled` and `completed` props describe individual steps.

Below `mobileBreakpoint` (640 px by default), `mobileLayout` selects one of four treatments:

| Layout | Behaviour |
| --- | --- |
| `vertical` | Stack the step headings vertically. |
| `compact` | Hide inactive labels wrapped in StepperLabel. |
| `scroll` | Keep the navigation in a horizontally scrollable strip. |
| `same` | Retain the desktop layout. |

Set `mobile` explicitly for an embedded preview, or leave it unset to follow the viewport. StepperTitle names the trigger and content region; preserve it when customising headings. Arrow keys move focus through the primitive navigation, while Enter or Space requests selection through the guards.

## Dependencies

- **UI:** [Button](/components/button), [ScrollArea](/components/scroll-area)
- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Stepper](https://reka-ui.com/docs/components/stepper)

See the [reference](/components/stepper/reference) for every building block, navigation method and slot.
