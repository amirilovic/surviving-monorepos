// Custom shared ESLint flat config for the monorepo
import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

/**
 * Creates a shared ESLint configuration with the correct project path resolution
 * @param {string} importMetaUrl - The import.meta.url of the package using this config
 * @returns {import('eslint').Linter.Config[]} The ESLint configuration array
 */
export default function createESLintConfig(importMetaUrl) {
    // Convert import.meta.url to a directory path
    const filePath = fileURLToPath(importMetaUrl);
    const dirPath = dirname(filePath);

    return [
        // Apply JavaScript recommended rules
        js.configs.recommended,

        // Ignores - centralized from package configs
        {
            ignores: [
                '**/node_modules/**',
                '**/dist/**',
                '**/build/**',
                '**/.turbo/**',
                '**/coverage/**',
                '**/next/**',
                '**/.next/**',
            ],
        },

        // Node.js environment configuration
        {
            files: ['**/*.js', '**/*.ts'],
            languageOptions: {
                globals: {
                    ...globals.node,
                },
            },
        },

        // Browser and test environment configuration
        {
            files: ['**/*.{spec,test}.{js,ts,jsx,tsx}'],
            languageOptions: {
                globals: {
                    ...globals.jest,
                    ...globals.mocha,
                    vi: 'readonly',
                },
            },
        },

        // Browser environment for web files
        {
            files: ['**/*.{jsx,tsx}'],
            languageOptions: {
                globals: {
                    ...globals.browser,
                    React: 'readonly',
                },
            },
        },

        // TypeScript configuration
        {
            files: ['**/*.ts', '**/*.tsx'],
            languageOptions: {
                parser: tsparser,
                parserOptions: {
                    project: path.join(dirPath, 'tsconfig.lint.json'),
                    tsconfigRootDir: dirPath,
                },
            },
            plugins: {
                '@typescript-eslint': tseslint,
            },
            rules: {
                ...tseslint.configs.recommended.rules,
                '@typescript-eslint/no-non-null-assertion': 'off',
            },
        },

        // Prettier configuration
        {
            plugins: {
                prettier: prettier,
            },
            rules: {
                'prettier/prettier': 'error',
                ...prettierConfig.rules,
            },
        },

        // Import plugin configuration
        {
            plugins: {
                'import': importPlugin,
            }
        },
    ];
}