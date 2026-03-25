"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isOnWhite, setIsOnWhite] = useState(false);

  useEffect(() => {
    const isColorLight = (color: string): boolean => {
      // Handle rgba and rgb colors
      const rgba = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
      if (rgba) {
        const r = parseInt(rgba[1]);
        const g = parseInt(rgba[2]);
        const b = parseInt(rgba[3]);
        const a = rgba[4] ? parseFloat(rgba[4]) : 1;
        
        // If mostly transparent, return false to check parent
        if (a < 0.5) return false;
        
        // Calculate brightness
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 200;
      }
      return false;
    };

    const getBackgroundColor = (element: HTMLElement | null): boolean => {
      let current = element;
      while (current) {
        const bgColor = window.getComputedStyle(current).backgroundColor;
        const rgba = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
        
        if (rgba) {
          const a = rgba[4] ? parseFloat(rgba[4]) : 1;
          // If not transparent, check if it's light
          if (a >= 0.1) {
            return isColorLight(bgColor);
          }
        }
        current = current.parentElement;
        
        // Stop at body or html
        if (current === document.body || current === document.documentElement) {
          const bodyBg = window.getComputedStyle(current).backgroundColor;
          return isColorLight(bodyBg);
        }
      }
      return false;
    };

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check background color of element under cursor
      const target = e.target as HTMLElement;
      if (target) {
        const isWhiteBackground = getBackgroundColor(target);
        setIsOnWhite(isWhiteBackground);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest("a, button, [role='button'], input[type='submit'], input[type='button']");
      setIsHovering(!!isClickable);
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <img
          src="/cursor.png"
          alt=""
          className={`transition-all duration-200 ${
            isHovering ? "w-12 h-12" : "w-10 h-10"
          }`}
          style={{
            filter: isOnWhite ? "brightness(0)" : "none",
          }}
        />
      </div>
    </>
  );
}
