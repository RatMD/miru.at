/** Resolve the local package checkout, including Plesk's sibling storybook directory. */
import { lstat, readFile, realpath, stat, symlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

async function hasPackageSources(directory) {
    try {
        const manifest = JSON.parse(await readFile(path.join(directory, 'package.json'), 'utf8'));

        return (
            manifest.name === '@rat.md/miru' &&
            (await stat(path.join(directory, 'src/stories'))).isDirectory()
        );
    } catch (error) {
        if (error.code === 'ENOENT' || error.code === 'ENOTDIR') {
            return false;
        }
        throw error;
    }
}

/** Preserve ../package locally; alias it to ../storybook on the live server. */
export async function preparePackage(websiteRoot = fileURLToPath(new URL('../', import.meta.url))) {
    const parent = path.resolve(websiteRoot, '..');
    const packageDirectory = path.join(parent, 'package');
    if (await hasPackageSources(packageDirectory)) {
        return realpath(packageDirectory);
    }

    const storybookDirectory = path.join(parent, 'storybook');
    if (!(await hasPackageSources(storybookDirectory))) {
        throw new Error(
            `The full miru repository (including src/stories) is required at ${storybookDirectory} or ${packageDirectory}. A storybook-static build alone is not sufficient.`,
        );
    }

    try {
        await lstat(packageDirectory);
        throw new Error(
            `${packageDirectory} already exists but is not a complete miru checkout. Move it aside before deployment; it will not be overwritten.`,
        );
    } catch (error) {
        if (error.code !== 'ENOENT') {
            throw error;
        }
    }

    await symlink(
        process.platform === 'win32' ? storybookDirectory : 'storybook',
        packageDirectory,
        process.platform === 'win32' ? 'junction' : 'dir',
    );
    console.log(`Miru source: ${packageDirectory} -> ${storybookDirectory}`);

    return realpath(packageDirectory);
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
    try {
        console.log(`Using miru checkout: ${await preparePackage()}`);
    } catch (error) {
        console.error(error.message);
        process.exitCode = 1;
    }
}
