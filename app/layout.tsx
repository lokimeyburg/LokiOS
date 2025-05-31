import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Loki Meyburg',
  description: "I create product concepts, lead product teams and try to work out what's happening next.",
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" style={{ height: "100%", overflow:"hidden", position: "relative"}}>
      <body>
        {children}
      </body>
    </html>
  )
}
