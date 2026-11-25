<template>
    <div class="studio" @keydown="runShortcut">
        <div class="studio-topbar">
            <div class="studio-topbar-center">
                <Select :model-value="preset" @update:model-value="loadPreset">
                    <SelectTrigger
                        size="sm"
                        aria-label="Choose an example"
                        class="studio-example-select">
                        <SelectValue>{{ title }}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="item in starters" :key="item.id" :value="item.id">
                            {{ item.title }}
                        </SelectItem>
                        <SelectItem v-if="preset === 'custom'" value="custom">
                            {{ customTitle }}
                        </SelectItem>
                    </SelectContent>
                </Select>
                <ToggleGroup
                    v-model="view"
                    type="single"
                    :allow-empty="false"
                    size="sm"
                    aria-label="Workspace view">
                    <ToggleGroupItem value="editor">Split</ToggleGroupItem>
                    <ToggleGroupItem value="code">Editor</ToggleGroupItem>
                    <ToggleGroupItem value="preview">Preview</ToggleGroupItem>
                </ToggleGroup>
                <div class="studio-actions">
                    <DropdownMenu>
                        <DropdownMenuTrigger as-child>
                            <Button
                                variant="ghost"
                                size="sm"
                                icon-only
                                aria-label="Playground options"
                                class="studio-muted">
                                <IconDots :size="18" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" class="w-48">
                            <DropdownMenuItem @select="upload?.click()">
                                <IconFileImport :size="15" />
                                Import Vue
                            </DropdownMenuItem>
                            <DropdownMenuItem @select="download">
                                <IconFileExport :size="15" />
                                Export Vue
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem v-model="autoRun">
                                Auto-Run
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <SiteTooltip :text="copied ? 'Copied!' : 'Copy Vue code'">
                        <Button
                            variant="ghost"
                            size="sm"
                            icon-only
                            :aria-label="copied ? 'Vue code copied' : 'Copy Vue code'"
                            class="studio-muted"
                            @click="copyCode">
                            <IconClipboardCheck v-if="copied" :size="17" />
                            <IconClipboard v-else :size="17" />
                        </Button>
                    </SiteTooltip>
                    <Button
                        variant="primary"
                        size="sm"
                        :loading="status === 'compiling'"
                        :title="
                            error
                                ? 'Preview error — run again'
                                : dirty
                                  ? 'Run unapplied changes · Ctrl+Enter'
                                  : 'Preview up to date · Ctrl+Enter'
                        "
                        @click="apply">
                        <IconPlayerPlay :size="15" />
                        Run
                        <kbd>Ctrl ↵</kbd>
                    </Button>
                    <input
                        ref="upload"
                        type="file"
                        accept=".vue"
                        hidden
                        aria-label="Import Vue file"
                        @change="importFile" />
                </div>
            </div>
        </div>
        <span class="sr-only" role="status" aria-live="polite">
            {{
                status === 'error'
                    ? 'Preview error'
                    : dirty
                      ? 'Changes pending'
                      : status === 'ready'
                        ? 'Preview up to date'
                        : 'Compiling preview'
            }}
        </span>
        <div class="studio-content">
            <div
                ref="panels"
                class="studio-panels"
                :class="[`studio-view-${view}`, { 'is-resizing': resizing }]">
                <Resizable
                    :direction="stacked ? 'vertical' : 'horizontal'"
                    :disabled="view !== 'editor'"
                    :keyboard-resize-by="2"
                    class="studio-resizable">
                    <ResizablePanel
                        ref="editorPanel"
                        :order="0"
                        :default-size="50"
                        :min-size="view === 'editor' ? minimumPanelSize : 0"
                        class="studio-resizable-panel">
                        <section
                            v-show="view !== 'preview'"
                            class="studio-editor"
                            aria-label="Code editor"
                            @dragover="dragOver"
                            @drop="drop">
                            <header class="studio-editor-header">
                                <SiteTooltip text="Add Component">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        icon-only
                                        aria-label="Add Component"
                                        :aria-expanded="paletteOpen"
                                        aria-controls="studio-components"
                                        class="studio-muted"
                                        @click="openPalette">
                                        <IconComponents :size="17" />
                                    </Button>
                                </SiteTooltip>
                                <span class="studio-file-title" :title="title">{{ title }}</span>
                                <Select v-model="file">
                                    <SelectTrigger
                                        size="sm"
                                        aria-label="Choose editor file"
                                        class="studio-file-select">
                                        <SelectValue>
                                            {{ file === 'theme' ? 'Theme.css' : fileName }}
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="component">{{ fileName }}</SelectItem>
                                        <SelectItem value="theme">Theme.css</SelectItem>
                                    </SelectContent>
                                </Select>
                            </header>
                            <SourceEditor
                                v-model="source"
                                :language="file === 'theme' ? 'css' : 'vue'"
                                @run="apply" />
                        </section>
                    </ResizablePanel>
                    <ResizableHandle
                        v-show="view === 'editor'"
                        show-grip
                        ariaLabel="Resize editor and preview"
                        @dragging="resizing = $event" />
                    <ResizablePanel
                        :order="1"
                        :default-size="50"
                        :min-size="view === 'editor' ? minimumPanelSize : 0"
                        class="studio-resizable-panel">
                        <section
                            v-show="view !== 'code'"
                            class="studio-preview"
                            aria-label="Live preview"
                            @dragover="dragOver"
                            @drop="drop">
                            <header class="studio-preview-header">
                                <ViewportControls
                                    label="Preview"
                                    :device="device"
                                    :width="viewportWidth"
                                    :landscape="landscape"
                                    :dark="previewIsDark"
                                    :background="background"
                                    @device="setDevice"
                                    @rotate="rotate"
                                    @width="setWidth"
                                    @dark="previewDark = $event"
                                    @background="background = $event" />
                            </header>
                            <div
                                ref="previewSurface"
                                class="studio-surface"
                                :data-background="background"
                                :aria-busy="status === 'loading' || status === 'compiling'">
                                <div
                                    v-if="status === 'loading' || status === 'compiling'"
                                    class="studio-preview-loading">
                                    <Spinner size="lg" label="Loading preview" />
                                </div>
                                <div
                                    class="studio-device-shell"
                                    :style="{
                                        width: `${viewportWidth * previewScale}px`,
                                        height: `${previewHeight * previewScale}px`,
                                    }">
                                    <PreviewFrame
                                        ref="frame"
                                        :code="appliedCode"
                                        :css="previewCss"
                                        :dark="previewIsDark"
                                        :title="`${title} preview`"
                                        :style="{
                                            width: `${viewportWidth}px`,
                                            height: `${previewHeight}px`,
                                            transform: `scale(${previewScale})`,
                                        }"
                                        @status="updateStatus" />
                                </div>
                            </div>
                            <div v-if="error" class="studio-error" role="alert">
                                <strong>Check your code</strong>
                                <pre>{{ error }}</pre>
                            </div>
                        </section>
                    </ResizablePanel>
                </Resizable>
                <Transition name="studio-sheet">
                    <div
                        v-if="paletteOpen && view !== 'preview'"
                        class="studio-sheet-layer"
                        @dragover="dragOver"
                        @drop="drop"
                        @keydown.esc.stop="closePalette">
                        <button
                            class="studio-sheet-backdrop"
                            aria-label="Close component panel"
                            @click="closePalette" />
                        <aside
                            id="studio-components"
                            ref="palette"
                            class="studio-component-sheet"
                            role="dialog"
                            aria-label="Add Component"
                            @keydown.tab="trapPaletteFocus">
                            <header>
                                <strong>Add Component</strong>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    icon-only
                                    aria-label="Close components"
                                    @click="closePalette">
                                    <IconX :size="17" />
                                </Button>
                            </header>
                            <InputSearch
                                v-model="query"
                                aria-label="Find a component"
                                placeholder="Find a component…"
                                size="sm"
                                class="studio-component-search" />
                            <ScrollArea class="studio-component-list">
                                <section v-for="group in groups" :key="group.title">
                                    <h2>{{ group.title }}</h2>
                                    <Button
                                        v-for="item in group.items"
                                        :key="item.name"
                                        variant="ghost"
                                        size="sm"
                                        class="studio-component-row"
                                        draggable="true"
                                        @dragstart="drag($event, item.name)"
                                        @click="insert(item.name)">
                                        <span>{{ item.title }}</span>
                                        <IconPlus :size="14" />
                                    </Button>
                                </section>
                                <p v-if="!groups.length" class="studio-empty">
                                    No matching components.
                                </p>
                            </ScrollArea>
                        </aside>
                    </div>
                </Transition>
            </div>
            <div v-if="note" class="studio-notice" role="status">
                <span>{{ note }}</span>
                <Button
                    variant="ghost"
                    size="xs"
                    icon-only
                    aria-label="Dismiss message"
                    @click="note = ''">
                    <IconX :size="13" />
                </Button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {
    Button,
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    InputSearch,
    ScrollArea,
    Resizable,
    ResizableHandle,
    ResizablePanel,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Spinner,
    ToggleGroup,
    ToggleGroupItem,
} from '@rat.md/miru';
import {
    IconClipboard,
    IconClipboardCheck,
    IconComponents,
    IconDots,
    IconFileExport,
    IconFileImport,
    IconPlayerPlay,
    IconPlus,
    IconX,
} from '@tabler/icons-vue';
import { useData } from 'vitepress';
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { selectedThemeCss } from '../colors/styles';
import { profile } from '../colors/store';
import catalogue from '../component-catalogue.json';
import SiteTooltip from '../components/SiteTooltip.vue';
import { siteExamples } from '../examples/catalogue';
import emptyTemplate from '../examples/EmptyTemplate.vue?raw';
import { examples } from './examples';
import { insertExample } from './insert';
import PreviewFrame from './PreviewFrame.vue';
import { refreshCustomerSummary } from './refresh-customer-summary';
import { exampleSource } from './source';
import SourceEditor from './SourceEditor.vue';
import ViewportControls from './ViewportControls.vue';

