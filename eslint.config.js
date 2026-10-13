import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: ["node_modules/**", "Critical-Thinking-Project/**"],
  },
  js.configs.recommended,
  {
    files: ["site/**/*.js", "tests/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
];
