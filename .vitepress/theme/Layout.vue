<template>
    <PreviewRuntime v-if="frontmatter.layout === 'preview'" />
    <div
        v-else
        class="site-shell"
        :class="{
            'is-playground': frontmatter.layout === 'playground',
        }"
        @keydown.esc="menuOpen = false">
        <a class="skip-link" href="#main-content">Skip to content</a>
        <header class="site-header">
            <a href="/" class="brand" aria-label="Miru home">
                <span class="brand-mark"><MiruMark /></span>
                <span>
                    miru
                    <span class="brand-period">.</span>
                </span>
            </a>
            <div class="header-center">
                <nav class="primary-nav" aria-label="Main navigation">
                    <SiteUi
                        name="Button"
                        fallback="a"
                        as="a"
                        variant="ghost"
                        size="sm"
                        href="/components/"
                        class="topnav-link"
                        :class="{
                            active: section === 'Components',
                        }">
                        Components
                    </SiteUi>
                    <SiteUi
                        name="Button"
                        fallback="a"
                        as="a"
                        variant="ghost"
                        size="sm"
                        href="/docs/welcome"
                        class="topnav-link"
                        :class="{
                            active: section === 'Documentation' && !frontmatter.home,
                        }">
                        Documentation
                    </SiteUi>
                    <SiteUi
                        name="Button"
                        fallback="a"
                        as="a"
                        variant="ghost"
                        size="sm"
                        href="/themes"
                        class="topnav-link"
                        :class="{ active: section === 'Themes' }">
                        Themes
                    </SiteUi>
                    <SiteUi
                        name="Button"
                        fallback="a"
                        as="a"
                        variant="ghost"
                        size="sm"
                        href="/playground"
                        class="topnav-link"
                        :class="{ active: section === 'Playground' }">
                        Playground
                    </SiteUi>
                </nav>
                <div class="header-actions">
                    <SiteUi
                        name="Button"
                        fallback="button"
                        variant="ghost"
                        size="sm"
                        class="search-trigger"
                        aria-label="Search documentation"
                        @click="search?.open()">
                        <Icon name="search" :size="15" />
                        <span>Search documentation...</span>
                        <SiteUi
                            name="KbdGroup"
                            fallback="kbd"
                            class="search-shortcut"
                            aria-label="Control plus K">
                            <SiteUi name="Kbd" fallback="kbd" size="sm">Ctrl</SiteUi>
                            <span aria-hidden="true">+</span>
                            <SiteUi name="Kbd" fallback="kbd" size="sm">K</SiteUi>
                        </SiteUi>
                    </SiteUi>
                    <span class="header-control-slot"><AppearanceButton /></span>
                    <span class="header-control-slot"><ColorCustomizer /></span>
                    <SiteUi
                        name="Button"
                        fallback="button"
                        variant="ghost"
                        size="sm"
                        class="icon-button mobile-menu"
                        :aria-expanded="menuOpen"
                        aria-controls="sidebar"
                        aria-label="Toggle navigation"
                        @click="menuOpen = !menuOpen">
                        <Icon :name="menuOpen ? 'close' : 'menu'" />
                    </SiteUi>
                </div>
            </div>
            <span class="version">v0.1.0</span>
        </header>
        <template
            v-if="
                (frontmatter.home ||
                    frontmatter.catalogue ||
                    frontmatter.layout === 'themes' ||
                    frontmatter.layout === 'playground') &&
                menuOpen
            ">
            <button
                class="sidebar-backdrop"
                aria-label="Close navigation"
                @click="menuOpen = false"></button>
            <aside
                id="sidebar"
                class="sidebar is-open home-mobile-navigation"
                aria-label="Mobile navigation">
                <nav class="mobile-section-nav" aria-label="Sections">
                    <a href="/components/">Components</a>
                    <a href="/docs/welcome">Documentation</a>
                    <a href="/themes">Themes</a>
                    <a href="/playground">Playground</a>
                </nav>
                <section v-for="group in navigation" :key="group.title" class="nav-group">
                    <h2 v-if="!group.standalone">{{ group.title }}</h2>
                    <a v-for="item in group.items" :key="item.link" :href="item.link">
                        {{ item.text }}
                    </a>
                </section>
            </aside>
        </template>
        <template v-if="frontmatter.home">
            <main id="main-content" class="home-main">
                <Home />
                <noscript>
                    <h1>Interfaces with a little more soul.</h1>
                    <p>Reusable Vue 3 components, forms and layouts.</p>
                    <a href="/docs/welcome">Explore the documentation</a>
                </noscript>
            </main>
        </template>
        <main v-else-if="frontmatter.layout === 'themes'" id="main-content" class="themes-main">
            <Themes />
        </main>
        <main
            v-else-if="frontmatter.layout === 'playground'"
            id="main-content"
            class="playground-main">
            <Playground />
            <noscript>
                The interactive playground requires JavaScript. Browse
                <a href="/components/">components</a>
                for static API documentation.
            </noscript>
        </main>
        <main v-else-if="frontmatter.catalogue" id="main-content" class="catalogue-main">
            <Content class="prose" />
        </main>
        <div v-else class="docs-shell" :class="{ 'has-component-page': frontmatter.componentPage }">
            <button
                v-if="menuOpen"
                class="sidebar-backdrop"
                aria-label="Close navigation"
                @click="menuOpen = false"></button>
            <aside
                id="sidebar"
                class="sidebar"
                :class="{ 'is-open': menuOpen }"
                :aria-label="`${section} navigation`">
                <nav class="mobile-section-nav" aria-label="Sections">
                    <a href="/components/">Components</a>
                    <a href="/docs/welcome">Documentation</a>
                    <a href="/themes">Themes</a>
                    <a href="/playground">Playground</a>
                </nav>
                <Sidebar :key="section" :groups="navigation" :section="section" />
                <noscript v-html="noscriptNavigation" />
            </aside>
            <div class="docs-main">
                <div v-if="!frontmatter.componentPage" class="breadcrumb">
                    <span>{{ section === 'Documentation' ? 'Docs' : 'Library' }}</span>
                    <span>/</span>
                    <span>{{ section }}</span>
                </div>
                <div class="docs-columns">
                    <main
                        id="main-content"
                        class="doc-content"
                        :class="{ 'component-reference': frontmatter.component }">
                        <template v-if="page.isNotFound">
                            <div class="eyebrow">404 / A small detour</div>
                            <h1>This page wandered off.</h1>
                            <p>Let’s get you back to building something good.</p>
                            <a class="cta primary" href="/docs/welcome">Back to the docs</a>
                        </template>
                        <template v-else>
                            <ComponentPageHeader
                                v-if="frontmatter.componentPage"
                                :name="frontmatter.component"
                                :active="frontmatter.componentPage" />
                            <ComponentPageRedirect
                                v-if="frontmatter.redirectTo"
                                :to="frontmatter.redirectTo"
                                :part="frontmatter.redirectPart" />
                            <div v-if="frontmatter.banner" class="doc-banner">
                                <div>
                                    <span class="eyebrow">THE miru. WAY</span>
                                    <h2>
                                        Less boilerplate.
                                        <br />
                                        More possibility.
                                    </h2>
                                    <p>Your next great interface starts here.</p>
                                </div>
                                <div class="banner-sculpture" aria-hidden="true">
                                    <i></i>
                                    <i></i>
                                    <i></i>
                                    <i></i>
                                    <i></i>
                                </div>
                            </div>
                            <Content v-if="!frontmatter.redirectTo" class="prose" />
                        </template>
                    </main>
                    <aside v-if="headings.length" class="page-outline" aria-label="On this page">
                        <SiteUi
                            name="ScrollArea"
                            class="outline-scroll"
                            fit-content
                            orientation="vertical"
                            type="auto">
                            <div class="outline-links">
                                <h2>On this page</h2>
                                <a
                                    v-for="heading in headings"
                                    :key="heading.slug"
                                    :href="`#${heading.slug}`"
                                    :class="{ nested: heading.level > 2 }">
                                    {{ heading.title }}
                                </a>
                            </div>
                        </SiteUi>
                        <div class="outline-note">
                            <Icon name="heart" :size="17" />
                            <span>
                                With a little care...
                                <br />
                                in every component.
                            </span>
                        </div>
                    </aside>
                </div>
                <footer class="doc-footer">
                    <span>Crafted for Vue. Built for you.</span>
                    <a href="/docs/guide/installation">Start building</a>
                </footer>
            </div>
        </div>
        <footer class="site-footer">
            <div class="footer-frame">
                <div class="footer-content">
                    <div class="footer-brand">
                        <a class="footer-wordmark" href="/" aria-label="Miru home">
                            miru
                            <span>.</span>
                        </a>
                        <p>Small details. Better interfaces.</p>
                    </div>
                    <SiteTooltip text="rat.md is an OpenSource initiative by pytesNET" side="top">
                        <div
                            class="footer-initiative"
                            role="group"
                            aria-label="rat.md is an OpenSource initiative by pytesNET">
                            <a
                                class="footer-initiative-link"
                                href="https://rat.md"
                                aria-label="rat.md">
                                <span class="footer-initiative-rat" aria-hidden="true"></span>
                            </a>
                            <span class="footer-initiative-dot" aria-hidden="true">·</span>
                            <a
                                class="footer-initiative-link"
                                href="https://pytes.net"
                                aria-label="pytes.net">
                                <span class="footer-initiative-pytesnet" aria-hidden="true"></span>
                            </a>
                        </div>
                    </SiteTooltip>
                    <div class="footer-meta">
                        <div class="footer-legal">
                            <p>
                                © 2025 – {{ currentYear }}
                                <SiteUi
                                    name="Anchor"
                                    fallback="a"
                                    href="https://rat.md"
                                    variant="muted"
                                    animation="slide">
                                    rat.md
                                </SiteUi>
                            </p>
                            <p>Published under MIT License</p>
                        </div>
                        <nav class="footer-socials" aria-label="Miru project links">
                            <SiteTooltip text="Visit miru. on GitHub">
                                <a
                                    href="https://github.com/RatMD/miru"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Miru on GitHub">
                                    <IconBrandGithub :size="21" aria-hidden="true" />
                                </a>
                            </SiteTooltip>
                            <SiteTooltip text="Visit miru. on Storybook">
                                <a
                                    href="https://storybook.miru.at"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Miru Storybook">
                                    <IconBrandStorybook :size="21" aria-hidden="true" />
                                </a>
                            </SiteTooltip>
                        </nav>
                    </div>
                </div>
                <div class="footer-paws">
                    <button
                        class="footer-paw-button"
                        type="button"
                        aria-label="Toggle paw cursor"
                        :aria-pressed="pawCursorEnabled"
                        @dblclick.prevent="togglePawCursor"
                        @keydown.enter.prevent="togglePawCursor"
                        @keydown.space.prevent="togglePawCursor">
                        <IconPawFilled
                            :size="44"
                            aria-hidden="true"
                            :style="{
                                '--paw-animation': pawAnimation
                                    ? `footer-paw-${pawAnimation}`
                                    : 'none',
                                '--paw-duration': pawAnimation === 'play' ? '24s' : '2.4s',
                            }"
                            @animationend="schedulePawAnimation" />
                    </button>
                </div>
            </div>
        </footer>
        <Search ref="search" />
        <Teleport v-if="pawCursorEnabled" to="body">
            <span
                v-for="print in pawPrints"
                :key="print.id"
                class="paw-click-print"
                aria-hidden="true"
                :style="{ left: `${print.x}px`, top: `${print.y}px` }" />
        </Teleport>
    </div>
