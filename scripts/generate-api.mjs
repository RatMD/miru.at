/**
 * Extract public component contracts for the VitePress reference pages.
 *
 * Reads library exports and Vue metadata, combines declared props, events and slots with shared API copy, and writes component-api.json.
 *
 * Run through npm run docs:sync before development or production builds.
 */

import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
    accordionApiCopy,
    accordionCommonProps,
} from '../../package/src/stories/accordion-documentation.ts';
import { alertApiCopy } from '../../package/src/stories/alert-documentation.ts';
import { anchorApiCopy } from '../../package/src/stories/anchor-documentation.ts';
import { attachmentApiCopy } from '../../package/src/stories/attachment-documentation.ts';
import { avatarApiCopy } from '../../package/src/stories/avatar-documentation.ts';
import { badgeApiCopy } from '../../package/src/stories/badge-documentation.ts';
import { breadcrumbApiCopy } from '../../package/src/stories/breadcrumb-documentation.ts';
import { buttonApiCopy } from '../../package/src/stories/button-documentation.ts';
import { cardApiCopy } from '../../package/src/stories/card-documentation.ts';
import { carouselApiCopy } from '../../package/src/stories/carousel-documentation.ts';
import { codeApiCopy } from '../../package/src/stories/code-documentation.ts';
import { extensionApiCopy } from '../../package/src/stories/extensions-documentation.ts';
import { formComponentApiCopy } from '../../package/src/stories/form-components-documentation.ts';
import {
    formFieldApiCopy,
    formFieldClassComponents,
} from '../../package/src/stories/form-fields-api-copy.ts';
import { indicatorApiCopy } from '../../package/src/stories/indicator-documentation.ts';
import { itemApiCopy } from '../../package/src/stories/item-documentation.ts';
import { kbdApiCopy } from '../../package/src/stories/kbd-documentation.ts';
import { layoutApiCopy } from '../../package/src/stories/layout-documentation.ts';
import { markerApiCopy } from '../../package/src/stories/marker-documentation.ts';
import {
    overlayApiCopy,
    overlayClassComponents,
} from '../../package/src/stories/overlay-documentation.ts';
import { paginationApiCopy } from '../../package/src/stories/pagination-documentation.ts';
import { progressApiCopy } from '../../package/src/stories/progress-documentation.ts';
import { separatorApiCopy } from '../../package/src/stories/separator-documentation.ts';
import { skeletonApiCopy } from '../../package/src/stories/skeleton-documentation.ts';
import { spinnerApiCopy } from '../../package/src/stories/spinner-documentation.ts';
import { stepperApiCopy } from '../../package/src/stories/stepper-documentation.ts';
import { tableApiCopy } from '../../package/src/stories/table-documentation.ts';
import { tabsApiCopy } from '../../package/src/stories/tabs-documentation.ts';
import {
    utilityApiCopy,
    utilityClassComponents,
} from '../../package/src/stories/utilities-documentation.ts';

const root = fileURLToPath(new URL('..', import.meta.url));
const packageRoot = path.resolve(root, '../package');
const require = createRequire(path.join(packageRoot, 'package.json'));
const ts = require('typescript');
const { createChecker } = require('vue-component-meta');

/**
 * Extract finite string choices from a component property type.
 * @param prop
 * @returns
 */
function stringOptions(prop) {
    const type = prop.getTypeObject();
    const members = (type.isUnion() ? type.types : [type]).filter(
        (type) => !(type.flags & (ts.TypeFlags.Undefined | ts.TypeFlags.Null)),
    );

    return members.length && members.every((type) => type.isStringLiteral())
        ? members.map((type) => type.value)
        : [];
}

/**
 * Read exported Vue component names from a module.
 * @param source
 * @returns
 */
function vueExports(source) {
    const file = ts.createSourceFile('index.ts', source, ts.ScriptTarget.Latest, true);

    return file.statements
        .filter(
            (statement) =>
                ts.isExportDeclaration(statement) &&
                statement.moduleSpecifier &&
                ts.isStringLiteral(statement.moduleSpecifier) &&
                statement.moduleSpecifier.text.endsWith('.vue') &&
                statement.exportClause &&
                ts.isNamedExports(statement.exportClause),
        )
        .flatMap((statement) =>
            statement.exportClause.elements
                .filter((element) => element.propertyName?.text === 'default')
                .map((element) => [element.name.text, statement.moduleSpecifier.text]),
        );
}

