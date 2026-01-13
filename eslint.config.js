import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';

export default tseslint.config([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs['recommended-latest'],
            reactRefresh.configs.vite,
        ],
        plugins: {
            import: importPlugin,
            prettier,
        },
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        rules: {
            // одинарные кавычки
            quotes: ['error', 'single', { avoidEscape: true }],

            // порядок импортов
            'import/order': [
                'error',
                {
                    groups: [
                        'builtin', // node-модули
                        'external', // npm пакеты
                        'internal', // абсолютные импорты
                        ['parent', 'sibling', 'index'], // относительные
                        'object', // импорт через require
                        'type', // только типы TS
                    ],
                    pathGroups: [
                        {
                            pattern: 'react',
                            group: 'external',
                            position: 'before',
                        },
                    ],
                    pathGroupsExcludedImportTypes: ['react'],
                    'newlines-between': 'always',
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],
            'prettier/prettier': 'error',
            '@typescript-eslint/no-explicit-any': 'warn',
            'react-refresh/only-export-components': 'off',
        },
    },
]);
