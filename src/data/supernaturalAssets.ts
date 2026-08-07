export type DetectionModeId =
  | "基礎靈異檢測"
  | "異常存在檢測"
  | "空間污染檢測"
  | "深度顯影"

const fallbackOverlay = "/assets/supernatural/01.webp"

/**
 * Transparent single-subject overlays grouped by detection mode.
 * Add new static files here after placing them in assets/supernatural.
 */
export const supernaturalAssetPools: Record<DetectionModeId, readonly string[]> = {
  基礎靈異檢測: [fallbackOverlay],
  異常存在檢測: [fallbackOverlay],
  空間污染檢測: [fallbackOverlay],
  深度顯影: [fallbackOverlay],
}

export function pickSupernaturalAsset(mode: DetectionModeId) {
  const pool = supernaturalAssetPools[mode]
  return pool[Math.floor(Math.random() * pool.length)] ?? fallbackOverlay
}
