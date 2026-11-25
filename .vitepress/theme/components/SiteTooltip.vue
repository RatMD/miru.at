<template>
    <component v-if="ui" :is="ui.TooltipProvider" :delay-duration="200">
        <component :is="ui.Tooltip">
            <component :is="ui.TooltipTrigger" as-child><slot /></component>
            <component :is="ui.TooltipContent" :side="side" :side-offset="8">{{ text }}</component>
        </component>
    </component>
    <slot v-else />
</template>
<script setup lang="ts">
import type { Component } from 'vue';
import { onMounted, shallowRef } from 'vue';
withDefaults(defineProps<{ text: string; side?: 'top' | 'right' | 'bottom' | 'left' }>(), {
    side: 'bottom',
});
const ui =
    shallowRef<
        Record<'TooltipProvider' | 'Tooltip' | 'TooltipTrigger' | 'TooltipContent', Component>
    >();
onMounted(async () => {
    const library = await import('@rat.md/miru');
    ui.value = {
        TooltipProvider: library.TooltipProvider,
        Tooltip: library.Tooltip,
        TooltipTrigger: library.TooltipTrigger,
        TooltipContent: library.TooltipContent,
    };
});
</script>
