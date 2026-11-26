import type { Role } from './engine';
import { computed, ref } from 'vue';
import {
    presetProfile,
    presets,
    storageKey,
    surfaceBase,
    validateProfile,
    normalizeHex,
} from './engine';
import { selectedThemeCss } from './styles';

export const profile = ref(presetProfile());
export const colorPanelOpen = ref(false);
export const schemeName = computed(
    () => presets.find((item) => item.id === profile.value.preset)?.name || 'Your signature',
);
let initialized = false;
let revision = 0;

/**
 * Apply the current state to the displayed preview.
 */
function apply() {
    let style = document.getElementById('miru-color-theme');
    if (!style) {
        style = document.createElement('style');
        style.id = 'miru-color-theme';
        document.head.appendChild(style);
    }
    style.textContent = selectedThemeCss(profile.value);
    // Explicit Playground edits stay after the shared theme.
    const previewOverrides = document.querySelector('[data-miru-preview-overrides]');
    if (previewOverrides) {
        previewOverrides.before(style);
    } else {
        document.head.appendChild(style);
    }
    document.documentElement.dataset.miruColors = profile.value.preset;
    document.documentElement.dataset.miruColorRevision = String(++revision);
}

/**
 * Write the current values to their configured destination.
 */
function save() {
    apply();
    try {
        localStorage.setItem(storageKey, JSON.stringify(profile.value));
    } catch {
        /* In-memory customization still works with blocked storage. */
    }
}

/**
 * Restore the saved color scheme and install live theme updates.
 */
export function initializeColors() {
    if (initialized || typeof window === 'undefined') {
        return;
    }
    initialized = true;
    try {
        profile.value =
            validateProfile(JSON.parse(localStorage.getItem(storageKey) || 'null')) ||
            presetProfile();
        if (profile.value.preset === 'original') {
            profile.value = presetProfile('original');
        }
    } catch {
        profile.value = presetProfile();
    }
    apply();
    window.addEventListener('storage', (event) => {
        if (event.key === storageKey || event.key === null) {
            try {
                profile.value =
                    validateProfile(JSON.parse(event.newValue || 'null')) || presetProfile();
                if (profile.value.preset === 'original') {
                    profile.value = presetProfile('original');
                }
                apply();
            } catch {
                /* Ignore invalid external storage. */
            }
        }
    });
}

/**
 * Apply a bundled color scheme to the editable profile.
 * @param id
 */
export function selectPreset(id: string) {
    profile.value = presetProfile(id);
    save();
}

/**
 * Update one semantic palette color in the current profile.
 * @param role
 * @param value
 */
export function setColor(role: Role, value: string) {
    const hex = normalizeHex(value);
    if (hex === null) {
        return;
    }
    profile.value = {
        ...profile.value,
        preset: 'custom',
        surface:
            profile.value.preset === 'original' && profile.value.surface === null
                ? surfaceBase(profile.value)
                : profile.value.surface,
        colors: { ...profile.value.colors, [role]: hex },
    };
    save();
}

/**
 * Update the neutral surface tint in the current profile.
 * @param value
 */
export function setSurface(value: string | null) {
    const hex = normalizeHex(value);
    if (value !== null && hex === null) {
        return;
    }
    profile.value = {
        ...profile.value,
        preset: 'custom',
        surface: hex,
    };
    save();
}
