"use client"

import { useEffect, useState } from "react"
import LoadingScreen from "@/components/loading-screen"
import Desktop from "@/components/desktop"
import Taskbar from "@/components/taskbar"
import WindowManager from "@/components/window-manager"
import StartMenu from "@/components/start-menu"
import { WindowProvider } from "@/components/window-context"
import VaporWave from "@/components/vaporwave"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [showStartMenu, setShowStartMenu] = useState(false)

  useEffect(() => {
    // Load Google Font
    // var link = document.createElement("link")
    // link.href = "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=block"
    // link.rel = "stylesheet"
    // document.head.appendChild(link)

    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => {
      clearTimeout(timer)
      //   if (document.head.contains(link)) {
      //     document.head.removeChild(link)
      // }
    }
  }, [])

  const toggleStartMenu = () => {
    setShowStartMenu((prev) => !prev)
  }

  const closeStartMenu = () => {
    setShowStartMenu(false)
  }

  return (
    <>
      <VaporWave />
      <WindowProvider>
        <main
          className="h-screen w-screen overflow-hidden relative flex flex-col font-PressStart2P"
          style={{ maxHeight: "calc(100svh)"}}
        >
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              <div className="flex-1 relative" onClick={closeStartMenu}>
                <Desktop />
                <WindowManager />
              </div>
              {showStartMenu && <StartMenu onItemClick={closeStartMenu} />}
              <Taskbar onStartClick={toggleStartMenu} />
              
            </>
          )}
        </main>
      </WindowProvider>
    </>

  )
}
