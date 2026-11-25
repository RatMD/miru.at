---
title: "ButtonGroup"
component: ButtonGroup
componentPage: overview
---

## Preview

<ComponentExample name="ButtonGroup" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Joined corners around related actions.</li>
    <li>Horizontal or vertical arrangements.</li>
    <li>Independent styling and behaviour for each child button.</li>
</ul>

## Composition and state

Supply direct Button or ButtonAction children and give the group an accessible `label`. Set the same `size` and `shape` on the group and its buttons: the group controls the outer corners without changing child props. Each child owns its variant, disabled state and click handling. Tab visits the individual enabled buttons; use ToggleGroup when managing a selected value.

## Dependencies

- **UI:** [Button](/components/button), [ButtonAction](/components/button-action)
- **Packages:** [clsx](https://www.npmjs.com/package/clsx), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/button-group/reference) for the complete component contract.
