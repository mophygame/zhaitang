"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "@/components/shared/Icons"

export function BackToTop() {
  const [visible,setVisible]=useState(false)

  useEffect(()=>{
    const update=()=>setVisible(window.scrollY>520)
    update()
    window.addEventListener("scroll",update,{passive:true})
    return()=>window.removeEventListener("scroll",update)
  },[])

  const scrollToTop=()=>{
    const reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({top:0,behavior:reducedMotion?"auto":"smooth"})
  }

  return <button type="button" className={`back-to-top ${visible?"visible":""}`} onClick={scrollToTop} aria-label="回到頁面頂端" aria-hidden={!visible} tabIndex={visible?0:-1} title="回到頂端"><ArrowUp/><span>TOP</span></button>
}
