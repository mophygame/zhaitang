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
import type { DetectionResult } from "@/types"

const spiritAsset = "/images/effects/cute-spirit-v2.png"

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
          <img src={url} alt="待檢測照片預覽" />
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
      context?.drawImage(photo, 0, 0)
      if (!context) return

      const width = canvas.width
      const height = canvas.height

      context.strokeStyle = result.isAnomalous ? "#7b2626" : "#b59a62"
      context.lineWidth = Math.max(2, width / 500)
      context.strokeRect(width * 0.08, height * 0.08, width * 0.84, height * 0.84)

      const drawRecordMark = () => {
        context.fillStyle = "rgba(234,229,218,.82)"
        context.font = `${Math.max(16, width / 48)}px monospace`
        context.fillText(
          result.isAnomalous
            ? `ZHAITANG / ${mode} / UNREGISTERED`
            : "ZHAITANG / NO ANOMALY DETECTED",
          width * 0.1,
          height * 0.92,
        )
      }

      if (!result.isAnomalous || !result.effect) {
        drawRecordMark()
        return
      }

      context.fillStyle = "rgba(4,8,10,.12)"
      context.fillRect(0, 0, width, height)

      if (mode.includes("墨蝶")) {
        context.fillStyle = "rgba(5,5,5,.48)"
        context.font = `${Math.max(18, width / 34)}px serif`
        ;["蝶", "契", "留"].forEach((text, index) => {
          context.fillText(text, width * (0.12 + index * 0.16), height * (0.2 + (index % 2) * 0.2))
        })
      }

      if (mode.includes("員工")) {
        context.strokeStyle = "rgba(181,154,98,.54)"
        for (let index = 0; index < 5; index += 1) {
          context.beginPath()
          context.moveTo(width * 0.05, height * (0.18 + index * 0.12))
          context.lineTo(width * (0.62 + index * 0.04), height * (0.08 + index * 0.13))
          context.stroke()
        }
      }

      const spirit = new Image()
      spirit.onload = () => {
        if (!result.effect) return
        const size = Math.min(width, height) * result.effect.scale
        const ratio = spirit.naturalHeight / spirit.naturalWidth
        const drawWidth = size
        const drawHeight = size * ratio
        const centerX = width * result.effect.x + drawWidth / 2
        const centerY = height * result.effect.y + drawHeight / 2

        context.save()
        context.globalAlpha = result.effect.opacity
        context.translate(centerX, centerY)
        context.rotate(result.effect.rotation)
        context.drawImage(spirit, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight)
        context.restore()

        if (mode.includes("視線") || mode.includes("隨機")) {
          context.strokeStyle = "rgba(123,38,38,.62)"
          context.strokeRect(width * result.effect.x, height * result.effect.y, drawWidth, drawHeight)
        }

        drawRecordMark()
      }
      spirit.src = spiritAsset
    }
    photo.src = url
  }, [canvasRef, mode, result, url])

  return (
    <canvas
      ref={canvasRef}
      className="effect-canvas"
      aria-label={result.isAnomalous ? "發現異常的影像檢測結果" : "未發現異常的影像檢測結果"}
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
  const [mode, setMode] = useState("隨機異常")
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState<DetectionResult | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const commission = useCommission()

  const upload = (file: File) => {
    if (url) URL.revokeObjectURL(url)
    setUrl(URL.createObjectURL(file))
    setResult(null)
  }

  const scan = () => {
    if (!url) return
    setScanning(true)
    setResult(null)

    setTimeout(() => {
      const anomalyChance = mode === "隨機異常" ? 0.62 : 0.76
      const isAnomalous = Math.random() < anomalyChance
      const pollution = isAnomalous
        ? 48 + Math.floor(Math.random() * 48)
        : 2 + Math.floor(Math.random() * 16)

      setResult({
        caseNumber: `AUTO-${Math.floor(100000 + Math.random() * 899999)}`,
        isAnomalous,
        pollution,
        gazes: isAnomalous ? 1 + Math.floor(Math.random() * 3) : 0,
        entities: isAnomalous ? 1 : 0,
        ink: isAnomalous ? (pollution > 74 ? "高度" : "低度") : "未檢出",
        stability: isAnomalous
          ? Math.max(8, 100 - pollution + Math.floor(Math.random() * 9))
          : 88 + Math.floor(Math.random() * 12),
        verdict: isAnomalous
          ? [
              "影像角落發現一處非登記存在。牠看起來暫時沒有惡意。",
              "發現微弱靈體殘留。請勿在相同位置連續拍攝三次。",
              "影像中存在一處無法辨識的視線來源，建議由齋堂複檢。",
            ][Math.floor(Math.random() * 3)]
          : [
              "目前未發現異常，影像與登記存在數量一致。",
              "空間狀態穩定。仍不建議於凌晨重新拍攝。",
              "本次檢測結果正常，未發現需要處理的影像殘留。",
            ][Math.floor(Math.random() * 3)],
        effect: isAnomalous
          ? {
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
          setUrl("")
          setResult(null)
        }}
      />
      <div className="mode-panel">
        <p className="kicker">DETECTION MODE</p>
        <h3>選擇檢測模式</h3>
        {["墨蝶殘留", "背後視線", "空間污染", "齋堂員工介入", "隨機異常"].map((item) => (
          <label key={item}>
            <input
              type="radio"
              name="mode"
              checked={mode === item}
              onChange={() => setMode(item)}
            />
            <span>{item}</span>
          </label>
        ))}
        <GoldButton onClick={scan} className={!url ? "disabled" : ""}>
          開始檢測
        </GoldButton>
        <p className="privacy">
          每次結果皆可能不同。上傳之影像僅在目前瀏覽器中處理，不會儲存或傳送至齋堂伺服器。
        </p>
      </div>
      {scanning && <ScanAnimation />}
      {result && (
        <div className="result">
          <PhotoEffectCanvas
            url={url}
            mode={mode}
            result={result}
            canvasRef={canvasRef}
          />
          <DetectionReport result={result} />
          <div className="result-actions">
            <button onClick={download}>
              <Download />下載檢測結果
            </button>
            <button onClick={share}>
              <Share2 />分享結果
            </button>
            <button
              onClick={() => {
                setUrl("")
                setResult(null)
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
