<template>
    <div class="data-showcase">
        <Card class="forms-data-demo project-card">
            <div class="project-heading">
                <div>
                    <span class="eyebrow">A LITTLE ORDER. A LOT OF POSSIBILITY.</span>
                    <h4>Your next big things.</h4>
                    <p>
                        A working project list. Try a search, a filter or a little change of
                        perspective.
                    </p>
                </div>
                <Badge variant="success">{{ projects.length }} possibilities</Badge>
            </div>
            <DataTable
                class="project-table"
                table-key="homepage-projects-v2"
                :list="list"
                :columns="columns"
                :actions="actions"
                :query-handler="query"
                :row-expandable="() => true"
                embedded>
                <template #cell-name="{ item }">
                    <div class="project-name">
                        <span class="project-monogram">{{ item.name.slice(0, 2) }}</span>
                        <div>
                            <strong>{{ item.name }}</strong>
                            <small>
                                {{ item.code }}
                                <span>·</span>
                                {{ item.owner }}
                            </small>
                        </div>
                    </div>
                </template>
                <template #expanded-row="{ item }">
                    <div class="project-subtable">
                        <div class="subtable-heading">
                            <span>
                                <strong>A closer look at {{ item.name }}.</strong>
                                <small>Small steps behind the bigger picture.</small>
                            </span>
                            <Badge variant="accent">3 next steps</Badge>
                        </div>
                        <DataTable
                            :table-key="`homepage-project-${item.id}-tasks`"
                            :list="taskList(item)"
                            :columns="taskColumns"
                            :query-handler="(state) => queryTasks(item.id, state)"
                            :show-toolbar="false"
                            pagination-position="none" />
                    </div>
                </template>
            </DataTable>
            <div class="powered-line">
                <span>
                    Powered by
                    <Anchor
                        href="https://tanstack.com/table"
                        target="_blank"
                        rel="noopener noreferrer"
                        animation="slide">
                        @tanstack/vue-table
                    </Anchor>
                    and a lot of
                    <IconHeartFilled class="powered-heart" aria-label="love" role="img" />
                    by miru.
                </span>
                <Anchor href="/docs/data-table/introduction" animation="slide">
                    Discover DataTable ↗
                </Anchor>
            </div>
            <p v-if="actionFeedback" class="project-feedback" role="status">
                {{ actionFeedback }}
            </p>
        </Card>

        <div class="data-widgets">
            <CardChart
                class="momentum-card"
                title="Good things are adding up."
                description="From first ideas to finished work. A little momentum, made visible."
                :empty="false"
                empty-label="No activity yet">
                <template #title>
                    <div class="widget-title">
                        <span class="eyebrow">THE BIGGER PICTURE</span>
                        <span class="chart-title">Good things are adding up.</span>
                    </div>
                </template>
                <div class="chart-summary">
                    <div>
                        <span class="metric-label">Work delivered</span>
                        <strong>
                            {{ deliveredTotal }}
                            <span>{{ chartPeriod === 'Year' ? 'this year' : 'this quarter' }}</span>
                        </strong>
                    </div>
                    <Badge variant="success">↗ 24.8%</Badge>
                    <div class="chart-period">
                        <Button
                            v-for="period in ['Quarter', 'Year']"
                            :key="period"
                            size="sm"
                            :variant="chartPeriod === period ? 'primary' : 'ghost'"
                            @click="chartPeriod = period">
                            {{ period }}
                        </Button>
                    </div>
                </div>
                <ApexChart
                    :key="chartPeriod"
                    type="line"
                    :height="360"
                    :series="chartSeries"
                    :options="chartOptions" />
                <div class="chart-legend">
                    <span>
                        <i class="legend-primary" />
                        Delivered
                    </span>
                    <span>
                        <i class="legend-accent" />
                        In motion
                    </span>
                    <span>
                        <i class="legend-secondary" />
                        Planned
                    </span>
                </div>
                <div class="chart-totals">
                    <div>
                        <small>PROJECTS IN PLAY</small>
                        <strong>
                            {{ projects.length }}
                            <span>good ideas</span>
                        </strong>
                    </div>
                    <div>
                        <small>IN MOTION</small>
                        <strong>
                            {{ motionTotal }}
                            <span>tasks moving</span>
                        </strong>
                    </div>
                    <div>
                        <small>NEXT UP</small>
                        <strong>
                            {{ plannedTotal }}
                            <span>possibilities</span>
                        </strong>
                    </div>
                </div>
                <div class="chart-insight">
                    <span class="insight-icon">↗</span>
                    <div>
                        <strong>Small steps. A rather good trajectory.</strong>
                        <p>
                            Three native series, one clearer picture. Hover to explore the details.
                        </p>
                    </div>
                </div>
                <div class="powered-line">
                    <span>
                        Powered by
                        <Anchor
                            href="https://apexcharts.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            animation="slide">
                            ApexCharts
                        </Anchor>
                        and a lot of
                        <IconHeartFilled class="powered-heart" aria-label="love" role="img" />
                        by miru.
                    </span>
                    <Anchor href="/components/card-chart" animation="slide">
                        Meet CardChart ↗
                    </Anchor>
                </div>
            </CardChart>

            <Card class="schedule-card">
                <div class="schedule-heading">
                    <span class="eyebrow">MAKE ROOM FOR WHAT’S NEXT</span>
                    <div>
                        <h4>A little time, well spent.</h4>
                        <Badge variant="accent">Schedule</Badge>
                    </div>
                    <p>A compact calendar. Pick a dotted day to see what’s happening.</p>
                </div>
                <Schedule
                    v-model:date="scheduleDate"
                    :events="events"
                    :views="['month']"
                    presentation="compact"
                    event-display="dots"
                    locale="en-GB"
                    readonly
                    :can-create="false"
                    :can-edit="false"
                    detail-presentation="cards"
                    class="showcase-schedule" />
                <div class="schedule-next">
                    <span class="upcoming-dot" />
                    <div>
                        <small>NEXT ON THE AGENDA</small>
                        <strong>Design catch-up</strong>
                        <p>{{ nextMeetingLabel }} · Studio / next · 30 min</p>
                    </div>
                    <Badge variant="info">Team</Badge>
                </div>
                <div class="powered-line">
                    <span>Small footprint. Proper event details.</span>
                    <Anchor href="/components/schedule" animation="slide">
                        Explore Schedule ↗
                    </Anchor>
                </div>
            </Card>
        </div>
        <div class="data-discover">
            <Button
                as="a"
                href="/components/"
                variant="primary"
                size="lg"
                class="data-discover-button">
                <IconLayoutGrid :size="19" />
                Discover all components
                <IconArrowUpRight class="discover-arrow" :size="19" />
            </Button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type {
    DataTableColumnDef,
    DataTableRowAction,
    ListPayload,
    ListState,
    ScheduleEvent,
} from '@rat.md/miru';
import {
    Anchor,
    Badge,
    Button,
    Card,
    CardChart,
    ApexChart,
    DataTable,
    Schedule,
    createStatusColumn,
    createCountColumn,
    createDateTimeColumn,
    createActionsColumn,
    createExpansionColumn,
} from '@rat.md/miru';
import {
    IconEye,
    IconCircleCheck,
    IconProgress,
    IconClock,
    IconHeartFilled,
    IconLayoutGrid,
    IconArrowUpRight,
} from '@tabler/icons-vue';
import { computed, ref } from 'vue';

