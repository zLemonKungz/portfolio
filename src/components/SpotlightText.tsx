"use client"

import { useRef, useEffect } from "react"
import { motion, useMotionValue, useMotionTemplate } from "framer-motion"

interface Props {
  text: string
  brightColor?: string
  dimColor?: string
  maskSize?: number
  className?: string
}

export default function SpotlightText({
  text,
  brightColor = "#2D1B2E",
  dimColor = "rgba(125, 121, 121, 0.18)",
  maskSize = 180,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const maskX = useMotionValue(-9999)
  const maskY = useMotionValue(-9999)
  const maskImage = useMotionTemplate`radial-gradient(circle ${maskSize}px at ${maskX}px ${maskY}px, black 10%, transparent 100%)`

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      maskX.set(e.clientX - rect.left)
      maskY.set(e.clientY - rect.top)
    }

    el.addEventListener("pointermove", onMove)
    return () => el.removeEventListener("pointermove", onMove)
  }, [maskX, maskY])

  return (
    <div ref={ref} className={`relative w-full ${className}`}>
      {/* Dim layer */}
      <p className="w-full m-0 select-none whitespace-pre-wrap break-words" style={{ color: dimColor }}>
        {text}
      </p>
      {/* Bright layer with spotlight mask */}
      <motion.p
        aria-hidden
        className="absolute inset-0 select-none whitespace-pre-wrap break-words pointer-events-none"
        style={{
          color: brightColor,
          WebkitMaskImage: maskImage,
          maskImage,
        }}
      >
        {text}
      </motion.p>
    </div>
  )
}
