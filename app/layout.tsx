import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

export const metadata: Metadata = {
  title: 'Loki Meyburg',
  description: "I create product concepts, lead product teams and try to work out what's happening next.",
  generator: 'v0.dev',
}

const pressStart2P = localFont({
  src: [{ path: '../public/fonts/PressStart2P-Regular.ttf',}],
  variable: '--font-PressStart2P'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${pressStart2P.variable}`} style={{ height: "100%", overflow:"hidden", position: "relative"}}>
      <head>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
