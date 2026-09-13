export const PROVIDERS = [
  { id: 'chatgpt', name: 'ChatGPT', url: 'https://chatgpt.com/', icon: '/ai-providers/chatgpt.svg', darkIcon: '/ai-providers/chatgpt-dark.svg' },
  { id: 'claude', name: 'Claude', url: 'https://claude.ai/new', icon: '/ai-providers/claude.svg', darkIcon: '/ai-providers/claude-dark.svg' },
  { id: 'gemini', name: 'Gemini', url: 'https://gemini.google.com/app', icon: '/ai-providers/gemini.svg', darkIcon: '/ai-providers/gemini.svg' },
  { id: 'grok', name: 'Grok', url: 'https://grok.com/', icon: '/ai-providers/grok.svg', darkIcon: '/ai-providers/grok-dark.svg' },
] as const

export type ProviderId = typeof PROVIDERS[number]['id'] | 'clipboard'

export function getProvider(id: ProviderId) {
  if (id === 'clipboard') return null
  const provider = PROVIDERS.find(provider => provider.id === id)
  if (!provider) throw new Error('Unknown AI provider')
  return provider
}

// easycode v1.0.0: public repository and remote installation verified 2026-09-13.
export const AGENT_SKILL: { status: 'planned' | 'published'; url: string | null } = {
  status: 'published', url: 'https://github.com/Charlie0113-T/stickmancharles-ai-guide',
}
