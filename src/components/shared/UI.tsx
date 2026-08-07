"use client";
import { createContext,useContext,useEffect,useState } from "react";
import type { FormEvent } from "react";
import { X,Upload } from "@/components/shared/Icons";
import "./commission-modal.css";

const CommissionContext=createContext({open:()=>{}});
export const useCommission=()=>useContext(CommissionContext);
export function CommissionProvider({children}:{children:React.ReactNode}){const [opened,setOpened]=useState(false);return <CommissionContext.Provider value={{open:()=>setOpened(true)}}>{children}<CommissionModal open={opened} onClose={()=>setOpened(false)}/></CommissionContext.Provider>}
const RequiredMark=()=> <span className="required-mark" aria-hidden="true">*</span>
export function GoldButton({children,onClick,type="button",className=""}:{children:React.ReactNode;onClick?:()=>void;type?:"button"|"submit";className?:string}){return <button type={type} onClick={onClick} className={`gold-button ${className}`}>{children}</button>}
export function SectionTitle({eyebrow,title,description}:{eyebrow:string;title:string;description?:string}){return <div className="section-title"><span>{eyebrow}</span><h2>{title}</h2>{description&&<p>{description}</p>}</div>}
export function LoadingSkeleton(){return <div className="skeleton" aria-label="載入中"/>}
export function EmptyState({text="查無符合條件的物件"}:{text?:string}){return <div className="empty"><span>無</span><p>{text}</p></div>}
export function CommissionModal({open,onClose}:{open:boolean;onClose:()=>void}){
  const [done,setDone]=useState(false)
  const [caseNumber,setCaseNumber]=useState("")
  useEffect(()=>{if(!open){setDone(false);setCaseNumber("")}},[open])
  if(!open)return null
  const submit=(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
    setCaseNumber(`ZT-${Math.floor(1000+Math.random()*8999)}`)
    setDone(true)
  }
  return <div className="modal-backdrop" role="presentation" onMouseDown={event=>{
    if(!done&&event.target===event.currentTarget)onClose()
  }}>
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby={done?"commission-success-title":"commission-title"}>
      {!done&&<button className="icon-button close" onClick={onClose} aria-label="關閉"><X/></button>}
      {done
        ? <div className="success">
            <span>{caseNumber}</span>
            <h2 id="commission-success-title">委託已成立。</h2>
            <p>請保持現場原狀。不要移動任何不屬於你的物品。<br/>若室內燈光開始閃爍，請立即離開。</p>
            <GoldButton onClick={onClose}>確認</GoldButton>
          </div>
        : <form onSubmit={submit}><p className="kicker">24H SPECIAL COMMISSION</p><h2 id="commission-title">特殊物件委託</h2><div className="form-grid"><label>姓名<RequiredMark/><input required/></label><label>聯絡方式<RequiredMark/><input required/></label><label className="wide">物件地址<RequiredMark/><input required/></label><label>物件類型<select><option>住宅</option><option>商辦</option><option>土地</option><option>其他</option></select></label><fieldset className="contact-time-range"><legend>可聯絡時間<RequiredMark/></legend><span className="time-inputs"><label><small>開始</small><input type="time" name="contactStart" required/></label><i>至</i><label><small>結束</small><input type="time" name="contactEnd" required/></label></span></fieldset><label className="wide">異常描述<RequiredMark/><textarea required rows={4}/></label><label>是否曾發生傷亡<select><option>不確定</option><option>是</option><option>否</option></select></label><label>是否仍有人居住<select><option>是</option><option>否</option></select></label><label className="wide upload-mini"><Upload width={18} height={18}/> 上傳現場照片<input type="file" accept="image/*" multiple/></label></div><label className="consent"><input type="checkbox" required/><span>我同意齋堂於聯絡前建立暫存案件紀錄。<RequiredMark/></span></label><GoldButton type="submit">建立委託</GoldButton></form>}
    </div>
  </div>
}
