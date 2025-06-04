"use client"

import { useEffect, useState } from "react"

export default function LoadingScreen() {
  const [dots, setDots] = useState("")
  const [bootingText, setBootingText] = useState("")
  const bootText = "BOOTING /"

  useEffect(() => {
    let count = 0
    let textIndex = 0

    const interval = setInterval(() => {
      count = (count + 1) % 4
      setDots(".".repeat(count))

      if (textIndex < bootText.length) {
        textIndex++
        setBootingText(bootText.substring(0, textIndex))
      }
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-full w-full flex flex-col items-center justify-center font-PressStart2P bg-[#000]">
      <div
        className="text-center p-8 text-[#00FFAA]"
      >
        <div className="text-sm mb-6">
          LOKI OS
        </div>
        <div className="mb-2 text-xs">
          COPYRIGHT (C) 2025 LOKI.IO LTD
        </div>
        <div className="mb-6 text-xs">
          BUILD 4804 : 2505192317
        </div>
        <div className="mb-1 text-xs">
          EDITION : AESTHETIC
        </div>
        <div className="mb-6 text-xs">
          SOME NUMBERS : 805250k
        </div>
        <div className="text-xs">
          {bootingText}
          {dots}
        </div>
      </div>
    </div>
  )
}
