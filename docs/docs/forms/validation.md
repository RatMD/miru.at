# Form validation

`useForm` wraps TanStack Vue Form with Zod validation and a submission adapter. Call it in component setup. The schema defines valid data; initial values provide the editable state.

## A complete form

Replace the endpoint and cancel destination with your own routes.

```vue
<script setup lang="ts">
import { z } from 'zod';
import { Form, defineFormSections, literal } from '@rat.md/miru';
import { useForm } from '@rat.md/miru/composables';

const { form, loading, formError, submitForm } = useForm({
    schema: z.object({
        name: z.string().trim().min(1, 'Enter your name.'),
        email: z.email('Enter a valid email address.'),
    }),
    initialValues: { name: '', email: '' },
    submit: { method: 'patch', url: '/api/profile' },
    adapter: 'ajax',
});

const sections = defineFormSections<'name' | 'email'>([
    {
        id: 'profile',
        label: literal('Profile'),
        fields: [
            {
                type: 'input',
                name: 'name',
                label: literal('Name'),
                required: true,
                showValidation: true,
                span: 6,
            },
            {
                type: 'input',
                name: 'email',
                inputType: 'email',
                label: literal('Email'),
                required: true,
                showValidation: true,
                span: 6,
            },
        ],
    },
]);
</script>

<template>
    <Form
        title="Your profile"
        :form="form"
        :sections="sections"
        :loading="loading"
        :form-error="formError"
        :save-label="literal('Save profile')"
        :actions-label="literal('Profile actions')"
        :section-selector-label="literal('Profile sections')"
        cancel-href="/profile"
        @submit="submitForm" />
</template>
```

Form already renders a native form. Top-level refs such as `loading` unwrap in templates. If you retain the controller as an object, use `controller.loading.value` for its nested ref.

## Submission lifecycle

1. Previous submission errors are cleared and the schema is parsed asynchronously.
2. Invalid fields receive errors and touched state. No request is sent.
3. Validated values, including Zod transformations, become the submission values. `transformValues` can turn them into a request payload.
4. `beforeSubmit` runs, then the selected adapter sends the request. `loading` prevents duplicate submissions.
5. Server field errors return to their fields; general errors appear through `formError`. The controller calls `onSuccess` or `onError` and clears loading state.

`required` adds interface hints and control attributes. `showValidation` enables the generator’s touched-state validation markers. Neither replaces schema rules. Validate every request on the server as well.

## Controller and options

| Member                    | Use                                                                      |
| ------------------------- | ------------------------------------------------------------------------ |
| `form`                    | TanStack form API: field bindings, current values, validation and reset. |
| `loading`                 | Reactive submission state.                                               |
| `formError`               | Reactive general error message.                                          |
| `submit`                  | Resolved method and URL. A string target uses POST.                      |
| `submitForm()`            | Validate and submit to the configured target.                            |
| `onSubmit(method?, url?)` | Override the method or target for one submission.                        |

Use `transformValues` to prepare the payload, `beforeSubmit` for validated work before the request, and `onSuccess` or `onError` for application feedback. `resetFields` resets selected fields after success. `mapErrors` adapts server field names. The [adapter guide](/docs/forms/adapters) covers their request context and error format.

For a local validation preview, call `await form.validate('submit')`; this sends no request. Use `form.reset()` to restore initial state. For manual controls, connect the field value, change handler and blur handler as shown in [Field composition](/docs/forms/fields).

## Reusable validation rules

You can use ordinary Zod schemas, including asynchronous refinements and transformations. Miru’s `useValidation()` also provides localised factories for email addresses, GTINs, IBANs and card numbers, plus application-registered factories. See [Validation factories](/docs/forms/validation) for their registration and typing.

Next: [Form generator](/docs/forms/generator) or [Submission adapters](/docs/forms/adapters).


## Field contract for v0.1.0

Text controls retain `''` for an empty editable string. Nullable selections and date values use `null` where declared by their model types; multi-value controls use an empty array. `undefined` generally means that a prop or default was not supplied. Model types remain authoritative: normalize empty values in your Zod schema or request transform when the backend needs a different representation.

For composed input controls, `class` targets the editable field or trigger. `wrapperClass` targets its layout container. Existing explicit `inputClass` props remain available. Collection layouts such as CheckboxGroup apply `class` to their generated fields and `wrapperClass` to the group; custom slots own their own field styling. Low-level primitives style the element they render.

Use `name` for native submission and GET query serialization, and `required` for browser validation. Date/time controls mirror serialized values into native controls; a timeframe submits `name[start]` and `name[end]`. Phone input submits its complete international value. An unchecked checkbox is omitted by native forms; selected CheckboxGroup options submit repeated names. Native forms always serialize strings/files, regardless of the Vue model type.

`readonly` keeps the value in submission and prevents user edits. `disabled` prevents interaction and removes native controls from submission. Readonly is therefore useful for values that must remain visible and submitted. Selection widgets retain their focusable trigger while blocking changes; native file inputs block the picker and drop interaction because browsers have no native readonly file-input mode. Use server validation for every submitted value. Toggles and other presentation-only controls do not automatically become named form fields.

Standard field sizes are `sm`, `default` and `lg`, including InputDateTime. Additional sizes on specialized components are documented by their own API.
