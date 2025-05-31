"use client";

import React, { useContext, useRef, useState, useEffect } from "react";
import { WindowContext, type Window as WindowType } from "./window-context";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MinimizeIcon, MaximizeIcon, CloseIcon } from "./pixel-icons";

interface WindowProps {
  window: WindowType;
  isActive: boolean;
}

export default function Window({ window, isActive }: WindowProps) {
  const {
    closeWindow,
    setActiveWindow,
    maximizeWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useContext(WindowContext);

  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const windowRef = useRef<HTMLDivElement>(null);

  // Unified event handler for mouse and touch events
  const getClientCoordinates = (
    e:
      | MouseEvent
      | TouchEvent
      | React.MouseEvent
      | React.TouchEvent
  ) => {
    if ("touches" in e) {
      // React.TouchEvent or TouchEvent
      const touch = (e as TouchEvent | React.TouchEvent).touches[0];
      return { clientX: touch.clientX, clientY: touch.clientY };
    }
    // React.MouseEvent or MouseEvent
    const mouseEvent = e as MouseEvent | React.MouseEvent;
    return { clientX: mouseEvent.clientX, clientY: mouseEvent.clientY };
  };

  // Handle window dragging
  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const { clientX, clientY } = getClientCoordinates(e);
      updateWindowPosition(window.id, {
        x: clientX - dragOffset.x,
        y: clientY - dragOffset.y,
      });
    };

    const handleEnd = () => {
      setIsDragging(false);
      removeEventListeners(handleMove, handleEnd);
    };

    addEventListeners(handleMove, handleEnd);

    return () => removeEventListeners(handleMove, handleEnd);
  }, [isDragging, dragOffset, window.id, updateWindowPosition]);

  // Handle window resizing
  useEffect(() => {
    if (!isResizing) return;

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const { clientX, clientY } = getClientCoordinates(e);
      const newWidth = resizeStart.width + (clientX - resizeStart.x);
      const newHeight = resizeStart.height + (clientY - resizeStart.y);

      updateWindowSize(window.id, {
        width: Math.max(300, newWidth),
        height: Math.max(200, newHeight),
      });
    };

    const handleEnd = () => {
      setIsResizing(false);
      removeEventListeners(handleMove, handleEnd);
    };

    addEventListeners(handleMove, handleEnd);

    return () => removeEventListeners(handleMove, handleEnd);
  }, [isResizing, resizeStart, window.id, updateWindowSize]);

  // Add event listeners for both mouse and touch events
  const addEventListeners = (
    moveHandler: (e: MouseEvent | TouchEvent) => void,
    endHandler: (e: MouseEvent | TouchEvent) => void
  ) => {
    document.addEventListener("mousemove", moveHandler as EventListener);
    document.addEventListener("mouseup", endHandler as EventListener);
    document.addEventListener("touchmove", moveHandler as EventListener);
    document.addEventListener("touchend", endHandler as EventListener);
  };

  // Remove event listeners for both mouse and touch events
  const removeEventListeners = (
    moveHandler: (e: MouseEvent | TouchEvent) => void,
    endHandler: (e: MouseEvent | TouchEvent) => void
  ) => {
    document.removeEventListener("mousemove", moveHandler as EventListener);
    document.removeEventListener("mouseup", endHandler as EventListener);
    document.removeEventListener("touchmove", moveHandler as EventListener);
    document.removeEventListener("touchend", endHandler as EventListener);
  };

  // Handle title bar mouse/touch down
  const handleTitleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (window.isMaximized) return;

    const { clientX, clientY } = getClientCoordinates(e);
    setIsDragging(true);
    setDragOffset({
      x: clientX - (window.position?.x || 0),
      y: clientY - (window.position?.y || 0),
    });
  };

  // Handle resize handle mouse/touch down
  const handleResizeMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();

    const { clientX, clientY } = getClientCoordinates(e);
    setIsResizing(true);
    setResizeStart({
      x: clientX,
      y: clientY,
      width: window.size?.width || 500,
      height: window.size?.height || 400,
    });
  };

  // Handle window click to set active
  const handleWindowClick = () => {
    setActiveWindow(window.id);
  };

  // Window styles
  const style = window.isMaximized
    ? {
        top: 0,
        left: 0,
        width: "100%",
        height: "calc(100%)",
        border: "0px",
      }
    : {
        top: window.position?.y,
        left: window.position?.x,
        width: window.size?.width,
        height: window.size?.height,
        border: "1px solid #000",
      };

  return (
    <div
      ref={windowRef}
      className="absolute rounded pointer-events-auto flex flex-col shadow-[3px_3px_0px_rgba(0,0,0,0.3)]"
      style={style}
      onClick={handleWindowClick}
    >
      {/* Window title bar */}
      <div
        className="h-8 flex items-center justify-between px-2 cursor-move border-b border-[#000] rounded-tr rounded-tl"
        style={{
          background: "linear-gradient(to right, #C1BBBF, #D8D3D7)",
        }}
        onMouseDown={handleTitleMouseDown}
        onTouchStart={handleTitleMouseDown}
      >
        <div className="flex items-center gap-2 text-[#000] text-xs">{window.title}</div>
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
        className="flex-1 rounded-b"
        style={{
          background: "#FFFFFF",
        }}
      >
        <div className="p-2 text-[#000] text-xs">{window.content}</div>
      </ScrollArea>

      {/* Resize handle */}
      {!window.isMaximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
          onMouseDown={handleResizeMouseDown}
          onTouchStart={handleResizeMouseDown}
        />
      )}
    </div>
  );
}

// This function would be implemented in the WindowContext
function minimizeWindow(id: string) {
  console.log("Minimize window", id);
}