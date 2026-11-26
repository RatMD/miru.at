<template>
    <Dialog v-model:open="open">
        <Teleport to="body">
            <Transition name="spectrum-celebrate">
                <div v-if="open" class="spectrum-celebration" aria-hidden="true">
                    <div class="spectrum-celebration-veil" aria-hidden="true"></div>
                    <div class="spectrum-star-shower" aria-hidden="true">
                        <IconStarFilled v-for="star in stars" :key="star.id" :style="star.style" />
                    </div>
                    <div class="spectrum-paw-trail" aria-hidden="true">
                        <IconPawFilled v-for="paw in paws" :key="paw.id" :style="paw.style" />
                    </div>
                </div>
            </Transition>
        </Teleport>
        <DialogContent
            class="spectrum-celebration-card"
            close-label="Close celebration"
            show-close
            @pointer-down-outside.prevent
            @interact-outside.prevent>
            <span class="spectrum-celebration-emblem" aria-hidden="true">
                <IconPawFilled />
                <IconSparkles />
            </span>
            <Badge variant="accent">EVERY BUTTON. A LITTLE DISCOVERY.</Badge>
            <DialogTitle>
                You're curious?
                <br />
                <em>That's Pawesome.</em>
            </DialogTitle>
            <DialogDescription>
                So, congratulations! You found this small secret, but you've still way much more to
                discover.
            </DialogDescription>
            <Button variant="primary" @click="open = false">
                Stay Curious
                <IconSparkles :size="16" />
            </Button>
        </DialogContent>
    </Dialog>
</template>

<script lang="ts" setup>
import { Button, Badge, Dialog, DialogContent, DialogTitle, DialogDescription } from '@rat.md/miru';
import { IconPawFilled, IconStarFilled, IconSparkles } from '@tabler/icons-vue';

const open = defineModel<boolean>({ default: false });
// Fixed, repeatable positions avoid layout shifts and make the trail feel intentional.
const stars = Array.from({ length: 32 }, (_, id) => ({
    id,
    style: {
        '--x': `${(id * 37 + 7) % 100}%`,
        '--delay': `${(id % 9) * 0.12}s`,
        '--duration': `${2.2 + (id % 5) * 0.23}s`,
        '--size': `${8 + (id % 4) * 5}px`,
        '--drift': `${(id % 2 ? 1 : -1) * (20 + (id % 60))}px`,
    },
}));
const paws = Array.from({ length: 12 }, (_, id) => ({
    id,
    style: {
        '--x': `${-5 + id * 10}%`,
        '--y': `${80 - id * 5 + (id % 2 ? 5 : -5)}%`,
        '--delay': `${id * 0.22}s`,
        '--angle': `${32 + (id % 2 ? 12 : -12)}deg`,
    },
}));
</script>

<style>
.spectrum-celebration {
    position: fixed;
    inset: 0;
    z-index: 110;
    display: grid;
    place-items: center;
    padding: 24px;
    isolation: isolate;
    pointer-events: none;
}
.spectrum-celebration-veil {
    position: absolute;
    inset: 0;
    z-index: -1;
    backdrop-filter: blur(7px);
    background: color-mix(in srgb, var(--ui-background) 60%, transparent);
}
.spectrum-star-shower,
.spectrum-paw-trail {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
}
.spectrum-star-shower svg {
    position: absolute;
    left: var(--x);
    top: -40px;
    width: var(--size);
    height: var(--size);
    color: var(--ui-accent-400);
    animation: spectrum-star-fall var(--duration) var(--delay) ease-in both;
}
.spectrum-star-shower svg:nth-child(3n) {
    color: var(--ui-primary-400);
}
.spectrum-star-shower svg:nth-child(4n) {
    color: var(--ui-warning-400);
}
.spectrum-paw-trail svg {
    position: absolute;
    left: var(--x);
    top: var(--y);
    width: clamp(28px, 4vw, 54px);
    height: auto;
    color: color-mix(in srgb, var(--ui-accent-500) 45%, transparent);
    transform: rotate(var(--angle));
    animation: spectrum-paw-step 2s var(--delay) ease-out both;
}
.spectrum-celebration-card {
    position: fixed;
    z-index: 111;
    display: block;
    width: min(calc(100% - 48px), 490px);
    padding: 35px 28px;
    text-align: center;
    border: 1px solid color-mix(in srgb, var(--ui-accent-500) 35%, var(--ui-border));
    border-radius: 28px;
    background: var(--ui-background);
    box-shadow: 0 30px 100px -35px color-mix(in srgb, var(--ui-accent-700) 50%, transparent);
    animation: spectrum-card-in 480ms cubic-bezier(0.16, 1, 0.3, 1) both;
}
.spectrum-celebration-emblem {
    display: block;
    position: relative;
    width: 68px;
    height: 68px;
    margin: 0 auto 22px;
    color: var(--ui-accent-text, var(--ui-accent));
}
.spectrum-celebration-emblem > svg:first-child {
    width: 60px;
    height: 60px;
    transform: rotate(-12deg);
}
.spectrum-celebration-emblem > svg:last-child {
    position: absolute;
    width: 25px;
    right: -7px;
    top: -6px;
    color: var(--ui-warning-500);
}
.spectrum-celebration-card h2 {
    font-size: clamp(27px, 4vw, 35px);
    line-height: 1.2;
    letter-spacing: -1px;
    margin: 20px 0 16px;
    font-weight: 600;
    color: var(--ui-foreground);
}
.spectrum-celebration-card h2 em {
    font-family: Georgia, serif;
    font-weight: 400;
    color: var(--ui-accent-text, var(--ui-accent));
}
.spectrum-celebration-card p {
    color: var(--ui-muted-foreground);
    font-size: 14px;
    line-height: 1.8;
    margin-bottom: 22px;
}
.spectrum-celebrate-enter-active,
.spectrum-celebrate-leave-active {
    transition: opacity 240ms ease;
}
.spectrum-celebrate-enter-from,
.spectrum-celebrate-leave-to {
    opacity: 0;
}
@keyframes spectrum-star-fall {
    0% {
        opacity: 0;
        transform: translateY(-20px) rotate(0);
    }
    12% {
        opacity: 0.9;
    }
    100% {
        opacity: 0;
        transform: translate(var(--drift), 105dvh) rotate(240deg);
    }
}
@keyframes spectrum-paw-step {
    0% {
        opacity: 0;
        scale: 0.65;
    }
    12%,
    60% {
        opacity: 1;
        scale: 1;
    }
    100% {
        opacity: 0;
        scale: 1;
    }
}
@keyframes spectrum-card-in {
    from {
        opacity: 0;
        transform: translateY(15px) scale(0.96);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}
@media (prefers-reduced-motion: reduce) {
    .spectrum-star-shower,
    .spectrum-paw-trail {
        display: none;
    }
    .spectrum-celebration-card {
        animation: none;
    }
    .spectrum-celebrate-enter-active,
    .spectrum-celebrate-leave-active {
        transition: none;
    }
}
</style>
