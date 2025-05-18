// Design System package ESLint flat config
import createESLintConfig from "@shop/eslint-config";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Use the shared config function with import.meta.url
  ...createESLintConfig(import.meta.url),
];
