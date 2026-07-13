"use client"

import { useEffect, useState, useCallback } from "react"

// ─── Time Palette ───
type TimeOfDay = "dawn" | "day" | "sunset" | "night"

const PALETTES: Record<TimeOfDay, { bg: string; label: string; icon: string }> = {
  dawn: {
    bg: "linear-gradient(180deg, #2D1B2E 0%, #6B3A5A 25%, #FF8FA3 50%, #FFD1DC 70%, #FFF5F5 100%)",
    label: "Dawn",
    icon: "🌅",
  },
  day: {
    bg: "linear-gradient(180deg, #FFF5F5 0%, #FFE4EC 25%, #FFD1DC 50%, #FFB7C5 75%, #FFCDD9 100%)",
    label: "Day",
    icon: "☀️",
  },
  sunset: {
    bg: "linear-gradient(180deg, #FFF5F5 0%, #FFCDD9 20%, #FF8FA3 45%, #D4B5E8 70%, #2D1B2E 100%)",
    label: "Sunset",
    icon: "🌇",
  },
  night: {
    bg: "linear-gradient(180deg, #0A0315 0%, #1A0A2E 30%, #2D1B2E 60%, #4A2040 100%)",
    label: "Night",
    icon: "🌙",
  },
}

function getTimeOfDay(): TimeOfDay {
  const h = new Date().getHours()
  if (h >= 5 && h < 8) return "dawn"
  if (h >= 8 && h < 17) return "day"
  if (h >= 17 && h < 20) return "sunset"
  return "night"
}

const TIMES: TimeOfDay[] = ["dawn", "day", "sunset", "night"]

// ─── Particles ───
interface Particle { id: number; left: number; delay: number; duration: number; size: number; opacity: number; type: "petal" | "drift"; emoji: string }

export default function BackgroundEffects() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
  const [timeIdx, setTimeIdx] = useState<number | null>(null) // null = auto
  const [currentTime, setCurrentTime] = useState<TimeOfDay>("day")

  // Auto-update time every minute
  useEffect(() => {
    const update = () => {
      if (timeIdx === null) setCurrentTime(getTimeOfDay())
    }
    update()
    const interval = setInterval(update, 60000)
    return () => clearInterval(interval)
  }, [timeIdx])

  // Manual cycle through times
  const cycleTime = useCallback(() => {
    const nextIdx = timeIdx === null ? 1 : (timeIdx + 1) % TIMES.length
    setTimeIdx(nextIdx)
    setCurrentTime(TIMES[nextIdx])
  }, [timeIdx])

  // Reset to auto on double click
  const resetTime = useCallback(() => {
    setTimeIdx(null)
    setCurrentTime(getTimeOfDay())
  }, [])

  const palette = PALETTES[currentTime]
  const isDark = currentTime === "night" || currentTime === "dawn"

  // Mouse tracking
  useEffect(() => {
    const onMouse = (e: MouseEvent) => setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
    window.addEventListener("mousemove", onMouse, { passive: true })
    return () => window.removeEventListener("mousemove", onMouse)
  }, [])

  // Particles
  useEffect(() => {
    const arr: Particle[] = []
    for (let i = 0; i < 8; i++) arr.push({ id: i, left: Math.random() * 100, delay: Math.random() * 18, duration: 14 + Math.random() * 18, size: 14 + Math.random() * 14, opacity: 0.2 + Math.random() * 0.25, type: "petal" as const, emoji: "🌸" })
    for (let i = 0; i < 4; i++) arr.push({ id: 100 + i, left: Math.random() * 100, delay: Math.random() * 20, duration: 20 + Math.random() * 15, size: 10 + Math.random() * 8, opacity: 0.15 + Math.random() * 0.15, type: "drift" as const, emoji: "🌸" })
    setParticles(arr)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Time-based sky gradient */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-in-out"
        style={{ background: palette.bg }}
      />

      {/* Sun/Moon glow */}
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
            width: currentTime === "dawn" ? "350px" : "220px",
            height: currentTime === "dawn" ? "350px" : "220px",
            top: currentTime === "sunset" ? "60%" : "12%",
            right: currentTime === "sunset" ? "50%" : "15%",
            background: currentTime === "sunset"
              ? "radial-gradient(circle, #FF8FA3, #FFB7C5, transparent)"
              : "radial-gradient(circle, #FFE57F, #FFB7C5, transparent)",
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
            <div key={i} className="absolute rounded-full bg-white animate-twinkle select-none" style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDelay: `${i * 0.4}s` }} />
          ))}
        </div>
      )}

      {/* Dawn/Sunset mist */}
      {(currentTime === "dawn" || currentTime === "sunset") && (
        <>
          <div className="absolute top-1/3 left-0 w-[400px] h-[200px] rounded-full bg-white/5 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-0 w-[300px] h-[150px] rounded-full bg-sakura/5 blur-3xl animate-pulse" />
        </>
      )}

      {/* Mesh blobs */}
      <div className="absolute top-[20%] left-[15%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-sakura/20 to-lavender/10 blur-2xl animate-blob1" />
      <div className="absolute top-[60%] right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-lavender/20 to-sky/10 blur-2xl animate-blob2" />
      <div className="absolute top-[35%] left-[45%] w-[450px] h-[450px] rounded-full bg-gradient-to-br from-sky/15 to-sakura/10 blur-2xl animate-blob3" />

      {/* Radial glows */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-sakura/5 blur-3xl" />
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
        <div key={p.id} className="absolute top-0 select-none will-change-transform" style={{ left: `${p.left}%`, fontSize: `${p.size}px`, animation: `${p.type === "drift" ? "drifts" : "fall"} ${p.duration}s ${p.delay}s linear infinite`, opacity: p.opacity }}>{p.emoji}</div>
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

      {/* Time toggle (bottom-right) */}
      <div className="absolute bottom-4 right-4 z-50 pointer-events-auto">
        <button
          onClick={cycleTime}
          onDoubleClick={resetTime}
          className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider backdrop-blur-md border transition-all duration-500 cursor-pointer hover:scale-105"
          style={{
            backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.25)",
            borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.3)",
            color: isDark ? "rgba(255,255,255,0.35)" : "rgba(124,92,122,0.5)",
          }}
          title={`${palette.icon} ${palette.label} — Click to cycle, double-click for auto`}
        >
          {palette.icon} {palette.label}
          {timeIdx === null && <span className="ml-1 opacity-50">auto</span>}
        </button>
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
  return <div className={`absolute ${sizes[size]} text-gold/25 animate-sparkle select-none pointer-events-none`} style={{ top, left, right, animationDelay: delay }}>{seededChar(top + size + delay)}</div>
}
