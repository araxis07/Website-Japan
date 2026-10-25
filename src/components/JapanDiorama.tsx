'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTrip } from './TripProvider'
import type { Dictionary } from '@/i18n/dictionaries'
import type {
  createJapanScene,
  SceneOptions,
  SceneRegion,
} from '@/lib/japan-scene'
import Icon from './Icon'
import { useAtmosphere } from './Atmosphere'

export default function JapanDiorama({ copy }: { copy: Dictionary['scene'] }) {
  const host = useRef<HTMLDivElement>(null)
  const scene = useRef<ReturnType<typeof createJapanScene> | null>(null)
  const settings = useRef<SceneOptions>({
    night: false,
    season: 0,
    moving: false,
  })
  const [status, setStatus] = useState('preview')
  const [requested, setRequested] = useState(false)
  const { theme, toggleTheme, moving, reduced, toggleMotion } = useAtmosphere()
  const lightToggle = useRef(toggleTheme)
  const night = theme === 'dark'
  const [season, setSeason] = useState(0)
  const [region, setRegion] = useState<SceneRegion>('fuji')
  const [topic, setTopic] = useState<'fuji' | 'torii' | 'sakura'>('fuji')
  const { lang, tools } = useTrip()
  useEffect(() => {
    lightToggle.current = toggleTheme
    settings.current = { night, season, moving, region }
    scene.current?.update(settings.current)
  }, [night, season, moving, region, toggleTheme])
  useEffect(() => {
    const element = host.current
    if (!element || !requested) return
    let cancelled = false
    import('@/lib/japan-scene')
      .then(({ createJapanScene }) => {
        if (cancelled) return
        scene.current = createJapanScene(
          element,
          settings.current,
          () => lightToggle.current(),
          () => setStatus('fallback'),
          setTopic,
        )
        setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('fallback')
      })
    return () => {
      cancelled = true
      scene.current?.dispose()
      scene.current = null
    }
  }, [requested])
  return (
    <div
      className="diorama"
      data-night={night}
      data-season={season}
      data-region={region}
      data-scene-status={status}
      data-moving={moving && status === 'ready'}
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
              src="/images/miniature.png"
              alt={copy.description}
              fill
              loading="eager"
              sizes="(max-width: 800px) 100vw, 55vw"
            />
          </div>
        )}
        <div
          ref={host}
          className="scene-canvas"
          role="img"
          aria-label={copy.description}
          hidden={status === 'preview' || status === 'fallback'}
        />
        <span className="scene-stamp" lang="ja" aria-hidden="true">
          旅<br />
          気分
        </span>
      </div>
      <div className="scene-controls">
        <label className="scene-region">
          {tools.sceneRegion}
          <select
            value={region}
            onChange={(e) => {
              const region = e.target.value as SceneRegion
              setRegion(region)
              setTopic(
                region === 'fuji'
                  ? 'fuji'
                  : region === 'kyoto'
                    ? 'torii'
                    : 'sakura',
              )
            }}
            disabled={status !== 'ready'}
          >
            <option value="fuji">{tools.sceneFuji}</option>
            <option value="kyoto">{tools.sceneKyoto}</option>
            <option value="hokkaido">{tools.sceneHokkaido}</option>
          </select>
        </label>
        {status === 'preview' && (
          <button
            type="button"
            className="scene-start"
            onClick={() => {
              setStatus('loading')
              setRequested(true)
            }}
          >
            <Icon name="play" />
            {copy.start}
          </button>
        )}
        <div
          className="scene-seasons"
          role="group"
          aria-label={copy.seasonLabel}
        >
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
                className={
                  name === ['春', '夏', '秋', '冬'][index]
                    ? 'sr-only'
                    : undefined
                }
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
            onClick={toggleTheme}
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
              aria-label={
                reduced ? copy.reduced : !moving ? copy.play : copy.pause
              }
              aria-pressed={!moving}
              onClick={toggleMotion}
              disabled={reduced || status !== 'ready'}
            >
              <Icon name={moving ? 'pause' : 'play'} />
            </button>
          </div>
        </div>
        <p className="scene-hint" role="status">
          {status === 'loading'
            ? copy.loading
            : status === 'fallback'
              ? copy.fallback
              : status === 'preview'
                ? copy.preview
                : reduced
                  ? copy.reduced
                  : copy.hint}
        </p>
      </div>
      <div
        className="scene-hotspots"
        role="group"
        aria-label={tools.sceneExplore}
      >
        {(['fuji', 'torii', 'sakura'] as const).map((key) => (
          <button
            key={key}
            type="button"
            aria-pressed={topic === key}
            onClick={() => setTopic(key)}
          >
            {key === 'fuji'
              ? tools.sceneFuji
              : key === 'torii'
                ? tools.sceneTorii
                : tools.sceneSakura}
          </button>
        ))}
      </div>
      <p className="scene-topic" aria-live="polite">
        {topic === 'fuji'
          ? tools.hotspotFuji
          : topic === 'torii'
            ? tools.hotspotTorii
            : tools.hotspotSakura}{' '}
        <Link
          href={
            topic === 'fuji'
              ? `/${lang}/destinations/mount-fuji`
              : topic === 'torii'
                ? `/${lang}/prefectures/kyoto#place-pref:kyoto:fushimi-inari-taisha`
                : `/${lang}/prefectures/hokkaido`
          }
        >
          {tools.readTopic} ↗
        </Link>
      </p>
    </div>
  )
}
