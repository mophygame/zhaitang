"use client"

import NextImage, { type ImageProps } from "next/image"
import { useEffect, useState, type SyntheticEvent } from "react"

const FALLBACK_IMAGE = "/images/image-fallback.svg"

/**
 * Site-wide resilient image. A missing remote or static asset is replaced in
 * place, so an image request can never prevent the surrounding page from
 * rendering or remaining interactive.
 */
type AppImageProps = ImageProps & { fallbackSrc?: ImageProps["src"] }

export default function AppImage({
  src,
  fallbackSrc,
  alt,
  className,
  onLoad,
  onError,
  onContextMenu,
  onDragStart,
  ...props
}: AppImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)
  const [usingFallback, setUsingFallback] = useState(false)
  const [triedProvidedFallback, setTriedProvidedFallback] = useState(false)

  useEffect(() => {
    setCurrentSrc(src)
    setIsLoading(true)
    setUsingFallback(false)
    setTriedProvidedFallback(false)
  }, [src])

  const handleError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    onError?.(event)
    setIsLoading(true)
    if (!triedProvidedFallback && fallbackSrc) {
      setTriedProvidedFallback(true)
      setCurrentSrc(fallbackSrc)
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
      className={[className,isLoading?"app-image-pending":"app-image-ready"].filter(Boolean).join(" ")}
      unoptimized
      decoding={props.decoding??"async"}
      onLoad={(event)=>{
        setIsLoading(false)
        onLoad?.(event)
      }}
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
      data-image-loading={isLoading ? "true" : "false"}
    />
  )
}
