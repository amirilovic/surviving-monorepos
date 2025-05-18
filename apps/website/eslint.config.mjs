// Website package ESLint flat config
import { FlatCompat } from "@eslint/eslintrc";

// Import the custom shared config function
import createESLintConfig from "@shop/eslint-config";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Use the shared config function with import.meta.url
  ...createESLintConfig(import.meta.url),
  ...compat.config({
    extends: ["next"],
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",
      "import/no-anonymous-default-export": "off",
    },
  }),
];
