import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import Bookshelf from './Bookshelf.vue'
import ReadWithAI from './ReadWithAI.vue'
import type { Theme } from 'vitepress'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('Bookshelf', Bookshelf)
    app.component('ReadWithAI', ReadWithAI)
  },
} satisfies Theme
