"use client"

import { useEffect, useState } from "react"
import LoadingScreen from "@/components/loading-screen"
import Desktop from "@/components/desktop"
import Taskbar from "@/components/taskbar"
import WindowManager from "@/components/window-manager"
import StartMenu from "@/components/start-menu"
import { WindowProvider } from "@/components/window-context"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [showStartMenu, setShowStartMenu] = useState(false)

  useEffect(() => {
    // Load Google Font
    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=block"
    link.rel = "stylesheet"
    document.head.appendChild(link)

    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => {
      clearTimeout(timer)
        if (document.head.contains(link)) {
          document.head.removeChild(link)
      }
    }
  }, [])

  const toggleStartMenu = () => {
    setShowStartMenu((prev) => !prev)
  }

  const closeStartMenu = () => {
    setShowStartMenu(false)
  }

  return (
    <WindowProvider>
      <main
        className="h-screen w-screen overflow-hidden relative flex flex-col"
        style={{ fontFamily: "'Press Start 2P', monospace" }}
      >
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            <div className="flex-1 relative" onClick={closeStartMenu}>
              <Desktop />
              <WindowManager />
            </div>
            <Taskbar onStartClick={toggleStartMenu} />
            {showStartMenu && <StartMenu onItemClick={closeStartMenu} />}
          </>
        )}
      </main>
    </WindowProvider>
  )
}
