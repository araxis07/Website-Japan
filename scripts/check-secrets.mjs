import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import assert from 'node:assert/strict'
// A narrow, deterministic guard for common credential formats, not a penetration test.
const patterns = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /\bgh[pousr]_[A-Za-z0-9]{36,}\b/,
  /\bgithub_pat_[A-Za-z0-9_]{50,}\b/,
  /\bAKIA[0-9A-Z]{16}\b/,
  /\bsk-(?:proj-)?[A-Za-z0-9_-]{40,}\b/,
]
const matches = (text) => patterns.some((pattern) => pattern.test(text))
assert(matches('gh' + 'p_' + 'a'.repeat(36)))
assert(matches('-----BEGIN ' + 'PRIVATE KEY-----'))
assert(!matches('NEXT_PUBLIC_BASE_URL=https://example.test'))
const files = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' })
  .split('\0')
  .filter(Boolean)
const failures = files.filter((file) => {
  if (/(^|\/)\.env(?:\.|$)/.test(file) && !file.endsWith('.example'))
    return true
  try {
    const data = readFileSync(file)
    return !data.includes(0) && matches(data.toString('utf8'))
  } catch {
    return false
  }
})
if (failures.length) {
  console.error(
    'Potential credentials in tracked files (values redacted):\n' +
      failures.join('\n'),
  )
  process.exitCode = 1
} else
  console.log(
    `Credential-pattern check passed for ${files.length} tracked files.`,
  )
