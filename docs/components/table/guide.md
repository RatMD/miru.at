---
title: Table guide
component: Table
componentPage: guide
---

Table is intended for static content and small, locally managed collections: invoice lines, summaries, comparisons and detail views. You compose its rows directly and can add lightweight conveniences such as local sorting and specialised cells.

For larger or more dynamic data sources, prefer [DataTable](/components/data-table), built on [@tanstack/vue-table](https://www.npmjs.com/package/@tanstack/vue-table). It provides configured columns, filtering, pagination, selection and data-driven actions. Table does not load data, manage server queries or sort rows that have not been loaded.

## Compose a table

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
    Table,
    TableCaption,
    TableHeader,
    TableBody,
    TableFooter,
    TableRow,
    TableHead,
    TableCell,
    TableCellCount,
    TableCellDateTime,
    TableCellMoney,
} from '@rat.md/miru';

const items = ref([
    {
        id: 'hosting',
        name: 'Hosting',
        quantity: 1,
        date: '2026-11-24T12:00:00Z',
        amount: 29,
        enabled: true,
    },
    {
        id: 'support',
        name: 'Support',
        quantity: 2,
        date: '2026-11-25T12:00:00Z',
        amount: 9,
        enabled: false,
    },
]);
</script>

<template>
    <Table>
        <TableCaption>Monthly services, amounts in EUR</TableCaption>
        <TableHeader>
            <TableRow :hover="false">
                <TableHead>Service</TableHead>
                <TableHead align="center">Quantity</TableHead>
                <TableHead align="right">Date</TableHead>
                <TableHead align="right">Amount</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="item in items" :key="item.id">
                <TableCell>{{ item.name }}</TableCell>
                <TableCellCount :value="item.quantity" />
                <TableCellDateTime :value="item.date" display="date" />
                <TableCellMoney :value="item.amount" />
            </TableRow>
        </TableBody>
        <TableFooter>
            <TableRow :hover="false">
                <TableCell :colspan="3">Total</TableCell>
                <TableCellMoney :value="38" />
            </TableRow>
        </TableFooter>
    </Table>
</template>
```

Each TableCell renders a `td`; TableHead renders a `th`. Use native `colspan`, `rowspan` and `scope` for grouped headings and row labels. TableCaption names the table; use `class="sr-only"` when the caption should remain available to assistive technology without taking visible space.

## Specialised cells

Place each `TableCell*` directly inside TableRow. These components already include their cell element, so wrapping them in another TableCell would nest `td` elements.

| Cell                                                            | Purpose                                                 | Content for an existing cell                                                                                                              |
| --------------------------------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| [TableCellAddress](/components/table/reference#table-cell-address)          | A structured address with individually copyable fields. | [TableAddressValue](/components/table/reference#table-address-value)                                                                                  |
| [TableCellBadge](/components/table/reference#table-cell-badge)              | A status badge with a label and optional icon.          | [TableBadgeValue](/components/table/reference#table-badge-value)                                                                                      |
| [TableCellBoolean](/components/table/reference#table-cell-boolean)          | An accessible boolean toggle with `v-model`.            | [TableBooleanToggle](/components/table/reference#table-boolean-toggle)                                                                                |
| [TableCellCount](/components/table/reference#table-cell-count)              | A circular count indicator with muted zero values.      | [TableCountValue](/components/table/reference#table-count-value)                                                                                      |
| [TableCellDateTime](/components/table/reference#table-cell-date-time)       | A localised date, time or both.                         | [TableDateTimeValue](/components/table/reference#table-date-time-value)                                                                               |
| [TableCellMoney](/components/table/reference#table-cell-money)              | A localised currency amount; EUR by default.            | [TableMoneyValue](/components/table/reference#table-money-value)                                                                                      |
| [TableCellMultiCounts](/components/table/reference#table-cell-multi-counts) | Several counts with individual tooltip labels.          | [TableMultiCountsValue](/components/table/reference#table-multi-counts-value) and [TableMultiCountsHeader](/components/table/reference#table-multi-counts-header) |
| [TableCellStatus](/components/table/reference#table-cell-status)            | A focusable status dot or icon with a labelled tooltip. | [TableStatusValue](/components/table/reference#table-status-value)                                                                                    |

The content-only components do not render a `td`. Use them to combine several values inside one TableCell or reuse the presentation in another layout. DataTable uses the same underlying value renderers.

## Formatting and missing values

Money and date cells use the active ContextProvider locale. Money accepts major currency units and numeric strings; `29.9` means 29.90 EUR when currency is EUR. Missing amounts become zero; non-numeric amounts and invalid currency codes show `—`.

Dates accept strings, Date objects and millisecond timestamps. `display` selects `date`, `time` or `date-time`. Missing or invalid dates show `—`; times use the browser’s time zone. Money and dates align right by default. Single and multiple counts align centrally and show zero for missing or non-finite values.

## Statuses and count definitions

Both badge and status cells accept `statuses` and `translationPrefix`. A status definition can supply a literal/reactive `label`, a translated `labelKey` and an `icon`. Status indicators also support `colorClass` and `containerClass`; badge appearance is controlled by `variant`. Without a definition, labels use the translation prefix or raw value and standard status colours provide a fallback.

```ts
import type { TableStatusDefinition, TableCountDefinition } from '@rat.md/miru';