const starters = [
    {
        id: 'starter',
        title: 'Welcome Canvas',
        source: siteExamples.find((item) => item.id === 'starter')!.preview,
        css: '',
    },
    {
        id: 'customer-profile',
        title: 'Customer Profile Form',
        source: siteExamples.find((item) => item.id === 'customer-profile')!.preview,
        css: siteExamples.find((item) => item.id === 'customer-profile')!.previewCss || '',
    },
    { id: 'blank', title: 'Empty Vue Template', source: emptyTemplate, css: '' },
];
const { isDark } = useData();
const panels = ref<HTMLElement>();
const editorPanel = ref<InstanceType<typeof ResizablePanel>>();
const stacked = ref(false);
const resizing = ref(false);
const panelAxisSize = ref(1000);
const splitSize = ref(50);
const minimumPanelSize = computed(() =>
    Math.min(50, ((stacked.value ? 180 : 360) / panelAxisSize.value) * 100),
);
let panelsObserver: ResizeObserver | undefined;
const preset = ref('starter'),
    view = ref('editor'),
    code = ref(starters[0]!.source);
const appliedCode = ref(code.value),
    customTitle = ref('Imported Vue'),
    customCss = ref(''),
    autoRun = ref(true);
const previewDark = ref<boolean>();
const previewIsDark = computed(() => previewDark.value ?? isDark.value);
const file = ref('component');
const themeSource = ref('/* Custom CSS for this preview. */\n');
const appliedThemeSource = ref(themeSource.value);
const source = computed({
    get: () => (file.value === 'theme' ? themeSource.value : code.value),
    set: (value: string) => {
        if (file.value === 'theme') themeSource.value = value;
        else code.value = value;
    },
});
const fileName = computed(() =>
    preset.value === 'customer-profile'
        ? 'CustomerProfile.vue'
        : preset.value === 'starter'
          ? 'WelcomeCanvas.vue'
          : preset.value === 'custom' && customTitle.value.endsWith('.vue')
            ? customTitle.value
            : 'App.vue',
);
const exportSource = computed(
    () =>
        code.value +
        (themeSource.value.trim() ? `\n<style>\n${themeSource.value}\n</style>\n` : ''),
);
const copied = ref(false);
let copiedTimer: ReturnType<typeof setTimeout> | undefined;
async function copyCode() {
    try {
        await navigator.clipboard.writeText(exportSource.value);
        copied.value = true;
        clearTimeout(copiedTimer);
        copiedTimer = setTimeout(() => {
            copied.value = false;
        }, 2000);
    } catch {
        copied.value = false;
        note.value = 'Could not copy the Vue code. Please try again.';
    }
}
const dirty = computed(
    () => code.value !== appliedCode.value || themeSource.value !== appliedThemeSource.value,
);
const background = ref('canvas');
const previewCss = computed(() => {
    const surface =
        background.value === 'light'
            ? '#f2f2f4'
            : background.value === 'dark'
              ? '#17171c'
              : background.value === 'checker'
                ? 'repeating-conic-gradient(#ffffff0a 0% 25%, #00000012 0% 50%) 50% / 16px 16px, var(--ui-background)'
                : 'var(--ui-page, var(--ui-background))';
    return `${selectedThemeCss(profile.value)}\n${starters.find((item) => item.id === preset.value)?.css || customCss.value}\n.preview-runtime, body { background: ${surface}; }\n${appliedThemeSource.value}`;
});
const title = computed(
    () => starters.find((item) => item.id === preset.value)?.title || customTitle.value,
);
const status = ref('loading'),
    error = ref(''),
    note = ref('');
