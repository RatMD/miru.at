<template>
    <component v-if="ui" :is="ui.TooltipProvider" :delay-duration="delayDuration">
        <component :is="ui.Tooltip">
            <component :is="ui.TooltipTrigger" as-child><slot /></component>
            <component :is="ui.TooltipContent" :side="side" :side-offset="8">{{ text }}</component>
        </component>
    </component>
    <slot v-else />
</template>

<script lang="ts" setup>
import type { Component } from 'vue';
import { onMounted, shallowRef } from 'vue';

withDefaults(
    defineProps<{
        text: string;
        side?: 'top' | 'right' | 'bottom' | 'left';
        delayDuration?: number;
    }>(),
    {
        side: 'bottom',
        delayDuration: 200,
    },
);
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
