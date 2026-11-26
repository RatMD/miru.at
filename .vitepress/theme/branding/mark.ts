export type MarkColors = {
    front: string;
    side: string;
    depth: string;
    shadow: string;
    edge: string;
    tile?: string;
};

/** One outlined glyph, shared by the header, downloadable mark and favicon. */
export const markPath =
    'M17 40H34V48C38 41 44 37 52 37C61 37 67 41 70 48C75 41 81 37 89 37C103 37 111 47 111 63V108H91V66C91 58 88 54 83 54C77 54 74 59 74 67V108H54V66C54 58 51 54 46 54C40 54 37 59 37 67V108H17Z';
// The same contour as Miru's squircle avatars, scaled to this 128-unit canvas.
export const squirclePath =
    'M64 0C117.76 0 128 10.24 128 64C128 117.76 117.76 128 64 128C10.24 128 0 117.76 0 64C0 10.24 10.24 0 64 0Z';
export const defaultMarkColors: MarkColors = {
    front: '#2dd4bf',
    side: '#0f766e',
    depth: '#134e4a',
    shadow: '#042f2e',
    edge: '#99f6e4',
    tile: '#042f2e',
};

/**
 * Escape values before inserting them into SVG markup.
 * @param value
 * @returns
 */
function xml(value: string): string {
    return value.replace(
        /[&<>"']/g,
        (char) =>
            ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&apos;',
            })[char]!,
    );
}

/**
 * Render the shared mark paths using the selected colors.
 * @param colors
 * @returns
 */
export function markArtwork(colors: MarkColors): string {
    return `<g transform="translate(-2 -5) rotate(-12 64 72)">
    <path class="miru-mark-shadow" d="${markPath}" transform="translate(8 10)" fill="${xml(colors.shadow)}"/>
    <path class="miru-mark-depth" d="${markPath}" transform="translate(5.5 7)" fill="${xml(colors.depth)}"/>
    <path class="miru-mark-side" d="${markPath}" transform="translate(2.5 3.5)" fill="${xml(colors.side)}"/>
    <path class="miru-mark-face" d="${markPath}" fill="${xml(colors.front)}"/>
    <path class="miru-mark-edge" d="${markPath}" fill="none" stroke="${xml(colors.edge)}" stroke-width=".7" opacity=".28"/>
  </g>`;
}

/**
 * Build the complete SVG mark with an optional background tile.
 * @param colors
 * @param tile
 * @returns
 */
export function markSvg(colors: MarkColors = defaultMarkColors, tile = false): string {
    const artwork = tile
        ? `<path class="miru-mark-tile" d="${squirclePath}" fill="${xml(colors.tile || colors.shadow)}"/><g transform="translate(7 6) scale(.9)">${markArtwork(colors)}</g>`
        : markArtwork(colors);

    return `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">${artwork}</svg>`;
}

/**
 * Encode the selected SVG mark as a favicon data URL.
 * @param colors
 * @returns
 */
export function faviconDataUrl(colors: MarkColors): string {
    return 'data:image/svg+xml,' + encodeURIComponent(markSvg(colors, true));
}

/**
 * Resolve mark colors from the active semantic tokens.
 * @param read
 * @param dark
 * @returns
 */
export function markColorsFromTokens(read: (name: string) => string, dark: boolean): MarkColors {
    /**
     * Read a palette step or use its fallback color.
     * @param step
     * @param fallback
     * @returns
     */
    const color = (step: number, fallback: string) => {
        const value = read(`--ui-accent-${step}`).trim();

        return value && !value.includes('var(') ? value : fallback;
    };
    const ink = read('--ui-accent-text').trim();
    if (!dark) {
        return {
            front: '#ffffff',
            side: color(100, '#ccfbf1'),
            depth: color(300, '#5eead4'),
            shadow: color(800, '#115e59'),
            edge: '#ffffff',
            tile: ink && !ink.includes('var(') ? ink : color(700, '#0f766e'),
        };
    }

    return {
        front: color(400, defaultMarkColors.front),
        side: color(700, defaultMarkColors.side),
        depth: color(900, defaultMarkColors.depth),
        shadow: color(950, defaultMarkColors.shadow),
        edge: color(300, defaultMarkColors.edge),
        tile: color(950, defaultMarkColors.shadow),
    };
}
