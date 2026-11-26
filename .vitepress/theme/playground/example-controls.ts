import type { ElementNode, RootNode, TemplateChildNode } from '@vue/compiler-dom';
import { parse as parseTemplate, NodeTypes } from '@vue/compiler-dom';
import { parse as parseSfc } from '@vue/compiler-sfc';

type ApiProp = {
    name: string;
    type: string;
    default?: string;
    options?: string[];
};
export type ExampleControl = {
    name: string;
    kind: 'boolean' | 'select';
    options: string[];
    value: string | boolean;
};
// Avoid structural props (as/asChild, models, transport and data) that need a different composition.
const editable = new Set([
    'variant',
    'size',
    'shape',
    'appearance',
    'orientation',
    'type',
    'iconMode',
    'animation',
    'side',
    'align',
    'collapsible',
    'disabled',
    'readonly',
    'loading',
    'loadingPosition',
    'loop',
    'multiple',
    'clearable',
]);

/**
 * Convert a camel-case property name into kebab case.
 * @param name
 * @returns
 */
const kebab = (name: string) => name.replace(/[A-Z]/g, (letter) => '-' + letter.toLowerCase());

/**
 * Find the selected component in a Vue template.
 * @param source
 * @param name
 * @returns
 */
function target(source: string, name: string) {
    const { descriptor } = parseSfc(source);
    if (!descriptor.template) {
        return;
    }
    const template = descriptor.template;

    /**
     * Find the requested component in the template subtree.
     * @param node
     * @returns
     */
    function find(node: RootNode | TemplateChildNode): ElementNode | undefined {
        if (node.type === NodeTypes.ELEMENT && node.tag === name) {
            return node;
        }
        if (node.type === NodeTypes.ROOT || node.type === NodeTypes.ELEMENT) {
            for (const child of node.children) {
                {
                    const match = find(child);
                    if (match) {
                        return match;
                    }
                }
            }
        }
    }

    const node = find(parseTemplate(template.content));

    return node ? { node, offset: template.loc.start.offset } : undefined;
}

/**
 * Read the name of a static or bound component property.
 * @param prop
 * @returns
 */
function propName(prop: ElementNode['props'][number]) {
    if (prop.type === NodeTypes.ATTRIBUTE) {
        return prop.name;
    }
    if (
        prop.type === NodeTypes.DIRECTIVE &&
        prop.name === 'bind' &&
        prop.arg?.type === NodeTypes.SIMPLE_EXPRESSION
    ) {
        return prop.arg.content;
    }
}

/**
 * Resolve editable controls from the component example and API.
 * @param source
 * @param name
 * @param props
 * @returns
 */
export function exampleControls(source: string, name: string, props: ApiProp[]): ExampleControl[] {
    const element = target(source, name);
    if (!element) {
        return [];
    }

    return props
        .filter(
            (prop) =>
                editable.has(prop.name) && !(name === 'Accordion' && prop.name === 'orientation'),
        )
        .flatMap<ExampleControl>((prop) => {
            const attr = element.node.props.find(
                (attr) => propName(attr) === prop.name || propName(attr) === kebab(prop.name),
            );
            const literal =
                attr?.type === NodeTypes.ATTRIBUTE
                    ? (attr.value?.content ?? 'true')
                    : attr?.type === NodeTypes.DIRECTIVE &&
                        attr.exp?.type === NodeTypes.SIMPLE_EXPRESSION
                      ? attr.exp.content
                      : prop.default;
            if (
                /^(boolean|undefined|null|\s|\|)+$/.test(prop.type) &&
                prop.type.includes('boolean')
            ) {
                return [
                    {
                        name: prop.name,
                        kind: 'boolean' as const,
                        options: [],
                        value: literal === 'true',
                    },
                ];
            }
            // Only finite string unions are safe to expose as an automatic select.
            const options = prop.options?.length
                ? prop.options
                : [...prop.type.matchAll(/"([^"\n]+)"/g)].map((match) => match[1]);
            if (
                !options.length ||
                options.length > 16 ||
                (!prop.options?.length && prop.type.replace(/"[^"\n]+"|undefined|null|\||\s/g, ''))
            ) {
                return [];
            }
            const value = literal?.replace(/^['"]|['"]$/g, '');

            return [
                {
                    name: prop.name,
                    kind: 'select' as const,
                    options: ['__default', ...options],
                    value: value && options.includes(value) ? value : '__default',
                },
            ];
        })
        .slice(0, 6);
}

/**
 * Patch only explicit controls on the chosen component, preserving slots and setup code.
 * @param source
 * @param name
 * @param values
 * @returns
 */
export function controlledExample(
    source: string,
    name: string,
    values: Record<string, string | boolean>,
) {
    const element = target(source, name);
    if (!element || !Object.keys(values).length) {
        return source;
    }
    const { node, offset } = element;
    const edits = node.props
        .filter((attr) =>
            Object.keys(values).some(
                (name) => propName(attr) === name || propName(attr) === kebab(name),
            ),
        )
        .map((attr) => ({
            start: offset + attr.loc.start.offset,
            end: offset + attr.loc.end.offset,
            value: '',
        }));
    const attrs = Object.entries(values)
        .filter(([, value]) => value !== '__default')
        .map(([key, value]) =>
            typeof value === 'boolean'
                ? `:${kebab(key)}="${value}"`
                : `${kebab(key)}="${value.replace(/&/g, '&amp;').replace(/"/g, '&quot;')}"`,
        )
        .join(' ');
    const insertion = offset + node.loc.start.offset + 1 + node.tag.length;
    edits.push({
        start: insertion,
        end: insertion,
        value: attrs ? ' ' + attrs : '',
    });
    for (const edit of edits.sort((a, b) => b.start - a.start)) {
        source = source.slice(0, edit.start) + edit.value + source.slice(edit.end);
    }

    return source;
}
