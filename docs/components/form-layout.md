---
title: 'FormLayout'
component: FormLayout
componentPage: overview
---

## Preview

<ComponentExample name="FormLayout" />

## Usage

FormLayout supplies a native form, optional section navigation and responsive action regions. Use it to compose fields manually. [Form](/components/form) uses this layout internally to render generated sections; the two exports serve different levels of composition.

```vue
<template>
    <FormLayout
        primary-label="Save changes"
        secondary-label="Cancel"
        :loading="saving"
        @submit="save"
        @secondary="cancel">
        <Field>
            <Label for="name">Name</Label>
            <Input id="name" v-model="name" />
        </Field>
    </FormLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Field, FormLayout, Input, Label } from '@rat.md/miru';
const name = ref('');
const saving = ref(false);
function save() {
    /* Save application values. */
}
function cancel() {
    /* Return to the previous screen. */
}
</script>
```

## Sections and actions

Pass `tabs` and bind `v-model` to select a section. The default slot receives the active `tab`; the application decides which fields to show. Desktop layouts display navigation and actions beside the content. Compact layouts move navigation above the form and dock actions below it, with additional actions in a drawer.

The primary action submits the native form. Secondary and additional actions emit `secondary` and `action` without saving values themselves. `loading` supplies pending feedback and disables built-in actions. Slots can replace the desktop actions or individual action controls; `showActions=false` hides the action regions while retaining navigation.

Do not nest FormLayout inside another native form. For controller bindings, generated fields, validation and transport adapters, read the [Forms introduction](/docs/forms/introduction).

## Dependencies

- **UI:** [Button](/components/button), [Drawer](/components/drawer), [DrawerContent](/components/drawer/reference#drawer-content), [DrawerDescription](/components/drawer/reference#drawer-description), [DrawerHeader](/components/drawer/reference#drawer-header), [DrawerTitle](/components/drawer/reference#drawer-title), [Tabs](/components/tabs)
- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/form-layout/reference) for the complete component contract.
