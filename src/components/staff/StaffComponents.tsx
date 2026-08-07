"use client"

import Image from "@/components/shared/AppImage"
import { useEffect, useMemo, useState } from "react"
import { Phone, X } from "@/components/shared/Icons"
import { getStaffExtension, usePhoneCall } from "@/components/shared/PhoneCall"
import { CreatorCard } from "@/components/creators/CreatorCard"
import { creators, friendshipCreators } from "@/data/creators"
import type { Creator, StaffMember } from "@/types"

const titleRank:Record<string,number>={"不動產老闆":1,"店長":2,"副店長":3,"業務銷售經理":4,"會計師":5,"行政秘書":6,"業務":7,"業務專員":8,"保全":9}

const creatorsForStaff=(member:StaffMember)=>creators.filter(creator=>
  creator.zhaitangCharacter.split("｜")[0].split("、").map(name=>name.trim()).includes(member.name)
)

export function StaffCard({member,onOpen}:{member:StaffMember;onOpen:(member:StaffMember)=>void}) {
  return <button id={`staff-${member.id}`} className={`staff-card ${member.id}`} onClick={()=>onOpen(member)}>
    <div className="staff-photo"><Image src={member.portrait} alt={`${member.name}員工肖像`} fill sizes="(max-width: 700px) 100vw, 33vw"/><span className="effect"/></div>
    <div className="staff-info"><small>{member.employeeNumber} · {member.department}</small><h3>{member.name}</h3><p>{member.englishName}</p><b>{member.title}</b><blockquote>{member.quote}</blockquote></div>
  </button>
}

function StaffStickyLinks({staff}:{staff:StaffMember[]}) {
  const [visible,setVisible]=useState(false)
  useEffect(()=>{
    const update=()=>setVisible(window.scrollY>520)
    update()
    window.addEventListener("scroll",update,{passive:true})
    return()=>window.removeEventListener("scroll",update)
  },[])
  return <nav className={`staff-sticky-links ${visible?"visible":""}`} aria-label="員工快速選單" aria-hidden={!visible}>
    <div>{staff.map(member=><a href={`#staff-${member.id}`} key={member.id} tabIndex={visible?0:-1}><span>{member.employeeNumber}</span>{member.name}</a>)}</div>
  </nav>
}

export function StaffDetailModal({member,onClose,onOpenCreator}:{member:StaffMember|null;onClose:()=>void;onOpenCreator:(creator:Creator)=>void}) {
  const {callExtension}=usePhoneCall()
  if(!member)return null
  const memberCreators=creatorsForStaff(member)
  return <div className="modal-backdrop" onMouseDown={event=>event.currentTarget===event.target&&onClose()}>
    <div className="modal staff-modal" role="dialog" aria-modal="true" aria-label={`${member.name}員工檔案`}>
      <button className="icon-button close" onClick={onClose} aria-label="關閉"><X/></button>
      <div className="staff-modal-scroll">
        <div className="staff-modal-image"><Image src={`/assets/employee-profile/資料卡_${member.name}.webp`} fallbackSrc={member.portrait} alt={`${member.name}完整員工資料卡`} fill sizes="50vw"/></div>
        <div className="staff-modal-copy">
          <p className="kicker">INTERNAL PERSONNEL FILE · {member.employeeNumber}</p>
          <h2>{member.name}<small>{member.englishName}</small></h2><p>{member.description}</p>
          <dl><div><dt>職稱</dt><dd>{member.title}</dd></div><div><dt>部門</dt><dd>{member.department}</dd></div><div><dt>外表年齡 / 身高</dt><dd>{member.ageDisplay} / {member.height}</dd></div><div><dt>案件 / 成功率</dt><dd>{member.caseCount} 件 / {member.successRate}%</dd></div></dl>
          {memberCreators.length>0&&<div className="staff-creator-links"><small>CHARACTER CREATORS / 角色創作者</small><div>{memberCreators.map(creator=><button type="button" key={creator.id} onClick={()=>onOpenCreator(creator)}>{creator.name} ↗</button>)}</div></div>}
          <div className="chips">{member.specialty.map(specialty=><span key={specialty}>{specialty}</span>)}</div>
          <aside><b>機密備註</b><p>{member.confidentialNote}</p></aside>
          <button className="voice" onClick={()=>callExtension(member.id)}><Phone/> 撥打分機 {getStaffExtension(member.id)}</button>
        </div>
      </div>
    </div>
  </div>
}

function CreatorDetailModal({creator,onClose}:{creator:Creator|null;onClose:()=>void}) {
  useEffect(()=>{
    if(!creator)return
    const close=(event:KeyboardEvent)=>event.key==="Escape"&&onClose()
    document.addEventListener("keydown",close)
    return()=>document.removeEventListener("keydown",close)
  },[creator,onClose])
  if(!creator)return null
  return <div className="modal-backdrop creator-detail-backdrop" onMouseDown={event=>event.currentTarget===event.target&&onClose()}>
    <div className="creator-detail-modal" role="dialog" aria-modal="true" aria-label={`${creator.name}創作者介紹`}>
      <button className="icon-button creator-detail-close" onClick={onClose} aria-label="關閉創作者介紹"><X/></button>
      <div className="creator-detail-scroll">
        <CreatorCard creator={creator} index={creators.findIndex(item=>item.id===creator.id)}/>
      </div>
    </div>
  </div>
}

export function StaffDirectory({staff}:{staff:StaffMember[]}) {
  const [member,setMember]=useState<StaffMember|null>(null)
  const [creator,setCreator]=useState<Creator|null>(null)
  const ranked=useMemo(()=>[...staff].sort((a,b)=>(titleRank[a.title]??99)-(titleRank[b.title]??99)||a.employeeNumber.localeCompare(b.employeeNumber)),[staff])
  const specialThanksCreators=friendshipCreators.filter(item=>item.name==="黃森")
  return <>
    <StaffStickyLinks staff={ranked}/>
    <div className="staff-grid">{ranked.map(item=><StaffCard key={item.id} member={item} onOpen={setMember}/>)}</div>
    <section className="friendship-thanks" aria-labelledby="friendship-thanks-title">
      <p className="kicker">SPECIAL THANKS / FRIENDSHIP CREDIT</p>
      <h2 id="friendship-thanks-title">特別致謝 Special Thanks</h2>
      <p>
        每一個角色與故事的成形，都來自一次次靈感的累積與細節的修整。特別感謝在創作期間曾提供想法、建議、回饋與協助的每一份心意，讓角色與世界觀得以在反覆琢磨中逐漸完整。
      </p>
      <div>{specialThanksCreators.map(item=><button type="button" key={item.id} onClick={()=>setCreator(item)}>{item.name} ↗</button>)}</div>
      <p className="friendship-invitation">
        創作的相遇不只限於這一次，每一次合輯，也都可能迎來不同的相遇。未來若有適合的題材、世界觀或角色企劃，也歡迎不同創作者自由交流與參與，在彼此的靈感碰撞中，一起發展更多有趣的角色與故事。
      </p>
    </section>
    <StaffDetailModal member={member} onClose={()=>setMember(null)} onOpenCreator={setCreator}/>
    <CreatorDetailModal creator={creator} onClose={()=>setCreator(null)}/>
  </>
}
