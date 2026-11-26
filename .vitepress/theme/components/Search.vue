<template><Panel v-model:open="visible" /></template>

<script lang="ts" setup>
import { defineClientComponent } from 'vitepress';
import { onMounted, onUnmounted, ref } from 'vue';

const Panel = defineClientComponent(() => import('./SearchPanel.vue'));
const visible = ref(false);

/**
 * Open the documentation search panel.
 */
function open() {
    visible.value = true;
}

/**
 * Handle the documentation search keyboard shortcut.
 * @param event
 */
function keydown(event: KeyboardEvent) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        visible.value = !visible.value;
    }
}

onMounted(() => window.addEventListener('keydown', keydown));
onUnmounted(() => window.removeEventListener('keydown', keydown));
defineExpose({ open });
</script>
