<template>
    <iframe
        ref="iframe"
        :src="withBase('/playground/preview')"
        :title="title"
        class="miru-preview-frame"
        :style="{ visibility: painted ? 'visible' : 'hidden' }"
        @load="connect" />
</template>

<script lang="ts" setup>
import { withBase, useData } from 'vitepress';
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { createPreviewHandshake } from './preview-handshake';

const props = withDefaults(
    defineProps<{ code: string; css?: string; title?: string; dark?: boolean }>(),
    { css: '', title: 'Miru component preview', dark: undefined },
);
const emit = defineEmits<{ status: [status: string, message: string] }>();
const iframe = ref<HTMLIFrameElement>();
const ready = ref(false);
// An iframe starts as a blank white document before its own theme and app load.
// Keep its space, but reveal it only after the runtime has painted its first result.
const painted = ref(false);
const { isDark } = useData();
let revision = 0;
const handshake = createPreviewHandshake({
    /**
     * Ask the preview frame to report its readiness.
     * @returns
     */
    probe: () =>
        iframe.value?.contentWindow?.postMessage(
            { type: 'miru-preview-connect' },
            window.location.origin,
        ),

    /**
     * Report an expired preview connection deadline.
     * @returns
     */
    timeout: () =>
        emit(
            'status',
            'error',
            'The preview took too long to start. Press Run to reconnect, or reload the page if the dev server is still starting.',
        ),
});

/**
 * Start a connection with the isolated preview frame.
 */
function connect() {
    if (ready.value) {
        send();
    } else {
        emit('status', 'loading', '');
        handshake.request();
    }
}

/**
 * Send the current source and settings to the preview frame.
 */
function send() {
    if (!ready.value) {
        connect();

        return;
    }
    revision++;
    emit('status', 'compiling', '');
    iframe.value?.contentWindow?.postMessage(
        {
            type: 'miru-preview-update',
            code: props.code,
            css: props.css,
            dark: props.dark ?? isDark.value,
            revision,
        },
        window.location.origin,
    );
}

/**
 * Handle a message from the linked preview window.
 * @param event
 */
function receive(event: MessageEvent) {
    if (event.origin !== window.location.origin || event.source !== iframe.value?.contentWindow) {
        return;
    }
    if (event.data?.type === 'miru-preview-ready') {
        handshake.acknowledge();
        ready.value = true;
        send();
    }
    if (event.data?.type === 'miru-preview-status' && event.data.revision === revision) {
        if (event.data.status === 'ready' || event.data.status === 'error') {
            painted.value = true;
        }
        emit('status', event.data.status, event.data.message || '');
    }
}

watch(() => [props.code, props.css, props.dark, isDark.value], send);
onMounted(() => {
    window.addEventListener('message', receive);
    connect();
});
onUnmounted(() => {
    window.removeEventListener('message', receive);
    handshake.dispose();
});
defineExpose({ run: send });
</script>
