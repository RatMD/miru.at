<!-- Generated from package/src/docs/composables/useSchedule.mdx. Edit the source guide. -->

# useSchedule

Keep calendar navigation and selection state without owning event requests.

```ts
import { useSchedule } from '@rat.md/miru/composables';

const schedule = useSchedule({ view: 'month', timeZone: 'Europe/Berlin' });
function next() {
    schedule.navigate(1);
}
function today() {
    schedule.goToday();
}
```

`date`, `view`, `selectedDate` and `selectedEventId` are refs. `range` and `dates` are computed. Your app loads and saves events; reactive `weekStartsOn` and `timeZone` control navigation. See [Schedule](/components/schedule/guide).
