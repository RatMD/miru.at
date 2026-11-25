---
title: "Schedule"
component: Schedule
componentPage: overview
---

<script setup>
import { scheduleSource } from '../../.vitepress/theme/playground/extension-examples';
</script>

## Preview

<ComponentExample name="Schedule" :show-playground="false" :code="scheduleSource" />

## Features

<ul class="component-features">
    <li>Compact calendars and full organisers with configurable views.</li>
    <li>Exclusive event intervals, details and local or server filtering.</li>
</ul>

## Appointments and ranges

Supply ScheduleEvent records with stable ids and translated titles. Date-only values use YYYY-MM-DD; timed values include Z or a numeric offset. Event ends are exclusive, and `timeZone` determines timed day placement.

Choose compact dot markers for dashboard cards or a full organiser with bars and configurable views. `readonly` disables mutations while preserving details. The [guide](/components/schedule/guide) covers event mapping, remote ranges, filtering and detail presentations.

## Application integration

Control navigation through `date`, `view` and `selectedDate`; listen to `range-change` when loading visible events. Creation and editing emit requests without saving. Use [TimeSlots](/components/time-slots) for booking selection. Optional [useScheduleSource](/docs/composables/useScheduleSource) caching remains independent of Inertia and persistence.

## Dependencies

- **UI:** [Badge](/components/badge), [Button](/components/button), [ButtonGroup](/components/button-group), [Drawer](/components/drawer), [InputSearch](/components/input-search), [Overlay](/components/overlay), [Popover](/components/popover), [ScrollArea](/components/scroll-area), [Select](/components/select), [ToggleGroup](/components/toggle-group), [Tooltip](/components/tooltip)
- **Packages:** [@internationalized/date](https://www.npmjs.com/package/@internationalized/date), [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [@vueuse/core](https://www.npmjs.com/package/@vueuse/core), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/schedule/reference) for the complete component contract.
