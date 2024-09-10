module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "prettier"],
  rules: {
    "@typescript-eslint/ban-types": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "prettier/prettier": [
      "warn",
      {
        arrowParens: "avoid",
        bracketSameLine: false,
        bracketSpacing: true,
        insertPragma: false,
        proseWrap: "preserve",
        quoteProps: "as-needed",
        requirePragma: false,
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        singleQuote: true,
        jsxSingleQuote: false,
        semi: true,
        trailingComma: "none",
        singleQuote: true,
        endOfLine: "crlf",
        // eslint-disable-next-line
      },
    ],
  },
};