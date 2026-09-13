import { getProvider } from './providers.ts'
import type { ProviderId } from './providers.ts'

export interface ProviderTab { navigate: (url: string) => void; close: () => void }
export interface AIEnvironment {
  copy: (packet: string) => Promise<void>
  reserveTab: () => ProviderTab | null
}

const browserEnvironment: AIEnvironment = {
  copy(packet) {
    if (!navigator.clipboard?.writeText) return Promise.reject(new Error('Clipboard unavailable'))
    return navigator.clipboard.writeText(packet)
  },
  reserveTab() {
    // Reserve within the click's user activation, before any await. No third-party
    // navigation until copying succeeds; sever opener before navigating.
    const tab = window.open('about:blank', '_blank')
    if (!tab) return null
    tab.opener = null
    return { navigate: url => tab.location.replace(url), close: () => tab.close() }
  },
}

export async function openWithAI(
  { provider, packet }: { provider: ProviderId; packet: string },
  environment: AIEnvironment = browserEnvironment,
): Promise<{ opened: boolean }> {
  const config = getProvider(provider)
  // Begin copying while the source document still has focus (Safari/Firefox).
  const copying = environment.copy(packet)
  let tab: ProviderTab | null = null
  if (config) {
    try { tab = environment.reserveTab() } catch { /* Copy still works; expose a manual link. */ }
  }
  try { await copying } catch (error) {
    tab?.close()
    throw error
  }
  if (config && tab) {
    try { tab.navigate(config.url); return { opened: true } } catch { tab.close() }
  }
  return { opened: false }
}
