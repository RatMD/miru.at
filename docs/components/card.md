---
title: "Card"
component: Card
componentPage: overview
---

## Preview

<ComponentExample name="Card" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Composable heading, description, content and footer.</li>
    <li>Independent header actions.</li>
    <li>Optional dividers between content areas.</li>
</ul>

## Composition and dividers

Compose CardHeader, CardTitle, CardDescription, CardContent and CardFooter inside Card. Place CardAction in the header, or use the header’s `badges` and `actions` slots; badges appear before actions. `Card.border` controls the outer border, while `CardHeader.border` controls the header divider. CardContent adds top spacing when it directly follows a header with a divider. These building blocks expose no component-specific events or model bindings.

## Dependencies

- **Packages:** [clsx](https://www.npmjs.com/package/clsx), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/card/reference) for the complete component contract.
