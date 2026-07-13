"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useSpring } from "framer-motion"

const SECTIONS = [
  { id: "hero",    label: "Home",     num: "01" },
  { id: "about",   label: "About",    num: "02" },
  { id: "gallery", label: "Projects", num: "03" },
  { id: "contact", label: "Contact",  num: "04" },
]

export default function SectionCounter() {
  const [active, setActive] = useState(0)
  const [show, setShow] = useState(false)
  const { scrollY } = useScroll()
  const progress = useSpring(scrollY, { stiffness: 80, damping: 25 })

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 300)
      const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= 250 || (i === SECTIONS.length - 1 && nearBottom)) {
          setActive(i)
          break
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: show ? 1 : 0, x: show ? 0 : 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center gap-0"
    >
      {/* Progress track */}
      <div className="relative flex flex-col items-center gap-0">
        {SECTIONS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
            className="relative flex items-center justify-end w-full py-1.5 group"
          >
            {/* Label — always visible, fades on inactive */}
            <motion.span
              animate={{
                opacity: i === active ? 1 : 0.35,
                x: i === active ? 0 : 4,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-[11px] font-medium tracking-wider mr-3"
              style={{ color: i === active ? "#2D1B2E" : "#7C5C7A" }}
            >
              {s.label}
            </motion.span>

            {/* Dot */}
            <div className="relative w-2.5 h-2.5 flex items-center justify-center">
              {/* Active dot glow */}
              {i === active && (
                <motion.span
                  layoutId="sectionDot"
                  className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-sakura to-lavender shadow-sm shadow-sakura/30"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              {/* Inactive dot */}
              {i !== active && (
                <span className="w-1.5 h-1.5 rounded-full bg-muted/20 group-hover:bg-muted/40 transition-colors duration-300" />
              )}
            </div>
          </button>
        ))}

        {/* Vertical connector line */}
        <div className="absolute top-3 bottom-3 right-[11px] w-px bg-gradient-to-b from-sakura/15 via-lavender/15 to-sky/15 -z-10" />
      </div>
    </motion.div>
  )
}
