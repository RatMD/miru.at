---
title: "Dialog"
component: Dialog
componentPage: overview
---

## Preview

<ComponentExample name="Dialog" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Managed focus with accessible titles and descriptions.</li>
    <li>Configurable content widths and composed footer actions.</li>
</ul>

## Composition and dismissal

Place DialogTitle and DialogDescription inside DialogContent and provide the required `closeLabel`. DialogTrigger and DialogClose are re-exported from Reka UI for opening and closing controls. Bind `v-model:open` to manage visibility or use `defaultOpen` for initial local state.

`showClose` and `closeDisabled` affect the built-in close button. To block Escape or outside dismissal, prevent the corresponding content events. Use [Overlay](/components/overlay) when a shared `loading` or `dismissible` policy and responsive presentation are needed.

## Dependencies

- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Dialog](https://reka-ui.com/docs/components/dialog)

See the [reference](/components/dialog/reference) for the complete component contract.
