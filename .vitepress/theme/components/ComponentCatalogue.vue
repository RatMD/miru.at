<template>
    <div class="component-catalogue" :class="{ 'catalogue-overview': overview }">
        <div :class="{ 'catalogue-header-region': overview }">
            <header v-if="overview" class="catalogue-intro">
                <div class="catalogue-intro-copy">
                    <span class="catalogue-eyebrow">
                        <Icon name="grid" :size="14" />
                        THE miru. COLLECTION
                    </span>
                    <h1>
                        Small pieces.
                        <br />
                        <em>Big possibilities.</em>
                    </h1>
                    <p>
                        Components, expressive forms and layouts that fit. Find your next piece, try
                        it live and make something yours.
                    </p>
                    <div class="catalogue-intro-tags">
                        <span>
                            <i />
                            Vue 3 &amp; TypeScript
                        </span>
                        <span>Made for every screen</span>
                    </div>
                </div>
                <div class="catalogue-intro-art" aria-hidden="true">
                    <div class="catalogue-art-orbit"></div>
                    <span class="catalogue-art-note">
                        A little piece.
                        <br />
                        <em>A world of possibility.</em>
                    </span>
                    <div class="catalogue-art-board">
                        <div class="catalogue-art-topline">
                            <strong>miru.</strong>
                            <span>SMALL DETAILS / BIG IDEAS</span>
                        </div>
                        <div class="catalogue-art-pieces">
                            <div class="catalogue-art-symbol">
                                <Icon name="grid" :size="36" />
                                <strong>Made to fit.</strong>
                                <span>Every little detail.</span>
                            </div>
                            <div class="catalogue-art-form">
                                <div class="catalogue-art-field-label">
                                    <span>Your next idea</span>
                                    <small>Ready</small>
                                </div>
                                <div class="catalogue-art-input">
                                    <Icon name="spark" :size="12" />
                                    <span>Something wonderful</span>
                                </div>
                                <div class="catalogue-art-preference">
                                    <b></b>
                                    <span>A little inspiration</span>
                                    <Icon name="check" :size="12" />
                                </div>
                                <div class="catalogue-art-mini-slider"><i></i></div>
                            </div>
                            <div class="catalogue-art-footer">
                                <div class="catalogue-art-colours">
                                    <i></i>
                                    <i></i>
                                    <i></i>
                                    <i></i>
                                    <span>Your signature.</span>
                                </div>
                                <div class="catalogue-art-action">
                                    Make it yours
                                    <Icon name="arrow-right" :size="13" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <span class="catalogue-art-caption">
                        GOOD ON THEIR OWN.
                        <br />
                        <strong>BETTER TOGETHER.</strong>
                    </span>
                </div>
            </header>
            <div :class="{ 'catalogue-discovery': overview }">
                <div class="catalogue-controls">
                    <SiteUi
                        name="InputSearch"
                        fallback="input"
                        :model-value="query"
                        @update:model-value="query = String($event)"
                        @input="query = ($event.target as HTMLInputElement).value"
                        placeholder="Find a component…"
                        aria-label="Find a component" />
                    <SiteUi
                        name="Button"
                        fallback="button"
                        variant="outline"
                        size="sm"
                        :aria-pressed="primitives"
                        @click="primitives = !primitives">
                        {{ primitives ? 'Hide primitives' : 'Include primitives' }}
                    </SiteUi>
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
            <div v-if="overview" class="catalogue-divider" aria-hidden="true" />
        </div>
        <section v-for="group in visibleGroups" :key="group.title" class="catalogue-group">
            <h2 :id="categoryId(group.title)">
                {{ group.title }}
                <SiteUi name="Badge" fallback="span" variant="outline">
                    {{ group.items.length }}
                </SiteUi>
            </h2>
            <div class="catalogue-cards">
                <SiteUi
                    v-for="item in group.items"
                    :key="item.name"
                    name="Card"
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
                </SiteUi>
            </div>
        </section>
        <p v-if="!count">No matches. Try a different component name.</p>
    </div>
</template>
<script setup lang="ts">
import type { FilterBarItem } from '@rat.md/miru';
import { Avatar, AvatarFallback, FilterBar } from '@rat.md/miru';
import { computed, ref } from 'vue';
import catalogue from '../component-catalogue.json';
import Icon from './Icon.vue';
import SiteUi from './SiteUi.vue';
const props = withDefaults(defineProps<{ scope?: 'all' | 'layouts'; overview?: boolean }>(), {
    scope: 'all',
    overview: false,
});
const query = ref('');
const primitives = ref(false);
const selectedCategory = ref('all');
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
