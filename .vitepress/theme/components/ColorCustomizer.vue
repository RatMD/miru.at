<template>
    <Popover v-model:open="colorPanelOpen">
        <PopoverTrigger
            as-child
            tooltip="Change your colours"
            tooltip-side="bottom"
            :tooltip-delay-duration="200">
            <ButtonAction
                variant="default"
                borderless="yes"
                size="default"
                aria-label="Customize colors"
                class="color-adapt-trigger">
                <Icon name="adjust" />
            </ButtonAction>
        </PopoverTrigger>
        <PopoverContent
            align="end"
            :align-offset="-16"
            :collision-padding="12"
            :side-offset="12"
            class="color-customizer"
            aria-label="Customize colors">
            <div class="color-panel-heading">
                <div>
                    <span class="eyebrow">THE miru. PALETTE</span>
                    <h2>Make it your own.</h2>
                </div>
                <ButtonAction
                    variant="default"
                    borderless="yes"
                    size="sm"
                    title="Close color settings"
                    @click="colorPanelOpen = false">
                    <Icon name="close" />
                </ButtonAction>
            </div>
            <ScrollArea
                class="color-panel-scroll"
                type="auto"
                orientation="vertical"
                viewport-class="color-panel-viewport">
                <div class="color-panel-body">
                    <p>
                        Pick a signature. Fine-tune seven base colors. Every shade and surface
                        follows live.
                    </p>
                    <div class="color-presets" aria-label="Color presets">
                        <Button
                            v-for="preset in presets"
                            :key="preset.id"
                            variant="outline"
                            class="color-preset"
                            :aria-pressed="profile.preset === preset.id"
                            @click="selectPreset(preset.id)">
                            <span class="preset-swatches">
                                <i
                                    v-for="(color, index) in preset.colors"
                                    :key="index"
                                    :style="{ background: color }" />
                            </span>
                            <span>
                                {{ preset.name }}
                                <Icon v-if="profile.preset === preset.id" name="check" :size="13" />
                            </span>
                        </Button>
                    </div>
                    <div class="color-fields">
                        <div v-for="role in roles" :key="role" class="color-field">
                            <Label :for="`color-${role}`">{{ role }}</Label>
                            <ColorPicker
                                :id="`color-${role}`"
                                :model-value="drafts[role]"
                                :ariaLabel="`Choose ${role} color`"
                                size="sm"
                                :invalid="invalid === role"
                                @update:model-value="updateColor(role, $event)"
                                @blur="validate(role, drafts[role])" />
                        </div>
                    </div>
                    <div class="surface-setting">
                        <div class="color-field">
                            <Label for="color-surface">Surface tint</Label>
                            <ColorPicker
                                id="color-surface"
                                :model-value="surfaceDraft"
                                ariaLabel="Choose surface tint"
                                size="sm"
                                :invalid="invalid === 'surface'"
                                @update:model-value="updateSurface"
                                @blur="validate('surface', surfaceDraft)" />
                        </div>
                        <div class="surface-caption">
                            <span>
                                {{
                                    profile.surface
                                        ? 'Your tint, in light and dark.'
                                        : profile.preset === 'original'
                                          ? 'Package neutral palette.'
                                          : 'Automatically follows Accent.'
                                }}
                            </span>
                            <Button
                                variant="ghost"
                                size="xs"
                                :disabled="!profile.surface"
                                @click="setSurface(null)">
                                Auto
                            </Button>
                        </div>
                    </div>
                    <p v-if="invalid" role="alert" class="color-error">
                        Enter a six-digit hex color, for example #745ddb.
                    </p>
                </div>
            </ScrollArea>
            <div class="color-panel-footer">
                <span aria-live="polite">
                    {{ schemeName }}
                    <small>Saved in this browser</small>
                </span>
                <Button variant="outline" size="sm" @click="selectPreset('miru')">Reset</Button>
            </div>
            <PopoverArrow :width="20" :height="10" />
        </PopoverContent>
    </Popover>
</template>
<script setup lang="ts">
import type { Role } from '../colors/engine';
import {
    Button,
    ButtonAction,
    ColorPicker,
    Label,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    ScrollArea,
} from '@rat.md/miru';
import { ref, watch } from 'vue';
import { roles, presets, surfaceBase, normalizeHex } from '../colors/engine';
import {
    profile,
    schemeName,
    colorPanelOpen,
    selectPreset,
    setColor,
    setSurface,
} from '../colors/store';
import Icon from './Icon.vue';
const drafts = ref({ ...profile.value.colors });
const surfaceDraft = ref(surfaceBase(profile.value));
const invalid = ref<string | null>(null);
watch(profile, (value) => {
    // Preserve a valid short draft while its canonical value is applied to the theme.
    // Replacing it at three digits would interrupt typing a six-digit color.
    for (const role of roles) {
        if (normalizeHex(drafts.value[role]) !== value.colors[role]) {
            drafts.value[role] = value.colors[role];
        }
    }
    const surface = surfaceBase(value);
    if (normalizeHex(surfaceDraft.value) !== surface) surfaceDraft.value = surface;
    if (invalid.value) {
        const draft =
            invalid.value === 'surface' ? surfaceDraft.value : drafts.value[invalid.value as Role];
        if (normalizeHex(draft)) invalid.value = null;
    }
});
function updateColor(role: Role, value: string | null) {
    drafts.value[role] = value || '';
    if (normalizeHex(value)) {
        setColor(role, value!);
        invalid.value = null;
    }
}
function updateSurface(value: string | null) {
    surfaceDraft.value = value || '';
    if (normalizeHex(value)) {
        setSurface(value);
        invalid.value = null;
    }
}
function validate(name: string, value: string) {
    invalid.value = normalizeHex(value) ? null : name;
}
</script>
