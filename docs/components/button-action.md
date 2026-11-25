---
title: "ButtonAction"
component: ButtonAction
componentPage: overview
---

## Preview

<ComponentExample name="ButtonAction" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Compact icon actions with an optional visible label.</li>
    <li>Muted styling and configurable borders.</li>
    <li>Status dots, loading feedback and disabled states.</li>
</ul>

## Labels and appearance

Put the icon in the default slot. `label` adds visible text and supplies the accessible name; otherwise use `title` or `aria-label`. The `muted` setting can be inherited from AccordionHeader and overridden on each action. `borderless="no"` keeps the border visible, `effect` reveals it during interaction or disabled states, and `yes` hides it.

## Status dots

Use `statusDot=true` to follow the variant, a theme colour or CSS colour for an independent status, or false to hide the dot. `statusDotPulse` and `statusDotPing` add optional animations. Dots are decorative and hidden while loading, so include their meaning in the accessible label. An `href` turns the action into a link.

## Dependencies

- **UI:** [Button](/components/button), [Indicator](/components/indicator)
- **Packages:** [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [clsx](https://www.npmjs.com/package/clsx), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/button-action/reference) for the complete component contract.
