import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteShell } from "@/components/layout/SiteShell";
export const metadata: Metadata = {
  metadataBase: new URL("https://zhaitang.pages.dev"),
  applicationName: "齋堂房屋不動產",
  title: {
    default: "齋堂房屋不動產｜特殊物件與異常住宅處理",
    template: "%s｜齋堂房屋不動產",
  },
  description:
    "專營不動產、土地開發、新屋、成屋、中古屋買賣、土地開發與特殊物件處理。聽說在他們手上沒有賣不出去的物件只有他們想不想賣。也聽聞某些「特殊的物件」會特別請他們處理因為經過他們的手，都會變成「乾淨的物件」。歡迎來到齋屋不動產，請問你今天想委託，還是買房呢？",
  keywords: [
    "齋堂房屋",
    "齋堂不動產",
    "特殊物件",
    "凶宅",
    "不動產",
    "房屋買賣",
    "土地開發",
    "異常住宅",
    "靈異影像檢測",
  ],
  authors: [{ name: "齋堂房屋不動產" }],
  creator: "齋堂房屋不動產",
  publisher: "齋堂房屋不動產",
  category: "real estate",
  referrer: "origin-when-cross-origin",
  alternates: { canonical: "/" },
  formatDetection: { email: false, address: false, telephone: false },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "齋堂房屋",
    statusBarStyle: "black-translucent",
  },
  other: {
    "apple-itunes-app": "app-id=6749675167",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "齋堂房屋不動產|乾淨的房子，我們出售。不乾淨的，我們負責。",
    description:
      "專營不動產、土地開發、新屋、成屋、中古屋買賣、土地開發與特殊物件處理。聽說在他們手上沒有賣不出去的物件只有他們想不想賣。也聽聞某些「特殊的物件」會特別請他們處理因為經過他們的手，都會變成「乾淨的物件」。歡迎來到齋屋不動產，請問你今天想委託，還是買房呢？",
    type: "website",
    locale: "zh_TW",
    url: "/",
    siteName: "齋堂房屋不動產",
    images: [
      {
        url: "https://zhaitang.pages.dev/images/og.webp",
        width: 1200,
        height: 630,
        alt: "齋堂不動產員工合影",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "齋堂房屋不動產｜特殊物件與異常住宅處理",
    description:
      "乾淨的房子，我們出售。不乾淨的，我們負責。瀏覽齋堂房屋的特殊物件與處理紀錄。",
    images: ["/images/og.webp"],
  },
  icons: {
    icon: [
      { url: "/assets/favicon.ico" },
      { url: "/assets/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/assets/favicon.ico",
    apple: [{ url: "/assets/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0b0d0f",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
