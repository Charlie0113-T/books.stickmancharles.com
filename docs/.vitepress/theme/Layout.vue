<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { computed, onMounted } from 'vue'
import { lang, initLang, toggleLang } from './lang.js'

const { Layout } = DefaultTheme
const { frontmatter, page } = useData()

onMounted(initLang)

// 更新时间来自 git（config 里开了 lastUpdated），拿不到就不显示这一行。
const updated = computed(() => {
  const ts = page.value.lastUpdated
  if (!ts) return null
  const d = new Date(ts)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
})
</script>

<template>
  <Layout>
    <template #nav-bar-content-after>
      <button class="nav-lang" type="button" @click="toggleLang"
              :aria-label="lang === 'zh' ? 'Switch to English' : '切换到中文'">
        {{ lang === 'zh' ? 'EN' : '中文' }}
      </button>
    </template>

    <template #aside-outline-after>
      <div v-if="frontmatter.stars" class="ch-meta">
        <div class="cm-row">
          <span class="cm-k"><span class="i18n-zh">难度</span><span class="i18n-en">LEVEL</span></span>
          <span class="cm-v">{{ '★'.repeat(frontmatter.stars) }}</span>
        </div>
        <div v-if="frontmatter.readTime" class="cm-row">
          <span class="cm-k"><span class="i18n-zh">阅读</span><span class="i18n-en">READ</span></span>
          <span class="cm-v">
            <span class="i18n-zh">约 {{ frontmatter.readTime }} 分钟</span>
            <span class="i18n-en">~{{ frontmatter.readTime }} min</span>
          </span>
        </div>
        <div v-if="updated" class="cm-row">
          <span class="cm-k"><span class="i18n-zh">更新</span><span class="i18n-en">UPDATED</span></span>
          <span class="cm-v">{{ updated }}</span>
        </div>
      </div>
    </template>
  </Layout>
</template>
