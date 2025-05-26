"use client"

import { useContext } from "react"
import { WindowContext } from "./window-context"
import { AboutIcon, NeptuneIcon, SparkIcon, SignalIcon } from "./pixel-icons"
import { Power, Users } from "lucide-react"

interface StartMenuProps {
  onItemClick: () => void
}

export default function StartMenu({ onItemClick }: StartMenuProps) {
  const { openWindow } = useContext(WindowContext)

  const menuItems = [
    {
      id: "about",
      name: "About",
      icon: <AboutIcon />,
      content: (
        <div>
          <h2 className="text-xl font-bold mb-4">About LOKI OS</h2>
          <p className="mb-2">Welcome to your pixelated operating system.</p>
          <p className="mb-2">Version 1.0.0 - Pixel Edition</p>
          <p>Inspired by the nostalgic computing experience of the 90s.</p>
        </div>
      ),
    },
    {
      id: "neptune",
      name: "Neptune",
      icon: <NeptuneIcon />,
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
      icon: <SparkIcon />,
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
      icon: <SignalIcon />,
      content: (
        <div>
          <h2 className="text-xl font-bold mb-4">Signal</h2>
          <p>Communication interface.</p>
        </div>
      ),
    },
    {
      id: "credits",
      name: "Credits",
      icon: <Users size={16} className="text-[#8A5CDD]" />,
      content: (
        <div>
          <h2 className="text-xl font-bold mb-4">Credits</h2>
          <p className="mb-2">LOKI OS was developed by the Pixel team.</p>
          <p>Pixel Edition - 2025</p>
        </div>
      ),
    },
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
      className="absolute bottom-10 left-0 w-64 z-50 shadow-[8px_8px_0px_rgba(138,92,221,0.3)]"
      style={{
        border: "4px solid #8A5CDD",
        background: "#C5A9E0",
        imageRendering: "pixelated",
      }}
    >
      <div
        className="p-3 border-b-2 border-[#8A5CDD]"
        style={{
          background: "#C5A9E0",
          imageRendering: "pixelated",
        }}
      >
        <div className="text-xl text-[#8A5CDD] font-bold" style={{ fontFamily: "monospace" }}>
          LOKI OS
        </div>
        <div className="text-sm text-[#8A5CDD]" style={{ fontFamily: "monospace" }}>
          PIXEL EDITION
        </div>
      </div>

      <div className="py-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className="w-full px-4 py-2 flex items-center gap-3 hover:bg-[#FFA6E6] text-[#8A5CDD] font-bold text-left"
            style={{ fontFamily: "monospace" }}
            onClick={() => handleItemClick(item)}
          >
            <div className="w-6 h-6">{item.icon}</div>
            <span>{item.name}</span>
          </button>
        ))}

        <div className="border-t-2 border-[#8A5CDD] mt-2 pt-2">
          <button
            className="w-full px-4 py-2 flex items-center gap-3 hover:bg-[#FFA6E6] text-[#8A5CDD] font-bold text-left"
            style={{ fontFamily: "monospace" }}
            onClick={onItemClick}
          >
            <Power size={16} className="text-[#8A5CDD]" />
            <span>Shut Down</span>
          </button>
        </div>
      </div>
    </div>
  )
}
