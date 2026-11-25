<template>
    <component :is="tag" v-bind="forwardedAttrs()" :data-miru-component="name"><slot /></component>
</template>
<script lang="ts">
import type * as MiruLibrary from '@rat.md/miru';
// Shared only after client mount. New instances can use loaded components on
// their very first render instead of flashing a fallback during another import.
let loadedLibrary: typeof MiruLibrary | undefined;
let libraryRequest: Promise<typeof MiruLibrary> | undefined;
</script>
<script setup lang="ts">
import type { Component } from 'vue';
import { computed, onMounted, shallowRef, useAttrs, markRaw } from 'vue';
defineOptions({ inheritAttrs: false });
const props = withDefaults(defineProps<{ name: string; fallback?: string }>(), {
    fallback: 'div',
});
const attrs = useAttrs();
function resolveNative(): Component | undefined {
    const component = loadedLibrary?.[props.name as keyof typeof MiruLibrary];
    return component && (typeof component === 'object' || typeof component === 'function')
        ? markRaw(component as Component)
        : undefined;
}
const native = shallowRef<Component>();
native.value = resolveNative();
function forwardedAttrs() {
    if (native.value) return attrs;
    // Element.prefix is read-only; pass this prop only to the loaded component.
    const { prefix, ...fallbackAttrs } = attrs;
    return fallbackAttrs;
}
const tag = computed(
    () => native.value || (typeof attrs.as === 'string' ? attrs.as : props.fallback),
);
onMounted(async () => {
    if (native.value) return;
    loadedLibrary = await (libraryRequest ??= import('@rat.md/miru'));
    native.value = resolveNative();
});
</script>
