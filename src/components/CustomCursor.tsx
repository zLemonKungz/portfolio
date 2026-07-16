"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"

interface Particle {
  id: number
  x: number
  y: number
  emoji: string
  angle: number
}

const EMOJIS = ["🌸", "✨", "✧", "⋆"]

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])

  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  // Main cursor ring — offset so center is at cursor tip
  const ringX = useTransform(cursorX, (v) => v - 15)
  const ringY = useTransform(cursorY, (v) => v - 15)

  // Trail dots with spring lag
  const trailSprings = Array.from({ length: 4 }, (_, i) => ({
    x: useSpring(cursorX, { damping: 14 + i * 4, stiffness: 140 - i * 20 }),
    y: useSpring(cursorY, { damping: 14 + i * 4, stiffness: 140 - i * 20 }),
  }))

  useEffect(() => {
    setMounted(true)
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) { setMounted(false); return }
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduceMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  // Mouse move — only updates motion values (no React re-renders)
  useEffect(() => {
    if (!mounted || reduceMotion) return
    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    const onClick = (e: MouseEvent) => {
      const clickId = Date.now()
      const newParticles: Particle[] = Array.from({ length: 6 }, (_, i) => ({
        id: clickId + i,
        x: e.clientX,
        y: e.clientY,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        angle: (360 / 6) * i + Math.random() * 30,
      }))
      setParticles((prev) => [...prev, ...newParticles])
      setClicked(true)
      setTimeout(() => setClicked(false), 150)
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id < clickId || p.id >= clickId + 6))
      }, 800)
    }

    document.addEventListener("mousemove", onMove, { passive: true })
    document.addEventListener("click", onClick, { passive: true })
    return () => {
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("click", onClick)
    }
  }, [mounted, reduceMotion])

  // Hide native cursor
  useEffect(() => {
    if (!mounted || reduceMotion) return
    const style = document.createElement("style")
    style.id = "cursor-hide"
    style.textContent = "*, *::before, *::after { cursor: none !important }"
    document.head.appendChild(style)
    return () => {
      const el = document.getElementById("cursor-hide")
      if (el) el.remove()
    }
  }, [mounted, reduceMotion])

  if (!mounted || reduceMotion) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[999] select-none"
        style={{ x: ringX, y: ringY }}
        animate={{ scale: clicked ? 0.8 : 1 }}
        transition={{ duration: 0.1, ease: "linear" }}
      >
        <div className="w-[30px] h-[30px] rounded-full border-2 border-sakura/50 bg-sakura/10 backdrop-blur-[1px] shadow-[0_0_12px_rgba(255,183,197,0.2)]" />
      </motion.div>

      {/* Trail dots — 4 fading dots with spring lag */}
      {trailSprings.map((spring, i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 pointer-events-none z-[998] select-none rounded-full bg-gradient-to-br from-sakura/30 to-lavender/30"
          style={{
            x: spring.x,
            y: spring.y,
            width: 12 - i * 2,
            height: 12 - i * 2,
            translateX: `-${6 - i * 1}px`,
            translateY: `-${6 - i * 1}px`,
            opacity: 0.25 - i * 0.05,
          }}
        />
      ))}

      {/* Click particles */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{
              x: p.x,
              y: p.y,
              opacity: 1,
              scale: 0.5,
            }}
            animate={{
              x: p.x + Math.cos((p.angle * Math.PI) / 180) * 60,
              y: p.y + Math.sin((p.angle * Math.PI) / 180) * 60,
              opacity: 0,
              scale: 1.2,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 left-0 pointer-events-none z-[999] text-sm select-none"
          >
            {p.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  )
}
