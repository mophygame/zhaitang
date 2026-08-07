import type {Metadata} from "next";import "./globals.css";import {SiteShell} from "@/components/layout/SiteShell";
export const metadata:Metadata={title:{default:"齋堂房屋不動產｜特殊物件與異常住宅處理",template:"%s｜齋堂房屋不動產"},description:"專營不動產、土地開發與特殊物件處理。經過齋堂的手，只留下可以被出售的房子。",openGraph:{title:"齋堂房屋不動產",description:"乾淨的房子，我們出售。不乾淨的，我們負責。",type:"website",locale:"zh_TW"},icons:{icon:"/images/logo.webp"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="zh-Hant"><body><SiteShell>{children}</SiteShell></body></html>}
