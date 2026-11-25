---
title: "Command"
component: Command
componentPage: overview
---

## Preview

<ComponentExample name="Command" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Grouped commands with search, type filters and keyboard navigation.</li>
    <li>Inline lists or a dialog-based command palette.</li>
</ul>

## Commands and filtering

Each CommandItem needs a unique `value` and a `label`. Optional fields are `description`, `group`, `type`, `keywords`, `icon`, `shortcut` and `disabled`. Search matches every word against the label, description and keywords; selected filters match `item.type`. Handle `select` in the application to run an action or navigate. Shortcut labels are display text and do not register shortcuts.

Use [CommandDialog](/components/command/reference#command-dialog) for a palette, with `v-model:open`, `v-model:query` and `v-model:filters`. Supply its required title and description for assistive technology. `closeOnSelect` defaults to true.

## Dependencies

- **UI:** [Badge](/components/badge), [FilterBar](/components/api/filter-bar), [ScrollArea](/components/api/scroll-area)
- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Listbox](https://reka-ui.com/docs/components/listbox)

See the [reference](/components/command/reference) for the complete component contract.
