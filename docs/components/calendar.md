---
title: "Calendar"
component: Calendar
componentPage: overview
---

## Preview

<ComponentExample name="Calendar" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Single dates or ranges with localised labels.</li>
    <li>Holiday, weekday and availability rules.</li>
</ul>

## Values and date rules

Calendar uses DateValue objects from `@internationalized/date`, with a single value or a `{ start, end }` range. Monday is the default week start regardless of locale; set `weekStartsOn` to 0 for Sunday. Bind `v-model:placeholder` to observe month navigation when loading availability.

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { parseDate } from '@internationalized/date';
import { Calendar } from '@rat.md/miru';

const day = ref(parseDate('2026-11-25'));
</script>

<template>
    <Calendar v-model="day" :disabled-weekdays="[0, 6]" />
</template>
```

Use min/max values, ISO `disabledDates`, disabled weekdays or callbacks to restrict selection. Holidays are unavailable unless `disableHolidays` is false. Availability records can provide capacity, a closed flag, holiday text and a reason; omitted dates remain selectable. Ranges cannot cross unavailable dates unless `allowNonContiguousRanges` is enabled. The `day` slot exposes state for custom content. The application owns availability requests, booking rules and validation.

## Dependencies

- **UI:** [Button](/components/button), [Select](/components/select)
- **Packages:** [@internationalized/date](https://www.npmjs.com/package/@internationalized/date), [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [reka-ui](https://www.npmjs.com/package/reka-ui), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Calendar](https://reka-ui.com/docs/components/calendar), [Reka UI Range Calendar](https://reka-ui.com/docs/components/range-calendar)

See the [reference](/components/calendar/reference) for the complete component contract.
