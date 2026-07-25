<script setup>
import { books } from './books-data.js'
</script>

<template>
  <section class="shelf-wrap">
    <header class="shelf-head">
      <p class="shelf-kicker">STICKMAN CHARLES / BOOKS</p>
      <h1 class="shelf-title">AI 时代的编程指南</h1>
      <p class="shelf-tagline">你不需要成为程序员，但你需要看懂 AI 在做什么。五册阶梯 · 速查卡片 · 真实项目。</p>
    </header>

    <div class="shelf" role="list" aria-label="书架">
      <div v-for="b in books" :key="b.id" role="listitem" class="slot" :class="{ planned: b.status === 'planned' }">
        <a
          v-if="b.status === 'done'"
          class="scene"
          :href="b.readLink"
          tabindex="-1"
          aria-hidden="true"
        >
          <div class="book3d">
            <div class="face front">
              <span class="f-num">{{ b.id }}</span>
              <span class="f-title">{{ b.title }}</span>
              <span class="f-sub">{{ b.subtitle }}</span>
              <span class="f-meta">{{ '★'.repeat(b.stars) }}&thinsp;·&thinsp;{{ b.chapters }} 章</span>
            </div>
            <div class="face spine" aria-hidden="true"><span>{{ b.id }}　{{ b.title }}</span></div>
            <div class="face edge" aria-hidden="true"></div>
            <div class="face back" aria-hidden="true"></div>
          </div>
          <div class="shadow" aria-hidden="true"></div>
        </a>

        <div v-else class="scene scene-planned" role="img" :aria-label="`第 ${b.id} 册《${b.title}》写作中，尚未出版`">
          <div class="slot-empty">
            <span class="f-num">{{ b.id }}</span>
            <span class="f-title">{{ b.title }}</span>
            <span class="f-sub">{{ b.subtitle }}</span>
            <span class="f-meta">{{ '★'.repeat(b.stars) }}&thinsp;·&thinsp;规划 {{ b.chapters }} 章</span>
            <span class="slot-tag">写作中</span>
          </div>
        </div>

        <div class="slot-info">
          <p class="blurb">{{ b.blurb }}</p>
          <div class="actions">
            <a v-if="b.readLink" class="btn btn-solid" :href="b.readLink" :aria-label="`在线阅读《${b.title}》`">在线阅读</a>
            <a v-if="b.pdf" class="btn btn-ghost" :href="b.pdf" :aria-label="`下载《${b.title}》PDF`" download>下载 PDF</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ── 布局 ── */
.shelf-wrap { max-width: 1152px; margin: 0 auto; padding: 56px 24px 8px; }

.shelf-head { text-align: center; margin-bottom: 48px; }
.shelf-kicker {
  font-family: var(--vp-font-family-mono);
  font-size: 10px; letter-spacing: 0.22em; color: var(--vp-c-text-3);
  margin: 0 0 14px;
}
.shelf-title { font-size: 40px; font-weight: 600; letter-spacing: -0.02em; line-height: 1.2; margin: 0 0 12px; color: var(--vp-c-text-1); }
.shelf-tagline { font-size: 15px; font-weight: 300; color: var(--vp-c-text-2); margin: 0; }

.shelf { display: flex; flex-wrap: wrap; justify-content: center; }
.slot { width: 212px; padding: 0 6px; display: flex; flex-direction: column; }

/* ── 书架板：每格底部一条线，同排连成搁板 ── */
.scene {
  position: relative;
  height: 308px;
  display: flex; align-items: flex-end; justify-content: center;
  perspective: 900px;
  text-decoration: none;
  padding-bottom: 10px;
}
.scene::after {
  content: '';
  position: absolute; left: -6px; right: -6px; bottom: 0; height: 1px;
  background: var(--vp-c-border);
}

/* ── 3D 书体 ── */
.book3d {
  position: relative;
  width: 176px; height: 256px;
  transform-style: preserve-3d;
  transform: rotateY(24deg);
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}
.scene:hover .book3d { transform: rotateY(9deg) translateY(-5px); }

.face { position: absolute; border: 1px solid var(--vp-c-border); background: var(--vp-c-bg-elv); }

.face.front {
  inset: 0;
  transform: translateZ(16px);
  display: flex; flex-direction: column;
  padding: 18px 16px 14px;
  background:
    linear-gradient(160deg, var(--vp-c-bg-soft), transparent 55%),
    var(--vp-c-bg-elv);
  border-left: 3px solid var(--vp-c-text-1);
}
.f-num {
  font-family: var(--vp-font-family-mono);
  font-size: 11px; letter-spacing: 0.3em; color: var(--vp-c-text-3);
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 10px; margin-bottom: 14px;
}
.f-title { font-size: 22px; font-weight: 600; letter-spacing: 0.02em; color: var(--vp-c-text-1); line-height: 1.3; }
.f-sub { font-size: 12px; font-weight: 300; color: var(--vp-c-text-2); line-height: 1.6; margin-top: 8px; }
.f-meta {
  margin-top: auto;
  font-family: var(--vp-font-family-mono);
  font-size: 10px; letter-spacing: 0.14em; color: var(--vp-c-text-3);
}

