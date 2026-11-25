---
title: "Code"
component: Code
componentPage: overview
---

## Preview

<ComponentExample name="Code" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Inline code with theme colours and an optional prefix.</li>
    <li>Copy from the whole element or a separate button.</li>
    <li>Clipboard feedback that excludes decorative content.</li>
</ul>

## Clipboard content and feedback

The default slot replaces `value`; copying uses the rendered code text and excludes the decorative prefix and copy controls. With `copyTarget="all"`, the component renders a native button containing the code. Choose `copyTarget="button"` for a separate copy button. Success and failure feedback is translated, and the `copy` and `copy-error` events report the result. Code does not perform syntax highlighting or expose model bindings.

## Dependencies

- **UI:** [Tooltip](/components/tooltip)
- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [class-variance-authority](https://www.npmjs.com/package/class-variance-authority), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/code/reference) for the complete component contract.
