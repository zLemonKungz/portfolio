"use client"

import { useEffect, useState } from "react"

export default function BackgroundEffects() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const onMouse = (e: MouseEvent) => setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
    window.addEventListener("mousemove", onMouse, { passive: true })
    return () => window.removeEventListener("mousemove", onMouse)
  }, [])

  useEffect(() => {
    const arr: Particle[] = []
    for (let i = 0; i < 8; i++) arr.push({ id: i, left: Math.random() * 100, delay: Math.random() * 18, duration: 14 + Math.random() * 18, size: 14 + Math.random() * 14, opacity: 0.2 + Math.random() * 0.25, type: "petal" as const, emoji: "🌸" })
    for (let i = 0; i < 4; i++) arr.push({ id: 100 + i, left: Math.random() * 100, delay: Math.random() * 20, duration: 20 + Math.random() * 15, size: 10 + Math.random() * 8, opacity: 0.15 + Math.random() * 0.15, type: "drift" as const, emoji: "🌸" })
    setParticles(arr)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Fixed gradient background */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #FFF5F5 0%, #FFF0F2 50%, #FFECF0 100%)" }} />

      {/* Animated mesh gradient blobs */}
      <div className="absolute top-[20%] left-[15%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-sakura/20 to-lavender/10 blur-2xl animate-blob1" />
      <div className="absolute top-[60%] right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-lavender/20 to-sky/10 blur-2xl animate-blob2" />
      <div className="absolute top-[35%] left-[45%] w-[450px] h-[450px] rounded-full bg-gradient-to-br from-sky/15 to-sakura/10 blur-2xl animate-blob3" />

      {/* Radial glows */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-sakura/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-lavender/5 blur-3xl" />

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
    </div>
  )
}

interface Particle { id: number; left: number; delay: number; duration: number; size: number; opacity: number; type: "petal" | "drift"; emoji: string }

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
