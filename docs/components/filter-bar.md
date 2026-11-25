---
title: "FilterBar"
component: FilterBar
componentPage: overview
---

## Preview

<ComponentExample name="FilterBar" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Individually selectable or removable filter badges.</li>
    <li>Measured overflow with all filters accessible in a popover.</li>
</ul>

## Applied filter badges

Supply items with stable keys and labels, plus optional values and counts. Removable items emit `remove` with their key; non-removable items emit `select`. Update the source items after handling an event. The component measures available width and moves overflow into a popover rather than dropping active filters.

Use FilterBadge alone for a single filter choice. Set `selected` for its primary appearance, `removable` for a remove action and `disabled` while a query is pending. DataTable composes FilterBar for applied filters and search.

## Dependencies

- **UI:** [Badge](/components/badge), [Button](/components/button), [Popover](/components/popover)
- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [clsx](https://www.npmjs.com/package/clsx), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/filter-bar/reference) for the complete component contract.
