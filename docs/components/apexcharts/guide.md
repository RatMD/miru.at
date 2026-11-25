---
title: ApexCharts guide
component: ApexChart
componentPage: guide
---

ApexChart adapts ApexCharts and vue3-apexcharts to Miru without global chart-plugin registration. The renderer loads after mount, leaving a loading placeholder during server rendering.

## Axis series

Pass named series with data points and use `options` for axes, labels and chart-specific behaviour.

```vue
<script setup lang="ts">
import { ApexChart, CardChart } from '@rat.md/miru';
import type { ApexAxisChartSeries, ApexOptions } from '@rat.md/miru';

const series: ApexAxisChartSeries = [
    { name: 'Bookings', data: [12, 18, 15, 24] },
];
const options: ApexOptions = {
    xaxis: { categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'] },
    stroke: { curve: 'smooth' },
};
</script>

<template>
    <CardChart title="Weekly bookings">
        <ApexChart type="area" :height="300" :series="series" :options="options" />
    </CardChart>
</template>
```

CardChart supplies the heading, surface and optional empty state; it can contain another chart renderer too. For empty results, set its `empty` flag and supply an `emptyLabel`.

## Non-axis series

Pie, donut and radial-bar charts use numeric values rather than named axis-series objects. Labels belong in the chart options.

```vue
<ApexChart
    type="donut"
    :series="[64, 24, 12]"
    :options="{ labels: ['Confirmed', 'Pending', 'Cancelled'] }" />
```

## Theme and updates

Miru derives the default palette, text, grid and tooltip colours from its UI tokens. Changes to ancestor classes, styles and theme attributes update those defaults. Explicit options take precedence, including colours, toolbar settings and tooltip appearance.

Replace reactive series or options when application data changes. Supply translated series names, categories and formatters in the application. Upstream attributes and events are forwarded to the Vue adapter; chart events can expose the chart context when imperative methods are needed.

## Upstream documentation

Use the official [Vue integration documentation](https://apexcharts.com/docs/vue-charts/), [chart options](https://apexcharts.com/docs/options/chart/) and [chart methods](https://apexcharts.com/docs/methods/) for renderer-specific behaviour. Miru’s wrapper props are listed in the [reference](/components/apexcharts/reference). The installed chart packages retain their upstream licensing requirements.
