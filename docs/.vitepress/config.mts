import { defineConfig } from 'vitepress'
import sidebarBooks from './sidebar-books'

const refSidebar = [
  { text: '工具', collapsed: false, items: [
    { text: 'VS Code', link: '/reference/vscode' },
    { text: 'Claude Code', link: '/reference/claude-code' },
    { text: 'Git', link: '/reference/git' },
    { text: 'GitHub', link: '/reference/github' },
    { text: '终端', link: '/reference/terminal' },
  ]},
  { text: '语言', collapsed: false, items: [
    { text: 'HTML', link: '/reference/html' },
    { text: 'CSS', link: '/reference/css' },
    { text: 'JavaScript', link: '/reference/javascript' },
    { text: 'TypeScript', link: '/reference/typescript' },
    { text: 'SQL', link: '/reference/sql' },
    { text: 'Markdown · MDX', link: '/reference/markdown-mdx' },
  ]},
  { text: '后端与数据', collapsed: false, items: [
    { text: 'API', link: '/reference/api' },
    { text: '数据库', link: '/reference/database' },
    { text: 'Auth · RLS', link: '/reference/auth-rls' },
    { text: '环境变量与密钥', link: '/reference/env-secrets' },
  ]},
  { text: '部署与运维', collapsed: false, items: [
    { text: 'Vercel', link: '/reference/vercel' },
    { text: 'Cloudflare', link: '/reference/cloudflare' },
    { text: 'Supabase', link: '/reference/supabase' },
    { text: 'DigitalOcean', link: '/reference/digitalocean' },
    { text: '域名与 DNS', link: '/reference/dns' },
    { text: '日志与监控', link: '/reference/logs-monitoring' },
    { text: '成本', link: '/reference/cost' },
  ]},
  { text: '与 AI 协作', collapsed: false, items: [
    { text: '怎么提需求', link: '/reference/prompting' },
    { text: 'CLAUDE.md 与技能', link: '/reference/claude-md-skills' },
    { text: '红线与不可逆', link: '/reference/redlines' },
    { text: '验证与调试', link: '/reference/debugging' },
  ]},
]

export default defineConfig({
  lang: 'zh-CN',
  title: 'Stickman Charles Books',
  description: 'Stickman Charles 的书架——存放我写的每一本书。现在架上：《AI 时代的编程指南》，五册阶梯 + 速查 + 真实项目。',
  cleanUrls: true,
  appearance: 'dark',
  sitemap: { hostname: 'https://books.stickmancharles.com' },
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Noto+Sans+SC:wght@300;400;500;700&display=swap' }],
    ['link', { rel: 'llms', type: 'text/plain', href: '/llms.txt' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { name: 'ai-crawl', content: 'index' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Stickman Charles Books' }],
    ['meta', { property: 'og:title', content: 'Stickman Charles Books — Stickman Charles 的书架' }],
    ['meta', { property: 'og:description', content: 'Stickman Charles 的书架——存放我写的每一本书。现在架上：《AI 时代的编程指南》。' }],
    ['meta', { property: 'og:url', content: 'https://books.stickmancharles.com/' }],
    ['meta', { property: 'og:image', content: 'https://books.stickmancharles.com/og-image.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://books.stickmancharles.com/og-image.png' }],
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': 'https://books.stickmancharles.com/#website',
          url: 'https://books.stickmancharles.com/',
          name: 'Stickman Charles Books',
          description: 'The bookshelf of Stickman Charles (Charles Tao) — home of every book he writes.',
          inLanguage: 'zh-CN',
          publisher: { '@id': 'https://stickmancharles.com/#charles-tao' },
        },
        {
          '@type': 'BookSeries',
          '@id': 'https://books.stickmancharles.com/#ai-guide',
          name: 'AI 时代的编程指南',
          alternateName: 'The AI-Era Programming Guide',
          url: 'https://books.stickmancharles.com/guide/01/',
          inLanguage: 'zh-CN',
          author: { '@id': 'https://stickmancharles.com/#charles-tao' },
          license: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
        },
      ],
    })],
  ],
  lastUpdated: true,
  themeConfig: {
    siteTitle: 'STICKMAN CHARLES <span class="nav-dim">/ BOOKS</span>',
    // 导航文案是 v-html 渲染的：两个 span 各存一种语言，由 <html>.lang-en 决定显示哪个
    nav: [
      { text: '<span class="i18n-zh">开始</span><span class="i18n-en">Start</span>', link: '/start/origin' },
      { text: '<span class="i18n-zh">指南</span><span class="i18n-en">Guide</span>', link: '/guide/01/' },
      { text: '<span class="i18n-zh">速查</span><span class="i18n-en">Reference</span>', link: '/reference/git' },
      { text: '<span class="i18n-zh">项目</span><span class="i18n-en">Projects</span>', link: '/projects/first-website' },
      { text: '<span class="i18n-zh">术语表</span><span class="i18n-en">Glossary</span>', link: '/glossary' },
      { text: '<span class="i18n-zh">许可</span><span class="i18n-en">License</span>', link: '/license' },
      { text: '<span class="i18n-zh">主站</span><span class="i18n-en">Main site</span>', link: 'https://stickmancharles.com' },
    ],
    sidebar: {
      '/start/': [{ text: '开始', items: [
        { text: '这套书是怎么来的', link: '/start/origin' },
        { text: '为什么每个人都该学 AI 编程', link: '/start/why' },
        { text: '什么是 Vibe Coding', link: '/start/vibe-coding' },
        { text: '这个网站怎么用', link: '/start/how-to-use' },
      ]}],
      '/guide/': sidebarBooks,
      '/reference/': refSidebar,
      '/projects/': [{ text: '项目（只放真做过的）', items: [
        { text: '从零上线第一个网站', link: '/projects/first-website' },
        { text: '这个书站是怎么搭的', link: '/projects/how-this-site-was-built' },
        { text: '解剖 EchoForge', link: '/projects/echoforge-anatomy' },
      ]}],
    },
    outline: { level: [2, 3], label: '本页目录' },
    search: {
      provider: 'local',
      options: {
        detailedView: true,
        translations: {
          button: { buttonText: '搜索这套书', buttonAriaLabel: '搜索这套书' },
          modal: {
            noResultsText: '没有找到',
            resetButtonTitle: '清除',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
          },
        },
      },
    },
    docFooter: { prev: '上一章', next: '下一章' },
    darkModeSwitchLabel: '主题',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '回到顶部',
    footer: {
      message: '<span class="i18n-zh">由 Charles Tao 与 Claude 协作写成——这本身就是这套书讲的工作方式。</span>' +
               '<span class="i18n-en">Written by Charles Tao with Claude — which is itself the working method this series teaches.</span>' +
               ' · <a href="/license"><span class="i18n-zh">许可</span><span class="i18n-en">License</span></a>',
      copyright: '© 2026 Charles Tao · ' +
                 '<span class="i18n-zh">献给我的父亲 Roy：只要想学，最好的时间就是现在。</span>' +
                 '<span class="i18n-en">For my father Roy: if you want to learn, the best time is now.</span>'
    },
  },
})
