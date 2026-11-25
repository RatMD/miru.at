---
title: "DropdownMenu"
component: DropdownMenu
componentPage: overview
---

## Preview

<ComponentExample name="DropdownMenu" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Keyboard navigation, focus management and collision handling.</li>
    <li>Submenus, checkbox items and radio choices.</li>
</ul>

## Compose menu actions

Place DropdownMenuTrigger and DropdownMenuContent inside DropdownMenu. Use an accessible button with `as-child` on the trigger. Group related actions, add labels and separators, and use DropdownMenuSub for nested choices. Checkbox and radio components expose their own models.

Configure alignment, offsets and collision handling on the content. The primitive manages focus and keyboard navigation; item `select` events can be prevented to keep the menu open. DropdownMenuShortcut displays a shortcut hint without registering a keyboard binding.

## Dependencies

- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Dropdown Menu](https://reka-ui.com/docs/components/dropdown-menu)

See the [reference](/components/dropdown-menu/reference) for the complete component contract.
