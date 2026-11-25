---
title: "Toast"
component: Toast
componentPage: overview
---

## Preview

<ComponentExample name="Toast" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Native Reka UI notifications with named hosts and queued messages.</li>
    <li>Status colours, promise feedback, actions and swipe dismissal.</li>
</ul>

## Notification host

Mount one Toast host in a persistent application layout, then create messages through the exported `toast` API or [useToast](/docs/composables/useToast). `Toaster` is an alias of the same component. Each named host uses its own Reka UI toast manager; match the host `id` with the `toasterId` notification option.

`appearance` selects flat, frost or graphite surfaces; `richColors` adds semantic status colours. `inline` renders an expanded stack in the page flow and uses a visible limit of 100. Set shared notification options through `toastOptions`, replace status and close icon slots, or configure swipe dismissal with `swipeDirection`, `swipeThreshold` and `disableSwipe`.

## Integration guide

[Read the focused integration guide](/components/toast).

## Sending notifications

```vue
<script setup lang="ts">
import { Toast, toast } from '@rat.md/miru';

function notify() {
    toast.success('Changes saved', { description: 'Your settings are up to date.' });
}
</script>

<template>
    <button type="button" @click="notify">Save settings</button>
    <Toast position="bottom-right" />
</template>
```

Use `toast.loading('Saving…', { duration: Infinity })` for a persistent pending message. Update it with `toast.update(id, { title: 'Saved', type: 'success' })`, or dismiss it with `toast.dismiss(id)`. `toast.promise(task, { loading, success, error })` follows an asynchronous operation and returns a promise handle with `id` and `unwrap()`. Supply `action` or `cancel` options for labelled actions; set `closeOnClick: false` or prevent the click default to keep a notification open.

## Dependencies

- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Toast](https://reka-ui.com/docs/components/toast)

See the [reference](/components/toast/reference) for the complete component contract.
