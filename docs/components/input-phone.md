---
title: "InputPhone"
component: InputPhone
componentPage: overview
---

## Preview

<ComponentExample name="InputPhone" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Country calling-code selection and national number entry.</li>
    <li>Combined value model with a configurable country list.</li>
</ul>

## Calling codes and values

Supply country options with stable values, labels and callingCode strings. Existing numbers are matched against the longest calling-code prefix; otherwise the default code, a pinned option or the first option is used. Non-digits are removed from the national number. The emitted value combines the selected calling code and digits, or is null when empty. This does not validate national number lengths or allocation rules.

## Dependencies

- **UI:** [Input](/components/input), [Select](/components/select)
- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [clsx](https://www.npmjs.com/package/clsx), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/input-phone/reference) for the complete component contract.
