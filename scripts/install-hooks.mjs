/**
 * Install repository-local Husky hooks for development checkouts.
 *
 * Skips CI, production installs and checkouts that explicitly disable Husky.
 * Invoked by npm prepare; does not build the website or run its tests.
 */
import { existsSync } from 'node:fs';

if (
    !process.env.CI &&
    process.env.NODE_ENV !== 'production' &&
    process.env.HUSKY !== '0' &&
    existsSync(new URL('../.git', import.meta.url))
) {
    const { default: husky } = await import('husky');
    const message = husky();

    if (message) {
        throw new Error(message);
    }
}
