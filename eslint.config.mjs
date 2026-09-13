import js from '@eslint/js'
import ts from 'typescript-eslint'
import vue from 'eslint-plugin-vue'

export default ts.config(
  { ignores: ['docs/.vitepress/dist/**', 'docs/.vitepress/cache/**', 'docs/.vitepress/.temp/**', 'docs/.vitepress/sidebar-books.ts'] },
  js.configs.recommended,
  ...ts.configs.recommended,
  ...vue.configs['flat/essential'],
  { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: ts.parser, extraFileExtensions: ['.vue'] } }, rules: { 'no-undef': 'off' } },
  // Existing manuscript UI uses intentional full-width spacing; the assembler
  // uses NUL-delimited placeholders to protect inline code during formatting.
  { files: ['docs/.vitepress/theme/Bookshelf.vue'], rules: { 'no-irregular-whitespace': 'off' } },
  { files: ['scripts/assemble.mjs'], rules: { 'no-control-regex': 'off' } },
  {
    languageOptions: {
      globals: Object.fromEntries(['window', 'document', 'navigator', 'localStorage', 'fetch', 'AbortController', 'setTimeout', 'clearTimeout', 'console', 'process', 'requestAnimationFrame', 'cancelAnimationFrame', 'IntersectionObserver', 'ResizeObserver'].map(name => [name, 'readonly'])),
    },
    rules: { 'vue/multi-word-component-names': 'off', '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }] },
  },
)