const frame = ref<InstanceType<typeof PreviewFrame>>(),
    upload = ref<HTMLInputElement>();
const paletteOpen = ref(false),
    palette = ref<HTMLElement>(),
    query = ref('');
let returnFocus: HTMLElement | null = null;
const groups = computed(() =>
    [...new Set(catalogue.map((item) => item.category))]
        .map((title) => ({
            title,
            items: catalogue.filter(
                (item) =>
                    item.category === title &&
                    item.primary &&
                    `${item.name} ${item.title}`.toLowerCase().includes(query.value.toLowerCase()),
            ),
        }))
        .filter((group) => group.items.length),
);
const device = ref('desktop'),
    landscape = ref(false),
    requestedWidth = ref<number>();
const availableWidth = ref(768),
    availableHeight = ref(680),
    previewSurface = ref<HTMLElement>();
const viewportWidth = computed(() => requestedWidth.value ?? Math.max(320, availableWidth.value));
const previewScale = computed(() => Math.min(1, availableWidth.value / viewportWidth.value));
const previewHeight = computed(() =>
    device.value === 'mobile'
        ? landscape.value
            ? 390
            : 844
        : device.value === 'tablet'
          ? landscape.value
              ? 768
              : 1024
          : Math.max(400, availableHeight.value / previewScale.value),
);
function setDevice(value: string) {
    device.value = value;
    requestedWidth.value =
        value === 'desktop'
            ? undefined
            : value === 'tablet'
              ? landscape.value
                  ? 1024
                  : 768
              : landscape.value
                ? 844
                : 390;
}
function rotate() {
    landscape.value = !landscape.value;
    if (device.value === 'desktop') setWidth(landscape.value ? 1280 : 900);
    else setDevice(device.value);
}
function setWidth(value: number) {
    requestedWidth.value = Math.max(320, Math.min(1920, Math.round(value)));
}
async function openPalette() {
    if (paletteOpen.value) return closePalette();
    returnFocus = document.activeElement as HTMLElement;
    paletteOpen.value = true;
    await nextTick();
    palette.value?.querySelector<HTMLInputElement>('input')?.focus();
}
function closePalette() {
    paletteOpen.value = false;
    returnFocus?.focus();
}
function trapPaletteFocus(event: KeyboardEvent) {
    const elements = [
        ...palette.value!.querySelectorAll<HTMLElement>(
            'button:not(:disabled), input, [tabindex="0"]',
        ),
    ].filter((el) => el.getClientRects().length);
    const first = elements[0],
        last = elements.at(-1);
    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
    }
}
let serial = 0,
    initialized = false;
