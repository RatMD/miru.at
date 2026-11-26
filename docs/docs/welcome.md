---
title: Welcome to Miru
---

# Welcome to Miru

Miru is a Vue 3 UI library for turning good ideas into thoughtful application interfaces. It brings together components, expressive forms and adaptable layouts, with the fiddly details already taken care of.

Designed with [Laravel](https://laravel.com/) or [AdonisJS](https://adonisjs.com/) and a lovely partnership with [Inertia](https://inertiajs.com/) in mind, Miru is used in our own company applications. Its [adapters](/docs/guide/adapters) let you tailor form submission, navigation and backend data conventions to your own stack.

## The essentials

<ul class="component-features">
    <li>Import the components you need and compose them into your own application.</li>
    <li>Keep locale, currency and translation settings local to each Vue app.</li>
    <li>Build validated forms with TanStack Form and Zod, using AJAX, Inertia or your own adapter.</li>
    <li>Keep routes, uploads, permissions and application data under your control.</li>
    <li>Start with English and German UI labels, or connect your existing translation system.</li>
    <li>Make the shared colours, surfaces and light or dark appearance your own.</li>
</ul>

## A little less starting from scratch

Start with the pieces you need: a well-behaved input, a responsive overlay, a data table or a complete application shell. Shared styling and interaction patterns help those pieces feel at home together as your application grows, without making every new screen a small reinvention.

Miru combines **Vue 3**, **TypeScript**, **Reka UI** and **Tailwind CSS 4**. Its styles are compiled into the package, so your application does not need to scan library sources.

<div class="welcome-links">
    <a href="/docs/guide/installation"><strong>Up and running</strong><span>Add Miru, import its styles and give your Vue app a proper starting point.</span></a>
    <a href="/components/"><strong>Find your pieces</strong><span>Browse the components, try their previews and explore the reference.</span></a>
    <a href="/docs/forms/introduction"><strong>Forms that fit</strong><span>Connect values, validation and submission, or let typed definitions do the composing.</span></a>
    <a href="/docs/guide/theming"><strong>Make it your own</strong><span>Bring your colours and character to the shared tokens and component surfaces.</span></a>
</div>

## Try a little interaction

This is the real thing: change a variant, resize the button or try its loading state. Interactive examples appear throughout the documentation, so you can get a feel for a component before bringing it into your application.

For more variations and a fuller set of controls, pop over to [Storybook](https://storybook.miru.at/). The component pages link to their matching stories, too.

<ComponentDemo kind="button" />

## Where to go next

For your first project, follow [Installation](/docs/guide/installation), then choose a component and try it in place. If you are joining an existing application, [Adapters](/docs/guide/adapters) explain how Miru fits around your backend and transport.

When the task grows beyond a single component, the [Forms](/docs/forms/introduction) and [DataTable](/docs/data-table/introduction) sections walk through the moving parts with practical examples. Composables, plugins and support helpers have their own references in the sidebar whenever you need a closer look.

Miru is MIT licensed. The website uses the same local package you can use in your own application.
