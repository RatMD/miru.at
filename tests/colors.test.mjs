/**
 * Check stored color profiles, palette contrast and early theme restoration.
 */

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import {
    palette,
    ink,
    contrast,
    readable,
    presets,
    roles,
    presetProfile,
    validateProfile,
    themeCss,
    bootstrapScript,
    normalizeHex,
} from '../.vitepress/theme/colors/engine.ts';
import { miruDefaults } from '../.vitepress/theme/colors/miru-defaults.ts';

test('hex shorthand expands to canonical colors and rejects incomplete or alpha values', () => {
    assert.equal(normalizeHex('#f00'), '#ff0000');
    assert.equal(normalizeHex('#AbC'), '#aabbcc');
    assert.equal(normalizeHex('#ABCDEF'), '#abcdef');
    for (const value of [
        null,
        undefined,
        123,
        '',
        '#f',
        '#ff',
        '#ffff',
        '#fffff',
        '#ffffffff',
        '#ggg',
        '#fff;}',
    ]) {
        assert.equal(normalizeHex(value), null);
    }
});

test('stored short colors and surface tints are normalized before generating palettes', () => {
    const original = {
        ...presetProfile(),
        surface: '#ABC',
        colors: { ...presetProfile().colors, primary: '#f00' },
    };
    const restored = validateProfile(original);
    assert.equal(restored.colors.primary, '#ff0000');
    assert.equal(restored.surface, '#aabbcc');
    assert.equal(original.colors.primary, '#f00');
    const css = themeCss({ ...restored, preset: 'custom' });
    assert.ok(css.includes('--ui-primary-600:#ff0000;'));
    assert.ok(!css.includes('NaN'));
});

