// Shared with the Node assembler, which remains compatible with Node 20.
export const AI_MODES = /** @type {const} */ (['concept', 'setup', 'practice', 'debug', 'project', 'reference'])

/**
 * @param {import('./types.ts').AIOptions} [value]
 * @returns {Required<import('./types.ts').AIOptions>}
 */
export function resolveAIOptions(value = {}) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('ai must be an object')
  if (value.mode !== undefined && !AI_MODES.includes(value.mode)) throw new Error('Unknown AI mode')
  for (const key of /** @type {const} */ (['projectFirst', 'verify'])) {
    if (value[key] !== undefined && typeof value[key] !== 'boolean') throw new Error(`ai.${key} must be boolean`)
  }
  const mode = value.mode ?? 'concept'
  return { mode, projectFirst: value.projectFirst ?? true, verify: value.verify ?? mode !== 'concept' }
}
