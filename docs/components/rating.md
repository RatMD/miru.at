---
title: "Rating"
component: Rating
componentPage: overview
---

## Preview

<ComponentExample name="Rating" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Fractional stars or like/dislike choices.</li>
    <li>Keyboard interaction, hover feedback and read-only averages.</li>
</ul>

## Scores and interaction

Star scores range from zero to length. Interactive scores follow step; read-only scores preserve exact fractions for averages. In like-dislike mode, -1 means dislike, 0 is neutral and 1 means like; the star-specific length, step, hoverable and showValue settings do not apply.

Arrow keys adjust the star score, Home chooses the first step and End chooses the maximum. With clearable enabled, clicking the selected value clears it. Use readonly for a static score and disabled to keep controls visible without allowing changes.

## Dependencies

- **UI:** [ButtonAction](/components/button-action)
- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [clsx](https://www.npmjs.com/package/clsx), [reka-ui](https://www.npmjs.com/package/reka-ui), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)
- **Primitive:** [Reka UI Radio Group](https://reka-ui.com/docs/components/radio-group), [Reka UI Rating](https://reka-ui.com/docs/components/rating)

See the [reference](/components/rating/reference) for the complete component contract.
