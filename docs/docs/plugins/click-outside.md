<!-- Generated from package/src/docs/plugins/click-outside.mdx. Edit the source guide. -->

# click-outside

Run a handler when a click happens outside an element.

```vue
<template>
    <div v-if="open" v-click-outside="close">Click outside to close.</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { vClickOutside } from '@rat.md/miru/plugins';
const open = ref(true);
const close = () => {
    open.value = false;
};
</script>
```

Clicks inside, including composed event paths, do not trigger the handler. Listeners are removed on unmount. No global registration is needed for this local import.
