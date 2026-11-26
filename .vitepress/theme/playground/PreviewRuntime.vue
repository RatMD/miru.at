<template>
    <div class="preview-runtime">
        <div v-if="error" role="alert" class="preview-runtime-error">
            <strong>Check your component</strong>
            <pre>{{ error }}</pre>
        </div>
        <div ref="mountPoint" class="preview-mount" @click.capture="preventDemoNavigation" />
    </div>
</template>

<script lang="ts" setup>
import type { App } from 'vue';
import * as Miru from '@rat.md/miru';
import * as Composables from '@rat.md/miru/composables';
import { createMiru } from '@rat.md/miru/miru';
import * as Support from '@rat.md/miru/support';
import { onMounted, onUnmounted, ref } from 'vue';
import * as Vue from 'vue';
import * as Zod from 'zod';
import { compileExample } from './compiler';

const mountPoint = ref<HTMLElement>();
const error = ref('');
let app: App | undefined;
let style: HTMLStyleElement;
let lastCode = '';
let revision = 0;
const modules: Record<string, unknown> = {
    vue: Vue,
    '@rat.md/miru': Miru,
    '@rat.md/miru/composables': Composables,
    '@rat.md/miru/support': Support,
    zod: Zod,
};

/**
 * Report preview status to the parent window.
 * @param status
 * @param message
 */
function report(status: string, message = '') {
    window.parent.postMessage(
        { type: 'miru-preview-status', status, message, revision },
        window.location.origin,
    );
}

/**
 * Resolve a module explicitly allowed in the preview.
 * @param name
 * @returns
 */
function resolve(name: string) {
    if (!(name in modules)) {
        throw new Error(
            `“${name}” is not available here. Use vue, @rat.md/miru, @rat.md/miru/composables or @rat.md/miru/support.`,
        );
    }

    return modules[name];
}

/**
 * Keep placeholder navigation inside the playground preview.
 * @param event
 */
function preventDemoNavigation(event: MouseEvent) {
    const anchor = (event.target as Element).closest?.('a');
    if (anchor?.getAttribute('href') === '#') {
        event.preventDefault();
        event.stopPropagation();
    }
}

/**
 * Handle a message from the linked preview window.
 * @param event
 */
function receive(event: MessageEvent) {
    if (event.origin !== window.location.origin || event.source !== window.parent) {
        return;
    }
    if (event.data?.type === 'miru-preview-connect') {
        window.parent.postMessage({ type: 'miru-preview-ready' }, window.location.origin);

        return;
    }
    if (event.data?.type !== 'miru-preview-update') {
        return;
    }
    const { code, css, dark, revision: nextRevision } = event.data;
    if (typeof code !== 'string' || typeof css !== 'string') {
        return;
    }
    revision = nextRevision;
    document.documentElement.classList.toggle('dark', !!dark);
    try {
        if (code !== lastCode || !app) {
            const compiled = compileExample(code, resolve);
            app?.unmount();
            mountPoint.value!.replaceChildren();
            app = Vue.createApp({
                /**
                 * Render the current compiled preview.
                 * @returns
                 */
                render: () =>
                    Vue.h(Miru.PageRoot, null, {
                        /**
                         * Render the fallback content for the preview.
                         * @returns
                         */
                        default: () => Vue.h(compiled.component),
                    }),
            });
            app.use(createMiru({ locale: 'en', toast: false }));
            app.config.errorHandler = (err) => {
                error.value = err instanceof Error ? err.message : String(err);
                report('error', error.value);
            };
            for (const [name, value] of Object.entries(Miru)) {
                if (
                    /^[A-Z]/.test(name) &&
                    value &&
                    (typeof value === 'object' || typeof value === 'function')
                ) {
                    app.component(name, value as Vue.Component);
                }
            }
            style.dataset.componentCss = compiled.styles;
            style.textContent = `${compiled.styles}\n${css}`;
            error.value = '';
            app.mount(mountPoint.value!);
            lastCode = code;
        } else {
            style.textContent = `${style.dataset.componentCss || ''}\n${css}`;
            error.value = '';
        }
        if (!error.value) {
            report('ready');
        }
    } catch (err) {
        error.value = err instanceof Error ? err.message : String(err);
        report('error', error.value);
    }
}

onMounted(() => {
    style = document.createElement('style');
    style.dataset.miruPreviewOverrides = '';
    document.head.append(style);
    window.addEventListener('message', receive);
    window.parent.postMessage({ type: 'miru-preview-ready' }, window.location.origin);
});
onUnmounted(() => {
    window.removeEventListener('message', receive);
    app?.unmount();
    style?.remove();
});
</script>
