import { miruDefaults } from './miru-defaults.ts';
export const roles = [
    'primary',
    'secondary',
    'accent',
    'info',
    'success',
    'warning',
    'danger',
] as const;
export type Role = (typeof roles)[number];
export type Profile = {
    version: 2;
    preset: string;
    colors: Record<Role, string>;
    surface: string | null;
};
// Keep the key so existing visitor choices can be migrated rather than discarded.
export const storageKey = 'miru-color-scheme-v1';
export const presets = [
    {
        id: 'miru',
        name: 'Miru Modern',
        colors: ['#df5d49', '#9c67ce', '#e98e7d', '#238db9', '#299673', '#e5b43d', '#d94c63'],
    },
    {
        id: 'original',
        name: 'Miru Original',
        colors: roles.map((role) => miruDefaults.colors[role]),
    },
    {
        id: 'aurora',
        name: 'Northern lights',
        colors: ['#745ddb', '#be6fe0', '#57baa5', '#3693d2', '#2d9c86', '#e5ad3b', '#da5470'],
    },
    {
        id: 'lagoon',
        name: 'Lagoon',
        colors: ['#178779', '#5378cf', '#ce9d49', '#1386c0', '#3c9c64', '#d7a12e', '#d35760'],
    },
    {
        id: 'rose',
        name: 'Rosewood',
        colors: ['#c25984', '#8d68be', '#7fa494', '#438da7', '#5d9171', '#bd8b37', '#c44856'],
    },
    {
        id: 'citrus',
        name: 'Golden hour',
        colors: ['#c47c20', '#8d65c1', '#428c95', '#348bb3', '#4c9670', '#ddb52f', '#dc594a'],
    },
];
export function presetProfile(id = 'miru'): Profile {
    const preset = presets.find((item) => item.id === id) || presets[0];
    return {
        version: 2,
        preset: preset.id,
        surface: null,
        colors: Object.fromEntries(
            roles.map((role, i) => [role, preset.colors[i]]),
        ) as Profile['colors'],
    };
}
/** Accept opaque CSS hex colors and expand shorthand for palette math and storage. */
export function normalizeHex(value: unknown): string | null {
    if (typeof value !== 'string' || !/^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(value)) {
        return null;
    }
    const hex = value.slice(1).toLowerCase();
    return '#' + (hex.length === 3 ? [...hex].map((digit) => digit + digit).join('') : hex);
}

export function validateProfile(value: unknown): Profile | null {
    if (!value || typeof value !== 'object') return null;
    const candidate = value as Profile;
    const version = (value as { version?: number }).version;
    const names = [
        'primary',
        'secondary',
        'accent',
        'info',
        'success',
        'warning',
        'danger',
    ] as const;
    const validHex = (color: unknown): color is string => normalizeHex(color) !== null;
    if (
        ![1, 2].includes(version ?? 0) ||
        !candidate.colors ||
        !names.every((role) =>
            validHex(
                role === 'accent' && version === 1
                    ? candidate.colors.primary
                    : candidate.colors[role],
            ),
        )
    )
        return null;
    if (version === 2 && candidate.surface !== null && !validHex(candidate.surface)) return null;
    return {
        version: 2,
        preset:
            typeof candidate.preset === 'string' && /^[a-z-]{1,30}$/.test(candidate.preset)
                ? candidate.preset
                : 'custom',
        surface: version === 1 ? null : normalizeHex(candidate.surface),
        colors: Object.fromEntries(
            names.map((role) => [
                role,
                normalizeHex(
                    role === 'accent' && version === 1
                        ? candidate.colors.primary
                        : candidate.colors[role],
                )!,
            ]),
        ) as Profile['colors'],
    };
}
export function blend(color: string, target: string, amount: number): string {
    return (
        '#' +
        [1, 3, 5]
            .map((i) =>
                Math.round(
                    parseInt(color.slice(i, i + 2), 16) * (1 - amount) +
                        parseInt(target.slice(i, i + 2), 16) * amount,
                )
                    .toString(16)
                    .padStart(2, '0'),
            )
            .join('')
    );
}
// The selected base stays exact at 600. All other steps follow it immediately.
export function palette(hex: string): Record<number, string> {
    const weights: Record<number, number> = {
        50: 0.95,
        100: 0.87,
        200: 0.73,
        300: 0.55,
        400: 0.36,
        500: 0.17,
        600: 0,
        700: -0.15,
        800: -0.32,
        900: -0.52,
        950: -0.72,
    };
    return Object.fromEntries(
        Object.entries(weights).map(([step, weight]) => [
            step,
            blend(hex, weight >= 0 ? '#ffffff' : '#000000', Math.abs(weight)),
        ]),
    );
}
export function contrast(a: string, b: string): number {
    function luminance(hex: string) {
        const rgb = [1, 3, 5]
            .map((start) => parseInt(hex.slice(start, start + 2), 16) / 255)
            .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
        return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
    }
    const x = luminance(a),
        y = luminance(b);
    return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}
