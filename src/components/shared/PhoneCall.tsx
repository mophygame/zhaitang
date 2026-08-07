"use client"

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import { Phone } from "@/components/shared/Icons"
import {
  busyScript,
  extensionScripts,
  operatorGreetings,
  operatorMenuScript,
  serviceOptions,
  staffExtensions,
  transferScript,
  unknownScript,
  voicemailScript,
} from "@/data/callScripts"
import { staff } from "@/data/staff"
import type { StaffMember } from "@/types"
import "./phone-call.css"

type CallPhase = "dialing" | "ringing" | "operator" | "transferring" | "connected" | "busy" | "voicemail" | "anomaly" | "unknown"
type PhoneCallContextValue = { callExtension: (staffId: string) => void; callMain: () => void }

const PhoneCallContext = createContext<PhoneCallContextValue>({ callExtension: () => {}, callMain: () => {} })
export const usePhoneCall = () => useContext(PhoneCallContext)
export const getStaffExtension = (staffId: string) => staffExtensions[staffId] ?? "#000"
const wait = (minimum: number, maximum: number) => minimum + Math.random() * (maximum - minimum)
const keypad = [
  ["1", ""], ["2", "ABC"], ["3", "DEF"],
  ["4", "GHI"], ["5", "JKL"], ["6", "MNO"],
  ["7", "PQRS"], ["8", "TUV"], ["9", "WXYZ"],
  ["*", ""], ["0", "+"], ["#", ""],
] as const

