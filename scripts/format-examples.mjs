import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const packageRoot = fileURLToPath(new URL('../../package/', import.meta.url));
const require = createRequire(path.join(packageRoot, 'package.json'));
const { ESLint } = require('eslint');
const prettier = require('prettier');

export async function createExampleFormatter() {
    const filePath = path.join(packageRoot, 'src/stories/DocumentationExample.vue');
    const config = await prettier.resolveConfig(filePath);
    const eslint = new ESLint({
        cwd: packageRoot,
        overrideConfigFile: path.join(packageRoot, 'eslint.config.ts'),
        fix: true,
    });
    return async (code) => {
        // ESLint owns block/import order. Prettier owns whitespace. Documentation
        // treats component tags as blocks so brackets never hug the following tag.
        const [result] = await eslint.lintText(code, { filePath });
        if (result.errorCount)
            throw new Error(
                result.messages
                    .map((message) => `${message.ruleId}: ${message.message}`)
                    .join('\n'),
            );
        return prettier.format(result.output || code, {
            ...config,
            parser: 'vue',
            htmlWhitespaceSensitivity: 'ignore',
            bracketSameLine: true,
        });
    };
}