export function ink(hex: string): string {
    return contrast(hex, '#000000') > contrast(hex, '#ffffff') ? '#000000' : '#ffffff';
}
export function readable(color: string, background: string, minimum = 4.5): string {
    if (contrast(color, background) >= minimum) return color;
    const target = ink(background);
    let low = 0,
        high = 1;
    for (let i = 0; i < 16; i++) {
        const mid = (low + high) / 2;
        if (contrast(blend(color, target, mid), background) >= minimum) high = mid;
        else low = mid;
    }
    return blend(color, target, high);
}
export function surfaceBase(profile: Profile, neutral = miruDefaults.neutral): string {
    if (profile.preset === 'original' && !profile.surface) return neutral;
    return profile.surface || blend('#647080', profile.colors.accent, 0.3);
}
export function themeCss(profile: Profile, native = miruDefaults): string {
    if (profile.preset === 'original') {
        const declarations = (values: Record<string, string>) =>
            Object.entries(values)
                .map(([name, value]) => `${name}:${value};`)
                .join('');
        const extras = `--ui-surface-raised:var(--ui-muted);--ui-subtle-foreground:var(--ui-muted-foreground);--ui-highlight:var(--ui-accent);--ui-highlight-background:color-mix(in srgb,var(--ui-accent) 12%,var(--ui-background));--ui-editor-background:var(--ui-background);--ui-editor-selection:color-mix(in srgb,var(--ui-accent) 24%,transparent);--miru-ink-accent-400:${ink(native.accent400)};`;
        return `:root,:root.dark{${declarations(native.light)}${extras}--ui-page:var(--ui-neutral-100)}:root.dark{${declarations(native.dark)}${extras}--ui-page:var(--ui-neutral-950)}`;
    }
    const names = [
        'primary',
        'secondary',
        'accent',
        'info',
        'success',
        'warning',
        'danger',
    ] as const;
    const shades = Object.fromEntries(
        names.map((role) => [role, palette(profile.colors[role])]),
    ) as Record<Role, Record<number, string>>;
    const paletteDeclarations = names
        .map((role) =>
            Object.entries(shades[role])
                .map(
                    ([step, value]) =>
                        `--ui-${role}-${step}:${value};--miru-ink-${role}-${step}:${ink(value)};`,
                )
                .join(''),
        )
        .join('');
    const aliases = names
        .map(
            (role) =>
                `--ui-${role}:var(--ui-${role}-600);--ui-${role}-foreground:${role === 'warning' ? '#000000' : '#ffffff'};--ui-${role}-hover:var(--ui-${role}-700);--ui-${role}-active:var(--ui-${role}-800);`,
        )
        .join('');
    const base = surfaceBase(profile, native.neutral);
    const weights: Record<number, number> = {
        50: 0.975,
        100: 0.95,
        200: 0.88,
        300: 0.78,
        400: 0.58,
        500: 0.2,
        600: -0.12,
        700: -0.48,
        800: -0.68,
        900: -0.8,
        950: -0.88,
    };
    const neutral = Object.fromEntries(
        Object.entries(weights).map(([step, w]) => [
            step,
            blend(base, w >= 0 ? '#ffffff' : '#000000', Math.abs(w)),
        ]),
    );
    const neutralCss = Object.entries(neutral)
        .map(([step, value]) => `--ui-neutral-${step}:${value};`)
        .join('');
    function surfaces(dark: boolean) {
        const background = dark ? neutral[900] : blend(base, '#ffffff', 0.995);
        const foreground = dark ? '#f5f6f8' : '#202328';
        const muted = readable(dark ? neutral[400] : neutral[600], background);
        const accent = readable(profile.colors.accent, background);
        const raised = dark ? neutral[800] : neutral[100];
        const readableRoles = names
            .map((role) => `--ui-${role}-text:${readable(profile.colors[role], background)};`)
            .join('');
        return `${readableRoles}--ui-ring:var(--ui-neutral-${dark ? 400 : 950});--ui-page:${dark ? neutral[950] : neutral[50]};--ui-background:${background};--ui-foreground:${foreground};--ui-muted:${raised};--ui-muted-foreground:${muted};--ui-subtle-foreground:${muted};--ui-surface-raised:${raised};--ui-border:${dark ? neutral[700] : neutral[300]};--ui-input:${dark ? neutral[600] : neutral[400]};--ui-surface-hover:${dark ? neutral[800] : neutral[100]};--ui-surface-hover-foreground:${foreground};--ui-accent:${accent};--ui-accent-foreground:#ffffff;--ui-secondary-text:${readable(profile.colors.secondary, background)};--ui-highlight:var(--ui-accent);--ui-highlight-background:color-mix(in srgb,var(--ui-accent-600) ${dark ? 15 : 10}%,var(--ui-background));--ui-default:${foreground};--ui-default-foreground:${background};--ui-default-hover:${dark ? neutral[300] : neutral[700]};--ui-default-active:${dark ? neutral[400] : neutral[600]};--ui-outline-hover:var(--ui-surface-hover);--ui-outline-active:var(--ui-muted);--ui-ghost-hover:var(--ui-surface-hover);--ui-ghost-active:var(--ui-neutral-${dark ? 600 : 200});--ui-ghostly:var(--ui-muted);--ui-ghostly-foreground:var(--ui-foreground);--ui-ghostly-hover:var(--ui-neutral-${dark ? 700 : 200});--ui-ghostly-active:var(--ui-neutral-${dark ? 600 : 300});--ui-editor-background:var(--ui-page);--ui-editor-selection:color-mix(in srgb,var(--ui-accent-500) 25%,transparent);`;
    }
    // Theme shared tokens; native components own their color and state recipes.
    return `:root,:root.dark{${paletteDeclarations}${neutralCss}${aliases}}:root{${surfaces(false)}}:root.dark{${surfaces(true)}}`;
}
export function bootstrapScript(): string {
    return `(()=>{const normalizeHex=${normalizeHex.toString()};const validateProfile=${validateProfile.toString()};const blend=${blend.toString()};const palette=${palette.toString()};const contrast=${contrast.toString()};const ink=${ink.toString()};const readable=${readable.toString()};const surfaceBase=${surfaceBase.toString()};const themeCss=${themeCss.toString()};let profile=${JSON.stringify(presetProfile())};try{profile=validateProfile(JSON.parse(localStorage.getItem('${storageKey}')||'null'))||profile}catch{}const style=document.createElement('style');style.id='miru-color-theme';style.textContent=themeCss(profile,${JSON.stringify(miruDefaults)});document.head.appendChild(style);document.documentElement.dataset.miruColors=profile.preset})()`;
}
