---
title: "InputPin"
component: InputPin
componentPage: overview
---

## Preview

<ComponentExample name="InputPin" :show-playground="false" />

## Features

<ul class="component-features">
    <li>String-based PIN entry with separate character slots.</li>
    <li>Paste, masking, one-time-code attributes and grouped layouts.</li>
</ul>

## String model and slot composition

InputPin replaces the earlier InputOtp component and uses Reka Pin Input without the former OTP library. Numeric mode filters non-digits; text mode accepts characters up to maxlength. The default layout creates one slot per character. For a custom layout, compose InputPinGroup, InputPinSlot with zero-based indices and InputPinSeparator in the default slot. `complete` reports a fully filled value; it does not submit or verify the code. `otp` requests one-time-code autocomplete, while masked presentation leaves the string model unchanged.

## Dependencies

- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Pin Input](https://reka-ui.com/docs/components/pin-input)

See the [reference](/components/input-pin/reference) for the complete component contract.
