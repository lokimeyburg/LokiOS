"use client"

import type React from "react"

import { useContext, useRef, useState, useEffect } from "react"
import { WindowContext, type Window as WindowType } from "./window-context"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MinimizeIcon, MaximizeIcon, CloseIcon } from "./pixel-icons"

interface WindowProps {
  window: WindowType
  isActive: boolean
}

export default function Window({ window, isActive }: WindowProps) {
  const { closeWindow, setActiveWindow, maximizeWindow, updateWindowPosition, updateWindowSize } =
    useContext(WindowContext)

  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 })

  const windowRef = useRef<HTMLDivElement>(null)

  // Handle window dragging
  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      updateWindowPosition(window.id, {
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, dragOffset, window.id, updateWindowPosition])

  // Handle window resizing
  useEffect(() => {
    if (!isResizing) return

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = resizeStart.width + (e.clientX - resizeStart.x)
      const newHeight = resizeStart.height + (e.clientY - resizeStart.y)

      updateWindowSize(window.id, {
        width: Math.max(300, newWidth),
        height: Math.max(200, newHeight),
      })
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isResizing, resizeStart, window.id, updateWindowSize])

  const handleTitleMouseDown = (e: React.MouseEvent) => {
    if (window.isMaximized) return

    setIsDragging(true)
    setDragOffset({
      x: e.clientX - (window.position?.x || 0),
      y: e.clientY - (window.position?.y || 0),
    })
  }

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsResizing(true)
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: window.size?.width || 500,
      height: window.size?.height || 400,
    })
  }

  const handleWindowClick = () => {
    setActiveWindow(window.id)
  }

  const style = window.isMaximized
    ? {
        top: 0,
        left: 0,
        width: "100%",
        height: "calc(100% - 40px)", // Subtract taskbar height
      }
    : {
        top: window.position?.y,
        left: window.position?.x,
        width: window.size?.width,
        height: window.size?.height,
      }

  return (
    <div
      ref={windowRef}
      className="absolute rounded pointer-events-auto flex flex-col shadow-[3px_3px_0px_rgba(138,92,221,0.3)]"
      style={{
        ...style,
        border: "2px solid #000",
      }}
      onClick={handleWindowClick}
    >
      {/* Window title bar */}
      <div
        className="h-8 flex items-center justify-between px-2 cursor-move border-b border-[#000]"
        style={{
          background: "linear-gradient(to right, #C1BBBF, #D8D3D7)"
        }}
        onMouseDown={handleTitleMouseDown}
      >
        <div className="flex items-center gap-2 text-[#000] text-xs">
          {window.title}
        </div>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center" onClick={() => minimizeWindow(window.id)}>
            <MinimizeIcon />
          </button>
          <button className="w-8 h-8 flex items-center justify-center" onClick={() => maximizeWindow(window.id)}>
            <MaximizeIcon />
          </button>
          <button className="w-8 h-8 flex items-center justify-center" onClick={() => closeWindow(window.id)}>
            <CloseIcon />
          </button>
        </div>
      </div>

      {/* Window content */}
      <ScrollArea
        className="flex-1"
        style={{
          background: "#FFE6F2",
        }}
      >
        <div className="p-4 text-[#000] text-xs">{window.content}</div>
      </ScrollArea>

      {/* Resize handle */}
      {!window.isMaximized && (
        <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize" onMouseDown={handleResizeMouseDown} />
      )}
    </div>
  )
}

// This function would be implemented in the WindowContext
// but we need it here for the minimize button
function minimizeWindow(id: string) {
  // In a real implementation, this would minimize the window
  console.log("Minimize window", id)
}
