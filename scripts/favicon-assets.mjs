/**
 * Render favicon and installable application icon variants from the shared brand SVG.
 *
 * Writes ICO, PNG, Apple touch icons, Android icons and the web manifest into docs/public.
 *
 * Called by sync-brand.mjs; importing this module does not generate assets.
 */

import { writeFileSync } from 'node:fs';
import { Resvg } from '@resvg/resvg-js';

const publicDirectory = new URL('../docs/public/', import.meta.url);
const background = '#042f2e';

/**
 * Rasterize the SVG mark at the requested width.
 * @param svg
 * @param size
 * @returns
 */
function render(svg, size) {
    return new Resvg(svg, {
        fitTo: { mode: 'width', value: size },
        font: { loadSystemFonts: false },
    }).render();
}

/**
 * Place the brand mark inside the required icon safe area.
 * @param svg
 * @param fraction
 * @returns
 */
function padded(svg, fraction) {
    const inset = (128 * (1 - fraction)) / 2;

    return `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><rect width="128" height="128" fill="${background}"/><g transform="translate(${inset} ${inset}) scale(${fraction})">${svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')}</g></svg>`;
}

// A classic 32-bit DIB plus transparency mask, rather than PNG-in-ICO,
// also works with older ICO readers. Rows are stored bottom-up as BGRA.

/**
 * Encode raster pixels as a compatible ICO image.
 * @param image
 * @returns
 */
function ico(image) {
    const size = image.width;
    const pixels = image.pixels;
    const maskStride = Math.ceil(size / 32) * 4;
    const pixelLength = size * size * 4;
    const dib = Buffer.alloc(40 + pixelLength + maskStride * size);
    dib.writeUInt32LE(40, 0);
    dib.writeInt32LE(size, 4);
    dib.writeInt32LE(size * 2, 8);
    dib.writeUInt16LE(1, 12);
    dib.writeUInt16LE(32, 14);
    dib.writeUInt32LE(pixelLength, 20);
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const src = (y * size + x) * 4;
            const dst = 40 + ((size - y - 1) * size + x) * 4;
            dib[dst] = pixels[src + 2];
            dib[dst + 1] = pixels[src + 1];
            dib[dst + 2] = pixels[src];
            dib[dst + 3] = pixels[src + 3];
            if (pixels[src + 3] === 0) {
                dib[40 + pixelLength + (size - y - 1) * maskStride + (x >> 3)] |= 0x80 >> (x % 8);
            }
        }
    }
    const header = Buffer.alloc(22);
    header.writeUInt16LE(1, 2);
    header.writeUInt16LE(1, 4);
    header[6] = size;
    header[7] = size;
    header.writeUInt16LE(1, 10);
    header.writeUInt16LE(32, 12);
    header.writeUInt32LE(dib.length, 14);
    header.writeUInt32LE(header.length, 18);

    return Buffer.concat([header, dib]);
}

/**
 * Write favicon and installable app icons from the shared SVG mark.
 * @param svg
 */
export function generateFaviconAssets(svg) {
    /**
     * Write one generated icon asset to the public directory.
     * @param name
     * @param bytes
     * @returns
     */
    const save = (name, bytes) => writeFileSync(new URL(name, publicDirectory), bytes);
    for (const [name, size, artwork] of [
        ['favicon.png', 32, svg],
        ['apple-touch-icon.png', 180, padded(svg, 140 / 180)],
        ['icon-192.png', 192, svg],
        ['icon-512.png', 512, svg],
        ['icon-mask.png', 512, padded(svg, 0.7)],
    ]) {
        save(name, render(artwork, size).asPng());
    }
    save('favicon.ico', ico(render(svg, 32)));
    save(
        'manifest.webmanifest',
        JSON.stringify(
            {
                id: '/',
                name: 'miru. — Components with character.',
                short_name: 'miru.',
                description:
                    'Thoughtfully crafted Vue components, expressive forms, and application layouts.',
                lang: 'en',
                start_url: '/',
                scope: '/',
                display: 'standalone',
                theme_color: '#101113',
                background_color: '#101113',
                icons: [
                    { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
                    { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
                    {
                        src: '/icon-mask.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                ],
            },
            null,
            2,
        ) + '\n',
    );
}
