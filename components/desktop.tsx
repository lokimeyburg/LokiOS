"use client"

import { useContext, useState, useEffect } from "react"
import { WindowContext } from "./window-context"
import { AboutIcon, NeptuneIcon, SparkIcon, SignalIcon } from "./pixel-icons"
import { AboutContent } from "./windowContent/about"

export default function Desktop() {
  const { openWindow } = useContext(WindowContext)
  const [visibleIcons, setVisibleIcons] = useState<number[]>([])

  const desktopIcons = [
    {
      id: "about",
      title: "LOKI",
      icon: <AboutIcon />,
      content: <AboutContent />,
    },
    {
      id: "neptune",
      title: "NEPTUNE",
      icon: <NeptuneIcon />,
      content: "Neptune - Deep space exploration module.",
    },
    {
      id: "spark",
      title: "SPARK",
      icon: <SparkIcon />,
      content: "Spark - Energy management system.",
    },
    {
      id: "signal",
      title: "SIGNAL",
      icon: <SignalIcon />,
      content: "Signal - Communication interface.",
    },
  ]

  // openWindow(desktopIcons[0]) // Open the first icon by default

  useEffect(() => {
    // Start the staggered animation
    desktopIcons.forEach((_, index) => {
      setTimeout(() => {
        setVisibleIcons((prev) => [...prev, index])
      }, index * 250) // 150ms delay between each icon
    })
  }, [])

  return (
    <div
      className="h-full w-full flex"
      style={{
        background: "transparent"
      }}
    >
      <div className="w-[120px] h-full p-4 pt-10 flex flex-col gap-10">
        {desktopIcons.map((icon, index) => (
          <div
            key={icon.id}
            className={`flex flex-col items-center justify-center gap-2 cursor-pointer ${
              visibleIcons.includes(index) ? "animate-fade-in" : "opacity-0"
            }`}
            onClick={() =>
              openWindow({
                id: icon.id,
                title: icon.title,
                content: icon.content,
                icon: icon.icon,
              })
            }
          >
            <div className="w-12 h-12">{icon.icon}</div>
            <div
              className="text-[#fff] text-xs"
            >
              {icon.title}
            </div>
          </div>
        ))}
      </div>
      <div className="flex-1"></div>
    </div>
  )
}
