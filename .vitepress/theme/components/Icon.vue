<template>
    <svg
        :width="size || 18"
        :height="size || 18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true">
        <path :d="paths[name] || paths.grid" />
    </svg>
</template>

<script lang="ts" setup>
defineProps<{ name: string; size?: number }>();
const paths: Record<string, string> = {
    expand: 'M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5',
    adjust: 'M4 7h6m4 0h6M4 17h10m4 0h2M10 4v6m4 4v6',
    sun: 'M12 3v1m0 16v1M3 12h1m16 0h1M5.6 5.6l.7.7m11.4 11.4.7.7M5.6 18.4l.7-.7M17.7 6.3l.7-.7M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
    moon: 'M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z',
    search: 'm21 21-4.3-4.3M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
    grid: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
    code: 'm8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16',
    check: 'm5 12 4 4L19 6',
    copy: 'M9 9h12v12H9zM15 9V3H3v12h6',
    menu: 'M4 6h16M4 12h16M4 18h16',
    close: 'm6 6 12 12M6 18 18 6',
    spark: 'm12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z',
    layers: 'm12 3 10 5-10 5L2 8Zm-10 9 10 5 10-5M2 16l10 5 10-5',
    command: 'M9 7V5a2 2 0 1 0-2 2h10a2 2 0 1 0-2-2v14a2 2 0 1 0 2-2H7a2 2 0 1 0 2 2Z',
    plus: 'M12 5v14M5 12h14',
    'arrow-right': 'M4 12h16m-6-6 6 6-6 6',
    heart: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z',
};
</script>
