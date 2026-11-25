<template>
    <div v-if="entry" class="component-meta">
        <SiteTooltip :text="`Available since v${entry.since || entry.version}`">
            <SiteUi name="Badge" fallback="span" variant="outline" tabindex="0">
                {{ entry.since ? `Since v${entry.since}` : `v${entry.version}` }}
            </SiteUi>
        </SiteTooltip>
        <SiteTooltip v-if="entry.storybook" text="View on storybook.miru.ink">
            <SiteUi
                v-if="entry.storybook"
                name="Badge"
                fallback="a"
                as="a"
                :href="entry.storybook"
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                class="component-storybook">
                <IconBrandStorybook :size="13" aria-hidden="true" />
                Storybook
                <IconExternalLink :size="12" aria-hidden="true" />
            </SiteUi>
        </SiteTooltip>
        <SiteTooltip
            v-if="componentGuide && showGuide"
            :text="`Read the ${componentGuide.title} guide`">
            <SiteUi name="Badge" fallback="a" as="a" :href="componentGuide.link" variant="info">
                <IconBook :size="13" aria-hidden="true" />
                Component Guide
            </SiteUi>
        </SiteTooltip>
        <SiteTooltip v-if="isFormComponent && showGuide" text="Read the Forms introduction">
            <SiteUi name="Badge" fallback="a" as="a" href="/docs/forms/introduction" variant="info">
                <IconBook :size="13" aria-hidden="true" />
                Forms Documentation
            </SiteUi>
        </SiteTooltip>
    </div>
</template>
<script setup lang="ts">
import { IconBook, IconBrandStorybook, IconExternalLink } from '@tabler/icons-vue';
import { computed } from 'vue';
import catalogue from '../component-catalogue.json';
import { componentGuideFor } from '../component-guides';
import SiteTooltip from './SiteTooltip.vue';
import SiteUi from './SiteUi.vue';
const props = withDefaults(defineProps<{ name: string; showGuide?: boolean }>(), {
    showGuide: true,
});
const entry = computed(() => catalogue.find((item) => item.name === props.name));
const componentGuide = computed(() => componentGuideFor(props.name, entry.value?.module));
const isFormComponent = computed(
    () =>
        ['field', 'form', 'input-group', 'label'].includes(entry.value?.module ?? '') ||
        props.name === 'FormLayout',
);
</script>
