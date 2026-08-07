import Image from "@/components/shared/AppImage"
import type { CSSProperties } from "react"
import type { Creator } from "@/types"

function CreatorWork({work}:{work:Creator["recommendedWorks"][number]}) {
  const content=<><div><Image src={work.image} alt={`${work.title}作品圖片`} fill sizes="(max-width: 700px) 50vw, 360px" /></div><h3>{work.title}</h3><p>{work.hashtags.map((tag) => `#${tag}`).join(" ")}</p></>
  return work.url
    ? <a className="creator-work" href={work.url} target="_blank" rel="noreferrer">{content}</a>
    : <div className="creator-work">{content}</div>
}

export function CreatorQuickLinks({ creators }: { creators: Creator[] }) {
  const directory = creators.map((creator) => ({ name: creator.name, creator }))
  const columns = Math.ceil(directory.length / 2)
  return (
    <nav className="creator-quick-links" aria-label="創作者快速連結" style={{"--creator-columns":columns} as CSSProperties}>
      {directory.map(({ name, creator }) => (
        <a className={creator.id.startsWith("creator-") ? "zhaitang-creator" : "friendship-creator"} href={`#${creator.id}`} key={name} aria-label={`前往${name}參與的角色合輯`}>
          <span className="creator-quick-photo">
            <Image
              src={creator.photo}
              alt=""
              fill
              sizes="(max-width: 700px) 22vw, 100px"
            />
          </span>
          <b>{name}</b>
        </a>
      ))}
    </nav>
  )
}

export function CreatorCard({ creator, index }: { creator: Creator; index: number }) {
  const isFriendshipCreator = creator.id.startsWith("friendship-")
  return (
    <article className="creator-card" id={creator.id}>
      <div className="creator-identity">
        <div className="creator-profile">
          <div className="creator-profile-header">
            <p>{creator.name.includes("、") ? "ARCHIVE COLLABORATORS / 共同創作" : "ARCHIVE CONTRIBUTOR"}</p>
            <h2>{creator.name}</h2>
            {creator.quote&&<blockquote className="creator-quote">{creator.quote}</blockquote>}
          </div>
          <dl>
            {!isFriendshipCreator && <div>
              <dt>齋堂角色</dt>
              <dd>{creator.zhaitangCharacter}</dd>
              {creator.companion && <dd className="creator-companion">{creator.companion}</dd>}
            </div>}
            <div>
              <dt>創作者介紹</dt>
              <dd className="creator-description">{creator.characterDescription}</dd>
            </div>
            <div>
              <dt>擅長風格</dt>
              <dd className="creator-styles">
                {creator.styles.map((style) => <span key={style}>#{style.replaceAll(" ", "")}</span>)}
              </dd>
            </div>
          </dl>
          <div className="creator-links">
            <a href={creator.discordUrl} target="_blank" rel="noreferrer">Discord ↗</a>
            {creator.profileUrl?<a href={creator.profileUrl} target="_blank" rel="noreferrer">作者頁面 ↗</a>:<span className="creator-link-pending">Touchie 作者頁面待補</span>}
          </div>
        </div>
        <div className="creator-feature-photo">
          <Image src={creator.photo} alt={`${creator.name}創作者照片`} fill sizes="(max-width: 700px) 100vw, 45vw" />
          <span>CREATOR {String(index + 1).padStart(2, "0")}</span>
        </div>
      </div>
      <div className="creator-works">
        <div className="creator-works-heading">
          <span>作品介紹</span>
          <b>{String(creator.recommendedWorks.length).padStart(2, "0")}</b>
        </div>
        <div className="creator-work-grid">
          {creator.recommendedWorks.length>0
            ? creator.recommendedWorks.map((work) => <CreatorWork work={work} key={work.title}/>)
            : <p className="creator-work-empty">無</p>}
        </div>
      </div>
    </article>
  )
}
