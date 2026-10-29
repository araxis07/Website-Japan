import type { Locale } from '@/i18n/config'
import { entryKey, tripDate, tripId, tripPlace, type Trip } from './trip'
const escape = (value: string) =>
  value
    .replace(/\\/g, '\\\\')
    .replace(/\r\n|[\r\n]/g, '\\n')
    .replace(/[,;]/g, '\\$&')
const utc = (date: Date) =>
  date
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '')
// RFC 5545 folds content lines by UTF-8 octets, without splitting characters.
function fold(line: string) {
  let result = '',
    bytes = 0
  for (const char of line) {
    const length = new TextEncoder().encode(char).length
    if (bytes + length > 75) {
      result += '\r\n '
      bytes = 1
    }
    result += char
    bytes += length
  }
  return result
}
export async function tripCalendar(
  trip: Trip,
  lang: Locale,
  now = new Date(),
  includeNotes = false,
) {
  if (!trip.startDate) return null
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Website Japan//Travel planner//EN',
    'CALSCALE:GREGORIAN',
  ]
  for (const item of trip.items.filter((item) => item.day > 0)) {
    const date = tripDate(trip.startDate, item.day)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null
    const place = tripPlace(item)
    // shortcut: HTTP previews use fresh UIDs on each export, use HTTPS for stable reimports.
    const identity = crypto.subtle
      ? Array.from(
          new Uint8Array(
            await crypto.subtle.digest(
              'SHA-256',
              new TextEncoder().encode(entryKey(item)),
            ),
          ),
          (byte) => byte.toString(16).padStart(2, '0'),
        ).join('')
      : tripId()
    lines.push(
      'BEGIN:VEVENT',
      `UID:${identity}-${date}@website-japan`,
      `DTSTAMP:${utc(now)}`,
    )
    if (item.time) {
      const start = new Date(`${date}T${item.time}:00+09:00`)
      const end = new Date(start.getTime() + (item.duration || 0) * 60000)
      if (
        !Number.isFinite(start.getTime()) ||
        start.getUTCFullYear() < 0 ||
        end.getUTCFullYear() > 9999
      )
        return null
      lines.push(`DTSTART:${utc(start)}`)
      if (item.duration) lines.push(`DTEND:${utc(end)}`)
    } else lines.push(`DTSTART;VALUE=DATE:${date.replace(/-/g, '')}`)
    lines.push(
      `SUMMARY:${escape(place.names[lang])}`,
      `LOCATION:${escape(place.address || place.names.ja)}`,
      `DESCRIPTION:${escape(includeNotes ? item.note || '' : '')}`,
      'END:VEVENT',
    )
  }
  return [...lines, 'END:VCALENDAR'].map(fold).join('\r\n') + '\r\n'
}
