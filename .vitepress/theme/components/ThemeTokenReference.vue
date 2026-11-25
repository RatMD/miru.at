<template>
    <section class="theme-token-reference" aria-label="Theme token reference">
        <div class="token-settings">
            <div class="token-scheme">
                <Label for="token-scheme">Colour scheme</Label>
                <Select
                    :model-value="profile.preset"
                    @update:model-value="selectPreset(String($event))">
                    <SelectTrigger id="token-scheme"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem v-if="profile.preset === 'custom'" value="custom" disabled>
                            Custom palette
                        </SelectItem>
                        <SelectItem v-for="preset in presets" :key="preset.id" :value="preset.id">
                            {{ preset.name }}
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div class="token-appearance">
                <Switch id="token-dark" v-model="isDark" />
                <Label for="token-dark">Dark appearance</Label>
            </div>
            <span class="token-total">{{ rows.length }} tokens · {{ schemeName }}</span>
        </div>
        <p class="token-caption">
            {{
                profile.preset === 'custom'
                    ? 'Values include your custom palette.'
                    : 'Default values for the selected scheme.'
            }}
            Scheme and appearance changes also update this website. Search by name or value, or
            filter by group.
        </p>
        <DataTable
            v-if="rows.length"
            table-key="docs-theme-tokens"
            data-format="default"
            :list="list"
            :columns="columns"
            :query-handler="query"
            :show-column-toggle="false">
            <template #cell-name="{ item }">
                <code class="token-name">{{ item.name }}</code>
            </template>
            <template #cell-value="{ item }">
                <code class="token-value">{{ item.value }}</code>
            </template>
            <template #cell-resolved="{ item }">
                <div class="token-resolved">
                    <span
                        v-if="item.colour"
                        class="token-swatch"
                        :style="{ background: item.resolved }"
                        aria-hidden="true" />
                    <code class="token-value">{{ item.resolved }}</code>
                </div>
            </template>
        </DataTable>
        <p v-else role="status">Loading theme tokens…</p>
    </section>
