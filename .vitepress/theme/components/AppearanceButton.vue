<template>
    <TooltipProvider :delay-duration="200">
        <Tooltip>
            <TooltipTrigger as-child>
                <ButtonAction
                    variant="default"
                    borderless="yes"
                    class="icon-button theme-toggle"
                    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
                    @click="toggleAppearance">
                    <Icon :name="isDark ? 'sun' : 'moon'" />
                </ButtonAction>
            </TooltipTrigger>
            <TooltipContent side="bottom" :side-offset="12">
                {{ isDark ? 'Switch to light mode' : 'Switch to dark mode' }}
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
</template>
<script setup lang="ts">
import {
    ButtonAction,
    Tooltip,
    TooltipProvider,
    TooltipTrigger,
    TooltipContent,
} from '@rat.md/miru';
import { useAppearance } from '../colors/appearance';
import Icon from './Icon.vue';
const { isDark, toggleAppearance } = useAppearance();
</script>
