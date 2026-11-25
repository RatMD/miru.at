---
title: "Anchor"
component: Anchor
componentPage: overview
---

## Preview

<ComponentExample name="Anchor" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Theme colours and animated underlines.</li>
    <li>External-link indicators and router-link composition.</li>
    <li>Keyboard focus and disabled navigation.</li>
</ul>

## Underlines and motion

Use `underline="hover"` to reveal the underline on hover and keyboard focus, `always` to keep it visible, or `none` to hide it. `animation="fade"` transitions the underline colour; `slide` draws the hover underline from left to right and clears it towards the right. Transitions respect reduced-motion preferences.

## External destinations

Set `external` to show an external-link icon. A `target="_blank"` link shows the icon automatically and adds `noopener noreferrer` to any supplied `rel` values. The `external` prop only controls the icon; it does not change the browsing target.

## Router links and disabled state

Use `asChild` with a single native or router link in the default slot. The child receives the link attributes, classes and external icon. Supply routing props on the child and avoid conflicting native attributes. `disabled` blocks primary and auxiliary navigation, suppresses click handlers and removes the link from the tab order. Anchor exposes a `click` event and no model bindings.

## Dependencies

- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [class-variance-authority](https://www.npmjs.com/package/class-variance-authority), [clsx](https://www.npmjs.com/package/clsx), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/anchor/reference) for the complete component contract.
