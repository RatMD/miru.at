---
title: 'Form'
component: Form
componentPage: overview
---

## Preview

<ComponentExample name="Form" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Generated sections with navigation and custom field slots.</li>
    <li>Responsive desktop and mobile actions.</li>
    <li>Application-controlled submission, loading and error state.</li>
</ul>

## Component responsibilities

Form renders the outer form through FormLayout. Do not nest it in another native form. Connect `submit` to your controller and pass its `loading` and `formError` state. FormSectionRenderer renders one generated section; FormFieldRenderer binds an individual field. There is no separate FormGenerator Vue export. Custom field and section slots extend the generated content.

See [Generator](/components/generator) for the section and field renderers.

## Dependencies

- **UI:** [Button](/components/button), [Description](/components/api/description), [FieldError](/components/field/reference#field-error), [FormLocaleSwitcher](/components/form/reference#form-locale-switcher), [FormLayout](/components/form-layout), [FormSectionRenderer](/components/generator), [FormText](/components/form/reference#form-text)
- **Packages:** [@inertiajs/vue3](https://www.npmjs.com/package/@inertiajs/vue3), [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [class-variance-authority](https://www.npmjs.com/package/class-variance-authority), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/form/reference) for the complete component contract.
