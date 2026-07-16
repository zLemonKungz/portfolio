"use client"

import { useEffect, useRef, useState } from "react"

const EMOJIS = ["🌸", "🌸", "🌸", "🌸", "🌸", "🌸", "🌸", "🌸", "🌸", "🌸", "✨", "✿", "⋆"]
const TRIGGER = "sakura"
const PETAL_COUNT = 40

interface Petal {
  id: number
  x: number
  drift: number
  delay: number
  size: number
  duration: number
  emoji: string
}

export default function EasterEgg() {
  const [active, setActive] = useState(false)
  const [petals, setPetals] = useState<Petal[]>([])
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const keyBufRef = useRef<string[]>([])
  const tapTimestampsRef = useRef<number[]>([])

  useEffect(() => {
    const trigger = () => {
      setActive(true)
      const newPetals: Petal[] = Array.from({ length: PETAL_COUNT }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 96 + 2,
        drift: (Math.random() - 0.5) * 15,
        delay: Math.random() * 0.5,
        size: 16 + Math.random() * 20,
        duration: 2.2 + Math.random() * 1.5,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      }))
      setPetals(newPetals)
      timeoutRef.current = setTimeout(() => {
        setActive(false)
        setPetals([])
      }, 3200)
    }
    const onKey = (e: KeyboardEvent) => {
      if (active) return
      keyBufRef.current = [...keyBufRef.current, e.key.toLowerCase()].slice(-6)
      if (keyBufRef.current.join("") === TRIGGER) {
        keyBufRef.current = []
        trigger()
      }
    }
    const onTouch = () => {
      if (active) return
      const now = Date.now()
      tapTimestampsRef.current = [...tapTimestampsRef.current, now].filter(t => now - t < 800)
      if (tapTimestampsRef.current.length >= 3) {
        tapTimestampsRef.current = []
        trigger()
      }
    }
    window.addEventListener("keydown", onKey)
    document.addEventListener("touchstart", onTouch)
    return () => {
      window.removeEventListener("keydown", onKey)
      document.removeEventListener("touchstart", onTouch)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [active])

  return (
    <>
      {active && (
        <>
          {/* Screen tint — fades in + out via CSS */}
          <div
            className="fixed inset-0 pointer-events-none z-[1001]"
            style={{
              backgroundColor: "rgba(255,183,197,0.15)",
              animation: "tintFade 3s ease forwards",
            }}
          />

          {/* Petal shower — CSS compositor-thread animations */}
          <div className="fixed inset-0 pointer-events-none z-[1002] overflow-hidden">
            {petals.map((p) => (
              <div
                key={p.id}
                className="absolute will-change-transform"
                style={{
                  left: `${p.x}%`,
                  top: "-40px",
                  fontSize: `${p.size}px`,
                  animation: `petalFall ${p.duration}s ${p.delay}s ease-in forwards`,
                  transform: `translateX(${p.drift}px)`,
                }}
              >
                {p.emoji}
              </div>
            ))}
          </div>

          <style>{`
            @keyframes petalFall {
              0%   { transform: translateY(0) rotate(0deg) scale(0.5); opacity: 0.9; }
              30%  { opacity: 0.8; }
              100% { transform: translateY(105vh) rotate(540deg) scale(1.1); opacity: 0; }
            }
            @keyframes tintFade {
              0%   { opacity: 0; }
              10%  { opacity: 1; }
              75%  { opacity: 1; }
              100% { opacity: 0; }
            }
          `}</style>
        </>
      )}
    </>
  )
}
