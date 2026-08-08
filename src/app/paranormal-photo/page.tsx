import type { Metadata } from "next"
import { PhotoLab } from "@/components/paranormal/PhotoLab"

export const metadata: Metadata = { title: "靈異影像檢測", alternates: { canonical: "/paranormal-photo" } }

export default function ParanormalPage() {
  return (
    <>
      <section className="page-hero paranormal-hero">
        <p className="kicker">PUBLIC EXPERIMENT / LOCAL PROCESSING ONLY</p>
        <h1>靈異影像檢測</h1>
        <h2>你確定照片裡只有你嗎？</h2>
        <p>上傳一張照片。齋堂將分析影像中的異常視線、殘留墨跡、未登記存在與空間污染。</p>
      </section>
      <section className="section">
        <aside className="paranormal-reminder" aria-label="齋堂溫馨提醒">
          <strong>※ 齋堂溫馨提醒：</strong>
          <em>膽小者不建議獨自操作</em>。若您對「照片裡比拍照時多了一位」這類情況接受度較低，建議請親友代為檢測。本服務僅負責辨識，不包含陪睡、開燈及心理安撫。
        </aside>
        <PhotoLab />
      </section>
    </>
  )
}
