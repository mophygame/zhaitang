import type { Metadata } from "next"
import { CreatorCard, CreatorQuickLinks } from "@/components/creators/CreatorCard"
import { creators } from "@/data/creators"
import "./creators.css"

export const metadata: Metadata = {
  title: "創作者介紹",
  description: "認識共同構築齋堂房屋不動產世界觀的齋堂作者，以及提供靈感與協助的友誼贊助作者。",
}

export default function CreatorsPage() {
  const creatorCount = new Set(creators.flatMap((creator) => creator.name.split("、").map((name) => name.trim()))).size
  return (
    <>
      <section className="page-hero creators-hero">
        <p className="kicker">WORLD-BUILDING CONTRIBUTORS / {creatorCount} ZHAITANG CREATORS + 1 SPECIAL CREDIT</p>
        <h1>創作者介紹</h1>
        <p>{creatorCount} 位齋堂作者共同保存角色與故事，另有一位友誼贊助作者提供討論與靈感協助。</p>
      </section>
      <section className="creator-directory">
        <div className="creator-section-heading"><span>01 / ZHAITANG CREATORS</span><h2>齋堂作者</h2><p>角色合輯與世界觀內容的主要創作者。</p></div>
        <div className="creator-quick-section">
          <div className="creator-quick-heading">
            <span>QUICK DIRECTORY</span>
            <p>共 {creatorCount} 位創作者；選擇姓名可前往其參與的角色合輯</p>
          </div>
          <CreatorQuickLinks creators={creators} />
        </div>
        <div className="creator-directory-note">
          <span>CONTRIBUTOR ARCHIVE</span>
        </div>
        <div className="creator-list">
          {creators.map((creator, index) => (
            <CreatorCard creator={creator} index={index} key={creator.id} />
          ))}
        </div>
        <section className="creator-sponsor-section" aria-labelledby="friendship-credit-title">
          <div className="creator-section-heading"><span>02 / FRIENDSHIP CREDIT</span><h2 id="friendship-credit-title">友誼贊助・靈感提供</h2><p>在討論與創作整理過程中提供想法、回饋與協助的特別致謝。</p></div>
          <article className="friendship-credit-card"><div><small>INSPIRATION CONTRIBUTOR</small><h3>EE的E是EMO的E</h3></div><p>在齋堂角色與世界觀的討論過程中給予協助，提供靈感、觀點與創作方向上的回饋。</p></article>
        </section>
      </section>
    </>
  )
}
