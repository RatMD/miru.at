import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import prettier from 'eslint-config-prettier/flat';
import importPlugin from 'eslint-plugin-import-x';
import vue from 'eslint-plugin-vue';

export default defineConfigWithVueTs(
    {
        name: 'miru-website/generated-files',
        ignores: [
            '**/node_modules/**',
            '.vitepress/cache/**',
            '.vitepress/dist/**',
            '.vitepress/theme/*-index.json',
            '.vitepress/theme/*catalogue.json',
            '.vitepress/theme/component-api.json',
            '.vitepress/theme/documentation-groups.json',
            '.vitepress/theme/colors/miru-defaults.ts',
            '.vitepress/theme/playground/formatted-examples.ts',
        ],
    },
    vue.configs['flat/essential'],
    vueTsConfigs.recommended,
    {
        name: 'miru-website/conventions',
        files: ['.vitepress/theme/**/*.{js,mjs,ts,mts,vue}', 'scripts/**/*.mjs', 'tests/**/*.mjs'],
        plugins: { import: importPlugin },
        languageOptions: {
            parserOptions: { vueFeatures: { filter: false } },
        },
        rules: {
            'vue/multi-word-component-names': 'off',
            'vue/block-order': [
                'error',
                { order: ['template', 'script:not([setup])', 'script[setup]', 'style'] },
            ],
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/consistent-type-imports': [
                'error',
                { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
            ],
            'import/order': [
                'error',
                {
                    groups: [
                        'type',
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                    ],
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],
            'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
        },
    },
    prettier,
);
