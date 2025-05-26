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
    <div
      className="h-full w-full flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(to bottom, #C5A9E0, #7CDFD9)",
        imageRendering: "pixelated",
        fontFamily: "'Press Start 2P', monospace"
      }}
    >
      <div
        className="text-center p-8 shadow-[8px_8px_0px_rgba(138,92,221,0.3)]"
        style={{
          border: "4px solid #8A5CDD",
          background: "#FFE6F2",
          imageRendering: "pixelated",
        }}
      >
        <div className="text-2xl mb-2 text-[#8A5CDD] font-bold">
          LOKI OS - PIXEL
        </div>
        <div className="mb-2 text-[#8A5CDD]">
          COPYRIGHT (C) 2025 LOKI.IO LTD
        </div>
        <div className="mb-6 text-[#8A5CDD]">
          BUILD 4804 : 2505192317 GMT+00:00
        </div>
        <div className="mb-1 text-[#8A5CDD]">
          MAIN PROCESSOR : BIG BRAIN
        </div>
        <div className="mb-6 text-[#8A5CDD]">
          SOME NUMBERS : 805250k
        </div>
        <div className="text-2xl text-[#8A5CDD] font-bold">
          {bootingText}
          {dots}
        </div>
      </div>
    </div>
  )
}
