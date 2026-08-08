import type { Metadata } from "next"
import { CreatorCard, CreatorQuickLinks, CreatorStickyLinks } from "@/components/creators/CreatorCard"
import { friendshipCreators, zhaitangCreators } from "@/data/creators"
import "./creators.css"

export const metadata: Metadata = {
  title: "創作者介紹",
  description: "認識共同構築齋堂房屋不動產角色與世界觀的創作者，以及提供靈感、回饋與協助的特別致謝。",
}

export default function CreatorsPage() {
  const featuredFriendshipCreators=friendshipCreators.filter(creator=>creator.name==="黃森")
  const pageCreators=[...zhaitangCreators,...featuredFriendshipCreators]
  return <>
    <section className="page-hero creators-hero">
      <p className="kicker">WORLD-BUILDING CONTRIBUTORS / CREATOR ARCHIVE</p>
      <h1>創作者介紹</h1>
      <p>每一位角色與故事，都由不同的筆觸、靈感與相遇共同構築。</p>
    </section>
    <CreatorStickyLinks creators={pageCreators}/>
    <main className="creator-directory">
      <section className="creator-quick-section" aria-labelledby="creator-directory-title">
        <div className="creator-quick-heading">
          <span id="creator-directory-title">QUICK DIRECTORY</span>
          <p>共 {pageCreators.length} 位創作者；選擇姓名可直接前往作者卡片</p>
        </div>
        <CreatorQuickLinks creators={pageCreators}/>
      </section>

      <section aria-labelledby="zhaitang-creators-title">
        <div className="creator-section-heading">
          <span>01 / ZHAITANG CREATORS</span>
          <h2 id="zhaitang-creators-title">齋堂作者</h2>
          <p>角色合輯與齋堂世界觀內容的主要創作者。</p>
        </div>
        <div className="creator-list">
          {zhaitangCreators.map((creator,index)=><CreatorCard creator={creator} index={index} key={creator.id}/>)}
        </div>
      </section>

      <section className="creator-sponsor-section" aria-labelledby="friendship-creators-title">
        <div className="creator-section-heading">
          <span>02 / SPECIAL THANKS</span>
          <h2 id="friendship-creators-title">特別致謝 Special Thanks</h2>
          <p>在討論與創作整理過程中提供想法、建議、回饋與協助的跨平台創作者。</p>
        </div>
        <div className="creator-list creator-sponsor-list">
          {featuredFriendshipCreators.map((creator,index)=><CreatorCard creator={creator} index={zhaitangCreators.length+index} key={creator.id}/>)}
        </div>
      </section>
    </main>
  </>
}
