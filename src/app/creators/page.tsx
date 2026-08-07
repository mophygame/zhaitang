import type { Metadata } from "next"
import { CreatorCard, CreatorQuickLinks } from "@/components/creators/CreatorCard"
import { creators } from "@/data/creators"
import "./creators.css"

export const metadata: Metadata = {
  title: "創作者介紹",
  description: "認識共同構築齋堂房屋不動產世界觀的十一位創作者與推薦作品。",
}

export default function CreatorsPage() {
  const creatorCount = new Set(creators.flatMap((creator) => creator.name.split("、").map((name) => name.trim()))).size
  return (
    <>
      <section className="page-hero creators-hero">
        <p className="kicker">WORLD-BUILDING CONTRIBUTORS / {creatorCount} CREATORS</p>
        <h1>創作者介紹</h1>
        <p>{creatorCount} 位創作者，共同保存齋堂的角色、物件與那些無法被登記的故事。</p>
      </section>
      <section className="creator-directory">
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
      </section>
    </>
  )
}
