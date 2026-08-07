"use client"

import NextImage, { type ImageProps } from "next/image"
import { useEffect, useState, type SyntheticEvent } from "react"

const FALLBACK_IMAGE = "/images/image-fallback.svg"

/**
 * Site-wide resilient image. A missing remote or static asset is replaced in
 * place, so an image request can never prevent the surrounding page from
 * rendering or remaining interactive.
 */
export default function AppImage({ src, alt, onError, ...props }: ImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src)
  const [usingFallback, setUsingFallback] = useState(false)

  useEffect(() => {
    setCurrentSrc(src)
    setUsingFallback(false)
  }, [src])

  const handleError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    onError?.(event)
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
      data-image-fallback={usingFallback ? "true" : undefined}
    />
  )
}
