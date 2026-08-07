import type { Metadata } from "next"
import Image from "@/components/shared/AppImage"
import Link from "next/link"
import { notFound } from "next/navigation"
import { properties, getProperty } from "@/data/properties"
import { getStaff } from "@/data/staff"
import { AnomalyBadge, StatusBadge, BeforeAfterSlider, AnomalyMetrics, CaseTimeline, PropertyGrid } from "@/components/properties/PropertyComponents"
import { SectionTitle } from "@/components/shared/UI"
import "./property-detail.css"

export function generateStaticParams(){return properties.map(p=>({id:p.id}))}
export const dynamicParams = false
export async function generateMetadata({params}:{params:Promise<{id:string}>}):Promise<Metadata>{const p=getProperty((await params).id);return p?{title:p.title,description:`${p.address}｜${p.anomalyLevel}｜${p.status}`}:{title:"案件不存在"}}

export default async function PropertyPage({params}:{params:Promise<{id:string}>}){
  const p=getProperty((await params).id)
  if(!p)notFound()
  const night=new Date().getHours()<5
  const currentIndex=properties.findIndex(item=>item.id===p.id)
  const previousProperty=properties[(currentIndex-1+properties.length)%properties.length]
  const nextProperty=properties[(currentIndex+1)%properties.length]
  const facts=[
    ["格局",p.layout],["坪數",`${p.area.toFixed(1)} 坪`],["屋齡",`${p.age} 年`],
    ["樓層",p.floor],["朝向",p.direction],["建物類型",p.propertyType],["停車位",p.parking],
    ...(p.publicFacilities?[["公設內容",p.publicFacilities]]:[]),
    ["可否出售",p.availableForSale?"可出售":"目前不開放"],["最後處理日期",p.completedAt],
  ]
  return <>
    <section className="detail-hero"><Image src={p.coverImage} alt={`${p.title}物件主圖`} fill preload sizes="100vw"/><div/><div className="detail-title"><p className="kicker">CASE FILE {p.caseNumber}</p><h1>{p.title}</h1><p>{p.address}</p><div><AnomalyBadge level={p.anomalyLevel}/><StatusBadge status={p.status}/></div><strong>{p.price?`NT$ ${p.price.toLocaleString()}`:"價格面議"}</strong>{night&&<small>目前為夜間時段。請勿單獨前往現場。</small>}</div></section>
    <section className="section facts"><SectionTitle eyebrow="PROPERTY RECORD" title="房屋基本資料"/><dl>{facts.map(([key,value])=><div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl></section>
    <section className="section"><SectionTitle eyebrow="VISUAL COMPARISON" title="處理前後對比"/><BeforeAfterSlider before={p.beforeImage} after={p.afterImage}/></section>
    <section className="section record-grid"><div><SectionTitle eyebrow="ANOMALY METRICS" title="異常數據"/><AnomalyMetrics property={p}/></div><div><SectionTitle eyebrow="CASE TIMELINE" title="案件時間線"/><CaseTimeline items={p.timeline}/></div></section>
    <section className="section report-section"><SectionTitle eyebrow="FINAL DISPOSITION" title="處理紀錄"/><div className="report-paper">
      <h3>階段與負責人</h3><div className="handling-stages">{p.handlingStages.map(item=>{const members=item.staffIds.map(getStaff).filter(member=>member!==undefined);return <article key={item.stage}><span>{item.stage}</span><strong>{members.length?members.map(member=>member.name).join("、"):"未登記"}</strong><p>{item.detail}</p></article>})}</div>
      <h3>附近鄰居處理情況</h3><p>{p.neighborHandling}</p>
      <dl><div><dt>使用方式</dt><dd>{p.handlingMethod}</dd></div><div><dt>封印消耗</dt><dd>{p.sealConsumption}</dd></div></dl>
      <h3>異常來源</h3><p>{p.incidentSummary}</p><h3>最終判定</h3><p>{p.finalDetermination}</p><aside>附註：{p.cautionNote}</aside>
    </div>
      <nav className="property-record-navigation" aria-label="物件案件導覽">
        <Link href={`/properties/${previousProperty.id}`} scroll={true}><small>← 上一筆物件</small><strong>{previousProperty.title}</strong><span>{previousProperty.caseNumber}</span></Link>
        <Link href={`/properties/${nextProperty.id}`} scroll={true}><small>下一筆物件 →</small><strong>{nextProperty.title}</strong><span>{nextProperty.caseNumber}</span></Link>
      </nav>
    </section>
    <section className="section"><SectionTitle eyebrow="RELATED FILES" title="類似物件"/><PropertyGrid items={properties.filter(x=>x.id!==p.id).slice(0,3)}/></section>
  </>
}
