<template>
    <PageRoot>
        <section class="forms-story" aria-labelledby="forms-story-title">
            <div class="forms-story-heading">
                <div>
                    <span class="eyebrow">
                        MADE FOR THE WAY
                        <span class="eyebrow-underline">
                            YOU WORK
                            <svg viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
                                <path
                                    d="M2 7Q50 1 98 6"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="1"
                                    stroke-linecap="round"
                                    vector-effect="non-scaling-stroke" />
                            </svg>
                        </span>
                        <span class="eyebrow-dot">.</span>
                    </span>
                    <h2 id="forms-story-title">
                        Designed for something big.
                        <br />
                        <span>Built for dashboards.</span>
                    </h2>
                </div>
                <div class="forms-story-intro">
                    <p>
                        <span class="forms-story-intro-line">
                            Expressive forms are at the heart of Miru.
                        </span>
                        <span class="forms-story-intro-line">
                            Built for complex, enterprise-scale applications without compromising
                            usability.
                        </span>
                    </p>
                </div>
            </div>
            <div class="forms-story-grid">
                <aside class="forms-story-notes">
                    <Badge variant="secondary">Big ideas on small screens.</Badge>
                    <h3>
                        Less overthinking.
                        <br />
                        Get more done!
                    </h3>
                    <p>
                        You bring the schema. Miru brings the forms, fields, validation, state,
                        submission handling and responsive grids — the whole lot. Let the form
                        generator do the hard work, or compose by hand (if you're paid by the hour).
                    </p>
                    <div class="forms-story-feature">
                        <Icon name="code" :size="21" />
                        <span>
                            <strong>A definition becomes a form.</strong>
                            <small>
                                Native fields, custom slots, @tanstack/vue-form and Zod, with
                                optional Inertia support.
                            </small>
                            <Anchor
                                href="/docs/forms/generator"
                                variant="accent"
                                animation="slide"
                                class="forms-story-feature-link">
                                Explore the form generator ↗
                            </Anchor>
                        </span>
                    </div>
                    <div class="forms-story-feature">
                        <Icon name="layers" :size="21" />
                        <span>
                            <strong>Room for every screen.</strong>
                            <small>
                                Form adapts your schema to every device and screen size,
                                keeping your clients as happy as you are.
                            </small>
                            <Anchor
                                href="/docs/forms/layouts"
                                variant="accent"
                                animation="slide"
                                class="forms-story-feature-link">
                                Meet the form layout ↗
                            </Anchor>
                        </span>
                    </div>
                    <Anchor
                        href="/components/#formfields"
                        variant="accent"
                        animation="slide"
                        class="forms-story-all-fields">
                        Explore all {{ formFieldRange }} form fields
                        <Icon name="grid" :size="15" />
                    </Anchor>
                </aside>
                <Card class="forms-story-demo">
                    <div class="forms-demo-heading">
                        <div>
                            <span class="eyebrow">YOUR NEXT DASHBOARD</span>
                            <h3>A project with possibility.</h3>
                        </div>
                        <Badge variant="success">Live demo</Badge>
                    </div>
                    <form @submit.prevent="validate" novalidate>
                        <Tabs
                            v-model="activeTab"
                            variant="success"
                            :tabs="[
                                { value: 'project', label: 'Project' },
                                { value: 'preferences', label: 'Preferences' },
                                { value: 'content', label: 'Content & files' },
                            ]"
                            aria-label="Project form sections"
                            content-class="p-0">
                            <template v-for="section in sections" :key="section.id" #[section.id]>
                                <div class="forms-demo-fields">
                                    <FormSectionRenderer
                                        :form="controller.form"
                                        :section="section"
                                        locale="en">
                                        <template #custom="{ field, definition }">
                                            <Field>
                                                <FieldLabel :for="field.name">
                                                    {{ widgetLabels[definition.slot] }}
                                                </FieldLabel>
                                                <InputNumber
                                                    v-if="definition.slot === 'seats'"
                                                    :model-value="Number(field.state.value)"
                                                    :min="1"
                                                    :max="100"
                                                    @update:model-value="
                                                        field.handleChange($event)
                                                    ">
                                                    <InputNumberContent>
                                                        <InputNumberDecrement
                                                            aria-label="Fewer team members" />
                                                        <InputNumberInput
                                                            :id="field.name"
                                                            aria-label="Team size" />
                                                        <InputNumberIncrement
                                                            aria-label="More team members" />
                                                    </InputNumberContent>
                                                </InputNumber>
                                                <InputTags
                                                    v-else-if="definition.slot === 'tags'"
                                                    :model-value="field.state.value as string[]"
                                                    @update:model-value="
                                                        field.handleChange($event)
                                                    ">
                                                    <InputTagsItem
                                                        v-for="tag in field.state.value as string[]"
                                                        :key="tag"
                                                        :value="tag">
                                                        <InputTagsItemText />
                                                        <InputTagsItemDelete
                                                            :aria-label="`Remove ${tag}`"
                                                            aria-labelledby="" />
                                                    </InputTagsItem>
                                                    <InputTagsInput
                                                        :id="field.name"
                                                        aria-label="Labels"
                                                        placeholder="Add a label…" />
                                                </InputTags>
                                                <InputDateTime
                                                    v-else-if="definition.slot === 'time'"
                                                    mode="time"
                                                    :id="field.name"
                                                    :model-value="String(field.state.value)"
                                                    aria-label="Daily check-in"
                                                    @update:model-value="
                                                        field.handleChange($event)
                                                    " />
                                                <ColorPicker
                                                    v-else-if="definition.slot === 'color'"
                                                    :model-value="String(field.state.value)"
                                                    ariaLabel="Project colour"
                                                    @update:model-value="
                                                        field.handleChange($event)
                                                    " />
                                                <template v-else-if="definition.slot === 'files'">
                                                    <UploadZone
                                                        title="Drop your next big idea here"
                                                        description="Choose files or drop them here. Files stay in this local preview."
                                                        @files="field.handleChange($event)" />
                                                    <small
                                                        v-if="(field.state.value as File[]).length"
                                                        role="status">
                                                        {{ (field.state.value as File[]).length }}
                                                        file(s) selected
                                                    </small>
                                                </template>
                                            </Field>
                                        </template>
                                    </FormSectionRenderer>
                                </div>
                            </template>
                        </Tabs>
                        <div class="forms-demo-footer">
                            <div class="forms-demo-footer-copy">
                                <p class="forms-demo-credit">
                                    Powered by
                                    <Anchor
                                        href="https://tanstack.com/form"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        animation="slide">
                                        @tanstack/vue-form
                                    </Anchor>
                                    ,
                                    <Anchor
                                        href="https://zod.dev/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        animation="slide">
                                        Zod
                                    </Anchor>
                                    and a lot of
                                    <IconHeartFilled
                                        class="forms-demo-heart"
                                        aria-label="love"
                                        role="img" />
                                    by miru.
                                </p>
                                <p v-if="feedback" role="status">{{ feedback }}</p>
                            </div>
                            <Button type="submit" variant="primary" size="sm">
                                <Icon name="check" :size="15" />
                                Validate project
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
            <div class="forms-data-heading">
                <div>
                    <span class="eyebrow">
                        FROM INPUT TO
                        <span class="eyebrow-underline">
                            YOUR
                            <svg viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
                                <path
                                    d="M2 7Q50 1 98 6"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="1"
                                    stroke-linecap="round"
                                    vector-effect="non-scaling-stroke" />
                            </svg>
                        </span>
                        VIEW
                        <span class="eyebrow-dot">.</span>
                    </span>
                    <h3>
                        Designed to impress.
                        <br />
                        <span>Craft views people love.</span>
                    </h3>
                </div>
                <div class="forms-story-intro">
                    <p>
                        <span class="forms-story-intro-line">
                            Turn busy data into a clearer picture.
                        </span>
                        <span class="forms-story-intro-line">
                            Thoughtful tables, expressive charts and room for what’s next.
                        </span>
                    </p>
                </div>
            </div>
            <DataShowcase />
        </section>
    </PageRoot>
