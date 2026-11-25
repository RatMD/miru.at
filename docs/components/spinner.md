---
title: "Spinner"
component: Spinner
componentPage: overview
---

## Preview

<ComponentExample name="Spinner" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Compact animated loading indicators.</li>
    <li>Theme colours and configurable sizes.</li>
    <li>Accessible labels or decorative use beside existing status text.</li>
</ul>

## Loading labels and motion

Spinner renders a status element with an accessible label. Use `label` for context-specific loading text, or set `decorative` when nearby content already announces the loading state. Decorative mode removes the status role and label and hides the indicator from assistive technology. Both rotation modes stop when reduced motion is requested. Spinner exposes no component-specific events, slots or model bindings.

## Dependencies

- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [class-variance-authority](https://www.npmjs.com/package/class-variance-authority), [clsx](https://www.npmjs.com/package/clsx), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/spinner/reference) for the complete component contract.
