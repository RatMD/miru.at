---
title: "OverlayNotice"
component: OverlayNotice
componentPage: overview
---

## Preview

<ComponentExample name="OverlayNotice" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Status icon, supporting content and a configurable close action.</li>
    <li>Pending-state dismissal protection and additional actions.</li>
</ul>

## Notice actions

Use `closeButton` to customise the standard action, or add controls through the actions slot. The action object accepts `label`, `variant`, `size`, `icon` and `disabled`; `icon: null` hides its icon. The standard close action emits `close`; Escape and outside dismissal only update `open`. `loading` blocks dismissal, while `dismissible=false` still allows the explicit footer close action.

## Dependencies

- **UI:** [Button](/components/button), [Overlay](/components/overlay)
- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/overlay-notice/reference) for the complete component contract.