.face.spine {
  top: 0; left: 0; width: 32px; height: 100%;
  transform: translateX(-16px) rotateY(-90deg);
  display: flex; align-items: flex-start; justify-content: center;
  padding-top: 16px;
  background: var(--vp-c-bg-alt);
}
.face.spine span {
  writing-mode: vertical-rl;
  font-size: 11px; font-weight: 500; letter-spacing: 0.18em;
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
}

/* 页缘：纸就是纸色，两个主题下都成立 */
.face.edge {
  top: 4px; right: 0; width: 30px; height: calc(100% - 8px);
  transform: translateX(15px) rotateY(90deg);
  border: none;
  background: repeating-linear-gradient(to bottom, #f1efe8 0 2px, #d8d6cd 2px 3px);
}

.face.back { inset: 0; transform: rotateY(180deg) translateZ(16px); background: var(--vp-c-bg-alt); }

.shadow {
  position: absolute; bottom: 4px; left: 50%; transform: translateX(-50%);
  width: 72%; height: 12px;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.28), transparent 68%);
  transition: width 0.45s ease, opacity 0.45s ease;
}
.scene:hover .shadow { width: 82%; opacity: 0.8; }

/* ── 第五册：未装订的稿纸，占位不可点 ── */
.scene-planned { perspective: none; cursor: default; }
.slot-empty {
  position: relative;
  width: 176px; height: 256px;
  border: 1px dashed var(--vp-c-border);
  background: var(--vp-c-bg-soft);
  display: flex; flex-direction: column;
  padding: 18px 16px 14px;
  opacity: 0.72;
}
.slot-empty::before, .slot-empty::after {
  content: '';
  position: absolute; inset: 0;
  border: 1px dashed var(--vp-c-divider);
  z-index: -1;
}
.slot-empty::before { transform: rotate(-1.6deg) translate(-3px, 3px); }
.slot-empty::after { transform: rotate(1.2deg) translate(4px, 5px); }
.slot-empty .f-num { border-bottom-style: dashed; }
.slot-tag {
  position: absolute; top: 14px; right: 12px;
  font-family: var(--vp-font-family-mono);
  font-size: 9px; letter-spacing: 0.2em;
  color: var(--vp-c-text-3);
  border: 1px solid var(--vp-c-divider);
  padding: 3px 6px;
}

/* ── 书下信息区 ── */
.slot-info { padding: 14px 2px 34px; text-align: center; }
.blurb { font-size: 12px; font-weight: 300; line-height: 1.7; color: var(--vp-c-text-2); margin: 0 0 12px; min-height: 3.4em; }
.actions { display: flex; gap: 8px; justify-content: center; }
.btn {
  display: inline-block;
  font-size: 12px; letter-spacing: 0.08em;
  padding: 6px 16px;
  border: 1px solid var(--vp-c-border);
  border-radius: 2px;
  text-decoration: none;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
.btn-solid { background: var(--vp-button-brand-bg); color: var(--vp-button-brand-text); border-color: var(--vp-button-brand-bg); }
.btn-solid:hover { background: var(--vp-button-brand-hover-bg); color: var(--vp-button-brand-hover-text); }
.btn-ghost { color: var(--vp-c-text-1); background: transparent; }
.btn-ghost:hover { border-color: var(--vp-c-text-1); }
.btn:focus-visible, .scene:focus-visible {
  outline: 2px solid var(--vp-c-text-1);
  outline-offset: 2px;
}

/* ── 动效尊重：reduced motion 下全部静止 ── */
@media (prefers-reduced-motion: reduce) {
  .book3d, .shadow, .btn { transition: none; }
  .scene:hover .book3d { transform: rotateY(24deg); }
  .scene:hover .shadow { width: 72%; opacity: 1; }
}

/* ── 移动端（<768px）：降级为平铺卡片，无 3D、无横向滚动 ── */
@media (max-width: 767px) {
  .shelf { flex-direction: column; align-items: stretch; }
  .slot { width: 100%; padding: 0; }
  .scene { height: auto; perspective: none; padding-bottom: 0; display: block; }
  .scene::after { display: none; }
  .book3d { width: 100%; height: auto; transform: none !important; transition: none; }
  .face.front { position: static; transform: none; }
  .face.spine, .face.edge, .face.back, .shadow { display: none; }
  .f-meta { margin-top: 14px; }
  .slot-empty { width: 100%; height: auto; }
  .slot-empty::before, .slot-empty::after { display: none; }
  .slot-info { padding: 12px 2px 30px; }
  .blurb { min-height: 0; }
  .shelf-title { font-size: 30px; }
}
</style>
