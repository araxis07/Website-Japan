'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import type { Photo } from '@/data/photos'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'

export default function PhotoGallery({
  photos,
  lang,
  copy,
}: {
  photos: Photo[]
  lang: Locale
  copy: Dictionary['guide']
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLAnchorElement | null>(null)
  const [index, setIndex] = useState<number | null>(null)
  useEffect(() => {
    if (index === null) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [index])
  const next = (amount: number) =>
    setIndex(
      (current) => ((current ?? 0) + amount + photos.length) % photos.length,
    )
  return (
    <>
      <div className="photo-gallery">
        {photos.map((photo, i) => (
          <figure key={photo.src}>
            <a
              href={photo.src}
              aria-label={`${copy.photo}: ${photo.alt[lang]}`}
              onClick={(event) => {
                event.preventDefault()
                trigger.current = event.currentTarget
                setIndex(i)
                dialog.current?.showModal()
              }}
            >
              <Image
                src={photo.src}
                alt={photo.alt[lang]}
                width={1000}
                height={700}
                // The first photo repeats the cover; reuse its request and loading policy.
                loading={i === 0 ? 'eager' : 'lazy'}
                sizes={
                  i === 0
                    ? '(max-width: 700px) 100vw, 50vw'
                    : '(max-width: 700px) 100vw, 45vw'
                }
              />
              <span aria-hidden="true">↗</span>
            </a>
            <figcaption>
              {photo.alt[lang]}
              {photo.source && (
                <small className="field-source">
                  <a href={photo.source}>{photo.artist}</a> ·{' '}
                  <a href={photo.licenseUrl}>{photo.license}</a>
                </small>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="photo-dialog"
        aria-labelledby="photo-caption"
        onClose={() => {
          setIndex(null)
          trigger.current?.focus()
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close()
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') {
            event.preventDefault()
            next(1)
          }
          if (event.key === 'ArrowLeft') {
            event.preventDefault()
            next(-1)
          }
        }}
      >
        {index !== null && (
          <div className="photo-dialog-inner">
            <button
              className="photo-close"
              type="button"
              onClick={() => dialog.current?.close()}
            >
              {copy.close} ×
            </button>
            <Image
              src={photos[index].src}
              alt={photos[index].alt[lang]}
              width={1400}
              height={1000}
              sizes="95vw"
            />
            <h2 id="photo-caption">{photos[index].alt[lang]}</h2>
            <div className="photo-dialog-controls">
              <button type="button" onClick={() => next(-1)}>
                {copy.previous}
              </button>
              <span>
                {index + 1} / {photos.length}
              </span>
              <button type="button" onClick={() => next(1)}>
                {copy.next}
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  )
}
