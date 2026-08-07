"use client"

import NextImage, { type ImageProps } from "next/image"
import { useEffect, useState, type SyntheticEvent } from "react"

const FALLBACK_IMAGE = "/images/image-fallback.svg"

/**
 * Site-wide resilient image. A missing remote or static asset is replaced in
 * place, so an image request can never prevent the surrounding page from
 * rendering or remaining interactive.
 */
export default function AppImage({
  src,
  alt,
  onError,
  onContextMenu,
  onDragStart,
  ...props
}: ImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src)
  const [usingFallback, setUsingFallback] = useState(false)
  const [triedAlternateFormat, setTriedAlternateFormat] = useState(false)

  useEffect(() => {
    setCurrentSrc(src)
    setUsingFallback(false)
    setTriedAlternateFormat(false)
  }, [src])

  const handleError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    onError?.(event)
    if (!triedAlternateFormat && typeof currentSrc === "string" && /\.(webp|gif)(?=$|\?)/i.test(currentSrc)) {
      setTriedAlternateFormat(true)
      setCurrentSrc(currentSrc.replace(/\.(webp|gif)(?=$|\?)/i, extension => extension.toLowerCase() === ".webp" ? ".gif" : ".webp"))
      return
    }
    if (!usingFallback) {
      setUsingFallback(true)
      setCurrentSrc(FALLBACK_IMAGE)
    }
  }

  return (
    <NextImage
      {...props}
      src={currentSrc}
      alt={alt}
      unoptimized
      onError={handleError}
      draggable={false}
      onContextMenu={(event) => {
        event.preventDefault()
        onContextMenu?.(event)
      }}
      onDragStart={(event) => {
        event.preventDefault()
        onDragStart?.(event)
      }}
      data-image-fallback={usingFallback ? "true" : undefined}
    />
  )
}
