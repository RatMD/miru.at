---
title: "Table reference"
component: Table
componentPage: reference
---

The component and its building blocks share one reference. Types and declared defaults follow the package; native attributes also apply to the rendered elements.

## Table {#table}

A semantic table for static content and small, locally managed collections, with optional sorting and ready-made cells. For larger data sources, use DataTable, built on TanStack Table.

### Props {#table-props}

<ComponentApi name="Table" section="props" />

### Slots {#table-slots}

<ComponentApi name="Table" section="slots" />

## TableHeader {#table-header}

A header section for table headings and grouped column labels.

### Props {#table-header-props}

<ComponentApi name="TableHeader" section="props" />

### Slots {#table-header-slots}

<ComponentApi name="TableHeader" section="slots" />

### Dependencies {#table-header-dependencies}

- **UI:** [Badge](/components/badge), [Button](/components/button), [Copy](/components/copy), [Tooltip](/components/tooltip)
- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [class-variance-authority](https://www.npmjs.com/package/class-variance-authority), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)

## TableBody {#table-body}

The body section containing the table’s data rows.

### Props {#table-body-props}

<ComponentApi name="TableBody" section="props" />

### Slots {#table-body-slots}

<ComponentApi name="TableBody" section="slots" />

## TableFooter {#table-footer}

A footer section for totals and summary rows.

### Props {#table-footer-props}

<ComponentApi name="TableFooter" section="props" />

### Slots {#table-footer-slots}

<ComponentApi name="TableFooter" section="slots" />

## TableRow {#table-row}

A table row with optional hover feedback.

### Props {#table-row-props}

<ComponentApi name="TableRow" section="props" />

### Slots {#table-row-slots}

<ComponentApi name="TableRow" section="slots" />

## TableHead {#table-head}

A header cell with alignment and optional sorting controls.

### Props {#table-head-props}

<ComponentApi name="TableHead" section="props" />

### Events {#table-head-emitted-events}

<ComponentApi name="TableHead" section="events" />

### Slots {#table-head-slots}

<ComponentApi name="TableHead" section="slots" />

## TableCell {#table-cell}

A table data cell with configurable alignment.

### Props {#table-cell-props}

<ComponentApi name="TableCell" section="props" />

### Slots {#table-cell-slots}

<ComponentApi name="TableCell" section="slots" />

## TableCaption {#table-caption}

An accessible table caption, displayed above the header by default.

### Props {#table-caption-props}

<ComponentApi name="TableCaption" section="props" />

### Slots {#table-caption-slots}

<ComponentApi name="TableCaption" section="slots" />

## TableCellMoney {#table-cell-money}

A complete table cell for a localised currency amount.

### Props {#table-cell-money-props}

<ComponentApi name="TableCellMoney" section="props" />

## TableCellDateTime {#table-cell-date-time}

A complete table cell for a localised date, time or both.

### Props {#table-cell-date-time-props}

<ComponentApi name="TableCellDateTime" section="props" />

## TableCellCount {#table-cell-count}

A complete table cell for a count displayed in a circular indicator.

### Props {#table-cell-count-props}

<ComponentApi name="TableCellCount" section="props" />

## TableCellBadge {#table-cell-badge}

A complete table cell for a labelled status badge.

### Props {#table-cell-badge-props}

<ComponentApi name="TableCellBadge" section="props" />

## TableCellStatus {#table-cell-status}

A complete table cell for a status dot or icon with a labelled tooltip.

### Props {#table-cell-status-props}

<ComponentApi name="TableCellStatus" section="props" />

## TableCellAddress {#table-cell-address}

A complete table cell for a structured address with copyable fields.

### Props {#table-cell-address-props}

<ComponentApi name="TableCellAddress" section="props" />

## TableCellMultiCounts {#table-cell-multi-counts}

A complete table cell for several labelled counts from one item.

### Props {#table-cell-multi-counts-props}

<ComponentApi name="TableCellMultiCounts" section="props" />

## TableCellBoolean {#table-cell-boolean}

A complete table cell for a labelled boolean toggle.

### Props {#table-cell-boolean-props}

<ComponentApi name="TableCellBoolean" section="props" />

### Events {#table-cell-boolean-emitted-events}

<ComponentApi name="TableCellBoolean" section="events" />

### Slots {#table-cell-boolean-slots}

<ComponentApi name="TableCellBoolean" section="slots" />

### Models {#table-cell-boolean-models}

<ComponentApi name="TableCellBoolean" section="models" />

## TableMoneyValue {#table-money-value}

A localised currency value for use within an existing cell or custom layout.

### Props {#table-money-value-props}

<ComponentApi name="TableMoneyValue" section="props" />

## TableDateTimeValue {#table-date-time-value}

A localised date and time value for use within an existing cell or custom layout.

### Props {#table-date-time-value-props}

<ComponentApi name="TableDateTimeValue" section="props" />

## TableCountValue {#table-count-value}

A circular count indicator for use within an existing cell or custom layout.

### Props {#table-count-value-props}

<ComponentApi name="TableCountValue" section="props" />

## TableBadgeValue {#table-badge-value}

A labelled status badge for use within an existing cell or custom layout.

### Props {#table-badge-value-props}

<ComponentApi name="TableBadgeValue" section="props" />

## TableStatusValue {#table-status-value}

A status dot or icon with a tooltip for use within an existing cell or custom layout.

### Props {#table-status-value-props}

<ComponentApi name="TableStatusValue" section="props" />

## TableAddressValue {#table-address-value}

A structured address with copyable fields for use within an existing cell or custom layout.

### Props {#table-address-value-props}

<ComponentApi name="TableAddressValue" section="props" />

## TableMultiCountsValue {#table-multi-counts-value}

Several labelled counts for use within an existing cell or custom layout.

### Props {#table-multi-counts-value-props}

<ComponentApi name="TableMultiCountsValue" section="props" />

## TableMultiCountsHeader {#table-multi-counts-header}

Matching labels or icons for a group of count values.

### Props {#table-multi-counts-header-props}

<ComponentApi name="TableMultiCountsHeader" section="props" />

## TableBooleanToggle {#table-boolean-toggle}

A labelled boolean control that reports toggle requests to the application.

### Props {#table-boolean-toggle-props}

<ComponentApi name="TableBooleanToggle" section="props" />

### Events {#table-boolean-toggle-emitted-events}

<ComponentApi name="TableBooleanToggle" section="events" />

### Slots {#table-boolean-toggle-slots}

<ComponentApi name="TableBooleanToggle" section="slots" />

