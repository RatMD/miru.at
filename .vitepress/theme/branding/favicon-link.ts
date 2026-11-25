/** Reconcile VitePress's fallback head node with the live icon, without duplicates. */
export function setFaviconHref(document: Document, href: string): void {
    const candidates = [
        ...document.querySelectorAll<HTMLLinkElement>('link[rel~="icon"][type="image/svg+xml"]'),
    ];
    let icon =
        candidates.filter((candidate) => candidate.id === 'miru-favicon').at(-1) ||
        candidates.at(-1);
    if (!icon) {
        icon = document.createElement('link');
        icon.rel = 'icon';
        document.head.appendChild(icon);
    }
    icon.id = 'miru-favicon';
    icon.type = 'image/svg+xml';
    icon.sizes.add('any');
    for (const candidate of candidates) if (candidate !== icon) candidate.remove();
    if (icon.getAttribute('href') !== href) icon.setAttribute('href', href);
    const icons = document.querySelectorAll('link[rel~="icon"]');
    if (icons[icons.length - 1] !== icon) document.head.appendChild(icon);
}
