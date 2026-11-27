/**
 * Type-check the copyable Vue and TypeScript examples against the built library.
 *
 * Reads the playground examples and documentation snippets, then writes isolated Vue fixtures to .qa/checked-examples.
 *
 * Runs vue-tsc on those fixtures. Invoked by npm run test:docs after its documentation tests.
 */

import { spawnSync } from 'node:child_process';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { examples } from '../.vitepress/theme/playground/examples.ts';
import { exampleSource } from '../.vitepress/theme/playground/source.ts';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, '.qa/checked-examples');
await mkdir(output, { recursive: true });
const inputs = [];

/**
 * Write one Vue fixture for documentation type checking.
 * @param name
 * @param code
 */
async function sample(name, code) {
    const file = name + '.vue';
    inputs.push(file);
    await writeFile(path.join(output, file), code);
}

for (const name of Object.keys(examples)) {
    await sample(name, exampleSource(name));
}
const docs = path.resolve(root, '../package/src/docs');
for (const section of ['composables', 'support']) {
    for (const name of await readdir(path.join(docs, section))) {
        if (!name.endsWith('.mdx')) {
            continue;
        }
        const source = await readFile(path.join(docs, section, name), 'utf8');
        const blocks = [...source.matchAll(/```ts\n([\s\S]*?)\n```/g)];
        if (name === 'useToast.mdx') {
            await sample(
                'composables-useToast',
                `<script setup lang="ts">\n${blocks.map((block) => block[1]).join('\n')}\n</script><template><div /></template>`,
            );
            continue;
        }
        for (const [index, block] of blocks.entries()) {
            await sample(
                section + '-' + name.slice(0, -4) + '-' + index,
                `<script setup lang="ts">\n${block[1]}\n</script>\n<template><div /></template>`,
            );
        }
    }
}
for (const name of [
    'plugins/click-outside',
    'plugins/dayjs',
    'plugins/filesize',
    'plugins/price',
    'plugins/resize',
    'plugins/tinymce',
]) {
    const guide = await readFile(path.join(docs, name + '.mdx'), 'utf8');
    const block = guide.match(/```vue\n([\s\S]*?)\n```/);
    await sample('guide-' + name.replaceAll('/', '-'), block[1]);
}
for (const name of ['validation', 'fields', 'layouts']) {
    const guide = await readFile(path.join(root, 'docs/docs/forms', name + '.md'), 'utf8');
    for (const [index, block] of [...guide.matchAll(/```vue\n([\s\S]*?)\n```/g)].entries()) {
        await sample('forms-' + name + '-' + index, block[1]);
    }
}
const adapterGuide = await readFile(path.join(root, 'docs/docs/data-table/adapters.md'), 'utf8');
for (const [index, block] of [
    ...adapterGuide.matchAll(/```(vue|ts)\n([\s\S]*?)\n```/g),
].entries()) {
    await sample(
        'guide-adapter-' + index,
        block[1] === 'vue'
            ? block[2]
            : `<script setup lang="ts">\n${block[2]}\n</script>\n<template><div /></template>`,
    );
}
await writeFile(
    path.join(output, 'tsconfig.json'),
    JSON.stringify({ extends: '../../tsconfig.json', files: inputs, include: [] }, null, 2),
);
console.log(
    `Checking ${inputs.length} copyable Vue/TypeScript examples against the built package.`,
);
const result = spawnSync(
    process.execPath,
    [
        path.resolve(root, '../package/node_modules/vue-tsc/bin/vue-tsc.js'),
        '--noEmit',
        '-p',
        path.join(output, 'tsconfig.json'),
    ],
    { cwd: root, stdio: 'inherit' },
);
process.exitCode = result.status ?? 1;
