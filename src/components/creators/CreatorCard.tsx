"use client"

import Image from "@/components/shared/AppImage"
import { useEffect, useRef, useState, type CSSProperties } from "react"
import type { Creator } from "@/types"

function ExpandableDescription({children}:{children:string}) {
  const [expanded,setExpanded]=useState(false)
  const [overflowing,setOverflowing]=useState(false)
  const [collapsedText,setCollapsedText]=useState(children)
  const wrapperRef=useRef<HTMLElement>(null)
  const measureRef=useRef<HTMLSpanElement>(null)

  useEffect(()=>{
    const wrapper=wrapperRef.current
    const measureBox=measureRef.current
    const probe=measureBox?.querySelector<HTMLElement>("[data-description-probe]")
    if(!wrapper||!measureBox||!probe)return
    const measure=()=>{
      const lineHeight=parseFloat(getComputedStyle(wrapper).lineHeight)
      const maxHeight=lineHeight*4+.5
      probe.textContent=children
      const hasOverflow=measureBox.scrollHeight>maxHeight
      setOverflowing(hasOverflow)
      if(!hasOverflow){setCollapsedText(children);return}
      let low=0
      let high=children.length
      while(low<high){
        const middle=Math.ceil((low+high)/2)
        probe.textContent=`${children.slice(0,middle).trimEnd()}…`
        if(measureBox.scrollHeight<=maxHeight)low=middle
        else high=middle-1
      }
      setCollapsedText(`${children.slice(0,low).trimEnd()}…`)
    }
    measure()
    const observer=new ResizeObserver(measure)
    observer.observe(wrapper)
    return()=>observer.disconnect()
  },[children])

  return <dd ref={wrapperRef} className={`creator-description-wrap ${expanded?"expanded":""}`}>
    <span className="creator-description">{expanded?children:collapsedText}</span>
    {(overflowing||expanded)&&<button type="button" className="creator-description-toggle" aria-expanded={expanded} onClick={()=>setExpanded(value=>!value)}>{expanded?"收合內容 ↑":"展開更多 ↓"}</button>}
    <span ref={measureRef} className="creator-description-measure" aria-hidden="true"><span data-description-probe>{children}</span><span className="creator-description-measure-action">展開更多 ↓</span></span>
  </dd>
}

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

export function CreatorStickyLinks({creators}:{creators:Creator[]}) {
  const [visible,setVisible]=useState(false)
  useEffect(()=>{
    const update=()=>setVisible(window.scrollY>520)
    update()
    window.addEventListener("scroll",update,{passive:true})
    return()=>window.removeEventListener("scroll",update)
  },[])
  return <nav className={`creator-sticky-links ${visible?"visible":""}`} aria-label="創作者快速選單" aria-hidden={!visible}>
    <div>{creators.map(creator=><a href={`#${creator.id}`} key={creator.id} tabIndex={visible?0:-1}>{creator.name}</a>)}</div>
  </nav>
}

export function CreatorCard({ creator, index }: { creator: Creator; index: number }) {
  const isFriendshipCreator = creator.id.startsWith("friendship-")
  return (
    <article className="creator-card" id={creator.id}>
      <div className="creator-identity">
        <div className="creator-profile">
          <div className="creator-profile-header">
            <div className="creator-profile-avatar">
              <Image src={creator.photo} alt={`${creator.name}創作者照片`} fill sizes="160px"/>
              <span>{String(index+1).padStart(2,"0")}</span>
            </div>
            <div className="creator-profile-heading-copy">
              <p>{creator.name.includes("、") ? "ARCHIVE COLLABORATORS / 共同創作" : "ARCHIVE CONTRIBUTOR"}</p>
              <h2>{creator.name}</h2>
              {creator.quote&&<blockquote className="creator-quote">{creator.quote}</blockquote>}
            </div>
          </div>
          <dl>
            {!isFriendshipCreator && <div>
              <dt>齋堂角色</dt>
              <dd>{creator.zhaitangCharacter}</dd>
              {creator.companion && <dd className="creator-companion">{creator.companion}</dd>}
            </div>}
            <div>
              <dt>創作者介紹</dt>
              <ExpandableDescription>{creator.characterDescription}</ExpandableDescription>
            </div>
            <div>
              <dt>擅長風格</dt>
              <dd className="creator-styles">
                {creator.styles.map((style) => <span key={style}>#{style.replaceAll(" ", "")}</span>)}
              </dd>
            </div>
          </dl>
          <div className="creator-links">
            {creator.discordUrl?<a href={creator.discordUrl} target="_blank" rel="noreferrer">Discord ↗</a>:creator.discordLabel?<span className="creator-link-pending">Discord：{creator.discordLabel}</span>:null}
            {creator.profileUrl?<a href={creator.profileUrl} target="_blank" rel="noreferrer">Touchie 作者頁面 ↗</a>:creator.profileLabel?<span className="creator-link-pending">Touchie：{creator.profileLabel}</span>:<span className="creator-link-pending">Touchie 作者頁面待補</span>}
            {creator.otherLinks?.map(link=><a href={link.url} target="_blank" rel="noreferrer" key={link.label}>{link.label} ↗</a>)}
          </div>
          <div className="creator-works">
            <div className="creator-works-heading">
              <span>作品介紹</span>
              <b>{String(creator.recommendedWorks.length).padStart(2, "0")}</b>
            </div>
            <div className="creator-work-grid">
              {creator.recommendedWorks.length>0
                ? creator.recommendedWorks.map(work=><CreatorWork work={work} key={work.title}/>)
                : <p className="creator-work-empty">無</p>}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
