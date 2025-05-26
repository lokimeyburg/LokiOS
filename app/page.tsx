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
    // Add a pixelated font
    const style = document.createElement("style")
    style.textContent = `
      @font-face {
        font-family: 'PixelFont';
        src: local('Courier New');
        font-display: swap;
      }
      
      * {
        font-family: 'PixelFont', monospace;
      }
    `
    document.head.appendChild(style)

    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => {
      clearTimeout(timer)
      document.head.removeChild(style)
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
        style={{ imageRendering: "pixelated" }}
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
