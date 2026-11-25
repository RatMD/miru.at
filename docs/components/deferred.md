---
title: "Deferred"
component: Deferred
componentPage: overview
---

## Preview

<ComponentExample name="Deferred" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Async loaders or Vue Suspense slot content.</li>
    <li>Delayed feedback, timeout, cancellation and retry.</li>
</ul>

## Loading and retry

Keep a stable loader reference. It may return a Vue component or an import module with a default component and receives `{ signal, attempt }`. Use the signal for cancellable application requests.

```vue
<script setup lang="ts">
import { Deferred } from '@rat.md/miru';

const loadWorkspace = () => import('./Workspace.vue');
</script>

<template>
    <Deferred :loader="loadWorkspace" :delay="150" :timeout="8000">
        <template #loading>Loading workspace…</template>
        <template #error="{ error, retry }">
            <p role="alert">{{ error.message }}</p>
            <button type="button" @click="retry">Try again</button>
        </template>
    </Deferred>
</template>
```

Retry, replacing the loader and unmounting abort the previous attempt. A stale result cannot replace newer content even if its loader ignores cancellation. Loading feedback appears after `delay` (200 ms by default); the client timeout defaults to 10 seconds, and 0 disables it. Use `componentProps` to pass props to the loaded component.

## Async slots and server rendering

Without a loader, put an async setup component or Vue async component in the default slot. Vue Suspense tracks its asynchronous descendants; synchronous children render normally. Loading slots receive attempt, and error slots receive error, retry and attempt. The component ref exposes retry(), pending and error.

SSR awaits async content through Vue’s server renderer. The client timeout is not a server request deadline; bound server requests separately. Async slot children own cancellation of their work. Deferred does not fetch arbitrary data or register global state.

## Dependencies

- **UI:** [Button](/components/button), [Spinner](/components/spinner)
- **Packages:** [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/deferred/reference) for the complete component contract.