</template>

<script setup lang="ts">
import type { FormSectionDefinition } from '@rat.md/miru';
import {
    PageRoot,
    Badge,
    Anchor,
    Button,
    Card,
    Tabs,
    FormSectionRenderer,
    Field,
    FieldLabel,
    InputNumber,
    InputNumberContent,
    InputNumberInput,
    InputNumberIncrement,
    InputNumberDecrement,
    InputTags,
    InputTagsItem,
    InputTagsItemText,
    InputTagsItemDelete,
    InputTagsInput,
    InputDateTime,
    ColorPicker,
    UploadZone,
    literal,
} from '@rat.md/miru';
import { useForm } from '@rat.md/miru/composables';
import { IconHeartFilled } from '@tabler/icons-vue';
import { computed, ref } from 'vue';
import { z } from 'zod';
import catalogue from '../component-catalogue.json';
import DataShowcase from './DataShowcase.vue';
import Icon from './Icon.vue';
const formFieldCount = catalogue.filter(
    (item) => item.category === 'FormFields' && item.primary,
).length;
const formFieldRange = `${Math.floor(formFieldCount / 5) * 5}+`;

const activeTab = ref('project');
const widgetLabels: Record<string, string> = {
    seats: 'Team size',
    tags: 'Labels',
    time: 'Daily check-in',
    color: 'Project colour',
    files: 'Attachments',
};
const feedback = ref('');
const values = {
    name: 'Studio / next',
    email: 'hello@yourstudio.design',
    status: 'in-progress',
    owner: 'alex',
    brief: 'A thoughtful workspace for a team with big ideas.',
    seats: 8,
    tags: ['Design', 'Development'],
    date: '2026-12-01',
    time: '09:30',
    color: '#2dd4bf',
    notifications: true,
    approval: true,
    channels: ['email'],
    visibility: 'team',
    password: '',
    markdown: '# A little more possibility\n\n- Make it useful\n- Make it yours',
    json: '{\n  "theme": "yours",\n  "mobile": true\n}',
    files: [] as File[],
};
const schema = z.object({
    ...Object.fromEntries(Object.keys(values).map((key) => [key, z.unknown()])),
    name: z.string().min(2, 'Give your project a name with at least two characters.'),
    email: z.email('Enter a valid email address.'),
    json: z.string().refine((value) => {
        try {
            JSON.parse(value);
            return true;
        } catch {
            return false;
        }
    }, 'Use valid JSON.'),
});
const controller = useForm({
    schema,
    initialValues: values,
    submit: '/local-demo',
    mode: 'json',
});
const options = (items: string[]) =>
    items.map((value) => ({
        value,
        label: literal(value[0].toUpperCase() + value.slice(1).replaceAll('-', ' ')),
    }));
