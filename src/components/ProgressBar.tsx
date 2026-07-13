"use client"

import { motion, useScroll, useSpring } from "framer-motion"

export default function ProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-gradient-to-r from-sakura via-lavender to-sky origin-left"
      style={{ scaleX }}
    />
  )
}
