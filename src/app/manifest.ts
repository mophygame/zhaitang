import type { MetadataRoute } from "next"

export const dynamic = "force-static"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "齋堂房屋不動產",
    short_name: "齋堂房屋",
    description: "特殊物件、異常住宅處理與不動產服務。",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0d0f",
    theme_color: "#0b0d0f",
    lang: "zh-Hant-TW",
    icons: [
      { src: "/assets/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/assets/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  }
}
