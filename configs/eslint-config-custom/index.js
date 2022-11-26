module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    plugins: ["@typescript-eslint", "prettier"],
    parserOptions: {
        sourceType: "module",
        ecmaVersion: 2020,
    },
    rules: {
        "prettier/prettier": "error",
        "@typescript-eslint/no-non-null-assertion": "off",
    },
};