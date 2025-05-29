"use client"

import { useContext, useEffect, useState } from "react"
import { WindowContext } from "./window-context"

interface TaskbarProps {
  onStartClick: () => void
}

export default function Taskbar({ onStartClick }: TaskbarProps) {
  const { windows, activeWindowId, setActiveWindow } = useContext(WindowContext)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [currentDate, setCurrentDate] = useState(formatDate(new Date()))

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now)
      setCurrentDate(formatDate(now))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  function formatDate(date: Date) {
    const month = date.getMonth() + 1
    const day = date.getDate()
    const year = date.getFullYear().toString().slice(2)
    return `${month}/${day}/${year}`
  }

  function formatTime(date: Date) {
    let hours = date.getHours()
    const minutes = date.getMinutes()
    const ampm = hours >= 12 ? "PM" : "AM"
    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? "0" + minutes : minutes
    return `${hours}:${minutesStr} ${ampm}`
  }

  return (
    <div
      className="h-10 flex items-center justify-center px-4 z-50"
      style={{
        background: "#C3B9C1",
        borderTop: "2px solid #000000",
        fontFamily: "'Press Start 2P', monospace"
      }}
    >
      <button
        className="h-8 px-6 flex items-center justify-center gap-2"
        style={{
          borderLeft: "2px solid #fff",
          borderRight: "2px solid #fff",
        }}
        onClick={onStartClick}
      >
        <span className="text-[#000] text-xs">
          START
        </span>
      </button>

      <div className="text-[#000] text-xs fixed right-4">
        {currentDate}
      </div>
    </div>
  )
}
