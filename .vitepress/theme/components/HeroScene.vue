<template>
    <div class="hero-scene">
        <div class="hero-sculpture" aria-hidden="true">
            <svg viewBox="0 0 128 128" fill="none" focusable="false">
                <g class="hero-mark-echo"><path :d="markPath" /></g>
                <g v-html="artwork" />
            </svg>
        </div>
        <span class="hero-scene-note" aria-hidden="true">
            A little character.
            <br />
            <em>By design.</em>
        </span>
        <span class="hero-scene-note hero-scene-note--extra" aria-hidden="true">
            A little bit extra.
            <br />
            <em>By nature.</em>
        </span>
        <div class="hero-material">
            <div class="hero-material-heading">
                <span>YOUR SIGNATURE</span>
                <SiteUi name="Badge" fallback="span" variant="success">Live tokens</SiteUi>
            </div>
            <div class="hero-material-colors" aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <SiteUi
                name="Button"
                fallback="button"
                variant="ghost"
                size="sm"
                @click="colorPanelOpen = true">
                Make it feel like you
                <Icon name="arrow-right" :size="15" />
            </SiteUi>
        </div>
        <span class="hero-scene-caption" aria-hidden="true">
            <span>COMPONENTS.</span>
            <span class="hero-caption-accent">WITH CHARACTER.</span>
        </span>
    </div>
</template>

<script lang="ts" setup>
import { markArtwork, markPath } from '../branding/mark';
import { colorPanelOpen } from '../colors/store';
import Icon from './Icon.vue';
import SiteUi from './SiteUi.vue';

const artwork = markArtwork({
    front: 'var(--ui-accent-400)',
    side: 'var(--ui-accent-700)',
    depth: 'var(--ui-accent-900)',
    shadow: 'var(--ui-accent-950)',
    edge: 'var(--ui-accent-100)',
});
</script>
