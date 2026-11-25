---
title: 'ContextProvider'
component: ContextProvider
componentPage: overview
---

## Usage

ContextProvider supplies locale and translation context without adding a DOM element. Mount it around a component subtree when its language settings should differ from the application defaults. Use [PageRoot](/layouts/page-root) for the persistent application wrapper and notification host.

```vue
<template>
    <ContextProvider locale="en-GB">
        <Calendar />
    </ContextProvider>
</template>

<script setup lang="ts">
import { Calendar, ContextProvider } from '@rat.md/miru';
</script>
```

## Translation context

The `translate` and `translateChoice` props accept the same callbacks as Miru’s i18n plugin. Locale and translator props are reactive. Omitted values use the surrounding context or application configuration; a provider can therefore override only the locale while retaining the application’s translations.

ContextProvider does not mount notifications or install plugins. See the [Forms introduction](/docs/forms/introduction) for form controllers and validation.

## Dependencies

- **Packages:** [reka-ui](https://www.npmjs.com/package/reka-ui), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Config Provider](https://reka-ui.com/docs/utilities/config-provider)

See the [reference](/components/context-provider/reference) for the complete component contract.
