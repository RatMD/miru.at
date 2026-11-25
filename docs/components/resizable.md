---
title: "Resizable"
component: Resizable
componentPage: overview
---

## Preview

<ComponentExample name="Resizable" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Pointer, touch and keyboard panel resizing.</li>
    <li>Collapse controls, nested groups and optional persistence.</li>
</ul>

## Panel composition

Compose ResizablePanel and ResizableHandle inside a horizontal or vertical Resizable group. The surrounding layout must provide a usable size, especially a height for vertical groups. Panel size constraints use percentages by default, or pixels with `size-unit="px"`.

```vue
<div class="h-80">
    <Resizable direction="horizontal">
        <ResizablePanel id="navigation" :default-size="30" :min-size="15" collapsible>
            Navigation
        </ResizablePanel>
        <ResizableHandle show-grip show-toggle />
        <ResizablePanel :min-size="20">Workspace</ResizablePanel>
    </Resizable>
</div>
```

`showToggle` adds a separate accessible collapse button for the preceding collapsible panel. Use `toggleTarget` to select another panel by id. A fully collapsed panel is hidden from assistive technology and made inert; `collapsedSize` can retain a small visible strip. Group `disabled` blocks resizing and toggling without disabling the panel content.

## Persistence and programmatic control

Enable `autoSaveId` only when browser persistence is wanted; use stable, distinct group ids and storage keys for separate layouts. Supply `storage` for a custom storage implementation. The group emits `layout`, panels emit resize/collapse/expand, and handles report dragging and toggle state.

Panel refs expose resize(), collapse(), expand(), getSize(), isCollapsed and isExpanded. Nest another Resizable group inside a panel for two-axis layouts.

## Dependencies

- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Splitter](https://reka-ui.com/docs/components/splitter)

See the [reference](/components/resizable/reference) for the complete component contract.
