<template>
    <div class="catch-gallery">
        <CollectionHeader
            gallery
            :component-count="galleryComponentCount"
            :composition-count="galleryCards.length">
            <div class="catch-toolbar">
                <InputSearch
                    v-model="query"
                    placeholder="Find your next piece…"
                    aria-label="Search all components and building blocks"
                    class="catch-search" />
                <span class="catch-result-count" aria-live="polite">
                    {{ visibleCards.length }} / {{ galleryCards.length }} cards
                </span>
                <div class="catch-category-scroll">
                    <FilterBar :items="filters" @select="category = $event" />
                </div>
            </div>
        </CollectionHeader>
        <template v-for="group in groups" :key="group.title">
            <section
                v-if="group.cards.length"
                class="catch-section"
                :aria-labelledby="`catch-${group.title}`">
                <header class="catch-section-heading">
                    <h2 :id="`catch-${group.title}`">
                        {{ categoryLabel(group.title) }}
                        <Badge variant="outline">{{ group.cards.length }}</Badge>
                    </h2>
                    <span>{{ categoryNotes[group.title] }}</span>
                </header>
                <div class="catch-grid">
                    <GalleryCard
                        v-for="card in group.cards"
                        :key="card.name"
                        :card="card"
                        :index="galleryCards.indexOf(card)" />
                </div>
            </section>
        </template>
        <div v-if="!visibleCards.length" class="catch-empty">
            <Icon name="search" :size="28" />
            <h2>No pieces found.</h2>
            <p>Try another name, or start fresh.</p>
            <Button
                variant="outline"
                @click="
                    query = '';
                    category = 'all';
                ">
                Reset filters
            </Button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { FilterBarItem } from '@rat.md/miru';
import { Badge, Button, FilterBar, InputSearch } from '@rat.md/miru';
import { computed, ref } from 'vue';
import CollectionHeader from '../components/CollectionHeader.vue';
import Icon from '../components/Icon.vue';
import { galleryCards, galleryCategories, galleryComponentCount } from './catalogue';
import GalleryCard from './GalleryCard.vue';
import './gallery.css';

const query = ref('');
const category = ref('all');

/**
 * Resolve the readable name of a gallery category.
 * @param title
 * @returns
 */
const categoryLabel = (title: string) => (title === 'FormFields' ? 'Form fields' : title);
const categoryNotes: Record<string, string> = {
    Components: 'Small details. Big personality.',
    Forms: 'A little structure for your next idea.',
    FormFields: 'Every input deserves a little attention.',
    Overlays: 'Make room for the moment.',
    Utilities: 'The details that hold it all together.',
    Extensions: 'A little more power. The same soul.',
    Layouts: 'Start with the bigger picture.',
};
const matches = computed(() =>
    galleryCards.filter((card) =>
        `${card.title} ${card.description} ${card.pieces.map((piece) => piece.name).join(' ')}`
            .toLowerCase()
            .includes(query.value.trim().toLowerCase()),
    ),
);
const visibleCards = computed(() =>
    matches.value.filter((card) => category.value === 'all' || card.category === category.value),
);
const groups = computed(() =>
    galleryCategories.map((title) => ({
        title,
        cards: visibleCards.value.filter((card) => card.category === title),
    })),
);
const filters = computed<FilterBarItem[]>(() => [
    {
        key: 'all',
        label: 'All pieces',
        count: matches.value.length,
        selected: category.value === 'all',
        removable: false,
    },
    ...galleryCategories.map((title) => ({
        key: title,
        label: categoryLabel(title),
        count: matches.value.filter((card) => card.category === title).length,
        selected: category.value === title,
        removable: false,
    })),
]);
</script>
