"use client"

import { useEffect, useRef, useState } from "react"
import {
  Download,
  RotateCcw,
  Share2,
  Trash2,
  Upload,
} from "@/components/shared/Icons"
import { GoldButton, useCommission } from "@/components/shared/UI"
import {
  pickSupernaturalAsset,
  type DetectionModeId,
} from "@/data/supernaturalAssets"
import { pickDetectionOutcome } from "@/data/detectionOutcomes"
import type { DetectionResult } from "@/types"

const detectionModes = [
  {
    id: "基礎靈異檢測",
    number: "01",
    description: "確認影像中是否存在低度異常殘留。",
  },
  {
    id: "異常存在檢測",
    number: "02",
    description: "辨識拍攝當下未登記於現場之存在。",
  },
  {
    id: "空間污染檢測",
    number: "03",
    description: "分析墨跡、視線、陰影及環境異常。",
  },
  {
    id: "深度顯影",
    number: "04",
    description: "提高影像顯影強度。部分結果可能超出原始拍攝內容。",
    warning: "⚠ 建議膽大者使用",
  },
] as const

export function PhotoUploader({
  url,
  onSelect,
  onRemove,
}: {
  url: string
  onSelect: (file: File) => void
  onRemove: () => void
}) {
  const [dragging, setDragging] = useState(false)

  return (
    <div
      className={`uploader ${dragging ? "drag" : ""}`}
      onDragOver={(event) => {
        event.preventDefault()
        setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => {
        event.preventDefault()
        setDragging(false)
        const file = event.dataTransfer.files[0]
        if (file?.type.startsWith("image/")) onSelect(file)
      }}
    >
      {url ? (
        <>
          <span className="source-image-label">原始影像／尚未套用檢測效果</span>
          <img
            src={url}
            alt="待檢測照片預覽"
            draggable={false}
            onContextMenu={(event) => event.preventDefault()}
            onDragStart={(event) => event.preventDefault()}
          />
          <button onClick={onRemove} aria-label="移除照片">
            <Trash2 /> 移除
          </button>
        </>
      ) : (
        <label>
          <Upload />
          <b>將影像拖曳至封存區</b>
          <span>或點擊選擇 JPG、PNG、WebP</span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) => {
              const file = event.target.files?.[0]
              if (file) onSelect(file)
            }}
          />
        </label>
      )}
    </div>
  )
}

export function ScanAnimation() {
  return (
    <div className="scan" role="status">
      <span />
      <div>
        <p>正在讀取影像殘留……</p>
        <p>正在比對非登記輪廓……</p>
        <p>正在分析空間視線……</p>
      </div>
    </div>
  )
}

