<template>
    <section class="lost-page" aria-labelledby="lost-title">
        <div class="lost-grid" aria-hidden="true"></div>
        <div class="lost-content">
            <p class="lost-eyebrow">
                <span class="lost-status">
                    <SiteUi
                        name="Indicator"
                        fallback="span"
                        class="lost-indicator"
                        color="current"
                        ping
                        aria-hidden="true" />
                    ERROR 404 / SEEMS A LITTLE LOST.
                </span>
                <span class="lost-company">STILL IN GOOD COMPANY.</span>
            </p>
            <div class="lost-scene">
                <div class="lost-numbers">
                    <span class="lost-four lost-four--first" aria-hidden="true">4</span>
                    <div class="lost-zero">
                        <span class="lost-orbit" aria-hidden="true"></span>
                        <span class="lost-orbit lost-orbit--inner" aria-hidden="true"></span>
                        <span class="lost-spark lost-spark--one" aria-hidden="true">✦</span>
                        <span class="lost-spark lost-spark--two" aria-hidden="true">+</span>
                        <SiteTooltip text="Give it a nudge" :delay-duration="550" side="bottom">
                            <button
                                class="lost-mark"
                                type="button"
                                aria-label="Give it a nudge"
                                @click="nudges++">
                                <span :key="nudges" class="lost-mark-art"><MiruMark /></span>
                            </button>
                        </SiteTooltip>
                    </div>
                    <span class="lost-four lost-four--last" aria-hidden="true">4</span>
                </div>
                <span class="lost-note" aria-hidden="true">
                    Gone exploring.
                    <br />
                    <em>Back shortly. Probably.</em>
                </span>
            </div>
            <div class="lost-copy">
                <h1 id="lost-title">
                    Well, this is a bit of a
                    <em>detour.</em>
                </h1>
                <p>
                    This page seems to have nipped out for a cuppa.
                    <br class="lost-line-break" />
                    No need to put the kettle on — let’s get you somewhere lovely.
                </p>
                <div class="lost-actions">
                    <SiteUi name="Button" fallback="a" as="a" href="/" variant="primary" size="lg">
                        Back to familiar ground
                        <Icon name="arrow-right" :size="17" />
                    </SiteUi>
                    <SiteUi
                        name="Button"
                        fallback="button"
                        type="button"
                        variant="outline"
                        size="lg"
                        @click="emit('search')">
                        <Icon name="search" :size="17" />
                        Search the docs
                    </SiteUi>
                </div>
                <p class="lost-footnote">
                    Rather take the scenic route?
                    <a href="/gotta-catch-em-all">
                        Explore the components
                        <span aria-hidden="true">↗</span>
                    </a>
                </p>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Icon from './Icon.vue';
import MiruMark from './MiruMark.vue';
import SiteTooltip from './SiteTooltip.vue';
import SiteUi from './SiteUi.vue';

const emit = defineEmits<{ search: [] }>();
const nudges = ref(0);
</script>

