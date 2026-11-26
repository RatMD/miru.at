<template>
    <div class="component-catalogue" :class="{ 'catalogue-overview': overview }">
        <component :is="overview ? CollectionHeader : 'div'">
            <div :class="{ 'catalogue-discovery': overview }">
                <div class="catalogue-controls">
                    <InputSearch
                        data-miru-component="InputSearch"
                        :model-value="query"
                        @update:model-value="query = String($event)"
                        @input="query = ($event.target as HTMLInputElement).value"
                        placeholder="Find a component…"
                        aria-label="Find a component" />
                    <Button
                        variant="outline"
                        size="sm"
                        :aria-pressed="primitives"
                        @click="primitives = !primitives">
                        {{ primitives ? 'Hide primitives' : 'Include primitives' }}
                    </Button>
                    <span class="catalogue-result-count">
                        {{ count }} {{ count === 1 ? 'component' : 'components' }}
                    </span>
                </div>
                <p class="catalogue-hint">
                    Primitives are the smaller parts of a component, such as DialogTrigger,
                    DialogContent or AccordionItem.
                </p>
                <nav class="catalogue-categories" aria-label="Component categories">
                    <FilterBar
                        :items="categoryFilters"
                        size="default"
                        @select="selectedCategory = $event" />
                </nav>
            </div>
        </component>
        <section v-for="group in visibleGroups" :key="group.title" class="catalogue-group">
            <h2 :id="categoryId(group.title)">
                {{ group.title }}
                <Badge variant="outline">
                    {{ group.items.length }}
                </Badge>
            </h2>
            <div class="catalogue-cards">
                <Card
                    v-for="item in group.items"
                    :key="item.name"
                    class="component-card"
                    :data-kind="
                        item.layout ? 'layout' : item.primary ? 'component' : 'building-block'
                    ">
                    <a :href="item.link">
                        <Avatar
                            class="catalogue-glyph"
                            shape="squircle"
                            :tone="item.layout ? 'secondary' : item.primary ? 'primary' : 'accent'"
                            aria-hidden="true">
                            <AvatarFallback>{{ item.title.slice(0, 2) }}</AvatarFallback>
                        </Avatar>
                        <div>
                            <strong>{{ item.title }}</strong>
                            <p class="component-summary">{{ item.description }}</p>
                        </div>
                        <span v-if="item.layout" class="component-kind">Layout</span>
                    </a>
                </Card>
            </div>
        </section>
        <p v-if="!count">No matches. Try a different component name.</p>
        <a
            v-if="overview"
            class="catalogue-gallery-link"
            data-slot="collection-link"
            href="/gotta-catch-em-all">
            <span class="catalogue-gallery-symbol"><Icon name="spark" :size="24" /></span>
            <span class="catalogue-gallery-copy">
                <span class="catalogue-gallery-eyebrow">THE LIVE COLLECTION</span>
                <strong>Gotta catch ’em all.</strong>
                <small>The whole collection. Live, colourful, and ready to play.</small>
            </span>
            <span class="catalogue-gallery-action">
                Explore the collection
                <Icon name="arrow-right" :size="17" />
            </span>
        </a>
    </div>
</template>

<script lang="ts" setup>
import type { FilterBarItem } from '@rat.md/miru';
import { Avatar, AvatarFallback, Badge, Button, Card, FilterBar, InputSearch } from '@rat.md/miru';
import { computed, ref } from 'vue';
import catalogue from '../component-catalogue.json';
import CollectionHeader from './CollectionHeader.vue';
import Icon from './Icon.vue';

const props = withDefaults(defineProps<{ scope?: 'all' | 'layouts'; overview?: boolean }>(), {
    scope: 'all',
    overview: false,
});
const query = ref('');
const primitives = ref(false);
const selectedCategory = ref('all');

/**
 * Convert a category title into a stable section identifier.
 * @param title
 * @returns
 */
const categoryId = (title: string) => title.toLowerCase().replace(/\W+/g, '-');
const groups = computed(() =>
    [...new Set(catalogue.map((item) => item.category))]
        .map((title) => ({
            title,
            items: catalogue
                .filter(
                    (item) =>
                        item.category === title &&
                        (props.scope !== 'layouts' || item.layout) &&
                        (primitives.value || item.primary) &&
                        `${item.title} ${item.name} ${item.description}`
                            .toLowerCase()
                            .includes(query.value.toLowerCase()),
                )
                .sort((a, b) => a.title.localeCompare(b.title, 'en')),
        }))
        .filter((group) => group.items.length),
);
const count = computed(() =>
    visibleGroups.value.reduce((sum, group) => sum + group.items.length, 0),
);
const visibleGroups = computed(() =>
    groups.value.filter(
        (group) => selectedCategory.value === 'all' || group.title === selectedCategory.value,
    ),
);
const categoryFilters = computed<FilterBarItem[]>(() => [
    {
        key: 'all',
        label: 'All',
        count: groups.value.reduce((sum, group) => sum + group.items.length, 0),
        selected: selectedCategory.value === 'all',
        removable: false,
    },
    ...groups.value.map((group) => ({
        key: group.title,
        label: group.title,
        count: group.items.length,
        selected: selectedCategory.value === group.title,
        removable: false,
    })),
]);
</script>
