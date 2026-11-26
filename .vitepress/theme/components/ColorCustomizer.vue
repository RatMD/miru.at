<template>
    <component
        v-if="mobile === !!mobileOnly"
        :is="mobile ? Drawer : Popover"
        v-model:open="colorPanelOpen"
        v-bind="mobile ? { snapPoints: [0.9] } : {}">
        <component
            :is="mobile ? DrawerTrigger : PopoverTrigger"
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
        </component>
        <component
            :is="mobile ? DrawerContent : PopoverContent"
            v-bind="
                mobile
                    ? { showClose: false, scrollable: false, maxHeight: '90dvh' }
                    : { align: 'end', alignOffset: -16, collisionPadding: 12, sideOffset: 12 }
            "
            class="color-customizer"
            aria-label="Customize colors">
            <DrawerDescription v-if="mobile" class="sr-only">
                Choose a palette or customise your interface colours.
            </DrawerDescription>
            <div class="color-panel-heading">
                <div>
                    <span class="eyebrow">THE miru. PALETTE</span>
                    <component :is="mobile ? DrawerTitle : 'h2'">Make it your own.</component>
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
            <PopoverArrow v-if="!mobile" :width="20" :height="10" />
        </component>
    </component>
</template>

<script lang="ts" setup>
import type { Role } from '../colors/engine';
import {
    Button,
    ButtonAction,
    ColorPicker,
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerTitle,
    DrawerTrigger,
    Label,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    ScrollArea,
} from '@rat.md/miru';
import { onMounted, onUnmounted, ref, watch } from 'vue';
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

defineProps<{ mobileOnly?: boolean }>();
const mobile = ref(false);
let mobileQuery: MediaQueryList | undefined;

/** Synchronise the overlay with the mobile navigation breakpoint. */
function updateMobile() {
    colorPanelOpen.value = false;
    mobile.value = mobileQuery?.matches ?? false;
}

onMounted(() => {
    mobileQuery = window.matchMedia('(max-width: 760px)');
    mobile.value = mobileQuery.matches;
    mobileQuery.addEventListener('change', updateMobile);
});
onUnmounted(() => mobileQuery?.removeEventListener('change', updateMobile));

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
    if (normalizeHex(surfaceDraft.value) !== surface) {
        surfaceDraft.value = surface;
    }
    if (invalid.value) {
        const draft =
            invalid.value === 'surface' ? surfaceDraft.value : drafts.value[invalid.value as Role];
        if (normalizeHex(draft)) {
            invalid.value = null;
        }
    }
});

/**
 * Validate and apply an edited palette color.
 * @param role
 * @param value
 */
function updateColor(role: Role, value: string | null) {
    drafts.value[role] = value || '';
    if (normalizeHex(value)) {
        setColor(role, value!);
        invalid.value = null;
    }
}

/**
 * Validate and apply an edited surface color.
 * @param value
 */
function updateSurface(value: string | null) {
    surfaceDraft.value = value || '';
    if (normalizeHex(value)) {
        setSurface(value);
        invalid.value = null;
    }
}

/**
 * Validate the current input before applying changes.
 * @param name
 * @param value
 */
function validate(name: string, value: string) {
    invalid.value = normalizeHex(value) ? null : name;
}
</script>
