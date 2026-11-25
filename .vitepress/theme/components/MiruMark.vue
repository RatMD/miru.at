<template>
    <svg class="miru-mark" viewBox="0 0 128 128" fill="none" aria-hidden="true" focusable="false">
        <path :d="squirclePath" class="miru-mark-tile" />
        <g transform="translate(7 6) scale(.9)" v-html="artwork" />
    </svg>
</template>
<script setup lang="ts">
import { markArtwork, squirclePath } from '../branding/mark';
const artwork = markArtwork({
    front: 'var(--miru-mark-front)',
    side: 'var(--miru-mark-side)',
    depth: 'var(--miru-mark-depth)',
    shadow: 'var(--miru-mark-shadow)',
    edge: 'var(--miru-mark-edge)',
});
</script>
<style scoped>
.miru-mark {
    --miru-mark-front: #ffffff;
    --miru-mark-side: var(--ui-accent-100);
    --miru-mark-depth: var(--ui-accent-300);
    --miru-mark-shadow: var(--ui-accent-800);
    --miru-mark-edge: #ffffff;
    overflow: visible;
}
.miru-mark-tile {
    fill: var(--ui-accent-text, var(--ui-accent-700));
    stroke: color-mix(in srgb, var(--ui-accent-700) 18%, transparent);
    stroke-width: 1;
}
.miru-mark:where(.dark *, [data-theme='dark'] *) {
    --miru-mark-front: var(--ui-accent-400);
    --miru-mark-side: var(--ui-accent-700);
    --miru-mark-depth: var(--ui-accent-900);
    --miru-mark-shadow: var(--ui-accent-950);
    --miru-mark-edge: var(--ui-accent-300);
}
.miru-mark-tile:where(.dark *, [data-theme='dark'] *) {
    fill: color-mix(in srgb, var(--ui-accent-900) 45%, var(--ui-background));
}
.miru-mark :deep(path) {
    transition:
        fill 180ms ease,
        stroke 180ms ease;
}
@media (prefers-reduced-motion: reduce) {
    .miru-mark :deep(path) {
        transition: none;
    }
}
</style>
