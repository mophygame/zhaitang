export type DetectionModeId =
  | "基礎靈異檢測"
  | "異常存在檢測"
  | "空間污染檢測"
  | "深度顯影"

const fallbackOverlay = "/assets/supernatural/01.webp"
const subtleOverlays = [
  "/assets/supernatural/03.webp",
  "/assets/supernatural/04.webp",
  "/assets/supernatural/05.webp",
  "/assets/supernatural/06.webp",
  "/assets/supernatural/07.webp",
] as const
const pronouncedOverlays = [
  fallbackOverlay,
  "/assets/supernatural/02.webp",
] as const

/**
 * Transparent single-subject overlays grouped by detection mode.
 * Add new static files here after placing them in assets/supernatural.
 */
export const supernaturalAssetPools: Record<DetectionModeId, readonly string[]> = {
  基礎靈異檢測: subtleOverlays,
  異常存在檢測: [...pronouncedOverlays,...subtleOverlays],
  空間污染檢測: [...subtleOverlays,...pronouncedOverlays],
  深度顯影: [...pronouncedOverlays,...subtleOverlays],
}

export function pickSupernaturalAsset(mode: DetectionModeId) {
  const pool = supernaturalAssetPools[mode]
  return pool[Math.floor(Math.random() * pool.length)] ?? fallbackOverlay
}
