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
  title: 'AI 时代的编程指南',
  description: 'Stickman Charles 的书架。《AI 时代的编程指南》官方站点：五册阶梯 + 速查 + 真实项目。',
  cleanUrls: true,
  appearance: 'dark',
  sitemap: { hostname: 'https://books.stickmancharles.com' },
  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Noto+Sans+SC:wght@300;400;500;700&display=swap' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'books.stickmancharles.com' }],
    ['meta', { property: 'og:title', content: 'AI 时代的编程指南 · Stickman Charles 的书架' }],
    ['meta', { property: 'og:description', content: '你不需要成为程序员，但你需要看懂程序员的世界。五册阶梯 + 速查 + 真实项目。' }],
    ['meta', { property: 'og:url', content: 'https://books.stickmancharles.com/' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
  ],
  themeConfig: {
    siteTitle: 'CHARLES TAO / BOOKS',
    nav: [
      { text: '开始', link: '/start/why' },
      { text: '指南', link: '/guide/01/' },
      { text: '速查', link: '/reference/git' },
      { text: '项目', link: '/projects/first-website' },
      { text: '术语表', link: '/glossary' },
      { text: '路线图', link: '/roadmap' },
      { text: '主站', link: 'https://stickmancharles.com' },
    ],
    sidebar: {
      '/start/': [{ text: '开始', items: [
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
    search: { provider: 'local', options: { detailedView: true } },
    docFooter: { prev: '上一页', next: '下一页' },
    darkModeSwitchLabel: '主题',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '回到顶部',
    footer: {
      message: '由 Charles Tao 与 Claude 协作写成——这本身就是这套书讲的工作方式。',
      copyright: '献给我的父亲 Roy：只要想学，最好的时间就是现在。'
    },
  },
})
