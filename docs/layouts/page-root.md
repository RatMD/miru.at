---
title: 'PageRoot'
component: PageRoot
componentPage: overview
---

## Preview

<ComponentExample name="PageRoot" />

## Usage

Mount PageRoot once above changing page layouts. It shares locale context and mounts the native [Toast](/components/toast) host, so navigation between layouts does not remove active notifications. It adds no visual page surface.

```vue
<template>
    <PageRoot>
        <RouterView />
    </PageRoot>
</template>

<script setup lang="ts">
import { PageRoot } from '@rat.md/miru';
</script>
```

## Application installation

`createMiru` provides application settings. Its `wrap` helper renders PageRoot around the supplied root component; use this helper or the explicit component above once per application.

```ts
import { createApp } from 'vue';
import { createMiru } from '@rat.md/miru';
import App from './App.vue';
import '@rat.md/miru/style.css';

const miru = createMiru({ locale: 'en-GB' });
createApp({ render: () => miru.wrap(App) })
    .use(miru)
    .mount('#app');
```

## Notifications

Configure the notification host through `createMiru({ toast: { /* Toast props */ } })`. Set `toast: false` to disable both this host and page-notification processing. Installing the plugin with `app.use` alone does not mount a host.

A reactive `pageToasts` array, ref or getter can connect server-provided notifications. PageRoot owns the watcher, deduplication and teardown. Keep it persistent, and capture application composables such as Inertia’s `usePage()` inside setup before passing their values onwards.

## Dependencies

- **UI:** [ContextProvider](/components/context-provider), [Toast](/components/toast)
- **Packages:** [vue](https://www.npmjs.com/package/vue)

See the [reference](/layouts/page-root/reference) for the complete component contract.
