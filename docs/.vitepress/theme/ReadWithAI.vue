<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData, withBase } from 'vitepress'
import { lang } from './lang.js'
import { AGENT_SKILL, PROVIDERS, getProvider } from '../lib/read-with-ai/providers.ts'
import type { ProviderId } from '../lib/read-with-ai/providers.ts'
import type { ReadingChapter } from '../lib/read-with-ai/types.ts'
import type { openWithAI } from '../lib/read-with-ai/open-with-ai.ts'

const { frontmatter, page } = useData()
const root = ref<HTMLElement>()
const trigger = ref<HTMLButtonElement>()
const menu = ref<HTMLElement>()
const manualText = ref<HTMLTextAreaElement>()
const open = ref(false)
const loading = ref(false)
const busy = ref(false)
const packet = ref('')
const failure = ref(false)
const manual = ref(false)
const copiedProvider = ref<ProviderId | null>(null)
const providerLink = ref<string | null>(null)
let launch: typeof openWithAI | undefined
let controller: AbortController | undefined
const english = computed(() => lang.value === 'en')
const say = (zh: string, en: string) => english.value ? en : zh
const menuId = computed(() => `read-ai-${page.value.relativePath.replace(/[^a-zA-Z0-9]/g, '-')}`)
const feedback = computed(() => {
  if (manual.value) return say('未能自动复制。请选中下方全文，手动复制后粘贴到 AI。', 'Automatic copy failed. Select the full packet below, then copy and paste it into your AI.')
  if (failure.value) return say('章节未能加载，请重试。', 'Could not load this chapter. Please retry.')
  if (loading.value) return say('正在准备本章全文…', 'Preparing the full chapter…')
  if (busy.value) return say('正在复制…', 'Copying…')
  if (copiedProvider.value === 'clipboard') return say('已复制完整章节和共读指引，可粘贴到任何 AI。', 'Copied the full chapter and reading instructions. Paste into any AI.')
  if (copiedProvider.value) {
    const name = getProvider(copiedProvider.value)?.name
    return say(`已复制。粘贴到 ${name}，开始共读。`, `Copied. Paste into ${name} to start reading.`)
  }
  return ''
})

async function prepare() {
  if (packet.value || loading.value) return
  const url = frontmatter.value.readWithAI
  const slug = page.value.relativePath.replace(/\.md$/, '')
  const request = new AbortController()
  controller?.abort()
  controller = request
  loading.value = true
  failure.value = false
  const timeout = setTimeout(() => request.abort(), 15000)
  try {
    const [response, builder, adapter] = await Promise.all([
      fetch(withBase(url), { signal: request.signal }),
      import('../lib/read-with-ai/build-packet.ts'),
      import('../lib/read-with-ai/open-with-ai.ts'),
    ])
    if (!response.ok) throw new Error('Chapter unavailable')
    const chapter: ReadingChapter = await response.json()
    if (chapter.slug !== slug) throw new Error('Chapter mismatch')
    if (controller !== request) return
    packet.value = builder.buildPacket(chapter)
    launch = adapter.openWithAI
  } catch {
    if (controller === request) {
      failure.value = true
      // Keep the retry action visible instead of behind the desktop popover.
      if (open.value) close(true)
    }
  } finally {
    clearTimeout(timeout)
    if (controller === request) loading.value = false
  }
}

function close(restoreFocus = false) {
  open.value = false
  if (restoreFocus) trigger.value?.focus()
}

async function show(last = false) {
  open.value = true
  void prepare()
  await nextTick()
  const items = menu.value?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]')
  items?.[last ? items.length - 1 : 0]?.focus()
}

