<template>
    <ComponentExample name="DataTable" :code="source" :show-playground="false" />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import ComponentExample from './ComponentExample.vue';

const props = defineProps<{ example: 'values' | 'grouped' | 'expanded' }>();
const source = computed(() => {
    const grouped = props.example === 'grouped';
    const expanded = props.example === 'expanded';

    return `<script lang="ts" setup>
import { DataTable, DataTableMoneyCell, adaptLaravelList, createBadgeColumn, createCountColumn, createDateTimeColumn, createExpansionColumn } from '@rat.md/miru';
import type { DataTableColumnDef } from '@rat.md/miru';

type Project = { id: string; name: string; code: string; team: string; quantity: number; status: string; updated: string; amount: number; currency: string };
const items: Project[] = [
    { id: 'studio', name: 'Studio website', code: 'PRJ-001', team: 'Design', quantity: 12, status: 'active', updated: '2026-11-25', amount: 2400, currency: 'GBP' },
    { id: 'booking', name: 'Booking portal', code: 'PRJ-002', team: 'Product', quantity: 4, status: 'pending', updated: '2026-11-24', amount: 875, currency: 'GBP' },
    { id: 'catalogue', name: 'Winter catalogue', code: 'PRJ-003', team: 'Design', quantity: 0, status: 'active', updated: '2026-11-22', amount: 320, currency: 'GBP' },
];
const list = adaptLaravelList<Project>({
    results: { data: items, current_page: 1, last_page: 1, per_page: 10, total: items.length },
    config: { searchable: [], sortable: [], filters: {}, actions: [] },
    filters: {},
});
const identity: DataTableColumnDef<Project>[] = [
    { accessorKey: 'name', header: 'Project', size: 0, enableHiding: false },
    { accessorKey: 'team', header: 'Team', size: 110, meta: { mobileHidden: true } },
];
const statusColumn = createBadgeColumn<Project>({ accessorKey: 'status', label: 'Status', size: 100 });
statusColumn.meta = { ...statusColumn.meta, statuses: { active: { label: 'Active' }, pending: { label: 'Pending' } } };
const details: DataTableColumnDef<Project>[] = [
    createCountColumn<Project>({ accessorKey: 'quantity', label: 'Tasks', size: 80 }),
    statusColumn,
    { accessorKey: 'amount', header: 'Budget', size: 110, meta: { component: DataTableMoneyCell, currencyKey: 'currency', align: 'right' } },
    createDateTimeColumn<Project>({ accessorKey: 'updated', label: 'Updated', display: 'date', size: 120, mobileHidden: true }),
];
const columns: DataTableColumnDef<Project>[] = ${grouped ? "[{ id: 'identity', header: 'Project details', columns: identity }, { id: 'delivery', header: 'Delivery', columns: details }]" : expanded ? '[createExpansionColumn<Project>(), ...identity, ...details]' : '[...identity, ...details]'};
<\/script>

<template>
    <DataTable
        table-key="docs-${props.example}"
        :list="list"
        :columns="columns"
        :show-toolbar="false"
        pagination-position="none"${expanded ? '\n        :row-expandable="() => true"' : ''}>
${
    grouped
        ? `        <template #cell-name="{ item }">
            <div class="font-medium">{{ item.name }}</div>
            <div class="text-xs text-muted-foreground">{{ item.code }} · {{ item.team }}</div>
        </template>\n`
        : ''
}${
        expanded
            ? `        <template #expanded-row="{ item }">
            <section class="bg-muted/20 p-4">
                <p class="font-medium">{{ item.name }}</p>
                <p class="text-sm text-muted-foreground">{{ item.team }} · {{ item.quantity }} tasks · {{ item.code }}</p>
            </section>
        </template>\n`
            : ''
    }    </DataTable>
</template>`;
});
</script>
