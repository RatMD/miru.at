<template>
    <section class="themes-stage" aria-labelledby="themes-title" :style="paletteStyle">
        <div class="themes-aurora" aria-hidden="true">
            <i></i>
            <i></i>
            <i></i>
        </div>
        <div class="themes-copy">
            <span class="themes-status">
                <span></span>
                THEMES · COMING SOON
            </span>
            <h1 id="themes-title">
                The whole soul.
                <br />
                One cohesive
                <em>mood.</em>
            </h1>
            <p class="themes-description">
                Complete templates. Considered down to the last detail.
                <br />
                We’re crafting complete design templates for miru. — layouts, pages and components
                that belong together. One character, from the first screen to the final click.
            </p>
            <div class="themes-mood-selector">
                <span>Try a different mood</span>
                <div class="spectrum-moods" role="group" aria-label="Choose a colour palette">
                    <button
                        v-for="preset in presets"
                        :key="preset.id"
                        type="button"
                        :aria-label="`Use ${preset.name} palette`"
                        :title="preset.name"
                        :aria-pressed="profile.preset === preset.id"
                        :style="{
                            '--mood': preset.colors[0],
                            '--mood-secondary': preset.colors[1],
                        }"
                        @click="selectPreset(preset.id)" />
                </div>
            </div>
        </div>
        <div class="themes-art">
            <div class="themes-orbit themes-orbit-one" aria-hidden="true"></div>
            <div class="themes-orbit themes-orbit-two" aria-hidden="true"></div>
            <span class="themes-art-note" aria-hidden="true">
                Every page.
                <br />
                <em>One shared soul.</em>
            </span>
            <div
                class="themes-preview"
                role="img"
                :aria-label="`Dashboard design template concept in the ${schemeName} palette`">
                <div class="themes-preview-top">
                    <span>miru.</span>
                    <span>
                        <i></i>
                        TEMPLATE CONCEPT / 01
                    </span>
                </div>
                <div class="themes-preview-body">
                    <div class="themes-preview-sidebar" aria-hidden="true">
                        <MiruMark class="themes-mini-logo" />
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                    </div>
                    <div class="themes-preview-content">
                        <span class="themes-preview-eyebrow">THE BIG PICTURE</span>
                        <strong>
                            Every insight.
                            <br />
                            One clear view
                            <span>.</span>
                        </strong>
                        <div class="themes-preview-chart" aria-hidden="true">
                            <i
                                v-for="(height, index) in bars"
                                :key="index"
                                :style="{ height: `${height}%`, '--bar-index': index }"></i>
                        </div>
                        <div class="themes-preview-bottom">
                            <span>
                                <i></i>
                                Your overview, thoughtfully composed.
                            </span>
                            <span class="themes-preview-plus" aria-hidden="true">+</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="themes-bottom">
            <div>
                <span class="themes-work-dot" aria-hidden="true"></span>
                <p>
                    <strong>Good things take a little shaping.</strong>
                    <br />
                    We’re working on it. Stay curious.
                </p>
            </div>
            <SiteUi
                name="Button"
                fallback="a"
                as="a"
                variant="outline"
                size="lg"
                href="/components/">
                Explore the primitives
                <Icon name="arrow-right" :size="17" />
            </SiteUi>
        </div>
    </section>
</template>
<script setup lang="ts">
import { presets } from '../colors/engine';
import { profile, schemeName, selectPreset } from '../colors/store';
import Icon from './Icon.vue';
import MiruMark from './MiruMark.vue';
import SiteUi from './SiteUi.vue';

