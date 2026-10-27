// Invalid drafts belong to one tab and never replace validated trip data.
export type Drafts = Record<
  string,
  { value: string; label: string; reason?: 'invalid'; original?: string }
>
const key = 'japan-travel-drafts-v1'
let memory: string | null = null
export function readDrafts(raw: string): Drafts {
  try {
    if (raw.length > 1_000_000) return {}
    const data = JSON.parse(raw)
    if (!data || typeof data !== 'object' || Array.isArray(data)) return {}
    return Object.fromEntries(
      Object.entries(data).filter(
        ([key, value]) =>
          key !== '__proto__' &&
          key !== 'constructor' &&
          key.length < 200 &&
          value &&
          typeof value === 'object' &&
          'value' in value &&
          typeof value.value === 'string' &&
          value.value.length <= 1000 &&
          (!('original' in value) ||
            (typeof value.original === 'string' &&
              value.original.length <= 1000)) &&
          'label' in value &&
          typeof value.label === 'string' &&
          value.label.length <= 200,
      ),
    ) as Drafts
  } catch {
    return {}
  }
}
export function draftSnapshot() {
  if (memory !== null) return memory
  try {
    return sessionStorage.getItem(key) || '{}'
  } catch {
    return '{}'
  }
}
export function writeDraft(field: string, draft: Drafts[string] | null) {
  const next = readDrafts(draftSnapshot())
  if (draft) next[field] = draft
  else delete next[field]
  memory = JSON.stringify(next)
  try {
    sessionStorage.setItem(key, memory)
  } catch {
    /* beforeunload protects in-memory drafts */
  }
  window.dispatchEvent(new Event('trip-draft-change'))
}
export function subscribeDrafts(callback: () => void) {
  window.addEventListener('trip-draft-change', callback)
  return () => window.removeEventListener('trip-draft-change', callback)
}
