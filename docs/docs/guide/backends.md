---
title: Adonis & Laravel
---

# Adonis & Laravel

Miru’s backend adapters describe DataTable payloads, pagination and query conventions. They are independent of the transport: either backend can be used with AJAX or Inertia, and neither adapter requires a server framework in the browser.

## Application defaults

Choose the conventions used by your application during its existing Vue setup:

```ts
import { createMiru } from '@rat.md/miru';
import { adonisAdapter } from '@rat.md/miru/adapters/adonis';

app.use(
    createMiru({
        dataTable: adonisAdapter({ perPageKey: 'limit' }),
    }),
);
```

For Laravel, import `laravelAdapter` from `@rat.md/miru/adapters/laravel` and set `dataTable: laravelAdapter()`. Tables inherit the adapter, including its query serialiser. A table’s explicit `data-format="default"`, `"lucid"` or `"laravel"` overrides the backend choice for that table.

## List and pagination payloads

DataTable expects a list envelope containing `results`, `config`, `filters` and optional `state`. The paginator belongs in `results`; configuration describes searchable and sortable fields, filters and actions.

| Backend        | Paginator shape                                          | Helpers                                      |
| -------------- | -------------------------------------------------------- | -------------------------------------------- |
| Adonis / Lucid | `data` with camelCase pagination fields inside `meta`    | `adaptLucidPagination`, `adaptLucidList`     |
| Laravel        | `data`, `current_page`, `last_page`, `per_page`, `total` | `adaptLaravelPagination`, `adaptLaravelList` |

The pagination helpers return Miru’s shared pagination contract. The list helpers also normalise query state and retain list configuration. Use them directly when your application needs to prepare data before rendering. The configured DataTable adapter handles the same conversion for its tables.

Laravel API Resources with a different `data`/`meta`/`links` arrangement need an application mapping. Cursor pagination does not provide the total and last-page information required by this numbered-pagination contract. The standalone [Pagination component](/components/pagination) supplies navigation controls; the application still owns fetching and page state.

## Query conventions

Miru reports canonical `ListState`: `page`, `per_page`, `order_by`, uppercase `order` and `search`. `adonisAdapter` translates these to Lucid conventions; options such as `perPageKey` adapt the request to your endpoint. Laravel uses the canonical query conventions.

When supplying your own JSON `queryHandler`, call the configured serialiser or map the state yourself. An explicit handler owns its request, response, loading and errors. Permissions and accepted query fields must be checked by the server.

See [Response adapters](/docs/data-table/adapters) for typed payloads and custom mappings, [Backend connection](/docs/data-table/backend) for request examples, and [AJAX & Inertia](/docs/guide/adapters) to select the transport.
