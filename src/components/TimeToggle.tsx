"use client"

type TimeOfDay = "day" | "night"

const TIMES: TimeOfDay[] = ["day", "night"]
const LABELS: Record<TimeOfDay, { icon: string; label: string }> = {
  day: { icon: "☀️", label: "Day" },
  night: { icon: "🌙", label: "Night" },
}

interface Props {
  time: TimeOfDay | null // null = auto
  onChange: (time: TimeOfDay | null) => void
}

export default function TimeToggle({ time, onChange }: Props) {
  const current = time ?? getAutoTime()
  const info = LABELS[current]
  const isDark = current === "night"

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
      className="fixed top-4 right-4 z-[100] flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono tracking-wider shadow-sm backdrop-blur-md border transition-all duration-500 hover:scale-105 hover:shadow-md active:scale-95 select-none cursor-pointer"
      style={{
        backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.35)",
        borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.4)",
        color: isDark ? "rgba(255,255,255,0.6)" : "rgba(74,52,76,0.6)",
      }}
      title="Click to cycle time — Double-click for auto"
    >
      <span className="text-base">{info.icon}</span>
      <span className="font-medium">{info.label}</span>
      {time === null && <span className="text-[10px] px-1 py-0.5 rounded-full bg-white/20">auto</span>}
    </button>
  )
}

function getAutoTime(): TimeOfDay {
  const h = new Date().getHours()
  return (h >= 6 && h < 18) ? "day" : "night"
}
