---
title: "Table"
component: Table
componentPage: overview
---

## When to use Table

Use Table for invoice lines, summaries, comparisons and other tables whose rows you compose directly. It provides presentation, specialised cells and optional local sorting through `useTableSort`. For larger data sources with column configuration, filtering, selection or pagination, use [DataTable](/components/data-table), which is built on [@tanstack/vue-table](https://www.npmjs.com/package/@tanstack/vue-table).

## Preview

<ComponentExample name="Table" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Semantic tables for static content and small local collections.</li>
    <li>Composable rows, headers, footers and captions.</li>
    <li>Optional local sorting and specialised cells for common values.</li>
</ul>

## Composition and local sorting

Compose rows and cells directly. TableHead reports sort requests; use `useTableSort` or your own ordering to update the rows. Table itself exposes no component-specific events or model bindings. For larger or more dynamic data sources, use DataTable.

## Specialised cells

Place each `TableCell*` directly inside TableRow. Use its content-only counterpart to combine values within one TableCell. The [Table guide](/components/table/guide#specialised-cells) lists every specialised cell and explains formatting, statuses, counts, addresses and toggles.

## Dependencies

- **UI:** [Badge](/components/badge), [Button](/components/button), [Copy](/components/copy), [Tooltip](/components/tooltip)
- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [class-variance-authority](https://www.npmjs.com/package/class-variance-authority), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/table/reference) for the complete component contract.
