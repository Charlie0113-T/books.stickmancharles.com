<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { series } from './books-data.js'

const lang = ref('zh')
const isDark = ref(true)
const active = ref(null)
let lastTrigger = null

const STR = {
  zh: { read: '在线阅读', pdf: '下载 PDF', writing: '写作中', ch: '章', vol: '第', volSuffix: '册',
        next: '留给下一本书', toLang: 'EN', close: '关闭' },
  en: { read: 'READ ONLINE', pdf: 'DOWNLOAD PDF', writing: 'WRITING', ch: 'CH', vol: 'VOLUME', volSuffix: '',
        next: 'FOR THE NEXT BOOK', toLang: '中文', close: 'Close' },
}
const t = computed(() => STR[lang.value])
const guide = series[0]
const seriesTitle = computed(() => (lang.value === 'zh' ? guide.title_zh : guide.title_en))
// 摞在架上：05 的稿纸在最上面，01 垫底
const stack = computed(() =>
  [...guide.books].reverse().map(b => ({
    ...b,
    title: lang.value === 'zh' ? b.title_zh : b.title_en,
    subtitle: lang.value === 'zh' ? b.subtitle_zh : b.subtitle_en,
    blurb: lang.value === 'zh' ? b.blurb_zh : b.blurb_en,
  }))
)
const doneCount = guide.books.filter(b => b.status === 'done').length
const writingCount = guide.books.length - doneCount
const statusText = computed(() =>
  lang.value === 'zh'
    ? `${doneCount} 本可读 · ${writingCount} 本写作中`
    : `${doneCount} READABLE · ${writingCount} IN WRITING`
)

// 每本书平放时的物理差异：宽度与错位（毫米级的不整齐才像真书堆）
const GEO = { '01': [322, 0], '02': [312, -5], '03': [296, 4], '04': [306, -8], '05': [292, 10] }

function open(book, ev) {
  lastTrigger = ev?.currentTarget || null
  active.value = book
  document.body.style.overflow = 'hidden'
  nextTick(() => document.querySelector('.fi-close')?.focus())
}
function close() {
  active.value = null
  document.body.style.overflow = ''
  lastTrigger?.focus?.()
}
function onKey(e) { if (e.key === 'Escape' && active.value) close() }

onMounted(() => {
  const saved = localStorage.getItem('books-lang')
  if (saved === 'en' || saved === 'zh') lang.value = saved
  isDark.value = document.documentElement.classList.contains('dark')
  window.addEventListener('keydown', onKey)
})
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})

function toggleLang() {
  lang.value = lang.value === 'zh' ? 'en' : 'zh'
  localStorage.setItem('books-lang', lang.value)
}
function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  // 与 VitePress 主题开关共用同一个 key，进入阅读页后保持一致
  localStorage.setItem('vitepress-theme-appearance', isDark.value ? 'dark' : 'light')
}
</script>

