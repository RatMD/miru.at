---
title: 'AppBar'
component: FloatingAppBar
componentPage: overview
---

## Preview

<ComponentExample name="FloatingAppBar" />

## Usage

Import `FloatingAppBar` from `@rat.md/miru`. The AppBar documentation title refers to this export. Supply labelled actions through its slots; the application owns routes, permissions and action behaviour.

```vue
<FloatingAppBar label="Workspace actions">
    <template #left>
        <Button variant="ghost" @click="goHome">Home</Button>
    </template>
    <template #primary>
        <Button @click="createRecord">Create</Button>
    </template>
    <template #right>
        <Button variant="ghost" @click="openProfile">Profile</Button>
    </template>
</FloatingAppBar>
```

## Position and appearance

The default bar is fixed, horizontal and circular, with five action positions. Choose `variant="three"` or `variant="primary"` for fewer positions. Use `fixed=false` for an embedded bar; use `orientation="auto"` to follow viewport orientation.

Reserve space outside scrolling content for a fixed bar. The `--ui-floating-app-bar-clearance` token defaults to `7rem`; include the device safe-area inset below horizontal bars and reserve right-hand space for vertical bars.

`shape="rounded-hexagon"` changes the geometry, while `appearance="gradient"` and `gradientTone` control gradient colour. `bordered=false` removes panel borders. Auxiliary slots accept supplementary actions; `auxiliaryPosition` places them beside the bar or at the screen edge.

## Transitions

`animated` controls layout transitions. Change `transitionKey` when the action set changes to animate the replacement. The [useFloatingAppBar](/docs/composables/useFloatingAppBar) composable can coordinate shared action state across pages.

## Dependencies

- **Packages:** [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [vue](https://www.npmjs.com/package/vue)

See the [reference](/layouts/app-bar/reference) for the complete component contract.
