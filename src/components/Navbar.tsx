"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

const NAV_ITEMS = [
  { id: "hero", label: "Home", icon: "🌸" },
  { id: "about", label: "About", icon: "⭐" },
  { id: "gallery", label: "Projects", icon: "🖼️" },
  { id: "contact", label: "Contact", icon: "📬" },
]

export default function Navbar() {
  const [active, setActive] = useState("hero")
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY
      setScrolled(sy > 80)

      // Hide on scroll down, show on scroll up (only after threshold)
      if (sy > 150) {
        setHidden(sy > lastScrollY.current)
      } else {
        setHidden(false)
      }
      lastScrollY.current = sy

      const nearBottom = window.innerHeight + sy >= document.documentElement.scrollHeight - 60
      const sections = NAV_ITEMS.map((i) => document.getElementById(i.id))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i]
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150 || (i === sections.length - 1 && nearBottom)) {
            setActive(NAV_ITEMS[i].id)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: hidden ? -80 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-auto"
    >
      {/* The pill container */}
      <div
        className={`relative rounded-full transition-all duration-500 ${
          scrolled
            ? "bg-white/65 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/40"
            : "bg-white/20 backdrop-blur-md border border-white/20"
        }`}
      >
        {/* Inner glow line */}
        <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />

        <div className="relative flex items-center gap-0.5 px-1.5 py-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="relative px-4 sm:px-4 py-2.5 sm:py-2 rounded-full text-sm font-medium transition-all duration-300"
              style={{ color: active === item.id ? "#2D1B2E" : "#7C5C7A" }}
            >
              {/* Active pill indicator */}
              {active === item.id && (
                <motion.span
                  layoutId="navPill"
                  className="absolute inset-0 rounded-full bg-white/70 shadow-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5 transition-transform duration-200 active:scale-95">
                <span className="sm:hidden">{item.icon}</span>
                <span className="hidden sm:inline">{item.icon}</span>
                <span className="hidden sm:inline text-sm">{item.label}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}
