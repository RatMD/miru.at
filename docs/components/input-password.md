---
title: "InputPassword"
component: InputPassword
componentPage: overview
---

## Preview

<ComponentExample name="InputPassword" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Accessible password visibility toggle.</li>
    <li>Shared InputGroup sizing with an optional key icon.</li>
</ul>

## Password visibility

The visibility toggle changes how the same value is displayed. Native input attributes such as autocomplete, name, required and placeholder are forwarded to the inner input. `showIcon` controls the decorative key icon. The visibility action uses translated labels; supply a separate accessible name for the password input.

## Dependencies

- **UI:** [InputGroup](/components/input-group)
- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [clsx](https://www.npmjs.com/package/clsx), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/input-password/reference) for the complete component contract.
