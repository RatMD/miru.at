import assert from 'node:assert/strict';
import test from 'node:test';
import {
    defaultMarkColors,
    faviconDataUrl,
    markColorsFromTokens,
    markPath,
} from '../.vitepress/theme/branding/mark.ts';

test('favicon embeds literal theme colors, with encoded hashes and the shared vector glyph', () => {
    const colors = {
        ...defaultMarkColors,
        front: '#ffbbaa',
        side: 'oklch(45% 0.1 180)',
    };
    const uri = faviconDataUrl(colors);
    assert.ok(uri.startsWith('data:image/svg+xml,'));
    assert.ok(!uri.includes('#'));
    const svg = decodeURIComponent(uri.slice('data:image/svg+xml,'.length));
    assert.ok(svg.includes(`fill="${colors.front}"`));
    assert.ok(svg.includes(`fill="${colors.side}"`));
    assert.ok(svg.includes(markPath));
    assert.ok(!svg.includes('var('));
});
test('favicon uses the actual native palette in dark and light appearances', () => {
    const tokens = {
        '--ui-accent-400': '#2dd4bf',
        '--ui-accent-500': '#0d9488',
        '--ui-accent-text': '#115e59',
        '--ui-accent-700': '#115e59',
        '--ui-accent-900': '#0f3d39',
        '--ui-accent-950': '#042f2e',
        '--ui-accent-300': '#5eead4',
    };
    const read = (name) => tokens[name] || '';
    assert.equal(markColorsFromTokens(read, true).front, tokens['--ui-accent-400']);
    assert.equal(markColorsFromTokens(read, false).front, '#ffffff');
    assert.equal(markColorsFromTokens(read, false).tile, tokens['--ui-accent-text']);
    assert.equal(markColorsFromTokens(read, true).shadow, tokens['--ui-accent-950']);
    assert.deepEqual(
        markColorsFromTokens(() => '', true),
        defaultMarkColors,
    );
    assert.deepEqual(
        markColorsFromTokens(() => 'var(--missing)', true),
        defaultMarkColors,
    );
});