</template>
<script setup lang="ts">
import { IconBrandGithub, IconBrandStorybook, IconPawFilled } from '@tabler/icons-vue';
import { useData, useRoute, defineClientComponent } from 'vitepress';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import ComponentPageHeader from './components/ComponentPageHeader.vue';
import ComponentPageRedirect from './components/ComponentPageRedirect.vue';
import Home from './components/Home.vue';
import Icon from './components/Icon.vue';
import MiruMark from './components/MiruMark.vue';
import Search from './components/Search.vue';
import SiteTooltip from './components/SiteTooltip.vue';
import SiteUi from './components/SiteUi.vue';
import Themes from './components/Themes.vue';
import { documentationNavigation, componentNavigation } from './navigation';
const Sidebar = defineClientComponent(() => import('./components/Sidebar.vue'));
const ColorCustomizer = defineClientComponent(() => import('./components/ColorCustomizer.vue'));
const AppearanceButton = defineClientComponent(() => import('./components/AppearanceButton.vue'));
const Playground = defineClientComponent(() => import('./playground/Playground.vue'));
const PreviewRuntime = defineClientComponent(() => import('./playground/PreviewRuntime.vue'));
const { frontmatter, page } = useData();
const route = useRoute();
const currentYear = new Date().getFullYear();
const pawCursorEnabled = ref(false);
const pawPrints = ref<{ id: number; x: number; y: number }[]>([]);
const pawPrintTimers = new Map<number, ReturnType<typeof setTimeout>>();
let nextPawPrintId = 0;
function removePawPrint(id: number) {
    clearTimeout(pawPrintTimers.get(id));
    pawPrintTimers.delete(id);
    pawPrints.value = pawPrints.value.filter((print) => print.id !== id);
}
function clearPawPrints() {
    pawPrintTimers.forEach((timer) => clearTimeout(timer));
    pawPrintTimers.clear();
    pawPrints.value = [];
}
function leavePawPrint(event: MouseEvent) {
    if (!pawCursorEnabled.value || event.button !== 0 || event.detail === 0) return;
    if (event.target instanceof Element && event.target.closest('.footer-paw-button')) return;
    if (pawPrints.value.length >= 24) removePawPrint(pawPrints.value[0]!.id);
    const id = nextPawPrintId++;
    pawPrints.value.push({ id, x: event.clientX, y: event.clientY });
    pawPrintTimers.set(
        id,
        setTimeout(() => removePawPrint(id), 1100),
    );
}
function togglePawCursor() {
    pawCursorEnabled.value = !pawCursorEnabled.value;
    document.documentElement.classList.toggle('has-paw-cursor', pawCursorEnabled.value);
    if (!pawCursorEnabled.value) clearPawPrints();
}
const pawAnimation = ref('');
const pawAnimations = ['play', 'peek', 'twirl', 'stretch'];
let previousPawAnimation = '';
let pawTimer: ReturnType<typeof setTimeout> | undefined;
let pawMotionPreference: MediaQueryList | undefined;
function schedulePawAnimation() {
    clearTimeout(pawTimer);
    pawAnimation.value = '';
    if (pawMotionPreference?.matches) return;
    pawTimer = setTimeout(
        () => {
            const choices = pawAnimations.filter((animation) => animation !== previousPawAnimation);
            previousPawAnimation = choices[Math.floor(Math.random() * choices.length)]!;
            pawAnimation.value = previousPawAnimation;
        },
        3000 + Math.random() * 5000,
    );
}
onMounted(() => {
    document.addEventListener('click', leavePawPrint, { capture: true, passive: true });
    pawMotionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    pawMotionPreference.addEventListener('change', schedulePawAnimation);
    schedulePawAnimation();
});
onUnmounted(() => {
    document.removeEventListener('click', leavePawPrint, true);
    clearPawPrints();
    document.documentElement.classList.remove('has-paw-cursor');
    clearTimeout(pawTimer);
    pawMotionPreference?.removeEventListener('change', schedulePawAnimation);
});
const menuOpen = ref(false);
const search = ref<InstanceType<typeof Search>>();
const section = computed(() =>
    route.path.startsWith('/components') ||
    route.path.startsWith('/layouts') ||
    route.path.startsWith('/reference/components')
        ? 'Components'
        : route.path.startsWith('/playground') || route.path.startsWith('/examples')
          ? 'Playground'
          : route.path.startsWith('/themes')
            ? 'Themes'
            : 'Documentation',
);
const navigation = computed(() =>
    section.value === 'Components' ? componentNavigation : documentationNavigation,
);
// With scripting enabled, browsers parse noscript contents as text. Render its
// fallback as HTML so Vue does not try to hydrate a v-for fragment inside it.
const escapeHtml = (value: string) =>
    value.replace(
        /[&<>"']/g,
        (character) =>
            ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!,
    );
const noscriptNavigation = computed(() =>
    navigation.value
        .map(
            (group) =>
                `<section class="nav-group">${group.standalone ? '' : `<h2>${escapeHtml(group.title)}</h2>`}${group.items.map((item) => `<a href="${escapeHtml(item.link)}">${escapeHtml(item.text)}</a>`).join('')}</section>`,
        )
        .join(''),
);
const headings = computed(() => page.value.headers.flatMap((h) => [h, ...(h.children || [])]));
const isCurrent = (link: string) => route.path.replace(/\/$/, '') === link.replace(/\/$/, '');
watch(
    () => route.path,
    () => {
        menuOpen.value = false;
    },
);
</script>
