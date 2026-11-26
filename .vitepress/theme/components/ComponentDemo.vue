<template>
    <div v-if="kind === 'showcase'" class="embedded-showcase"><Showcase /></div>
    <ComponentExample v-else :name="name" />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import ComponentExample from './ComponentExample.vue';
import Showcase from './Showcase.vue';

const props = withDefaults(defineProps<{ kind?: string }>(), {
    kind: 'button',
});
const name = computed(() =>
    props.kind === 'input' ? 'Input' : props.kind === 'selection' ? 'Switch' : 'Button',
);
</script>