interface Project {
    id: string;
    name: string;
    code: string;
    owner: string;
    status: string;
    tasks: number;
    due: string;
}
const names = [
    'Studio / next',
    'Customer portal',
    'A better onboarding',
    'Something wonderful',
    'Mobile workspace',
    'The details matter',
    'Inventory, reimagined',
    'Team essentials',
    'A brighter dashboard',
    'Client spaces',
    'Field notes',
    'Project tomorrow',
    'The little extras',
    'A fresh perspective',
    'Made for people',
    'One more good idea',
    'Connected teams',
    'Everything in its place',
    'Better together',
    'Room to grow',
    'A simpler workflow',
    'Small screen, big ideas',
    'Delivery, with care',
    'Your next chapter',
];
const projects = ref<Project[]>(
    names.map((name, i) => ({
        id: String(i + 1),
        name,
        code: `MRU-${String(i + 101)}`,
        owner: ['Alex Morgan', 'Jules Rivera', 'Sam Lee'][i % 3]!,
        status: ['active', 'review', 'planning'][i % 3]!,
        tasks: 4 + ((i * 7) % 28),
        due: `2026-12-${String(2 + i).padStart(2, '0')}`,
    })),
);
const state = ref<ListState>({
    page: 1,
    per_page: 10,
    order_by: '',
    order: 'ASC',
    search: null,
});
const filters = ref<Record<string, unknown>>({});
const actionFeedback = ref('');