export function PhotoEffectCanvas({
  url,
  mode,
  result,
  canvasRef,
}: {
  url: string
  mode: string
  result: DetectionResult
  canvasRef: React.RefObject<HTMLCanvasElement | null>
}) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !url) return

    const context = canvas.getContext("2d")
    const photo = new Image()

    photo.onload = () => {
      canvas.width = photo.naturalWidth
      canvas.height = photo.naturalHeight
      if (!context) return

      const width = canvas.width
      const height = canvas.height
      const unit = Math.max(1, Math.min(width, height) / 900)

      // Start from the untouched upload, then apply restrained forensic grading.
      context.drawImage(photo, 0, 0)
      const grade = context.createLinearGradient(0, 0, width, height)
      grade.addColorStop(0, "rgba(20,38,45,.12)")
      grade.addColorStop(.55, "rgba(7,13,17,.03)")
      grade.addColorStop(1, "rgba(34,24,18,.11)")
      context.fillStyle = grade
      context.fillRect(0, 0, width, height)

      const drawVignette = (strength: number) => {
        const vignette = context.createRadialGradient(
          width / 2,
          height / 2,
          Math.min(width, height) * .18,
          width / 2,
          height / 2,
          Math.max(width, height) * .7,
        )
        vignette.addColorStop(.52, "rgba(2,5,7,0)")
        vignette.addColorStop(1, `rgba(2,5,7,${strength})`)
        context.fillStyle = vignette
        context.fillRect(0, 0, width, height)
      }

      const drawFineGrain = () => {
        let seed = Number(result.caseNumber.replace(/\D/g, "")) || 17
        const random = () => {
          seed = (seed * 1664525 + 1013904223) % 4294967296
          return seed / 4294967296
        }
        context.save()
        context.fillStyle = "rgba(226,232,226,.12)"
        for (let index = 0; index < 720; index += 1) {
          const grainSize = random() > .88 ? 1.5 * unit : .65 * unit
          context.globalAlpha = .025 + random() * .055
          context.fillRect(random() * width, random() * height, grainSize, grainSize)
        }
        context.restore()
      }

      const drawCornerBrackets = (x: number, y: number, boxWidth: number, boxHeight: number) => {
        const length = Math.min(boxWidth, boxHeight) * .2
        context.save()
        context.strokeStyle = mode.includes("深度") ? "rgba(181,154,98,.76)" : "rgba(139,55,55,.72)"
        context.lineWidth = Math.max(1.2, 1.2 * unit)
        context.setLineDash([])
        ;[
          [x + length, y, x, y, x, y + length],
          [x + boxWidth - length, y, x + boxWidth, y, x + boxWidth, y + length],
          [x, y + boxHeight - length, x, y + boxHeight, x + length, y + boxHeight],
          [x + boxWidth - length, y + boxHeight, x + boxWidth, y + boxHeight, x + boxWidth, y + boxHeight - length],
        ].forEach((points) => {
          context.beginPath()
          context.moveTo(points[0], points[1])
          context.lineTo(points[2], points[3])
          context.lineTo(points[4], points[5])
          context.stroke()
        })
        context.restore()
      }

      const drawRecordMark = () => {
        const fontSize = Math.max(12, width / 62)
        const text = result.isAnomalous
          ? `ZHAITANG  ${result.caseNumber}  /  UNREGISTERED`
          : `ZHAITANG  ${result.caseNumber}  /  CLEAR`
        context.save()
        context.font = `500 ${fontSize}px monospace`
        const textWidth = context.measureText(text).width
        const plateX = width * .055
        const plateY = height * .9
        context.fillStyle = "rgba(5,9,11,.72)"
        context.fillRect(plateX - 10 * unit, plateY - fontSize * 1.25, textWidth + 20 * unit, fontSize * 1.8)
        context.fillStyle = result.isAnomalous ? "rgba(219,205,172,.9)" : "rgba(205,214,210,.88)"
        context.fillText(text, plateX, plateY)
        context.restore()
      }

      if (!result.isAnomalous || !result.effect) {
        drawVignette(.25)
        drawFineGrain()
        drawRecordMark()
        return
      }

      const effect = result.effect
      const anchorX = width * effect.x
      const anchorY = height * effect.y

      if (mode.includes("基礎")) {
        const glow = context.createRadialGradient(
          anchorX,
          anchorY,
          0,
          anchorX,
          anchorY,
          Math.min(width, height) * .24,
        )
        glow.addColorStop(0, "rgba(164,207,215,.16)")
        glow.addColorStop(.45, "rgba(111,151,159,.07)")
        glow.addColorStop(1, "rgba(174,209,214,0)")
        context.fillStyle = glow
        context.fillRect(0, 0, width, height)
      }

      if (mode.includes("空間污染")) {
        // Layer several translucent blooms instead of drawing obvious symbols.
        ;[
          [anchorX, anchorY, .2],
          [width * (effect.x + .12), height * (effect.y + .08), .13],
          [width * (effect.x - .07), height * (effect.y + .2), .1],
        ].forEach(([x, y, radius], index) => {
          const bloom = context.createRadialGradient(x, y, 0, x, y, Math.min(width, height) * radius)
          bloom.addColorStop(0, `rgba(3,6,7,${.22 - index * .035})`)
          bloom.addColorStop(.5, `rgba(8,13,14,${.11 - index * .018})`)
          bloom.addColorStop(1, "rgba(8,13,14,0)")
          context.fillStyle = bloom
          context.fillRect(0, 0, width, height)
        })
      }

      if (mode.includes("深度顯影")) {
        context.fillStyle = "rgba(3,7,10,.15)"
        context.fillRect(0, 0, width, height)
        context.fillStyle = "rgba(201,190,157,.035)"
        const scanGap = Math.max(4, Math.round(6 * unit))
        for (let y = 0; y < height; y += scanGap) {
          context.fillRect(0, y, width, Math.max(1, unit * .45))
        }
      }

      const spirit = new Image()
      spirit.onload = () => {
        if (!result.effect) return
        const size = Math.min(width, height) * effect.scale
        const ratio = spirit.naturalHeight / spirit.naturalWidth
        const drawWidth = size
        const drawHeight = size * ratio
        const centerX = anchorX + drawWidth / 2
        const centerY = anchorY + drawHeight / 2

        // Diffused silhouette integrates the subject into the photographed light.
        context.save()
        context.globalAlpha = effect.opacity * .55
        context.filter = `blur(${Math.max(5, 8 * unit)}px) saturate(.45) brightness(.7)`
        context.translate(centerX, centerY)
        context.rotate(effect.rotation)
        context.drawImage(spirit, -drawWidth * .53, -drawHeight * .51, drawWidth * 1.06, drawHeight * 1.06)
        context.restore()

        if (mode.includes("深度顯影")) {
          context.save()
          context.globalCompositeOperation = "screen"
          context.globalAlpha = effect.opacity * .14
          context.filter = "hue-rotate(155deg) saturate(1.8)"
          context.drawImage(spirit, anchorX - 3 * unit, anchorY, drawWidth, drawHeight)
          context.filter = "hue-rotate(325deg) saturate(1.4)"
          context.drawImage(spirit, anchorX + 3 * unit, anchorY, drawWidth, drawHeight)
          context.restore()
        }

        context.save()
        context.globalAlpha = effect.opacity
        context.filter = mode.includes("基礎")
          ? "grayscale(.2) saturate(.72) contrast(.94)"
          : "grayscale(.42) saturate(.55) contrast(1.05)"
        context.translate(centerX, centerY)
        context.rotate(effect.rotation)
        context.drawImage(spirit, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight)
        context.restore()

        if (mode.includes("異常存在") || mode.includes("深度顯影")) {
          drawCornerBrackets(anchorX, anchorY, drawWidth, drawHeight)
        }

        drawVignette(mode.includes("深度") ? .52 : .38)
        drawFineGrain()
        drawRecordMark()
      }
      spirit.onerror = drawRecordMark
      spirit.src = result.effect.assetPath
    }
    photo.src = url
  }, [canvasRef, mode, result, url])

  return (
    <canvas
      ref={canvasRef}
      className="effect-canvas"
      aria-label={result.isAnomalous ? "發現異常的影像檢測結果" : "未發現異常的影像檢測結果"}
      draggable={false}
      onContextMenu={(event) => event.preventDefault()}
      onDragStart={(event) => event.preventDefault()}
    />
  )
}

