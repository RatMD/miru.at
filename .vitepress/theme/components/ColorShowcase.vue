<template>
    <section class="spectrum-section" aria-labelledby="spectrum-title">
        <div class="section-topline">
            <div>
                <span class="eyebrow">
                    GIVE miru.
                    <span class="eyebrow-underline">
                        YOUR
                        <svg viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
                            <path
                                d="M2 7Q50 1 98 6"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1"
                                stroke-linecap="round"
                                vector-effect="non-scaling-stroke" />
                        </svg>
                    </span>
                    COLOURS
                    <span class="eyebrow-dot">.</span>
                </span>
                <h2 id="spectrum-title">
                    A whole spectrum.
                    <br />
                    <span>One signature.</span>
                </h2>
            </div>
            <p>
                Seven base colours, one whole interface.
                <br />
                Change the palette and watch the entire site follow.
            </p>
        </div>
        <div class="spectrum-stage">
            <div class="spectrum-header">
                <Badge variant="outline">
                    <span class="spectrum-live-dot" />
                    LIVE COMPONENTS
                </Badge>
                <span>{{ schemeName }}</span>
                <div class="spectrum-toolbar">
                    <Button
                        variant="outline"
                        size="sm"
                        :loading="loading.appearance"
                        :aria-label="isDark ? 'Turn on the Light' : 'Switch to Darkness'"
                        @click="run('appearance', toggleAppearance)">
                        <Icon :name="isDark ? 'sun' : 'moon'" :size="15" />
                        {{ isDark ? 'Turn on the Light' : 'Switch to Darkness' }}
                    </Button>
                    <Button
                        variant="accent"
                        size="sm"
                        :loading="loading.palette"
                        @click="run('palette', () => (colorPanelOpen = true))">
                        <Icon name="adjust" :size="15" />
                        Adapt the palette
                    </Button>
                </div>
            </div>
            <div class="spectrum-ribbon" aria-hidden="true">
                <div
                    v-for="role in roles"
                    :key="role"
                    :style="{ '--ribbon-color': `var(--ui-${role}-600)` }">
                    <span>{{ role }}</span>
                </div>
            </div>
            <div class="spectrum-grid">
                <div v-for="variant in variants" :key="variant" class="spectrum-cell">
                    <span class="spectrum-variant">{{ variant }}</span>
                    <SpectrumButtonDemo
                        :variant="variant"
                        @busy="setDemoBusy(variant, $event)"
                        @feedback="demoFeedback">
                        <Button
                            :variant="variant"
                            :loading="
                                variant === 'ghost'
                                    ? busyDemos.has(variant)
                                    : loading[`variant:${variant}`]
                            "
                            loading-position="end"
                            @click="clickVariant(variant)">
                            {{ variant.charAt(0).toUpperCase() + variant.slice(1) }}
                            <Icon name="plus" :size="14" />
                        </Button>
                    </SpectrumButtonDemo>
                    <Badge :variant="variant">{{ variant }}</Badge>
                </div>
            </div>
            <div class="spectrum-footer">
                <span>Try a different mood</span>
                <div class="spectrum-moods">
                    <button
                        v-for="preset in presets"
                        :key="preset.id"
                        :aria-label="`Use ${preset.name} palette`"
                        :title="preset.name"
                        :aria-pressed="profile.preset === preset.id"
                        :style="{
                            '--mood': preset.colors[0],
                            '--mood-secondary': preset.colors[1],
                        }"
                        @click="selectPreset(preset.id)" />
                </div>
                <span class="spectrum-note">You will learn Miru with each button.</span>
            </div>
        </div>
        <Toast
            :id="toasterId"
            position="bottom-right"
            :theme="isDark ? 'dark' : 'light'"
            :appearance="isDark ? 'graphite' : 'frost'" />
        <SpectrumCelebration v-model="celebrate" />
    </section>
</template>
<script setup lang="ts">
import { Button, Badge, buttonColorVariants, Toast, toast } from '@rat.md/miru';
import { ref, reactive, watch, onUnmounted, useId } from 'vue';
import { useAppearance } from '../colors/appearance';
import { roles, presets } from '../colors/engine';
import { profile, schemeName, colorPanelOpen, selectPreset } from '../colors/store';
import Icon from './Icon.vue';
import SpectrumButtonDemo from './SpectrumButtonDemo.vue';
import SpectrumCelebration from './SpectrumCelebration.vue';
const { isDark, toggleAppearance } = useAppearance();
const variants = buttonColorVariants;
const loading = reactive<Record<string, boolean>>({});
const loadingTimers = new Set<ReturnType<typeof setTimeout>>();
const toasterId = `spectrum-${useId()}`;
const visited = reactive(new Set<string>());
const busyDemos = reactive(new Set<string>());
const celebrate = ref(false);
let celebrated = false;
let celebrationTimer: ReturnType<typeof setTimeout> | undefined;
function setDemoBusy(variant: string, busy: boolean) {
    if (busy) busyDemos.add(variant);
    else busyDemos.delete(variant);
}
function demoFeedback(title: string, description: string) {
    toast.info(title, { toasterId, description });
}
watch(
    () => variants.every((variant) => visited.has(variant)) && busyDemos.size === 0,
    (ready) => {
        clearTimeout(celebrationTimer);
        if (ready && !celebrated)
            celebrationTimer = setTimeout(() => {
                celebrated = true;
                Object.keys(messages).forEach((variant) =>
                    toast.dismiss(`${toasterId}-${variant}`),
                );
                celebrate.value = true;
            }, 850);
    },
);
watch(celebrate, (open, wasOpen) => {
    if (!open && wasOpen) {
        visited.clear();
        celebrated = false;
    }
});
const messages = {
    info: {
        type: 'info',
        title: "Now you're in the know.",
        description: 'One click closer to your next big idea. Curiosity looks good on you.',
    },
    success: {
        type: 'success',
        title: 'You clicked the right button.',
        description: "A tiny click. A big success. We'll call that progress.",
    },
    warning: {
        type: 'warning',
        title: 'Proceed with creativity.',
        description: 'Side effects may include an irresistible urge to build something.',
    },
    danger: {
        type: 'error',
        title: 'Dangerously good choice.',
        description: 'Nothing exploded. Just a little drama for your interface.',
    },
} as const;
function clickVariant(variant: (typeof buttonColorVariants)[number]) {
    run(`variant:${variant}`, () => {
        visited.add(variant);
        if (!(variant in messages)) return;
        const message = messages[variant as keyof typeof messages];
        toast[message.type](message.title, {
            id: `${toasterId}-${variant}`,
            toasterId,
            description: message.description,
            duration: 4500,
        });
    });
}
function run(key: string, action: () => void) {
    if (loading[key]) return;
    loading[key] = true;
    const timer = setTimeout(() => {
        delete loading[key];
        loadingTimers.delete(timer);
    }, 650);
    loadingTimers.add(timer);
    action();
}
onUnmounted(() => {
    clearTimeout(celebrationTimer);
    loadingTimers.forEach(clearTimeout);
    Object.keys(messages).forEach((variant) => toast.dismiss(`${toasterId}-${variant}`));
});
</script>
