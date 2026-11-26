import catalogue from './component-catalogue.json';
import documentationGroups from './documentation-groups.json';

export interface NavigationGroup {
    title: string;
    collapsed?: boolean;
    standalone?: boolean;
    items: { text: string; link: string }[];
}
export const documentationNavigation: NavigationGroup[] = [
    {
        title: 'Welcome',
        standalone: true,
        items: [{ text: 'Welcome', link: '/docs/welcome' }],
    },
    {
        title: 'Getting Started',
        items: [
            { text: 'Installation', link: '/docs/guide/installation' },
            { text: 'Theming', link: '/docs/guide/theming' },
            { text: 'Adapters', link: '/docs/guide/adapters' },
        ],
    },
    {
        title: 'DataTable',
        items: [
            { text: 'Introduction', link: '/docs/data-table/introduction' },
            { text: 'List contract', link: '/docs/data-table/list-contract' },
            { text: 'Backend connection', link: '/docs/data-table/backend' },
            { text: 'Response adapters', link: '/docs/data-table/adapters' },
            { text: 'Column definitions', link: '/docs/data-table/columns' },
            { text: 'Row operations', link: '/docs/data-table/actions' },
        ],
    },
    {
        title: 'Forms',
        items: [
            { text: 'Introduction', link: '/docs/forms/introduction' },
            { text: 'Form validation', link: '/docs/forms/validation' },
            { text: 'Field composition', link: '/docs/forms/fields' },
            { text: 'Form generator', link: '/docs/forms/generator' },
            { text: 'Form layout', link: '/docs/forms/layouts' },
            { text: 'Submission adapters', link: '/docs/forms/adapters' },
        ],
    },
    ...documentationGroups,
];
export const componentNavigation: NavigationGroup[] = [
    ...[...new Set(catalogue.map((item) => item.category))].map((title) => ({
        title,
        items: catalogue
            .filter((item) => item.category === title && item.primary)
            .map((item) => ({ text: item.title, link: item.link })),
    })),
];
