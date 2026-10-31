'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTripCopy } from './TripProvider'
import { places, placePath, mapUrl } from '@/data/places'
import SavePlace from './SavePlace'
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
  const topicsDisclosure = useRef<HTMLDetailsElement>(null)
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
  const { lang, tools } = useTripCopy()
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
          (topic) => {
            setTopic(topic)
            if (topicsDisclosure.current) topicsDisclosure.current.open = true
          },
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
  const topics =
    region === 'kyoto'
      ? {
          fuji: {
            label: tools.kyotoWalk,
            text: tools.kyotoWalkText,
            path: '/destinations/kyoto#place-kiyomizu',
          },
          torii: {
            label: tools.sceneTorii,
            text: tools.hotspotTorii,
            path: '/prefectures/kyoto#place-pref:kyoto:fushimi-inari-taisha',
          },
          sakura: {
            label: tools.kyotoSeason,
            text: tools.kyotoSeasonText,
            path: '/prefectures/kyoto',
          },
        }
      : region === 'hokkaido'
        ? {
            fuji: {
              label: tools.hokkaidoCity,
              text: tools.hokkaidoCityText,
              path: '/destinations/hokkaido#place-odori',
            },
            torii: {
              label: tools.hokkaidoMuseum,
              text: tools.hokkaidoMuseumText,
              path: '/destinations/hokkaido#place-hokkaido-museum',
            },
            sakura: {
              label: tools.hokkaidoSeason,
              text: tools.hotspotSakura,
              path: '/prefectures/hokkaido',
            },
          }
        : region === 'okinawa'
          ? {
              fuji: {
                label: tools.okinawaCity,
                text: tools.okinawaCityText,
                path: '/destinations/okinawa#place-makishi',
              },
              torii: {
                label: tools.okinawaCraft,
                text: tools.okinawaCraftText,
                path: '/destinations/okinawa#place-tsuboya',
              },
              sakura: {
                label: tools.okinawaMuseum,
                text: tools.okinawaMuseumText,
                path: '/destinations/okinawa#place-okinawa-museum',
              },
            }
          : {
              fuji: {
                label: tools.sceneFuji,
                text: tools.hotspotFuji,
                path: '/destinations/mount-fuji',
              },
              torii: {
                label: tools.sceneTorii,
                text: tools.hotspotTorii,
                path: '/prefectures/kyoto#place-pref:kyoto:fushimi-inari-taisha',
              },
              sakura: {
                label: tools.sceneSakura,
                text: tools.typicalSeason,
                path: '/prefectures/yamanashi',
              },
            }
  const topicPlace =
    places.find(
      (place) => placePath(place, lang) === `/${lang}${topics[topic].path}`,
    ) ||
    places.find(
      (place) =>
        place.id ===
        (region === 'kyoto'
          ? 'gion'
          : region === 'hokkaido'
            ? 'odori'
            : topic === 'fuji'
              ? 'destination:mount-fuji'
              : 'oishi'),
    )!
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
          <span>日</span>
          <span>本</span>
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
              sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 750px) 560px, (max-width: 1150px) 55vw, (max-width: 1376px) 57vw, 734px"
            />
          </div>
        )}
        <div
          ref={host}
          className="scene-canvas"
          role="img"
          aria-label={copy.description}
          aria-describedby={
            status === 'ready' ? 'scene-instructions' : undefined
          }
          hidden={status === 'preview' || status === 'fallback'}
        />
        <span className="scene-stamp" lang="ja" aria-hidden="true">
          旅<br />
          気分
        </span>
      </div>
      <div className="scene-controls">
        <label className="scene-region" hidden={status !== 'ready'}>
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
            <option value="okinawa">{tools.sceneOkinawa}</option>
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
          hidden={status !== 'ready'}
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
        <div className="scene-toolbar" hidden={status !== 'ready'}>
          <button
            className="light-switch"
            type="button"
            aria-pressed={night}
            aria-label={`${night ? copy.lightsOn : copy.lightsOff}: ${tools.sceneGlobalTheme}`}
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
              aria-label={`${reduced ? copy.reduced : !moving ? copy.play : copy.pause}: ${tools.sceneGlobalMotion}`}
              aria-pressed={!moving}
              onClick={toggleMotion}
              disabled={reduced || status !== 'ready'}
            >
              <Icon name={moving ? 'pause' : 'play'} />
            </button>
          </div>
        </div>
        {status === 'ready' && (
          <>
            <p className="source-note">
              {tools.sceneGlobalTheme} {tools.sceneGlobalMotion}
            </p>
            <p className="source-note" id="scene-instructions">
              {tools.sceneInstructions}
            </p>
          </>
        )}
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
      <details ref={topicsDisclosure} className="scene-topics-panel">
        <summary>{tools.sceneMore}</summary>
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
              {topics[key].label}
            </button>
          ))}
        </div>
        <p className="scene-topic" aria-live="polite">
          {topics[topic].text}{' '}
          <Link href={`/${lang}${topics[topic].path}`}>
            {tools.readTopic} ↗
          </Link>
        </p>
        <div className="scene-place-actions">
          <SavePlace id={topicPlace.id} name={topicPlace.names[lang]} />
          <a href={mapUrl(topicPlace)}>
            {tools.map}: {topicPlace.names[lang]} ↗
          </a>
        </div>
      </details>
    </div>
  )
}
