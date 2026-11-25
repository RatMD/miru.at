---
title: "Tabs reference"
component: Tabs
componentPage: reference
---

Props, events, slots and models for Tabs. Types and declared defaults follow the package; native attributes also apply to the rendered element.

## Tabs {#tabs}

Switch between related content panels using line or button-style tabs, with theme colours, icons and badges. Horizontal tabs adapt to limited space with a desktop popover or mobile drawer.

### Props {#tabs-props}

<ComponentApi name="Tabs" section="props" />

### Events {#tabs-emitted-events}

<ComponentApi name="Tabs" section="events" />

### Slots {#tabs-slots}

<ComponentApi name="Tabs" section="slots" />

### Models {#tabs-models}

<ComponentApi name="Tabs" section="models" />

## Tab definitions

Each TabItem describes one tab. Use unique `value` strings and supply a matching named slot for its panel.

| Field | Description |
| --- | --- |
| `attention` | Accessible text for an attention dot. |
| `attentionPosition` | Place the dot beside the label or over the icon; falls back to the label without an icon. |
| `badge` | A numeric badge; zero is displayed too. |
| `class` | Additional CSS classes for this tab’s control. |
| `disabled` | Prevent selection of this tab. |
| `icon` | A decorative Vue icon component. |
| `indicatorClass` | CSS classes for the selected tab’s line or left-hand marker. |
| `label` | The visible tab label. |
| `separatorBefore` | Add a visual separator before a horizontal tab. |
| `tone` | Legacy colour override for default, warning, success or danger. |
| `value` | The unique selection value and panel slot name. |
| `variant` | Override the root colour for this tab; takes precedence over tone. |
