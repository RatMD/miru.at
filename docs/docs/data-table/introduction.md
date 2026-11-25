# Introduction

DataTable combines [TanStack Vue Table](https://tanstack.com/table/latest/docs/framework/vue/quick-start) with Miru’s toolbar, filters, cells, selection and pagination. It is designed for application lists backed by paginated data. Use [Table](/components/table) for small, static content or locally managed table markup.

## How it fits together

| Part        | Responsibility                                                       |
| ----------- | -------------------------------------------------------------------- |
| Application | Fetch results, validate input, enforce permissions and save changes. |
| Adapter     | Map the backend response into `ListPayload<T>`.                      |
| Columns     | Describe fields, display components, widths and actions.             |
| DataTable   | Render the current page and report query or interaction requests.    |

Search, filtering, sorting and pagination describe a new query; they do not process a complete dataset inside the component. The application returns a replacement list. A local demo can implement the same contract against an in-memory array.

## Choose a starting point

- [Component overview](/components/data-table) for the preview and public API.
- [Component guide](/components/data-table/guide) for visual column and layout examples.
- [List contract](/docs/data-table/list-contract) for results, configuration, filters and state.
- [Backend connection](/docs/data-table/backend) for JSON requests or Inertia navigation.
- [Response adapters](/docs/data-table/adapters) for Laravel, Lucid and custom APIs.
- [Column definitions](/docs/data-table/columns) for typed columns, factories and metadata.
- [Row operations](/docs/data-table/actions) for row actions, bulk operations and reordering.

## Minimal composition

```vue
<script setup lang="ts">
import { DataTable } from '@rat.md/miru';
import type { DataTableColumnDef, ListPayload, ListState } from '@rat.md/miru';

type Project = { id: string; name: string };
defineProps<{ list: ListPayload<Project>; loading: boolean }>();
const emit = defineEmits<{
    query: [state: ListState, filters: Record<string, unknown>];
}>();
const columns: DataTableColumnDef<Project>[] = [
    { accessorKey: 'name', header: 'Project', size: 0 },
];
</script>

<template>
    <DataTable
        table-key="projects"
        :list="list"
        :columns="columns"
        :loading="loading"
        :query-handler="(state, filters) => emit('query', state, filters)" />
</template>
```

The parent handles `query` and replaces `list` when the request succeeds. Use a unique, stable `tableKey` to keep column visibility and ordering preferences separate. Prefer stable record ids to preserve selection through reordered results.
