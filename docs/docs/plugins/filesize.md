<!-- Generated from package/src/docs/plugins/filesize.mdx. Edit the source guide. -->

# filesize

Format bytes using binary or metric units.

```vue
<template>
    <span v-filesize="bytes" />
    <span v-filesize:2.metric="bytes" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { vFilesize } from '@rat.md/miru/plugins';
const bytes = ref(1536);
</script>
```

Default: binary units and one decimal (`1.5 KiB`). `.metric` uses powers of 1000; the argument sets precision (0–20). Invalid/empty values render empty text. `vFileSize` / `v-file-size` is an alias. Attachment registers it locally.