/**
 * Filter and paginate the demonstration records.
 * @param next
 * @param nextFilters
 */
function query(next: ListState, nextFilters: Record<string, unknown>) {
    state.value = next;
    filters.value = { ...nextFilters };
}

const list = computed<ListPayload<Project>>(() => {
    const current = state.value;
    const search = String(filters.value.search ?? current.search ?? '').toLowerCase();
    const status = filters.value.status;
    const rows = projects.value.filter(
        (row) =>
            `${row.name} ${row.code} ${row.owner}`.toLowerCase().includes(search) &&
            (!status || row.status === status),
    );
    if (current.order_by) {
        rows.sort((a, b) => {
            const av = a[current.order_by as keyof Project],
                bv = b[current.order_by as keyof Project];

            return (
                (typeof av === 'number' && typeof bv === 'number'
                    ? av - bv
                    : String(av).localeCompare(String(bv))) * (current.order === 'ASC' ? 1 : -1)
            );
        });
    }
    const last = Math.max(1, Math.ceil(rows.length / current.per_page));
    const page = Math.min(Math.max(current.page, 1), last);
    const start = (page - 1) * current.per_page;

    return {
        results: {
            data: rows.slice(start, start + current.per_page),
            current_page: page,
            first_page: 1,
            last_page: last,
            from: rows.length ? start + 1 : 0,
            to: Math.min(start + current.per_page, rows.length),
            total: rows.length,
            per_page: current.per_page,
            path: '/',
            first_page_url: '?page=1',
            last_page_url: `?page=${last}`,
            prev_page_url: page > 1 ? `?page=${page - 1}` : null,
            next_page_url: page < last ? `?page=${page + 1}` : null,
            links: [],
        },
        state: { ...current, page },
        filters: filters.value,
        config: {
            searchable: ['name', 'owner', 'code'],
            sortable: ['name', 'status', 'tasks', 'due'],
            actions: [],
            filters: {
                status: {
                    label: 'Project status',
                    type: 'select',
                    options: [
                        { value: 'active', label: 'In progress' },
                        { value: 'review', label: 'In review' },
                        { value: 'planning', label: 'Planning' },
                    ],
                },
            },
        },
    };
});
const columns: DataTableColumnDef<Project>[] = [
    createExpansionColumn<Project>({ label: 'Show project tasks' }),
    {
        accessorKey: 'name',
        header: 'Project',
        size: 330,
        meta: { label: 'Project', mobileSize: 165 },
    },
    createStatusColumn<Project>({
        accessorKey: 'status',
        label: 'Status',
        size: 150,
        mobileSize: 75,
        statuses: {
            active: {
                label: 'In progress',
                icon: IconProgress,
                colorClass: 'text-success',
            },
            review: {
                label: 'In review',
                icon: IconCircleCheck,
                colorClass: 'text-warning',
            },
            planning: { label: 'Planning', icon: IconClock, colorClass: 'text-info' },
        },
    }),
    createCountColumn<Project>({
        accessorKey: 'tasks',
        label: 'Tasks',
        size: 90,
        mobileHidden: true,
    }),
    createDateTimeColumn<Project>({
        accessorKey: 'due',
        label: 'Due date',
        display: 'date',
        size: 145,
        mobileHidden: true,
    }),
    createActionsColumn<Project>({ size: 90, mobileSize: 48 }),
];
const actions: DataTableRowAction<Project>[] = [
    {
        key: 'preview',
        label: 'Preview project',
        icon: IconEye,
        color: 'accent',

        /**
         * Run the selected demonstration row action.
         * @param row
         */
        execute: (row) => {
            actionFeedback.value = `${row.name} · ${row.owner} · ${row.tasks} tasks. A rather good start.`;
        },
    },
    {
        key: 'review',
        label: 'Send for review',
        icon: IconCircleCheck,
        color: 'primary',

        /**
         * Run the selected demonstration row action.
         * @param row
         */
        execute: (row) => {
            projects.value = projects.value.map((project) =>
                project.id === row.id ? { ...project, status: 'review' } : project,
            );
            actionFeedback.value = `${row.name} is ready for a fresh pair of eyes.`;
        },
    },
];
interface ProjectTask {
    id: string;
    name: string;
    owner: string;
    status: string;
    effort: number;
    due: string;
}
const taskColumns: DataTableColumnDef<ProjectTask>[] = [
    {
        accessorKey: 'name',
        header: 'Next step',
        size: 360,
        meta: { label: 'Next step', mobileSize: 155 },
    },
    {
        accessorKey: 'owner',
        header: 'Assigned to',
        size: 180,
        meta: { label: 'Assigned to', mobileHidden: true },
    },
    createStatusColumn<ProjectTask>({
        accessorKey: 'status',
        label: 'Status',
        size: 96,
        mobileSize: 80,
        statuses: {
            active: {
                label: 'In progress',
                icon: IconProgress,
                colorClass: 'text-success',
            },
            review: {
                label: 'In review',
                icon: IconCircleCheck,
                colorClass: 'text-warning',
            },
            planning: { label: 'Planning', icon: IconClock, colorClass: 'text-info' },
        },
    }),
    createCountColumn<ProjectTask>({
        accessorKey: 'effort',
        label: 'Hours',
        size: 80,
        mobileSize: 70,
    }),
    createDateTimeColumn<ProjectTask>({
        accessorKey: 'due',
        label: 'Due date',
        display: 'date',
        size: 145,
        mobileHidden: true,
    }),
];
const taskStates = ref<Record<string, ListState>>({});

