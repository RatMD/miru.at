# Response adapters

Adapters translate responses into the [list contract](/docs/data-table/list-contract). They do not fetch records, validate arbitrary JSON or decide permissions. Backend data conventions are independent of AJAX or Inertia transport.

Configure normalization and query serialization once for the application:

```ts
import { createMiru } from '@rat.md/miru/miru';
import { adonisAdapter } from '@rat.md/miru/adapters/adonis';

app.use(createMiru({ dataTable: adonisAdapter({ perPageKey: 'limit' }) }));
```

This uses the default AJAX transport. Add `adapter: inertiaAdapter()` from
`@rat.md/miru/adapters/inertia` for Inertia navigation and forms. Use `dataTable: laravelAdapter()`
from `@rat.md/miru/adapters/laravel` for Laravel paginator payloads. Tables inherit these defaults;
explicit `data-format="default"`, `"lucid"` or `"laravel"` overrides the backend for one table.

## Laravel

`adaptLaravelPagination` accepts a length-aware paginator with `data`, `current_page`, `last_page`, `per_page` and `total`. `adaptLaravelList` also handles the surrounding configuration, filters and optional state.

```ts
import { adaptLaravelList } from '@rat.md/miru/adapters/laravel';
import type { LaravelListPayload } from '@rat.md/miru/adapters/laravel';

type Project = { id: string; name: string };
function normalise(payload: LaravelListPayload<Project>) {
    return adaptLaravelList(payload);
}
```

The input is `{ results: paginator, config, filters, state? }`. Supply configuration explicitly: a raw paginator cannot describe available filters or actions. Laravel API Resources with separate `data`, `meta` and `links` need a mapping. Cursor pagination does not supply the total/last-page contract required by this pagination interface.

## AdonisJS / Lucid

Lucid uses `{ data, meta: { currentPage, lastPage, perPage, total } }`. Wrap that paginator in `{ results, config, filters, state? }`, then pass `data-format="lucid"` with `LucidListPayload<T>`.

Alternatively, call `adaptLucidPagination` or `adaptLucidList` yourself and keep the default table format. Lucid input state uses `perPage`, `orderBy` and lowercase `order`; DataTable callbacks always receive canonical `ListState`.

```ts
import { serializeLucidQuery } from '@rat.md/miru/adapters/adonis';
import type { ListState } from '@rat.md/miru';

const serialize = (state: ListState, filters: Record<string, unknown>) =>
    serializeLucidQuery(state, filters, { perPageKey: 'limit' });
```

Use `querySerializer` with the navigation adapter, or call this function inside your JSON handler. `serializeFilters` can map structured ranges and arrays to endpoint-specific parameters. Lucid’s response metadata does not prescribe your endpoint’s query names.

## Custom APIs

Keep the adapter in the application and bind its normalised result. A serializer is optional and is called explicitly for custom transports.

```ts
import { adaptLaravelList } from '@rat.md/miru';
import type { DataTableAdapter, ListPayload } from '@rat.md/miru';

type Project = { id: string; name: string };
type ApiPage = { items: Project[]; count: number; page: number; limit: number };
const config: ListPayload<Project>['config'] = {
    searchable: ['name'],
    sortable: ['name'],
    filters: {},
    actions: [],
};
const adapter = {
    normalize(source: ApiPage): ListPayload<Project> {
        return adaptLaravelList({
            results: {
                data: source.items,
                total: source.count,
                current_page: source.page,
                per_page: source.limit,
                last_page: Math.max(1, Math.ceil(source.count / source.limit)),
            },
            config,
            filters: {},
        });
    },
    serializeQuery(state, filters) {
        return {
            page: state.page,
            limit: state.per_page,
            sort: state.order_by,
            direction: state.order.toLowerCase(),
            filters,
        };
    },
} satisfies DataTableAdapter<ApiPage, Project>;
```

Extend this small example to retain the effective sort, search and filter state returned by your endpoint. Use server metadata when it changes or clamps pagination. See [Backend connection](/docs/data-table/backend) for transport and stale-request handling.