<style scoped>
.lost-page {
    position: relative;
    isolation: isolate;
    overflow: clip;
    padding: 52px 24px 42px;
    color: var(--ui-foreground);
    background: radial-gradient(
        ellipse at 50% 35%,
        color-mix(in srgb, var(--ui-accent-500) 9%, transparent),
        transparent 62%
    );
}
.lost-grid {
    position: absolute;
    z-index: -1;
    inset: -30% -10%;
    background-image:
        linear-gradient(color-mix(in srgb, var(--ui-border) 42%, transparent) 1px, transparent 1px),
        linear-gradient(
            90deg,
            color-mix(in srgb, var(--ui-border) 42%, transparent) 1px,
            transparent 1px
        );
    background-size: 56px 56px;
    transform: perspective(900px) rotateX(24deg) rotateZ(-10deg);
    mask-image: radial-gradient(ellipse at center, black, transparent 67%);
    pointer-events: none;
}
.lost-content {
    max-width: 920px;
    margin: 0 auto;
    text-align: center;
}
.lost-eyebrow {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px 18px;
    margin: 0;
    color: var(--ui-muted-foreground);
    font: 10px/1.5 var(--ui-font-mono, monospace);
    letter-spacing: 0.16em;
}
.lost-status {
    display: inline-flex;
    align-items: center;
    gap: 10px;
}
.lost-company {
    color: var(--ui-accent-text);
}
.lost-indicator {
    width: 6px;
    height: 6px;
    flex-shrink: 0;
    border-radius: 50%;
    color: var(--ui-accent-text);
    background: var(--ui-accent-text);
    box-shadow: 0 0 14px color-mix(in srgb, var(--ui-accent-500) 55%, transparent);
}
.lost-scene {
    position: relative;
    width: min(100%, 720px);
    margin: 24px auto 16px;
}
.lost-numbers {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: clamp(0px, 2vw, 24px);
    height: clamp(170px, 24vw, 285px);
}
.lost-four {
    font-family: var(--ui-font-sans, sans-serif);
    font-size: clamp(150px, 24vw, 290px);
    font-weight: 750;
    letter-spacing: -0.09em;
    line-height: 1;
    color: color-mix(in srgb, var(--ui-accent-text) 16%, var(--ui-background));
    text-shadow: 5px 6px 0 color-mix(in srgb, var(--ui-accent-500) 6%, transparent);
}
.lost-four--first {
    transform: rotate(-8deg) translateY(8px);
}
.lost-four--last {
    transform: rotate(8deg) translateY(-4px);
}
.lost-zero {
    position: relative;
    flex: 0 0 clamp(144px, 22vw, 250px);
    aspect-ratio: 1;
    display: grid;
    place-items: center;
    animation: lost-arrive 850ms cubic-bezier(0.2, 0.7, 0.25, 1) both;
}
.lost-orbit {
    position: absolute;
    inset: 0;
    border: 1px dashed color-mix(in srgb, var(--ui-accent-text) 38%, transparent);
    border-radius: 50%;
    transform: rotate(-25deg) scaleY(0.86);
}
.lost-orbit--inner {
    inset: 12%;
    border-style: solid;
    border-color: color-mix(in srgb, var(--ui-accent-text) 12%, transparent);
    transform: rotate(25deg) scaleY(1.1);
}
.lost-mark {
    padding: 0;
    border: 0;
    border-radius: 30%;
    background: transparent;
    cursor: pointer;
    width: 66%;
    display: block;
    filter: drop-shadow(0 24px 20px color-mix(in srgb, var(--ui-accent-950) 18%, transparent));
    animation: lost-float 6s ease-in-out infinite;
}
.lost-mark :deep(svg) {
    width: 100%;
    height: auto;
    display: block;
}
.lost-mark-art {
    display: block;
    animation: lost-arrive 850ms cubic-bezier(0.2, 0.7, 0.25, 1) both;
}
.lost-spark {
    position: absolute;
    color: var(--ui-accent-text);
    line-height: 1;
}
.lost-spark--one {
    top: 8%;
    right: 5%;
    font-size: 28px;
    animation: lost-twinkle 5s ease-in-out infinite;
}
.lost-spark--two {
    bottom: 10%;
    left: 0;
    font: 23px monospace;
    opacity: 0.55;
}
.lost-note {
    position: absolute;
    right: -8px;
    top: 32px;
    transform: rotate(8deg);
    text-align: left;
    color: var(--ui-muted-foreground);
    font:
        italic 14px/1.55 Georgia,
        serif;
}
.lost-note em {
    color: var(--ui-accent-text);
}
.lost-mark:focus-visible,
.lost-footnote a:focus-visible {
    outline: 2px solid var(--ui-accent-text);
    outline-offset: 5px;
}
.lost-copy h1 {
    margin: 26px 0 16px;
    font-size: clamp(30px, 3.8vw, 48px);
    line-height: 1.13;
    font-weight: 650;
    letter-spacing: -0.05em;
}
.lost-copy h1 em {
    color: var(--ui-accent-text);
    font-family: Georgia, serif;
    font-weight: 400;
}
.lost-copy > p {
    color: var(--ui-muted-foreground);
    font-size: 14px;
    line-height: 1.85;
}
.lost-actions {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;
    margin: 26px 0 24px;
}
.lost-copy .lost-footnote {
    margin: 0;
    font-size: 11px;
}
.lost-footnote a {
    color: var(--ui-foreground);
    text-decoration: underline;
    text-decoration-color: var(--ui-border);
    text-underline-offset: 4px;
    transition: color 180ms;
}
.lost-footnote a:hover {
    color: var(--ui-accent-text);
}
@keyframes lost-float {
    0%,
    100% {
        transform: translateY(3px) rotate(-9deg);
    }
    50% {
        transform: translateY(-10px) rotate(3deg);
    }
}
@keyframes lost-arrive {
    from {
        opacity: 0;
        transform: translateY(-18px) rotate(-30deg) scale(0.85);
    }
    to {
        opacity: 1;
        transform: translateY(0) rotate(0) scale(1);
    }
}
@keyframes lost-twinkle {
    0%,
    100% {
        opacity: 0.4;
        transform: scale(0.8) rotate(0);
    }
    50% {
        opacity: 1;
        transform: scale(1) rotate(25deg);
    }
}
@media (max-width: 760px) {
    .lost-page {
        padding-top: 36px;
    }
    .lost-note {
        right: 0;
        top: 12px;
        font-size: 11px;
    }
    .lost-copy h1 {
        max-width: 440px;
        margin-inline: auto;
    }
}
@media (max-width: 480px) {
    .lost-scene {
        margin-top: 40px;
    }
    .lost-note {
        top: -24px;
        right: 8px;
        font-size: 10px;
    }
    .lost-numbers {
        gap: 0;
    }
    .lost-four {
        font-size: 140px;
    }
    .lost-zero {
        flex-basis: 135px;
    }
    .lost-line-break {
        display: none;
    }
    .lost-copy > p {
        font-size: 13px;
    }
    .lost-actions {
        flex-direction: column;
        align-items: stretch;
        max-width: 320px;
        margin-inline: auto;
    }
}
@media (prefers-reduced-motion: reduce) {
    .lost-page *,
    .lost-page *::before,
    .lost-page *::after {
        animation: none !important;
        transition: none !important;
    }
}
</style>