function navigate(event: KeyboardEvent) {
  if (event.key === 'Escape') { event.preventDefault(); close(true); return }
  const items = [...(menu.value?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]') ?? [])]
  const index = items.indexOf(document.activeElement as HTMLButtonElement)
  let next: number
  if (event.key === 'ArrowDown') next = (index + 1) % items.length
  else if (event.key === 'ArrowUp') next = (index - 1 + items.length) % items.length
  else if (event.key === 'Home') next = 0
  else if (event.key === 'End') next = items.length - 1
  else return
  event.preventDefault()
  items[next]?.focus()
}

async function choose(provider: ProviderId) {
  if (!packet.value || !launch || busy.value) return
  const chapterUrl = frontmatter.value.readWithAI
  busy.value = true
  manual.value = false
  copiedProvider.value = null
  providerLink.value = null
  try {
    const result = await launch({ provider, packet: packet.value })
    if (chapterUrl !== frontmatter.value.readWithAI) return
    copiedProvider.value = provider
    if (!result.opened) providerLink.value = getProvider(provider)?.url ?? null
    close(true)
  } catch {
    if (chapterUrl !== frontmatter.value.readWithAI) return
    manual.value = true
    providerLink.value = getProvider(provider)?.url ?? null
    close()
    await nextTick()
    selectPacket()
  } finally {
    if (chapterUrl === frontmatter.value.readWithAI) busy.value = false
  }
}

function selectPacket() { manualText.value?.focus(); manualText.value?.select() }
function outside(event: PointerEvent) {
  if (!root.value?.contains(event.target as Node)) close()
}
function focusOut(event: FocusEvent) {
  if (!root.value?.contains(event.relatedTarget as Node)) close()
}

watch(() => page.value.relativePath, () => {
  controller?.abort()
  controller = undefined
  close()
  packet.value = ''
  loading.value = busy.value = failure.value = manual.value = false
  copiedProvider.value = providerLink.value = null
})
onMounted(() => document.addEventListener('pointerdown', outside))
onBeforeUnmount(() => { controller?.abort(); controller = undefined; document.removeEventListener('pointerdown', outside) })
</script>

<template>
  <div v-if="frontmatter.readWithAI" ref="root" class="read-ai" @focusout="focusOut">
    <div class="read-ai-actions">
      <button ref="trigger" class="read-ai-trigger" type="button" aria-haspopup="menu"
              :aria-expanded="open" :aria-controls="menuId"
              :aria-label="say('Read with AI · 与 AI 共读本章', 'Read with AI · Read this chapter together')"
              @click="open ? close() : show()"
              @keydown.down.prevent="show()" @keydown.up.prevent="show(true)" @keydown.esc="close(true)">
        Read with AI <span aria-hidden="true">⌄</span>
      </button>
      <a v-if="AGENT_SKILL.status === 'published' && AGENT_SKILL.url" class="read-ai-skill" :href="AGENT_SKILL.url">easycode · Agent Skill</a>
      <span v-else class="read-ai-skill">Agent Skill · {{ say('筹备中', 'Coming later') }}</span>
    </div>
    <div v-if="open" :id="menuId" ref="menu" class="read-ai-menu" role="menu" aria-label="Read with AI" @keydown="navigate">
      <div class="read-ai-hint" role="presentation">{{ say('复制本章全文，然后打开 AI', 'Copy the full chapter, then open AI') }}</div>
      <button v-for="provider in PROVIDERS" :key="provider.id" type="button" role="menuitem" tabindex="-1"
              :aria-disabled="!packet || busy" @click="choose(provider.id)">
        <img class="read-ai-icon-light" :src="withBase(provider.icon)" alt="" width="20" height="20" aria-hidden="true">
        <img class="read-ai-icon-dark" :src="withBase(provider.darkIcon)" alt="" width="20" height="20" aria-hidden="true">
        {{ provider.name }}
        <span class="read-ai-external" aria-hidden="true">↗</span>
      </button>
      <div class="read-ai-divider" role="separator" />
      <button type="button" role="menuitem" tabindex="-1" :aria-disabled="!packet || busy" @click="choose('clipboard')">
        <span class="read-ai-copy-icon" aria-hidden="true">⧉</span> Copy for any AI
      </button>
    </div>
    <div class="read-ai-status" role="status" aria-live="polite" aria-atomic="true">{{ feedback }}</div>
    <button v-if="failure" class="read-ai-trigger" type="button" @click="prepare">{{ say('重新加载', 'Retry loading') }}</button>
    <div v-if="manual" class="read-ai-manual">
      <label :for="`${menuId}-packet`">{{ say('完整 AI Reading Packet', 'Full AI Reading Packet') }}</label>
      <textarea :id="`${menuId}-packet`" ref="manualText" :value="packet" readonly rows="7" />
      <button class="read-ai-trigger" type="button" @click="selectPacket">{{ say('全选全文', 'Select full packet') }}</button>
    </div>
    <a v-if="providerLink" :href="providerLink" target="_blank" rel="noopener noreferrer" class="read-ai-open-link">
      {{ say('打开 AI 后粘贴 ↗', 'Open AI and paste ↗') }}
    </a>
  </div>
</template>

<style scoped>
.read-ai { position: relative; margin: 20px 0 24px; font-weight: 400; }
.read-ai-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 8px 16px; }
.read-ai-trigger { display: inline-flex; align-items: center; justify-content: center; gap: 12px; min-height: 44px; padding: 0 14px; color: var(--vp-c-text-2); border: 1px solid var(--vp-c-divider); border-radius: var(--pos-radius); background: transparent; font-size: 12px; letter-spacing: 0.04em; cursor: pointer; }
.read-ai-trigger:hover { color: var(--vp-c-text-1); border-color: var(--vp-c-border); }
.read-ai-skill { font-family: var(--vp-font-family-mono); font-size: 10px; letter-spacing: 0.03em; color: var(--vp-c-text-2); }
.read-ai-menu { position: absolute; top: 52px; left: 0; z-index: 10; width: min(280px, 100%); max-height: min(360px, 65dvh); overflow-y: auto; padding: 6px; border: 1px solid var(--vp-c-border); border-radius: var(--pos-radius); background: var(--vp-c-bg-elv); }
.read-ai-hint { padding: 6px 10px 8px; font-size: 11px; line-height: 1.5; color: var(--vp-c-text-2); }
.read-ai-menu button { display: flex; align-items: center; gap: 12px; width: 100%; min-height: 44px; padding: 8px 10px; border-radius: var(--pos-radius); color: var(--vp-c-text-1); font-size: 13px; line-height: 1.5; text-align: left; cursor: pointer; }
.read-ai-menu button:hover, .read-ai-menu button:focus-visible { background: var(--vp-c-bg-soft); }
.read-ai-menu button[aria-disabled='true'] { opacity: 0.5; cursor: progress; }
.read-ai button:focus-visible, .read-ai textarea:focus-visible, .read-ai a:focus-visible { outline: 2px solid var(--vp-c-text-1); outline-offset: 2px; }
.read-ai-menu button:focus-visible { outline-offset: -2px; }
.read-ai button:active { background: var(--vp-c-brand-soft); }
.read-ai-menu img { flex: 0 0 20px; width: 20px; height: 20px; object-fit: contain; }
.read-ai-icon-dark { display: none; }
:global(.dark .read-ai-icon-light) { display: none; }
:global(.dark .read-ai-icon-dark) { display: block; }
.read-ai-copy-icon { width: 20px; text-align: center; font-size: 20px; }
.read-ai-external { margin-left: auto; color: var(--vp-c-text-2); }
.read-ai-divider { border-top: 1px solid var(--vp-c-divider); margin: 6px 0; }
.read-ai-status { font-size: 12px; line-height: 1.7; color: var(--vp-c-text-2); }
.read-ai-status:not(:empty) { margin-top: 10px; }
.read-ai-manual { margin-top: 12px; font-size: 12px; }
.read-ai-manual textarea { display: block; width: 100%; margin: 8px 0; padding: 12px; border: 1px solid var(--vp-c-border); border-radius: var(--pos-radius); background: var(--vp-c-bg); color: var(--vp-c-text-1); font-family: var(--vp-font-family-mono); font-size: 12px; resize: vertical; }
.read-ai-open-link { display: inline-flex; align-items: center; min-height: 44px; margin-top: 8px; font-size: 12px; }
@media (max-width: 767px) {
  .read-ai-menu { position: relative; top: auto; margin-top: 8px; width: 100%; }
}
</style>
