// 引入vue模版的eslint
import pluginVue from "eslint-plugin-vue"
import eslint from "@eslint/js"
// ts-eslint解析器，使 eslint 可以解析 ts 语法
import tseslint from "typescript-eslint"
// vue文件解析器
import vueParser from "vue-eslint-parser"
import { FlatCompat } from "@eslint/eslintrc"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
})

export default tseslint.config({
  // tseslint.config添加了extends扁平函数，直接用。否则是eslint9.0版本是没有extends的
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs["flat/essential"], // vue3推荐的eslint配置
    ...compat.extends("plugin:prettier/recommended"),
  ],
  languageOptions: {
    parser: vueParser, // 使用vue解析器，这个可以识别vue文件
    parserOptions: {
      parser: tseslint.parser, // 在vue文件上使用ts解析器
      sourceType: "module",
    },
  },
  rules: {
    "no-unused-vars": 2,
    "vue/component-tags-order": [
      "error",
      {
        order: ["template", "script", "style"],
      },
    ],
    "lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
    "prettier/prettier": 0,
  },
})
