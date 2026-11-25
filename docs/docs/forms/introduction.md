# Forms

Miru combines form state, validation, field components and responsive layouts. You can build a form by hand or describe its sections and fields in TypeScript; both approaches can use the same controller and submission adapters.

| Part                                                                                 | Responsibility                                                |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| `useForm` and [@tanstack/vue-form](https://www.npmjs.com/package/@tanstack/vue-form) | Values, field state, validation results and submission state. |
| [Zod](https://www.npmjs.com/package/zod)                                             | Validation rules and parsed values.                           |
| Field, Label and InputGroup                                                          | Accessible labels, hints, errors and control presentation.    |
| Form and the renderers                                                               | Generated fields, sections and responsive actions.            |
| FormLayout                                                                           | Sections and actions around manually composed fields.         |
| AJAX, Inertia or a custom adapter                                                    | Sending validated data and returning a common result.         |

Your application supplies the schema, initial values, endpoint and saved data. Labels and required markers describe the interface; the schema and server enforce the rules.

## Choose a starting point

- [Form validation](/docs/forms/validation): a complete form and its submission lifecycle.
- [Field composition](/docs/forms/fields): build accessible fields yourself.
- [Form generator](/docs/forms/generator): typed definitions, custom fields and translated values.
- [Form layout](/docs/forms/layouts): sections, desktop actions and mobile navigation.
- [Submission adapters](/docs/forms/adapters): AJAX, Inertia, files and server errors.

Install Miru and its stylesheet as described in [Installation](/docs/guide/installation). Import components from `@rat.md/miru`, controllers from `@rat.md/miru/composables` and adapter factories from `@rat.md/miru/adapters`.

## Component reference

[Field](/components/field) · [Form](/components/form) · [FormLayout](/components/form-layout) · [Generator](/components/generator) · [InputGroup](/components/input-group) · [Label](/components/label)

The component named **Form** in the navigation exports as `Form`. **Generator** describes the composition of `Form`, `FormSectionRenderer` and `FormFieldRenderer`; there is no separate `FormGenerator` export.
