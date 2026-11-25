---
title: "ButtonShadow"
component: ButtonShadow
componentPage: overview
---

## Preview

<ComponentExample name="ButtonShadow" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Round icon actions with an expanding halo.</li>
    <li>Status dots, status rings and countdown rings.</li>
    <li>Hover and keyboard-focus feedback.</li>
</ul>

## Icon colours and status

The default slot contains the icon. Supply `label`, `title` or `aria-label` as its accessible name. `iconColor` sets the icon colour independently; `muted` affects the resting icon when no explicit icon colour is supplied. Status dots use the same options as ButtonAction. `statusRing` adds a ring, and an enabled `timerRing` takes precedence over it.

## Countdown control

The internal countdown starts when the component mounts with `timerRing` enabled. `timerDuration` is in milliseconds and `timerPaused` pauses the countdown. Set `timerProgress` to a remaining percentage for externally controlled progress, or null to use the internal timer. The `timer-end` event fires at zero. Call `restartTimer()` through a template ref to reset the internal countdown; a controlled timer also needs its external progress updated.

## Dependencies

- **UI:** [Button](/components/button), [Indicator](/components/indicator)
- **Packages:** [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [clsx](https://www.npmjs.com/package/clsx), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/button-shadow/reference) for the complete component contract.
