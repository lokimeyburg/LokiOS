"use client"

import { useContext, useEffect, useState } from "react"
import { WindowContext } from "./window-context"
import { ClockIcon } from "./pixel-icons"

interface TaskbarProps {
  onStartClick: () => void
}

export default function Taskbar({ onStartClick }: TaskbarProps) {
  const { windows, activeWindowId, setActiveWindow } = useContext(WindowContext)

  useEffect(() => {
    
  }, [])

  return (
    <div
      className="h-10 flex items-center justify-center px-4 z-50"
      style={{
        background: "#C3B9C1",
        borderTop: "1px solid #000000",
        fontFamily: "'Press Start 2P', monospace"
      }}
    >
      <button
        className="h-8 px-4 flex items-center justify-center gap-2"
        style={{
          borderLeft: "1px solid #fff",
          borderTop: "1px solid #fff",
          borderBottom: "1px solid #000",
          borderRight: "1px solid #000",
        }}
        onClick={onStartClick}
      >
        <span className="text-[#000] text-xs">
          MENU
        </span>
      </button>

      <div className="text-[#000] text-xs fixed right-4"
        
      >
        <ClockIcon />
      </div>
    </div>
  )
}
