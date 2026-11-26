<template>
    <section
        class="readonly-code"
        :class="{ 'is-embedded': embedded, 'is-single-line': !source.includes('\n') }"
        :aria-label="label">
        <div class="readonly-code-tools">
            <span v-if="language && language !== 'text'" class="readonly-code-language">
                {{ language }}
            </span>
            <TooltipProvider
                :delay-duration="150"
                disable-closing-trigger
                ignore-non-keyboard-focus>
                <Tooltip v-model:open="tooltipOpen">
                    <TooltipTrigger as-child>
                        <ButtonAction
                            variant="outline"
                            size="sm"
                            :aria-label="copied ? 'Copied' : 'Copy Code'"
                            :aria-busy="copying || undefined"
                            :disabled="copying"
                            @click="copy">
                            <IconClipboardCheck v-if="copied" :size="16" aria-hidden="true" />
                            <IconClipboard v-else :size="16" aria-hidden="true" />
                        </ButtonAction>
                    </TooltipTrigger>
                    <TooltipContent side="top" align="end">
                        {{ copied ? 'Copied' : 'Copy Code' }}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
        <ScrollArea
            orientation="both"
            fit-content
            viewport-class="[&>div]:!block"
            :style="{ maxHeight: height }"
            class="readonly-code-scroll">
            <pre
                v-if="!ready"
                class="readonly-code-fallback"
                tabindex="0"><code>{{ source }}</code></pre>
            <div v-show="ready" ref="host" class="readonly-code-host" />
        </ScrollArea>
        <span class="sr-only" role="status" aria-live="polite">{{ copied ? 'Copied' : '' }}</span>
        <p v-if="copyFailed" class="readonly-code-error" role="alert">
            Could not copy code. Select the text and copy it manually.
        </p>
    </section>
</template>

<script lang="ts" setup>
import type { createReadonlyEditor } from '../code/readonly-editor';
import {
    ButtonAction,
    ScrollArea,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@rat.md/miru';
import { IconClipboard, IconClipboardCheck } from '@tabler/icons-vue';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { copyCode } from '../../../../package/src/components/code-panel/clipboard';

const props = withDefaults(
    defineProps<{
        code: string;
        language?: string;
        lineNumbers?: boolean;
        maxHeight?: string | number;
        label?: string;
        embedded?: boolean;
    }>(),
    { language: 'text', lineNumbers: true, label: 'Source code', embedded: false },
);
const host = ref<HTMLElement>();
const ready = ref(false);
const copied = ref(false);
const copying = ref(false);
const copyFailed = ref(false);
const tooltipOpen = ref(false);
const height = computed(() =>
    typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight,
);
// Remove empty boundary lines while preserving indentation and intentional gaps within the code.
const source = computed(() =>
    props.code.replace(/^(?:[\t ]*\r?\n)+/, '').replace(/(?:\r?\n[\t ]*)+$/, ''),
);
let editor: ReturnType<typeof createReadonlyEditor> | undefined;
let disposed = false;
let copiedTimer: ReturnType<typeof setTimeout> | undefined;

/**
 * Reset copy feedback after its display interval.
 */
function resetCopy() {
    clearTimeout(copiedTimer);
    copied.value = false;
    copyFailed.value = false;
    tooltipOpen.value = false;
}

/**
 * Copy the displayed source to the clipboard.
 */
async function copy() {
    if (copying.value) {
        return;
    }
    const snapshot = source.value;
    resetCopy();
    copying.value = true;
    try {
        await copyCode(snapshot);
        if (disposed || snapshot !== source.value) {
            return;
        }
        copied.value = true;
        tooltipOpen.value = true;
        copiedTimer = setTimeout(() => {
            copied.value = false;
            tooltipOpen.value = false;
        }, 2000);
    } catch {
        if (!disposed) {
            copyFailed.value = true;
        }
    } finally {
        copying.value = false;
    }
}

onMounted(async () => {
    const { createReadonlyEditor } = await import('../code/readonly-editor');
    if (disposed || !host.value) {
        return;
    }
    editor = createReadonlyEditor(
        host.value,
        source.value,
        props.language,
        props.lineNumbers,
        props.label,
    );
    ready.value = true;
});
watch(
    () => [source.value, props.language, props.lineNumbers] as const,
    ([code, language, numbered]) => {
        resetCopy();
        editor?.update(code, language, numbered);
    },
);
onBeforeUnmount(() => {
    disposed = true;
    clearTimeout(copiedTimer);
    editor?.destroy();
});
</script>

<style scoped>
.readonly-code {
    position: relative;
    min-width: 0;
    max-width: 100%;
    margin: 20px 0;
    border: 1px solid var(--site-line);
    border-radius: 8px;
    background: var(--ui-editor-background, var(--site-panel));
    overflow: hidden;
}
.readonly-code.is-embedded {
    margin: 0;
    border: 0;
    border-radius: 0;
}
.readonly-code.is-single-line {
    padding: 11px 96px 11px 0;
}
.readonly-code.is-single-line .readonly-code-tools {
    top: 50%;
    transform: translateY(-50%);
}
.readonly-code-tools {
    position: absolute;
    z-index: 2;
    top: 10px;
    right: 12px;
    display: flex;
    align-items: center;
    gap: 10px;
}
.readonly-code-language {
    font-family: var(--ui-font-mono, monospace);
    font-size: 10px;
    color: var(--site-faint);
}
.readonly-code-host {
    width: 100%;
    min-width: 0;
}
.readonly-code .readonly-code-fallback {
    margin: 0;
    padding: 4px 20px;
    border: 0;
    background: transparent;
    color: var(--ui-foreground);
    font-family: var(--ui-font-mono, monospace);
    font-size: 12px;
    font-weight: 400;
    line-height: 1.85;
    white-space: pre;
}
.readonly-code-fallback > code {
    padding: 0;
    border: 0;
    background: transparent;
    font: inherit;
}
.readonly-code-error {
    padding: 8px 16px;
    color: var(--ui-danger);
    font-size: 12px;
}
.readonly-code-host :deep(.cm-content:focus-visible) {
    outline: 2px solid var(--ui-ring);
    outline-offset: -2px;
}
</style>