export function DetectionReport({ result }: { result: DetectionResult }) {
  return (
    <div className={`report ${result.isAnomalous ? "report-anomaly" : "report-clear"}`}>
      <div>
        <span>CASE</span>
        <b>{result.caseNumber}</b>
      </div>
      <div>
        <span>檢測狀態</span>
        <b>{result.isAnomalous ? "發現異常" : "未見異常"}</b>
      </div>
      {[
        ["污染指數", `${result.pollution}%`],
        ["異常視線", String(result.gazes)],
        ["未登記存在", String(result.entities)],
        ["墨跡殘留", result.ink],
        ["空間穩定度", `${result.stability}%`],
      ].map(([label, value]) => (
        <div key={label}>
          <span>{label}</span>
          <b>{value}</b>
        </div>
      ))}
      <blockquote>{result.verdict}</blockquote>
    </div>
  )
}

export function PhotoLab() {
  const [url, setUrl] = useState("")
  const [mode, setMode] = useState<DetectionModeId>("基礎靈異檢測")
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState<DetectionResult | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const detectionOutputRef = useRef<HTMLDivElement>(null)
  const scanRunRef = useRef(0)
  const commission = useCommission()
  const completedResult = scanning ? null : result

  useEffect(() => () => {
    scanRunRef.current += 1
  }, [])

  const clearDetection = () => {
    scanRunRef.current += 1
    setScanning(false)
    setResult(null)
  }

  const upload = (file: File) => {
    clearDetection()
    if (url) URL.revokeObjectURL(url)
    setUrl(URL.createObjectURL(file))
  }

  const scan = () => {
    if (!url) return
    const scanRun = scanRunRef.current + 1
    scanRunRef.current = scanRun
    setScanning(true)
    setResult(null)
    requestAnimationFrame(() => {
      detectionOutputRef.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      })
    })

    setTimeout(() => {
      if (scanRunRef.current !== scanRun) return
      const outcome = pickDetectionOutcome(mode)
      const isAnomalous = outcome.isAnomalous
      const pollutionRange = outcome.severity === "high"
        ? [76, 96]
        : outcome.severity === "medium"
          ? [48, 78]
          : outcome.severity === "low"
            ? [20, 49]
            : [2, 18]
      const pollution = pollutionRange[0] + Math.floor(Math.random() * (pollutionRange[1] - pollutionRange[0] + 1))

      setResult({
        caseNumber: `AUTO-${Math.floor(100000 + Math.random() * 899999)}`,
        isAnomalous,
        pollution,
        gazes: !isAnomalous ? 0 : outcome.severity === "high" ? 2 + Math.floor(Math.random() * 3) : 1 + Math.floor(Math.random() * 2),
        entities: !isAnomalous ? 0 : outcome.severity === "high" ? 1 + Math.floor(Math.random() * 2) : 1,
        ink: !isAnomalous ? "未檢出" : outcome.severity === "high" ? "高度" : outcome.severity === "medium" ? "中度" : "低度",
        stability: isAnomalous
          ? Math.max(8, 100 - pollution + Math.floor(Math.random() * 9))
          : 88 + Math.floor(Math.random() * 12),
        verdict: outcome.verdict,
        effect: isAnomalous
          ? {
              assetPath: pickSupernaturalAsset(mode),
              x: 0.08 + Math.random() * 0.64,
              y: 0.08 + Math.random() * 0.48,
              scale: 0.13 + Math.random() * 0.18,
              opacity: 0.2 + Math.random() * 0.25,
              rotation: (Math.random() - 0.5) * 0.28,
            }
          : null,
      })
      setScanning(false)
    }, 2400)
  }

  const download = () => {
    const anchor = document.createElement("a")
    anchor.download = `zhaitang-${result?.caseNumber}.png`
    anchor.href = canvasRef.current?.toDataURL("image/png") ?? ""
    anchor.click()
  }

  const share = async () => {
    const text = `齋堂靈異影像檢測 ${result?.caseNumber}：${result?.verdict}`
    if (navigator.share) await navigator.share({ title: "靈異影像檢測", text })
    else await navigator.clipboard.writeText(text)
  }

  return (
    <div className="photo-lab">
      <PhotoUploader
        url={url}
        onSelect={upload}
        onRemove={() => {
          clearDetection()
          if (url) URL.revokeObjectURL(url)
          setUrl("")
        }}
      />
      <div className="mode-panel">
        <p className="kicker">DETECTION MODE</p>
        <h3>選擇檢測模式</h3>
        {detectionModes.map((item) => (
          <label key={item.id}>
            <input
              type="radio"
              name="mode"
              checked={mode === item.id}
              onChange={() => {
                clearDetection()
                setMode(item.id as DetectionModeId)
              }}
            />
            <span>
              <strong>{item.number}｜{item.id}</strong>
              {"warning" in item && <em>{item.warning}</em>}
              <small>「{item.description}」</small>
            </span>
          </label>
        ))}
        <GoldButton onClick={scan} className={!url ? "disabled" : ""}>
          開始檢測
        </GoldButton>
        <p className="privacy">
          每次結果皆可能不同。上傳之影像僅在目前瀏覽器中處理，不會儲存或傳送至齋堂伺服器。
        </p>
      </div>
      <div ref={detectionOutputRef} className="detection-output-anchor" aria-hidden="true" />
      {scanning && <ScanAnimation />}
      {completedResult && (
        <div className="result" key={completedResult.caseNumber}>
          <PhotoEffectCanvas
            url={url}
            mode={mode}
            result={completedResult}
            canvasRef={canvasRef}
          />
          <DetectionReport result={completedResult} />
          <div className="result-actions">
            <button onClick={download}>
              <Download />下載檢測結果
            </button>
            <button onClick={share}>
              <Share2 />分享結果
            </button>
            <button
              onClick={() => {
                clearDetection()
                if (url) URL.revokeObjectURL(url)
                setUrl("")
              }}
            >
              <RotateCcw />重新上傳
            </button>
            <button onClick={commission.open}>委託齋堂</button>
          </div>
        </div>
      )}
    </div>
  )
}
