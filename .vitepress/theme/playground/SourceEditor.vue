<template>
    <ScrollArea
        class="source-editor"
        orientation="both"
        type="auto"
        viewport-class="[&>div]:!block">
        <div ref="host" />
    </ScrollArea>
</template>
<script setup lang="ts">
import { indentWithTab } from '@codemirror/commands';
import { css } from '@codemirror/lang-css';
import { vue } from '@codemirror/lang-vue';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { EditorState, Compartment } from '@codemirror/state';
import { keymap } from '@codemirror/view';
import { tags } from '@lezer/highlight';
import { ScrollArea } from '@rat.md/miru';
import { EditorView, basicSetup } from 'codemirror';
import { onMounted, onUnmounted, ref, watch } from 'vue';
const props = withDefaults(defineProps<{ modelValue: string; language?: string }>(), {
    language: 'vue',
});
const emit = defineEmits<{ 'update:modelValue': [value: string]; run: [] }>();
const host = ref<HTMLElement>();
let editor: EditorView | undefined;
let resizeObserver: ResizeObserver | undefined;
const languageCompartment = new Compartment();
const highlighting = syntaxHighlighting(
    HighlightStyle.define([
        { tag: tags.keyword, color: 'var(--ui-code-keyword)' },
        { tag: [tags.string, tags.attributeValue], color: 'var(--ui-code-string)' },
        {
            tag: [tags.tagName, tags.typeName, tags.className],
            color: 'var(--ui-code-name)',
        },
        {
            tag: [tags.function(tags.variableName), tags.propertyName, tags.attributeName],
            color: 'var(--ui-code-type)',
        },
        { tag: [tags.bool, tags.number], color: 'var(--ui-code-name)' },
        { tag: tags.comment, color: 'var(--ui-subtle-foreground)' },
    ]),
);
const theme = EditorView.theme({
    '&': {
        minHeight: 'var(--source-editor-height, 100%)',
        fontSize: '13px',
        backgroundColor: 'var(--ui-editor-background)',
        color: 'var(--ui-foreground)',
    },
    '.cm-content': {
        minHeight: 'var(--source-editor-height, 100%)',
        padding: '16px 0',
        caretColor: 'var(--ui-primary)',
    },
    '.cm-scroller': {
        minHeight: 'var(--source-editor-height, 100%)',
        overflow: 'visible',
        fontFamily: 'var(--ui-font-mono, "Cascadia Code", Consolas, monospace)',
        lineHeight: '1.75',
    },
    '.cm-gutters': {
        alignSelf: 'stretch',
        height: 'var(--source-editor-height, 100%)',
        backgroundColor: 'transparent',
        color: 'var(--ui-muted-foreground)',
        borderRight: '1px solid var(--ui-border)',
    },
    '.cm-gutterElement': { padding: '0 10px 0 14px' },
    '.cm-activeLine,.cm-activeLineGutter': {
        backgroundColor: 'color-mix(in srgb, var(--ui-foreground) 4%, transparent)',
    },
    '.cm-cursor': { borderLeftColor: 'var(--ui-primary)' },
    '&.cm-focused .cm-selectionBackground,.cm-selectionBackground,::selection': {
        backgroundColor: 'var(--ui-editor-selection)',
    },
    '.cm-line': { padding: '0 16px' },
    '&.cm-focused': { outline: 'none' },
});
onMounted(() => {
    editor = new EditorView({
        parent: host.value!,
        state: EditorState.create({
            doc: props.modelValue,
            extensions: [
                basicSetup,
                theme,
                highlighting,
                EditorView.lineWrapping,
                languageCompartment.of(props.language === 'css' ? css() : vue()),
                keymap.of([
                    indentWithTab,
                    {
                        key: 'Mod-Enter',
                        run: () => {
                            emit('run');
                            return true;
                        },
                    },
                    {
                        key: 'Escape',
                        run: (view) => {
                            view.contentDOM.blur();
                            return true;
                        },
                    },
                ]),
                EditorView.contentAttributes.of({
                    'aria-label':
                        props.language === 'css' ? 'Theme CSS source' : 'Vue component source',
                    role: 'textbox',
                    'aria-multiline': 'true',
                    spellcheck: 'false',
                }),
                EditorView.updateListener.of((update) => {
                    if (update.docChanged) emit('update:modelValue', update.state.doc.toString());
                }),
            ],
        }),
    });
    const viewport = host.value!.closest<HTMLElement>('[data-slot="scroll-area-viewport"]');
    function measureHeight() {
        if (viewport && viewport.clientHeight > 0) {
            host.value!.style.setProperty('--source-editor-height', `${viewport.clientHeight}px`);
            editor?.requestMeasure();
        }
    }
    resizeObserver = new ResizeObserver(measureHeight);
    if (viewport) resizeObserver.observe(viewport);
    measureHeight();
});
watch(
    () => props.modelValue,
    (value) => {
        if (editor && editor.state.doc.toString() !== value)
            editor.dispatch({
                changes: { from: 0, to: editor.state.doc.length, insert: value },
                selection: { anchor: 0 },
                scrollIntoView: true,
            });
    },
);
watch(
    () => props.language,
    (value) => {
        editor?.dispatch({
            effects: languageCompartment.reconfigure(value === 'css' ? css() : vue()),
        });
        editor?.contentDOM.setAttribute(
            'aria-label',
            value === 'css' ? 'Theme CSS source' : 'Vue component source',
        );
    },
);
onUnmounted(() => {
    resizeObserver?.disconnect();
    editor?.destroy();
});
</script>
