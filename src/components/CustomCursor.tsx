"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

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
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Mouse move
  useEffect(() => {
    if (!mounted) return
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    const onClick = (e: MouseEvent) => {
      const newParticles: Particle[] = Array.from({ length: 6 }, (_, i) => ({
        id: Date.now() + i,
        x: e.clientX,
        y: e.clientY,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        angle: (360 / 6) * i + Math.random() * 30,
      }))
      setParticles((prev) => [...prev, ...newParticles])
      setClicked(true)
      setTimeout(() => setClicked(false), 150)
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !newParticles.includes(p)))
      }, 800)
    }

    document.addEventListener("mousemove", onMove, { passive: true })
    document.addEventListener("click", onClick)
    return () => {
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("click", onClick)
    }
  }, [mounted])

  useEffect(() => {
    if (!mounted) return
    const style = document.createElement("style")
    style.id = "cursor-hide"
    style.textContent = "*, *::before, *::after { cursor: none !important }"
    document.head.appendChild(style)
    return () => {
      const el = document.getElementById("cursor-hide")
      if (el) el.remove()
    }
  }, [mounted])

  if (!mounted) return null

  return (
    <>
      {/* Cursor — วงกลมโปร่งใส */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[999] select-none"
        animate={{
          x: pos.x - 15,
          y: pos.y - 15,
          scale: clicked ? 0.8 : 1,
        }}
        transition={{ duration: 0.1, ease: "linear" }}
      >
        <div className="w-[30px] h-[30px] rounded-full border-2 border-sakura/50 bg-sakura/10 backdrop-blur-[1px] shadow-[0_0_12px_rgba(255,183,197,0.2)]" />
      </motion.div>

      {/* No dot — clean circle only */}

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
