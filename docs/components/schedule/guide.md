---
title: Schedule guide
component: Schedule
componentPage: guide
---

Schedule renders appointments and date intervals. [Calendar](/components/calendar) selects dates, while [TimeSlots](/components/time-slots) composes date selection and optional booking slots. The application owns persistence, permissions and routes.

## Present an organiser

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { Schedule } from '@rat.md/miru';
import type { ScheduleEvent } from '@rat.md/miru';

const date = ref('2026-11-25');
const events: ScheduleEvent[] = [
    { id: 'review', title: 'Design review', start: '2026-11-25T10:00:00Z',
        end: '2026-11-25T11:00:00Z', color: 'var(--ui-primary)' },
    { id: 'campaign', title: 'Winter campaign', start: '2026-11-23',
        end: '2026-11-28', allDay: true, color: 'var(--ui-accent)' },
];
</script>

<template>
    <Schedule v-model:date="date" :events="events" :views="['week', 'month', 'agenda']" readonly />
</template>
```

The active view defaults to month, independently of switch order. `views` controls the available views and their order. Week view shows date columns rather than an hourly resource grid; agenda lists occupied dates in the selected month. Bind `view` and `selectedDate` when the application controls them.

## Map event data

| Field | Meaning |
| --- | --- |
| `id`, `title`, `start` | Stable identity, display title and starting date or timestamp. |
| `end` | Exclusive end; omitted for a single-day or instant event. |
| `allDay` | Treat the event as calendar dates rather than timed instants. |
| `openEnded` | Explicitly represent an ongoing interval. |
| `data` | Preserve the application record for details or actions. |

Use YYYY-MM-DD for date-only events and timestamps with Z or a numeric offset for timed events. `timeZone` determines their calendar-day placement. Convert inclusive all-day backend end dates to the following date at the adapter boundary. An absent end does not imply an ongoing campaign.

## Choose a presentation

For a dashboard card, use `presentation="compact"`, `event-display="dots"` and `:views="['month']"`. A surrounding Card can use `gap-0 py-0` with a borderless, square-edged Schedule. Full organisers use event bars, navigation and configured view controls.

`rangePresentation="strips"` provides narrow marketing intervals from the centre of the first occupied date to the centre of the last. Each week receives its own label. Hover or focus expands a preview without moving neighbouring lanes; click still opens the details. Exclusive end dates apply in both presentations.

Set `createVisibility` to always or hover, adjust `minDayHeight`, and choose Sunday and holiday highlighting independently. Holiday labels can come from the `holidays` map or events marked `holiday: true`.

## Load visible ranges

Listen to `range-change` and load the complete supplied interval, including padded visible dates. Bind `loading` and `error` while the application fetches results. `useSchedule()` offers date/view state and navigation helpers; controlled refs can be used instead.

`useScheduleSource({ key, load, initial, staleTime, maxEntries })` adds an optional per-instance in-memory range cache. Include source identity, permission/location scope, range, timezone and filters in the key. The loader receives an AbortSignal; disposal cancels requests, and stale results do not replace the current range. Invalidate or refresh after mutations. No Inertia or localStorage integration is required.

## Search, facets and permissions

Local search and filter facets operate on supplied events. Define filter keys, labels and options, and add matching `event.filterValues`. Bind `search`, `filterValues` and `filtersOpen` for controlled state. With `searchMode="server"` or `filterMode="server"`, include those values in the application request/cache key and return filtered events.

`readonly` disables mutations while retaining details. `canCreate` and `canEdit` accept flags or predicates; `create` and `edit` report requests without saving records. The backend enforces the actual permissions.

## Details and custom content

Day popovers use a drawer on small screens. `detailPresentation` selects list, cards or description layouts; individual events may override it and supply `typeLabel`, summary lines and labelled details. Text, numbers, booleans and null values render as text. Reuse ScheduleEventDetails or replace `event-details` for application-specific content.

Use `day-summary` and `day-content` for counts or notices, `day-details` for a selected-day sidebar, and `event-actions`, `title-actions` or `actions` for additional controls. Details and day lists use a height-limited ScrollArea when needed. See the [reference](/components/schedule/reference) for slot scopes and all model bindings.
