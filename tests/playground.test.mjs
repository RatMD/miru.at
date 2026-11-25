import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import * as Vue from 'vue';
import { compileExample } from '../.vitepress/theme/playground/compiler.ts';
import {
    examples,
    exampleSource,
    workspaceSource,
} from '../.vitepress/theme/playground/examples.ts';
import { insertExample } from '../.vitepress/theme/playground/insert.ts';
import { refreshCustomerSummary } from '../.vitepress/theme/playground/refresh-customer-summary.ts';

const resolve = (name) =>
    name === 'vue'
        ? Vue
        : new Proxy(
              {},
              {
                  get: (_target, key) => (key === '__esModule' ? true : { name: String(key) }),
              },
          );
test('the workspace and every curated example compile as Vue SFCs', () => {
    for (const [name, code] of [
        ['Workspace', workspaceSource],
        ...Object.keys(examples).map((name) => [name, exampleSource(name)]),
    ]) {
        const result = compileExample(code, resolve);
        assert.ok(result.component, name);
        assert.equal(typeof result.component.setup, 'function', name);
    }
});
test('all playground starters compile with additional Theme.css styles', () => {
    for (const file of ['Starter.vue', 'CustomerProfile.vue', 'EmptyTemplate.vue']) {
        const source = readFileSync(
            new URL(`../.vitepress/theme/examples/${file}`, import.meta.url),
            'utf8',
        );
        const exported = source + '\n<style>\n:root { --preview-accent: #6757df; }\n</style>\n';
        const result = compileExample(exported, resolve);
        assert.ok(result.component, file);
        assert.match(result.styles, /--preview-accent/, file);
    }
});

test('old saved customer tables become cards without losing other draft edits', () => {
    const current = readFileSync(
        new URL('../.vitepress/theme/examples/CustomerProfile.vue', import.meta.url),
        'utf8',
    );
    const cards = /<section\b[^>]*class="customer-summary"[^>]*>[\s\S]*?<\/section>/;
    const oldTable =
        '<Table class="customer-summary"><TableBody><TableRow><TableCell>Old summary</TableCell></TableRow></TableBody></Table>';
    let draft = current
        .replace(cards, oldTable)
        .replace('North & Meadow Studio', 'My custom studio');
    for (const name of ['Card', 'CardHeader', 'CardDescription', 'CardTitle'])
        draft = draft.replace(`    ${name},\n`, '');
    const restored = refreshCustomerSummary(draft, current);
    assert.doesNotMatch(restored, /<Table class="customer-summary"/);
    assert.equal((restored.match(/<Card>/g) || []).length, 3);
    assert.match(restored, /My custom studio/);
    assert.ok(compileExample(restored, resolve).component);
    assert.equal(refreshCustomerSummary(restored, current), restored);
    assert.equal(
        refreshCustomerSummary('<template><p>My own example</p></template>', current),
        '<template><p>My own example</p></template>',
    );
});

test('saved customer avatars use the native component without discarding edits', () => {
    const current = readFileSync(
        new URL('../.vitepress/theme/examples/CustomerProfile.vue', import.meta.url),
        'utf8',
    );
    const avatar = /<Avatar\b[^>]*>[\s\S]*?<\/Avatar>/;
    const draft = current
        .replace(avatar, '<span class="customer-avatar" aria-hidden="true">{{ initials }}</span>')
        .replace('    Avatar,\n', '')
        .replace('    AvatarFallback,\n', '')
        .replace('North & Meadow Studio', 'My personal studio');
    const restored = refreshCustomerSummary(draft, current);
    assert.doesNotMatch(restored, /<span class="customer-avatar"/);
    assert.match(restored, /<AvatarFallback>\{\{ initials \}\}<\/AvatarFallback>/);
    assert.match(restored, /My personal studio/);
    assert.ok(compileExample(restored, resolve).component);
    assert.equal(refreshCustomerSummary(restored, current), restored);
});

test('insertions preserve user code, merge imports and create independent state', () => {
    let source = insertExample(workspaceSource, 'Switch', 1);
    source = insertExample(source, 'Switch', 2);
    assert.match(source, /const switchValue1 = ref\(true\)/);
    assert.match(source, /const switchValue2 = ref\(true\)/);
    assert.match(source, /v-model="switchValue1"/);
    assert.match(source, /v-model="switchValue2"/);
    assert.match(source, /id="inspiration-1"/);
    assert.match(source, /id="inspiration-2"/);
    assert.match(source, /const studioName = ref/);
    assert.equal((source.match(/from '@rat.md\/miru'/g) || []).length, 1);
    assert.ok(compileExample(source, resolve).component);
});
test('insertion preserves aliases while importing the canonical component name', () => {
    const source = `<script setup>import { Button as Action } from '@rat.md/miru'</script><template><Action>Keep me</Action></template>`;
    const result = insertExample(source, 'Button', 1);
    assert.match(result, /Button as Action, Button/);
    assert.ok(compileExample(result, resolve).component);
});
test('insertion also works with script setup after the template', () => {
    const source =
        '<template><div>Keep me</div></template>\n<script setup>const original = 42</script>';
    const result = insertExample(source, 'Input', 7);
    assert.match(result, /Keep me/);
    assert.match(result, /const original = 42/);
    assert.match(result, /const inputIdea7/);
    assert.ok(compileExample(result, resolve).component);
});
test('template-only and Options API files render and scoped CSS remains scoped', () => {
    const simple = compileExample(
        '<template><p>Hello</p></template><style scoped>p { color: red }</style>',
        resolve,
    );
    assert.equal(typeof simple.component.render, 'function');
    assert.match(simple.styles, /data-v-miru-playground/);
    const options = compileExample(
        '<script>export default { data: () => ({ name: "Miru" }) }</script><template>{{ name }}</template>',
        resolve,
    );
    assert.equal(typeof options.component.render, 'function');
});
test('invalid code fails without erasing the draft', () => {
    const invalid = '<template><Button></template>';
    assert.throws(() => compileExample(invalid, resolve));
    assert.throws(() => insertExample(invalid, 'Button', 1), /kept/);
    assert.throws(
        () =>
            compileExample(
                '<template>Hello</template><style lang="scss">$x: red;</style>',
                resolve,
            ),
        /plain CSS/,
    );
});
test('all catalogue entries have unique routes and include the requested families and layouts', () => {
    const catalogue = JSON.parse(
        readFileSync(new URL('../.vitepress/theme/component-catalogue.json', import.meta.url)),
    );
    assert.equal(new Set(catalogue.map((item) => item.link)).size, catalogue.length);
    for (const name of [
        'AttachmentList',
        'InputPin',
        'RadioBox',
        'Editor',
        'Form',
        'FormSectionRenderer',
        'FormLayout',
        'Toast',
        'OverlayDetails',
    ])
        assert.ok(
            catalogue.some((item) => item.name === name && item.primary),
            name,
        );
    assert.ok(
        catalogue.find((item) => item.name === 'FormLayout').link.startsWith('/components/'),
    );
    const api = JSON.parse(
        readFileSync(new URL('../.vitepress/theme/component-api.json', import.meta.url)),
    );
    assert.equal(catalogue.length, Object.values(api).flat().length);
});
