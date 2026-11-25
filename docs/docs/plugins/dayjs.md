<!-- Generated from package/src/docs/plugins/dayjs.mdx. Edit the source guide. -->

# dayjs

Format a date as element text.

```vue
<template><span v-dayjs="date">DD MMMM YYYY</span></template>

<script setup lang="ts">
import { ref } from 'vue';
import { vDayjs } from '@rat.md/miru/plugins';
const date = ref('2026-12-01T09:30:00');
</script>
```

Use a directive argument or `data-dayjs-format` for an explicit format. Empty/invalid values render empty text; timestamp zero is valid. Formatting uses the app locale and replaces text content. For pure formatting, use `dayjs` from `@rat.md/miru/support`.
