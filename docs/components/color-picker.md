---
title: "ColorPicker"
component: ColorPicker
componentPage: overview
---

## Preview

<ComponentExample name="ColorPicker" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Colour area, channel controls and editable colour formats.</li>
    <li>Opacity, preset swatches and optional recent-colour history.</li>
</ul>

## Editing and output

The editing `mode` is independent of `outputFormat`: switching modes does not convert the model. Text edits commit when confirmed or blurred; invalid drafts do not replace the model, and clearing emits null. `alpha` enables opacity editing. Swatches accept colour strings or labelled objects. Recent colours can be controlled with `v-model:recentColors`; `historyKey` opts into localStorage persistence. The screen sampler is shown only when the browser supports EyeDropper.

## Integration guide

[Read the focused integration guide](/reference/color-picker-guide).

## Dependencies

- **UI:** [Button](/components/button), [Input](/components/input), [InputGroup](/components/input-group), [Popover](/components/api/popover), [Select](/components/select)
- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [class-variance-authority](https://www.npmjs.com/package/class-variance-authority), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Color Area](https://reka-ui.com/docs/components/color-area), [Reka UI Color Field](https://reka-ui.com/docs/components/color-field), [Reka UI Color Slider](https://reka-ui.com/docs/components/color-slider), [Reka UI Color Swatch](https://reka-ui.com/docs/components/color-swatch), [Reka UI Color Swatch Picker](https://reka-ui.com/docs/components/color-swatch-picker)

See the [reference](/components/color-picker/reference) for the complete component contract.
