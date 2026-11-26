import componentApi from '../component-api.json' with { type: 'json' };
import catalogue from '../component-catalogue.json' with { type: 'json' };
import { controlledExample } from '../playground/example-controls.ts';
import { examples } from '../playground/examples.ts';
import { exampleSource } from '../playground/source.ts';

export type GalleryEntry = (typeof catalogue)[number];
const colourNames = new Set([
    'default',
    'primary',
    'secondary',
    'accent',
    'info',
    'success',
    'warning',
    'danger',
    'danger-success',
]);
const wide = new Set([
    'Table',
    'DataTable',
    'Schedule',
    'CalendarBooking',
    'ApexChart',
    'CardChart',
    'Form',
    'FormLayout',
    'FormSectionRenderer',
    'Editor',
    'EditorJson',
    'EditorMarkdown',
    'EditorFrame',
    'Stepper',
    'Resizable',
    'AttachmentList',
    'UploadZone',
]);
const full = new Set(['AuthPage', 'DashboardPage']);
const api = Object.values(componentApi).flat();

/**
 * Resolve the semantic color controls supported by a gallery component.
 * @param name
 * @returns
 */
export function colourOptions(name: string) {
    // Indicator also accepts arbitrary CSS colors; offer its documented semantic palette.
    if (name === 'Indicator') {
        return {
            prop: 'color',
            values: [...colourNames].filter((value) => value !== 'danger-success'),
        };
    }
    const props = api.find((item) => item.name === name)?.props ?? [];
    for (const key of ['variant', 'tone', 'color', 'primaryVariant', 'gradientTone']) {
        const prop = props.find((item) => item.name === key);
        const values = prop?.options?.filter((value) => colourNames.has(value)) ?? [];
        if (values.length > 1) {
            return { prop: key, values };
        }
    }

    return undefined;
}

const roots = catalogue.filter(
    (entry) =>
        entry.primary ||
        !catalogue.some((candidate) => candidate.primary && candidate.module === entry.module),
);

export const galleryCards = roots.map((entry) => {
    const pieces = catalogue.filter((piece) => {
        if (piece.name === entry.name) {
            return true;
        }
        if (piece.primary || piece.module !== entry.module) {
            return false;
        }
        const family = roots.filter((candidate) => candidate.module === piece.module);
        const owner =
            family.find((candidate) =>
                new RegExp(`<${piece.name}(?:\\s|/|>)`).test(
                    examples[candidate.name]?.template ?? '',
                ),
            ) ?? family[0];

        return owner?.name === entry.name;
    });

    return {
        ...entry,
        pieces,
        colours: colourOptions(entry.name),
        size: full.has(entry.name)
            ? 'full'
            : wide.has(entry.name) || entry.layout
              ? 'wide'
              : 'regular',
    };
});
export type GalleryCard = (typeof galleryCards)[number];
export const galleryCategories = [...new Set(galleryCards.map((entry) => entry.category))];
export const galleryComponentCount = catalogue.length;

/**
 * Build an isolated gallery example using the selected color.
 * @param card
 * @param colour
 * @returns
 */
export function gallerySource(card: GalleryCard, colour?: string) {
    let source = exampleSource(card.name);
    // PageRoot is a context provider: show it with visible children rather than a placeholder.
    if (card.name === 'PageRoot') {
        source = source
            .replace('<Card>', '<PageRoot><Card>')
            .replace('</Card>', '</Card></PageRoot>')
            .replace('import { Card,', 'import { PageRoot, Card,')
            .replace(
                'The playground already mounts one PageRoot around your preview.',
                'Shared context for every little piece.',
            );
    }
    if (colour && card.colours) {
        source = controlledExample(source, card.name, {
            [card.colours.prop]: colour,
            ...(card.colours.prop === 'gradientTone' ? { appearance: 'gradient' } : {}),
        });
    }
    const namespace = `gallery-${card.name}-${colour ?? 'original'}-`;

    return source.replace(
        /\b(id|for|aria-controls|aria-labelledby|aria-describedby)="([\w-]+)"/g,
        (_match, attribute, value) => `${attribute}="${namespace}${value}"`,
    );
}
