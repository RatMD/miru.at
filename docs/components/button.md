---
title: "Button"
component: Button
componentPage: overview
---

## Preview

<ComponentExample name="Button" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Theme colours, sizes and shapes.</li>
    <li>Icons, loading feedback and disabled states.</li>
    <li>Actions or links with a visible keyboard focus indicator.</li>
</ul>

## Actions, links and loading

Button renders a native button with `type="button"` by default; supply the native `type` attribute for form submission. Use `as="a"` with `href`, or `asChild` with a router link. `loading` prevents activation and replaces slot SVG icons with a spinner. `loadingPosition` controls its side. Provide an accessible name when using `iconOnly`.

## Dependencies

- **Packages:** [class-variance-authority](https://www.npmjs.com/package/class-variance-authority), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Primitive](https://reka-ui.com/docs/utilities/primitive)

See the [reference](/components/button/reference) for the complete component contract.
