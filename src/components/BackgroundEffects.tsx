"use client"

import { useEffect, useState } from "react"

// ─── Time Palette ───
export type TimeOfDay = "day" | "night"

const PALETTES: Record<TimeOfDay, { bg: string; label: string; icon: string }> = {
  day: {
    bg: "linear-gradient(180deg, #FFF8F9 0%, #FFEEF0 25%, #FFE0E6 50%, #FFD0DA 75%, #FFC8D4 100%)",
    label: "Day",
    icon: "☀️",
  },
  night: {
    bg: "linear-gradient(180deg, #0A0720 0%, #120A2E 33%, #1C1038 66%, #22143C 100%)",
    label: "Night",
    icon: "🌙",
  },
}

function getTimeOfDay(): TimeOfDay {
  const h = new Date().getHours()
  return (h >= 6 && h < 18) ? "day" : "night"
}

// ─── Particles ───
interface Particle { id: number; left: number; delay: number; duration: number; size: number; opacity: number; type: "petal" | "drift"; emoji: string }

export default function BackgroundEffects({ timeOverride }: { timeOverride?: TimeOfDay | null }) {
  const [particles, setParticles] = useState<Particle[]>([])
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
  const [currentTime, setCurrentTime] = useState<TimeOfDay>("day")

  // Sync time from override (or auto)
  useEffect(() => {
    setCurrentTime(timeOverride ?? getTimeOfDay())
  }, [timeOverride])

  // Auto-update time every minute (only when no override)
  useEffect(() => {
    if (timeOverride) return
    const update = () => setCurrentTime(getTimeOfDay())
    const interval = setInterval(update, 60000)
    return () => clearInterval(interval)
  }, [timeOverride])

  const palette = PALETTES[currentTime]
  const isDark = currentTime === "night"

  // Mouse tracking
  useEffect(() => {
    const onMouse = (e: MouseEvent) => setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
    window.addEventListener("mousemove", onMouse, { passive: true })
    return () => window.removeEventListener("mousemove", onMouse)
  }, [])

  // Particles
  useEffect(() => {
    const arr: Particle[] = []
    for (let i = 0; i < 8; i++) {
      arr.push({ id: i, left: Math.random() * 100, delay: Math.random() * 18, duration: 14 + Math.random() * 18, size: 14 + Math.random() * 14, opacity: 0.2 + Math.random() * 0.25, type: "petal" as const, emoji: "🌸" })
    }
    for (let i = 0; i < 4; i++) {
      arr.push({ id: 100 + i, left: Math.random() * 100, delay: Math.random() * 20, duration: 20 + Math.random() * 15, size: 10 + Math.random() * 8, opacity: 0.15 + Math.random() * 0.15, type: "drift" as const, emoji: "🌸" })
    }
    setParticles(arr)
  }, [])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Background — lets clicks pass through */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Time-based sky gradient */}
        <div
          className="absolute inset-0 transition-all duration-1000 ease-in-out"
          style={{ background: palette.bg }}
        />

        {/* Sun glow (day) / Moon glow (night) */}
        {currentTime === "night" ? (
          <div
            className="absolute rounded-full blur-2xl transition-all duration-1000"
            style={{
              width: "160px", height: "160px",
              top: "12%", right: "20%",
              background: "radial-gradient(circle, rgba(255,255,255,0.3), rgba(212,181,232,0.1), transparent)",
              opacity: 0.4,
            }}
          />
        ) : (
          <div
            className="absolute rounded-full blur-3xl transition-all duration-1000"
            style={{
              width: "220px", height: "220px",
              top: "12%", right: "15%",
              background: "radial-gradient(circle, #FFE57F, #FFB7C5, transparent)",
              opacity: 0.35,
            }}
          />
        )}

        {/* Stars at night */}
        {currentTime === "night" && (
          <div className="absolute inset-0">
            {[
              { top: "8%", left: "20%", size: 2 },
              { top: "15%", left: "45%", size: 1.5 },
              { top: "28%", left: "8%", size: 2.5 },
              { top: "38%", left: "72%", size: 1.8 },
              { top: "48%", left: "28%", size: 1.2 },
              { top: "58%", left: "82%", size: 2 },
              { top: "68%", left: "15%", size: 1.5 },
              { top: "78%", left: "55%", size: 2.2 },
            ].map((s, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white animate-twinkle select-none"
                style={{
                  top: s.top, left: s.left,
                  width: s.size, height: s.size,
                  animationDelay: `${i * 0.4}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Soft radial glow */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-sakura/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-lavender/5 blur-3xl" />

        {/* Mouse spotlight */}
        <div
          className="absolute w-[700px] h-[700px] rounded-full blur-3xl transition-all duration-300"
          style={{
            left: `calc(${mouse.x * 100}% - 350px)`,
            top: `calc(${mouse.y * 100}% - 350px)`,
            background: `radial-gradient(circle, ${isDark ? "rgba(255,183,197,0.06)" : "rgba(255,183,197,0.04)"}, transparent 70%)`,
          }}
        />

        {/* Petals */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute top-0 select-none will-change-transform"
            style={{
              left: `${p.left}%`,
              fontSize: `${p.size}px`,
              animation: `${p.type === "drift" ? "drifts" : "fall"} ${p.duration}s ${p.delay}s linear infinite`,
              opacity: p.opacity,
            }}
          >
            {p.emoji}
          </div>
        ))}

        {/* Sparkles */}
        <div className="absolute inset-0">
          <SparkleDot top="12%" left="8%" size="lg" delay="0s" />
          <SparkleDot top="18%" right="10%" size="md" delay="1.2s" />
          <SparkleDot top="45%" left="4%" size="sm" delay="2.5s" />
          <SparkleDot top="60%" right="6%" size="lg" delay="0.8s" />
          <SparkleDot top="78%" left="12%" size="sm" delay="3.1s" />
          <SparkleDot top="35%" right="14%" size="md" delay="1.8s" />
          <SparkleDot top="88%" right="20%" size="sm" delay="0.4s" />
        </div>
      </div>
    </div>
  )
}

const SPARKLE_CHARS = ["✦", "✧", "⋆", "✶", "⁕"]

function seededChar(seed: string): string {
  let hash = 0
  for (let i = 0; i < seed.length; i++) hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0
  return SPARKLE_CHARS[Math.abs(hash) % SPARKLE_CHARS.length]
}

function SparkleDot({ top, left, right, size, delay }: { top: string; left?: string; right?: string; size: "sm" | "md" | "lg"; delay: string }) {
  const sizes = { sm: "text-sm", md: "text-lg", lg: "text-xl" }
  return (
    <div
      className={`absolute ${sizes[size]} text-gold/25 animate-sparkle select-none pointer-events-none`}
      style={{ top, left, right, animationDelay: delay }}
    >
      {seededChar(top + size + delay)}
    </div>
  )
}
