import Image from "next/image"
import type { Creator } from "@/types"

export function CreatorQuickLinks({ creators }: { creators: Creator[] }) {
  const directory = Array.from(
    new Map(
      creators.flatMap((creator) =>
        creator.name.split("、").map((name) => [name.trim(), { name: name.trim(), creator }] as const)
      )
    ).values()
  )
  return (
    <nav className="creator-quick-links" aria-label="創作者快速連結">
      {directory.map(({ name, creator }) => (
        <a href={`#${creator.id}`} key={name} aria-label={`前往${name}參與的角色合輯`}>
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
  return (
    <article className="creator-card" id={creator.id}>
      <div className="creator-identity">
        <div className="creator-profile">
          <div className="creator-profile-header">
            <div>
              <p>{creator.name.includes("、") ? "ARCHIVE COLLABORATORS / 共同創作" : "ARCHIVE CONTRIBUTOR"}</p>
              <h2>{creator.name}</h2>
            </div>
            <div className="creator-photo">
              <Image src={creator.photo} alt={`${creator.name}創作者照片`} fill sizes="112px" />
              <span>CREATOR {String(index + 1).padStart(2, "0")}</span>
            </div>
          </div>
          <dl>
            <div>
              <dt>齋堂角色</dt>
              <dd>{creator.zhaitangCharacter}</dd>
            </div>
            <div>
              <dt>創作者的話</dt>
              <dd>{creator.characterDescription}</dd>
              {creator.companion && <dd className="creator-companion">{creator.companion}</dd>}
            </div>
            <div>
              <dt>擅長風格</dt>
              <dd className="creator-styles">
                {creator.styles.map((style) => <span key={style}>{style}</span>)}
              </dd>
            </div>
          </dl>
          <div className="creator-links">
            <a href={creator.discordUrl} target="_blank" rel="noreferrer">Discord ↗</a>
            <a href={creator.profileUrl} target="_blank" rel="noreferrer">作者頁面 ↗</a>
          </div>
          <div className="creator-works">
            <div className="creator-works-heading">
              <span>作品介紹</span>
              <b>{String(creator.recommendedWorks.length).padStart(2, "0")}</b>
            </div>
            <div className="creator-work-grid">
              {creator.recommendedWorks.map((work) => (
                <a className="creator-work" href={work.url} target="_blank" rel="noreferrer" key={work.title}>
                  <div><Image src={work.image} alt={`${work.title}作品圖片`} fill sizes="260px" /></div>
                  <h3>{work.title}</h3>
                  <p>{work.hashtags.map((tag) => `#${tag}`).join(" ")}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
