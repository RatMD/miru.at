<template>
    <header v-if="entry && config" class="component-page-header">
        <div class="component-page-intro">
            <nav class="component-page-breadcrumb" aria-label="Breadcrumb">
                <span>Library</span>
                <span aria-hidden="true">/</span>
                <a :href="entry.layout ? '/layouts/' : '/components/'">
                    {{ entry.layout ? 'Layouts' : 'Components' }}
                </a>
                <template v-if="active !== 'overview'">
                    <span aria-hidden="true">/</span>
                    <span>{{ active === 'reference' ? 'Reference' : 'Guide' }}</span>
                </template>
            </nav>
            <div class="component-page-title">
                <h1>{{ entry.title }}</h1>
                <ComponentMeta :name="name" :show-guide="false" />
            </div>
            <p>{{ entry.description }}</p>
        </div>
        <div class="component-page-toolbar">
            <Tabs
                class="component-page-sections"
                :tabs="sections"
                :model-value="activePath"
                :aria-label="`${entry.title} documentation`"
                appearance="buttons"
                variant="accent"
                :content="false"
                :collapse-overflow="false"
                @update:model-value="router.go($event)" />
            <SiteUi
                name="Button"
                fallback="a"
                as="a"
                :href="`/playground?component=${name}`"
                variant="outline"
                size="sm"
                class="component-page-playground">
                <IconCode :size="15" aria-hidden="true" />
                Playground
                <IconArrowUpRight :size="14" aria-hidden="true" />
            </SiteUi>
        </div>
    </header>
</template>
<script setup lang="ts">
import { Tabs } from '@rat.md/miru';
import { IconArrowUpRight, IconBook, IconCode } from '@tabler/icons-vue';
import { useRouter } from 'vitepress';
import { computed } from 'vue';
import catalogue from '../component-catalogue.json';
import { componentPages } from '../component-pages';
import ComponentMeta from './ComponentMeta.vue';
import SiteUi from './SiteUi.vue';
const props = defineProps<{ name: string; active: 'overview' | 'reference' | 'guide' }>();
const router = useRouter();
const entry = computed(() => catalogue.find((item) => item.name === props.name));
const config = computed(() => componentPages[props.name]);
const sections = computed(() => {
    if (!config.value) return [];
    return [
        { value: config.value.base, label: 'Overview' },
        { value: `${config.value.base}/reference`, label: 'Reference' },
        ...(config.value.guide
            ? [{ value: config.value.guide, label: 'Guide', icon: IconBook }]
            : []),
        ...(config.value.documentation
            ? [
                  {
                      value: config.value.documentation,
                      label: 'Documentation',
                      icon: IconBook,
                      variant: 'primary' as const,
                      separatorBefore: true,
                      class: 'component-documentation-tab',
                  },
              ]
            : []),
    ];
});
const activePath = computed(
    () => sections.value.find((section) => section.label.toLowerCase() === props.active)?.value,
);
</script>
<style scoped>
.component-page-header {
    position: relative;
    isolation: isolate;
    margin: 28px 0 36px;
    border: 1px solid var(--site-line);
    border-radius: 14px;
    background:
        radial-gradient(
            ellipse at 100% 0%,
            color-mix(in srgb, var(--ui-accent) 7%, transparent),
            transparent 60%
        ),
        var(--site-panel);
    overflow: hidden;
}
.component-page-header::before {
    content: '';
    position: absolute;
    z-index: -1;
    top: -76px;
    right: -28px;
    width: 220px;
    height: 220px;
    border: 1px solid color-mix(in srgb, var(--ui-accent) 14%, transparent);
    border-radius: 38px;
    box-shadow:
        0 0 0 18px color-mix(in srgb, var(--ui-accent) 4%, transparent),
        0 0 0 36px color-mix(in srgb, var(--ui-accent) 2%, transparent);
    transform: rotate(-18deg);
    pointer-events: none;
}
.component-page-intro {
    padding: 24px 28px 26px;
}
.component-page-breadcrumb {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 22px;
    color: var(--site-faint);
    font-size: 12px;
}
.component-page-breadcrumb a {
    color: var(--site-muted);
    text-decoration: none;
}
.component-page-breadcrumb a:hover {
    color: var(--site-text);
}
.component-page-title {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px 18px;
}
.component-page-title h1 {
    margin: 0;
    font-size: clamp(30px, 3vw, 38px);
    font-weight: 650;
    line-height: 1.2;
    letter-spacing: -1.2px;
}
.component-page-title :deep(.component-meta) {
    margin: 0;
    gap: 10px;
}
.component-page-intro > p {
    max-width: 78ch;
    margin: 16px 0 0;
    color: var(--site-muted);
    font-size: 15px;
    line-height: 1.8;
}
.component-page-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 20px;
    border-top: 1px solid var(--site-line);
}
.component-page-sections {
    flex: 1;
    min-width: 0;
}
.component-page-sections :deep(.component-documentation-tab) {
    border: 0;
    color: var(--ui-primary) !important;
    background: color-mix(in srgb, var(--ui-primary) 10%, transparent) !important;
}
.component-page-sections :deep(.component-documentation-tab:hover) {
    background: color-mix(in srgb, var(--ui-primary) 18%, transparent) !important;
}
.component-page-sections :deep(.component-documentation-tab::before) {
    left: calc(-0.875rem - 0.5px);
}
.component-page-header a:focus-visible {
    outline: 2px solid var(--ui-ring);
    outline-offset: -3px;
    border-radius: 4px;
}
.component-page-playground {
    flex-shrink: 0;
}
@media (max-width: 600px) {
    .component-page-header {
        margin-top: 10px;
    }
    .component-page-intro {
        padding: 20px;
    }
    .component-page-toolbar {
        flex-wrap: wrap;
        padding: 10px 12px;
        gap: 4px;
    }
    .component-page-playground :deep(svg:last-child) {
        display: none;
    }
}
</style>
