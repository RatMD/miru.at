import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readlink, realpath, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { preparePackage } from '../scripts/prepare-package.mjs';

async function fixture(t) {
    const parent = await mkdtemp(path.join(tmpdir(), 'miru-deploy-'));
    t.after(async () => {
        assert.ok(
            path.resolve(parent).startsWith(path.join(path.resolve(tmpdir()), 'miru-deploy-')),
        );
        await rm(parent, { recursive: true, force: true });
    });
    const website = path.join(parent, 'www');
    await mkdir(website);

    return { parent, website };
}

async function checkout(parent, name) {
    const directory = path.join(parent, name);
    await mkdir(path.join(directory, 'src/stories'), { recursive: true });
    await writeFile(path.join(directory, 'package.json'), JSON.stringify({ name: '@rat.md/miru' }));

    return realpath(directory);
}

test('the local package checkout remains unchanged', async (t) => {
    const { parent, website } = await fixture(t);
    const original = await checkout(parent, 'package');
    assert.equal(await preparePackage(website), original);
});

test('Plesk resolves ../storybook through an idempotent package alias', async (t) => {
    const { parent, website } = await fixture(t);
    const original = await checkout(parent, 'storybook');
    assert.equal(await preparePackage(website), original);
    assert.ok(await readlink(path.join(parent, 'package')));
    assert.equal(await preparePackage(website), original);
    assert.equal(
        await realpath(path.join(website, '../package/src/stories')),
        path.join(original, 'src/stories'),
    );
});

test('an incomplete existing directory is never overwritten', async (t) => {
    const { parent, website } = await fixture(t);
    await checkout(parent, 'storybook');
    await mkdir(path.join(parent, 'package'));
    await assert.rejects(preparePackage(website), /will not be overwritten/);
});

test('a static Storybook output alone is not accepted as package sources', async (t) => {
    const { parent, website } = await fixture(t);
    await mkdir(path.join(parent, 'storybook/storybook-static'), { recursive: true });
    await assert.rejects(preparePackage(website), /full miru repository/);
});
