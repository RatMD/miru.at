# Field composition

Field components provide layout and feedback. A form controller owns values, touched state and validation. Keep these responsibilities explicit when composing a field.

| Primitive                          | Responsibility                                                     |
| ---------------------------------- | ------------------------------------------------------------------ |
| Field                              | Layout and validation display context for labels.                  |
| Label or FieldLabel                | Control association, required marker and optional validation icon. |
| Input, Textarea or another control | Value, editing, disabled state and control-level ARIA attributes.  |
| FieldDescription                   | Supporting text linked with `aria-describedby`.                    |
| FieldError                         | Visible error messages with alert semantics.                       |
| InputGroup                         | A shared surface for a control, add-ons and actions.               |

## Connect a manual field

This standalone example validates and submits through the same controller as a generated form.

```vue
<script setup lang="ts">
import { z } from 'zod';
import { Field, FieldLabel, FieldDescription, FieldError, Input, Button } from '@rat.md/miru';
import { useForm } from '@rat.md/miru/composables';

const { form, loading, submitForm } = useForm({
    schema: z.object({ name: z.string().min(1, 'Enter a name.') }),
    initialValues: { name: '' },
    submit: '/api/profile',
    adapter: 'ajax',
});
</script>

<template>
    <form novalidate @submit.prevent="submitForm">
        <form.Field name="name" v-slot="{ field }">
            <Field
                :invalid="field.state.meta.isTouched && !field.state.meta.isValid"
                show-validation>
                <FieldLabel for="profile-name" required>Name</FieldLabel>
                <Input
                    id="profile-name"
                    required
                    :model-value="field.state.value"
                    :disabled="loading"
                    :aria-invalid="field.state.meta.isTouched && !field.state.meta.isValid"
                    aria-describedby="name-hint name-errors"
                    @update:model-value="field.handleChange(String($event))"
                    @blur="field.handleBlur" />
                <FieldDescription id="name-hint">Your public display name.</FieldDescription>
                <FieldError
                    v-if="field.state.meta.isTouched"
                    id="name-errors"
                    :errors="field.state.meta.errors" />
            </Field>
        </form.Field>
        <Button type="submit" :loading="loading">Save</Button>
    </form>
</template>
```

Field does not disable arbitrary descendants or forward validation attributes to their inputs. Bind those attributes to the control itself. Match the label’s `for` to the control’s `id`, and associate hint and error text with `aria-describedby`.

## Validation display

Label inherits validation state from Field unless explicit props override it. Invalid state takes precedence over valid state. `aria-invalid` is standard ARIA; Miru also accepts `aria-valid` as an input alias and renders `data-valid` instead of a non-standard ARIA attribute. `showValidation` controls the label’s status icon; it does not execute validation.

For loading feedback, disable editing, mark the relevant region `aria-busy` and use a decorative Spinner when the state is already announced. The Field playground’s disabled and loading switches configure its example input; they are not Field props.

## Input groups and grouped controls

Place InputGroupInput or InputGroupTextarea inside InputGroup, then add InputGroupAddon with `align="inline-start"`, `inline-end`, `block-start` or `block-end`. InputGroupText displays a prefix or suffix; InputGroupButton supplies an action. Bind the value and events to the inner control. Give icon-only actions an accessible name.

Use FieldSet and FieldLegend for a semantic control group, FieldGroup for spacing and responsive layout, and FieldContent when a horizontal field needs a text column.

Reference: [Field](/components/field), [InputGroup](/components/input-group) and [Label](/components/label). Next: [Form generator](/docs/forms/generator).
