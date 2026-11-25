---
title: DataTable guide
component: DataTable
componentPage: guide
---

DataTable supplies an application list with typed columns, a query toolbar and specialised cells. These examples use local data and the real DataTable renderers. For response formats and requests, start with the [technical introduction](/docs/data-table/introduction).

## Specialised value columns

Combine automatic text width with counters, status badges, dates and currency values. The Vue source tab shows the complete column definitions and sample list.

<DataTableGuideExample example="values" />

## Grouped headings and stacked cells

Nested column definitions create grouped headings. A cell slot can display several lines without adding a separate subcolumns prop.

<DataTableGuideExample example="grouped" />

## Expanded rows

Add an expansion column and use `rowExpandable` to decide which records can open. The expanded slot can contain a summary, a form or another DataTable. The application supplies and loads any child lists.

<DataTableGuideExample example="expanded" />

For a nested table, use a distinct `tableKey`, `embedded`, `:show-toolbar="false"` and `pagination-position="none"` when the parent owns the surrounding surface. Child query handlers and pagination can remain independent when required.

## Column factories

| Factory or component | Display |
| --- | --- |
| `createSelectionColumn` | Page selection with indeterminate state and row restrictions. |
| `createExpansionColumn` | Accessible row expansion control. |
| `createActionsColumn` | Sticky row actions with overflow and confirmation. |
| `createCountColumn` | Circular numeric count with a subdued zero state. |
| `createMultiCountsColumn` | Several counts with matching icon or text headers. |
| `createSortOrderColumn` | Position label and move-up/down controls. |
| `createStatusColumn` | Status icon or dot with custom definitions. |
| `createBadgeColumn` | Labelled status badge. |
| `createDateTimeColumn` | Localised date, time or combined value. |
| `createAddressColumn` | Structured, copyable address. |
| `DataTableMoneyCell` | Currency value using the configured row currency field. |
| `DataTableBooleanToggle` | Interactive boolean display for a custom cell. |

Use the corresponding [Table cells](/components/table/guide#specialised-cells) for static table markup. DataTable factories operate on a normalised list regardless of the backend framework.

## Width and responsive layouts

Set `size: 0` on the main text column to absorb remaining space. Give utility columns fixed widths, use `meta.mobileHidden` for secondary information and `meta.mobileSize` for compact controls. Multiple automatic columns share space; long content may still scroll.

`variant="compact"` changes presentation, while `embedded` lets the outer surface own borders and scrolling. `showToolbar`, `showColumnToggle` and `paginationPosition` let a parent layout supply surrounding controls. Applied filters become removable badges; overflow remains available through FilterBar’s popover.

See [Column definitions](/docs/data-table/columns) for metadata and slots, [Actions and selection](/docs/data-table/actions) for interaction rules, and the [Reference](/components/data-table/reference) for every component contract.