const statuses: Record<string, TableStatusDefinition> = {
    active: { label: 'Active', colorClass: 'text-success', containerClass: 'bg-success/10' },
    pending: { label: 'Pending', colorClass: 'text-warning', containerClass: 'bg-warning/10' },
};
const counts: TableCountDefinition[] = [
    { key: 'ordered', label: 'Ordered' },
    { key: 'shipped', label: 'Shipped' },
];
```

Pass a row object to TableCellMultiCounts through `item` and the definitions through `counts`. Each definition’s `key` selects a numeric field. Use the same definitions on TableMultiCountsHeader for matching labels or optional icons. Labels can be strings, refs, getters or translation keys; an omitted label falls back to its field key.

## Addresses, toggles and row actions

TableAddressLike supports `company_name`, `recipient_name`, `street`, `house_number`, `address_addition`, `postal_code`, `city`, `state` and `country`. State and country accept strings or `{ name }`. Missing addresses show `—`.

TableCellBoolean requires an accessible `label`, uses `aria-pressed` and updates a boolean model. For example, inside the row loop above:

```vue
<TableCellBoolean
    v-model="item.enabled"
    :label="`Toggle availability for ${item.name}`"
    :disabled="saving" />
```

Import TableCellBoolean and bind `saving` to your application’s request state, or omit `disabled` for a local-only toggle. Its default slot exposes `{ active }` for custom icons. Model updates change local state; persistence belongs to the application. Put ordinary buttons or menus inside TableCell for other row actions.

## Optional local sorting

TableHead provides the sort button and `aria-sort`; it does not reorder rows. Add `useTableSort` to the example above:

```ts
import { useTableSort } from '@rat.md/miru/composables';

const { sortedRows, sortBy, directionFor } = useTableSort(items);
```

Render `sortedRows` instead of `items`, then connect a sortable header:

```vue
<TableHead sortable :sort="directionFor('amount')" align="right" @sort="sortBy('amount')">
    Amount
</TableHead>
```

Sorting cycles through ascending, descending and original order, without mutating the source array. Numbers and Date objects sort by value; strings use natural, case-insensitive comparison. Missing values remain last. Sort the original values rather than their formatted display text. Use your own computed ordering for nested data or business-specific rules.

## Compact, embedded and empty states

`variant="compact"` reduces header and cell spacing. `embedded` removes the outer border, rounding and horizontal scroll container so the surrounding surface can provide them. The default table scrolls horizontally when needed.

Render empty states explicitly with one row and a TableCell whose `colspan` matches the number of columns. Use `:hover="false"` for that row. Table has no automatic loading, empty-state or query model; use DataTable when those data-management requirements grow.

Reference: [Table API](/components/table), [useTableSort](/docs/composables/useTableSort) and [DataTable](/components/data-table).
