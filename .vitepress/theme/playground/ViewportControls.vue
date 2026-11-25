<template>
    <div class="studio-controls">
        <div class="devices" role="group" :aria-label="`${label} device`">
            <SiteTooltip v-for="item in devices" :key="item.id" :text="item.label">
                <Button
                    variant="ghost"
                    size="sm"
                    icon-only
                    :aria-label="`${label}: ${item.label}`"
                    :aria-pressed="device === item.id"
                    :class="{ selected: device === item.id }"
                    @click="$emit('device', item.id)">
                    <component :is="item.icon" :size="15" />
                </Button>
            </SiteTooltip>
            <SiteTooltip :text="landscape ? 'Switch to portrait' : 'Switch to landscape'">
                <Button
                    variant="ghost"
                    size="sm"
                    icon-only
                    :aria-label="`${label}: ${landscape ? 'Switch to portrait' : 'Switch to landscape'}`"
                    :aria-pressed="landscape"
                    @click="$emit('rotate')">
                    <IconRotateClockwise :size="15" />
                </Button>
            </SiteTooltip>
        </div>
        <div class="range">
            <Slider
                :model-value="[width]"
                :min="320"
                :max="1920"
                :step="1"
                size="sm"
                :label="`${label} width`"
                @update:model-value="$emit('width', $event?.[0] || 320)" />
            <output>{{ width }}</output>
        </div>
        <div class="appearance">
            <SiteTooltip :text="`Background: ${background || 'canvas'} · click to switch`">
                <Button
                    variant="ghost"
                    size="sm"
                    icon-only
                    :aria-label="`${label}: Change background`"
                    @click="cycleBackground">
                    <IconBackground :size="16" />
                </Button>
            </SiteTooltip>
            <SiteTooltip :text="dark ? 'Switch to light mode' : 'Switch to dark mode'">
                <Button
                    variant="ghost"
                    size="sm"
                    icon-only
                    :aria-label="`${label}: ${dark ? 'Switch to light mode' : 'Switch to dark mode'}`"
                    @click="$emit('dark', !dark)">
                    <IconSun v-if="dark" :size="15" />
                    <IconMoon v-else :size="15" />
                </Button>
            </SiteTooltip>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Button, Slider } from '@rat.md/miru';
import {
    IconBackground,
    IconDeviceDesktop,
    IconDeviceMobile,
    IconDeviceTablet,
    IconMoon,
    IconRotateClockwise,
    IconSun,
} from '@tabler/icons-vue';
import SiteTooltip from '../components/SiteTooltip.vue';
const props = defineProps<{
    label: string;
    device: string;
    landscape: boolean;
    width: number;
    dark: boolean;
    background?: string;
}>();
const emit = defineEmits<{
    device: [value: string];
    rotate: [];
    width: [value: number];
    dark: [value: boolean];
    background: [value: string];
}>();
function cycleBackground() {
    const backgrounds = ['canvas', 'light', 'dark', 'checker'];
    emit(
        'background',
        backgrounds[(backgrounds.indexOf(props.background || 'canvas') + 1) % backgrounds.length]!,
    );
}
const devices = [
    { id: 'mobile', label: 'Mobile', icon: IconDeviceMobile },
    { id: 'tablet', label: 'Tablet', icon: IconDeviceTablet },
    { id: 'desktop', label: 'Desktop', icon: IconDeviceDesktop },
];
</script>
<style scoped>
.studio-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    min-width: 0;
    width: 100%;
}
.devices,
.appearance {
    display: flex;
    align-items: center;
    gap: 2px;
    flex: none;
}
[data-slot='button'] {
    width: 28px;
    height: 28px;
    color: var(--ui-muted-foreground);
}
[data-slot='button']:hover,
.selected {
    color: var(--ui-foreground);
    background: var(--ui-ghostly);
}
.range {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    flex: 1;
    min-width: 74px;
    max-width: 240px;
}
.range [data-slot='slider'] {
    min-width: 36px;
    max-width: 160px;
}
.range output {
    font: 9px var(--ui-font-mono, monospace);
    color: var(--ui-muted-foreground);
    min-width: 27px;
    text-align: right;
}
</style>
