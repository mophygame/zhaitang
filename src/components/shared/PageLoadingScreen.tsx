"use client"

import { usePathname } from "next/navigation"
import { useLayoutEffect, useState } from "react"
import AppImage from "./AppImage"

const minimumVisibleTime = 520
const maximumWaitTime = 8000

export function PageLoadingScreen() {
  const pathname = usePathname()
  const [visible,setVisible] = useState(true)
  const [progress,setProgress] = useState(8)

  useLayoutEffect(()=>{
    let cancelled = false
    const startedAt = performance.now()
    setVisible(true)
    setProgress(8)
    document.body.setAttribute("aria-busy","true")

    const finish = () => {
      if(cancelled) return
      const remaining = Math.max(0,minimumVisibleTime-(performance.now()-startedAt))
      window.setTimeout(()=>{
        if(cancelled) return
        setProgress(100)
        window.setTimeout(()=>{
          if(cancelled) return
          setVisible(false)
          document.body.removeAttribute("aria-busy")
        },180)
      },remaining)
    }

    const maximumTimer = window.setTimeout(finish,maximumWaitTime)
    const frame = window.requestAnimationFrame(()=>window.requestAnimationFrame(async()=>{
      const images = [...document.querySelectorAll<HTMLImageElement>("main img, header img")]
        .filter(image=>image.dataset.preloaderIgnore!=="true")
        .filter(image=>image.loading!=="lazy"||image.getBoundingClientRect().top<window.innerHeight*1.35)
      const fontTask = "fonts" in document ? document.fonts.ready.then(()=>undefined) : Promise.resolve()
      const tasks = [fontTask,...images.map(image=>image.complete
        ? Promise.resolve()
        : new Promise<void>(resolve=>{
          image.addEventListener("load",()=>resolve(),{once:true})
          image.addEventListener("error",()=>resolve(),{once:true})
        }))]
      let completed = 0
      await Promise.all(tasks.map(task=>task.finally(()=>{
        completed+=1
        if(!cancelled) setProgress(8+Math.round(completed/tasks.length*84))
      })))
      window.clearTimeout(maximumTimer)
      finish()
    }))

    return ()=>{
      cancelled=true
      window.clearTimeout(maximumTimer)
      window.cancelAnimationFrame(frame)
      document.body.removeAttribute("aria-busy")
    }
  },[pathname])

  return <div className={`page-loading-screen ${visible?"is-visible":"is-hidden"}`} role="status" aria-live="polite" aria-label="齋堂頁面載入中" aria-hidden={!visible}>
    <div className="page-loading-mark">
      <AppImage src="/assets/brand.webp" width={118} height={118} alt="" aria-hidden="true" priority data-preloader-ignore="true"/>
      <p>齋堂房屋不動產</p>
      <span>ZHAITANG PROPERTY · ARCHIVE LOADING</span>
      <i><b style={{width:`${progress}%`}}/></i>
      <small>正在調閱物件與異常紀錄…… {progress}%</small>
    </div>
  </div>
}
