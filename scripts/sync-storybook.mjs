/**
 * Keep Storybook installation prose and short references aligned with VitePress.
 *
 * Copies canonical installation content into the package and generates brief composable, plugin and support entries with full documentation links.
 *
 * Run through npm run docs:storybook. The snapshots let the package build Storybook independently.
 */

import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { markSvg, defaultMarkColors } from '../.vitepress/theme/branding/mark.ts';
import { discoverStories } from './package-inventory.mjs';

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
    await writeFile(
        new URL('.storybook/miru-mark.svg', packageRoot),
        markSvg(defaultMarkColors) + '\n',
    );
    const installation = await readFile(
        new URL('../docs/docs/guide/installation.md', import.meta.url),
        'utf8',
    );
    await writeFile(
        new URL('src/stories/getting-started.md', packageRoot),
        installationBody(installation),
    );
    const catalogue = JSON.parse(
        await readFile(
            new URL('../.vitepress/theme/component-catalogue.json', import.meta.url),
            'utf8',
        ),
    );
    const links = Object.fromEntries(
        catalogue
            .filter((item) => item.story)
            .map((item) => [item.story, `https://miru.at${item.link}`]),
    );
    links['Getting Started'] = 'https://miru.at/docs/guide/installation';
    links['Plugins/Examples'] = 'https://miru.at/docs/plugins/directives';
    for (const story of await discoverStories()) {
        if (!links[story.title]) {
            throw new Error(`Missing documentation link: ${story.title}`);
        }
    }
    await writeFile(
        new URL('src/stories/documentation-links.json', packageRoot),
        JSON.stringify(links, null, 2) + '\n',
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
                `import { Meta } from '@storybook/addon-docs/blocks';\nimport miruMark from '../../miru-mark.svg';\n\n<Meta title=${JSON.stringify(title)} />\n\n# ${heading} <a className="miru-doc-badge" href="${link}" target="_blank" rel="noopener noreferrer" title="View on miru.at" aria-label="View documentation on miru.at"><img src={miruMark} alt="" width={16} height={16} className="miru-doc-badge-mark" />Documentation ↗</a>\n\n${intro}\n\n[Read the full documentation on miru.at ↗](${link})\n`,
            );
            count++;
        }
    }
    console.log(
        `Storybook: synced Getting Started and ${count} short reference entries from the documentation sources.`,
    );
}

await syncStorybook();
