import customerProfileSource from './CustomerProfile.vue?raw';
import starterSource from './Starter.vue?raw';

export interface ExampleFile {
    name: string;
    source: string;
}

export interface SiteExample {
    id: string;
    title: string;
    category: string;
    description: string;
    /** Self-contained Vue SFC, rendered by the shared preview runtime. */
    preview: string;
    files: ExampleFile[];
    previewCss?: string;
    initialView?: 'preview' | 'split' | 'code';
}

// Register upcoming examples here. Each source is shared by preview and copy.
export const siteExamples: SiteExample[] = [
    {
        id: 'customer-profile',
        title: 'Customer profile',
        category: 'Forms & layouts',
        description:
            'A complete customer workspace. Generated fields, personal preferences, calendar inputs and repeatable addresses — brought together in one responsive form layout.',
        preview: customerProfileSource,
        files: [{ name: 'CustomerProfile.vue', source: customerProfileSource }],
        previewCss: '.preview-runtime { padding: 24px; } .preview-mount { max-width: none; }',
        initialView: 'preview',
    },
    {
        id: 'starter',
        title: 'Welcome canvas',
        category: 'Starter',
        description:
            'A little space for what’s next. Explore the canvas, try a screen size and take the code with you. More examples are on their way.',
        preview: starterSource,
        files: [{ name: 'WelcomeCanvas.vue', source: starterSource }],
    },
];
