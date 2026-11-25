---
title: "InputDateTime"
component: InputDateTime
componentPage: overview
---

## Preview

<ComponentExample name="InputDateTime" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Date, time, date-time and timeframe modes.</li>
    <li>Shared Calendar availability rules and date restrictions.</li>
</ul>

## Value formats and calendar rules

Date values use YYYY-MM-DD, date-time values use YYYY-MM-DDTHH:mm and time values use HH:mm. A timeframe is an object with nullable start and end clock-time strings. Values are local wall-clock values without time-zone conversion. Calendar rules apply to date and date-time modes; `maxValue` takes precedence over the allowFuture shortcut. Partial and overnight timeframes remain editable; validate their business meaning in the application.

## Integration guide

[Read the focused integration guide](/components/input-date-time).

## Dependencies

- **UI:** [Button](/components/button), [Calendar](/components/calendar), [Input](/components/input), [Popover](/components/popover)
- **Packages:** [@internationalized/date](https://www.npmjs.com/package/@internationalized/date), [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [class-variance-authority](https://www.npmjs.com/package/class-variance-authority), [clsx](https://www.npmjs.com/package/clsx), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/input-date-time/reference) for the complete component contract.
