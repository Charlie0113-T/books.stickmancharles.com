import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import Bookshelf from './Bookshelf.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('Bookshelf', Bookshelf)
  },
}
