/**
 * Check gallery coverage and compilation of component color variants.
 */

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import * as Miru from '@rat.md/miru';
import * as Composables from '@rat.md/miru/composables';
import * as Layouts from '@rat.md/miru/layouts';
import * as Support from '@rat.md/miru/support';
import { IconBell, IconMail } from '@tabler/icons-vue';
import * as Vue from 'vue';
import * as Zod from 'zod';
import { galleryCards, gallerySource } from '../.vitepress/theme/gallery/catalogue.ts';
import { compileExample } from '../.vitepress/theme/playground/compiler.ts';

const catalogue = JSON.parse(
    readFileSync(new URL('../.vitepress/theme/component-catalogue.json', import.meta.url), 'utf8'),
);
const library = { ...Miru, ...Layouts, IconBell, IconMail };
const modules = {
    vue: Vue,
    '@rat.md/miru': library,
    '@rat.md/miru/layouts': Layouts,
    '@rat.md/miru/composables': Composables,
    '@rat.md/miru/support': Support,
    zod: Zod,
};

/**
 * Resolve a module explicitly allowed in the preview.
 * @param name
 * @returns
 */
const resolve = (name) => {
    assert.ok(name in modules, name);

    return modules[name];
};
test('every catalogue component belongs to exactly one gallery family', () => {
    const pieces = galleryCards.flatMap((card) => card.pieces.map((piece) => piece.name));
    assert.equal(pieces.length, catalogue.length);
    assert.equal(new Set(pieces).size, catalogue.length);
    for (const entry of catalogue) {
        assert.ok(pieces.includes(entry.name), entry.name);
    }
});
test('every gallery source and supported colour compiles with real library exports', () => {
    for (const card of galleryCards) {
        for (const colour of [undefined, ...(card.colours?.values ?? [])]) {
            const source = gallerySource(card, colour);
            for (const match of source.matchAll(
                /import\s*\{([^}]+)\}\s*from\s*'(@rat.md\/miru[^']*)'/g,
            )) {
                for (const name of match[1]
                    .split(',')
                    .map((name) => name.trim())
                    .filter(Boolean)) {
                    assert.ok(name in resolve(match[2]), `${card.name}: ${name}`);
                }
            }
            assert.ok(
                compileExample(source, resolve, `test-${card.name}-${colour ?? 'base'}`).component,
            );
            if (colour) {
                assert.ok(
                    source.includes(
                        `${card.colours.prop.replace(/[A-Z]/g, (letter) => '-' + letter.toLowerCase())}="${colour}"`,
                    ),
                    `${card.name}: ${colour}`,
                );
            }
        }
    }
});
test('gallery previews isolate CSS scopes and explicit field IDs', () => {
    const card = galleryCards.find((card) => card.name === 'Switch');
    const primary = gallerySource(card, 'default');
    const success = gallerySource(card, 'success');
    const a = compileExample(primary, resolve, 'gallery-a');
    const b = compileExample(success, resolve, 'gallery-b');
    assert.match(a.styles, /data-v-gallery-a/);
    assert.doesNotMatch(a.styles, /data-v-gallery-b/);
    assert.match(b.styles, /data-v-gallery-b/);
    assert.match(primary, /id="gallery-Switch-default-inspiration"/);
    assert.match(primary, /for="gallery-Switch-default-inspiration"/);
    assert.doesNotMatch(success, /gallery-Switch-default-inspiration/);
});
