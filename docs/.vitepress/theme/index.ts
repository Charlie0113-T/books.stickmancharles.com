import DefaultTheme from 'vitepress/theme'
import Bookshelf from './Bookshelf.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Bookshelf', Bookshelf)
  },
}
