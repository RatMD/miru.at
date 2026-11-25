---
title: Theming
---

# A system. Your signature.

Miru gives your interface a consistent starting point. CSS variables give it your personality.

## Light and dark

Set the theme on the document root. Miru recognizes `.dark` or `data-theme="dark"`.

```ts
document.documentElement.classList.toggle('dark', isDark);
```

This website uses VitePress’s appearance state, which remembers the selected mode. Try the sun or moon in the navigation to switch both the documentation and the live components.

## Semantic tokens

Import your overrides after the Miru stylesheet. Override semantic values on your theme root and keep text contrast in mind in both appearances.

```css
:root,
:root.dark {
    --ui-primary-600: #df5d49;
    --ui-primary-700: #c74b39;
    --ui-primary-800: #ae3c2c;
    --ui-primary: #df5d49;
    --ui-primary-hover: #c74b39;
    --ui-primary-active: #ae3c2c;
    --ui-primary-foreground: #ffffff;
    --ui-radius: 0.625rem;
}
```

Colored buttons use dark palette surfaces with brighter borders and text in dark mode. Hover lightens the surface; pressing darkens it and adds an inset shadow. Set the relevant palette steps alongside the semantic aliases.

## Accent and live palettes

`accent` is a complete color variant alongside `primary`, `secondary`, `info`, `success`, `warning`, and `danger`. Use `variant="accent"` on Button, ButtonAction, ButtonShadow, Badge, BadgeCopy, Progress, Alert and Tooltip; Avatar uses `tone="accent"`. The compiled stylesheet includes `text-accent`, `bg-accent`, `border-accent`, and `text-accent-foreground` utilities.

The palette provides `--ui-accent-50` through `--ui-accent-950`, plus `--ui-accent`, `--ui-accent-foreground`, `--ui-accent-hover`, and `--ui-accent-active`. Neutral menu and selection backgrounds now use `--ui-surface-hover` and `--ui-surface-hover-foreground`. If you previously used `--ui-accent` as a neutral hover surface, migrate that override to the new surface tokens.

On this website, the adjustment icon opens a live palette editor built from Miru's ColorPicker and Popover. Seven base colors generate their shade ranges automatically. Accent also tints the neutral palette used for light and dark surfaces; an optional **Surface tint** lets you set that independently. Changes apply while choosing or typing a valid hex color, and remain in local storage. Explicit Playground CSS overrides continue to take precedence inside that preview.

## Typography and surfaces

```css
:root {
    --ui-font-sans: 'Your font', system-ui, sans-serif;
    --ui-background: #ffffff;
    --ui-foreground: #222326;
    --ui-border: #e3e3e7;
}

:root.dark {
    --ui-background: #161719;
    --ui-foreground: #f1f0f2;
    --ui-border: #292a2f;
}
```

Miru’s compiled stylesheet does not include a global Tailwind Preflight reset. Your application remains responsible for its global document styles.

## See the difference

<ComponentDemo kind="selection" />

Use shared tokens for shared decisions. Keep page-specific composition in your own components. The [playground](/playground) lets you explore button variants and states.
