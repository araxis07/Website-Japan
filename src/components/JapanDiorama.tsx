'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import Image from 'next/image'
import type { Dictionary } from '@/i18n/dictionaries'
import type { createJapanScene, SceneOptions } from '@/lib/japan-scene'
import Icon from './Icon'

function subscribe(callback: () => void) {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)')
  query.addEventListener('change', callback)
  return () => query.removeEventListener('change', callback)
}
const reducedSnapshot = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const serverSnapshot = () => true

export default function JapanDiorama({ copy }: { copy: Dictionary['scene'] }) {
  const host = useRef<HTMLDivElement>(null)
  const scene = useRef<ReturnType<typeof createJapanScene> | null>(null)
  const settings = useRef<SceneOptions>({
    night: false,
    season: 0,
    moving: false,
  })
  const [status, setStatus] = useState('loading')
  const [night, setNight] = useState(false)
  const [season, setSeason] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = useSyncExternalStore(subscribe, reducedSnapshot, serverSnapshot)
  const moving = !paused && !reduced
  useEffect(() => {
    settings.current = { night, season, moving }
    scene.current?.update(settings.current)
  }, [night, season, moving])
  useEffect(() => {
    const element = host.current
    if (!element) return
    let cancelled = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        import('@/lib/japan-scene')
          .then(({ createJapanScene }) => {
            if (cancelled) return
            scene.current = createJapanScene(
              element,
              settings.current,
              () => setNight((value) => !value),
              () => setStatus('fallback'),
            )
            setStatus('ready')
          })
          .catch(() => {
            if (!cancelled) setStatus('fallback')
          })
      },
      { rootMargin: '100px' },
    )
    observer.observe(element)
    return () => {
      cancelled = true
      observer.disconnect()
      scene.current?.dispose()
      scene.current = null
    }
  }, [])
  return (
    <div
      className="diorama"
      data-night={night}
      data-season={season}
      data-scene-status={status}
      data-moving={moving}
    >
      <div className="scene-sky" aria-hidden="true">
        <span className="scene-sun" />
        <span className="scene-orbit" />
        <span className="scene-kanji" lang="ja">
          日本
        </span>
      </div>
      <div className="scene-heading">
        <span className="live-dot" />
        <span>{copy.title}</span>
        <span lang="ja">小さな日本</span>
      </div>
      <div className="scene-stage">
        {status !== 'ready' && (
          <div className="scene-fallback">
            <Image
              src="/images/fuji.jpg"
              alt={copy.description}
              fill
              loading="eager"
              sizes="(max-width: 800px) 100vw, 55vw"
            />
            <span>{status === 'loading' ? copy.loading : copy.fallback}</span>
          </div>
        )}
        <div
          ref={host}
          className="scene-canvas"
          role="img"
          aria-label={copy.description}
          hidden={status === 'fallback'}
        />
        <span className="scene-stamp" lang="ja" aria-hidden="true">
          旅<br />
          気分
        </span>
      </div>
      <div className="scene-controls">
        <div className="scene-seasons" role="group" aria-label={copy.seasonLabel}>
          {copy.seasons.map((name, index) => (
            <button
              key={name}
              type="button"
              aria-pressed={season === index}
              onClick={() => setSeason(index)}
              disabled={status !== 'ready'}
            >
              <span lang="ja" aria-hidden="true">
                {['春', '夏', '秋', '冬'][index]}
              </span>
              <span
                className={name === ['春', '夏', '秋', '冬'][index] ? 'sr-only' : undefined}
              >
                {name}
              </span>
            </button>
          ))}
        </div>
        <div className="scene-toolbar">
          <button
            className="light-switch"
            type="button"
            aria-pressed={night}
            onClick={() => setNight(!night)}
            disabled={status !== 'ready'}
          >
            <Icon name={night ? 'moon' : 'sun'} />
            {night ? copy.lightsOn : copy.lightsOff}
          </button>
          <div className="scene-tools">
            <button
              type="button"
              aria-label={copy.left}
              onClick={() => scene.current?.rotate(-0.25)}
              disabled={status !== 'ready'}
            >
              ↶
            </button>
            <button
              type="button"
              aria-label={copy.right}
              onClick={() => scene.current?.rotate(0.25)}
              disabled={status !== 'ready'}
            >
              ↷
            </button>
            <button
              type="button"
              aria-label={copy.reset}
              onClick={() => scene.current?.reset()}
              disabled={status !== 'ready'}
            >
              <Icon name="reset" />
            </button>
            <button
              type="button"
              aria-label={reduced ? copy.reduced : paused ? copy.play : copy.pause}
              aria-pressed={!moving}
              onClick={() => setPaused(!paused)}
              disabled={reduced || status !== 'ready'}
            >
              <Icon name={moving ? 'pause' : 'play'} />
            </button>
          </div>
        </div>
        <p className="scene-hint">
          {status === 'fallback' ? copy.fallback : reduced ? copy.reduced : copy.hint}
        </p>
      </div>
    </div>
  )
}
