"use client"

import {useEffect,useState} from "react"
import {useCommission} from "@/components/shared/UI"
import {usePhoneCall} from "@/components/shared/PhoneCall"
import {OutwardArrow} from "@/components/shared/OutwardArrow"

export function Footer(){
  const [changed,setChanged]=useState(false)
  const {open}=useCommission()
  const {callMain}=usePhoneCall()
  useEffect(()=>{const timer=setTimeout(()=>setChanged(true),16000);return()=>clearTimeout(timer)},[])
  return <footer>
    <div className="footer-grid">
      <div><p className="kicker">ZHAITANG PROPERTY & ANOMALY SERVICES</p><h2>齋堂房屋不動產</h2><p>台中市西屯區市政北七路 186 號 26 樓之 1</p><div className="footer-contact"><button type="button" onClick={callMain}>撥打齋堂　04-2317-0317 →</button><small>網站互動功能・非實際電話號碼</small><a href="mailto:case@zhaitang.tw">case@zhaitang.tw</a></div></div>
      <div><b>營業時間</b><p>一般業務 09:00—18:00<br/>特殊物件委託 24H</p></div>
      <div><b>案件聲明</b><p>本網站展示之特殊物件，部分資料已依委託人要求封存。未經授權，請勿自行前往案件所在地。</p><button onClick={open}>建立委託 →</button></div>
    </div>
    <section className="app-download footer-app-download" aria-labelledby="app-download-title">
      <div><p className="kicker">TAKE THE STORY WITH YOU</p><h2 id="app-download-title">下載 Touchie AI</h2><p>在手機上探索虛擬角色互動與陪伴，讓齋堂的故事隨時與你同行。</p></div>
      <div className="app-download-actions"><a className="app-store-link" href="https://apps.apple.com/tw/app/touchie-ai%E8%99%9B%E6%93%AC%E8%A7%92%E8%89%B2%E4%BA%92%E5%8B%95%E8%88%87%E9%99%AA%E4%BC%B4/id6749675167" target="_blank" rel="noreferrer"><small>Download on the</small><strong>App Store</strong><span>iOS 版本<OutwardArrow/></span></a><span className="app-store-link unavailable" aria-disabled="true"><small>GET IT ON</small><strong>Google Play</strong><span>Android 版本・即將推出</span></span></div>
    </section>
    <p className={`footer-secret ${changed?"changed":""}`}>{changed?"如果那句話移動了，請不要往身後看。":"若你已看見不屬於頁面的內容，請立即關閉瀏覽器。"}</p>
  </footer>
}
