---
title: "OverlayChoice"
component: OverlayChoice
componentPage: overview
---

## Preview

<ComponentExample name="OverlayChoice" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Primary and secondary confirmation actions.</li>
    <li>Pending feedback and errors with application-controlled completion.</li>
</ul>

## Confirmation state

Handle `confirm` in the application, set `loading` while work runs and update `open` after success. `closeOnConfirm` defaults to false so errors can remain visible. The `error` prop displays an Alert and switches the heading to danger styling.

The `primary` and `secondary` action objects accept `label`, `variant`, `size`, `icon` and `disabled`; use `icon: null` to hide a fallback icon. `disabled` blocks confirmation, while `loading` blocks both actions. The cancel button emits `cancel`; Escape and outside dismissal only update `open`.

## Dependencies

- **UI:** [Alert](/components/alert), [AlertDescription](/components/alert/reference#alert-description), [Button](/components/button), [Overlay](/components/overlay)
- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/overlay-choice/reference) for the complete component contract.