const bars = [28, 43, 35, 62, 50, 76, 65, 92, 80, 100];
const paletteStyle = {
    '--theme-accent': 'var(--ui-primary-400)',
    '--theme-secondary': 'var(--ui-secondary-400)',
    '--theme-ink': 'var(--ui-primary-950)',
};
</script>
<style scoped>
.themes-stage {
    position: relative;
    isolation: isolate;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 48px 36px;
    min-height: calc(100svh - 220px);
    margin: auto;
    padding: 90px 32px 48px;
    overflow: hidden;
}
.themes-aurora {
    position: absolute;
    inset: 0;
    z-index: -1;
    overflow: hidden;
    pointer-events: none;
}
.themes-aurora i {
    position: absolute;
    width: 520px;
    height: 520px;
    border-radius: 50%;
    filter: blur(95px);
    opacity: 0.12;
    background: var(--theme-accent);
    transition: background 1.2s ease;
    animation: themes-drift 16s ease-in-out infinite alternate;
}
.themes-aurora i:first-child {
    top: -240px;
    right: -100px;
}
.themes-aurora i:nth-child(2) {
    width: 350px;
    height: 350px;
    right: 20%;
    bottom: 0;
    background: var(--theme-secondary);
    animation-delay: -8s;
}
.themes-aurora i:last-child {
    left: -300px;
    top: 30%;
    opacity: 0.06;
    animation-delay: -4s;
}
.themes-copy {
    position: relative;
    z-index: 1;
}
.themes-status {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: var(--ui-muted-foreground);
    font: 10px/1.5 var(--ui-font-mono, monospace);
    letter-spacing: 0.17em;
}
.themes-status > span,
.themes-work-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--theme-accent);
    box-shadow: 0 0 18px var(--theme-accent);
    transition:
        background 0.8s,
        box-shadow 0.8s;
}
.themes-copy h1 {
    margin: 28px 0 24px;
    font-size: clamp(42px, 4.2vw, 68px);
    letter-spacing: -0.065em;
    line-height: 1.06;
    font-weight: 650;
}
.themes-copy h1 em {
    font-family: Georgia, serif;
    font-weight: 400;
    background: linear-gradient(
        110deg,
        var(--theme-accent),
        var(--theme-secondary),
        var(--theme-accent)
    );
    background-size: 200% 100%;
    background-clip: text;
    color: transparent;
    animation: themes-shimmer 7s ease-in-out infinite;
}
.themes-description {
    max-width: 420px;
    margin: 0;
    color: var(--ui-muted-foreground);
    font-size: 15px;
    line-height: 1.9;
}
.themes-mood-selector {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 14px;
    margin-top: 34px;
    color: var(--ui-muted-foreground);
    font-size: 11px;
}
.themes-mood-selector .spectrum-moods {
    flex-wrap: wrap;
}
.themes-art {
    position: relative;
    min-width: 0;
    padding: 70px 10px 45px;
    perspective: 1100px;
}
.themes-orbit {
    position: absolute;
    inset: 10px -30px;
    border: 1px solid color-mix(in srgb, var(--theme-accent) 18%, transparent);
    border-radius: 50%;
    transform: rotate(-25deg);
    transition: border-color 1s;
    pointer-events: none;
}
.themes-orbit-two {
    inset: 45px -45px;
    transform: rotate(25deg);
    border-style: dashed;
    opacity: 0.55;
}
.themes-art-note {
    position: absolute;
    right: 14px;
    top: 0;
    transform: rotate(7deg);
    color: var(--ui-muted-foreground);
    font:
        italic 15px/1.5 Georgia,
        serif;
}
.themes-art-note em {
    color: var(--ui-foreground);
}
.themes-preview {
    position: relative;
    overflow: hidden;
    border: 1px solid color-mix(in srgb, var(--theme-accent) 35%, #34343b);
    border-radius: 16px;
    background: #15151c;
    color: #f4f4f5;
    box-shadow:
        0 30px 80px #0003,
        0 0 70px color-mix(in srgb, var(--theme-accent) 10%, transparent);
    transform: rotateY(-9deg) rotateX(5deg) rotate(-3deg);
    animation: themes-float 9s ease-in-out infinite;
    transition:
        border-color 0.8s,
        box-shadow 0.8s;
}
.themes-preview-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 22px;
    border-bottom: 1px solid #ffffff12;
}
.themes-preview-top > span:first-child {
    font-weight: 700;
    font-size: 20px;
    letter-spacing: -0.06em;
}
.themes-preview-top > span:last-child {
    display: flex;
    align-items: center;
    gap: 7px;
    font: 8px monospace;
    letter-spacing: 0.1em;
    color: #a1a1aa;
}
.themes-preview-top i,
.themes-preview-bottom i {
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--theme-accent);
    transition: background 0.8s;
}
.themes-preview-body {
    display: grid;
    grid-template-columns: 60px 1fr;
}
.themes-preview-sidebar {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    padding: 25px 15px;
    border-right: 1px solid #ffffff12;
}
.themes-preview-sidebar .themes-mini-logo {
    --miru-mark-front: var(--theme-ink);
    --miru-mark-side: color-mix(in srgb, var(--theme-ink) 80%, var(--theme-accent));
    --miru-mark-depth: color-mix(in srgb, var(--theme-ink) 60%, var(--theme-accent));
    --miru-mark-shadow: var(--theme-accent);
    --miru-mark-edge: var(--theme-ink);
    display: block;
    width: 27px;
    height: 27px;
    flex-shrink: 0;
}
.themes-mini-logo :deep(.miru-mark-tile) {
    fill: var(--theme-accent);
    stroke: color-mix(in srgb, var(--theme-accent) 80%, var(--theme-ink));
}
.themes-preview-sidebar > i {
    width: 15px;
    height: 4px;
    border-radius: 3px;
    background: #ffffff25;
}
.themes-preview-sidebar > i:nth-child(2) {
    background: var(--theme-accent);
    transition: background 0.8s;
}
.themes-preview-content {
    padding: 28px 26px 20px;
    min-width: 0;
    background: radial-gradient(ellipse at 100% 0%, var(--theme-ink), transparent 90%);
}
.themes-preview-eyebrow {
    color: #a1a1aa;
    font: 8px monospace;
    letter-spacing: 0.16em;
}
.themes-preview-content > strong {
    display: block;
    margin-top: 14px;
    font-size: clamp(22px, 2.4vw, 32px);
    line-height: 1.15;
    letter-spacing: -0.045em;
    font-weight: 550;
}
.themes-preview-content > strong > span {
    color: var(--theme-accent);
    transition: color 0.8s;
}
.themes-preview-chart {
    display: flex;
    align-items: end;
    gap: 8px;
    height: 100px;
    margin: 28px 0 20px;
    border-bottom: 1px solid #ffffff14;
}
.themes-preview-chart i {
    flex: 1;
    border-radius: 4px 4px 0 0;
    background: linear-gradient(
        to top,
        color-mix(in srgb, var(--theme-accent) 18%, #15151c),
        var(--theme-accent)
    );
    opacity: calc(0.4 + var(--bar-index) * 0.065);
    transform-origin: bottom;
    animation: themes-grow 5s ease-in-out infinite alternate;
    animation-delay: calc(var(--bar-index) * -0.35s);
}
.themes-preview-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 9px;
    color: #a1a1aa;
}
.themes-preview-bottom i {
    margin-right: 4px;
}
.themes-preview-plus {
    display: grid;
    place-items: center;
    width: 30px;
    height: 28px;
    border-radius: 6px;
    color: var(--theme-ink);
    background: var(--theme-accent);
    font-size: 19px;
    transition:
        background 0.8s,
        color 0.8s;
}
.themes-bottom {
    grid-column: 1 / -1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    border-top: 1px solid var(--ui-border);
    padding-top: 28px;
}
.themes-bottom > div {
    display: flex;
    align-items: center;
    gap: 14px;
}
.themes-work-dot {
    flex: none;
}
.themes-bottom p {
    margin: 0;
    color: var(--ui-muted-foreground);
    font-size: 12px;
    line-height: 1.9;
}
.themes-bottom strong {
    color: var(--ui-foreground);
    font-weight: 500;
}
@keyframes themes-drift {
    to {
        transform: translate(70px, 55px) scale(1.12);
    }
}
@keyframes themes-shimmer {
    50% {
        background-position: 100% 50%;
    }
}
@keyframes themes-float {
    50% {
        transform: translateY(-12px) rotateY(-5deg) rotateX(3deg) rotate(-1deg);
    }
}
@keyframes themes-grow {
    to {
        transform: scaleY(0.75);
    }
}
@media (max-width: 1000px) {
    .themes-stage {
        padding: 80px 30px 36px;
        gap: 40px 20px;
    }
    .themes-preview-body {
        grid-template-columns: 42px 1fr;
    }
    .themes-preview-content {
        padding-inline: 18px;
    }
    .themes-preview-chart {
        gap: 5px;
    }
}
@media (max-width: 760px), (min-width: 1100px) and (max-width: 1399px) {
    .themes-stage {
        grid-template-columns: minmax(0, 1fr);
        padding: 60px 24px 32px;
        gap: 30px;
    }
    .themes-copy h1 {
        font-size: clamp(46px, 9vw, 70px);
    }
    .themes-art {
        width: min(100%, 500px);
        justify-self: center;
        padding-top: 55px;
    }
    .themes-bottom {
        align-items: flex-start;
        flex-direction: column;
    }
    .themes-preview-content > strong {
        font-size: 30px;
    }
}
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation: none !important;
        transition: none !important;
    }
}
</style>
