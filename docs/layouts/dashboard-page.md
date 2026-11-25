---
title: 'DashboardPage'
component: DashboardPage
componentPage: overview
---

## Preview

<ComponentExample name="DashboardPage" />

## Usage

DashboardPage provides a sidebar, page header and content regions. Supply navigation groups and the current page; the application owns routing, permissions, data fetching and persisted preferences.

```vue
<DashboardPage
    v-model:collapsed="sidebarCollapsed"
    v-model:mobile-open="mobileMenuOpen"
    :navigation="groups"
    :breadcrumbs="breadcrumbs">
    <template #brand="{ collapsed }"><AppLogo :compact="collapsed" /></template>
    <template #actions><ProfileMenu /></template>
    <RouterView />
</DashboardPage>
```

## Navigation

Navigation groups contain items with labels, optional icons, links, children and active state. Bind `collapsed` to control the desktop icon rail; `mobileOpen` controls the mobile sheet independently. The `navigate` event lets the application react to item activation.

Supply an href-compatible `linkComponent` when native anchors are unsuitable. Wrap Vue Router links in a small adapter that maps `href` to `to`. The application determines active state and filters items according to permissions. The `navigation` slot replaces the standard menu and receives `collapsed` and `closeMobile`. Set `sidebar=false` to retain the page shell without navigation controls.

## Surfaces and scrolling

`sidebarTone` selects a surface, muted or dark sidebar. `surface` selects inset or flush content. Set `sidebarWidth`, `railWidth`, `padding` and `contentWidth` to fit the application.

`scroll="content"` uses a bounded viewport with independently scrolling navigation and content. `scroll="page"` uses normal document scrolling. `stickyHeader` keeps the header visible, and `scrollRegion` marks the actual native scroll container for integrations such as Inertia.

## Page regions

Use `header` and `breadcrumbs` to replace the default heading area, `toolbar` for additional controls and `banner` for page-wide notices. The `footer`, `app-bar` and `overlays` slots keep supporting UI outside the main page content. Mount [PageRoot](/layouts/page-root) above the dashboard for persistent notifications.

## Dependencies

- **UI:** [Breadcrumb](/components/breadcrumb), [BreadcrumbItem](/components/breadcrumb/reference#breadcrumb-item), [BreadcrumbLink](/components/breadcrumb/reference#breadcrumb-link), [BreadcrumbList](/components/breadcrumb/reference#breadcrumb-list), [BreadcrumbPage](/components/breadcrumb/reference#breadcrumb-page), [BreadcrumbSeparator](/components/breadcrumb/reference#breadcrumb-separator), [ButtonAction](/components/button-action), [Collapsible](/components/collapsible), [CollapsibleContent](/components/collapsible/reference#collapsible-content), [CollapsibleTrigger](/components/collapsible/reference#collapsible-trigger), [Popover](/components/popover), [PopoverContent](/components/popover/reference#popover-content), [PopoverTrigger](/components/popover/reference#popover-trigger), [Sheet](/components/sheet), [SheetContent](/components/sheet/reference#sheet-content), [SheetDescription](/components/sheet/reference#sheet-description), [SheetHeader](/components/sheet/reference#sheet-header), [SheetTitle](/components/sheet/reference#sheet-title)
- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [clsx](https://www.npmjs.com/package/clsx), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)

See the [reference](/layouts/dashboard-page/reference) for the complete component contract.
