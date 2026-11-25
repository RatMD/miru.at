/** Retry the iframe handshake until its runtime has installed the message listener. */
export function createPreviewHandshake(options: {
    probe: () => void;
    timeout: () => void;
    retryMs?: number;
    timeoutMs?: number;
}) {
    let retry: ReturnType<typeof setInterval> | undefined;
    let deadline: ReturnType<typeof setTimeout> | undefined;

    function stop() {
        clearInterval(retry);
        clearTimeout(deadline);
        retry = undefined;
        deadline = undefined;
    }

    function request() {
        // Run can also request readiness again after a previous timeout.
        if (retry === undefined) {
            retry = setInterval(options.probe, options.retryMs ?? 500);
            deadline = setTimeout(() => {
                stop();
                options.timeout();
            }, options.timeoutMs ?? 30000);
        }
        options.probe();
    }

    return { request, acknowledge: stop, dispose: stop };
}