<template>
  <section class="os">
    <h1 class="sr-only">AI 时代的编程指南 · Stickman Charles Books</h1>

    <nav class="topnav">
      <span class="nav-logo">STICKMAN CHARLES BOOKS</span>
      <div class="nav-ctl">
        <button class="lang-toggle" type="button" @click="toggleLang"
                :aria-label="lang === 'zh' ? 'Switch to English' : '切换到中文'">{{ t.toLang }}</button>
        <button class="theme-toggle" type="button" @click="toggleTheme"
                :aria-label="isDark ? 'Light theme' : 'Dark theme'">{{ isDark ? '☾' : '☀' }}</button>
      </div>
    </nav>

    <main class="stage">
      <div class="case-wrap">
        <div class="bookcase">
          <div class="cell cell-books">
            <span class="cell-label">{{ seriesTitle }}</span>
            <div class="stack">
              <template v-for="b in stack" :key="b.id">
                <button
                  v-if="b.status === 'done'"
                  class="lying"
                  type="button"
                  :style="{ width: GEO[b.id][0] + 'px', transform: `translateX(${GEO[b.id][1]}px)` }"
                  :aria-label="`${b.title} — ${t.read}`"
                  @click="open(b, $event)"
                >
                  <span class="ly-num">{{ b.id }}</span>
                  <span class="ly-title">{{ b.title }}</span>
                  <span class="ly-stars">{{ '★'.repeat(b.stars) }}</span>
                </button>
                <div
                  v-else
                  class="lying manuscript"
                  role="img"
                  :style="{ width: GEO[b.id][0] + 'px', transform: `translateX(${GEO[b.id][1]}px) rotate(-0.8deg)` }"
                  :aria-label="lang === 'zh' ? `第 ${b.id} 册《${b.title}》写作中，尚未出版` : `Volume ${b.id}, ${b.title}: in progress`"
                >
                  <span class="ly-num">{{ b.id }}</span>
                  <span class="ly-title">{{ b.title }}</span>
                  <span class="ly-tag">{{ t.writing }}</span>
                </div>
              </template>
            </div>
          </div>
          <div class="cell cell-empty">
            <span class="empty-note">{{ t.next }}</span>
          </div>
        </div>
        <div class="case-shadow" aria-hidden="true"></div>
        <div class="status-row">
          <span class="status-dot" aria-hidden="true"></span>
          <span class="status-text">{{ statusText }}</span>
        </div>
      </div>
    </main>

    <!-- 点击后：书从架上转过来 -->
    <div v-if="active" class="focus-layer" @click.self="close">
      <div class="focus-inner" role="dialog" aria-modal="true" :aria-label="active.title">
        <div class="focus-scene" aria-hidden="true">
          <div class="fbook turning">
            <div class="fface ffront">
              <span class="f-num">{{ active.id }}</span>
              <span class="f-title">{{ active.title }}</span>
              <span class="f-sub">{{ active.subtitle }}</span>
              <span class="f-meta">{{ '★'.repeat(active.stars) }}&thinsp;·&thinsp;{{ active.chapters }} {{ t.ch }}</span>
            </div>
            <div class="fface fspine"><span>{{ active.id }}　{{ active.title }}</span></div>
            <div class="fface fedge"></div>
            <div class="fface fback"></div>
          </div>
        </div>

        <div class="focus-info">
          <button class="fi-close" type="button" :aria-label="t.close" @click="close">×</button>
          <span class="fi-series">{{ seriesTitle }}</span>
          <span class="fi-vol">{{ lang === 'zh' ? `第 ${active.id} 册` : `${t.vol} ${active.id}` }}</span>
          <h2 class="fi-title">{{ active.title }}</h2>
          <p class="fi-sub">{{ active.subtitle }}</p>
          <p class="fi-meta">{{ '★'.repeat(active.stars) }}&thinsp;·&thinsp;{{ active.chapters }} {{ t.ch }}</p>
          <p class="fi-blurb">{{ active.blurb }}</p>
          <div class="fi-actions">
            <a v-if="active.readLink" class="btn btn-solid" :href="active.readLink">{{ t.read }}</a>
            <a v-if="active.pdf" class="btn btn-ghost" :href="active.pdf" download>{{ t.pdf }}</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sr-only {
  position: absolute; width: 1px; height: 1px;
  clip-path: inset(50%); overflow: hidden; white-space: nowrap;
}

.os { min-height: 100vh; display: flex; flex-direction: column; }

/* ── 导航：主站同款（fixed · blur · 细边） ── */
.topnav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  height: 56px;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 clamp(24px, 5vw, 64px);
  border-bottom: 1px solid var(--vp-c-divider);
  background: color-mix(in srgb, var(--vp-c-bg) 78%, transparent);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}
.nav-logo { font-size: 13px; font-weight: 600; letter-spacing: 0.18em; color: var(--vp-c-text-1); }
.nav-ctl { display: flex; align-items: center; }
.lang-toggle {
  font-size: 11px; font-weight: 500; letter-spacing: 0.12em;
  color: var(--vp-c-text-2);
  background: none; border: 1px solid var(--vp-c-divider);
  padding: 5px 12px; border-radius: 2px;
  cursor: pointer; white-space: nowrap;
  transition: color 0.25s ease, border-color 0.25s ease;
}
.lang-toggle:hover { color: var(--vp-c-text-1); border-color: var(--vp-c-border); }
.theme-toggle {
  display: flex; align-items: center; justify-content: center;
  width: 32px; height: 32px; margin-left: 10px;
  background: none; border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2); border-radius: 2px;
  font-size: 13px; cursor: pointer; flex-shrink: 0;
  transition: color 0.25s ease, border-color 0.25s ease, transform 0.3s ease;
}
.theme-toggle:hover { color: var(--vp-c-text-1); border-color: var(--vp-c-border); transform: rotate(20deg); }
.lang-toggle:focus-visible, .theme-toggle:focus-visible {
  outline: 2px solid var(--vp-c-text-1); outline-offset: 2px;
}

/* ── 舞台：一个书柜，居中 ── */
.stage { flex: 1; display: flex; align-items: center; justify-content: center; padding: 88px 24px 40px; }
.case-wrap { display: flex; flex-direction: column; align-items: center; }

