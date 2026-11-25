---
title: AJAX & Inertia
---

# AJAX & Inertia

Transport adapters connect form submission and navigation to the host application. AJAX is the default; Inertia is an optional integration. Backend list conventions remain a separate choice, described in [Adonis & Laravel](/docs/guide/backends).

## AJAX

Ordinary `createMiru()` uses AJAX form submission and browser navigation. Configure shared fetch options explicitly when needed:

```ts
import { createMiru } from '@rat.md/miru';
import { ajaxAdapter } from '@rat.md/miru/adapters/ajax';

app.use(
    createMiru({
        adapter: ajaxAdapter({ credentials: 'same-origin' }),
    }),
);
```

Forms send JSON, or multipart FormData when values contain files. The application supplies endpoints, authentication and CSRF settings. GET navigation performs a normal browser visit; mutations use the AJAX form adapter and reload after success. For a DataTable that updates in place from JSON, provide its own `queryHandler` and replace the list when the request completes.

## Inertia

Install Inertia in the host Vue application first, then use its explicit adapter entry point:

```ts
import { createMiru } from '@rat.md/miru';
import { inertiaAdapter } from '@rat.md/miru/adapters/inertia';
import { laravelAdapter } from '@rat.md/miru/adapters/laravel';

app.use(
    createMiru({
        adapter: inertiaAdapter(),
        dataTable: laravelAdapter(),
    }),
);
```

The adapter supplies Inertia form submission, router visits and its link component. It also reads the optional `app.locale` and `app.toasts` page props reactively. Explicit Miru options override these defaults. Use `adonisAdapter()` instead when the backend returns Lucid lists; Inertia does not determine the backend payload format.

Mount [PageRoot](/layouts/page-root) once above changing layouts, or use `miru.wrap(App)`, to host notifications. Installing the plugin alone does not mount a notification host. Core Miru imports do not require Inertia; keep its adapter on the explicit `@rat.md/miru/adapters/inertia` entry point.

## Form overrides

A form’s `adapter` overrides its legacy `mode`, the application default and finally AJAX. Choose `'ajax'`, a registered `'inertia'` adapter or a custom `FormAdapter` object. Factories such as `createAjaxFormAdapter` and `createInertiaFormAdapter` configure submission alone without replacing the application’s navigation.

`useForm` owns values, validation, pending state and errors. Adapters return a common success or error result; they do not replace the form controller. See [Submission adapters](/docs/forms/adapters) for error mapping, uploads, callbacks and custom implementations, and [useNavigation](/docs/composables/useNavigation) for the shared navigation service.
