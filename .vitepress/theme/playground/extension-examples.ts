/** Handwritten documentation examples; each source is a complete, editable Vue component. */
export const timeSlotsSource = `<script setup lang="ts">
import { ref } from 'vue';
import { CalendarBooking } from '@rat.md/miru';
import type { CalendarTimeSlot } from '@rat.md/miru';

const date = ref<string | null>('2026-11-25');
const slot = ref<string | null>(null);
const slots: CalendarTimeSlot[] = [
    { value: 'morning', label: '09:00', used: 2, capacity: 8, available: true, warning: null, overbooking: false },
    { value: 'midday', label: '12:00', used: 8, capacity: 8, available: false, warning: null, overbooking: false },
    { value: 'afternoon', label: '15:00', used: 1, capacity: 8, available: true, warning: 'This appointment needs approval.', overbooking: false },
];
</script>

<template>
    <CalendarBooking v-model:date="date" v-model:slot="slot" :slots="slots" show-capacity />
    <p class="text-sm text-muted-foreground">{{ date }} · {{ slot || 'Choose a time' }}</p>
</template>`;

export const scheduleSource = `<script setup lang="ts">
import { ref } from 'vue';
import { Schedule } from '@rat.md/miru';
import type { ScheduleEvent } from '@rat.md/miru';

const date = ref('2026-11-25');
const events: ScheduleEvent[] = [
    { id: 'review', title: 'Design review', start: '2026-11-25T10:00:00Z', end: '2026-11-25T11:00:00Z', color: 'var(--ui-primary)' },
    { id: 'campaign', title: 'Winter campaign', start: '2026-11-23', end: '2026-11-28', allDay: true, color: 'var(--ui-accent)' },
    { id: 'launch', title: 'Launch', start: '2026-11-30', allDay: true, color: 'var(--ui-success)' },
];
</script>

<template>
    <Schedule v-model:date="date" :events="events" :views="['week', 'month', 'agenda']" readonly />
</template>`;
