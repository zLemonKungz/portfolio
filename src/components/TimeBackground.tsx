"use client"

import { useEffect, useState } from "react"

type TimeOfDay = "dawn" | "day" | "sunset" | "night"

const PALETTES: Record<TimeOfDay, { bg: string; accent: string; label: string }> = {
  dawn: {
    bg: "linear-gradient(135deg, #2D1B2E 0%, #6B3A5A 25%, #FF8FA3 50%, #FFD1DC 70%, #FFF5F5 100%)",
    accent: "#FF8FA3",
    label: "Dawn",
  },
  day: {
    bg: "linear-gradient(180deg, #FFF5F5 0%, #FFE4EC 25%, #FFD1DC 50%, #FFB7C5 75%, #FFCDD9 100%)",
    accent: "#FFB7C5",
    label: "Day",
  },
  sunset: {
    bg: "linear-gradient(135deg, #FFF5F5 0%, #FFCDD9 20%, #FF8FA3 40%, #D4B5E8 60%, #2D1B2E 100%)",
    accent: "#D4B5E8",
    label: "Sunset",
  },
  night: {
    bg: "linear-gradient(180deg, #1A0A2E 0%, #2D1B2E 30%, #4A2040 60%, #6B3A5A 100%)",
    accent: "#D4B5E8",
    label: "Night",
  },
}

function getTimeOfDay(): TimeOfDay {
  const h = new Date().getHours()
  if (h >= 5 && h < 8) return "dawn"
  if (h >= 8 && h < 17) return "day"
  if (h >= 17 && h < 20) return "sunset"
  return "night"
}

export default function TimeBackground() {
  const [time, setTime] = useState<TimeOfDay>("day")

  useEffect(() => {
    setTime(getTimeOfDay())
    // Update every minute
    const interval = setInterval(() => setTime(getTimeOfDay()), 60000)
    return () => clearInterval(interval)
  }, [])

  const palette = PALETTES[time]

  // Stars only at night
  const showStars = time === "night"

  // Sun only at dawn/day
  const showSun = time === "dawn" || time === "day" || time === "sunset"

  // Moon at night
  const showMoon = time === "night"

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Sky gradient that changes with time */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-in-out"
        style={{ background: palette.bg }}
      />

      {/* Sun */}
      {showSun && (
        <div
          className="absolute rounded-full blur-3xl transition-all duration-1000"
          style={{
            width: time === "dawn" ? "300px" : "200px",
            height: time === "dawn" ? "300px" : "200px",
            top: time === "dawn" ? "60%" : "15%",
            right: time === "dawn" ? "60%" : "15%",
            background: time === "sunset"
              ? "radial-gradient(circle, #FF8FA3, #FFB7C5, transparent)"
              : "radial-gradient(circle, #FFE57F, #FFB7C5, transparent)",
            opacity: 0.6,
          }}
        />
      )}

      {/* Moon + stars at night */}
      {showMoon && (
        <>
          <div
            className="absolute rounded-full blur-xl transition-all duration-1000"
            style={{
              width: "180px",
              height: "180px",
              top: "12%",
              right: "20%",
              background: "radial-gradient(circle, rgba(255,255,255,0.4), rgba(212,181,232,0.2), transparent)",
              opacity: 0.5,
            }}
          />
          {/* Stars */}
          {[
            { top: "8%", left: "20%", size: 2, delay: "0s" },
            { top: "15%", left: "45%", size: 1.5, delay: "1.2s" },
            { top: "25%", left: "10%", size: 2.5, delay: "0.5s" },
            { top: "35%", left: "70%", size: 1.8, delay: "2s" },
            { top: "45%", left: "30%", size: 1.2, delay: "0.8s" },
            { top: "55%", left: "80%", size: 2, delay: "1.5s" },
            { top: "65%", left: "15%", size: 1.5, delay: "0.3s" },
            { top: "75%", left: "55%", size: 2.2, delay: "1.8s" },
          ].map((star, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                top: star.top,
                left: star.left,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: 0,
                animationDelay: star.delay,
              }}
            />
          ))}
        </>
      )}

      {/* Floating particles (clouds / mist) for dawn and sunset */}
      {(time === "dawn" || time === "sunset") && (
        <>
          <div className="absolute top-1/3 left-0 w-[400px] h-[200px] rounded-full bg-white/5 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-0 w-[300px] h-[150px] rounded-full bg-sakura/5 blur-3xl animate-pulse" />
        </>
      )}

      {/* Time indicator */}
      <div className="absolute bottom-4 right-4 z-50">
        <div
          className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider backdrop-blur-md border transition-all duration-700"
          style={{
            backgroundColor: time === "night" ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.2)",
            borderColor: time === "night" ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.3)",
            color: time === "night" ? "rgba(255,255,255,0.3)" : "rgba(124,92,122,0.4)",
          }}
        >
          {time === "night" ? "🌙" : time === "dawn" ? "🌅" : time === "sunset" ? "🌇" : "☀️"} {palette.label}
        </div>
      </div>
    </div>
  )
}