const sections: FormSectionDefinition[] = [
    {
        id: 'project',
        label: literal('Project'),
        hideHeader: true,
        fields: [
            {
                type: 'input',
                name: 'name',
                label: literal('Project name'),
                required: true,
                showValidation: true,
                span: 6,
            },
            {
                type: 'input',
                name: 'email',
                inputType: 'email',
                label: literal('Contact email'),
                required: true,
                showValidation: true,
                span: 6,
            },
            {
                type: 'select',
                name: 'status',
                label: literal('Status'),
                options: options(['in-progress', 'planning', 'ready']),
                span: 6,
            },
            {
                type: 'combobox',
                name: 'owner',
                label: literal('Project owner'),
                options: [
                    { value: 'alex', label: literal('Alex Morgan') },
                    { value: 'sam', label: literal('Sam Lee') },
                    { value: 'jules', label: literal('Jules Rivera') },
                ],
                span: 6,
            },
            { type: 'custom', name: 'seats', slot: 'seats', span: 6 },
            { type: 'custom', name: 'tags', slot: 'tags', span: 6 },
            {
                type: 'textarea',
                name: 'brief',
                label: literal('The big idea'),
                rows: 2,
                maxLength: 240,
                counter: true,
            },
        ],
    },
    {
        id: 'preferences',
        label: literal('Preferences'),
        hideHeader: true,
        fields: [
            {
                type: 'date',
                name: 'date',
                label: literal('Launch date'),
                allowFuture: true,
                span: 6,
            },
            { type: 'custom', name: 'time', slot: 'time', span: 6 },
            { type: 'custom', name: 'color', slot: 'color', span: 6 },
            {
                type: 'password',
                name: 'password',
                label: literal('Guest password'),
                autocomplete: 'new-password',
                span: 6,
            },
            {
                type: 'radio',
                variant: 'success',
                name: 'visibility',
                label: literal('Who can see this?'),
                options: options(['team', 'everyone']),
                span: 6,
            },
            {
                type: 'checkbox-group',
                variant: 'success',
                name: 'channels',
                label: literal('Keep in touch via'),
                options: options(['email', 'in-app']),
                span: 6,
            },
            {
                type: 'switch',
                variant: 'success',
                name: 'notifications',
                label: literal('Project notifications'),
                span: 6,
            },
            {
                type: 'checkbox',
                variant: 'success',
                name: 'approval',
                label: literal('Review changes before publishing'),
                span: 6,
            },
        ],
    },
    {
        id: 'content',
        label: literal('Content & files'),
        hideHeader: true,
        fields: [
            {
                type: 'markdown',
                name: 'markdown',
                label: literal('Project notes'),
                rows: 4,
                span: 6,
            },
            {
                type: 'json',
                name: 'json',
                label: literal('Configuration'),
                rows: 4,
                span: 6,
            },
            { type: 'custom', name: 'files', slot: 'files' },
        ],
    },
];
async function validate() {
    await controller.form.validate('submit');
    for (const name of ['name', 'email', 'json'] as const) {
        controller.form.setFieldMeta(name, (current) => ({
            ...current,
            isTouched: true,
        }));
    }
    if (!controller.form.state.isValid) {
        const invalid = schema.safeParse(controller.form.state.values);
        activeTab.value =
            !invalid.success && invalid.error.issues.some((issue) => issue.path[0] === 'json')
                ? 'content'
                : 'project';
        feedback.value = 'A little attention needed. Check the highlighted fields.';
    } else feedback.value = 'Looking good. Your form is valid — preview only, no request sent.';
}
</script>

