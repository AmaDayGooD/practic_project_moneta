import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      js,
    },
    extends: [
      js.configs.recommended,
    ],
  },

  ...tseslint.configs.recommended,

  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: "detect", // Автоопределение версии React
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off", // 🔥 Отключаем правило, так как React 17+ не требует импорта
      "react/prop-types": "off", // можно отключить, если используешь TypeScript
    },
  },

  eslintConfigPrettier,
]);