test('every preset produces complete palettes and preserves the chosen base', () => {
    for (const preset of presets) {
        for (const color of preset.colors) {
            const shades = palette(color);
            assert.equal(Object.keys(shades).length, 11);
            assert.equal(shades[600], color);
            for (const shade of Object.values(shades)) {
                assert.match(shade, /^#[\da-f]{6}$/);
            }
        }
    }
    assert.equal(palette('#000000')[600], '#000000');
    assert.equal(palette('#ffffff')[600], '#ffffff');
});
test('Miru Original uses package palettes and gray surfaces, beside Miru Modern', () => {
    assert.equal(presets[0].name, 'Miru Modern');
    assert.equal(presets[1].name, 'Miru Original');
    const css = themeCss(presetProfile('original'));
    const nativeSource = readFileSync(
        new URL('../../package/src/styles/tokens.css', import.meta.url),
        'utf8',
    );
    for (const name of [
        '--ui-primary-600',
        '--ui-secondary-600',
        '--ui-accent-600',
        '--ui-neutral-900',
    ]) {
        assert.ok(nativeSource.includes(`${name}: ${miruDefaults.light[name]};`));
        assert.ok(css.includes(`${name}:${miruDefaults.light[name]};`));
    }
    assert.ok(css.startsWith(':root,:root.dark{'));
    assert.ok(css.includes('--ui-background:var(--ui-neutral-900);'));
    assert.ok(css.includes('--ui-page:var(--ui-neutral-100)'));
    assert.ok(css.includes('--ui-page:var(--ui-neutral-950)'));
    assert.ok(!css.includes('--ui-neutral-900:#'));
});
test('website palettes leave native Button and Badge styling to the package', () => {
    for (const preset of presets) {
        const css = themeCss(presetProfile(preset.id));
        assert.ok(
            !css.includes('.miru-button'),
            `${preset.name} must not override component styles`,
        );
        assert.ok(!css.includes('.miru-badge'), `${preset.name} must not override badge styles`);
    }
});
test('automatic text color meets 4.5 contrast on every generated shade', () => {
    /**
     * Calculate relative luminance for an sRGB hex color.
     * @param hex
     * @returns
     */
    function luminance(hex) {
        const c = [1, 3, 5]
            .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
            .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));

        return c[0] * 0.2126 + c[1] * 0.7152 + c[2] * 0.0722;
    }

    for (const preset of presets) {
        for (const color of preset.colors) {
            for (const shade of Object.values(palette(color))) {
                const a = luminance(shade),
                    b = luminance(ink(shade));
                assert.ok((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05) >= 4.5);
            }
        }
    }
});
test('stored profiles reject malformed values and CSS injection', () => {
    assert.equal(validateProfile(null), null);
    assert.equal(validateProfile({ ...presetProfile(), version: 3 }), null);
    assert.equal(validateProfile({ ...presetProfile(), colors: { primary: '#fff;}' } }), null);
    assert.equal(validateProfile({ ...presetProfile(), colors: null }), null);
});
test('existing six-color settings migrate without losing visitor colors', () => {
    const { accent, ...colors } = presetProfile('lagoon').colors;
    const restored = validateProfile({ version: 1, preset: 'custom', colors });
    assert.equal(restored.version, 2);
    assert.equal(restored.colors.primary, colors.primary);
    assert.equal(restored.colors.accent, colors.primary);
    assert.equal(restored.surface, null);
    assert.equal(validateProfile({ ...presetProfile(), surface: 'red;}' }), null);
});
test('accent text and secondary text retain contrast on light and dark surfaces', () => {
    for (const preset of presets.filter((preset) => preset.id !== 'original')) {
        for (const surface of [null, '#ff0000', '#000000', '#ffffff', '#00ffff']) {
            const css = themeCss({ ...presetProfile(preset.id), surface });
            for (const selector of [':root{', ':root.dark{']) {
                const body = css
                    .slice(css.indexOf('}' + selector) + 1 + selector.length)
                    .split('}')[0];
                const tokens = Object.fromEntries(
                    body
                        .split(';')
                        .filter(Boolean)
                        .map((entry) => entry.split(':')),
                );
                assert.ok(contrast(tokens['--ui-foreground'], tokens['--ui-background']) >= 4.5);
                assert.ok(
                    contrast(tokens['--ui-muted-foreground'], tokens['--ui-background']) >= 4.5,
                );
                assert.ok(contrast(tokens['--ui-accent'], tokens['--ui-background']) >= 4.5);
                for (const role of roles) {
                    assert.ok(
                        contrast(tokens[`--ui-${role}-text`], tokens['--ui-background']) >= 4.5,
                    );
                }
            }
        }
    }
    for (const base of ['#ffffff', '#000000', '#ff00ff']) {
        for (const bg of ['#fffefe', '#121215']) {
            assert.ok(contrast(readable(base, bg), bg) >= 4.5);
        }
    }
});
test('bootstrap restores authored schemes or a custom palette before the app mounts', () => {
    const schemes = Object.fromEntries(
        Object.entries({
            original: 'original',
            miru: 'modern',
            aurora: 'northern-lights',
            lagoon: 'lagoon',
            rose: 'rosewood',
            citrus: 'golden-hour',
        }).map(([id, name]) => [
            id,
            readFileSync(new URL(`../../package/src/themes/${name}.css`, import.meta.url), 'utf8'),
        ]),
    );
    for (const raw of [
        ...presets.map((preset) => JSON.stringify(presetProfile(preset.id))),
        JSON.stringify({
            ...presetProfile(),
            preset: 'custom',
            surface: '#abc',
            colors: { ...presetProfile().colors, primary: '#f00' },
        }),
        'invalid json',
        null,
    ]) {
        let style;
        const document = {
            head: {
                /**
                 * Append a fixture node to the simulated document head.
                 * @param value
                 */
                appendChild(value) {
                    style = value;
                },
            },

            /**
             * Create a minimal element fixture.
             * @returns
             */
            createElement() {
                return {};
            },
            documentElement: { dataset: {} },
        };
        vm.runInNewContext(bootstrapScript(schemes), {
            document,
            localStorage: {
                /**
                 * Read the stored value from the test fixture.
                 * @returns
                 */

                /**
                 * Read the stored value from the test fixture.
                 * @returns
                 */
                getItem: () => raw,
            },
        });
        const expected = raw?.startsWith('{') ? validateProfile(JSON.parse(raw)) : presetProfile();
        assert.equal(document.documentElement.dataset.miruColors, expected.preset);
        assert.equal(style.textContent, themeCss(expected, miruDefaults, schemes));
        if (expected.preset !== 'custom') {
            assert.equal(style.textContent, schemes[expected.preset]);
        }
        for (const role of roles) {
            assert.ok(style.textContent.includes(`--ui-${role}-950:`));
        }
    }
});
