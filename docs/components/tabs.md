---
title: "Tabs"
component: Tabs
componentPage: overview
---

## Preview

<ComponentExample name="Tabs" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Controlled or default tab selection.</li>
    <li>Line and button appearances with theme colours.</li>
    <li>Responsive overflow and optional preservation of inactive panels.</li>
</ul>

## Tab definitions

Give each tab a unique value and visible label. The [TabItem contract](/components/tabs/reference#tab-definitions) describes icons, badges, attention indicators and per-tab appearance.

## Selection and panel state

Bind `v-model` to store the selected tab. Without a model value, selection falls back to `defaultValue` and then the first tab. Provide content with slots such as `#overview` for a tab whose value is `overview`. Inactive panels are unmounted by default; use `:unmount-on-hide="false"` to preserve editor, upload or form state. With `:content="false"`, only the tab navigation is rendered. Supply `aria-label` to name the tab list.

## Colours

Use `variant` to choose `default`, `primary`, `secondary`, `accent`, `info`, `success`, `warning` or `danger`; Tabs uses `primary` by default. A tab’s explicit `variant` takes precedence over a non-default legacy `tone`, followed by the root variant. The same colour follows the tab through horizontal, vertical and overflow navigation, with `indicatorClass` available for a custom indicator. Colours apply to both line and button appearances; disabled tabs retain their disabled treatment.

```vue
<Tabs v-model="active" :tabs="tabs" variant="accent" />
```

## Appearance and responsive overflow

`appearance="line"` uses a divider and animated selection indicator. `appearance="buttons"` uses individual tab surfaces, with optional `bordered` outlines and an `activeIndicator` on the left. Horizontal overflow opens a popover at viewport widths of 768px and above and a drawer below that width. Desktop lists hidden tabs only; mobile lists all tabs unless `drawerShowAllTabs` is false. Vertical tabs do not collapse. With `collapseOverflow` disabled, reserve enough space for all tabs.

## Dependencies

- **UI:** [Badge](/components/badge), [Button](/components/button), [Drawer](/components/api/drawer), [Popover](/components/api/popover)
- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [class-variance-authority](https://www.npmjs.com/package/class-variance-authority), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Tabs](https://reka-ui.com/docs/components/tabs)

See the [reference](/components/tabs/reference) for the complete component contract.
