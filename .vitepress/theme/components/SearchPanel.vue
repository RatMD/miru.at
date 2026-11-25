<template>
    <PageRoot>
        <CommandDialog
            v-model:open="open"
            v-model:query="query"
            title="Search Miru"
            description="Find guides, components, layouts and utilities."
            placeholder="Find your next primitive…"
            :items="items"
            size="3xl"
            @select="(item) => router.go(item.value)">
            <template #footer>
                <div class="native-search-footer">
                    Components, layouts & documentation
                    <kbd>esc to close</kbd>
                </div>
            </template>
        </CommandDialog>
    </PageRoot>
</template>
<script setup lang="ts">
import { CommandDialog, PageRoot } from '@rat.md/miru';
import { useRouter } from 'vitepress';
import { computed, ref } from 'vue';
import catalogue from '../component-catalogue.json';
import searchIndex from '../search-index.json';
const query = ref('');
const primary = new Set(catalogue.filter((item) => item.primary).map((item) => item.link));
const open = defineModel<boolean>('open', { default: false });
const router = useRouter();
const items = computed(() =>
    [...searchIndex]
        .sort((a, b) => score(b) - score(a))
        .map((item) => ({
            value: item.url,
            label: item.title,
            description: item.text.slice(0, 140),
            keywords: [item.text],
            group: item.url.startsWith('/components')
                ? 'Components'
                : item.url.startsWith('/layouts')
                  ? 'Layouts'
                  : 'Documentation',
        })),
);
function score(item: (typeof searchIndex)[number]) {
    const term = query.value.trim().toLowerCase();
    return (
        (term && item.title.toLowerCase() === term ? 100 : 0) +
        (term && item.title.toLowerCase().startsWith(term) ? 30 : 0) +
        (primary.has(item.url) ? 5 : 0) +
        (item.url === '/docs/welcome' ? 3 : 0)
    );
}
</script>
