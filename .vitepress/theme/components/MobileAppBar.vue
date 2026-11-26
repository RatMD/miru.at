<template>
    <FloatingAppBar
        label="Website controls"
        variant="three"
        shape="rounded-hexagon"
        appearance="gradient"
        :bordered="false"
        gradient-tone="primary"
        class="mobile-app-bar">
        <template #left><AppearanceButton /></template>
        <template #primary>
            <ButtonAction
                variant="primary"
                aria-label="Toggle navigation"
                aria-controls="sidebar"
                :aria-expanded="menuOpen"
                @click="$emit('toggle-menu')">
                <Icon :name="menuOpen ? 'close' : 'menu'" />
            </ButtonAction>
        </template>
        <template #right><ColorCustomizer mobile-only /></template>
        <template #auxiliary-end>
            <ButtonAction
                variant="default"
                aria-label="Search documentation"
                @click="$emit('search')">
                <Icon name="search" />
            </ButtonAction>
        </template>
    </FloatingAppBar>
</template>

<script lang="ts" setup>
import { ButtonAction, FloatingAppBar } from '@rat.md/miru';
import AppearanceButton from './AppearanceButton.vue';
import ColorCustomizer from './ColorCustomizer.vue';
import Icon from './Icon.vue';

defineProps<{ menuOpen: boolean }>();
defineEmits<{ 'toggle-menu': []; search: [] }>();
</script>
