---
title: "InputGroup"
component: InputGroup
componentPage: overview
---

## Preview

<ComponentExample name="InputGroup" :show-playground="false" />

## Features

<ul class="component-features">
    <li>A shared border, size and focus treatment.</li>
    <li>Prefixes, suffixes and compact action buttons.</li>
    <li>Text input and multiline control variants.</li>
</ul>

## Controls, models and add-ons

Place InputGroupInput or InputGroupTextarea inside InputGroup and add InputGroupAddon, InputGroupText or InputGroupButton as needed. Bind `v-model`, native attributes and input events to the inner control; these wrappers forward them to Input or Textarea rather than declaring their own model. The group supplies shared presentation and size, while labels, validation and submission remain separate.

## Dependencies

- **UI:** [Button](/components/button), [Input](/components/api/input), [Textarea](/components/api/textarea)
- **Packages:** [class-variance-authority](https://www.npmjs.com/package/class-variance-authority), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/input-group/reference) for the complete component contract.
