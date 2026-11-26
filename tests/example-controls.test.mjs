/**
 * Check safe example edits and supported playground controls.
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import { parse } from '@vue/compiler-sfc';
import {
    exampleControls,
    controlledExample,
} from '../.vitepress/theme/playground/example-controls.ts';
import { exampleSource } from '../.vitepress/theme/playground/examples.ts';

test('simple examples contain only their component composition, without unused demo CSS', () => {
    const source = exampleSource('Accordion');
    assert.doesNotMatch(source, /<style|class="stack"|demo-bars|demo-tile/);
    assert.match(source, /type="single" collapsible>/);
    assert.deepEqual(parse(source).errors, []);
});

test('controls resolve finite aliases and exclude structural props and arbitrary expressions', () => {
    const controls = exampleControls(exampleSource('Accordion'), 'Accordion', [
        {
            name: 'type',
            type: 'SingleOrMultipleType | undefined',
            options: ['single', 'multiple'],
        },
        { name: 'collapsible', type: 'boolean | undefined' },
        { name: 'asChild', type: 'boolean | undefined' },
        { name: 'variant', type: 'string | { value: "unsafe" }' },
    ]);
    assert.deepEqual(
        controls.map((control) => control.name),
        ['type', 'collapsible'],
    );
    assert.equal(controls[0].value, 'single');
    assert.equal(controls[1].value, true);
});

test('controls replace only the selected component attributes and preserve setup, slots and other buttons', () => {
    const source = `<template><Card><Button :disabled="busy" variant="primary">Save</Button><Button variant="outline">Cancel</Button></Card></template><script setup>const busy = false;</script>`;
    const updated = controlledExample(source, 'Button', {
        disabled: true,
        variant: 'secondary',
    });
    assert.match(updated, /:disabled="true"/);
    assert.doesNotMatch(updated, /:disabled="busy"|variant="primary"/);
    assert.match(updated, /<Button variant="outline">Cancel/);
    assert.match(updated, /const busy = false/);
    assert.deepEqual(parse(updated).errors, []);
    const reset = controlledExample(source, 'Button', { variant: '__default' });
    assert.doesNotMatch(reset, /variant="primary"/);
    assert.match(reset, /variant="outline"/);
});

test('Accordion orientation remains documented without suggesting a horizontal preview layout', () => {
    assert.deepEqual(
        exampleControls(exampleSource('Accordion'), 'Accordion', [
            {
                name: 'orientation',
                type: 'DataOrientation | undefined',
                options: ['vertical', 'horizontal'],
            },
        ]),
        [],
    );
    assert.equal(
        exampleControls('<template><Separator /></template>', 'Separator', [
            {
                name: 'orientation',
                type: 'DataOrientation | undefined',
                options: ['vertical', 'horizontal'],
            },
        ]).length,
        1,
    );
});
