# Form layout

Use Form for generated fields, or FormLayout for manually composed content. Both render an outer native form, provide section navigation and arrange actions responsively. Choose one outer layout; do not nest native forms.

## Generated and manual layouts

Form receives `form`, `sections`, `title` and `cancelHref`. Connect `@submit` to the controller, bind `loading` and `formError`, and supply accessible `actionsLabel` and `sectionSelectorLabel` text. Control navigation with `v-model:activeSection` or set `initialSection` once. Cancel links use ordinary anchors by default, or the host link component supplied by the `navigation` adapter. `createMiru({ adapter: inertiaAdapter() })` supplies Inertia Link.

For a manual layout, use this pattern with your own controller and fields:

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { FormLayout, Field, FieldLabel, Input } from '@rat.md/miru';

const active = ref('profile');
const name = ref('Alex');
const tabs = [{ value: 'profile', label: 'Profile' }];
function save() {
    // Connect your form controller here.
}
</script>

<template>
    <FormLayout
        v-model="active"
        :tabs="tabs"
        primary-label="Save changes"
        navigation-label="Profile sections"
        actions-label="Profile actions"
        @submit="save">
        <template #header><h1>Your profile</h1></template>
        <template #default="{ tab }">
            <Field v-if="tab?.value === 'profile'">
                <FieldLabel for="manual-name">Name</FieldLabel>
                <Input id="manual-name" v-model="name" />
            </Field>
        </template>
    </FormLayout>
</template>
```

The example leaves submission to the application. Connect `useForm` as shown in [Field composition](/docs/forms/fields) when validation and requests are required.

## Available width and mobile actions

The layout responds to its available width, including inside panels. Below 1024px, section tabs sit above the fields and actions dock at the bottom. From 1024px, navigation moves left and actions right; side columns widen from 1280px. Inactive sections remain mounted to preserve editing state.

Desktop actions appear as primary, secondary, then extra actions. Mobile keeps at most three controls: overflow, secondary and primary. Extra actions open in a drawer. The layout reserves space for the footer and safe area.

## Extra actions and slots

Pass `additionalActions` with stable ids and handle `@action` in the application. Filter actions by permissions before passing them in. Form accepts literal or translated action labels. A `standalone` section hides its actions; manual FormLayout uses `:show-actions="false"`.

Form slots include `header`, `actions` for desktop actions, `additional-actions` and `mobile-actions`. FormLayout also exposes `primary-action`, `secondary-action` and `desktop-actions`. Additional-action slot properties include `close()` for dismissing the mobile drawer after an action. See each component’s API for the exact slot scopes.

Render FloatingAppBar in `#floating-app-bar="barProps"` and bind those properties when a compact app bar is needed. The layout manages docking and clearance; use the supplied slot rather than positioning another fixed bar over its footer.

Reference: [Form](/components/form), [FormLayout](/components/form-layout). Next: [Submission adapters](/docs/forms/adapters).
