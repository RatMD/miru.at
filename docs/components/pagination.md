---
title: "Pagination"
component: Pagination
componentPage: overview
---

## Preview

<ComponentExample name="Pagination" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Page navigation with accessible controls.</li>
    <li>Composable page items, ellipses and first/last actions.</li>
    <li>A page model for application-managed navigation.</li>
</ul>

## Page state and custom controls

Set `itemsPerPage` and `total` to calculate the page count. Use `v-model:page` for controlled navigation or `defaultPage` for an initial uncontrolled value. Pagination reports page changes; the application loads or filters the results. Replace the default slot to compose PaginationContent and its controls, using the exposed `page` and `pageCount`. PaginationContent supplies page and ellipsis entries through its `items` slot property. Set `isActive` on custom PaginationItem controls to match the current page.

## Modes and appearance

`full` shows numbered pages and navigation controls with labels at wider screen widths. `compact` retains the numbered pages with icon-only navigation. `navigation` shows first, previous, next and last controls; `simple` shows previous and next only. `showEdges` affects the numbered range, while `connected` joins adjacent controls and retains gaps around ellipses. Individual navigation controls can override `variant` and `compact`. Navigation controls use translated labels.

## Dependencies

- **UI:** [Button](/components/button)
- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [class-variance-authority](https://www.npmjs.com/package/class-variance-authority), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Pagination](https://reka-ui.com/docs/components/pagination)

See the [reference](/components/pagination/reference) for the complete component contract.
