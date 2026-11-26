miru.at - Documentation Website
===============================

Documentation, component showcases and an interactive playground for [miru.](https://miru.at), built 
with VitePress.

## Requirements

- Node.js 24+ and npm 11+.
- The full miru library checkout in `../package` (or `../storybook` for deployment).

## Getting Started

Run from the website directory:

```sh
node scripts/prepare-package.mjs
npm --prefix ../package ci
npm ci
npm run dev
```

Build and preview the production site:

```sh
npm run build
npm run preview
```

Deploy `.vitepress/dist` to static hosting with clean URLs and `404.html` as the error page. On 
Linux/Plesk, `bash deploy.sh` installs dependencies and builds both the library and website; set the 
document root to `.vitepress/dist`.

## Copyright & License

[MIT License](https://github.com/RatMD/miru/blob/master/LICENSE.md).  
Copyright © 2025 - 2026 rat.md
