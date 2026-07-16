"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

type TimeOfDay = "day" | "night"

const TIMES: TimeOfDay[] = ["day", "night"]
const LABELS: Record<TimeOfDay, { icon: string; label: string }> = {
  day: { icon: "☀️", label: "Day" },
  night: { icon: "🌙", label: "Night" },
}

interface Props {
  time: TimeOfDay | null
  onChange: (time: TimeOfDay | null) => void
}

export default function TimeToggle({ time, onChange }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const current = time ?? getAutoTime()
  const info = LABELS[current]
  const isDark = current === "night"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const cycle = () => {
    if (time === null) {
      onChange(TIMES[0])
    } else {
      const idx = TIMES.indexOf(time)
      const next = (idx + 1) % TIMES.length
      onChange(TIMES[next])
    }
  }

  const reset = () => onChange(null)

  return (
    <button
      onClick={cycle}
      onDoubleClick={reset}
      className={`fixed top-4 right-4 z-[100] flex items-center gap-2 px-2 sm:px-3 py-2 sm:py-1.5 rounded-full text-xs font-mono tracking-wider shadow-sm backdrop-blur-md border transition-all duration-500 hover:scale-105 hover:shadow-md active:scale-95 select-none cursor-pointer ${
        scrolled
          ? "bg-white/65 backdrop-blur-2xl border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
          : "bg-white/20 backdrop-blur-md border-white/20"
      }`}
      style={{ color: isDark ? "rgba(255,255,255,0.7)" : "rgba(74,52,76,0.7)" }}
      title="Click to cycle — Double-click for auto"
    >
      {/* Inner glow line — matches navbar */}
      <div className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />

      {/* Icon with flip */}
      <span className="relative z-10 flex items-center gap-1.5">
        <AnimatePresence mode="wait">
          <motion.span
            key={current}
            initial={{ rotateX: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotateX: 0, opacity: 1, scale: 1 }}
            exit={{ rotateX: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-base inline-block"
            style={{ transformStyle: "preserve-3d" }}
          >
            {info.icon}
          </motion.span>
        </AnimatePresence>

        {/* Label — desktop only */}
        <span className="hidden sm:inline font-medium">{info.label}</span>
      </span>

      {/* Auto badge — desktop only */}
      {time === null && (
        <span className="hidden sm:inline text-[10px] px-1.5 py-0.5 rounded-full bg-white/20 font-medium">
          auto
        </span>
      )}
    </button>
  )
}

function getAutoTime(): TimeOfDay {
  const h = new Date().getHours()
  return (h >= 6 && h < 18) ? "day" : "night"
}
