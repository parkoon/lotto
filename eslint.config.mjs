/* eslint-disable import/no-anonymous-default-export */
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

import pluginPrettier from 'eslint-plugin-prettier'
import pluginImport from 'eslint-plugin-import'
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

export default [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    plugins: {
      prettier: pluginPrettier,
      import: pluginImport,
      'simple-import-sort': pluginSimpleImportSort,
    },
    rules: {
      // Prettier
      'prettier/prettier': 'warn',

      // import 정렬
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',

      // import 관련 권장 룰
      'import/first': 'warn',
      'import/newline-after-import': 'warn',
      'import/no-duplicates': 'warn',
      '@next/next/no-img-element': 'off',
    },
  },
]
