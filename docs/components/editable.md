---
title: "Editable"
component: Editable
componentPage: overview
---

## Preview

<ComponentExample name="Editable" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Inline editing with save, cancel and optional multiline input.</li>
    <li>Asynchronous saving with pending feedback and draft recovery.</li>
</ul>

## Saving text

Editing starts through the edit button by default. Enter saves and Escape cancels; in multiline mode, Shift+Enter inserts a line break. The draft is separate from the committed model and hidden form value.

Provide save(value) for asynchronous persistence. The model updates after the callback succeeds; returning a string replaces the submitted text. A thrown or rejected error reopens editing and retains the draft. The loading prop can also indicate externally managed work.

## Content sizing

autoResize fits the preview and editor to the current content. minWidth and maxWidth accept CSS lengths or numeric pixel values; rows reserves a minimum number of lines. Use buttonStyle="shadow" for ButtonShadow actions instead of ButtonAction.

## Dependencies

- **UI:** [ButtonAction](/components/button-action), [ButtonShadow](/components/button-shadow), [Tooltip](/components/tooltip), [TooltipContent](/components/tooltip/reference#tooltip-content), [TooltipProvider](/components/tooltip/reference#tooltip-provider), [TooltipTrigger](/components/tooltip/reference#tooltip-trigger)
- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Editable](https://reka-ui.com/docs/components/editable)

See the [reference](/components/editable/reference) for the complete component contract.
