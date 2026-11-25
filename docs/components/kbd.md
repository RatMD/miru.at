---
title: "Kbd"
component: Kbd
componentPage: overview
---

## Preview

<ComponentExample name="Kbd" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Keycap styling for individual keys.</li>
    <li>Grouped keyboard shortcuts with KbdGroup.</li>
    <li>Compact sizes that fit labels and supporting text.</li>
</ul>

## Shortcut labels and behaviour

Kbd and KbdGroup render native `kbd` elements and describe keyboard input without registering keyboard handlers. Supply a readable `aria-label` when symbols or icons alone do not identify the shortcut clearly. Handle the shortcut in the application. These components expose no component-specific events or model bindings.

## Dependencies

- **Packages:** [clsx](https://www.npmjs.com/package/clsx), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/kbd/reference) for the complete component contract.
