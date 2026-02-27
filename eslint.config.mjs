import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    plugins: {
      prettier: (await import("eslint-plugin-prettier")).default,
      "jsx-a11y": (await import("eslint-plugin-jsx-a11y")).default,
    },
    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "react-hooks/exhaustive-deps": "warn",
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
              group: ["../*", "./../*"],
              message:
                "❌ Avoid relative imports across modules. Use absolute imports (@/...)",
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
      // ✅ ПЕРЕНЕСЕНО СЮДИ (всередину об'єкта rules)
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
