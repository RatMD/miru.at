---
title: Selection controls
---

# Small choices. Clear feedback.

Switches for immediate preferences. Checkboxes for independent selections. Both connect to your application’s state.

## Try it out

<ComponentDemo kind="selection" />

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { Switch, Checkbox } from '@rat.md/miru';
const enabled = ref(true);
const checked = ref(false);
</script>

<template>
    <label for="updates">Product updates</label>
    <Switch id="updates" v-model="enabled" variant="success" />
    <Checkbox v-model="checked" label="Include examples" />
</template>
```

## Switch

The model is a boolean. `size` accepts `sm`, `default` and `lg`. Supported variants are `default`, `success` and `danger-success`. `trackPadding` adds track inset in pixels. Reka Switch props and model events are forwarded.

## Checkbox

Use `label` or the default slot for visible copy. `id` associates the label with the control; Miru generates one when omitted. The `indicator` slot customizes the selected marker. Reka Checkbox props and events are forwarded, including disabled and indeterminate states.

## Accessible labels

Every control needs an accessible name. Associate a visible label with standalone switches, or provide `aria-label` when a visible label would be redundant.
