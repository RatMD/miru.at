---
title: "TimeSlots"
component: CalendarBooking
componentPage: overview
---

<script setup>
import { timeSlotsSource } from '../../.vitepress/theme/playground/extension-examples';
</script>

## Preview

<ComponentExample name="CalendarBooking" :show-playground="false" :code="timeSlotsSource" />

## Features

<ul class="component-features">
    <li>Single dates or ranges with optional time-slot selection.</li>
    <li>Capacity feedback, retained slots and warning confirmation.</li>
</ul>

## Date and slot state

The public Vue component is CalendarBooking. Bind `v-model:date` to an ISO date and `v-model:slot` to a slot value. Range mode uses `v-model:rangeValue` with DateRange and hides time-slot controls. Use `visible-month-change` to request availability for the visible calendar.

The application supplies slot labels, capacity, availability and warnings. Unavailable slots cannot be selected unless marked retained. Warning confirmation checks the latest availability. A date change clears the selected slot. The component does not create a booking or save a record.

## Availability and feedback

Pass Calendar rules for disabled dates, weekdays, holidays and availability. `loading` blocks selection while data is refreshed, and `error` displays the application’s error message. `showCapacity` displays remaining and total capacity; `confirmWarnings` enables confirmation for special appointments. Use [useCalendarBooking](/docs/composables/useCalendarBooking) for state without this UI, or [Schedule](/components/schedule/guide) for appointment display.

## Dependencies

- **UI:** [Button](/components/button), [Calendar](/components/calendar), [OverlayChoice](/components/overlay-choice)
- **Packages:** [@internationalized/date](https://www.npmjs.com/package/@internationalized/date), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/time-slots/reference) for the complete component contract.
