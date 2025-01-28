import { FlatCompat } from "@eslint/eslintrc"
import checkFile from "eslint-plugin-check-file"
import { dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    plugins: {
      "check-file": checkFile,
    },
    rules: {
      quotes: ["warn", "double"],
      "no-console": ["warn", { allow: ["error"] }],
      "no-unused-vars": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "prefer-arrow-callback": "error",
      "prefer-template": "error",
      "react/jsx-curly-brace-presence": [
        "warn",
        { props: "never", children: "ignore" },
      ],
      "check-file/filename-naming-convention": [
        "error",
        {
          "**/*.{ts,tsx}": "KEBAB_CASE",
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
      "check-file/folder-naming-convention": [
        "error",
        {
          "src/**/!(__tests__)": "KEBAB_CASE",
        },
      ],
    },
  },
]

export default eslintConfig