.bookcase {
  width: min(460px, 100%);
  border: 1px solid var(--vp-c-border);
  border-radius: 2px;
  background: var(--vp-c-bg-soft);
  overflow: hidden;
}
.cell { padding: 18px 22px 0; }
.cell + .cell { border-top: 1px solid var(--vp-c-border); }
.cell-label {
  display: block;
  font-family: var(--vp-font-family-mono);
  font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--vp-c-text-3);
  margin-bottom: 18px;
}

/* ── 平放的书堆：只见书脊 ── */
.stack { display: flex; flex-direction: column; align-items: center; gap: 5px; padding-bottom: 22px; }
.lying {
  height: 46px;
  display: flex; align-items: center; gap: 14px;
  padding: 0 16px;
  border: 1px solid var(--vp-c-border);
  border-radius: 2px;
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--vp-c-text-1) 7%, transparent), transparent 45%),
    var(--vp-c-bg-elv);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.28);
  color: var(--vp-c-text-1);
  font-family: inherit;
  cursor: pointer;
  transition: transform 0.3s ease, border-color 0.25s ease, background-color 0.25s ease;
}
.lying:hover { border-color: var(--vp-c-text-2); transform: translateX(16px) !important; }
.lying:focus-visible { outline: 2px solid var(--vp-c-text-1); outline-offset: 2px; }
.ly-num {
  font-family: var(--vp-font-family-mono);
  font-size: 10px; letter-spacing: 0.24em; color: var(--vp-c-text-3);
}
.ly-title { font-size: 13px; font-weight: 500; letter-spacing: 0.06em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ly-stars {
  margin-left: auto;
  font-family: var(--vp-font-family-mono);
  font-size: 9px; letter-spacing: 0.18em; color: var(--vp-c-text-3);
}

/* 第五册：未装订的稿纸束 */
.manuscript {
  border-style: dashed;
  background: transparent;
  box-shadow: none;
  opacity: 0.66;
  cursor: default;
}
.manuscript .ly-title { font-weight: 300; color: var(--vp-c-text-2); }
.ly-tag {
  margin-left: auto;
  font-family: var(--vp-font-family-mono);
  font-size: 9px; letter-spacing: 0.2em;
  color: var(--vp-c-text-3);
  border: 1px solid var(--vp-c-divider);
  padding: 2px 6px;
}

/* 下层空格：留给未来的书 */
.cell-empty { height: 108px; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 14px; }
.empty-note {
  font-family: var(--vp-font-family-mono);
  font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--vp-c-text-3); opacity: 0.75;
}

.case-shadow {
  width: 78%; height: 14px; margin-top: 10px;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.3), transparent 68%);
}

/* 主站签名：脉冲状态点 */
.status-row { display: flex; align-items: center; gap: 10px; margin-top: 26px; }
.status-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--vp-c-text-1);
  animation: pulse 2.4s ease-in-out infinite;
}
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
.status-text {
  font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--vp-c-text-3);
}

/* ── 点击后的"转过来"层 ── */
.focus-layer {
  position: fixed; inset: 0; z-index: 200;
  display: flex; align-items: center; justify-content: center;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 24px;
}
.focus-inner { display: flex; align-items: center; gap: 56px; max-width: 760px; }