export function PhoneCallProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [phase, setPhase] = useState<CallPhase>("dialing")
  const [recipient, setRecipient] = useState<StaffMember | null>(null)
  const [transcript, setTranscript] = useState("")
  const [elapsed, setElapsed] = useState(0)
  const [dialedNumber, setDialedNumber] = useState("04-2317-0317")
  const [extensionInput, setExtensionInput] = useState("")
  const timers = useRef<number[]>([])
  const ringInterval = useRef<number | null>(null)
  const audioContext = useRef<AudioContext | null>(null)

  const stopRing = useCallback(() => {
    if (ringInterval.current !== null) window.clearInterval(ringInterval.current)
    ringInterval.current = null
  }, [])

  const clearAudio = useCallback(() => {
    timers.current.forEach(window.clearTimeout)
    timers.current = []
    stopRing()
    window.speechSynthesis?.cancel()
    if (audioContext.current) void audioContext.current.close()
    audioContext.current = null
  }, [stopRing])

  const hangUp = useCallback(() => {
    clearAudio()
    setOpen(false)
    setRecipient(null)
    setTranscript("")
    setElapsed(0)
    setExtensionInput("")
  }, [clearAudio])

  useEffect(() => () => clearAudio(), [clearAudio])
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && hangUp()
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [hangUp, open])
  useEffect(() => {
    if (phase !== "connected") return
    const interval = window.setInterval(() => setElapsed(value => value + 1), 1000)
    return () => window.clearInterval(interval)
  }, [phase])

  const tone = useCallback((frequency: number, duration: number, volume = .035) => {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (!AudioContextClass) return
    const context = audioContext.current ?? new AudioContextClass()
    audioContext.current = context
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.frequency.value = frequency
    oscillator.type = "sine"
    gain.gain.setValueAtTime(volume, context.currentTime)
    gain.gain.exponentialRampToValueAtTime(.0001, context.currentTime + duration)
    oscillator.connect(gain).connect(context.destination)
    oscillator.start()
    oscillator.stop(context.currentTime + duration)
  }, [])

  const ring = useCallback(() => {
    tone(440, .55)
    const second = window.setTimeout(() => tone(480, .55), 650)
    timers.current.push(second)
  }, [tone])

  const speak = useCallback((text: string) => {
    if (!("speechSynthesis" in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "zh-TW"
    utterance.rate = .9
    utterance.pitch = .96
    const voices = window.speechSynthesis.getVoices()
    utterance.voice = voices.find(voice => voice.lang.toLowerCase().startsWith("zh-tw"))
      ?? voices.find(voice => voice.lang.toLowerCase().startsWith("zh"))
      ?? null
    window.speechSynthesis.speak(utterance)
  }, [])

  const playNoise = useCallback(() => {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (!AudioContextClass) return
    const context = audioContext.current ?? new AudioContextClass()
    audioContext.current = context
    const buffer = context.createBuffer(1, context.sampleRate * 2.6, context.sampleRate)
    const data = buffer.getChannelData(0)
    for (let index = 0; index < data.length; index += 1) data[index] = (Math.random() * 2 - 1) * (1 - index / data.length)
    const source = context.createBufferSource()
    const filter = context.createBiquadFilter()
    const gain = context.createGain()
    source.buffer = buffer
    filter.type = "bandpass"
    filter.frequency.value = 680
    gain.gain.value = .055
    source.connect(filter).connect(gain).connect(context.destination)
    source.start()
  }, [])

  const connectTo = useCallback((member: StaffMember) => {
    stopRing()
    setRecipient(member)
    setDialedNumber(getStaffExtension(member.id))
    setPhase("connected")
    setElapsed(0)
    setExtensionInput("")
    const line = extensionScripts[member.id] ?? member.quote.replace(/[「」]/g, "")
    setTranscript(line)
    speak(line)
  }, [speak, stopRing])

  const enterVoicemail = useCallback(() => {
    stopRing()
    setPhase("voicemail")
    setTranscript(voicemailScript)
    speak(voicemailScript)
    const beepTimer = window.setTimeout(() => tone(880, .22, .045), 2600)
    timers.current.push(beepTimer)
  }, [speak, stopRing, tone])

  const enterAnomaly = useCallback(() => {
    stopRing()
    setRecipient(null)
    setPhase("anomaly")
    setTranscript("訊號來源無法辨識。通話將自動中斷。")
    playNoise()
    const autoHangup = window.setTimeout(hangUp, 3200)
    timers.current.push(autoHangup)
  }, [hangUp, playNoise, stopRing])

  const transferTo = useCallback((member: StaffMember) => {
    stopRing()
    setRecipient(member)
    setDialedNumber(getStaffExtension(member.id))
    setPhase("transferring")
    setTranscript(transferScript)
    setExtensionInput("")
    speak(transferScript)
    const startTransferRing = window.setTimeout(() => {
      ring()
      ringInterval.current = window.setInterval(ring, 1900)
    }, 900)
    const finishTransfer = window.setTimeout(() => {
      const roll = Math.random()
      if (roll < .03) enterAnomaly()
      else if (roll < .3) enterVoicemail()
      else connectTo(member)
    }, wait(3000, 4800))
    timers.current.push(startTransferRing, finishTransfer)
  }, [connectTo, enterAnomaly, enterVoicemail, ring, speak, stopRing])

  const routeTo = useCallback((member: StaffMember) => {
    if (Math.random() < .08) {
      stopRing()
      setRecipient(member)
      setDialedNumber(getStaffExtension(member.id))
      setPhase("busy")
      setTranscript(busyScript)
      speak(busyScript)
      const voicemailTimer = window.setTimeout(enterVoicemail, 2800)
      timers.current.push(voicemailTimer)
      return
    }
    transferTo(member)
  }, [enterVoicemail, speak, stopRing, transferTo])

  const enterOperator = useCallback(() => {
    stopRing()
    setRecipient(null)
    setDialedNumber("04-2317-0317")
    setPhase("operator")
    setExtensionInput("")
    const greeting = operatorGreetings[Math.floor(Math.random() * operatorGreetings.length)]
    const script = `${greeting}${operatorMenuScript}`
    setTranscript(script)
    speak(script)
  }, [speak, stopRing])

  const begin = useCallback((staffId?: string) => {
    clearAudio()
    setOpen(true)
    setPhase("dialing")
    setRecipient(null)
    setTranscript("")
    setElapsed(0)
    setExtensionInput("")
    setDialedNumber(staffId ? getStaffExtension(staffId) : "04-2317-0317")
    tone(350, .12, .025)
    const dialingTimer = window.setTimeout(() => {
      setPhase("ringing")
      ring()
      ringInterval.current = window.setInterval(ring, 1900)
    }, 650)
    const resolutionTimer = window.setTimeout(() => {
      if (staffId) {
        const member = staff.find(item => item.id === staffId)
        if (member) connectTo(member)
      } else enterOperator()
    }, staffId ? 2400 : wait(3000, 6000))
    timers.current.push(dialingTimer, resolutionTimer)
  }, [clearAudio, connectTo, enterOperator, ring, tone])

  const handleKey = useCallback((key: string) => {
    if (phase !== "operator") return
    const toneIndex = key === "*" ? 10 : key === "#" ? 11 : Number(key)
    tone(620 + toneIndex * 22, .1, .026)
    if (key === "*") {
      setExtensionInput("*")
      setTranscript("請輸入三位數分機號碼。")
      speak("請輸入三位數分機號碼。")
      return
    }
    if (extensionInput.startsWith("*")) {
      if (!/^\d$/.test(key)) return
      const nextInput = `${extensionInput}${key}`.slice(0, 4)
      setExtensionInput(nextInput)
      if (nextInput.length === 4) {
        const extension = `#${nextInput.slice(1)}`
        const staffId = Object.entries(staffExtensions).find(([, value]) => value === extension)?.[0]
        const member = staff.find(item => item.id === staffId)
        if (member) routeTo(member)
        else {
          setPhase("unknown")
          setDialedNumber(extension)
          setTranscript(unknownScript)
          speak(unknownScript)
        }
      }
      return
    }
    const service = serviceOptions.find(option => option.digit === key)
    if (!service) return
    const staffId = service.staffIds[Math.floor(Math.random() * service.staffIds.length)]
    const member = staff.find(item => item.id === staffId)
    if (member) routeTo(member)
  }, [extensionInput, phase, routeTo, speak, tone])

  const callExtension = useCallback((staffId: string) => begin(staffId), [begin])
  const callMain = useCallback(() => begin(), [begin])
  const statusText = phase === "dialing" ? "正在撥號……"
    : phase === "ringing" ? "嘟——嘟——"
      : phase === "operator" ? "總機已接通"
        : phase === "transferring" ? "正在轉接分機……"
          : phase === "connected" ? `已接通 ${String(Math.floor(elapsed / 60)).padStart(2, "0")}:${String(elapsed % 60).padStart(2, "0")}`
            : phase === "busy" ? "分機無人接聽"
              : phase === "voicemail" ? "語音留言"
                : phase === "anomaly" ? "訊號異常"
                  : "未知分機"

  return <PhoneCallContext.Provider value={{callExtension,callMain}}>{children}{open&&<div className="phone-call-backdrop"><section className={`phone-call phone-call-${phase}`} role="dialog" aria-modal="true" aria-labelledby="phone-call-title">
    <p className="phone-call-kicker">ZHAITANG SECURE LINE</p><h2 id="phone-call-title">齋堂房屋不動產</h2>
    <p className="phone-call-number">{dialedNumber}{extensionInput&&<b>　{extensionInput}</b>}<small>04-2317-0317・網站互動功能・非實際電話號碼</small></p>
    <div className="phone-call-status" aria-live="polite"><i/><strong>{statusText}</strong></div>
    {recipient&&phase!=="voicemail"&&<div className="phone-call-recipient"><span>{getStaffExtension(recipient.id)}</span><h3>{recipient.name}</h3><p>{recipient.title}</p></div>}
    {phase==="voicemail"&&<div className="phone-call-recipient voicemail"><span>{recipient?`${getStaffExtension(recipient.id)} · VOICE MAIL`:"VOICE MAIL"}</span><h3>{recipient?`${recipient.name}｜語音留言`:"語音留言"}</h3><p>情境模擬・不會實際錄音</p></div>}
    {!recipient&&(phase==="unknown"||phase==="anomaly")&&<div className="phone-call-recipient unknown"><span>EXT. ???</span><h3>{phase==="unknown"?"未知分機":"無法辨識"}</h3></div>}
    {transcript&&<blockquote>「{transcript}」</blockquote>}
    {phase==="operator"&&<div className="phone-keypad" aria-label="電話鍵盤">{keypad.map(([key,letters])=><button type="button" key={key} onClick={()=>handleKey(key)} aria-label={`按鍵 ${key}`}><b>{key}</b>{letters&&<small>{letters}</small>}</button>)}</div>}
    <button className="hang-up" onClick={hangUp}><Phone/>掛斷</button>
  </section></div>}</PhoneCallContext.Provider>
}

declare global { interface Window { webkitAudioContext?: typeof AudioContext } }
