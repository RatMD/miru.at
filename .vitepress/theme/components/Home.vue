<template>
    <section class="hero">
        <div class="hero-grid" aria-hidden="true"></div>
        <SiteUi
            name="Button"
            fallback="button"
            variant="ghost"
            class="palette-hint"
            @click="colorPanelOpen = true"
            aria-label="Open palette settings">
            <span class="palette-hint-gesture">
                <span class="palette-hint-copy">
                    Not your colours?
                    <strong>Change them!</strong>
                </span>
                <svg viewBox="0 0 65 55" fill="none" aria-hidden="true">
                    <path
                        d="M3 47Q49 50 52 5m-9 9 9-10 8 11"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </span>
        </SiteUi>
        <div class="hero-composition">
            <div class="hero-copy">
                <SiteUi
                    name="Badge"
                    fallback="span"
                    variant="danger"
                    appearance="soft"
                    class="hero-alpha">
                    <SiteUi name="BadgePart" fallback="span">
                        <SiteUi name="Indicator" fallback="span" color="current" ping />
                        <strong class="hero-alpha-label">Alpha</strong>
                    </SiteUi>
                    <SiteUi name="BadgeSeparator" fallback="span" />
                    <SiteUi name="BadgePart" fallback="span" class="hero-alpha-note">
                        Early preview. APIs may change.
                    </SiteUi>
                </SiteUi>
                <h1>
                    Interfaces with
                    <br />
                    <span class="hero-ending">
                        a little more
                        <span class="hero-soul">
                            soul
                            <svg viewBox="0 0 300 16" preserveAspectRatio="none" aria-hidden="true">
                                <path
                                    d="M3 10Q145-4 295 9"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="4"
                                    stroke-linecap="round" />
                            </svg>
                        </span>
                        <span class="coral">.</span>
                    </span>
                </h1>
                <p class="hero-description">
                    Bring your next dashboard to life. Expressive forms, thoughtful Vue components,
                    and a natural feel on every screen. From the big picture to the palm of your
                    hand.
                </p>
                <div class="hero-actions">
                    <span class="hero-action-glow">
                        <SiteUi
                            name="Button"
                            fallback="a"
                            as="a"
                            variant="primary"
                            size="lg"
                            href="/docs/guide/installation"
                            class="hero-action">
                            Start building
                            <Icon name="plus" :size="17" />
                        </SiteUi>
                    </span>
                    <SiteUi
                        name="Button"
                        fallback="a"
                        as="a"
                        variant="outline"
                        size="lg"
                        href="/components/"
                        class="hero-action">
                        <Icon name="grid" :size="16" />
                        Explore components
                    </SiteUi>
                    <span class="hero-socials">
                        <SiteTooltip text="Visit miru. on GitHub">
                            <SiteUi
                                name="Button"
                                fallback="a"
                                as="a"
                                variant="ghost"
                                size="lg"
                                icon-only
                                href="https://github.com/RatMD/miru"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Miru on GitHub"
                                class="hero-social-action">
                                <IconBrandGithub :size="21" aria-hidden="true" />
                            </SiteUi>
                        </SiteTooltip>
                        <SiteTooltip text="Visit miru. on Storybook">
                            <SiteUi
                                name="Button"
                                fallback="a"
                                as="a"
                                variant="ghost"
                                size="lg"
                                icon-only
                                href="https://storybook.miru.at"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Miru Storybook"
                                class="hero-social-action">
                                <IconBrandStorybook :size="21" aria-hidden="true" />
                            </SiteUi>
                        </SiteTooltip>
                    </span>
                </div>
                <p class="hero-foundations">
                    Based on
                    <SiteUi
                        name="Anchor"
                        fallback="a"
                        href="https://reka-ui.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="accent"
                        animation="slide">
                        Reka UI
                    </SiteUi>
                    , inspired by
                    <SiteUi
                        name="Anchor"
                        fallback="a"
                        href="https://www.shadcn-vue.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="accent"
                        animation="slide">
                        shadcn/vue
                    </SiteUi>
                    .
                </p>
            </div>
            <HeroScene />
        </div>
        <div class="hero-meta">
            <SiteUi
                name="Code"
                fallback="code"
                value="npm install @rat.md/miru"
                prefix="$"
                prefix-variant="accent"
                copyable
                class="hero-install" />
            <div class="hero-footnote">
                <span>Vue3</span>
                <span class="hero-footnote-dot" aria-hidden="true">·</span>
                <span>TypeScript first</span>
                <span class="hero-footnote-dot" aria-hidden="true">·</span>
                <span>Make it your own</span>
            </div>
        </div>
    </section>
    <ColorShowcase />
    <FormShowcase />
    <section class="showcase-section" aria-labelledby="showcase-title">
        <div class="section-topline">
            <div>
                <span class="eyebrow">
                    <span class="eyebrow-underline">
                        YOUR
                        <svg viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
                            <path
                                d="M2 7Q50 1 98 6"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1"
                                stroke-linecap="round"
                                vector-effect="non-scaling-stroke" />
                        </svg>
                    </span>
                    NEW COMPONENTS, IN ACTION
                    <span class="eyebrow-dot">.</span>
                </span>
                <h2 id="showcase-title">
                    Looks just awesome.
                    <br />
                    <span>Feels even better.</span>
                </h2>
            </div>
            <p class="showcase-intro">
                <span>A few little pieces. A whole lot of possibility.</span>
                <span>Made to feel good, from the first click to the finer details.</span>
            </p>
        </div>
        <div class="showcase-loading"><Showcase /></div>
    </section>
    <section class="philosophy">
        <div>
            <span class="eyebrow">
                FROM
                <span class="eyebrow-underline">
                    YOUR
                    <svg viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
                        <path
                            d="M2 7Q50 1 98 6"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1"
                            stroke-linecap="round"
                            vector-effect="non-scaling-stroke" />
                    </svg>
                </span>
                FIRST BUTTON TO THE BIG PICTURE
                <span class="eyebrow-dot">.</span>
            </span>
            <h2>
                Give your ideas...
                <br />
                <span>a head start.</span>
            </h2>
            <p>
                Go beyond the basics with the pieces your application actually needs. Beautiful on
                their own. Better together.
            </p>
            <SiteUi
                name="Anchor"
                fallback="a"
                href="/docs/welcome"
                variant="accent"
                animation="slide"
                class="closing-intro-link">
                Get to know Miru
                <Icon name="spark" :size="16" />
            </SiteUi>
        </div>
        <div class="closing-feature-list">
            <SiteUi
                v-for="(feature, index) in closingFeatures"
                :key="feature.href"
                name="Card"
                fallback="article"
                class="closing-feature"
                :data-tone="feature.tone">
                <span class="closing-feature-icon"><Icon :name="feature.icon" :size="22" /></span>
                <div class="closing-feature-body">
                    <h3>{{ feature.title }}</h3>
                    <p>{{ feature.text }}</p>
                    <SiteUi
                        name="Anchor"
                        fallback="a"
                        :href="feature.href"
                        :variant="feature.tone"
                        animation="slide">
                        {{ feature.link }}
                        <Icon name="arrow-right" :size="14" />
                    </SiteUi>
                </div>
                <span class="closing-feature-number" aria-hidden="true">0{{ index + 1 }}</span>
            </SiteUi>
        </div>
    </section>
    <SiteUi name="Card" fallback="section" class="bottom-cta closing-cta">
        <div class="cta-sculpture" aria-hidden="true">
            m
            <span>m</span>
        </div>
        <div>
            <span class="eyebrow">A GOOD PLACE TO START SOMETHING GREAT</span>
            <h2>Make yourself an interface.</h2>
            <p>The primitives are ready. Bring your ideas.</p>
        </div>
        <SiteUi
            name="Button"
            fallback="a"
            as="a"
            variant="primary"
            href="/docs/guide/installation"
            class="cta primary">
            Let’s build something
            <Icon name="plus" :size="17" />
        </SiteUi>
    </SiteUi>