.focus-scene { perspective: 1100px; }
.fbook {
  position: relative; width: 236px; height: 336px;
  transform-style: preserve-3d;
  transform: rotateY(14deg);
}
.turning { animation: turn 0.7s cubic-bezier(0.22, 1, 0.36, 1); }
@keyframes turn {
  from { transform: rotateY(88deg); }
  to   { transform: rotateY(14deg); }
}
.fface { position: absolute; border: 1px solid var(--vp-c-border); background: var(--vp-c-bg-elv); }
.ffront {
  inset: 0; transform: translateZ(20px);
  display: flex; flex-direction: column;
  padding: 22px 20px 16px;
  background:
    linear-gradient(160deg, var(--vp-c-bg-soft), transparent 55%),
    var(--vp-c-bg-elv);
  border-left: 3px solid var(--vp-c-text-1);
}
.f-num {
  font-family: var(--vp-font-family-mono);
  font-size: 11px; letter-spacing: 0.3em; color: var(--vp-c-text-3);
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 10px; margin-bottom: 16px;
}
.f-title { font-size: 26px; font-weight: 600; letter-spacing: 0.02em; color: var(--vp-c-text-1); line-height: 1.3; }
.f-sub { font-size: 13px; font-weight: 300; color: var(--vp-c-text-2); line-height: 1.6; margin-top: 10px; }
.f-meta {
  margin-top: auto;
  font-family: var(--vp-font-family-mono);
  font-size: 10px; letter-spacing: 0.14em; color: var(--vp-c-text-3);
}
.fspine {
  top: 0; left: 0; width: 40px; height: 100%;
  transform: translateX(-20px) rotateY(-90deg);
  display: flex; align-items: flex-start; justify-content: center;
  padding-top: 18px;
  background: var(--vp-c-bg-alt);
}
.fspine span {
  writing-mode: vertical-rl;
  font-family: var(--vp-font-family-mono);
  font-size: 12px; font-weight: 500; letter-spacing: 0.18em;
  color: var(--vp-c-text-2);
}
.fedge {
  top: 5px; right: 0; width: 38px; height: calc(100% - 10px);
  transform: translateX(19px) rotateY(90deg);
  border: none;
  background: repeating-linear-gradient(to bottom, #f1efe8 0 2px, #d8d6cd 2px 3px);
}
.fback { inset: 0; transform: rotateY(180deg) translateZ(20px); background: var(--vp-c-bg-alt); }

/* 信息卡：主站 module-card 语言（玻璃 · 顶部流光线） */
.focus-info {
  position: relative;
  width: 340px; max-width: 82vw;
  border: 1px solid var(--vp-c-border);
  border-radius: 2px;
  background: var(--vp-c-bg-elv);
  padding: 30px 30px 28px;
  overflow: hidden;
}
.focus-info::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--vp-c-text-1) 25%, transparent), transparent);
}
.fi-close {
  position: absolute; top: 12px; right: 12px;
  width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  background: none; border: 1px solid var(--vp-c-divider); border-radius: 2px;
  color: var(--vp-c-text-2); font-size: 16px; cursor: pointer;
  transition: color 0.25s ease, border-color 0.25s ease;
}
.fi-close:hover { color: var(--vp-c-text-1); border-color: var(--vp-c-border); }
.fi-close:focus-visible { outline: 2px solid var(--vp-c-text-1); outline-offset: 2px; }
.fi-series {
  display: block;
  font-family: var(--vp-font-family-mono);
  font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--vp-c-text-3);
  margin-bottom: 6px;
}
.fi-vol {
  display: block;
  font-family: var(--vp-font-family-mono);
  font-size: 10px; letter-spacing: 0.24em;
  color: var(--vp-c-text-3);
  margin-bottom: 14px;
}
.fi-title { font-size: 24px; font-weight: 600; letter-spacing: -0.01em; color: var(--vp-c-text-1); margin: 0 0 6px; border: none; padding: 0; }
.fi-sub { font-size: 13px; font-weight: 300; color: var(--vp-c-text-2); margin: 0 0 12px; line-height: 1.6; }
.fi-meta {
  font-family: var(--vp-font-family-mono);
  font-size: 10px; letter-spacing: 0.14em; color: var(--vp-c-text-3);
  margin: 0 0 16px;
}
.fi-blurb { font-size: 13px; font-weight: 300; line-height: 1.8; color: var(--vp-c-text-2); margin: 0 0 22px; }
.fi-actions { display: flex; gap: 10px; flex-wrap: wrap; }
.btn {
  display: inline-block;
  font-size: 12px; letter-spacing: 0.08em;
  padding: 8px 18px;
  border: 1px solid var(--vp-c-border);
  border-radius: 2px;
  text-decoration: none;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
.btn-solid { background: var(--vp-button-brand-bg); color: var(--vp-button-brand-text); border-color: var(--vp-button-brand-bg); }
.btn-solid:hover { background: var(--vp-button-brand-hover-bg); color: var(--vp-button-brand-hover-text); }
.btn-ghost { color: var(--vp-c-text-1); background: transparent; }
.btn-ghost:hover { border-color: var(--vp-c-text-1); }
.btn:focus-visible { outline: 2px solid var(--vp-c-text-1); outline-offset: 2px; }

/* ── reduced motion：全部静止 ── */
@media (prefers-reduced-motion: reduce) {
  .lying, .theme-toggle, .lang-toggle, .btn, .fi-close { transition: none; }
  .lying:hover { transform: none !important; }
  .turning { animation: none; }
  .status-dot { animation: none; }
  .theme-toggle:hover { transform: none; }
}

/* ── 移动端 ── */
@media (max-width: 767px) {
  .stage { padding: 76px 16px 32px; }
  .bookcase { width: 100%; }
  .lying { width: 100% !important; transform: none !important; }
  .lying:hover { transform: none !important; }
  .focus-inner { flex-direction: column; gap: 24px; max-height: 100%; overflow-y: auto; }
  .focus-scene { display: none; }
  .focus-info { width: 100%; max-width: 420px; }
  .nav-logo { font-size: 11px; letter-spacing: 0.14em; }
}
</style>
