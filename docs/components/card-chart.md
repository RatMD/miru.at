---
title: "CardChart"
component: CardChart
componentPage: overview
---

## Preview

<ComponentExample name="CardChart" :show-playground="false" />

## Features

<ul class="component-features">
    <li>A card heading and description around a chart slot.</li>
    <li>An empty state when no chart content is available.</li>
    <li>Works with an application-supplied chart renderer, including ApexCharts.</li>
</ul>

## ApexCharts example

The preview uses [ApexChart](/components/apexcharts), backed by [apexcharts](https://www.npmjs.com/package/apexcharts) and [vue3-apexcharts](https://www.npmjs.com/package/vue3-apexcharts). Supply your own series and options through ApexChart.

## Chart content and empty states

Supply any chart component through the default slot; CardChart does not choose or configure a chart library. Pass both `empty` and `emptyLabel`: they are required props. When `empty` is true, the default slot is not rendered and the label is shown instead. The title and description slots override their corresponding props. CardChart exposes no component-specific events or model bindings.

## Dependencies

- **UI:** [Card](/components/card), [CardContent](/components/card/reference#card-content), [CardDescription](/components/card/reference#card-description), [CardHeader](/components/card/reference#card-header), [CardTitle](/components/card/reference#card-title)
- **Packages:** [clsx](https://www.npmjs.com/package/clsx), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/card-chart/reference) for the complete component contract.
