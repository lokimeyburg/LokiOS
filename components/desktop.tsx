"use client"

import { useContext } from "react"
import { WindowContext } from "./window-context"
import { AboutIcon, NeptuneIcon, SparkIcon, SignalIcon } from "./pixel-icons"

export default function Desktop() {
  const { openWindow } = useContext(WindowContext)

  const desktopIcons = [
    {
      id: "about",
      title: "About",
      icon: <AboutIcon />,
      content: "About LOKI OS - Your retro-style operating system.",
    },
    {
      id: "neptune",
      title: "Neptune",
      icon: <NeptuneIcon />,
      content: "Neptune - Deep space exploration module.",
    },
    {
      id: "spark",
      title: "Spark",
      icon: <SparkIcon />,
      content: "Spark - Energy management system.",
    },
    {
      id: "signal",
      title: "Signal",
      icon: <SignalIcon />,
      content: "Signal - Communication interface.",
    },
  ]

  // openWindow(desktopIcons[0]) // Open the first icon by default

  return (
    <div
      className="h-full w-full flex"
      style={{
        background: "linear-gradient(to bottom, #C5A9E0, #7CDFD9)",
        imageRendering: "pixelated",
      }}
    >
      <div className="w-[120px] h-full p-4 flex flex-col gap-10">
        {desktopIcons.map((icon) => (
          <div
            key={icon.id}
            className="flex flex-col items-center justify-center gap-2 cursor-pointer"
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
              className="text-[#000] text-xs"
              style={{ imageRendering: "pixelated" }}
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
