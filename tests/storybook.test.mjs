/**
 * Check installation parity and concise Storybook reference links.
 */

import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import test from 'node:test';

const packageRoot = new URL('../../package/', import.meta.url);
test('Storybook Getting Started stays equal to the canonical VitePress installation page', async () => {
    const source = await readFile(
        new URL('../docs/docs/guide/installation.md', import.meta.url),
        'utf8',
    );
    const expected =
        source
            .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')
            .trim()
            .replace(/\]\((\/[^)]+)\)/g, '](https://miru.at$1)') + '\n';
    assert.equal(
        await readFile(new URL('src/stories/getting-started.md', packageRoot), 'utf8'),
        expected,
    );
});
test('all reference entries keep a short intro and a link to their complete VitePress page', async () => {
    for (const group of ['composables', 'plugins', 'support']) {
        const directory = new URL(`src/docs/${group}/`, packageRoot);
        for (const file of await readdir(directory)) {
            if (!file.endsWith('.mdx')) {
                continue;
            }
            const snapshot = await readFile(
                new URL(`.storybook/reference/${group}/${file}`, packageRoot),
                'utf8',
            );
            assert.ok(
                snapshot.includes(`https://miru.at/docs/${group}/${file.replace(/\.mdx$/, '')}`),
                file,
            );
            assert.doesNotMatch(snapshot, /```|^## /m, file);
            assert.match(
                snapshot,
                /^# .+ <a className="miru-doc-badge" href="https:\/\/miru\.at\/docs\//m,
                file,
            );
        }
    }
});

test('Storybook component title links resolve to existing VitePress pages', async () => {
    const links = JSON.parse(
        await readFile(new URL('src/stories/documentation-links.json', packageRoot), 'utf8'),
    );
    for (const [title, href] of Object.entries(links)) {
        const url = new URL(href);
        assert.equal(url.origin, 'https://miru.at', title);
        await readFile(new URL('../docs' + url.pathname + '.md', import.meta.url), 'utf8');
    }
});
