<template><Panel v-model:open="visible" /></template>
<script setup lang="ts">
import { defineClientComponent } from 'vitepress';
import { onMounted, onUnmounted, ref } from 'vue';
const Panel = defineClientComponent(() => import('./SearchPanel.vue'));
const visible = ref(false);
function open() {
    visible.value = true;
}
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