const checker = createChecker(path.join(packageRoot, 'tsconfig.build.json'), {
    schema: false,
});
const source = await readFile(path.join(packageRoot, 'src/index.ts'), 'utf8');
const api = {};
let count = 0;
const entry = ts.createSourceFile('index.ts', source, ts.ScriptTarget.Latest, true);
const componentGroups = entry.statements
    .filter(
        (statement) =>
            ts.isExportDeclaration(statement) &&
            !statement.isTypeOnly &&
            statement.moduleSpecifier &&
            ts.isStringLiteral(statement.moduleSpecifier) &&
            statement.moduleSpecifier.text.startsWith('./components/'),
    )
    .map((statement) => statement.moduleSpecifier.text.slice('./components/'.length));
for (const group of new Set(componentGroups)) {
    const barrel = await readFile(
        path.join(packageRoot, 'src/components', group, 'index.ts'),
        'utf8',
    );
    const entries = vueExports(barrel);
    api[group] = [];
    for (const [name, relative] of entries) {
        const file = path.resolve(packageRoot, 'src/components', group, relative);
        const meta = checker.getComponentMeta(file);
        api[group].push({
            name,
            exposed: meta.exposed.map((item) => ({
                name: item.name,
                type: item.type,
                description: item.description,
            })),
            props: meta.props
                .filter(
                    (prop) =>
                        !prop.global ||
                        (prop.name === 'class' && overlayClassComponents.includes(name)) ||
                        (prop.name === 'style' && ['Toast', 'Toaster'].includes(name)) ||
                        (prop.name === 'class' && formFieldClassComponents.includes(name)) ||
                        (prop.name === 'class' && utilityClassComponents.includes(name)) ||
                        (prop.name === 'class' &&
                            ['FilterBar', 'FilterBadge', 'Indicator'].includes(name)) ||
                        (prop.name === 'style' && name === 'Editor') ||
                        (['table', 'field', 'form', 'input-group', 'label'].includes(group) &&
                            prop.name === 'class' &&
                            !!(
                                tableApiCopy[name]?.props.class ??
                                formComponentApiCopy[name]?.props.class ??
                                layoutApiCopy[name]?.props?.class
                            )) ||
                        ([
                            'accordion',
                            'alert',
                            'anchor',
                            'attachment',
                            'avatar',
                            'badge',
                            'badge-copy',
                            'breadcrumb',
                            'button',
                            'button-action',
                            'button-group',
                            'button-shadow',
                            'card',
                            'code',
                            'code-panel',
                            'item',
                            'marker',
                            'pagination',
                            'progress',
                            'skeleton',
                            'spinner',
                            'carousel',
                            'separator',
                            'kbd',
                        ].includes(group) &&
                            prop.name === 'class'),
                )
                .map((prop) => ({
                    name: prop.name,
                    type: prop.type,
                    options: stringOptions(prop),
                    required: prop.required,
                    default: prop.default,
                    description: prop.description,
                })),
            events: meta.events.map((event) => ({
                name: event.name,
                type: event.type,
                description: event.description,
            })),
            slots: meta.slots.map((slot) => ({
                name: slot.name,
                type: slot.type,
                description: slot.description,
            })),
        });
        count++;
    }
}
// Descriptions and effective defaults are authored once and shared with Storybook controls.
const documentationCopy = {
    ...layoutApiCopy,
    ...overlayApiCopy,
    ...accordionApiCopy,
    ...alertApiCopy,
    ...anchorApiCopy,
    ...attachmentApiCopy,
    ...avatarApiCopy,
    ...badgeApiCopy,
    ...breadcrumbApiCopy,
    ...buttonApiCopy,
    ...cardApiCopy,
    ...codeApiCopy,
    ...itemApiCopy,
    ...markerApiCopy,
    ...paginationApiCopy,
    ...progressApiCopy,
    ...skeletonApiCopy,
    ...spinnerApiCopy,
    ...carouselApiCopy,
    ...tableApiCopy,
    ...tabsApiCopy,
    ...formComponentApiCopy,
    ...stepperApiCopy,
    ...extensionApiCopy,
    ...utilityApiCopy,
    ...indicatorApiCopy,
    ...formFieldApiCopy,
    ...separatorApiCopy,
    ...kbdApiCopy,
};
for (const components of Object.values(api)) {
    for (const component of components) {
        const copy = documentationCopy[component.name];
        if (!copy) {
            continue;
        }
        if (
            component.name === 'DataTable' &&
            !component.slots.some((slot) => slot.name === 'cell-[columnId]')
        ) {
            component.slots.push({
                name: 'cell-[columnId]',
                type: '{ item: TData; cell: DataTableCell<TData>; disabled: boolean; loading: boolean; }',
                description: extensionApiCopy.DataTable.slots['cell-[columnId]'],
            });
        }
        if (component.name === 'ApexChart') {
            const series = component.props.find((prop) => prop.name === 'series');
            if (series) {
                series.type = 'ApexAxisChartSeries | ApexNonAxisChartSeries';
            }
        }
        if (component.name === 'Form') {
            for (const slot of [
                'field-[slot]',
                'section-[id]-before',
                'section-[id]-actions',
                'section-[id]-after',
            ]) {
                if (!component.slots.some((member) => member.name === slot)) {
                    component.slots.push({
                        name: slot,
                        type: '{ [key: string]: unknown }',
                        description: copy.slots[slot],
                    });
                }
            }
        }
        // Dynamic Vue slot names are not included in the extracted Tabs metadata.
        if (component.name === 'Tabs' && !component.slots.length) {
            component.slots.push({
                name: '[tab.value]',
                type: '{}',
                description: tabsApiCopy.Tabs.slots['[tab.value]'],
            });
        }
        for (const kind of ['props', 'events', 'slots', 'exposed']) {
            component[kind].sort((a, b) => a.name.localeCompare(b.name));
            for (const member of component[kind]) {
                member.description =
                    copy[kind]?.[member.name] ??
                    (kind === 'props' && accordionApiCopy[component.name]
                        ? accordionCommonProps[member.name]
                        : undefined) ??
                    member.description;
                if (kind === 'props') {
                    member.default ??= copy.defaults?.[member.name];
                }
            }
        }
    }
}
api.layouts = [];
const layoutBarrel = await readFile(path.join(packageRoot, 'src/layouts/index.ts'), 'utf8');
for (const [name, relative] of vueExports(layoutBarrel)) {
    const meta = checker.getComponentMeta(path.resolve(packageRoot, 'src/layouts', relative));
    api.layouts.push({
        name,
        exposed: meta.exposed.map((item) => ({
            name: item.name,
            type: item.type,
            description: item.description,
        })),
        props: meta.props
            .filter(
                (prop) =>
                    !prop.global || (prop.name === 'class' && !!layoutApiCopy[name]?.props?.class),
            )
            .map((prop) => ({
                name: prop.name,
                type: prop.type,
                options: stringOptions(prop),
                required: prop.required,
                default: prop.default,
                description: prop.description,
            })),
        events: meta.events.map((event) => ({
            name: event.name,
            type: event.type,
            description: event.description,
        })),
        slots: meta.slots.map((slot) => ({
            name: slot.name,
            type: slot.type,
            description: slot.description,
        })),
    });
    count++;
}
for (const component of api.layouts) {
    const copy = layoutApiCopy[component.name];
    if (!copy) {
        continue;
    }
    for (const kind of ['props', 'events', 'slots', 'exposed']) {
        component[kind].sort((a, b) => a.name.localeCompare(b.name));
        for (const member of component[kind]) {
            member.description = copy[kind]?.[member.name] ?? member.description;
        }
    }
}
await writeFile(
    path.join(root, '.vitepress/theme/component-api.json'),
    JSON.stringify(api, null, 2) + '\n',
);
console.log(`Miru API: extracted props, events and slots for ${count} public components.`);