/**
 * Filter the tasks associated with a project.
 * @param projectId
 * @param state
 */
function queryTasks(projectId: string, state: ListState) {
    taskStates.value = { ...taskStates.value, [projectId]: state };
}

/**
 * Build the task list for the selected project.
 * @param project
 * @returns
 */
function taskList(project: Project): ListPayload<ProjectTask> {
    const state = taskStates.value[project.id] ?? {
        page: 1,
        per_page: 10,
        order_by: '',
        order: 'ASC' as const,
        search: null,
    };
    const data = [
        'Shape the first idea',
        'Make small screens shine',
        'Check the little details',
    ].map((name, index) => ({
        id: `${project.id}-${index}`,
        name,
        owner: [project.owner, 'Jules Rivera', 'Sam Lee'][index]!,
        status: ['active', 'planning', 'review'][index]!,
        effort: [3, 5, 2][index]!,
        due: new Date(Date.parse(project.due) + index * 86400000).toISOString().slice(0, 10),
    }));
    if (state.order_by) {
        data.sort((a, b) => {
            const left = a[state.order_by as keyof ProjectTask];
            const right = b[state.order_by as keyof ProjectTask];
            const comparison =
                typeof left === 'number' && typeof right === 'number'
                    ? left - right
                    : String(left).localeCompare(String(right));

            return comparison * (state.order === 'ASC' ? 1 : -1);
        });
    }

    return {
        results: {
            data,
            current_page: 1,
            first_page: 1,
            last_page: 1,
            from: 1,
            to: data.length,
            per_page: 10,
            total: data.length,
            path: '/',
            first_page_url: null,
            last_page_url: null,
            prev_page_url: null,
            next_page_url: null,
            links: [],
        },
        filters: {},
        state,
        config: {
            searchable: [],
            sortable: ['name', 'owner', 'status', 'effort', 'due'],
            actions: [],
            filters: {},
        },
    };
}

