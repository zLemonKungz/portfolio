"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion"
import { ChevronUp } from "lucide-react"

export default function BackToTop() {
  const [show, setShow] = useState(false)
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 })
  const arcLength = useTransform(smoothProgress, [0, 1], [0, 283]) // 2πr ≈ 283 for r=45
  const dashOffset = useTransform(arcLength, (v) => 283 - v)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center"
        >
          {/* Progress arc SVG */}
          <svg ref={svgRef} className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,183,197,0.15)" strokeWidth="2.5" />
            <motion.circle
              cx="28" cy="28" r="24" fill="none"
              stroke="url(#backtopGrad)" strokeWidth="2.5" strokeLinecap="round"
              strokeDasharray={283}
              style={{ strokeDashoffset: dashOffset }}
            />
            <defs>
              <linearGradient id="backtopGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFB7C5" />
                <stop offset="100%" stopColor="#D4B5E8" />
              </linearGradient>
            </defs>
          </svg>
          {/* Inner button */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sakura to-lavender text-white shadow-lg shadow-sakura/20 flex items-center justify-center hover:shadow-xl hover:shadow-sakura/30 transition-shadow duration-300 relative z-10">
            <ChevronUp size={20} />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
