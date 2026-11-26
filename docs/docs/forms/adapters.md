# Submission adapters

`useForm` owns validation, values, errors and loading. An adapter sends validated data and returns a common success or error result. Choose AJAX, Inertia or an application adapter.

## Choose the adapter

AJAX is the default. Set `adapter: 'ajax'` or pass an adapter object on a form. The optional Inertia integration also registers `adapter: 'inertia'`. A shared default can be configured once:

```ts
import { createMiru } from '@rat.md/miru/miru';
import { createAjaxFormAdapter } from '@rat.md/miru/adapters/ajax';

const formAdapter = createAjaxFormAdapter({ credentials: 'same-origin' });
// During your existing application setup:
app.use(createMiru({ formAdapter }));
```

Choose either the named adapter or a configured factory. Precedence is the form’s `adapter`, its legacy `mode`, the global `formAdapter`, then AJAX. `mode: 'json'` is an older alias for AJAX; prefer `adapter` in new code.

Adapters keep no per-form loading state, so a shared instance can serve several forms. Configure authentication, CSRF headers and credentials in the host application.

## AJAX requests and files

`createAjaxFormAdapter` uses Miru’s request helper and native fetch. Plain records are sent as JSON. Nested File or Blob values automatically become multipart FormData; explicit FormData is accepted too. GET serialises nested fields with bracket notation and rejects file uploads. Other methods retain their configured HTTP method.

Use `requestOptions(context)` per form, or factory defaults for shared fetch settings. Headers merge with the defaults. Leave multipart content type to the browser so it can supply the boundary. Standard fetch options, including AbortSignal, are supported.

For a backend requiring method spoofing, explicitly transform the payload and choose POST with `_method`. You can also return `toFormData(values)` from `transformValues`; import the helper from `@rat.md/miru/support`.

## Responses and errors

Successful AJAX responses can be raw JSON or `{ status: 'success', result, message? }`. Empty 204/205 responses succeed with an undefined result. Recognised field errors include:

```json
{
    "errors": {
        "email": ["This email address is already in use."],
        "items.0.name": ["Enter an item name."]
    }
}
```

Miru error envelopes can use `{ status: 'error', message, details: { source: 'server', errors } }`. Error arrays use their first message. Numeric dot paths become TanStack bracket paths, so `items.0.name` becomes `items[0].name`. `_form` represents a general error. Use `mapErrors` to adapt recognised field names; when supplied, it is responsible for returning the final field paths.

Client schema errors, server validation errors and transport errors remain distinguishable through `details.source`. Network failures and HTTP 5xx responses are transport errors. `onError` receives the normalised result; `formError` provides the general message for the interface. Use a custom adapter for a different response protocol.

## Inertia visits

Install Inertia in the host app (`@inertiajs/core` and `@inertiajs/vue3`) and import `inertiaAdapter` from `@rat.md/miru/adapters/inertia` and use `createMiru({ adapter: inertiaAdapter() })`. It registers the named Inertia adapter, makes it the form default and supplies Inertia links and table navigation. The adapter uses `router.visit`. Core MIRU imports and declarations do not require Inertia. Use `visitOptions(context)` for options such as `preserveScroll` or partial reloads. Successful visits return the Page object; validation errors and cancellations return normalised errors.

For shared visit defaults, import `createInertiaFormAdapter` from `@rat.md/miru/adapters/inertia` and use it as `formAdapter`. That explicit import loads the form integration. For legacy named selection, also register `formAdapters: { inertia: createInertiaFormAdapter() }`. Use `createInertiaNavigationAdapter()` from the optional adapter entry point as the `navigation` option when enabling SPA links and table navigation manually. Custom navigation adapters implement `NavigationAdapter` from `@rat.md/miru/adapters/ajax`.

## Custom adapters

```ts
import type { FormAdapter } from '@rat.md/miru';

const adapter: FormAdapter = {
    async submit(context) {
        // Replace this local example with your application request.
        return { status: 'success', result: context.values };
    },
};
```

The context contains `method`, `url`, parsed `values`, transformed `payload`, optional `options` and localised cancellation/error messages. Return `{ status: 'success', result }` or `{ status: 'error', source: 'server' | 'transport', errors?, message? }`. Throwing produces a transport error.

`adapterOptions(context)` supplies custom options and takes precedence over `requestOptions`, deprecated `httpOptions` and `visitOptions`. Validation, `beforeSubmit`, callbacks, `resetFields` and duplicate-submit protection apply to every adapter.

## Updating older forms

Existing Inertia applications should use `createMiru({ adapter: inertiaAdapter() })` to retain their form and navigation defaults; ordinary `createMiru()` now defaults to AJAX. JSON forms now use fetch rather than Inertia’s old HTTP client. Replace `httpOptions` with `requestOptions`, and move Inertia-specific HTTP callbacks into a custom adapter or `onSuccess`/`onError`. The controller exposes `loading` and submission methods rather than an Inertia-specific `http` client. Use the controller’s result generic when a success handler needs a typed payload or Inertia Page.

Return to [Forms introduction](/docs/forms/introduction) or the [useForm reference](/docs/composables/useForm).
