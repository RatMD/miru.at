---
title: Theming
---

# Make Miru your own

Start with a colour scheme, choose a light or dark appearance, then add your own finishing touches. Miru’s components share CSS tokens for colours, typography, surfaces and responsive behaviour, so a few considered changes can carry through the whole interface.

## Choose a colour scheme

**Miru Original** is included in the base stylesheet. Import an optional scheme after it and place your application overrides last:

```ts
import '@rat.md/miru/style.css';
import '@rat.md/miru/themes/lagoon.css';
import './overrides.css';
```

Schemes are hand-maintained CSS stylesheets with explicit palette, foreground and interaction values. They are shipped unchanged; neither installation nor application startup calculates their colours. There is no theme option to pass to `createMiru()`, and the scheme can be used independently of the plugin. Choose one optional scheme; a later scheme import replaces the earlier scheme’s token values.

| Scheme          | Stylesheet                                                              |
| --------------- | ----------------------------------------------------------------------- |
| Miru Original   | `@rat.md/miru/themes/original.css` — also the base stylesheet’s default |
| Miru Modern     | `@rat.md/miru/themes/modern.css`                                        |
| Northern lights | `@rat.md/miru/themes/northern-lights.css`                               |
| Lagoon          | `@rat.md/miru/themes/lagoon.css`                                        |
| Rosewood        | `@rat.md/miru/themes/rosewood.css`                                      |
| Golden hour     | `@rat.md/miru/themes/golden-hour.css`                                   |

Every scheme supports light and dark appearance. This documentation starts with **Miru Modern**; the colour controls in the header let you explore the schemes and save a custom palette locally. The library itself leaves scheme selection and persistence to your application.

## Light and dark appearance

Set the appearance on the document root. Miru recognises `.dark` or `data-theme="dark"` on `<html>`; remove the dark marker for light appearance.

```ts
document.documentElement.classList.toggle('dark', isDark);
```

The scheme supplies both sets of values. Your application decides how appearance is chosen and remembered. Keep the root marker consistent rather than setting conflicting class and data-attribute values.

## Palettes and semantic tokens

Palette tokens such as `--ui-primary-50` through `--ui-primary-950` provide colour steps. Semantic tokens describe their purpose: a primary surface, its foreground, a border or an interaction state.

The colour roles are `primary`, `secondary`, `accent`, `info`, `success`, `warning` and `danger`. For example:

| Token                                       | Purpose                                                    |
| ------------------------------------------- | ---------------------------------------------------------- |
| `--ui-primary`                              | The primary semantic surface.                              |
| `--ui-primary-foreground`                   | Text and icons on that surface.                            |
| `--ui-primary-hover`, `--ui-primary-active` | Hover and pressed surfaces.                                |
| `--ui-primary-border`                       | The primary border, referencing a palette step by default. |
| `--ui-primary-text`                         | Primary-coloured ink on neutral surfaces.                  |
| `--ui-primary-600-foreground`               | Readable ink for that particular palette step.             |

Semantic border defaults reference palette steps: `--ui-primary-400` in light appearance and `--ui-primary-600` in dark appearance. Override a palette step to update its aliases, or override the semantic token for a more focused change.

Use `variant="accent"` on components that expose colour variants, such as Button, Badge, Alert, Tabs and Tooltip. Avatar calls the same choice `tone="accent"`. Shared utilities such as `bg-accent`, `text-accent-foreground` and `border-accent` reference these tokens too.

Neutral hover and selection surfaces use `--ui-surface-hover` and `--ui-surface-hover-foreground`. Keep them separate from the semantic accent colour when customising menus, calendars and selection states.

## Add your own finishing touches

Put overrides after the selected scheme. Start with shared decisions such as the corner radius, typography and border treatment:

```css
:root {
    --ui-font-sans: 'Your font', system-ui, sans-serif;
    --ui-font-heading: var(--ui-font-sans);
    --ui-radius: 0.75rem;
    --ui-primary-border: var(--ui-primary-500);
}

:root.dark {
    --ui-primary-border: var(--ui-primary-600);
}
```

Load custom font files in your application. Miru ships compiled styles without a global Tailwind Preflight reset, so document styles and resets remain yours to choose.

For a complete custom palette, provide its shade range, semantic surfaces, foregrounds, borders and interaction states. Changing a single shade does not calculate the rest of the palette. Solid component recipes also use shade-specific foregrounds; check text contrast in both appearances and through hover, active, focus and disabled states.

### Custom schemes

Use a bundled scheme as a starting point and keep your own stylesheet in your application. Each scheme’s source lives in `package/src/themes/` in the Miru repository. Edit palette steps and their foregrounds together, then choose semantic aliases and light and dark surface values explicitly.

```css
:root {
    --ui-primary-600: #365bc7;
    --ui-primary-600-foreground: #ffffff;
    --ui-primary: var(--ui-primary-600);
    --ui-primary-foreground: var(--ui-primary-600-foreground);
    --ui-switch-thumb-checked: #ffffff;
}
```

The switch thumb token controls the checked thumb of the coloured `success` and `danger-success` variants. It is independent of text foregrounds, so choosing readable button text does not change the thumb’s appearance.

The colour controls on this website use the same authored CSS for each preset. When you edit a colour or surface, the website’s colour scheme calculator creates a custom palette for exploration. Those calculations belong to the documentation; they are not part of the library and never rewrite its schemes. Bring any values you wish to keep into your own stylesheet and review them in both appearances.

## Responsive tokens

The global breakpoint tokens are `--ui-breakpoint-xxs`, `--ui-breakpoint-xs`, `--ui-breakpoint-sm`, `--ui-breakpoint-md`, `--ui-breakpoint-lg`, `--ui-breakpoint-xl` and `--ui-breakpoint-xxl`. Their defaults appear in the reference below.

`useBreakpoint()` and structural switches such as Tabs, Overlay and dashboard navigation read these values in the browser. Explicit application or component breakpoint options take precedence. Server rendering uses the shared default constants until browser styles become available.

CSS media queries cannot read `var(--ui-breakpoint-md)`. Compiled responsive utilities keep their build-time thresholds. If you change runtime breakpoints, align your own media queries and Tailwind configuration with the same values.

## Try the theme

<ComponentDemo kind="selection" />

Use the header controls or the selector below to compare schemes and appearances. The [playground](/playground) offers more room to explore individual variants and states.

## Token reference

Browse all global `--ui-*` tokens declared by Miru’s base styles and the selected scheme. **Declared value** preserves aliases such as `var(--ui-primary-400)`; **Resolved value** follows those aliases for the current appearance, with a swatch for colours.

Values are resolved separately from the documentation’s own styles, so site-specific overrides do not become library defaults. Custom palette edits are shown as custom values. Component-local overrides and layout measurements have no single global default; their individual component references describe those settings.

<ThemeTokenReference />
