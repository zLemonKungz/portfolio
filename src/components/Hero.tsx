"use client"

import { motion } from "framer-motion"
import { useState, useRef } from "react"
import portfolio from "@/config/portfolio"
import Typewriter from "./Typewriter"
import ScrambleText from "./ScrambleText"
import { asset } from "@/lib/utils"

const stagger = (d: number) => ({ delay: d, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const })

export default function Hero() {
  const btnRef = useRef<HTMLButtonElement>(null)
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    const dx = e.clientX - rect.left - rect.width / 2
    const dy = e.clientY - rect.top - rect.height / 2
    const dist = Math.sqrt(dx * dx + dy * dy)
    const maxDist = 120
    if (dist < maxDist) {
      const strength = (1 - dist / maxDist) * 8
      setBtnPos({ x: dx * strength / 30, y: dy * strength / 30 })
    } else {
      setBtnPos({ x: 0, y: 0 })
    }
  }

  const handleMouseLeave = () => setBtnPos({ x: 0, y: 0 })

  return (
    <section
      id="hero"
      className="relative min-h-[80vh] sm:min-h-[85vh] flex flex-col items-center justify-center px-4 pt-20 pb-8 text-center overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex flex-col items-center gap-3 max-w-xl relative"
      >
        {/* Avatar */}
        <motion.div
          className="relative group cursor-pointer"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <motion.div
            className="absolute -inset-2 rounded-full bg-gradient-to-r from-sakura via-lavender to-sky opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-2 ring-sakura/30 group-hover:ring-sakura/60 ring-offset-2 ring-offset-cream shadow-lg transition-all duration-500">
            <img
              src={asset(portfolio.avatar)}
              alt={portfolio.name}
              className="w-full h-full object-cover object-center bg-cream group-hover:scale-105 transition-transform duration-500"
              draggable={false}
            />
          </div>

          <motion.span className="absolute -top-3 -right-2 text-sm group-hover:scale-125 transition-transform duration-300" animate={{ y: [0,-8,0], rotate: [0,10,0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>🌸</motion.span>
          <motion.span className="absolute -bottom-2 -left-3 text-base group-hover:scale-125 transition-transform duration-300" animate={{ y: [0,-6,0], rotate: [0,-10,0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>✨</motion.span>
        </motion.div>

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sakura/10 border border-sakura/15 text-xs text-muted"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span>Currently building cool stuff</span>
        </motion.div>

        {/* Name — scramble on hover */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={stagger(0.2)}
          className="font-heading text-3xl sm:text-4xl font-bold tracking-tight
            bg-gradient-to-r from-sakura-deep via-lavender to-sky
            bg-clip-text text-transparent
            animate-text-shimmer"
        >
          ✨ <ScrambleText text={portfolio.name} className="inline" scrambleOn="hover" /> ✨
        </motion.h1>

        {/* Title */}
        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={stagger(0.35)} className="text-muted/90 text-base sm:text-lg font-medium">
          {portfolio.title}
          <span className="mx-2 text-sakura-deep/40">•</span>
          <span className="text-muted/70">{portfolio.tagline}</span>
        </motion.p>

        {/* Quote - Typewriter */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }} className="relative max-w-md min-h-[3rem]">
          <p className="text-muted/70 text-sm sm:text-base px-4 leading-relaxed">
            <Typewriter text={portfolio.quote} speed={40} />
          </p>
        </motion.div>

        {/* CTA - Magnetic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={stagger(0.7)} className="mt-3"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.button
            ref={btnRef}
            animate={{ x: btnPos.x, y: btnPos.y }}
            transition={{ type: "spring", stiffness: 150, damping: 12 }}
            onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            className="relative group"
          >
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-sakura via-lavender to-sky opacity-40 group-hover:opacity-70 blur transition-all duration-500" />
            <div className="relative glass-strong px-7 py-3 rounded-full font-medium text-dark flex items-center gap-2.5 transition-all duration-300">
              <span>✨</span>
              <span>View My Work</span>
              <motion.span className="inline-block" animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity}}>→</motion.span>
            </div>
          </motion.button>
        </motion.div>

        {/* Scroll — animated mouse cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-10 text-muted/40 text-[10px] tracking-[0.25em] uppercase flex flex-col items-center gap-2"
        >
          <div className="w-5 h-8 rounded-full border border-muted/30 flex items-start justify-center pt-1.5">
            <motion.div
              className="w-1 h-1.5 rounded-full bg-gradient-to-b from-sakura/60 to-lavender/60"
              animate={{ y: [0, 10, 0], opacity: [0.6, 0.2, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <span>Scroll</span>
        </motion.div>
      </motion.div>
    </section>
  )
}
