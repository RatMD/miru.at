/**
 * Keep Storybook installation prose and short references aligned with VitePress.
 *
 * Copies canonical installation content into the package and generates brief composable, plugin and support entries with full documentation links.
 *
 * Run through npm run docs:sync. The snapshots let the package build Storybook independently.
 */

import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';

const packageRoot = new URL('../../package/', import.meta.url);

/**
 * VitePress owns installation prose; the package keeps a standalone buildable snapshot.
 * @param markdown
 * @returns
 */
export function installationBody(markdown) {
    return (
        markdown
            .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')
            .trim()
            .replace(/\]\((\/[^)]+)\)/g, '](https://miru.at$1)') + '\n'
    );
}

/**
 * Synchronize Getting Started and the short Storybook reference pages.
 */
export async function syncStorybook() {
    const installation = await readFile(
        new URL('../docs/docs/guide/installation.md', import.meta.url),
        'utf8',
    );
    await writeFile(
        new URL('src/stories/getting-started.md', packageRoot),
        installationBody(installation),
    );
    let count = 0;
    for (const group of ['composables', 'plugins', 'support']) {
        const source = new URL(`src/docs/${group}/`, packageRoot);
        const destination = new URL(`.storybook/reference/${group}/`, packageRoot);
        await mkdir(destination, { recursive: true });
        for (const file of await readdir(source)) {
            if (!file.endsWith('.mdx')) {
                continue;
            }
            const raw = await readFile(new URL(file, source), 'utf8');
            const title = raw.match(/<Meta title="([^"]+)"/)[1];
            const heading = raw.match(/^# (.+)$/m)[1];
            const body = raw
                .slice(raw.search(/^# /m))
                .replace(/```[\s\S]*?```/g, '')
                .replace(/^#{1,6} [^\n]+$/gm, '')
                .trim();
            const intro = body
                .split(/\r?\n\s*\r?\n/)[0]
                .replace(/\r?\n/g, ' ')
                .replace(/\]\((\/[^)]+)\)/g, '](https://miru.at$1)');
            const link = `https://miru.at/docs/${group}/${file.replace(/\.mdx$/, '')}`;
            await writeFile(
                new URL(file, destination),
                `import { Meta } from '@storybook/addon-docs/blocks';\n\n<Meta title=${JSON.stringify(title)} />\n\n# ${heading}\n\n${intro}\n\n[Read the full documentation on miru.at ↗](${link})\n`,
            );
            count++;
        }
    }
    console.log(
        `Storybook: synced Getting Started and ${count} short reference entries from the documentation sources.`,
    );
}

await syncStorybook();
