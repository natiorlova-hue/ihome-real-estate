import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Engineering serves emotion: clean code only
      "no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "error", // Hard Rule

      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "next/link",
              message:
                "❌ Use routing from @/i18n/routing. next/link is allowed only inside routing wrappers.",
            },
          ],
          patterns: [
            {
              group: ["../*", "../../**"],
              message:
                "❌ Avoid relative imports across modules. Use absolute imports (@/...).",
            },
          ],
        },
      ],

      "jsx-a11y/anchor-is-valid": [
        "error",
        {
          components: ["Link"],
          specialLink: ["href"],
          aspects: ["noHref", "invalidHref", "preferButton"],
        },
      ],
      "no-restricted-syntax": [
        "warn",
        {
          selector:
            "JSXAttribute[name.name='className'] Literal[value=/\\bmd:hidden\\b/]",
          message:
            "⚠️ Avoid desktop-first patterns. Use mobile-first classes (hidden md:block).",
        },
      ],
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "public/**",
    ],
  },
];

export default eslintConfig;
