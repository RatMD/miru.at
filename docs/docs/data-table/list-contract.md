# List contract

`ListPayload<T>` is the shared boundary between a backend and DataTable. Normalise responses before rendering so columns and actions can use the same record type regardless of the server framework.

| Member    | Contents                                                                           |
| --------- | ---------------------------------------------------------------------------------- |
| `results` | Current records, pagination totals, page bounds and page URLs.                     |
| `config`  | Available filter definitions, bulk actions, searchable fields and sortable fields. |
| `filters` | Applied filter values, including `search` when present.                            |
| `state`   | Canonical page, page size, sort field, sort direction and search.                  |

## Build a normalised page

```ts
import { adaptLaravelList } from '@rat.md/miru';
import type { ListPayload } from '@rat.md/miru';

type Project = { id: string; name: string };
const list: ListPayload<Project> = adaptLaravelList({
    results: {
        data: [{ id: 'studio', name: 'Studio website' }],
        current_page: 1,
        last_page: 1,
        per_page: 15,
        total: 1,
    },
    config: {
        searchable: ['name'],
        sortable: ['name'],
        filters: {},
        actions: [],
    },
    filters: {},
    state: { page: 1, per_page: 15, order_by: 'name', order: 'ASC', search: null },
});
```

The helper fills pagination fields such as ranges and missing page URLs. This example uses a Laravel-shaped paginator as a convenient normalisation boundary; it does not require a Laravel runtime.

## Query state

`ListState` uses `page`, `per_page`, `order_by`, uppercase `order` (`ASC` or `DESC`) and `search` (`string | null`). Query callbacks use these names even when a Lucid source uses camelCase fields.

Return the effective state with each replacement list. If the server clamps an out-of-range page or changes the page size, use its response metadata. Keep `filters`, `state` and `results` consistent so the controls describe the displayed page.

## Filter definitions

`config.filters` maps field keys to definitions. Supported types are `select`, `multiselect`, `checkbox`, `switch`, `category`, `date-range` and `number-range`. Supply labels or translation keys and option values; searchable choice controls use `searchable: true`. Number ranges accept `min`, `max` and `step`; date ranges use ISO calendar dates.

The filter sheet edits a draft. Applying validates supported ranges before requesting a new list; the backend still validates its own inputs. FilterBar shows applied values, rather than partially edited drafts. Configure `searchable: false` on DataTable to hide search for an endpoint that only supports filters.
