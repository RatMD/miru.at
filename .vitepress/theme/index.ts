import type { Theme } from 'vitepress';
import { defineClientComponent } from 'vitepress';
import '@rat.md/miru/style.css';
import './style.css';
import { initializeFavicon } from './branding/favicon';
import { initializeColors } from './colors/store';
import Layout from './Layout.vue';

export default {
    Layout,
    async enhanceApp({ app }) {
        // The iframe mounts its own miru. application. Documentation widgets are
        // unnecessary here and otherwise delay its readiness during a cold start.
        if (!import.meta.env.SSR && window.location.pathname.endsWith('/playground/preview')) {
            initializeColors();
            return;
        }
        const { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } =
            await import('@rat.md/miru');
        for (const [name, component] of Object.entries({
            Table,
            TableHeader,
            TableBody,
            TableRow,
            TableHead,
            TableCell,
        })) {
            app.component(`MiruDoc${name}`, component);
        }
        app.component('ComponentMeta', (await import('./components/ComponentMeta.vue')).default);
        app.component('ComponentApi', (await import('./components/ComponentApi.vue')).default);
        app.component(
            'DataTableGuideExample',
            defineClientComponent(() => import('./components/DataTableGuideExample.vue')),
        );
        app.component('ReadonlyCode', (await import('./components/ReadonlyCode.vue')).default);
        app.component(
            'ThemeTokenReference',
            defineClientComponent(() => import('./components/ThemeTokenReference.vue')),
        );
        app.component(
            'ComponentDemo',
            defineClientComponent(() => import('./components/ComponentDemo.vue')),
        );
        app.component(
            'ComponentCatalogue',
            (await import('./components/ComponentCatalogue.vue')).default,
        );
        app.component(
            'ComponentExample',
            defineClientComponent(() => import('./components/ComponentExample.vue')),
        );
        if (!import.meta.env.SSR) {
            initializeColors();
            initializeFavicon();
            const { createMiru } = await import('@rat.md/miru/miru');
            app.use(createMiru({ locale: 'en', toast: false }));
        }
    },
} satisfies Theme;
