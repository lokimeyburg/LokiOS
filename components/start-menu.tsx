"use client"

import { useContext } from "react"
import { WindowContext } from "./window-context"
import { AboutIconSmall, NeptuneIconSmall, SparkIconSmall, SignalIconSmall } from "./pixel-icons" 
import { Power, Users } from "lucide-react"
import { AboutContent } from "./windowPages/about"

interface StartMenuProps {
  onItemClick: () => void
}

export default function StartMenu({ onItemClick }: StartMenuProps) {
  const { openWindow } = useContext(WindowContext)


  const menuItems = [
    {
      id: "about",
      title: "LOKI",
      icon: <AboutIconSmall />,
      content: <AboutContent />,
    },
    {
      id: "neptune",
      title: "NEPTUNE",
      icon: <NeptuneIconSmall />,
      content: "Neptune - Deep space exploration module.",
    },
    {
      id: "spark",
      title: "SPARK",
      icon: <SparkIconSmall />,
      content: "Spark - Energy management system.",
    },
    {
      id: "signal",
      title: "SIGNAL",
      icon: <SignalIconSmall />,
      content: "Signal - Communication interface.",
    },
  ]

  const handleItemClick = (item: (typeof menuItems)[0]) => {
    openWindow({
      id: item.id,
      title: item.title,
      content: item.content,
      icon: item.icon,
    })
    onItemClick()
  }

  return (
    <div
      className="absolute mr-auto ml-auto left-0 right-0 bottom-10 w-64 z-50 rounded-t-md shadow-[4px_4px_0px_rgba(0,0,0,0.3)]"
      style={{
        borderTop: "1px solid #3d444d",
        borderLeft: "1px solid #3d444d",
        borderRight: "1px solid #3d444d",
        background: "#262c36",
      }}
    >
      <div
        className="p-3 border-b border-[#3d444d] rounded-t-md"
        style={{
          background: "linear-gradient(to left, #262c36, #151b23)"
        }}
      >
        <div className="text-sm text-[#fff]">
          LOKI OS
        </div>
        <div className="text-xs text-[#fff]">
          AESTHETIC EDITION
        </div>
      </div>

      <div className="py-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className="text-xs w-full px-4 py-3 flex items-center gap-3 hover:bg-[#3d444d] text-[#fff] text-left"
            onClick={() => handleItemClick(item)}
          >
            <div className="w-6 h-6">{item.icon}</div>
            <span>{item.title}</span>
          </button>
        ))}

        <div className="border-t border-[#151b23] mt-2 pt-2">
          <button
            className="text-xs w-full px-4 py-3 flex items-center gap-3 hover:bg-[#3d444d] text-[#fff] text-left"
            onClick={onItemClick}
          >
            <span>Credits</span>
          </button>
          <button
            className="text-xs w-full px-4 py-3 flex items-center gap-3 hover:bg-[#3d444d] text-[#fff] text-left"
            onClick={onItemClick}
          >
            <span>Shut Down</span>
          </button>
        </div>
      </div>
    </div>
  )
}
