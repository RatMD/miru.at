/**
 * Check favicon replacement and deduplication during navigation.
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import { setFaviconHref } from '../.vitepress/theme/branding/favicon-link.ts';

/**
 * Create a minimal document fixture for favicon-link behavior.
 * @returns
 */
function headFixture() {
    const nodes = [];
    let mutations = 0;
    const document = {
        head: {
            /**
             * Append a fixture node to the simulated document head.
             * @param node
             */
            appendChild(node) {
                const index = nodes.indexOf(node);
                if (index >= 0) {
                    nodes.splice(index, 1);
                }
                nodes.push(node);
                mutations++;
            },
        },

        /**
         * Select matching icon nodes from the document fixture.
         * @param selector
         * @returns
         */
        querySelectorAll(selector) {
            return nodes.filter(
                (node) =>
                    node.rel === 'icon' &&
                    (!selector.includes('[type=') || node.type === 'image/svg+xml'),
            );
        },

        /**
         * Create a minimal element fixture.
         * @returns
         */
        createElement() {
            let href = '';

            return {
                id: '',
                rel: '',
                type: '',
                sizes: new Set(),

                /**
                 * Read an attribute from the element fixture.
                 * @returns
                 */
                getAttribute: () => href,

                /**
                 * Update an attribute on the element fixture.
                 * @param name
                 * @param value
                 */
                setAttribute(name, value) {
                    if (name === 'href') {
                        href = value;
                    }
                    mutations++;
                },

                /**
                 * Remove the node from its fixture document.
                 */
                remove() {
                    nodes.splice(nodes.indexOf(this), 1);
                    mutations++;
                },
            };
        },
    };

    /**
     * Append a favicon fixture to the simulated document.
     * @param href
     * @param type
     * @returns
     */
    function add(href, type = 'image/svg+xml') {
        const node = document.createElement();
        Object.assign(node, { id: 'miru-favicon', rel: 'icon', type });
        node.setAttribute('href', href);
        document.head.appendChild(node);

        return node;
    }

    return {
        document,
        nodes,
        add,

        /**
         * Read the number of fixture head mutations.
         * @returns
         */
        mutations: () => mutations,
    };
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
