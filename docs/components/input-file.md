---
title: "InputFile"
component: InputFile
componentPage: overview
---

## Preview

<ComponentExample name="InputFile" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Styled native file selection in three sizes.</li>
    <li>Selection events for application-controlled uploads.</li>
</ul>

## File selection

The `files` event returns the selected File array. Pass native accept, multiple, name, required and disabled attributes to control selection. There is no file-value model and no upload request; handle the files in the application.

## Dependencies

- **UI:** [Input](/components/input)
- **Packages:** [class-variance-authority](https://www.npmjs.com/package/class-variance-authority), [clsx](https://www.npmjs.com/package/clsx), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/input-file/reference) for the complete component contract.