</template>
<script setup lang="ts">
import type { DataTableColumnDef, ListPayload, ListState } from '@rat.md/miru';
import {
    adaptLaravelList,
    DataTable,
    Label,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Switch,
} from '@rat.md/miru';
import { useData } from 'vitepress';
import { computed, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue';
import tokenCss from '../../../../package/src/styles/tokens.css?raw';
import foregroundCss from '../../../../package/src/styles/palette-foregrounds.css?raw';
import breakpointCss from '../../../../package/src/styles/breakpoints.css?raw';
import { presets } from '../colors/engine';
import { selectedThemeCss } from '../colors/styles';
import { profile, schemeName, selectPreset } from '../colors/store';

type Token = { name: string; group: string; value: string; resolved: string; colour: boolean };
const { isDark } = useData();
const rows = shallowRef<Token[]>([]);
const state = ref<ListState>({
    page: 1,
    per_page: 15,
    order_by: 'name',
    order: 'ASC',
    search: null,
});
const filters = ref<Record<string, unknown>>({});
const columns: DataTableColumnDef<Token>[] = [
    { accessorKey: 'name', header: 'CSS variable', size: 275, enableHiding: false },
    { accessorKey: 'group', header: 'Group', size: 105 },
    { accessorKey: 'value', header: 'Declared value', size: 0 },
    { accessorKey: 'resolved', header: 'Resolved value', size: 0 },
];

function groupFor(name: string): string {
    if (/^--ui-(?:primary|secondary|accent|info|success|warning|danger|neutral)-\d+/.test(name))
        return 'Palettes';
    if (name.startsWith('--ui-font-')) return 'Typography';
    if (name.startsWith('--ui-breakpoint-')) return 'Responsive';
    if (name.includes('radius')) return 'Shape';
    if (name.includes('shadow')) return 'Effects';
    if (/^--ui-(?:code|editor)-/.test(name)) return 'Code';
    if (/^--ui-(?:primary|secondary|accent|info|success|warning|danger|default|ghost)/.test(name))
        return 'Semantic';
    return 'Surfaces';
}

const colourFamilies = [
    'primary',
    'secondary',
    'accent',
    'info',
    'success',
    'warning',
    'danger',
    'neutral',
];
const semanticOrder = [
    '',
    'foreground',
    'hover',
    'hover-foreground',
    'active',
    'active-foreground',
    'border',
    'text',
];
function compareTokens(a: Token, b: Token): number {
    const family = (name: string) =>
        colourFamilies.findIndex(
            (role) => name === `--ui-${role}` || name.startsWith(`--ui-${role}-`),
        );
    const aFamily = family(a.name);
    const bFamily = family(b.name);
    const familyOrder =
        (aFamily < 0 ? colourFamilies.length : aFamily) -
        (bFamily < 0 ? colourFamilies.length : bFamily);
    if (familyOrder) return familyOrder;
    if (aFamily >= 0) {
        // Keep the semantic recipe together, followed by that colour's numbered shades and ink.
        const paletteOrder = Number(a.group === 'Palettes') - Number(b.group === 'Palettes');
        if (paletteOrder) return paletteOrder;
        if (a.group !== 'Palettes' && b.group !== 'Palettes') {
            const suffix = (name: string) =>
                name.slice(`--ui-${colourFamilies[aFamily]}`.length).replace(/^-/, '');
            const rank = (name: string) => {
                const index = semanticOrder.indexOf(suffix(name));
                return index < 0 ? semanticOrder.length : index;
            };
            const recipeOrder = rank(a.name) - rank(b.name);
            if (recipeOrder) return recipeOrder;
        }
    }
    return a.name.localeCompare(b.name, 'en', { numeric: true });
}

const list = computed(() => {
    const search = String(filters.value.search ?? '')
        .trim()
        .toLowerCase();
    const selectedGroup = filters.value.group;
    const found = rows.value.filter(
        (row) =>
            (!selectedGroup || row.group === selectedGroup) &&
            (!search ||
                `${row.name} ${row.value} ${row.resolved} ${row.group}`
                    .toLowerCase()
                    .includes(search)),
    );
    found.sort(
        (a, b) =>
            ((state.value.order_by === 'group' ? a.group.localeCompare(b.group, 'en') : 0) ||
                compareTokens(a, b)) * (state.value.order === 'DESC' ? -1 : 1),
    );
    const lastPage = Math.max(1, Math.ceil(found.length / state.value.per_page));
    const page = Math.min(Math.max(1, state.value.page), lastPage);
    return adaptLaravelList<Token>({
        results: {
            data: found.slice((page - 1) * state.value.per_page, page * state.value.per_page),
            current_page: page,
            last_page: lastPage,
            per_page: state.value.per_page,
            total: found.length,
        },
        config: {
            searchable: ['name', 'value', 'resolved', 'group'],
            sortable: ['name', 'group'],
            actions: [],
            filters: {
                group: {
                    type: 'select',
                    label: 'Token group',
                    options: [...new Set(rows.value.map((row) => row.group))]
                        .sort()
                        .map((value) => ({ value, label: value })),
                },
            },
        },
        state: { ...state.value, page, search: search || null },
        filters: filters.value,
    });
});
function query(next: ListState, nextFilters: Record<string, unknown>) {
    state.value = { ...next };
    filters.value = { ...nextFilters };
}

let frame: HTMLIFrameElement | undefined;
// Resolve in a clean document so documentation-specific overrides cannot leak into scheme defaults.
function refresh() {
    const doc = frame?.contentDocument;
    const view = frame?.contentWindow;
    if (!doc || !view) return;
    doc.documentElement.className = isDark.value ? 'dark' : '';
    const style = doc.createElement('style');
    style.textContent = `${tokenCss}\n${foregroundCss}\n${breakpointCss}\n${selectedThemeCss(profile.value)}`;
    doc.head.replaceChildren(style);
    const declarations = new Map<string, string>();
    for (const sheet of Array.from(doc.styleSheets)) {
        for (const rule of Array.from(sheet.cssRules)) {
            // These source files declare global tokens in plain, ordered style rules.
            if (!('selectorText' in rule) || !('style' in rule)) continue;
            const declaration = rule as CSSStyleRule;
            if (!doc.documentElement.matches(declaration.selectorText)) continue;
            for (const name of Array.from(declaration.style)) {
                if (name.startsWith('--ui-'))
                    declarations.set(name, declaration.style.getPropertyValue(name).trim());
            }
        }
    }
    const computedStyle = view.getComputedStyle(doc.documentElement);
    rows.value = [...declarations].map(([name, value]) => {
        const resolved = computedStyle.getPropertyValue(name).trim();
        return {
            name,
            group: groupFor(name),
            value,
            resolved,
            colour: CSS.supports('color', resolved),
        };
    });
}
onMounted(() => {
    frame = document.createElement('iframe');
    frame.title = 'Theme token value resolver';
    frame.setAttribute('aria-hidden', 'true');
    frame.tabIndex = -1;
    frame.style.cssText =
        'position:absolute;width:0;height:0;border:0;visibility:hidden;pointer-events:none';
    document.body.append(frame);
    refresh();
});
watch([profile, isDark], refresh, { deep: true, flush: 'post' });
onBeforeUnmount(() => frame?.remove());
</script>
<style scoped>
.theme-token-reference {
    min-width: 0;
    margin-block: 24px;
}
.token-settings {
    display: flex;
    flex-wrap: wrap;
    align-items: end;
    gap: 18px 24px;
}
.token-scheme {
    display: grid;
    gap: 8px;
    width: 220px;
}
.token-appearance {
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 36px;
}
.token-total {
    margin-left: auto;
    padding-block: 8px;
    color: var(--ui-muted-foreground);
    font-size: 12px;
}
.token-caption {
    color: var(--ui-muted-foreground);
    font-size: 13px;
}
.token-resolved {
    display: flex;
    align-items: center;
    gap: 8px;
}
.token-swatch {
    flex: 0 0 20px;
    height: 20px;
    border: 1px solid var(--ui-border);
    border-radius: 5px;
}
.token-name,
.token-value {
    font-size: 11px;
    white-space: normal;
    overflow-wrap: anywhere;
    background: none;
    border: 0;
    padding: 0;
}
</style>
