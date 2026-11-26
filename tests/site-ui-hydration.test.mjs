import assert from 'node:assert/strict';
import {
    mkdirSync,
    mkdtempSync,
    readFileSync,
    rmdirSync,
    unlinkSync,
    writeFileSync,
} from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { compileScript, parse } from '@vue/compiler-sfc';
import ts from 'typescript';
import { createRenderer, nextTick } from 'vue';

test('a warm UI-library cache never replaces the SSR fallback before a new instance mounts', async () => {
    const source = readFileSync(
        new URL('../.vitepress/theme/components/SiteUi.vue', import.meta.url),
        'utf8',
    );
    const { descriptor } = parse(source);
    const compiled = compileScript(descriptor, {
        id: 'site-ui-regression',
        inlineTemplate: true,
    }).content;
    // Keep the real component and Vue lifecycle; only replace the asynchronous library import.
    const isolated = compiled.replace(
        /import\(['"]@rat\.md\/miru['"]\)/g,
        'Promise.resolve(testLibrary)',
    );
    assert.notEqual(isolated, compiled);
    const mock =
        "import { h as renderTestButton } from 'vue'; const testLibrary = { Button: { render: () => renderTestButton('button') } };\n";
    const javascript = ts.transpileModule(mock + isolated, {
        compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
    }).outputText;
    const temporaryRoot = fileURLToPath(new URL('../.tmp/', import.meta.url));
    mkdirSync(temporaryRoot, { recursive: true });
    const directory = mkdtempSync(join(temporaryRoot, 'site-ui-hydration-'));
    const fixture = join(directory, 'component.mjs');
    writeFileSync(fixture, javascript);
    const created = [];
    const node = (type) => ({ type, children: [], parent: null });
    const remove = (child) => {
        if (child.parent) {
            child.parent.children.splice(child.parent.children.indexOf(child), 1);
        }
        child.parent = null;
    };
    const renderer = createRenderer({
        createElement(type) {
            created.push(type);

            return node(type);
        },
        createText: () => node('#text'),
        createComment: () => node('#comment'),
        insert(child, parent, anchor = null) {
            remove(child);
            const index = anchor ? parent.children.indexOf(anchor) : -1;
            parent.children.splice(index < 0 ? parent.children.length : index, 0, child);
            child.parent = parent;
        },
        remove,
        parentNode: (child) => child.parent,
        nextSibling: (child) => child.parent?.children[child.parent.children.indexOf(child) + 1],
        patchProp() {},
        setText() {},
        setElementText() {},
        setScopeId() {},
    });
    try {
        const { default: SiteUi } = await import(pathToFileURL(fixture).href);
        for (const phase of ['cold cache', 'warm cache']) {
            created.length = 0;
            const app = renderer.createApp(SiteUi, { name: 'Button', fallback: 'a' });
            app.mount(node('root'));
            assert.equal(created[0], 'a', `${phase}: first render matches the server fallback`);
            await nextTick();
            await nextTick();
            assert.ok(created.includes('button'), `${phase}: native UI activates after mount`);
            app.unmount();
        }
    } finally {
        unlinkSync(fixture);
        rmdirSync(directory);
    }
});
