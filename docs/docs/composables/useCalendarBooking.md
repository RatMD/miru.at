<!-- Generated from package/src/docs/composables/useCalendarBooking.mdx. Edit the source guide. -->

# useCalendarBooking

Track a date and time-slot selection for CalendarBooking (Storybook: TimeSlots).

```ts
import { useCalendarBooking } from '@rat.md/miru/composables';

const booking = useCalendarBooking();
function chooseDate() {
    booking.selectDate('2026-12-01');
}
```

Pass `slots`, `rules` and optional `maxValue` to configure selection. `date`, `slot`, `selectedSlot` and `pending` describe the current state. `selectSlot()` may request confirmation; `confirmSlot()` accepts a pending choice and `cancel()` clears it. Capacity, permissions and persistence belong to your server.
