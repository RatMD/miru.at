import { setFaviconHref } from './favicon-link';
import { faviconDataUrl, markColorsFromTokens } from './mark';

let initialized = false;
let cleanup: (() => void) | undefined;
export function initializeFavicon() {
    if (initialized || typeof window === 'undefined' || window.self !== window.top) return;
    initialized = true;
    let pending = false;
    let frame = 0;
    function refresh() {
        pending = false;
        frame = 0;
        const root = document.documentElement;
        const styles = getComputedStyle(root);
        const dark = root.classList.contains('dark') || root.dataset.theme === 'dark';
        const href = faviconDataUrl(
            markColorsFromTokens((name) => styles.getPropertyValue(name), dark),
        );
        setFaviconHref(document, href);
    }
    const schedule = () => {
        if (pending) return;
        pending = true;
        frame = requestAnimationFrame(refresh);
    };
    refresh();
    const rootObserver = new MutationObserver(schedule);
    rootObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class', 'data-theme', 'data-miru-color-revision'],
    });
    // VitePress can restore the static head link on route changes. Reapply the
    // selected colors then too; comparing href prevents an observer loop.
    const headObserver = new MutationObserver(schedule);
    headObserver.observe(document.head, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['href'],
    });
    cleanup = () => {
        rootObserver.disconnect();
        headObserver.disconnect();
        if (frame) cancelAnimationFrame(frame);
        initialized = false;
    };
}
if (import.meta.hot) {
    import.meta.hot.accept();
    import.meta.hot.dispose((data) => {
        data.active = initialized;
        cleanup?.();
    });
    if (import.meta.hot.data.active) initializeFavicon();
}
