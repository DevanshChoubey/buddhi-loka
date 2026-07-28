import type React from "react"
import "./globals.css"
import { Inter, Space_Grotesk } from "next/font/google"
import type { Metadata } from "next"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "Buddhi Loka - AI, GenAI, Computer Vision & Deep Learning Blog",
  description: "Exploring the frontiers of artificial intelligence, generative AI, computer vision, and deep learning.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans relative min-h-screen`}>
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false} themes={["dark", "light"]}>
          <div className="bg-orbs">
            <div className="orb orb1" />
            <div className="orb orb2" />
            <div className="orb orb3" />
          </div>
          <div className="bg-noise" />
          <div className="relative z-[2]">{children}</div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
