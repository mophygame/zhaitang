"use client";import Image from "@/components/shared/AppImage";import Link from "next/link";import {OutwardArrow} from "@/components/shared/OutwardArrow";import {properties} from "@/data/properties";import {BeforeAfterSlider,PropertyGrid,PropertySearch} from "@/components/properties/PropertyComponents";import {SectionTitle,useCommission} from "@/components/shared/UI";
export default function Home(){const commission=useCommission();const featured=properties.slice(0,4);const services=[
["/assets/icons/01.svg","特殊物件勘查","進場確認結構、異常範圍與人員風險，建立初步現場紀錄。"],
["/assets/icons/02.svg","歷史與產權溯源","比對謄本、歷次交易與土地沿革，釐清物件過去與權利關係。"],
["/assets/icons/03.svg","靈異殘留鑑定","依影像、聲響與空間反應，判定殘留類型、強度及影響範圍。"],
["/assets/icons/04.svg","凶宅清理與封存","依危險等級執行淨化、隔離與封存，避免異常持續擴散。"],
["/assets/icons/05.svg","契約與損耗清算","核對契約責任、修繕損耗與處置費用，完成案件財務清算。"],
["/assets/icons/06.svg","重新包裝與出售","整理屋況揭露、銷售定位與帶看規範，讓完成處置的物件重新上市。"],
] as const;return <>
<section className="hero">
<Image src="/images/84D62DE0-0F7C-496B-9323-1AE64B102D18.webp" alt="暮色中的齋堂精選宅邸" fill preload sizes="100vw"/>
<div className="hero-shade"/>
<div className="ink-butterflies" aria-hidden="true">蝶　契　蝶</div>
<div className="hero-copy">
<p className="kicker">ZHAITANG PROPERTY & ANOMALY SERVICES</p>
<h1>齋堂房屋不動產</h1>
<p className="slogan">乾淨的房子，我們出售。<br/>
<em>不乾淨的，我們負責。</em>
</p>
<p>專營不動產、土地開發、新屋、成屋與特殊物件處理。<br/>經過齋堂的手，只留下可以被出售的房子。</p>
<div className="hero-actions">
<Link className="gold-button" href="/properties">瀏覽特殊物件</Link>
<button onClick={commission.open}>立即委託<OutwardArrow/>
</button>
</div>
</div>
<div className="hero-index">
<span>CASE ARCHIVE</span>
<b>0049—0056</b>
</div>
</section>
<div className="search-wrap">
<PropertySearch properties={properties}/>
</div>
<section className="section">
<SectionTitle eyebrow="CURATED ANOMALIES / 精選檔案" title="特殊物件" description="每一筆刊登資料都已完成產權比對。異常紀錄不在謄本上，但會留在這裡。"/>
<PropertyGrid items={featured}/>
<Link className="text-link" href="/properties">檢視全部封存物件 →</Link>
</section>
<section className="section services-section">
<SectionTitle eyebrow="SCOPE OF SERVICE" title="從勘查到重新出售"/>
<div className="services">{services.map(([icon,name,description],i)=>
<div key={name}>
<Image src={icon} width={32} height={32} alt="" aria-hidden="true"/>
<span>0{i+1}</span>
<h3>{name}</h3>
<p>{description}</p>
</div>)}</div>
</section>
<section className="section comparison">
<div>
<SectionTitle eyebrow="CASE ZT-0049 / PROCESS RECORD" title="有些問題，不能靠重新裝潢解決。"/>
<p>翠湖路十七號在交屋前維持封鎖 41 日。滑動影像，查看最後一次處理前後的現場。</p>
<div className="stat-list">
<span>污染指數 <b>96% → 3%</b>
</span>
<span>空間穩定度 <b>12% → 98%</b>
</span>
<span>可居住評級 <b>禁止進入 → 可正常入住</b>
</span>
</div>
<Link className="text-link" href="/properties/zt-49">查看完整處理紀錄 →</Link>
</div>
<BeforeAfterSlider before={properties[0].beforeImage} after={properties[0].afterImage}/>
</section>
<section className="photo-cta">
<div>
<p className="kicker">PUBLIC ANOMALY DETECTION</p>
<h2>你確定照片裡只有你嗎？</h2>
<p>上傳照片，讓齋堂分析影像中的殘留、視線、墨跡與非登記存在。</p>
<Link className="gold-button" href="/paranormal-photo">開始檢測</Link>
</div>
<span aria-hidden="true">非<br/>登<br/>記<br/>存<br/>在</span>
</section>
</>}
