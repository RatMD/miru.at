<template>
    <div
        class="catalogue-header-region catalogue-overview"
        :class="{ 'collection-header--gallery': gallery }">
        <header class="catalogue-intro">
            <div class="catalogue-intro-copy">
                <span class="catalogue-eyebrow">
                    <Icon name="grid" :size="14" />
                    THE miru. COLLECTION
                </span>
                <h1 v-if="!gallery">
                    Small pieces.
                    <br />
                    <em>Big possibilities.</em>
                </h1>
                <h1 v-else>
                    Gotta catch
                    <br />
                    <em>’em all.</em>
                    <span class="collection-title-dot">●</span>
                </h1>
                <p>
                    {{
                        gallery
                            ? 'Every little piece. A whole lot of possibility. Explore the collection, try it live and make something yours.'
                            : 'Components, expressive forms and layouts that fit. Find your next piece, try it live and make something yours.'
                    }}
                </p>
                <div v-if="gallery" class="catalogue-intro-tags collection-stats">
                    <span>
                        <i />
                        {{ componentCount }} components &amp; pieces
                    </span>
                    <span>{{ compositionCount }} live compositions</span>
                </div>
                <div v-else class="catalogue-intro-tags">
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
                    {{ gallery ? 'Collect a little inspiration.' : 'A little piece.' }}
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
                            <span>
                                {{
                                    gallery
                                        ? compositionCount + ' ways to begin.'
                                        : 'Every little detail.'
                                }}
                            </span>
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
        <slot />
        <div class="catalogue-divider" aria-hidden="true" />
    </div>
</template>

<script lang="ts" setup>
import Icon from './Icon.vue';

defineProps<{ gallery?: boolean; componentCount?: number; compositionCount?: number }>();
</script>
