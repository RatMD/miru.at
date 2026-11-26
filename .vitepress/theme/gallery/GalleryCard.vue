<template>
    <Card
        ref="cardElement"
        class="catch-card"
        :class="[`catch-card--${card.size}`, { 'is-awake': awake }]">
        <CardHeader class="catch-card-heading">
            <a :href="card.link" class="catch-card-title-link">
                <span class="catch-card-number">{{ String(index + 1).padStart(3, '0') }}</span>
                <h3>
                    {{ card.title }}
                </h3>
            </a>
            <a
                :href="`/playground?component=${card.name}`"
                class="catch-playground"
                :aria-label="`Open ${card.title} in playground`">
                <Icon name="code" :size="16" />
            </a>
        </CardHeader>
        <CardContent class="catch-stage">
            <GalleryPreview
                v-if="awake"
                :source="gallerySource(card, selectedColour)"
                :scope="`gallery-${card.name}`"
                :playground="`/playground?component=${card.name}`" />
            <div v-else class="catch-placeholder" aria-label="Preview loads as you scroll">
                <span />
                <span />
                <span />
            </div>
        </CardContent>
        <div
            v-if="card.colours"
            class="catch-colours"
            :aria-label="`${card.title} colours`"
            role="group">
            <button
                v-for="colour in card.colours.values"
                :key="colour"
                type="button"
                :aria-pressed="selectedColour === colour"
                :aria-label="colour"
                :title="colour"
                :style="{ '--sample-colour': colourValue(colour) }"
                @click="selectedColour = colour">
                <span />
            </button>
        </div>
        <CardFooter class="catch-card-footer">
            <div class="catch-card-summary">
                <p :title="card.description">{{ card.description }}</p>
                <a :href="card.link" class="catch-read-more">
                    Read more
                    <Icon name="arrow-right" :size="14" />
                </a>
            </div>
            <Collapsible v-if="card.pieces.length > 1" class="catch-pieces">
                <CollapsibleTrigger class="catch-pieces-trigger">
                    <Icon name="plus" :size="12" />
                    {{ card.pieces.length }} pieces in this family
                </CollapsibleTrigger>
                <CollapsibleContent class="catch-pieces-content">
                    <div>
                        <a v-for="piece in card.pieces" :key="piece.name" :href="piece.link">
                            {{ piece.title }}
                        </a>
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </CardFooter>
    </Card>
</template>

<script lang="ts" setup>
import type { GalleryCard } from './catalogue';
import type { ComponentPublicInstance } from 'vue';
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
} from '@rat.md/miru';
import { onMounted, onUnmounted, ref } from 'vue';
import Icon from '../components/Icon.vue';
import { gallerySource } from './catalogue';
import GalleryPreview from './GalleryPreview.vue';

const props = defineProps<{ card: GalleryCard; index: number }>();
const cardElement = ref<ComponentPublicInstance>();
const awake = ref(false);
const selectedColour = ref(
    props.card.colours?.values.find((colour) => colour === 'primary') ??
        props.card.colours?.values.find((colour) => colour === 'accent') ??
        props.card.colours?.values[0],
);
let observer: IntersectionObserver | undefined;

/**
 * Resolve the CSS color displayed by a gallery swatch.
 * @param colour
 * @returns
 */
const colourValue = (colour: string) =>
    colour === 'default'
        ? 'var(--site-muted)'
        : colour === 'danger-success'
          ? 'linear-gradient(135deg, var(--ui-danger-500) 50%, var(--ui-success-500) 50%)'
          : `var(--ui-${colour}-500)`;
onMounted(() => {
    if (!('IntersectionObserver' in window)) {
        awake.value = true;

        return;
    }
    observer = new IntersectionObserver(
        (entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
                awake.value = true;
                observer?.disconnect();
            }
        },
        { rootMargin: '240px' },
    );
    observer.observe(cardElement.value!.$el);
});
onUnmounted(() => observer?.disconnect());
</script>
