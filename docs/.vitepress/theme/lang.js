// 全站界面语言（书架 + 阅读页共用一份状态）。
// 书稿本身是中文；这个开关切换的是界面文案（导航、目录标签、按钮）。
// 切换方式：给 <html> 加 .lang-en，CSS 里用 .i18n-zh / .i18n-en 两个 span 互斥显示，
// 这样连侧边栏、导航这些由 VitePress 用 v-html 渲染的地方也能一起切。
import { ref } from 'vue'

export const lang = ref('zh')

function apply() {
  document.documentElement.classList.toggle('lang-en', lang.value === 'en')
}

export function initLang() {
  const saved = localStorage.getItem('books-lang')
  if (saved === 'en' || saved === 'zh') lang.value = saved
  apply()
}

export function toggleLang() {
  lang.value = lang.value === 'zh' ? 'en' : 'zh'
  localStorage.setItem('books-lang', lang.value)
  apply()
}
