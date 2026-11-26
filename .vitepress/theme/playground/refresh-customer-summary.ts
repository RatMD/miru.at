/**
 * Update the old customer summary/avatar while retaining unrelated draft edits.
 * @param draft
 * @param current
 * @returns
 */
export function refreshCustomerSummary(draft: string, current: string): string {
    draft = refreshCustomerAvatar(draft, current);
    const oldSummary = /<Table\b[^>]*\bclass=["']customer-summary["'][^>]*>[\s\S]*?<\/Table>/;
    if (!oldSummary.test(draft)) {
        return draft;
    }

    const cards = current.match(
        /<section\b[^>]*\bclass=["']customer-summary["'][^>]*>[\s\S]*?<\/section>/,
    )?.[0];
    const layout = current.match(/\.customer-summary\s*\{[^}]*\}/)?.[0];
    if (!cards || !layout) {
        return draft;
    }

    let next = draft.replace(oldSummary, () => cards);
    const components = ['Card', 'CardHeader', 'CardDescription', 'CardTitle'];
    const libraryImport = /import\s*\{([^}]+)\}\s*from\s*['"]@rat\.md\/miru['"];?/;
    if (libraryImport.test(next)) {
        next = next.replace(libraryImport, (_match, existing: string) => {
            const names = new Set(
                existing
                    .split(',')
                    .map((name) => name.trim())
                    .filter(Boolean),
            );
            for (const component of components) {
                names.add(component);
            }

            return `import { ${[...names].join(', ')} } from '@rat.md/miru';`;
        });
    } else {
        // Only migrate known single-file examples with an inline setup block.
        if (!/<script\s+setup\b[^>]*>/.test(next)) {
            return draft;
        }
        next = next.replace(
            /(<script\s+setup\b[^>]*>)/,
            `$1\nimport { ${components.join(', ')} } from '@rat.md/miru';`,
        );
    }

    next = next.replace(/\.customer-summary\s*\{[^}]*\}/, () => layout);
    // A separate scoped block also handles drafts without the old layout CSS.
    next += `\n<style scoped>\n${layout}\n@media (max-width: 650px) { .customer-summary { grid-template-columns: 1fr; } }\n</style>\n`;

    return next;
}

/**
 * Refresh the customer avatar without replacing unrelated draft content.
 * @param draft
 * @param current
 * @returns
 */
function refreshCustomerAvatar(draft: string, current: string): string {
    const oldAvatar =
        /<span\s+class=["']customer-avatar["']\s+aria-hidden=["']true["']\s*>\s*\{\{\s*initials\s*\}\}\s*<\/span>/;
    if (!oldAvatar.test(draft)) {
        return draft;
    }
    const avatar = current.match(
        /<Avatar\b[^>]*\bclass=["']customer-avatar["'][^>]*>[\s\S]*?<\/Avatar>/,
    )?.[0];
    const colors = current.match(/\.customer-avatar\s*\{[^}]*\}/)?.[0];
    const libraryImport = /import\s*\{([^}]+)\}\s*from\s*['"]@rat\.md\/miru['"];?/;
    if (!avatar || !colors || !libraryImport.test(draft)) {
        return draft;
    }

    return draft
        .replace(oldAvatar, () => avatar)
        .replace(libraryImport, (_match, existing: string) => {
            const names = new Set(
                existing
                    .split(',')
                    .map((name) => name.trim())
                    .filter(Boolean),
            );
            names.add('Avatar');
            names.add('AvatarFallback');

            return `import { ${[...names].join(', ')} } from '@rat.md/miru';`;
        })
        .replace(/\.customer-avatar\s*\{[^}]*\}/g, () => colors);
}
