import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const source = readFileSync(
    new URL('../../package/src/styles/tokens.css', import.meta.url),
    'utf8',
);
function declarations(body) {
    return Object.fromEntries(
        [...body.matchAll(/(--ui-[\w-]+)\s*:\s*([^;]+);/g)]
            .filter(
                ([, name]) =>
                    !/--ui-(font-|radius|pressed-shadow|button-outline-shadow)/.test(name),
            )
            .map(([, name, value]) => [name, value.trim()]),
    );
}
const light = declarations(source.match(/:where\(:root\)\s*\{([\s\S]*?)\n\}/)[1]);
const dark = declarations(source.match(/:where\(\.dark,[^\n]+\)\s*\{([\s\S]*?)\n\}/)[1]);
function hex(value) {
    if (value.startsWith('var(')) return hex(light[value.slice(4, -1)]);
    if (value.startsWith('#')) return value.toLowerCase();
    const parts = value.match(/oklch\(([\d.]+)% ([\d.]+) (none|[\d.]+)\)/);
    if (!parts) throw new Error(`Unsupported palette color: ${value}`);
    const L = Number(parts[1]) / 100,
        C = Number(parts[2]),
        hue = (Number(parts[3] === 'none' ? 0 : parts[3]) * Math.PI) / 180;
    const a = C * Math.cos(hue),
        b = C * Math.sin(hue);
    const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
    const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
    const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
    const channels = [
        4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
        -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
        -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
    ];
    return (
        '#' +
        channels
            .map((v) =>
                Math.round(
                    Math.min(
                        1,
                        Math.max(0, v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055),
                    ) * 255,
                )
                    .toString(16)
                    .padStart(2, '0'),
            )
            .join('')
    );
}
const colors = Object.fromEntries(
    ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'danger'].map((role) => [
        role,
        hex(light[`--ui-${role}-600`]),
    ]),
);
const data = {
    light,
    dark,
    colors,
    neutral: hex(light['--ui-neutral-500']),
    accent400: hex(light['--ui-accent-400']),
};
writeFileSync(
    new URL('../.vitepress/theme/colors/miru-defaults.ts', import.meta.url),
    '// Generated from package/src/styles/tokens.css by scripts/sync-theme.mjs.\nexport const miruDefaults = ' +
        JSON.stringify(data, null, 2) +
        ' as const;\n',
);
console.log(
    `Miru Original: synced ${Object.keys(light).length} native tokens from ${fileURLToPath(new URL('../../package/src/styles/tokens.css', import.meta.url))}`,
);
