<template>
    <div class="component-example">
        <div class="component-example-toolbar">
            <Tabs
                v-model="tab"
                variant="accent"
                :content="false"
                :collapse-overflow="false"
                :tabs="[
                    { value: 'preview', label: 'Preview' },
                    { value: 'code', label: 'Vue source' },
                ]"
                aria-label="Component example view" />
            <SiteTooltip v-if="available" text="Change background">
                <ButtonAction
                    size="sm"
                    variant="default"
                    borderless="yes"
                    class="example-background-toggle"
                    aria-label="Change background"
                    :aria-description="background.label"
                    @click="backgroundIndex = (backgroundIndex + 1) % backgrounds.length">
                    <IconBackground :size="16" />
                </ButtonAction>
            </SiteTooltip>
            <Button
                v-if="showPlayground"
                as="a"
                :href="`/playground?component=${name}`"
                size="sm"
                variant="outline">
                Open in playground
            </Button>
        </div>
        <template v-if="available">
            <div
                v-show="tab === 'preview'"
                class="example-stage"
                :style="backgroundStyle"
                :class="{ 'is-layout': entry?.layout }">
                <PreviewFrame
                    :dark="backgroundIndex < 2"
                    :code="source"
                    :css="previewCss"
                    :title="`${name} example`"
                    :class="{ 'layout-example-frame': entry?.layout }"
                    @status="
                        (value, message) => {
                            error = message;
                        }
                    " />
            </div>
            <ReadonlyCode
                v-if="tab === 'code'"
                embedded
                class="example-source"
                :code="source"
                language="vue"
                :line-numbers="true"
                max-height="480px"
                label="Vue example source" />
            <div v-if="controls.length" class="example-controls">
                <template v-for="control in controls" :key="control.name">
                    <Checkbox
                        v-if="control.kind === 'boolean'"
                        size="sm"
                        :model-value="Boolean(values[control.name] ?? control.value)"
                        :label="controlLabel(control.name)"
                        @update:model-value="values[control.name] = Boolean($event)" />
                    <Field v-else class="example-control-field">
                        <FieldLabel :for="`example-${name}-${control.name}`">
                            {{ controlLabel(control.name) }}
                        </FieldLabel>
                        <Select
                            size="sm"
                            :model-value="String(values[control.name] ?? control.value)"
                            @update:model-value="values[control.name] = String($event)">
                            <SelectTrigger :id="`example-${name}-${control.name}`">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem
                                    v-for="value in control.options"
                                    :key="value"
                                    :value="value">
                                    {{ value === '__default' ? 'Auto' : value }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>
                </template>
                <Button size="sm" variant="ghost" @click="values = {}">Reset</Button>
            </div>
            <p v-if="error" role="alert" class="example-error">{{ error }}</p>
            <p v-if="!examples[name]" class="example-family-note">
                Shown in its {{ family?.title }} composition. This primitive is designed to work
                with related primitives.
            </p>
        </template>
        <p v-else class="example-family-note">
            This primitive needs application context. Use the API below and its related components
            to compose a complete example.
        </p>
    </div>
</template>
<script setup lang="ts">
import {
    Button,
    Tabs,
    ButtonAction,
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
    Checkbox,
    Field,
    FieldLabel,
} from '@rat.md/miru';
import { IconBackground } from '@tabler/icons-vue';
import { computed, ref, watch } from 'vue';
import { useAppearance } from '../colors/appearance';
import componentApi from '../component-api.json';
import catalogue from '../component-catalogue.json';
import { exampleControls, controlledExample } from '../playground/example-controls';
import { examples, tokenStyles } from '../playground/examples';
import PreviewFrame from '../playground/PreviewFrame.vue';
import { exampleSource } from '../playground/source';
import ReadonlyCode from './ReadonlyCode.vue';
import SiteTooltip from './SiteTooltip.vue';
const props = withDefaults(
    defineProps<{ name: string; showPlayground?: boolean; code?: string }>(),
    {
        showPlayground: true,
    },
);
const tab = ref('preview');
const error = ref('');
const backgrounds = [
    {
        label: 'Dark checkerboard',
        color: 'var(--ui-neutral-950)',
        pattern:
            'conic-gradient(var(--ui-neutral-900) 25%, transparent 0 50%, var(--ui-neutral-900) 0 75%, transparent 0)',
    },
    { label: 'Dark grey', color: 'var(--ui-neutral-900)', pattern: 'none' },
    { label: 'Light grey', color: 'var(--ui-neutral-100)', pattern: 'none' },
    {
        label: 'Light checkerboard',
        color: 'var(--ui-neutral-50)',
        pattern:
            'conic-gradient(var(--ui-neutral-200) 25%, transparent 0 50%, var(--ui-neutral-200) 0 75%, transparent 0)',
    },
];
const { isDark } = useAppearance();
const backgroundIndex = ref(isDark.value ? 0 : 3);
watch(isDark, (dark) => {
    // Mirror each background to its light/dark counterpart, keeping its pattern.
    if (backgroundIndex.value < 2 !== dark) {
        backgroundIndex.value = backgrounds.length - 1 - backgroundIndex.value;
    }
});
const background = computed(() => backgrounds[backgroundIndex.value]);
const backgroundStyle = computed(() => ({
    backgroundColor: background.value.color,
    backgroundImage: background.value.pattern,
    backgroundSize: '20px 20px',
}));
const entry = computed(() => catalogue.find((item) => item.name === props.name));
const family = computed(() =>
    catalogue.find((item) => item.module === entry.value?.module && examples[item.name]),
);
const baseSource = computed(() => props.code ?? exampleSource(props.name, family.value?.name));
const controls = computed(() =>
    props.code
        ? []
        : exampleControls(
              baseSource.value,
              props.name,
              Object.values(componentApi)
                  .flat()
                  .find((item) => item.name === props.name)?.props || [],
          ),
);
const values = ref<Record<string, string | boolean>>({});
watch(
    () => props.name,
    () => {
        values.value = {};
    },
    { immediate: true },
);
const source = computed(
    () => props.code ?? controlledExample(baseSource.value, props.name, values.value),
);
const previewCss = computed(
    () =>
        tokenStyles() +
        `\n.preview-runtime { background-color: ${background.value.color}; background-image: ${background.value.pattern}; background-size: 20px 20px; }` +
        (entry.value?.layout
            ? ''
            : ['table', 'data-table', 'schedule'].includes(entry.value?.module ?? '')
              ? '\n.preview-runtime { display: block; } .preview-mount { display: block; width: 100%; max-width: none; min-width: 0; } .preview-mount > * { width: 100%; max-width: 100%; }'
              : '\n.preview-runtime { display: grid; place-items: center; } .preview-mount { display: grid; place-items: center; max-width: 680px; } .preview-mount > * { max-width: 100%; }'),
);
const available = computed(() => !!props.code || !!examples[props.name] || !!family.value);
const controlLabel = (name: string) => {
    const text = name.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
    return text[0].toUpperCase() + text.slice(1);
};
</script>
