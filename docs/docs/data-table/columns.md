# Column definitions

Use `DataTableColumnDef<T>` for typed fields, grouped headings and custom rendering. It carries Miru’s feature set and column metadata over TanStack’s column definitions. For visual examples, see the [component guide](/components/data-table/guide).

## Field columns

```ts
import type { DataTableColumnDef } from '@rat.md/miru';

type Project = { id: string; name: string; team: string };
const columns: DataTableColumnDef<Project>[] = [
    { accessorKey: 'name', header: 'Project', size: 0, enableHiding: false },
    { accessorKey: 'team', header: 'Team', size: 140, meta: { mobileHidden: true } },
];
```

`size: 0` means automatic width, so the main text column can absorb remaining space. Other sizes are pixel widths. Long unbreakable content may still scroll. Nested `columns` create grouped header rows; visibility and ordering preferences operate on leaf columns.

## Display metadata

| Key                 | Purpose                                                               |
| ------------------- | --------------------------------------------------------------------- |
| `label`             | Label used in column preferences; accepts a string, ref or getter.    |
| `align`             | Left, centre or right alignment.                                      |
| `sticky`            | Pin to the left or right edge.                                        |
| `mobileHidden`      | Hide the column below 768 px.                                         |
| `mobileSize`        | Override its fixed width below 768 px.                                |
| `defaultHidden`     | Initial visibility before saved preferences apply.                    |
| `component`         | Render a Vue component with value, item, row, column and actions.     |
| `currencyKey`       | Row field used by DataTableMoneyCell; defaults to currency, then EUR. |
| `dateTimeDisplay`   | Date, time or date-time formatting.                                   |
| `statuses`          | Definitions for labels, icons and status colour classes.              |
| `counts`            | Field definitions for several count values.                           |
| `translationPrefix` | Prefix for resolving status or badge labels.                          |

## Factories

Factories reduce repeated cell configuration. Call factories that use translations inside Vue setup, below ContextProvider.

```ts
import { createCountColumn, createDateTimeColumn } from '@rat.md/miru';

type ProjectWithCounts = { id: string; quantity: number; updated: string };
const quantityColumn = createCountColumn<ProjectWithCounts>({
    accessorKey: 'quantity',
    label: 'Quantity',
    size: 96,
});
const updatedColumn = createDateTimeColumn<ProjectWithCounts>({
    accessorKey: 'updated',
    label: 'Updated',
    display: 'date',
    size: 140,
});
```

Here `ProjectWithCounts` is your application’s record type with quantity and updated fields. Value factories accept an accessor key, label and sizing/visibility options. `createStatusColumn` accepts status definitions directly; for badge definitions, set `meta.statuses` on the returned badge column. The [guide’s factory list](/components/data-table/guide#column-factories) describes every specialised factory.

## Cell slots

`cell-columnId` replaces one cell’s content. Its scope contains `item`, `cell`, `disabled` and `loading`; apply the last two to custom interactive controls.

```vue
<DataTable table-key="projects" :list="list" :columns="columns">
    <template #cell-name="{ item }">
        <strong>{{ item.name }}</strong>
        <p class="text-xs text-muted-foreground">{{ item.team }}</p>
    </template>
</DataTable>
```

`before-row`, `after-row` and `leading-rows` must render table rows and cells. `expanded-row` supplies content inside an existing spanning cell. The `content` slot replaces the table layout while retaining its toolbar and pagination, and receives rows, table and toggleSort.
