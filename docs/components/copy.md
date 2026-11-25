---
title: "Copy"
component: Copy
componentPage: overview
---

## Preview

<ComponentExample name="Copy" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Text or multiple clipboard formats.</li>
    <li>Accessible button and copied confirmation.</li>
</ul>

## Clipboard formats

Supply a string with an optional MIME `type`, or a map such as `{ 'text/plain': text, 'text/html': html }` to write several representations in one ClipboardItem. Text defaults to text/plain. The slotted content sits inside a button, so use text, icons or other non-interactive content.

```vue
<Copy content="hello@example.com" label="Copy email address">
    <span>hello@example.com</span>
</Copy>
```

The copied tooltip follows successful clipboard state. `label` overrides both the button’s accessible label and confirmation text; omit it to use the translated defaults. Clipboard writing depends on browser support and permissions and normally requires a secure context and user interaction.

## Dependencies

- **UI:** [Tooltip](/components/tooltip), [TooltipContent](/components/tooltip/reference#tooltip-content), [TooltipProvider](/components/tooltip/reference#tooltip-provider), [TooltipTrigger](/components/tooltip/reference#tooltip-trigger)
- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [clsx](https://www.npmjs.com/package/clsx), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/copy/reference) for the complete component contract.
