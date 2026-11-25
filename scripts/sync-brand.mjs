import { writeFileSync } from 'node:fs';
import {
    markSvg,
    defaultMarkColors,
    markColorsFromTokens,
} from '../.vitepress/theme/branding/mark.ts';
import { palette, presetProfile, readable } from '../.vitepress/theme/colors/engine.ts';

const shades = palette(presetProfile().colors.accent);
const colors = markColorsFromTokens(
    (name) =>
        name === '--ui-accent-text'
            ? readable(shades[600], '#ffffff')
            : shades[Number(name.replace('--ui-accent-', ''))] || '',
    false,
);
const favicon = markSvg(colors, true).replace(
    '>',
    `><style>@media(prefers-color-scheme:dark){.miru-mark-face{fill:${shades[400]}}.miru-mark-side{fill:${shades[700]}}.miru-mark-depth{fill:${shades[900]}}.miru-mark-shadow{fill:${shades[950]}}.miru-mark-edge{stroke:${shades[300]}}.miru-mark-tile{fill:${shades[950]}}}</style>`,
);
writeFileSync(new URL('../docs/public/favicon.svg', import.meta.url), favicon + '\n');
writeFileSync(
    new URL('../docs/public/miru-mark.svg', import.meta.url),
    markSvg(defaultMarkColors) + '\n',
);
writeFileSync(
    new URL('../docs/public/miru-mark-squircle.svg', import.meta.url),
    markSvg(defaultMarkColors, true) + '\n',
);
console.log('Miru branding: synced the vector mark and static favicon fallback.');
