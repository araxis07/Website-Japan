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
  tools,
}: {
  points: MapPoint[]
  selected?: string
  onSelect?: (id: string) => void
  lang: Locale
  copy: Dictionary['streetMap']
  focusZoom?: number
  tools?: Dictionary['tools']
}) {
  const host = useRef<HTMLDivElement>(null)
  const markers = useRef(new Map<string, Marker>())
  const callback = useRef(onSelect)
  const fitted = useRef(false)
  const [instance, setInstance] = useState<LeafletMap | null>(null)
  const [status, setStatus] = useState('loading')
  const [attempt, setAttempt] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const [revision, setRevision] = useState(0)
  useEffect(() => {
    callback.current = onSelect
  }, [onSelect])
  useEffect(() => {
    const element = host.current
    if (!element) return
    let cancelled = false,
      failed = false
    let map: LeafletMap | undefined,
      resize: ResizeObserver | undefined,
      timer: ReturnType<typeof setTimeout> | undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        import('leaflet')
          .then((L) => {
            if (cancelled) return
            map = L.map(element, {
              zoomControl: false,
              scrollWheelZoom: false,
              minZoom: 3,
              maxZoom: 18,
              zoomAnimation: !matchMedia('(prefers-reduced-motion: reduce)')
                .matches,
            }).setView([36, 138], 5)
            const current = map
            map.attributionControl.setPrefix(false)
            L.control
              .zoom({ zoomInTitle: copy.zoomIn, zoomOutTitle: copy.zoomOut })
              .addTo(map)
            const error = () => {
              if (!cancelled) {
                failed = true
                setStatus('error')
              }
            }
            timer = setTimeout(error, 15000)
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 19,
              attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            })
              .on('tileerror', error)
              .on('load', () => {
                clearTimeout(timer)
                if (!cancelled && !failed) setStatus('ready')
              })
              .addTo(map)
            resize = new ResizeObserver(() => current.invalidateSize())
            resize.observe(element)
            fitted.current = false
            setInstance(map)
          })
          .catch(() => {
            if (!cancelled) setStatus('error')
          })
      },
      { rootMargin: '150px' },
    )
    observer.observe(element)
    return () => {
      cancelled = true
      clearTimeout(timer)
      observer.disconnect()
      resize?.disconnect()
      map?.remove()
    }
  }, [copy, attempt])
  useEffect(() => {
    if (!instance) return
    let cancelled = false
    const store = markers.current
    const overview = () => {
      if (host.current)
        host.current.dataset.overview = String(
          points.length > 10 && instance.getZoom() < 7,
        )
    }
    import('leaflet').then((L) => {
      if (cancelled) return
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
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              event.stopPropagation()
              callback.current?.(point.id)
            }
          })
        })
        marker.on('click', () => callback.current?.(point.id)).addTo(instance)
        store.set(point.id, marker)
      })
      if (!fitted.current && points.length) {
        instance.fitBounds(L.latLngBounds(points.map((p) => p.coordinates)), {
          padding: [35, 35],
          maxZoom: 14,
        })
        fitted.current = true
      }
      instance.on('zoomend', overview)
      overview()
      setRevision((n) => n + 1)
    })
    return () => {
      cancelled = true
      store.forEach((marker) => marker.remove())
      store.clear()
      instance.off('zoomend', overview)
    }
  }, [points, instance, lang])
  useEffect(() => {
    if (!instance) return
    markers.current.forEach((marker, id) => {
      marker.getElement()?.classList.toggle('is-selected', id === selected)
      marker.getElement()?.setAttribute('aria-pressed', String(id === selected))
      if (id === selected) {
        marker.openTooltip()
        if (focusZoom)
          instance.setView(
            marker.getLatLng(),
            Math.max(instance.getZoom(), focusZoom),
            { animate: false },
          )
        else if (!instance.getBounds().contains(marker.getLatLng()))
          instance.panTo(marker.getLatLng(), { animate: false })
      } else marker.closeTooltip()
    })
  }, [selected, focusZoom, instance, revision])
  const fit = () => {
    if (instance && points.length)
      instance.fitBounds(
        points.map((p) => p.coordinates),
        { padding: [35, 35], maxZoom: 14, animate: false },
      )
  }
  return (
    <div className="street-map-wrap" data-expanded={expanded}>
      {tools && (
        <div className="map-toolbar">
          <button type="button" onClick={fit}>
            {tools.fit}
          </button>
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? tools.closeMap : tools.fullMap}
          </button>
        </div>
      )}
      <div
        ref={host}
        className="street-map"
        role="region"
        aria-label={copy.label}
      />
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
              setInstance(null)
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
        {copy.hint}{' '}
        <a href="https://www.openstreetmap.org/fixthemap">{copy.report}</a>
      </p>
    </div>
  )
}
