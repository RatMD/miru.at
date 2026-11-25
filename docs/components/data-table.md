---
title: "DataTable"
component: DataTable
componentPage: overview
---

## Preview

<ComponentExample name="DataTable" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Typed columns, search, filters and pagination.</li>
    <li>Selection, row actions, expansion and saved column preferences.</li>
</ul>

## Choose the right table

Use DataTable for larger, dynamic or server-shaped result lists. It renders the supplied page and reports query requests; it does not fetch a dataset automatically. [Table](/components/table) is the simpler choice for static contents and locally managed markup.

Start with the [technical documentation](/docs/data-table/introduction) for list payloads, adapters and transport. The [component guide](/components/data-table/guide) shows specialised columns, grouped headings, stacked cells and expansion.

## Application state

Supply a unique `tableKey` for column preferences and stable row keys for selection. Bind `v-model:selected` when the application controls selected keys. Use `queryHandler` for JSON endpoints or the configured navigation adapter; bulk actions and reordering have separate transport hooks. Loading and permission state belong to the application.

## Dependencies

- **UI:** [Alert](/components/alert), [AlertDescription](/components/alert/reference#alert-description), [Badge](/components/badge), [Button](/components/button), [ButtonAction](/components/button-action), [ButtonGroup](/components/button-group), [Checkbox](/components/checkbox), [Dialog](/components/dialog), [Drawer](/components/drawer), [DropdownMenu](/components/dropdown-menu), [FilterBar](/components/filter-bar), [Input](/components/input), [Label](/components/label), [OverlayChoice](/components/overlay-choice), [Popover](/components/popover), [ScrollArea](/components/scroll-area), [Select](/components/select), [Separator](/components/separator), [Sheet](/components/sheet), [Switch](/components/switch), [Table](/components/table), [Tooltip](/components/tooltip)
- **Packages:** [@inertiajs/core](https://www.npmjs.com/package/@inertiajs/core), [@inertiajs/vue3](https://www.npmjs.com/package/@inertiajs/vue3), [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [@tanstack/vue-table](https://www.npmjs.com/package/@tanstack/vue-table), [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/data-table/reference) for the complete component contract.
