"use client"

import { createContext, useState, type ReactNode } from "react"

export interface Window {
  id: string
  title: string
  content: ReactNode
  icon?: ReactNode
  position?: { x: number; y: number }
  size?: { width: number; height: number }
  isMaximized?: boolean
}

interface WindowContextType {
  windows: Window[]
  activeWindowId: string | null
  openWindow: (window: Window) => void
  closeWindow: (id: string) => void
  setActiveWindow: (id: string) => void
  maximizeWindow: (id: string) => void
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void
  updateWindowSize: (id: string, size: { width: number; height: number }) => void
}

export const WindowContext = createContext<WindowContextType>({
  windows: [],
  activeWindowId: null,
  openWindow: () => {},
  closeWindow: () => {},
  setActiveWindow: () => {},
  maximizeWindow: () => {},
  updateWindowPosition: () => {},
  updateWindowSize: () => {},
})

export function WindowProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<Window[]>([])
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null)

  const openWindow = (osWindow: Window) => {
    // Check if window is already open
    if (windows.some((w) => w.id === osWindow.id)) {
      setActiveWindowId(osWindow.id);
      return;
    }

    // Detect if the device is mobile (viewport width < 758px)
    const isMobile = typeof window !== "undefined" && window.innerWidth < 758;

    // Set default position and size based on device type
    const newWindow = {
      ...osWindow,
      position: osWindow.position || (isMobile
        ? { x: 15, y: 15 } // 10px margin on top, 5px on the sides
        : {
            x: 50 + ((windows.length * 20) % 200),
            y: 50 + ((windows.length * 20) % 150),
          }),
      size: osWindow.size || (isMobile
        ? {
            width: window.innerWidth - 30, // Full width minus 10px margin
            height: window.innerHeight - 70, // Full height minus 20px margin (10px top and bottom)
          }
        : { width: 500, height: 400 }),
      isMaximized: osWindow.isMaximized || false,
    };

    setWindows([...windows, newWindow]);
    setActiveWindowId(osWindow.id);
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter((window) => window.id !== id))
    if (activeWindowId === id) {
      const remainingWindows = windows.filter((window) => window.id !== id)
      setActiveWindowId(remainingWindows.length > 0 ? remainingWindows[remainingWindows.length - 1].id : null)
    }
  }

  const setActiveWindow = (id: string) => {
    setActiveWindowId(id)
  }

  const maximizeWindow = (id: string) => {
    setWindows(windows.map((window) => (window.id === id ? { ...window, isMaximized: !window.isMaximized } : window)))
  }

  const updateWindowPosition = (id: string, position: { x: number; y: number }) => {
    setWindows(windows.map((window) => (window.id === id ? { ...window, position } : window)))
  }

  const updateWindowSize = (id: string, size: { width: number; height: number }) => {
    setWindows(windows.map((window) => (window.id === id ? { ...window, size } : window)))
  }

  return (
    <WindowContext.Provider
      value={{
        windows,
        activeWindowId,
        openWindow,
        closeWindow,
        setActiveWindow,
        maximizeWindow,
        updateWindowPosition,
        updateWindowSize,
      }}
    >
      {children}
    </WindowContext.Provider>
  )
}
