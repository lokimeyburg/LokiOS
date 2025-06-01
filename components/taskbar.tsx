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
      className="h-10 flex items-center justify-center px-4 z-50 gap-2"
      style={{
        background: "#202830",
        borderTop: "1px solid #3d444d",
        fontFamily: "'Press Start 2P', monospace"
      }}
    >
      <button
        className="h-8 px-4 flex items-center justify-center gap-2"
        style={{
          borderLeft: "2px solid #3d444d",
          borderTop: "2px solid #3d444d",
          borderBottom: "2px solid #151b23",
          borderRight: "2px solid #151b23",
        }}
        onClick={onStartClick}
      >
        <span className="text-[#fff] text-xs">
          START
        </span>
      </button>

      {windows.map((window) => (
        <button
          key={window.id}
          className={`h-8 px-2 flex items-center gap-1 text-xs ${
            window.id === activeWindowId
              ? "bg-[#202830] text-[#fff]"
              : "bg-[#202830] text-[#fff]/70 hover:bg-[#002233]"
          }`}
          style={{
            borderLeft: "2px solid #3d444d",
            borderTop: "2px solid #3d444d",
            borderBottom: "2px solid #151b23",
            borderRight: "2px solid #151b23",
          }}
          onClick={() => setActiveWindow(window.id)}
        >
          <span className="truncate max-w-[100px]">{window.title}</span>
        </button>
      ))}


      <div className="text-[#fff] text-xs fixed right-4">
        <ClockIcon />
      </div>
    </div>
  )
}
