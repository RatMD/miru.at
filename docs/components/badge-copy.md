---
title: "BadgeCopy"
component: BadgeCopy
componentPage: overview
---

## Preview

<ComponentExample name="BadgeCopy" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Clipboard copying with success feedback.</li>
    <li>Plain text or multiple MIME representations.</li>
    <li>Badge colours, sizes and optional custom icons.</li>
</ul>

## Clipboard content and visible labels

Pass a string to `content` and optionally set its MIME `type`, or pass an object whose keys are MIME types and whose values are strings. The default slot changes the visible label without changing the copied content; supply it for a MIME map. Copy uses the browser Clipboard API, so clipboard access must be available. The outer element is a button, with translated copy and copied labels unless `label` is supplied.

## Icons, sizing and custom classes

Supply an icon component through `icon`, or replace it with the `icon` slot. `iconClass` applies to the icon prop; style slotted icons directly. `iconPosition` moves direct SVG icons to the left or right. `class` styles the outer copy button and `badgeClass` styles the inner badge, whose default width limit is 180px. BadgeCopy exposes no component-specific events or model bindings.

## Dependencies

- **UI:** [Badge](/components/badge), [Copy](/components/api/copy)
- **Packages:** [clsx](https://www.npmjs.com/package/clsx), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/badge-copy/reference) for the complete component contract.
