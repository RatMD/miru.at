---
title: "ApexCharts"
component: ApexChart
componentPage: overview
---

## Preview

<ComponentExample name="ApexChart" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Axis and non-axis series through the native Vue adapter.</li>
    <li>Miru theme defaults with explicit option overrides.</li>
</ul>

## Chart options

Pass axis series objects for line, area or bar charts and numeric series for non-axis charts such as donuts. Miru supplies theme defaults, and explicit ApexCharts options take precedence. The renderer loads after mount; a translated loading state reserves the configured height.

Use [CardChart](/components/card-chart) for a heading, surface and empty state. See the [guide](/components/apexcharts/guide) and official [Vue integration](https://apexcharts.com/docs/vue-charts/) or [chart options](https://apexcharts.com/docs/options/chart/) for chart-specific configuration.

## Dependencies

- **Packages:** [apexcharts](https://www.npmjs.com/package/apexcharts), [vue](https://www.npmjs.com/package/vue), [vue3-apexcharts](https://www.npmjs.com/package/vue3-apexcharts)

See the [reference](/components/apexcharts/reference) for the complete component contract.
