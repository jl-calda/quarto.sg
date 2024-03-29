import "@/styles/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Dialog } from "@/components/ui/dialog"
import { Toaster } from "@/components/Toaster"
import Navbar from "@/components/navbar/Navbar"
import Searchbar from "@/components/searchbar/Searchbar"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

import getCurrentUser from "./actions/getCurrentUser"
import AuthContext from "./context/AuthContext"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const currentUser = await getCurrentUser()
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x52"
            href="/favicon/favicon-32x32"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/favicon/android-chrome-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="512x512"
            href="/favicon/android-chrome-512x512.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="192x192"
            href="/favicon/apple-touch-icon.png"
          />
        </head>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <AuthContext>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="relative flex flex-col min-h-screen">
                <Dialog>
                  <Navbar currentUser={currentUser} />
                  <Searchbar />
                  <div className="flex-1">{children}</div>
                </Dialog>
              </div>
              <Toaster />
              <TailwindIndicator />
            </ThemeProvider>
          </AuthContext>
        </body>
      </html>
    </>
  )
}
