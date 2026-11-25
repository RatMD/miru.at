<template>
    <div class="miru-sidebar">
        <div class="sidebar-section-title">
            <span>{{ section }}</span>
            <Badge variant="outline">miru.</Badge>
        </div>
        <InputSearch
            v-model="query"
            :placeholder="`Filter ${section.toLowerCase()}…`"
            aria-label="Filter navigation"
            size="sm"
            class="sidebar-search" />
        <ScrollArea class="sidebar-scroll">
            <Button
                v-if="showOverview"
                as="a"
                href="/components/"
                variant="ghost"
                size="sm"
                class="sidebar-overview-link">
                All components
            </Button>
            <template v-for="group in filtered" :key="group.title">
                <Tabs
                    v-if="group.standalone"
                    class="sidebar-tabs sidebar-overview-link"
                    :tabs="group.items.map((item) => ({ value: item.link, label: item.text }))"
                    :model-value="group.items.find((item) => isCurrent(item.link))?.link ?? ''"
                    :aria-label="`${group.title} pages`"
                    appearance="buttons"
                    variant="primary"
                    orientation="vertical"
                    active-indicator
                    :content="false"
                    :collapse-overflow="false"
                    activation-mode="manual"
                    @update:model-value="router.go($event)" />
                <Collapsible
                    v-else
                    :open="!!query.trim() || expanded.includes(group.title)"
                    class="sidebar-group"
                    @update:open="setExpanded(group.title, $event)">
                    <CollapsibleTrigger class="sidebar-group-trigger">
                        <span>{{ group.title }}</span>
                        <Badge variant="outline">{{ group.items.length }}</Badge>
                        <IconChevronDown :size="14" class="sidebar-group-chevron" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <Tabs
                            class="sidebar-tabs"
                            :tabs="
                                group.items.map((item) => ({ value: item.link, label: item.text }))
                            "
                            :model-value="
                                group.items.find((item) => isCurrent(item.link))?.link ?? ''
                            "
                            :aria-label="`${group.title} pages`"
                            appearance="buttons"
                            variant="primary"
                            orientation="vertical"
                            active-indicator
                            :content="false"
                            :collapse-overflow="false"
                            activation-mode="manual"
                            @update:model-value="router.go($event)" />
                    </CollapsibleContent>
                </Collapsible>
            </template>
            <p v-if="!filtered.length && !showOverview" class="sidebar-empty">
                No components match “{{ query }}”.
            </p>
        </ScrollArea>
        <a href="/docs/guide/theming" class="sidebar-bottom">
            One system. Your signature.
            <span>Theme everything with --ui-* tokens.</span>
        </a>
    </div>
</template>
<script setup lang="ts">
import type { NavigationGroup } from '../navigation';
import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
    Tabs,
    InputSearch,
    Button,
    ScrollArea,
    Badge,
} from '@rat.md/miru';
import { IconChevronDown } from '@tabler/icons-vue';
import { useRoute, useRouter } from 'vitepress';
import { computed, ref } from 'vue';
const props = defineProps<{ groups: NavigationGroup[]; section: string }>();
const route = useRoute();
const router = useRouter();
const query = ref('');
const showOverview = computed(
    () => props.section === 'Components' && 'all components'.includes(query.value.toLowerCase()),
);
const expanded = ref(props.groups.filter((group) => !group.collapsed).map((group) => group.title));
function setExpanded(title: string, open: boolean) {
    expanded.value = open
        ? [...new Set([...expanded.value, title])]
        : expanded.value.filter((item) => item !== title);
}
const filtered = computed(() =>
    props.groups
        .map((group) => ({
            ...group,
            items: group.items.filter((item) =>
                item.text.toLowerCase().includes(query.value.toLowerCase()),
            ),
        }))
        .filter((group) => group.items.length),
);
const isCurrent = (url: string) => {
    const path = route.path.replace(/\/$/, '');
    const target = url.replace(/\/$/, '');
    return path === target || path.startsWith(target + '/');
};
</script>
<style scoped>
.sidebar-overview-link {
    width: 100%;
    justify-content: flex-start;
    margin-block: 12px;
}
</style>
