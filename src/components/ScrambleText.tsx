"use client"

import { useState, useEffect, useCallback, useRef } from "react"

const CHARS = "!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

interface ScrambleTextProps {
  text: string
  className?: string
  as?: "span" | "h1" | "h2" | "h3" | "p"
  scrambleOn?: "hover" | "view" | "always"
}

export default function ScrambleText({
  text,
  className = "",
  as: Tag = "span",
  scrambleOn = "hover",
}: ScrambleTextProps) {
  const [display, setDisplay] = useState(text)
  const [isScrambling, setIsScrambling] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const frameRef = useRef(0)
  const maxFrames = useRef(0)

  const scramble = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setIsScrambling(true)
    frameRef.current = 0
    maxFrames.current = 12 + Math.floor(Math.random() * 8)

    intervalRef.current = setInterval(() => {
      frameRef.current++
      const progress = frameRef.current / maxFrames.current
      const revealCount = Math.floor(text.length * Math.min(progress * 1.2, 1))

      let result = ""
      for (let i = 0; i < text.length; i++) {
        if (i < revealCount) {
          result += text[i]
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)]
        }
      }
      setDisplay(result)

      if (frameRef.current >= maxFrames.current) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setDisplay(text)
        setIsScrambling(false)
      }
    }, 40)
  }, [text])

  const handleInteraction = useCallback(() => {
    if (!isScrambling) scramble()
  }, [isScrambling, scramble])

  useEffect(() => {
    if (scrambleOn === "always") {
      const t = setTimeout(() => scramble(), 500)
      return () => clearTimeout(t)
    }
  }, [scrambleOn, scramble])

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <Tag
      className={className}
      onMouseEnter={scrambleOn === "hover" ? handleInteraction : undefined}
      onTouchStart={scrambleOn === "hover" ? handleInteraction : undefined}
      style={{ cursor: scrambleOn === "hover" ? "pointer" : undefined }}
    >
      {display}
    </Tag>
  )
}
