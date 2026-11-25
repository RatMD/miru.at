---
title: "AutoComplete"
component: AutoComplete
componentPage: overview
---

## Preview

<ComponentExample name="AutoComplete" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Free text or selection from grouped suggestions.</li>
    <li>Keyboard navigation, clearing and application-loaded results.</li>
</ul>

## Suggestions and free text

The model always contains text; choosing a suggestion is optional. Use options for a simple string list, or replace the default slot with AutoComplete parts for grouped or richer menus. AutoCompleteTrigger, AutoCompleteCancel and AutoCompleteLabel are also re-exported from Reka UI.

For remote suggestions, load results in the application, set loading during the request and enable ignoreFilter when the returned results are already filtered. AutoComplete does not fetch data itself.

## Dependencies

- **UI:** [AutoCompleteAnchor](/components/auto-complete/reference#auto-complete-anchor), [AutoCompleteEmpty](/components/auto-complete/reference#auto-complete-empty), [AutoCompleteInput](/components/auto-complete/reference#auto-complete-input), [AutoCompleteItem](/components/auto-complete/reference#auto-complete-item), [AutoCompleteList](/components/auto-complete/reference#auto-complete-list), [AutoCompleteViewport](/components/auto-complete/reference#auto-complete-viewport), [Input](/components/input), [Spinner](/components/spinner)
- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Autocomplete](https://reka-ui.com/docs/components/autocomplete)

See the [reference](/components/auto-complete/reference) for the complete component contract.
