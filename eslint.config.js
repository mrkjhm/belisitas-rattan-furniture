// import js from "@eslint/js";
// import globals from "globals";

// export default [
//   js.configs.recommended,
//   {
//     files: ["**/*.{js,mjs,cjs,ts,tsx}"],
//     languageOptions: {
//       globals: {
//         ...globals.browser,
//         ...globals.node
//       }
//     },
//     rules: {
//       "no-unused-vars": "off"
//     }
//   }
// ];
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";

export default [
  js.configs.recommended,

  // TypeScript (TS + TSX)
  ...tseslint.configs.recommended,

  // Next.js rules
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },

  // Your project files
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
];
