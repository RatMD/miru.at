---
title: Adapters
---

# Adapters

Adapters help Miru fit into your application’s existing setup. Choose the backend conventions for your lists, then the transport for form submissions and navigation; the two choices work independently.

`dataTable` selects how list payloads and queries are interpreted. `adapter` supplies form transport, navigation and optional page defaults. You can combine either backend with either transport. Without explicit choices, Miru uses its own list contract and AJAX.

| Integration | Configure                     | Purpose                                                   |
| ----------- | ----------------------------- | --------------------------------------------------------- |
| Adonis      | `dataTable: adonisAdapter()`  | Lucid list payloads, pagination and query conventions.    |
| Laravel     | `dataTable: laravelAdapter()` | Laravel list payloads and pagination.                     |
| Inertia     | `adapter: inertiaAdapter()`   | Inertia forms, links, visits and reactive page defaults.  |
| AJAX        | `adapter: ajaxAdapter()`      | Fetch-based forms, browser navigation and AJAX mutations. |

The examples below fit into your existing Vue application setup. Keep imports explicit: each integration has its own entry point, and core Miru imports do not load Inertia.

## Adonis

The [AdonisJS](https://adonisjs.com/) adapter selects Lucid conventions for DataTable. It normalises the list and serialises outgoing queries; fetching data remains the application’s responsibility.

### Configure DataTable

```ts
import { createMiru } from '@rat.md/miru';
import { adonisAdapter } from '@rat.md/miru/adapters/adonis';

app.use(
    createMiru({
        dataTable: adonisAdapter({ perPageKey: 'limit' }),
    }),
);
```

Supply a list envelope containing `results`, `config`, `filters` and optional `state`. Put the Lucid paginator in `results`: its `data` contains the rows, while `meta` contains camelCase fields such as `currentPage`, `lastPage`, `perPage` and `total`. A paginator alone cannot describe the table’s filters, sorting or actions.

Use the exported `adaptLucidPagination` or `adaptLucidList` helpers when preparing data yourself. The configured adapter performs the same normalisation for tables that inherit it.

### Match your endpoint

Queries use `page`, `perPage`, `orderBy`, lowercase `order` and `search`, with filter values at the top level. `perPageKey` changes the page-size key; its default is `perPage`. Use `serializeFilters` to rename filter fields or encode application-specific values. These are configurable endpoint conventions, rather than requirements imposed by Lucid.

An explicit `querySerializer` takes precedence over the inherited serialiser. A custom `queryHandler` owns the request and response, so apply the configured serialiser or map its canonical state yourself. See [Response adapters](/docs/data-table/adapters) for the typed contracts.

## Laravel

The [Laravel](https://laravel.com/) adapter recognises the standard length-aware paginator and converts it into Miru’s shared list contract. It can be paired with AJAX or Inertia.

### Configure DataTable

```ts
import { createMiru } from '@rat.md/miru';
import { laravelAdapter } from '@rat.md/miru/adapters/laravel';

app.use(createMiru({ dataTable: laravelAdapter() }));
```

The list envelope still contains `results`, `config`, `filters` and optional `state`. Laravel’s paginator belongs in `results`, with `data`, `current_page`, `last_page`, `per_page` and `total`. The exported `adaptLaravelPagination` and `adaptLaravelList` helpers are available for manual conversion.

Queries follow Miru’s conventions: `page`, `per_page`, `order_by`, uppercase `order` and nested `filters`. Search is carried in `filters.search`. Your server decides which fields and filters are accepted.

### Other pagination formats

API Resources with a different `data`/`meta`/`links` structure need an application mapping. Cursor pagination does not supply the total and last-page values required by this numbered-pagination contract. The standalone [Pagination component](/components/pagination) provides the controls; your application owns fetching and page state.

For either backend, `data-format="default"`, `"lucid"` or `"laravel"` overrides the inherited conventions for one table. See [Backend connection](/docs/data-table/backend) for request examples and [List contract](/docs/data-table/list-contract) for the complete envelope.

## Inertia

The [Inertia](https://inertiajs.com/) adapter connects Miru to your host application’s Inertia installation. It supplies form submission, router visits and Inertia’s link component; the backend payload format remains a separate choice.

### Set up the integration

Install compatible `@inertiajs/core` and `@inertiajs/vue3` packages in the host application. The current integration targets `^3.11.0`. Inside your existing `createInertiaApp` setup callback:

```ts
import { createApp } from 'vue';
import { createMiru } from '@rat.md/miru';
import { inertiaAdapter } from '@rat.md/miru/adapters/inertia';
import { laravelAdapter } from '@rat.md/miru/adapters/laravel';

// Inside setup({ el, App, props, plugin }):
const miru = createMiru({
    adapter: inertiaAdapter(),
    dataTable: laravelAdapter(),
});

createApp({ render: () => miru.wrap(App, props) })
    .use(plugin)
    .use(miru)
    .mount(el);
```

Use `adonisAdapter()` instead when your backend supplies Lucid lists. `miru.wrap(App, props)` renders the application inside [PageRoot](/layouts/page-root) and forwards Inertia’s props. Alternatively, mount PageRoot yourself. Keep one persistent root above changing layouts so notifications have a single host. See [Installation](/docs/guide/installation#inertia) for the complete application setup.

### Defaults and overrides

`inertiaAdapter(options)` registers the named `inertia` form adapter, makes it the form default and supplies shared navigation for forms and DataTable operations. It reads optional `app.locale` and `app.toasts` page props reactively. Explicit `formAdapter`, `formAdapters`, `navigation`, locale and notification options override the supplied defaults.

For a narrower integration, import `createInertiaFormAdapter` and `createInertiaNavigationAdapter` from `@rat.md/miru/adapters/inertia` and configure them separately. Register `formAdapters: { inertia: createInertiaFormAdapter() }` if forms select `adapter: 'inertia'` by name. Existing `queryHandler`, `bulkActionHandler` and `moveHandler` callbacks retain precedence.

## AJAX

AJAX is Miru’s default transport. Forms submit through the request helper and native fetch, while ordinary links and GET navigation use browser visits. Your application supplies endpoints, authentication and CSRF settings.

### Configure requests

```ts
import { createMiru } from '@rat.md/miru';
import { ajaxAdapter } from '@rat.md/miru/adapters/ajax';

app.use(
    createMiru({
        adapter: ajaxAdapter({ credentials: 'same-origin' }),
    }),
);
```

Omit `adapter` to use the defaults. Options such as `headers` and `credentials` apply to named AJAX form submissions and table mutations. Per-form `requestOptions` can override them; headers are merged.

Plain form values are sent as JSON. Nested files become multipart FormData automatically; explicit FormData is also accepted. Let the browser set its multipart content type and boundary. GET submissions encode values into the URL and reject files.

### Navigation and form control

Mutations made through AJAX navigation reload the current page after success. For a DataTable that updates in place from JSON, provide a `queryHandler` and replace the list after the request completes. The [useNavigation reference](/docs/composables/useNavigation) describes the shared navigation API.

`useForm` continues to own values, validation, pending state and errors. A form’s `adapter` takes precedence over its legacy `mode`, the application default and finally AJAX. Choose `'ajax'`, a registered `'inertia'` adapter or your own `FormAdapter` object. To change submission alone, use `createAjaxFormAdapter` from `@rat.md/miru/adapters/ajax`.

Application integrations can implement `MiruAdapter` from `@rat.md/miru` to provide transport, navigation and reactive page defaults. See [Submission adapters](/docs/forms/adapters) for custom form adapters, response errors, uploads and callbacks.
