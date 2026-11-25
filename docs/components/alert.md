---
title: "Alert"
component: Alert
componentPage: overview
---

## Preview

<ComponentExample name="Alert" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Semantic colours with default and soft appearances.</li>
    <li>Optional title, custom icons and dismiss controls.</li>
    <li>Controlled visibility or local dismissal with translated feedback.</li>
</ul>

## Visibility and dismissal

Alert is visible initially when `open` is omitted. Add `dismissable` for local dismissal, or bind `v-model:open` to manage visibility in your application. The dismiss button emits `update:open` with false, followed by `dismiss`; a controlled alert stays visible until the bound value changes. Set `dismissLabel` to customise the accessible button name, or use the translated close label.

## Appearance and icons

Choose a semantic `variant` and use `appearance="soft"` for a tinted surface with outline icons. `showIcon` controls the built-in status icon; the `icon` slot takes precedence and remains visible when `showIcon` is false. A leading SVG or recognised icon component in the default slot also replaces the built-in icon. AlertTitle is optional.

## Dependencies

- **UI:** [ButtonAction](/components/button-action)
- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [class-variance-authority](https://www.npmjs.com/package/class-variance-authority), [clsx](https://www.npmjs.com/package/clsx), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/alert/reference) for the complete component contract.
