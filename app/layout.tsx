import type React from "react"
import type { Metadata } from "next"
import { Vazirmatn } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-vazirmatn",
})

const amiri = localFont({
  src: [
    {
      path: "./fonts/Amiri-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Amiri-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-amiri",
  display: "swap",
})

export const metadata: Metadata = {
  title: "مجتمع اقامتی دریاکنار بندر مقام",
  description: "تجربه‌ای فراموش‌نشدنی در قلب طبیعت ساحلی هرمزگان",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} ${amiri.variable} antialiased`}>
      <body>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
