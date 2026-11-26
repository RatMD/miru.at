/**
 * Synchronize website branding assets with the shared vector mark.
 *
 * Writes the SVG mark variants and delegates raster icons and the manifest to favicon-assets.mjs.
 *
 * Run through npm run docs:sync or directly with node scripts/sync-brand.mjs.
 */

import { writeFileSync } from 'node:fs';
import { markSvg, defaultMarkColors } from '../.vitepress/theme/branding/mark.ts';
import { generateFaviconAssets } from './favicon-assets.mjs';

const favicon = markSvg(defaultMarkColors, true);
writeFileSync(new URL('../docs/public/favicon.svg', import.meta.url), favicon + '\n');
writeFileSync(
    new URL('../docs/public/miru-mark.svg', import.meta.url),
    markSvg(defaultMarkColors) + '\n',
);
writeFileSync(
    new URL('../docs/public/miru-mark-squircle.svg', import.meta.url),
    markSvg(defaultMarkColors, true) + '\n',
);
generateFaviconAssets(favicon);
console.log('Miru branding: synced SVG, ICO, PNG, Apple/Android icons and web manifest.');
