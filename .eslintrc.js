const fs = require("fs");
const packageJsonStr = fs.readFileSync(`${process.cwd()}/package.json`, { encoding: "utf8" });
const packageJson = JSON.parse(packageJsonStr);
/** @type {import("eslint").Linter.Config} */
const eslintConfig = {
    parser: "babel-eslint",
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: "module", // Allows for the use of imports
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    env: {
        browser: true,
        node: true,
        jest: true,
        es6: true,
    },
    extends: ["eslint:recommended", "plugin:react/recommended"],
    rules: {
        semi: ["error", "always", { omitLastInOneLineBlock: true }],
        quotes: ["error", "double", { avoidEscape: true, allowTemplateLiterals: true }],
        "quote-props": ["error", "as-needed"],
        "comma-spacing": [
            "error",
            {
                before: false,
                after: true,
            },
        ],
        "no-trailing-spaces": 2,
        "lines-between-class-members": 2,
        "react/prop-types": ["error", { skipUndeclared: true }],
        "no-case-declarations": 0,
        "no-useless-escape": 0,
        "react/display-name": "off",
        "no-mixed-spaces-and-tabs": 0,
    },
    settings: {
        react: {
            version: packageJson.dependencies.react, // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
    overrides: [
        {
            // enable the rule specifically for TypeScript files
            files: ["*.ts", "*.tsx"],
            parser: "@typescript-eslint/parser", // Specifies the ESLint parser
            parserOptions: {
                ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
                sourceType: "module", // Allows for the use of imports
                ecmaFeatures: {
                    jsx: true, // Allows for the parsing of JSX
                },
            },
            extends: [
                "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
                "plugin:@typescript-eslint/recommended", // Uses the recommended rules from @typescript-eslint/eslint-plugin
                "prettier/@typescript-eslint", // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
                "plugin:prettier/recommended", // [Must be last] Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
            ],
            rules: {
                "@typescript-eslint/no-explicit-any": 2,
                "@typescript-eslint/no-empty-interface": 0,
                "@typescript-eslint/explicit-function-return-type": 0,
                "@typescript-eslint/explicit-module-boundary-types": 0,
                "@typescript-eslint/no-var-requires": 2,
                "@typescript-eslint/no-empty-function": 2,
                "@typescript-eslint/no-unused-vars": 2,
                "@typescript-eslint/explicit-member-accessibility": [
                    "error",
                    {
                        accessibility: "explicit",
                        overrides: {
                            constructors: "no-public",
                        },
                    },
                ],
                "no-trailing-spaces": 2,
                "react/no-unescaped-entities": 0,
                "@typescript-eslint/ban-ts-ignore": "off",
            },
        },
    ],
};

module.exports = eslintConfig;

// "husky": {
//     "hooks": {
//       "pre-commit": "npm run hook:verify-file && lint-staged && npm run hook:verify-branch"
//     }
//   },
