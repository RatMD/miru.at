<!-- Generated from package/src/docs/composables/useDataTable.mdx. Edit the source guide. -->

# useDataTable

Create a headless TanStack table with Miru selection and column preferences.

```ts
import { ref } from 'vue';
import { useDataTable, type DataTableColumnDef } from '@rat.md/miru';

type Item = { id: string; name: string };
const rows = ref<Item[]>([{ id: '1', name: 'First project' }]);
const columns: DataTableColumnDef<Item>[] = [{ accessorKey: 'name', header: 'Name' }];
const { table, selectedRows, clearSelection, resetPreferences } = useDataTable({
    tableKey: 'projects',
    data: rows,
    columns,
});
```

Import from the package root. `tableKey` separates stored column preferences. Configure `rowKey`, `selected`, `onSelectionChange` and `rowSelectable` when needed. Use the DataTable component unless you need your own rendering.

[DataTable guide](/docs/data-table/introduction).
