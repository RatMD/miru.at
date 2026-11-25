# Form generator

The generator composes Form, FormLayout, FormSectionRenderer and FormFieldRenderer. Describe the fields in TypeScript and supply the form controller from [Form validation](/docs/forms/validation). There is no separate FormGenerator Vue export.

## Sections and field definitions

```ts
import { defineFormSections, literal } from '@rat.md/miru';

const sections = defineFormSections<'name' | 'status' | 'notes'>([
    {
        id: 'project',
        label: literal('Project'),
        fields: [
            { type: 'header', id: 'details', title: literal('Project details') },
            { type: 'input', name: 'name', label: literal('Name'), required: true, span: 6 },
            {
                type: 'select',
                name: 'status',
                label: literal('Status'),
                span: 6,
                options: [
                    { value: 'draft', label: literal('Draft') },
                    { value: 'live', label: literal('Live') },
                ],
            },
            {
                type: 'textarea',
                name: 'notes',
                label: literal('Notes'),
                rows: 3,
                maxLength: 240,
                counter: true,
            },
        ],
    },
]);
```

Provide matching schema paths and initial values, such as `{ name: '', status: 'draft', notes: '' }`. Pass `sections` to Form. The helper preserves the definition types; the schema still defines the validation rules.

## Available field types

| Group                | Types                                                                             |
| -------------------- | --------------------------------------------------------------------------------- |
| Text and dates       | `input`, `password`, `date`, `textarea`                                           |
| Selection            | `select`, `combobox`, `category`, `checkbox`, `checkbox-group`, `radio`, `switch` |
| Editors              | `markdown`, `json`, `richtext`                                                    |
| Layout and extension | `header`, `spacer`, `custom`                                                      |

`inputType` selects native types such as email, URL, telephone or number. Select fields support grouped options and optional search. Rich text uses TinyMCE and requires the host’s editor configuration. JSON syntax feedback helps while editing; validate the submitted JSON string in your schema too.

Shared field options include `name`, `label`, `description`, `placeholder`, `span`, `disabled`, `required`, `showValidation`, `hidden`, `class` and `inputClass`. Header and spacer definitions do not create form values.

## Responsive layout

Sections use a 12-column grid. A numeric `span: 6` occupies the full row on mobile and half from `md`. Use `span: { base: 12, lg: 4 }` for explicit breakpoints. A section can use `gridColumns: 10` for fifths at desktop widths. Use `hideHeader` when the content supplies its own headings, or `standalone: true` to hide form actions for that section.

## Custom fields and repeated items

Add a custom definition such as `{ type: 'custom', name: 'seats', label: literal('Seats'), slot: 'seats' }`. On Form, render it through `#field-seats="{ field }"`. Bind the control to `field.state.value`, call `field.handleChange(value)` on edits and `field.handleBlur()` on blur. Include a label and FieldError as shown in [Field composition](/docs/forms/fields).

The same pattern supports uploads, tags, date ranges, relationship pickers and application widgets. FormRepeater provides item layout and add/remove requests; the application updates the array. Give repeaters stable item keys and use TanStack array field paths such as `items[0].name`. FormRelationshipPicker stores selected option values, while FormRelationSummary displays related records.

Form also exposes `section-[id]-before`, `section-[id]-actions` and `section-[id]-after` slots. Their names use the section id; custom field slot names use the definition’s `slot` value.

## Labels and translated values

Use `literal('Name')` for ready-to-display text or `translated('profile.name')` for a translation key. These describe interface text. Translated field values are configured separately:

```ts
import { createFormLocalization } from '@rat.md/miru';

const localization = createFormLocalization(['en', 'de'], 'en');
```

Pass `localization` to Form and set `localized: true` on the relevant fields. The default nested strategy uses paths such as `translations.en.name`; `fieldPath: 'locale_suffix'` uses `name_en`. Include the same shape in initial values and the schema. Switching locale changes the edited path rather than translating or submitting values automatically.

Reference: [Generator](/components/generator), [FormFieldRenderer](/components/generator/reference#form-field-renderer) and [FormRepeater](/components/form/reference#form-repeater). Next: [Form layout](/docs/forms/layouts).
