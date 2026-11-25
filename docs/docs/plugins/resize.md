<!-- Generated from package/src/docs/plugins/resize.mdx. Edit the source guide. -->

# resize

Read element and viewport dimensions when the viewport resizes.

```vue
<template>
    <div v-resize.immediate="measure">{{ width }} px</div>
</template>

<script setup lang="ts">
import type { ResizeSize } from '@rat.md/miru/plugins';
import { ref } from 'vue';
import { vResize } from '@rat.md/miru/plugins';
const width = ref(0);
function measure(element: ResizeSize, viewport: ResizeSize) {
    width.value = element.width;
}
</script>
```

`.immediate` also runs on mount. Both callback objects have `width` and `height`. This directive listens to viewport resize; it does not observe every element size change. The listener is removed on unmount.
