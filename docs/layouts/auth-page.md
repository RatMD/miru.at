---
title: 'AuthPage'
component: AuthPage
componentPage: overview
---

## Preview

<ComponentExample name="AuthPage" />

## Usage

Use the default slot for an application-owned sign-in or registration form. AuthPage supplies the surrounding page structure; submission, routing and authentication remain in the application.

```vue
<AuthPage title="Welcome back" description="Sign in to your workspace">
    <template #brand><AppLogo /></template>
    <LoginForm />
    <template #footer><LegalLinks /></template>
</AuthPage>
```

## Presentation

`variant="split"` places the form beside a visual panel; `panelSide="right"` reverses the desktop arrangement. `variant="card"` centres the form over the visual. Width and height props accept pixel numbers or CSS lengths. For an embedded layout, set `fullHeight=false` and provide `height`; `framed=false` removes the outer frame.

On smaller screens the split visual moves above the form. Set `hideVisualOnMobile` to hide it. Form content stays in document flow as validation messages or the on-screen keyboard appear.

## Branding and visuals

Use `image` and `imageAlt` for an application image, replace the `visual` slot or retain the included theme-aware artwork. The default empty alternative text treats the image as decorative. The `visual-overlay` slot places supporting content over the visual; `brand`, `header` and `footer` customise the form panel.

## Dependencies

- **Packages:** [clsx](https://www.npmjs.com/package/clsx), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)

See the [reference](/layouts/auth-page/reference) for the complete component contract.
