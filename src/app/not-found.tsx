import type { Metadata } from "next"
import Link from "next/link"
import Image from "@/components/shared/AppImage"
import "./not-found.css"

export const metadata: Metadata = {
  title: "頁面已被淨化｜404",
  description: "這個頁面已經超渡了，您所尋找的頁面可能已被淨化。",
}

export default function NotFound() {
  return (
    <main className="not-found-page">
      <Image
        src="/assets/error/404.webp"
        alt="404，這個頁面已經超渡了，您所尋找的頁面可能已被淨化。此頁面氣場不穩，已收回淨化。"
        fill
        priority
        sizes="100vw"
      />
      <div className="not-found-vignette" aria-hidden="true" />
      <div className="not-found-semantic-copy">
        <h1>404｜這個頁面已經超渡了</h1>
        <p>您所尋找的頁面可能已被淨化。</p>
      </div>
      <nav className="not-found-actions" aria-label="404 頁面導覽">
        <Link className="gold-button" href="/">返回齋堂首頁</Link>
        <Link href="/properties">查看特殊物件 →</Link>
      </nav>
    </main>
  )
}
