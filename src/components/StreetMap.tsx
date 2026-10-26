'use client'
import { useEffect, useRef, useState } from 'react'
import type { Map as LeafletMap, Marker } from 'leaflet'
import { mapProvider } from '../../map-provider.mjs'
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
  const focused = useRef<string | undefined>(undefined)
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
              zoomAnimation: false,
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
            const attribution = document.createElement('a')
            attribution.href = mapProvider.creditUrl
            attribution.textContent = mapProvider.creditName
            L.tileLayer(mapProvider.url, {
              maxZoom: 19,
              attribution: attribution.outerHTML,
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
            focused.current = undefined
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
    let cleanupMarkers = () => {}
    const overview = () => {
      if (host.current)
        host.current.dataset.overview = String(
          points.length > 10 && instance.getZoom() < 7,
        )
    }
    import('leaflet').then((L) => {
      if (cancelled) return
      const renderMarkers = () => {
        store.forEach((marker) => marker.remove())
        store.clear()
        const groups = new Map<string, MapPoint[]>()
        points.forEach((point) => {
          const pixel = instance.project(point.coordinates, instance.getZoom())
          const key =
            points.length > 10 && instance.getZoom() < 9
              ? `${Math.floor(pixel.x / 55)}:${Math.floor(pixel.y / 55)}`
              : point.id
          groups.set(key, [...(groups.get(key) || []), point])
        })
        groups.forEach((group) => {
          const point = group[0]
          const clustered = group.length > 1
          const label = document.createElement('span')
          label.textContent = group.map((p) => p.names[lang]).join(' · ')
          const coordinates: [number, number] = clustered
            ? [
                group.reduce((sum, p) => sum + p.coordinates[0], 0) /
                  group.length,
                group.reduce((sum, p) => sum + p.coordinates[1], 0) /
                  group.length,
              ]
            : point.coordinates
          const select = () => {
            if (clustered) {
              instance.fitBounds(
                group.map((p) => p.coordinates),
                {
                  padding: [45, 45],
                  maxZoom: Math.min(18, instance.getZoom() + 2),
                  animate: false,
                },
              )
              host.current?.focus({ preventScroll: true })
            } else callback.current?.(point.id)
          }
          const marker = L.marker(coordinates, {
            title: label.textContent,
            alt: label.textContent,
            icon: L.divIcon({
              className: `street-marker${clustered ? ' map-cluster' : ''}`,
              html: `<span>${clustered ? group.length : points.indexOf(point) + 1}</span>`,
              iconSize: [36, 36],
              iconAnchor: [18, 36],
            }),
          }).bindTooltip(label, { direction: 'top', offset: [0, -32] })
          marker.on('add', () => {
            const icon = marker.getElement()
            icon?.setAttribute(
              'aria-label',
              clustered
                ? `${group.length}: ${label.textContent}`
                : `${points.indexOf(point) + 1}. ${label.textContent}`,
            )
            icon?.addEventListener('keydown', (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                event.stopPropagation()
                select()
              }
            })
          })
          marker.on('click', select).addTo(instance)
          group.forEach((p) => store.set(p.id, marker))
        })
        setRevision((n) => n + 1)
      }
      renderMarkers()
      instance.on('zoomend', renderMarkers)
      cleanupMarkers = () => instance.off('zoomend', renderMarkers)
      if (!fitted.current && points.length) {
        instance.fitBounds(L.latLngBounds(points.map((p) => p.coordinates)), {
          padding: [35, 35],
          maxZoom: 14,
          animate: false,
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
      cleanupMarkers()
    }
  }, [points, instance, lang])
  useEffect(() => {
    if (!instance) return
    new Set(markers.current.values()).forEach((marker) => {
      marker.getElement()?.classList.remove('is-selected')
      marker.getElement()?.setAttribute('aria-pressed', 'false')
      marker.closeTooltip()
    })
    const marker = selected ? markers.current.get(selected) : undefined
    if (marker) {
      marker.getElement()?.classList.add('is-selected')
      marker.getElement()?.setAttribute('aria-pressed', 'true')
      marker.openTooltip()
    }
    if (marker && fitted.current && selected && selected !== focused.current) {
      const coordinates = points.find(
        (point) => point.id === selected,
      )?.coordinates
      if (!coordinates) return
      focused.current = selected
      if (
        focusZoom &&
        (instance.getZoom() < focusZoom ||
          !instance.getBounds().contains(coordinates))
      )
        instance.setView(coordinates, Math.max(instance.getZoom(), focusZoom), {
          animate: false,
        })
      else if (!instance.getBounds().contains(coordinates))
        instance.panTo(coordinates, { animate: false })
    }
    if (!selected) focused.current = undefined
  }, [selected, focusZoom, instance, revision, points])
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
        tabIndex={0}
        data-point-count={points.length}
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
        {tools?.mapLegend} {copy.hint}{' '}
        <a href="https://www.openstreetmap.org/fixthemap">{copy.report}</a>
      </p>
    </div>
  )
}
