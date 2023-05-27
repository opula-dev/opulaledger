// eslint-disable-next-line no-undef
module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["eslint:recommended", "plugin:react/recommended", "plugin:@typescript-eslint/recommended"],
    overrides: [],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["react", "@typescript-eslint"],
    rules: {
        "linebreak-style": ["warn", "windows"],
        quotes: ["warn", "double"],
        semi: ["warn", "always"],
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/no-empty-function": "off",
    },
};