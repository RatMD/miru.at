/**
 * Check formatting and source-block order for generated examples.
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import { parse } from '@vue/compiler-sfc';
import { formattedExamples } from '../.vitepress/theme/playground/formatted-examples.ts';
import { insertExample } from '../.vitepress/theme/playground/insert.ts';
import { createExampleFormatter } from '../scripts/format-examples.mjs';

test('generated sources keep the package block order and readable tag brackets', () => {
    for (const [name, source] of Object.entries(formattedExamples)) {
        const { descriptor, errors } = parse(source);
        assert.deepEqual(errors, [], name);
        assert.ok(
            descriptor.template.loc.start.offset < descriptor.scriptSetup.loc.start.offset,
            name,
        );
        for (const style of descriptor.styles) {
            assert.ok(descriptor.scriptSetup.loc.start.offset < style.loc.start.offset, name);
        }
        assert.doesNotMatch(source, /^\s*>/m, name);
    }
});
test('ESLint fixes normal script/setup order before Prettier formats template tags', async () => {
    const format = await createExampleFormatter();
    const source = await format(
        `<script setup lang="ts">const message = 'Hello';</script><script lang="ts">export default { name: 'FormattingExample' };</script><template><div><span>{{ message }}</span><span>Miru</span></div></template><style scoped>div { display: grid }</style>`,
    );
    assert.ok(source.indexOf('<template>') < source.indexOf('<script lang="ts">'));
    assert.ok(source.indexOf('<script lang="ts">') < source.indexOf('<script setup lang="ts">'));
    assert.doesNotMatch(source, /^\s*>/m);
});
test('inserting into a template-only example puts setup after the template', () => {
    const source = insertExample('<template><p>Keep this</p></template>', 'Input', 1);
    assert.ok(source.indexOf('</template>') < source.indexOf('<script setup'));
});
