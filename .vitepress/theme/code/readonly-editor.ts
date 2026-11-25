import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { vue } from '@codemirror/lang-vue';
import { HighlightStyle, StreamLanguage, syntaxHighlighting } from '@codemirror/language';
import { shell } from '@codemirror/legacy-modes/mode/shell';
import { Compartment, EditorState } from '@codemirror/state';
import type { Extension } from '@codemirror/state';
import { EditorView, lineNumbers } from '@codemirror/view';
import { tags } from '@lezer/highlight';

function languageSupport(language: string): Extension {
    switch (language.toLowerCase()) {
        case 'vue':
            return vue();
        case 'css':
            return css();
        case 'html':
            return html();
        case 'ts':
        case 'typescript':
            return javascript({ typescript: true });
        case 'tsx':
            return javascript({ typescript: true, jsx: true });
        case 'js':
        case 'javascript':
            return javascript();
        case 'jsx':
            return javascript({ jsx: true });
        case 'json':
            return json();
        case 'sh':
        case 'bash':
        case 'shell':
        case 'zsh':
            return StreamLanguage.define(shell);
        default:
            return [];
    }
}

const highlighting = syntaxHighlighting(
    HighlightStyle.define([
        { tag: tags.keyword, color: 'var(--ui-code-keyword)' },
        { tag: [tags.string, tags.attributeValue], color: 'var(--ui-code-string)' },
        { tag: [tags.tagName, tags.typeName, tags.className], color: 'var(--ui-code-name)' },
        {
            tag: [tags.function(tags.variableName), tags.propertyName, tags.attributeName],
            color: 'var(--ui-code-type)',
        },
        { tag: [tags.bool, tags.number], color: 'var(--ui-code-name)' },
        { tag: tags.comment, color: 'var(--ui-subtle-foreground)' },
    ]),
);

const theme = EditorView.theme({
    '&': { fontSize: '12px', backgroundColor: 'transparent', color: 'var(--ui-foreground)' },
    '.cm-scroller': {
        overflow: 'visible',
        fontFamily: 'var(--ui-font-mono, "Cascadia Code", Consolas, monospace)',
        lineHeight: '1.85',
    },
    '.cm-content': { padding: '4px 0', minWidth: '0' },
    '.cm-line': { padding: '0 20px' },
    '.cm-gutters': {
        backgroundColor: 'transparent',
        color: 'var(--ui-muted-foreground)',
        borderRight: '1px solid var(--ui-border)',
    },
    '.cm-lineNumbers .cm-gutterElement': { padding: '0 12px' },
    '&.cm-focused': { outline: 'none' },
    '.cm-selectionBackground, &.cm-focused .cm-selectionBackground, ::selection': {
        backgroundColor: 'var(--ui-editor-selection)',
    },
});

export function createReadonlyEditor(
    parent: HTMLElement,
    code: string,
    language: string,
    numbered: boolean,
    label: string,
) {
    const syntax = new Compartment();
    const numbers = new Compartment();
    const view = new EditorView({
        parent,
        state: EditorState.create({
            doc: code,
            extensions: [
                EditorState.readOnly.of(true),
                EditorView.editable.of(false),
                EditorView.contentAttributes.of({
                    'aria-label': label,
                    'aria-readonly': 'true',
                    tabindex: '0',
                    spellcheck: 'false',
                }),
                theme,
                highlighting,
                syntax.of(languageSupport(language)),
                numbers.of(numbered ? lineNumbers() : []),
            ],
        }),
    });
    return {
        update(next: string, nextLanguage: string, nextNumbered: boolean) {
            view.dispatch({
                ...(view.state.doc.toString() !== next
                    ? { changes: { from: 0, to: view.state.doc.length, insert: next } }
                    : {}),
                effects: [
                    syntax.reconfigure(languageSupport(nextLanguage)),
                    numbers.reconfigure(nextNumbered ? lineNumbers() : []),
                ],
            });
        },
        destroy() {
            view.destroy();
        },
    };
}