let runTimer: ReturnType<typeof setTimeout> | undefined,
    persistTimer: ReturnType<typeof setTimeout> | undefined;
let observer: ResizeObserver | undefined;
function apply() {
    clearTimeout(runTimer);
    error.value = '';
    appliedCode.value = code.value;
    appliedThemeSource.value = themeSource.value;
    nextTick(() => frame.value?.run());
}
function runShortcut(event: KeyboardEvent) {
    if (event.defaultPrevented || event.key !== 'Enter' || !(event.ctrlKey || event.metaKey))
        return;
    event.preventDefault();
    apply();
}
function loadPreset(value: unknown) {
    const starter = starters.find((item) => item.id === String(value));
    if (!starter) return;
    preset.value = starter.id;
    customCss.value = '';
    themeSource.value = '/* Custom CSS for this preview. */\n';
    file.value = 'component';
    code.value = starter.source;
    paletteOpen.value = false;
    note.value = '';
    apply();
}
function insert(name: string) {
    const item = catalogue.find((item) => item.name === name);
    const resolved = examples[name]
        ? name
        : catalogue.find((entry) => entry.module === item?.module && examples[entry.name])?.name;
    if (!resolved) {
        note.value = 'This component needs its parent composition.';
        return;
    }
    try {
        code.value = insertExample(code.value, resolved, ++serial);
        closePalette();
        if (autoRun.value) apply();
    } catch (err) {
        note.value = (err as Error).message;
    }
}
function drag(event: DragEvent, name: string) {
    event.dataTransfer?.setData('application/x-miru-component', name);
    if (event.dataTransfer) event.dataTransfer.effectAllowed = 'copy';
}
function dragOver(event: DragEvent) {
    if (event.dataTransfer?.types.includes('application/x-miru-component')) event.preventDefault();
}
function drop(event: DragEvent) {
    const name = event.dataTransfer?.getData('application/x-miru-component');
    if (name && catalogue.some((item) => item.name === name)) {
        event.preventDefault();
        insert(name);
    }
}
function download() {
    const url = URL.createObjectURL(new Blob([exportSource.value], { type: 'text/plain' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.value.replace(/[^a-z0-9]/gi, '') || 'Playground'}.vue`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}
async function importFile(event: Event) {
    const input = event.target as HTMLInputElement,
        uploaded = input.files?.[0];
    if (!uploaded) return;
    try {
        if (uploaded.size > 1024 * 1024) throw new Error('Choose a Vue file smaller than 1 MB.');
        code.value = await uploaded.text();
        preset.value = 'custom';
        customTitle.value = uploaded.name;
        themeSource.value = '';
        // Imported Vue files keep their own inline style blocks.
        customCss.value = '';
        note.value = '';
        // Return to the imported component even when Theme.css was open.
        file.value = 'component';
        apply();
    } catch (err) {
        note.value = (err as Error).message;
    } finally {
        input.value = '';
    }
}
function updateStatus(value: string, message: string) {
    status.value = value;
    error.value = message;
}
function persist() {
    try {
        localStorage.setItem(
            'miru-playground-v3',
            JSON.stringify({
                code: code.value,
                themeSource: themeSource.value,
                preset: preset.value,
                baseSource: starters.find((item) => item.id === preset.value)?.source,
                customTitle: customTitle.value,
                customCss: customCss.value,
                autoRun: autoRun.value,
            }),
        );
    } catch {}
}
watch([code, themeSource], () => {
    copied.value = false;
    if (!initialized) return;
    clearTimeout(runTimer);
    if (autoRun.value) runTimer = setTimeout(apply, 650);
    clearTimeout(persistTimer);
    persistTimer = setTimeout(persist, 600);
});
watch(autoRun, (value) => {
    if (value) apply();
    else clearTimeout(runTimer);
    if (initialized) persist();
});
watch(view, async (value, previous) => {
    if (previous === 'editor') splitSize.value = editorPanel.value?.getSize() || 50;
    if (value === 'preview') paletteOpen.value = false;
    await nextTick();
    editorPanel.value?.resize(
        value === 'code'
            ? 100
            : value === 'preview'
              ? 0
              : Math.max(
                    minimumPanelSize.value,
                    Math.min(100 - minimumPanelSize.value, splitSize.value),
                ),
    );
});
onMounted(() => {
    panelsObserver = new ResizeObserver(([entry]) => {
        if (!entry) return;
        stacked.value = entry.contentRect.width < 720;
        panelAxisSize.value = Math.max(
            1,
            stacked.value ? entry.contentRect.height : entry.contentRect.width,
        );
    });
    if (panels.value) panelsObserver.observe(panels.value);
    observer = new ResizeObserver(([entry]) => {
        if (entry && entry.contentRect.width > 0) {
            availableWidth.value = Math.max(1, Math.floor(entry.contentRect.width));
            availableHeight.value = Math.max(400, Math.floor(entry.contentRect.height));
        }
    });
    if (previewSurface.value) observer.observe(previewSurface.value);
    const params = new URLSearchParams(window.location.search),
        requested = params.get('component'),
        requestedExample = params.get('example');
    if (requested && catalogue.some((item) => item.name === requested)) {
        const item = catalogue.find((item) => item.name === requested)!;
        const family = catalogue.find(
            (entry) => entry.module === item.module && examples[entry.name],
        );
        code.value = exampleSource(requested, family?.name);
        preset.value = 'custom';
        customTitle.value = item.title;
    } else if (requestedExample && starters.some((item) => item.id === requestedExample))
        loadPreset(requestedExample);
    else {
        try {
            const saved = JSON.parse(localStorage.getItem('miru-playground-v3') || 'null');
            const legacy = saved
                ? null
                : JSON.parse(localStorage.getItem('miru-playground-v2') || 'null');
            if (saved && typeof saved.code === 'string') {
                const starter = starters.find((item) => item.id === saved.preset);
                const restored =
                    starter && saved.baseSource === saved.code ? starter.source : saved.code;
                code.value = refreshCustomerSummary(
                    restored,
                    starters.find((item) => item.id === 'customer-profile')!.source,
                );
                if (
                    code.value !== saved.code &&
                    !localStorage.getItem('miru-playground-before-customer-cards')
                ) {
                    try {
                        localStorage.setItem(
                            'miru-playground-before-customer-cards',
                            JSON.stringify(saved),
                        );
                    } catch {
                        // A full storage quota must not interrupt restoring the draft.
                    }
                }
                themeSource.value = typeof saved.themeSource === 'string' ? saved.themeSource : '';
                preset.value = starters.some((item) => item.id === saved.preset)
                    ? saved.preset
                    : 'custom';
                customTitle.value =
                    typeof saved.customTitle === 'string' ? saved.customTitle : 'Local draft';
                customCss.value = typeof saved.customCss === 'string' ? saved.customCss : '';
                autoRun.value = saved.autoRun !== false;
            } else if (legacy && typeof legacy.code === 'string') {
                code.value =
                    legacy.code +
                    (typeof legacy.css === 'string' ? `\n<style>\n${legacy.css}\n</style>` : '');
                preset.value = 'custom';
                customTitle.value = 'Local draft';
                code.value = refreshCustomerSummary(
                    code.value,
                    starters.find((item) => item.id === 'customer-profile')!.source,
                );
            }
        } catch {}
    }
    initialized = true;
    apply();
});
onUnmounted(() => {
    panelsObserver?.disconnect();
    clearTimeout(copiedTimer);
    observer?.disconnect();
    clearTimeout(runTimer);
    clearTimeout(persistTimer);
    if (initialized) persist();
});
</script>
<style scoped>
.studio {
    display: flex;
    flex-direction: column;
    height: calc(100dvh - 80px);
    min-height: 420px;
    background: var(--site-bg);
}
.studio-topbar {
    flex: none;
    border-bottom: 1px solid var(--site-line);
    background: var(--site-bg);
}
.studio-topbar-center {
    display: flex;
    align-items: center;
    gap: 18px;
    min-width: 0;
    padding: 10px 24px;
}
.studio-example-select {
    width: 225px;
}
.studio-actions {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 6px;
}
.studio-actions kbd {
    font-size: 9px;
    opacity: 0.6;
    margin-left: 3px;
}
.studio-muted {
    color: var(--ui-muted-foreground);
}
.studio-content {
    flex: 1;
    min-height: 0;
    position: relative;
    padding: 18px 24px 24px;
}
.studio-panels {
    position: relative;
    isolation: isolate;
    height: 100%;
    border: 1px solid var(--ui-border);
    border-radius: 12px;
    overflow: hidden;
}
.studio-resizable {
    width: 100%;
    height: 100%;
}
.studio-resizable-panel {
    display: flex;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
}
.studio-panels.is-resizing :deep(iframe) {
    pointer-events: none;
}
.studio-editor,
.studio-preview {
    min-width: 0;
    min-height: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 100%;
    height: 100%;
}
.studio-editor-header,
.studio-preview-header {
    display: flex;
    align-items: center;
    min-height: 50px;
    padding: 8px 12px;
    gap: 12px;
    border-bottom: 1px solid var(--ui-border);
    background: var(--site-bg);
    flex: none;
}
.studio-file-select {
    width: 180px;
    flex: none;
}
.studio-file-title {
    flex: 1;
    text-align: center;
    font-size: 11px;
    color: var(--ui-muted-foreground);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.studio-preview-header {
    position: relative;
}
.studio-surface {
    position: relative;
    flex: 1;
    min-width: 0;
    min-height: 0;
    padding: 16px;
    overflow: auto;
    background: var(--ui-background);
}
.studio-preview-loading {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: grid;
    place-items: center;
    background: color-mix(in srgb, var(--ui-background) 75%, transparent);
    pointer-events: none;
}
.studio-surface[data-background='light'] {
    background: #f2f2f4;
}
.studio-surface[data-background='dark'] {
    background: #17171c;
}
.studio-surface[data-background='checker'] {
    background:
        repeating-conic-gradient(#ffffff0a 0% 25%, #00000012 0% 50%) 50% / 16px 16px,
        var(--ui-background);
}
.studio-device-shell {
    position: relative;
    margin-inline: auto;
    overflow: hidden;
    border-radius: 6px;
    box-shadow: 0 0 0 1px var(--ui-border);
    background: var(--ui-background);
}
.studio-device-shell .miru-preview-frame {
    transform-origin: top left;
    max-width: none;
}
.studio-error {
    flex: none;
    max-height: 150px;
    overflow: auto;
    border-top: 1px solid var(--ui-border);
    padding: 12px;
    color: var(--ui-danger-text);
    background: var(--ui-background);
    font-size: 12px;
}
.studio-error pre {
    margin: 6px 0 0;
    font-size: 11px;
    white-space: pre-wrap;
}
.studio-sheet-layer {
    position: absolute;
    inset: 50px 0 0;
    z-index: 20;
}
.studio-sheet-layer .studio-sheet-backdrop {
    position: absolute;
    inset: 0;
    width: 100%;
    background: #0005;
    backdrop-filter: blur(2px);
}
.studio-component-sheet {
    position: absolute;
    inset: 0 auto 0 0;
    width: min(340px, 100%);
    display: flex;
    flex-direction: column;
    background: var(--site-bg);
    border-right: 1px solid var(--ui-border);
    box-shadow: 10px 0 35px #0002;
}
.studio-component-sheet > header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px 8px;
    font-size: 13px;
}
.studio-component-search {
    margin: 6px 16px 12px;
    width: auto;
}
.studio-component-list {
    flex: 1;
    min-height: 0;
}
.studio-component-list section {
    padding: 0 10px 12px;
}
.studio-component-list h2 {
    margin: 0;
    padding: 10px;
    color: var(--ui-muted-foreground);
    font-size: 10px;
    font-weight: 500;
}
.studio-component-row {
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 12px;
}
.studio-empty {
    padding: 20px;
    color: var(--ui-muted-foreground);
    font-size: 12px;
}
.studio-notice {
    position: absolute;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 30;
    display: flex;
    align-items: center;
    gap: 12px;
    width: max-content;
    max-width: calc(100% - 48px);
    padding: 8px 12px;
    border: 1px solid var(--ui-border);
    border-radius: 8px;
    background: var(--ui-background);
    box-shadow: 0 8px 30px #0002;
    font-size: 11px;
}
.studio-sheet-enter-active,
.studio-sheet-leave-active {
    transition: opacity 180ms ease;
}
.studio-sheet-enter-active .studio-component-sheet,
.studio-sheet-leave-active .studio-component-sheet {
    transition: transform 180ms ease;
}
.studio-sheet-enter-from,
.studio-sheet-leave-to {
    opacity: 0;
}
.studio-sheet-enter-from .studio-component-sheet,
.studio-sheet-leave-to .studio-component-sheet {
    transform: translateX(-100%);
}
@media (min-width: 1100px) {
    .studio-topbar {
        padding-inline: max(0px, calc((100% - var(--site-frame-width)) / 2));
    }
    .studio-topbar-center {
        margin-inline: calc(var(--site-rail-width) - 1px);
        border-inline: 1px solid var(--site-line);
        padding-inline: var(--site-header-padding);
    }
}
@media (max-width: 1500px) {
    .studio-topbar-center {
        gap: 10px;
    }
    .studio-example-select {
        width: 190px;
    }
    .studio-actions kbd {
        display: none;
    }
}
@media (max-width: 1000px) {
    .studio-content {
        padding: 12px;
    }
}
@media (max-width: 700px) {
    .studio-topbar-center {
        flex-wrap: wrap;
        gap: 10px;
        padding: 10px 12px;
    }
    .studio-example-select {
        width: calc(100vw - 170px);
        min-width: 150px;
    }
    .studio-topbar-center > [data-slot='toggle-group'] {
        order: 3;
    }
    .studio-actions {
        gap: 2px;
    }
    .studio-editor-header {
        flex-wrap: nowrap;
    }

    .studio-sheet-layer {
        top: 50px;
    }
    .studio-surface {
        padding: 10px;
    }
}
@media (prefers-reduced-motion: reduce) {
    .studio-sheet-enter-active,
    .studio-sheet-leave-active,
    .studio-sheet-enter-active .studio-component-sheet,
    .studio-sheet-leave-active .studio-component-sheet {
        transition: none;
    }
}
</style>
