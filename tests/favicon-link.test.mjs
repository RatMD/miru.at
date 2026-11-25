import assert from 'node:assert/strict';
import test from 'node:test';
import { setFaviconHref } from '../.vitepress/theme/branding/favicon-link.ts';

function headFixture() {
    const nodes = [];
    let mutations = 0;
    const document = {
        head: {
            appendChild(node) {
                const index = nodes.indexOf(node);
                if (index >= 0) nodes.splice(index, 1);
                nodes.push(node);
                mutations++;
            },
        },
        querySelectorAll(selector) {
            return nodes.filter(
                (node) =>
                    node.rel === 'icon' &&
                    (!selector.includes('[type=') || node.type === 'image/svg+xml'),
            );
        },
        createElement() {
            let href = '';
            return {
                id: '',
                rel: '',
                type: '',
                sizes: new Set(),
                getAttribute: () => href,
                setAttribute(name, value) {
                    if (name === 'href') href = value;
                    mutations++;
                },
                remove() {
                    nodes.splice(nodes.indexOf(this), 1);
                    mutations++;
                },
            };
        },
    };
    function add(href, type = 'image/svg+xml') {
        const node = document.createElement();
        Object.assign(node, { id: 'miru-favicon', rel: 'icon', type });
        node.setAttribute('href', href);
        document.head.appendChild(node);
        return node;
    }
    return { document, nodes, add, mutations: () => mutations };
}
test('startup keeps the latest head icon and does not alternate duplicate IDs', () => {
    const head = headFixture();
    head.add('data:image/svg+xml,early');
    const fallback = head.add('/favicon.svg');
    setFaviconHref(head.document, 'data:image/svg+xml,current');
    assert.deepEqual(head.nodes, [fallback]);
    assert.equal(fallback.getAttribute('href'), 'data:image/svg+xml,current');
    const settled = head.mutations();
    setFaviconHref(head.document, 'data:image/svg+xml,current');
    assert.equal(head.mutations(), settled, 'a settled icon must not cause a head observer loop');
});
test('route head replacement restores live colors while preserving other image formats', () => {
    const head = headFixture();
    head.add('data:image/svg+xml,current');
    const png = head.add('/favicon.png', 'image/png');
    png.id = '';
    const replacement = head.add('/favicon.svg');
    setFaviconHref(head.document, 'data:image/svg+xml,selected-color');
    assert.deepEqual(head.nodes, [png, replacement]);
    assert.equal(replacement.getAttribute('href'), 'data:image/svg+xml,selected-color');
});
