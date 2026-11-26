/**
 * Check readiness retries, cancellation and preview connection deadlines.
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import { createPreviewHandshake } from '../.vitepress/theme/playground/preview-handshake.ts';

test('a missed startup message is retried until the iframe acknowledges readiness', (t) => {
    t.mock.timers.enable({ apis: ['setTimeout', 'setInterval'] });
    let probes = 0;
    let failures = 0;
    const connection = createPreviewHandshake({
        /**
         * Ask the preview frame to report its readiness.
         * @returns
         */
        probe: () => probes++,

        /**
         * Report an expired preview connection deadline.
         * @returns
         */
        timeout: () => failures++,
    });
    connection.request();
    assert.equal(probes, 1);
    t.mock.timers.tick(1000);
    assert.equal(probes, 3);
    connection.acknowledge();
    t.mock.timers.tick(60000);
    assert.equal(probes, 3);
    assert.equal(failures, 0);
});

test('startup has a finite deadline and Run can reconnect after a timeout', (t) => {
    t.mock.timers.enable({ apis: ['setTimeout', 'setInterval'] });
    let probes = 0;
    let failures = 0;
    const connection = createPreviewHandshake({
        /**
         * Ask the preview frame to report its readiness.
         * @returns
         */
        probe: () => probes++,

        /**
         * Report an expired preview connection deadline.
         * @returns
         */
        timeout: () => failures++,
    });
    connection.request();
    t.mock.timers.tick(29000);
    connection.request();
    t.mock.timers.tick(1000);
    assert.equal(failures, 1);
    const stoppedAt = probes;
    t.mock.timers.tick(10000);
    assert.equal(probes, stoppedAt);
    connection.request();
    assert.equal(probes, stoppedAt + 1);
    connection.acknowledge();
    t.mock.timers.tick(30000);
    assert.equal(failures, 1);
});

test('unmounting cancels readiness retries and timeout callbacks', (t) => {
    t.mock.timers.enable({ apis: ['setTimeout', 'setInterval'] });
    let probes = 0;
    const connection = createPreviewHandshake({
        /**
         * Ask the preview frame to report its readiness.
         * @returns
         */
        probe: () => probes++,

        /**
         * Report an expired preview connection deadline.
         * @returns
         */
        timeout: () => assert.fail('Unmounted frame timed out'),
    });
    connection.request();
    connection.dispose();
    t.mock.timers.tick(60000);
    assert.equal(probes, 1);
});
