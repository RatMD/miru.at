# Backend connection

The backend framework and client transport are independent choices. Pass a normalised list to DataTable, then use a `queryHandler` for JSON requests or the configured navigation adapter.

## JSON requests

The handler receives canonical state and applied filters. It owns parameter names, response adaptation, loading and errors. This example expects the endpoint to return `ListPayload<Project>`.

```vue
<script setup lang="ts">
import { onBeforeUnmount, ref, shallowRef } from 'vue';
import { DataTable } from '@rat.md/miru';
import type { DataTableColumnDef, ListPayload, ListState } from '@rat.md/miru';

type Project = { id: string; name: string };
const props = defineProps<{ initialList: ListPayload<Project> }>();
const list = shallowRef(props.initialList);
const loading = ref(false);
const error = ref('');
const columns: DataTableColumnDef<Project>[] = [
    { accessorKey: 'name', header: 'Project', size: 0 },
];
let request: AbortController | undefined;

async function query(state: ListState, filters: Record<string, unknown>) {
    request?.abort();
    const current = new AbortController();
    request = current;
    loading.value = true;
    error.value = '';
    try {
        const params = new URLSearchParams({
            page: String(state.page),
            limit: String(state.per_page),
            sort: state.order_by,
            direction: state.order.toLowerCase(),
            filters: JSON.stringify(filters),
        });
        const response = await fetch('/api/projects?' + params, { signal: current.signal });
        if (!response.ok) throw new Error('Could not load projects.');
        const next = await response.json();
        if (request === current && !current.signal.aborted) list.value = next;
    } catch (cause) {
        if (request === current && !current.signal.aborted) {
            error.value = cause instanceof Error ? cause.message : 'Could not load projects.';
        }
    } finally {
        if (request === current) loading.value = false;
    }
}
onBeforeUnmount(() => request?.abort());
</script>

<template>
    <p v-if="error" role="alert">{{ error }}</p>
    <DataTable
        table-key="projects"
        :list="list"
        :columns="columns"
        :loading="loading"
        :query-handler="query" />
</template>
```

Adapt `next` before assigning it when the endpoint returns another shape. A custom handler bypasses `querySerializer`, `additionalQuery` and the built-in transport; call your adapter’s serializer inside the handler when needed. The component does not await the handler to manage loading, so bind `loading` explicitly.

## Navigation adapters

Without `queryHandler`, DataTable visits the current pathname through the configured `navigation` adapter. The default performs browser navigation; `createMiru({ adapter: inertiaAdapter() })` supplies Inertia navigation. The default query contains `page`, `per_page`, `order_by`, `order` and `filters`. Lucid format uses its own serializer. `querySerializer` replaces parameter mapping while retaining the configured navigation adapter, and `additionalQuery` adds further parameters.

Miru format partially reloads `list` by default; Lucid defaults to a full response. Set `queryProps` for your page’s actual prop names. Sorting, filtering and page-size changes reset to page 1; pagination requests the chosen page.

## Mutations

Row actions use application callbacks. For JSON bulk actions and reordering, also provide `bulkActionHandler` and factory `moveHandler` to update local data directly. Otherwise those features use the configured navigation adapter: AJAX with a page reload by default, or Inertia with `createMiru({ adapter: inertiaAdapter() })`. See [Actions and selection](/docs/data-table/actions).

Validate allowed sort fields, filter values, page sizes and action permissions on the server. The list configuration controls the interface and does not authorise backend operations.
