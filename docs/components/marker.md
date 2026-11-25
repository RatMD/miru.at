---
title: "Marker"
component: Marker
componentPage: overview
---

## Preview

<ComponentExample name="Marker" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Theme colours for small metadata labels.</li>
    <li>Composable icons, content and secondary metadata.</li>
    <li>Inline grouping for contextual information.</li>
</ul>

## Activity entries and metadata

Compose MarkerIcon, MarkerContent and MarkerMeta within Marker. MarkerIcon is decorative, so include meaningful information in the entry text. MarkerMeta uses German date formatting for locales beginning with `de` and English formatting otherwise; `format` overrides the display format. The date remains a native `time` element with an ISO timestamp. Timeline connectors and list semantics are supplied by the application. These building blocks expose no component-specific events or model bindings.

## Dependencies

- **Packages:** [clsx](https://www.npmjs.com/package/clsx), [dayjs](https://www.npmjs.com/package/dayjs), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/marker/reference) for the complete component contract.
