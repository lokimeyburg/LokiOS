"use client"

import { useContext } from "react"
import { WindowContext } from "./window-context"
import Window from "./window"

export default function WindowManager() {
  const { windows, activeWindowId } = useContext(WindowContext)

  // Sort windows so that the active window is rendered last (on top)
  const sortedWindows = [...windows].sort((a, b) => {
    if (a.id === activeWindowId) return 1
    if (b.id === activeWindowId) return -1
    return 0
  })

  return (
    <div className="absolute inset-0 pointer-events-none">
      {sortedWindows.map((window) => (
        <Window key={window.id} window={window} isActive={window.id === activeWindowId} />
      ))}
    </div>
  )
}