<style scoped>
.forms-story {
    margin: 0 64px 100px;
}
.forms-story-heading {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 48px;
    margin-bottom: 36px;
}
.forms-story-heading h2 {
    font-size: clamp(30px, 3.5vw, 48px);
    line-height: 1.13;
    letter-spacing: -1.8px;
    font-weight: 550;
    margin-top: 14px;
}
.forms-story-heading h2 span {
    color: var(--ui-accent-text);
    font-family: Georgia, serif;
    font-style: italic;
    font-weight: 400;
}
.forms-story-heading > .forms-story-intro,
.forms-data-heading > .forms-story-intro {
    display: flex;
    align-items: center;
    gap: 6px;
    max-width: 600px;
    color: color-mix(in srgb, var(--ui-foreground) 75%, var(--ui-muted-foreground));
    font-size: 12px;
    line-height: 1.8;
    text-align: right;
}
.forms-story-intro-line {
    display: block;
}
.forms-story-grid {
    display: grid;
    grid-template-columns: minmax(230px, 0.72fr) minmax(0, 1.6fr);
    gap: 48px;
    align-items: start;
}
.forms-story-notes {
    padding: 24px 0;
}
.forms-story-notes h3 {
    font-size: 30px;
    line-height: 1.2;
    letter-spacing: -1px;
    margin: 22px 0 16px;
}
.forms-story-notes > p {
    color: var(--ui-muted-foreground);
    font-size: 14px;
    line-height: 1.85;
    margin-bottom: 28px;
    max-width: 350px;
}
.forms-story-feature {
    display: flex;
    gap: 14px;
    padding: 20px 0;
    border-top: 1px solid var(--ui-border);
}
.forms-story-feature > svg {
    flex-shrink: 0;
    margin-top: 2px;
    color: var(--ui-accent-text);
}
.forms-story-feature strong {
    display: block;
    font-size: 14px;
    font-weight: 550;
}
.forms-story-feature small {
    display: block;
    color: var(--ui-muted-foreground);
    font-size: 12px;
    line-height: 1.8;
    margin: 8px 0;
}
.forms-story-feature-link {
    display: inline-block;
    font-size: 12px;
}
.forms-story-all-fields {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 12px;
    margin-top: 18px;
}
.forms-story-demo {
    min-width: 0;
    padding: 0;
    overflow: hidden;
    box-shadow: 0 24px 70px -40px color-mix(in srgb, var(--ui-accent-600) 25%, transparent);
}
.forms-demo-heading {
    padding: 26px 28px 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    background: var(--ui-neutral-800);
}
.forms-demo-heading h3 {
    font-size: 18px;
    letter-spacing: -0.5px;
    font-weight: 550;
    margin-top: 8px;
}
.forms-demo-fields {
    padding: 20px 28px 28px;
    min-height: 380px;
}
.forms-demo-fields :deep([data-slot='field']) {
    min-width: 0;
}
.forms-demo-footer {
    display: flex;
    gap: 18px;
    align-items: center;
    justify-content: space-between;
    padding: 18px 28px;
    border-top: 1px solid var(--ui-border);
    background: var(--ui-neutral-800);
}
.forms-demo-footer p {
    color: var(--ui-muted-foreground);
    font-size: 11px;
    line-height: 1.7;
}
.forms-demo-footer-copy {
    min-width: 0;
}
.forms-demo-footer .forms-demo-credit,
.forms-demo-credit :deep(a) {
    font-size: 10px;
}
.forms-demo-credit :deep([data-slot='anchor-external-icon']) {
    display: inline;
}
.forms-demo-heart {
    display: inline;
    width: 12px;
    height: 12px;
    vertical-align: -2px;
    color: var(--ui-accent-text);
    margin-inline: 2px;
}
.forms-demo-footer-copy [role='status'] {
    margin-top: 6px;
}
.forms-demo-footer button {
    flex-shrink: 0;
}
.forms-data-heading {
    display: flex;
    justify-content: space-between;
    align-items: end;
    gap: 24px;
    margin: 42px 0 20px;
}
.forms-data-heading h3 {
    font-size: clamp(30px, 3.5vw, 48px);
    line-height: 1.13;
    font-weight: 550;
    letter-spacing: -1.8px;
    margin: 14px 0 0;
}
.forms-data-heading h3 span {
    color: var(--ui-accent-text);
    font-family: Georgia, serif;
    font-style: italic;
    font-weight: 400;
}
.forms-data-demo {
    min-width: 0;
    padding: 0;
    overflow: hidden;
}
@media (max-width: 1100px) {
    .forms-story {
        margin-inline: 32px;
    }
    .forms-story-grid {
        gap: 28px;
        grid-template-columns: minmax(200px, 0.7fr) minmax(0, 1.5fr);
    }
    .forms-story-heading {
        gap: 24px;
    }
}
@media (max-width: 800px) {
    .forms-story {
        margin: 0 20px 75px;
    }
    .forms-story-heading,
    .forms-data-heading {
        display: block;
    }
    .forms-story-heading > .forms-story-intro,
    .forms-data-heading > .forms-story-intro {
        margin-top: 20px;
        max-width: 500px;
    }
    .forms-story-grid {
        grid-template-columns: 1fr;
        gap: 20px;
    }
    .forms-story-notes {
        padding: 0;
    }
    .forms-story-notes > p {
        max-width: none;
    }
    .forms-story-feature {
        padding: 16px 0;
    }
    .forms-demo-fields {
        min-height: 0;
    }
}
@media (max-width: 500px) {
    .forms-demo-heading,
    .forms-demo-fields {
        padding: 20px 16px;
    }
    .forms-demo-heading {
        align-items: start;
    }
    .forms-demo-heading h3 {
        font-size: 16px;
    }
    .forms-demo-footer {
        flex-direction: column;
        align-items: stretch;
        padding: 16px;
        gap: 12px;
    }
    .forms-demo-footer p {
        max-width: none;
    }
    .forms-data-demo {
        padding: 0;
    }
}
</style>
