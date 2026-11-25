---
title: "Generator"
component: FormSectionRenderer
componentPage: overview
---

## Preview

<ComponentExample name="FormSectionRenderer" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Render typed section and field definitions.</li>
    <li>Use responsive grids with custom field content.</li>
    <li>Connect controls to the supplied form state.</li>
</ul>

## Component responsibilities

FormSectionRenderer renders one typed section, and FormFieldRenderer connects each definition to its control and form state. Use custom field slots to extend the generated grid. There is no separate FormGenerator Vue export; use [Form](/components/form) when you also need the outer form, navigation and actions.

## Dependencies

- **UI:** [FormFieldRenderer](/components/generator/reference#form-field-renderer), [FormHeader](/components/generator/reference#form-header), [FormSpacer](/components/generator/reference#form-spacer), [FormText](/components/form/reference#form-text)
- **Packages:** [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/generator/reference) for the complete component contract.
