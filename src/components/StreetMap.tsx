'use client'

import { useEffect, useRef, useState } from 'react'
import type { Map as LeafletMap, Marker } from 'leaflet'
import type { Place } from '@/data/places'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'

export type MapPoint = Pick<Place, 'id' | 'coordinates' | 'names'>

export default function StreetMap({
  points,
  selected,
  onSelect,
  lang,
  copy,
  focusZoom,
}: {
  points: MapPoint[]
  selected?: string
  onSelect?: (id: string) => void
  lang: Locale
  copy: Dictionary['streetMap']
  focusZoom?: number
}) {
  const host = useRef<HTMLDivElement>(null)
  const map = useRef<LeafletMap | null>(null)
  const markers = useRef(new Map<string, Marker>())
  const callback = useRef(onSelect)
  const [status, setStatus] = useState('loading')
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    callback.current = onSelect
  }, [onSelect])
  useEffect(() => {
    const element = host.current
    if (!element || !points.length) return
    let cancelled = false
    let resize: ResizeObserver | undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        import('leaflet')
          .then((L) => {
            if (cancelled) return
            const instance = L.map(element, {
              zoomControl: false,
              scrollWheelZoom: false,
              minZoom: 3,
              maxZoom: 18,
              zoomAnimation: !window.matchMedia('(prefers-reduced-motion: reduce)')
                .matches,
            })
            map.current = instance
            instance.attributionControl.setPrefix(false)
            L.control
              .zoom({ zoomInTitle: copy.zoomIn, zoomOutTitle: copy.zoomOut })
              .addTo(instance)
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 19,
              attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            })
              .on('tileerror', () => {
                if (!cancelled) setStatus('error')
              })
              .addTo(instance)
            points.forEach((point, index) => {
              const label = document.createElement('span')
              label.textContent = point.names[lang]
              const marker = L.marker(point.coordinates, {
                title: point.names[lang],
                alt: point.names[lang],
                icon: L.divIcon({
                  className: 'street-marker',
                  html: `<span>${index + 1}</span>`,
                  iconSize: [36, 36],
                  iconAnchor: [18, 36],
                }),
              }).bindTooltip(label, { direction: 'top', offset: [0, -32] })
              marker.on('add', () => {
                const icon = marker.getElement()
                icon?.setAttribute('aria-label', `${index + 1}. ${point.names[lang]}`)
                icon?.addEventListener('keydown', (event) => {
                  if (event.key !== 'Enter' && event.key !== ' ') return
                  event.preventDefault()
                  event.stopPropagation()
                  callback.current?.(point.id)
                })
              })
              marker.on('click', () => callback.current?.(point.id))
              marker.addTo(instance)
              markers.current.set(point.id, marker)
            })
            instance.fitBounds(L.latLngBounds(points.map((point) => point.coordinates)), {
              padding: [35, 35],
              maxZoom: 14,
            })
            const overview = () => {
              element.dataset.overview = String(
                points.length > 10 && instance.getZoom() < 7,
              )
            }
            instance.on('zoomend', overview)
            overview()
            resize = new ResizeObserver(() => instance.invalidateSize())
            resize.observe(element)
            setStatus('ready')
          })
          .catch(() => {
            if (!cancelled) setStatus('error')
          })
      },
      { rootMargin: '150px' },
    )
    observer.observe(element)
    const markerStore = markers.current
    return () => {
      cancelled = true
      observer.disconnect()
      resize?.disconnect()
      map.current?.remove()
      map.current = null
      markerStore.clear()
    }
  }, [points, lang, copy, attempt])
  useEffect(() => {
    markers.current.forEach((marker, id) => {
      marker.getElement()?.classList.toggle('is-selected', id === selected)
      marker.getElement()?.setAttribute('aria-pressed', String(id === selected))
      if (id === selected) {
        marker.openTooltip()
        if (focusZoom)
          map.current?.setView(
            marker.getLatLng(),
            Math.max(map.current.getZoom(), focusZoom),
            {
              animate: false,
            },
          )
        else if (!map.current?.getBounds().contains(marker.getLatLng()))
          map.current?.panTo(marker.getLatLng(), { animate: false })
      }
    })
  }, [selected, status, focusZoom])
  return (
    <div className="street-map-wrap">
      <div ref={host} className="street-map" role="region" aria-label={copy.label} />
      {status === 'loading' && (
        <p className="map-status" role="status">
          {copy.loading}
        </p>
      )}
      {status === 'error' && (
        <div className="map-warning" role="status">
          <p>{copy.error}</p>
          <button
            type="button"
            onClick={() => {
              setStatus('loading')
              setAttempt((n) => n + 1)
            }}
          >
            {copy.retry}
          </button>
        </div>
      )}
      <noscript>
        <p>{copy.nojs}</p>
      </noscript>
      <p className="map-help">
        {copy.hint} <a href="https://www.openstreetmap.org/fixthemap">{copy.report}</a>
      </p>
    </div>
  )
}
