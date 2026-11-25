---
title: "Collapsible"
component: Collapsible
componentPage: overview
---

## Preview

<ComponentExample name="Collapsible" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Accessible expand/collapse interaction.</li>
    <li>Controlled state and configurable content retention.</li>
</ul>

## Controlled content

Compose CollapsibleTrigger and CollapsibleContent within Collapsible. Bind `v-model:open` for application-controlled visibility or supply `defaultOpen` for an initial state. Use `as-child` on the trigger to retain your button’s native semantics. `unmountOnHide` and content `forceMount` control whether hidden content remains mounted; choose retention when local input state must survive closing.

## Dependencies

- **Packages:** [reka-ui](https://www.npmjs.com/package/reka-ui), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Collapsible](https://reka-ui.com/docs/components/collapsible)

See the [reference](/components/collapsible/reference) for the complete component contract.
