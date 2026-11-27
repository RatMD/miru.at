<template>
    <div class="gallery-live-preview" @click.capture="preventPlaceholderNavigation">
        <p v-if="error" class="gallery-preview-error" role="status">
            Preview unavailable.
            <a :href="playground">Try it in the playground ↗</a>
        </p>
        <component :is="component" v-else-if="component" />
    </div>
</template>

<script lang="ts" setup>
import type { Component } from 'vue';
import * as Miru from '@rat.md/miru';
import * as Composables from '@rat.md/miru/composables';
import * as Layouts from '@rat.md/miru/layouts';
import * as Support from '@rat.md/miru/support';
import {
    IconBell,
    IconMail,
    IconPackage,
    IconTruck,
    IconCheck,
    IconLetterCaseUpper,
    IconBrackets,
    IconRefresh,
    IconHome,
    IconArrowLeft,
    IconPlus,
    IconSearch,
} from '@tabler/icons-vue';
import * as Vue from 'vue';
import { markRaw, onErrorCaptured, onUnmounted, ref, shallowRef, watch } from 'vue';
import * as Zod from 'zod';
import { compileExample } from '../playground/compiler';

const props = defineProps<{ source: string; scope: string; playground: string }>();
const component = shallowRef<Component>();
const error = ref(false);
const modules: Record<string, unknown> = {
    vue: Vue,
    '@rat.md/miru': { ...Miru, ...Layouts, IconBell, IconMail },
    '@rat.md/miru/layouts': Layouts,
    '@rat.md/miru/composables': Composables,
    '@rat.md/miru/support': Support,
    '@tabler/icons-vue': {
        IconBell,
        IconMail,
        IconPackage,
        IconTruck,
        IconCheck,
        IconLetterCaseUpper,
        IconBrackets,
        IconRefresh,
        IconHome,
        IconArrowLeft,
        IconPlus,
        IconSearch,
    },
    zod: Zod,
};
let style: HTMLStyleElement | undefined;
watch(
    () => props.source,
    (source) => {
        error.value = false;
        try {
            const result = compileExample(
                source,
                (name) => {
                    if (!(name in modules)) {
                        throw new Error(`Unsupported module: ${name}`);
                    }

                    return modules[name];
                },
                props.scope,
            );
            style ??= document.createElement('style');
            style.dataset.galleryPreview = props.scope;
            style.textContent = result.styles;
            if (!style.isConnected) {
                document.head.append(style);
            }
            component.value = markRaw(result.component);
        } catch {
            error.value = true;
        }
    },
    { immediate: true },
);
onErrorCaptured(() => {
    error.value = true;

    return false;
});

/**
 * Keep placeholder example links inside the current preview.
 * @param event
 */
function preventPlaceholderNavigation(event: MouseEvent) {
    if ((event.target as Element).closest?.('a')?.getAttribute('href')?.startsWith('#')) {
        event.preventDefault();
    }
}

onUnmounted(() => style?.remove());
</script>

<style scoped>
.gallery-live-preview {
    width: 100%;
    min-width: 0;
    display: grid;
    justify-items: center;
    gap: 16px;
}
.gallery-live-preview :deep(> *) {
    max-width: 100%;
    min-width: 0;
}
.gallery-live-preview :deep(> .row) {
    justify-content: center;
}
.gallery-preview-error {
    font-size: 12px;
    color: var(--site-muted);
}
.gallery-preview-error a {
    text-decoration: underline;
}
</style>
