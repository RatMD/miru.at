---
title: "Breadcrumb"
component: Breadcrumb
componentPage: overview
---

## Preview

<ComponentExample name="Breadcrumb" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Accessible links and a distinct current-page label.</li>
    <li>Composable items, separators and overflow indicators.</li>
    <li>Optional contextual menus for collapsed navigation.</li>
</ul>

## Composition and current page

Import `Breadcrumb` in the singular. Place BreadcrumbItem components inside BreadcrumbList and separate them with BreadcrumbSeparator. Use BreadcrumbLink for destinations and BreadcrumbPage for the current page. BreadcrumbLink accepts native link attributes such as `href`, or `asChild` with a router link. The navigation label follows the configured interface language.

## Overflow and contextual menus

BreadcrumbEllipsis is a decorative indicator; it does not open a menu or collapse items automatically. BreadcrumbMenu provides an interactive dropdown with a scrollable body. Bind `v-model` on BreadcrumbMenu to track its selected value and handle `select` for the full entry. The other breadcrumb parts expose no component-specific events or model bindings.

## Dependencies

- **UI:** [DropdownMenu](/components/dropdown-menu), [DropdownMenuArrow](/components/dropdown-menu/reference#dropdown-menu-arrow), [DropdownMenuContent](/components/dropdown-menu/reference#dropdown-menu-content), [DropdownMenuItem](/components/dropdown-menu/reference#dropdown-menu-item), [DropdownMenuTrigger](/components/dropdown-menu/reference#dropdown-menu-trigger), [ScrollArea](/components/scroll-area)
- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Primitive](https://reka-ui.com/docs/utilities/primitive)

See the [reference](/components/breadcrumb/reference) for the complete component contract.
