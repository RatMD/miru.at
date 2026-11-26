<template>
    <div
        v-if="rows.length"
        class="component-api-scroll"
        tabindex="0"
        role="region"
        :aria-label="`${name} ${section}`">
        <table class="component-api-table">
            <thead>
                <tr>
                    <th v-for="label in columns" :key="label" scope="col">{{ label }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in rows" :key="row.name">
                    <th scope="row">
                        <code>{{ row.name }}</code>
                        <p v-if="section === 'props' && row.description">{{ row.description }}</p>
                    </th>
                    <template v-if="section === 'props'">
                        <td>
                            <details v-if="row.type.length > 75" class="component-api-type">
                                <summary>View type</summary>
                                <code>{{ row.type }}</code>
                            </details>
                            <code v-else>{{ row.type }}</code>
                        </td>
                        <td>
                            <code>{{ row.default ?? '—' }}</code>
                        </td>
                        <td>
                            <span v-if="row.required" class="component-api-required">Required</span>
                            <span v-else class="component-api-optional">—</span>
                        </td>
                    </template>
                    <template v-else-if="section === 'models'">
                        <td>
                            <code>{{ row.prop }}</code>
                        </td>
                        <td>
                            <code>{{ row.event }}</code>
                        </td>
                        <td>{{ row.description }}</td>
                    </template>
                    <template v-else>
                        <td>
                            <code>{{ row.type }}</code>
                        </td>
                        <td>{{ row.description || '—' }}</td>
                    </template>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import componentApi from '../component-api.json';

type Row = {
    name: string;
    type: string;
    description: string;
    default?: string;
    required?: boolean;
    prop?: string;
    event?: string;
};
const props = defineProps<{
    name: string;
    section: 'props' | 'events' | 'slots' | 'models' | 'exposed';
}>();
const component = computed(() =>
    Object.values(componentApi)
        .flat()
        .find((item) => item.name === props.name),
);
const columns = computed(
    () =>
        ({
            props: ['Prop', 'Type', 'Default', 'Required'],
            events: ['Event', 'Payload', 'Description'],
            slots: ['Slot', 'Scope', 'Description'],
            models: ['Binding', 'Prop', 'Update event', 'Description'],
            exposed: ['Member', 'Type', 'Description'],
        })[props.section],
);
const rows = computed<Row[]>(() => {
    const entry = component.value;
    if (!entry) {
        return [];
    }
    if (props.section !== 'models') {
        return [...entry[props.section]].sort((a, b) => a.name.localeCompare(b.name));
    }

    return entry.events
        .filter(
            (event) =>
                event.name.startsWith('update:') &&
                entry.props.some((prop) => prop.name === event.name.slice(7)),
        )
        .map((event) => {
            const prop = event.name.slice(7);

            return {
                name: prop === 'modelValue' ? 'v-model' : `v-model:${prop}`,
                prop,
                event: event.name,
                type: '',
                description: entry.props.find((item) => item.name === prop)?.description ?? '',
            };
        });
});
</script>

<style scoped>
.component-api-scroll {
    width: 100%;
    overflow-x: auto;
    border: 1px solid var(--site-line);
    border-radius: 10px;
    margin: 18px 0 30px;
}
.component-api-scroll:focus-visible {
    outline: 2px solid var(--ui-ring);
    outline-offset: 3px;
}
.component-api-scroll .component-api-table {
    display: table;
    width: 100%;
    min-width: 620px;
    margin: 0;
    border: 0;
    border-collapse: collapse;
    font-size: 13px;
}
.component-api-table th,
.component-api-table td {
    padding: 14px 16px;
    border: 0;
    border-bottom: 1px solid var(--site-line);
    vertical-align: top;
    text-align: left;
}
.component-api-table thead th {
    background: var(--site-panel);
    color: var(--site-muted);
    font-size: 12px;
    font-weight: 550;
    white-space: nowrap;
}
.component-api-table tbody th {
    width: 35%;
    min-width: 220px;
    font-weight: 400;
}
.component-api-table tbody th > code {
    color: var(--site-text);
    font-weight: 600;
}
.component-api-table th p {
    margin: 8px 0 0;
    color: var(--site-muted);
    font-size: 13px;
    line-height: 1.7;
}
.component-api-table tbody tr:last-child > * {
    border-bottom: 0;
}
.component-api-table code {
    font-size: 12px;
    white-space: normal;
    overflow-wrap: anywhere;
}
.component-api-table td {
    color: var(--site-muted);
    min-width: 100px;
}
.component-api-table .component-api-optional {
    color: var(--site-faint);
}
.component-api-required {
    color: var(--ui-primary);
    font-size: 12px;
}
.component-api-type summary {
    cursor: pointer;
    color: var(--site-text);
    font-size: 12px;
}
.component-api-type code {
    display: block;
    margin-top: 8px;
}
</style>