</template>

<script lang="ts" setup>
import { IconBrandGithub, IconBrandStorybook } from '@tabler/icons-vue';
import { defineClientComponent } from 'vitepress';
import { onMounted, onBeforeUnmount } from 'vue';
import { colorPanelOpen } from '../colors/store';
import HeroScene from './HeroScene.vue';
import Icon from './Icon.vue';
import SiteTooltip from './SiteTooltip.vue';
import SiteUi from './SiteUi.vue';

const homeTitles = [
    'The simple way to design in Vue.',
    "Components you'll love to use.",
    'Small pieces. Big possibilities.',
    'Expressive forms. A smoother flow.',
    'Dashboards with a little more soul.',
    'Big ideas. Every screen.',
    'Less boilerplate. More possibility.',
    'Your interface. Your signature.',
];
let titleTimer: ReturnType<typeof setInterval> | undefined;
onMounted(() => {
    let index = 0;
    document.title = `${homeTitles[index]} · @rat.md/miru`;
    titleTimer = setInterval(() => {
        if (document.hidden) {
            return;
        }
        index = (index + 1) % homeTitles.length;
        document.title = `${homeTitles[index]} · @rat.md/miru`;
    }, 8000);
});
onBeforeUnmount(() => clearInterval(titleTimer));
const Showcase = defineClientComponent(() => import('./Showcase.vue'));
const ColorShowcase = defineClientComponent(() => import('./ColorShowcase.vue'));
const FormShowcase = defineClientComponent(() => import('./FormShowcase.vue'));
const closingFeatures = [
    {
        icon: 'grid',
        tone: 'accent',
        title: 'Considered down to the click.',
        text: 'Consistent controls, keyboard interactions and thoughtful states. From the smallest badge to a full data table, for mobile, tablet and desktop!',
        href: '/components/',
        link: 'Explore the components',
    },
    {
        icon: 'code',
        tone: 'primary',
        title: 'Forms with the hard parts handled.',
        text: 'Using @tanstack/vue-form, Zod, optional Inertia or plain AJAX transport. Responsive FormLayouts, Fields and simple, schema-based form generation.',
        href: '/docs/forms/introduction',
        link: 'Meet your next form',
    },
    {
        icon: 'layers',
        tone: 'secondary',
        title: 'Your System. Your Signature.',
        text: 'Adapt using CSS variables, handle light and dark modes, and use composable layouts. Give every screen your very own touch with a familiar feeling.',
        href: '/docs/guide/theming',
        link: 'Make it your own',
    },
];
</script>
