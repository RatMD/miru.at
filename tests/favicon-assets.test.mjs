/**
 * Check generated icon formats, dimensions and maskable artwork.
 */

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { Resvg } from '@resvg/resvg-js';

const publicDirectory = new URL('../docs/public/', import.meta.url);

/**
 * Read the requested fixture or generated file.
 * @param name
 * @returns
 */
const read = (name) => readFileSync(new URL(name, publicDirectory));

test('favicon variants have the advertised binary formats and pixel dimensions', () => {
    for (const [name, size] of [
        ['favicon.png', 32],
        ['apple-touch-icon.png', 180],
        ['icon-192.png', 192],
        ['icon-512.png', 512],
        ['icon-mask.png', 512],
    ]) {
        const png = read(name);
        assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', name);
        assert.equal(png.readUInt32BE(16), size, name);
        assert.equal(png.readUInt32BE(20), size, name);
    }
    const ico = read('favicon.ico');
    assert.equal(ico.readUInt16LE(2), 1, 'ICO resource type');
    assert.equal(ico.readUInt16LE(4), 1, 'one image');
    assert.equal(ico[6], 32);
    assert.equal(ico[7], 32);
    assert.equal(ico.readUInt16LE(12), 32, '32 bits per pixel');
    assert.equal(ico.readUInt32LE(14) + ico.readUInt32LE(18), ico.length);
    assert.equal(ico.readUInt32LE(22), 40, 'classic bitmap header');
});

test('manifest points to real icons including a separate maskable image', () => {
    const manifest = JSON.parse(read('manifest.webmanifest'));
    assert.equal(manifest.start_url, '/');
    assert.equal(manifest.scope, '/');
    const maskable = manifest.icons.filter((icon) => icon.purpose === 'maskable');
    assert.equal(maskable.length, 1);
    assert.equal(maskable[0].src, '/icon-mask.png');
    for (const icon of manifest.icons) {
        const png = read(icon.src.slice(1));
        assert.equal(icon.type, 'image/png');
        assert.equal(icon.sizes, `${png.readUInt32BE(16)}x${png.readUInt32BE(20)}`);
    }
    assert.equal(read('favicon.svg').toString(), read('miru-mark-squircle.svg').toString());
});

test('touch icons are opaque and the maskable artwork stays inside the safe circle', () => {
    for (const [name, size] of [
        ['apple-touch-icon.png', 180],
        ['icon-mask.png', 512],
    ]) {
        const encoded = read(name).toString('base64');
        const pixels = new Resvg(
            `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><image width="${size}" height="${size}" href="data:image/png;base64,${encoded}"/></svg>`,
        ).render().pixels;
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                const offset = (y * size + x) * 4;
                assert.equal(pixels[offset + 3], 255, `${name}: opaque background`);
                if (
                    name === 'icon-mask.png' &&
                    Math.hypot(x + 0.5 - size / 2, y + 0.5 - size / 2) > size * 0.4
                ) {
                    assert.deepEqual(
                        [...pixels.subarray(offset, offset + 3)],
                        [4, 47, 46],
                        'artwork outside the maskable safe zone',
                    );
                }
            }
        }
    }
});
