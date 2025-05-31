"use client"

import { useContext } from "react"
import { WindowContext } from "./window-context"
import { AboutIconSmall, NeptuneIconSmall, SparkIconSmall, SignalIconSmall } from "./pixel-icons"
import { Power, Users } from "lucide-react"
import { AboutContent } from "./windowContent/about"

interface StartMenuProps {
  onItemClick: () => void
}

export default function StartMenu({ onItemClick }: StartMenuProps) {
  const { openWindow } = useContext(WindowContext)

  const menuItems = [
    {
      id: "about",
      name: "About",
      icon: <AboutIconSmall />,
      content: <AboutContent />,
    },
    {
      id: "neptune",
      name: "Neptune",
      icon: <NeptuneIconSmall />,
      content: (
        <div>
          <h2 className="text-xl font-bold mb-4">Neptune</h2>
          <p>Deep space exploration module.</p>
        </div>
      ),
    },
    {
      id: "spark",
      name: "Spark",
      icon: <SparkIconSmall />,
      content: (
        <div>
          <h2 className="text-xl font-bold mb-4">Spark</h2>
          <p>Energy management system.</p>
        </div>
      ),
    },
    {
      id: "signal",
      name: "Signal",
      icon: <SignalIconSmall />,
      content: (
        <div>
          <h2 className="text-xl font-bold mb-4">Signal</h2>
          <p>Communication interface.</p>
        </div>
      ),
    }
  ]

  const handleItemClick = (item: (typeof menuItems)[0]) => {
    openWindow({
      id: item.id,
      title: item.name,
      content: item.content,
      icon: item.icon,
    })
    onItemClick()
  }

  return (
    <div
      className="absolute mr-auto ml-auto left-0 right-0 bottom-10 w-64 z-50 rounded-t-md shadow-[4px_4px_0px_rgba(0,0,0,0.3)]"
      style={{
        borderTop: "1px solid #000",
        borderLeft: "1px solid #000",
        borderRight: "1px solid #000",
        background: "#DCD7DB",
      }}
    >
      <div
        className="p-3 border-b border-[#000] rounded-t-md"
        style={{
          background: "linear-gradient(to left, #C5A9E0, #7CDFD9)"
        }}
      >
        <div className="text-sm text-[#000]">
          LOKI OS
        </div>
        <div className="text-xs text-[#000]">
          AESTHETIC EDITION
        </div>
      </div>

      <div className="py-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className="text-xs w-full px-4 py-3 flex items-center gap-3 hover:bg-[#C3B9C1] text-[#000] text-left"
            onClick={() => handleItemClick(item)}
          >
            <div className="w-6 h-6">{item.icon}</div>
            <span>{item.name}</span>
          </button>
        ))}

        <div className="border-t border-[#000] mt-2 pt-2">
          <button
            className="text-xs w-full px-4 py-3 flex items-center gap-3 hover:bg-[#C3B9C1] text-[#000] text-left"
            onClick={onItemClick}
          >
            <span>Credits</span>
          </button>
          <button
            className="text-xs w-full px-4 py-3 flex items-center gap-3 hover:bg-[#C3B9C1] text-[#000] text-left"
            onClick={onItemClick}
          >
            <span>Shut Down</span>
          </button>
        </div>
      </div>
    </div>
  )
}