const chartPeriod = ref('Quarter');
const chartSeries = computed(() => {
    const factor = chartPeriod.value === 'Year' ? 3 : 1;

    return [
        {
            name: 'Delivered',
            type: 'area',
            data: [32, 45, 39, 67, 62, 91, 83, 112, 104, 140, 151, 184].map((v) => v * factor),
        },
        {
            name: 'In motion',
            type: 'column',
            data: [21, 28, 24, 35, 31, 42, 37, 48, 44, 56, 52, 64].map((v) => v * factor),
        },
        {
            name: 'Planned',
            type: 'line',
            data: [45, 50, 58, 65, 73, 81, 92, 105, 119, 133, 149, 168].map((v) => v * factor),
        },
    ];
});
const motionTotal = computed(() =>
    chartSeries.value[1]!.data.reduce((sum, value) => sum + value, 0).toLocaleString('en-GB'),
);
const plannedTotal = computed(() =>
    chartSeries.value[2]!.data.reduce((sum, value) => sum + value, 0).toLocaleString('en-GB'),
);
const deliveredTotal = computed(() =>
    chartSeries.value[0]!.data.reduce((sum, value) => sum + value, 0).toLocaleString('en-GB'),
);
const chartOptions = computed(() => ({
    chart: {
        id: 'miru-momentum',
        stacked: false,
        zoom: { enabled: false },
        animations: { enabled: true, speed: 650 },
    },
    stroke: { width: [3, 0, 2], curve: 'smooth' as const, dashArray: [0, 0, 6] },
    fill: {
        type: ['gradient', 'solid', 'solid'],
        opacity: [0.35, 0.5, 1],
        gradient: {
            shadeIntensity: 0,
            opacityFrom: 0.45,
            opacityTo: 0.02,
            stops: [0, 95],
        },
    },
    plotOptions: { bar: { columnWidth: '32%', borderRadius: 4 } },
    markers: { size: 0, hover: { size: 5 } },
    xaxis: {
        categories:
            chartPeriod.value === 'Year'
                ? [
                      'Jan',
                      'Feb',
                      'Mar',
                      'Apr',
                      'May',
                      'Jun',
                      'Jul',
                      'Aug',
                      'Sep',
                      'Oct',
                      'Nov',
                      'Dec',
                  ]
                : [
                      'W01',
                      'W02',
                      'W03',
                      'W04',
                      'W05',
                      'W06',
                      'W07',
                      'W08',
                      'W09',
                      'W10',
                      'W11',
                      'W12',
                  ],
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { style: { fontSize: '10px' } },
    },
    yaxis: {
        labels: {
            /**
             * Format a demonstration value for display.
             * @param value
             * @returns
             */
            formatter: (value: number) => Math.round(value).toLocaleString('en-GB'),
            style: { fontSize: '10px' },
        },
    },
    grid: { strokeDashArray: 4, padding: { left: 8, right: 12 } },
    legend: { show: false },
    tooltip: { shared: true, intersect: false },
    dataLabels: { enabled: false },
}));

const now = new Date();

/**
 * Create a demonstration date for the requested day.
 * @param day
 * @returns
 */
