<template>
    <component :is="tag" v-bind="forwardedAttrs()" :data-miru-component="name"><slot /></component>
</template>

<script lang="ts">
import type * as MiruLibrary from '@rat.md/miru';
import type { Component } from 'vue';
import { computed, onMounted, shallowRef, useAttrs, markRaw } from 'vue';

// Share the import, but never let cache timing change the initial hydration tree.
let loadedLibrary: typeof MiruLibrary | undefined;
let libraryRequest: Promise<typeof MiruLibrary> | undefined;
</script>

<script lang="ts" setup>
defineOptions({ inheritAttrs: false });
const props = withDefaults(defineProps<{ name: string; fallback?: string }>(), {
    fallback: 'div',
});
const attrs = useAttrs();

/**
 * Resolve the native fallback element while the component loads.
 * @returns
 */
function resolveNative(): Component | undefined {
    const component = loadedLibrary?.[props.name as keyof typeof MiruLibrary];

    return component && (typeof component === 'object' || typeof component === 'function')
        ? markRaw(component as Component)
        : undefined;
}

const native = shallowRef<Component>();
// Deferred page content may hydrate after header controls have warmed the cache.
// Keep its first client render identical to SSR; upgrade only after this instance mounts.

/**
 * Filter attributes for the resolved native fallback element.
 * @returns
 */
function forwardedAttrs() {
    if (native.value) {
        return attrs;
    }
    // Element.prefix is read-only; pass this prop only to the loaded component.
    const { prefix, ...fallbackAttrs } = attrs;

    return fallbackAttrs;
}

const tag = computed(
    () => native.value || (typeof attrs.as === 'string' ? attrs.as : props.fallback),
);
onMounted(async () => {
    if (native.value) {
        return;
    }
    loadedLibrary = await (libraryRequest ??= import('@rat.md/miru'));
    native.value = resolveNative();
});
</script>