function dateAt(day: number) {
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

const meetingDay = Math.min(
    now.getDate() + 1,
    new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate(),
);
const scheduleDate = ref(dateAt(now.getDate()));
const nextMeetingLabel = new Date(now.getFullYear(), now.getMonth(), meetingDay).toLocaleDateString(
    'en-GB',
    { day: 'numeric', month: 'short' },
);
const events: ScheduleEvent[] = [
    {
        id: 'catchup',
        title: 'Design catch-up',
        start: dateAt(meetingDay) + 'T10:00:00Z',
        end: dateAt(meetingDay) + 'T10:30:00Z',
        color: 'var(--ui-accent)',
        typeLabel: 'Team session',
        description:
            'A few fresh eyes on Studio / next. Bring your ideas; we’ll bring the questionable sketches.',
        details: [
            { label: 'Project', value: 'Studio / next' },
            { label: 'Host', value: 'Alex Morgan' },
            { label: 'Location', value: 'The little meeting room' },
        ],
    },
    ...[
        { day: 5, title: 'A fresh start', type: 'Kick-off', color: 'primary' },
        {
            day: 12,
            title: 'Make it feel right',
            type: 'Design review',
            color: 'secondary',
        },
        {
            day: 19,
            title: 'Ship something lovely',
            type: 'Milestone',
            color: 'success',
        },
        { day: 26, title: 'The bigger picture', type: 'Planning', color: 'info' },
    ].map((event) => ({
        id: event.type,
        title: event.title,
        start: dateAt(event.day),
        allDay: true,
        color: `var(--ui-${event.color})`,
        typeLabel: event.type,
        description: 'Good work starts with a little room to think, share and make things better.',
        details: [
            { label: 'Team', value: 'Product & design' },
            { label: 'Project', value: 'Studio / next' },
        ],
    })),
    {
        id: 'notes',
        title: 'Little details, big difference',
        start: dateAt(meetingDay),
        allDay: true,
        color: 'var(--ui-warning)',
        typeLabel: 'Reminder',
        description:
            'Check keyboard navigation, small screens and all the little things that make an interface feel good.',
        details: [{ label: 'Checklist', value: 'Accessibility · Mobile · Motion' }],
    },
];
</script>

<style scoped>
.project-feedback {
    padding: 0 28px 16px;
    font-size: 11px;
}
.data-discover {
    display: flex;
    justify-content: center;
    padding-top: 40px;
}
.data-discover-button {
    gap: 12px;
    padding-inline: 24px;
    animation: discover-glow 4s ease-in-out infinite;
    transition:
        transform 200ms ease,
        box-shadow 200ms ease;
}
.data-discover-button:hover {
    transform: translateY(-3px);
}
.discover-arrow {
    transition: transform 200ms ease;
}
.data-discover-button:hover .discover-arrow {
    transform: translate(2px, -2px);
}
@keyframes discover-glow {
    0%,
    100% {
        box-shadow: 0 6px 24px -8px color-mix(in srgb, var(--ui-primary) 30%, transparent);
    }
    50% {
        box-shadow: 0 10px 34px -8px color-mix(in srgb, var(--ui-primary) 55%, transparent);
    }
}
@media (prefers-reduced-motion: reduce) {
    .data-discover-button {
        animation: none;
    }
    .data-discover-button,
    .discover-arrow {
        transition: none;
    }
}
.chart-totals {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin: 26px 28px 0;
    padding-top: 22px;
    border-top: 1px solid var(--ui-border);
    gap: 16px;
}
.chart-totals small {
    font-size: 8px;
    color: var(--ui-muted-foreground);
    letter-spacing: 1px;
}
.chart-totals strong {
    display: block;
    font-size: 22px;
    font-weight: 500;
    margin-top: 8px;
    letter-spacing: -0.5px;
}
.chart-totals strong span {
    display: block;
    color: var(--ui-muted-foreground);
    font-size: 10px;
    letter-spacing: 0;
    margin-top: 4px;
}
.chart-title {
    display: block;
    margin: 8px 0;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.6px;
    line-height: 1.3;
}
.powered-line :deep([data-slot='anchor-external-icon']) {
    display: inline;
}
.powered-heart {
    display: inline;
    width: 12px;
    height: 12px;
    vertical-align: -2px;
    color: var(--ui-accent-text);
    margin-inline: 2px;
}
.project-subtable {
    padding: 24px;
}
.subtable-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
}
.subtable-heading strong {
    display: block;
    font-size: 12px;
    font-weight: 550;
}
.subtable-heading small {
    display: block;
    font-size: 10px;
    color: var(--ui-muted-foreground);
    margin-top: 4px;
}
.project-subtable :deep(td:first-child) {
    white-space: normal;
}
.data-showcase {
    min-width: 0;
}
.project-card {
    padding: 0;
    overflow: hidden;
    gap: 0;
}
.project-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    padding: 26px 28px 8px;
}
h4 {
    margin: 8px 0;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.6px;
    line-height: 1.3;
}
p {
    color: var(--ui-muted-foreground);
    font-size: 12px;
    line-height: 1.8;
    margin: 0;
}
.project-heading > :last-child {
    flex-shrink: 0;
}
.project-card :deep(.project-table > :first-child) {
    padding: 18px 28px;
}
.project-card :deep([data-slot='data-table']) {
    gap: 0;
}
.project-card :deep(.project-table > *) {
    margin-top: 0;
    margin-bottom: 0;
}
.project-card :deep(.project-table > .bg-background) {
    overflow-x: auto;
    border-top: 1px solid var(--ui-border);
}
.project-card :deep(.project-table > :last-child) {
    padding: 18px 28px;
    background: color-mix(in srgb, var(--ui-muted) 35%, var(--ui-card));
}
.project-card :deep(.project-table > .bg-background > table > thead > tr > th) {
    font-size: 11px;
}
.project-card :deep(.project-table > .bg-background > table > tbody > tr > td.dt-column) {
    padding-block: 10px;
    font-size: 12px;
}
.project-card :deep(.project-table > .bg-background > table > thead > tr > th:last-child),
.project-card
    :deep(.project-table > .bg-background > table > tbody > tr > td.dt-column:last-child) {
    border-left: 1px solid var(--ui-border);
}
.project-name {
    display: flex;
    align-items: center;
    gap: 12px;
    white-space: nowrap;
}
.project-monogram {
    width: 32px;
    height: 32px;
    display: grid;
    place-items: center;
    flex-shrink: 0;
    font-size: 10px;
    border: 1px solid color-mix(in srgb, var(--ui-primary) 25%, transparent);
    border-radius: 8px;
    background: color-mix(in srgb, var(--ui-primary) 9%, var(--ui-card));
    color: var(--ui-primary-text);
}
.project-name strong {
    font-size: 12px;
    font-weight: 550;
}
.project-name small {
    display: block;
    font-size: 10px;
    color: var(--ui-muted-foreground);
    margin-top: 3px;
}
.project-name small span {
    opacity: 0.5;
    padding-inline: 4px;
}
.powered-line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    border-top: 1px solid var(--ui-border);
    padding: 15px 28px;
    color: var(--ui-muted-foreground);
    font-size: 10px;
    line-height: 1.7;
}
.powered-line :deep(a) {
    font-size: inherit;
}
.powered-line [role='status'] {
    text-align: right;
}
.data-widgets {
    display: grid;
    grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
    gap: 24px;
    margin-top: 24px;
}
.momentum-card,
.schedule-card {
    min-width: 0;
    overflow: hidden;
    gap: 0;
}
.momentum-card :deep([data-slot='card-header']) {
    padding: 26px 28px 0;
}
.momentum-card :deep([data-slot='card-content']) {
    padding: 0;
    display: flex;
    flex: 1;
    flex-direction: column;
}
.momentum-card :deep([data-slot='card-description']) {
    font-size: 12px;
    line-height: 1.8;
}
.chart-summary {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 28px 28px 6px;
    flex-wrap: wrap;
}
.metric-label {
    font-size: 10px;
    color: var(--ui-muted-foreground);
}
.chart-summary strong {
    display: flex;
    align-items: baseline;
    gap: 10px;
    font-size: 36px;
    font-weight: 500;
    letter-spacing: -1.5px;
    margin-top: 4px;
}
.chart-summary strong span {
    font-size: 10px;
    color: var(--ui-muted-foreground);
    letter-spacing: 0;
}
.chart-period {
    margin-left: auto;
    display: flex;
    gap: 3px;
    border: 1px solid var(--ui-border);
    border-radius: 8px;
    padding: 3px;
}
.momentum-card :deep([data-slot='apexchart']) {
    margin: 0 14px;
}
.chart-legend {
    display: flex;
    justify-content: center;
    gap: 24px;
    font-size: 10px;
    color: var(--ui-muted-foreground);
}
.chart-legend span {
    display: flex;
    align-items: center;
    gap: 7px;
}
.chart-legend i {
    width: 7px;
    height: 7px;
    border-radius: 2px;
}
.legend-primary {
    background: var(--ui-primary);
}
.legend-accent {
    background: var(--ui-secondary);
}
.legend-secondary {
    background: var(--ui-accent);
}
.chart-insight {
    display: flex;
    align-items: center;
    gap: 14px;
    margin: 24px 28px;
    padding: 16px;
    border: 1px solid color-mix(in srgb, var(--ui-accent) 20%, var(--ui-border));
    border-radius: 10px;
    background: color-mix(in srgb, var(--ui-accent) 5%, var(--ui-card));
}
.insight-icon {
    color: var(--ui-accent-text);
    font-size: 24px;
}
.chart-insight strong {
    font-size: 12px;
    font-weight: 550;
}
.chart-insight p {
    font-size: 11px;
    margin-top: 4px;
}
.momentum-card .powered-line {
    margin-top: auto;
}
.schedule-heading {
    padding: 26px 24px 18px;
}
.schedule-heading > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
}
.schedule-heading h4 {
    font-size: 18px;
}
.showcase-schedule {
    border-inline: 0;
    border-radius: 0;
}
.schedule-next {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 20px 24px;
    margin-top: auto;
}
.schedule-next small {
    font-size: 8px;
    color: var(--ui-muted-foreground);
    letter-spacing: 1px;
}
.schedule-next strong {
    display: block;
    font-size: 12px;
    margin-top: 6px;
}
.schedule-next p {
    font-size: 10px;
}
.schedule-next > :last-child {
    margin-left: auto;
}
.upcoming-dot {
    width: 8px;
    height: 8px;
    background: var(--ui-accent);
    border-radius: 50%;
    box-shadow: 0 0 0 5px color-mix(in srgb, var(--ui-accent) 12%, transparent);
}
@media (min-width: 1100px) {
    .data-widgets {
        margin-inline: -1px;
    }
}
@media (max-width: 1499px) {
    .data-widgets {
        grid-template-columns: minmax(0, 1fr);
    }
    .schedule-card {
        max-width: none;
    }
    .chart-summary {
        padding-top: 18px;
    }
}
@media (max-width: 650px) {
    .showcase-schedule :deep([data-slot='schedule-outside-month']) {
        display: none;
    }
    .project-subtable {
        padding: 16px 10px;
    }
    .subtable-heading {
        align-items: start;
    }
    .subtable-heading strong {
        font-size: 11px;
    }
    .project-subtable :deep(th),
    .project-subtable :deep(td) {
        padding-inline: 7px;
    }
    .project-name > div {
        min-width: 0;
        overflow: hidden;
    }
    .project-name strong {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .project-name {
        gap: 7px;
    }
    .project-monogram {
        width: 25px;
        height: 28px;
    }
    .chart-totals {
        margin-inline: 18px;
        gap: 12px;
    }
    .chart-totals small {
        font-size: 7px;
    }
    .project-heading {
        padding: 20px 18px 0;
        align-items: start;
        flex-direction: column;
        gap: 8px;
    }
    .project-card :deep(.project-table > :first-child),
    .project-card :deep(.project-table > :last-child) {
        padding: 16px 18px;
    }
    .powered-line {
        padding: 14px 18px;
        align-items: start;
        flex-direction: column;
        gap: 6px;
    }
    .powered-line [role='status'] {
        text-align: left;
    }
    .momentum-card :deep([data-slot='card-header']) {
        padding: 22px 18px 0;
    }
    .chart-summary {
        padding-inline: 18px;
        gap: 10px;
    }
    .chart-period {
        margin-left: 0;
    }
    .chart-insight {
        margin: 20px 18px;
    }
    .chart-insight p {
        font-size: 10px;
    }
    .chart-legend {
        gap: 16px;
    }
    .schedule-heading {
        padding-inline: 18px;
    }
    .schedule-next {
        padding-inline: 18px;
    }
}
</style>
