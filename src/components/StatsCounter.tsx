"use client"

import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

const STATS = [
  { label: "Projects", value: 8, suffix: "+" },
  { label: "Tools", value: 10, suffix: "" },
  { label: "Years Coding", value: 3, suffix: "+" },
]

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const motionVal = useMotionValue(0)
  const springVal = useSpring(motionVal, { stiffness: 80, damping: 20 })
  const rounded = useTransform(springVal, (v) => Math.floor(v))
  const [display, setDisplay] = useState("0")

  useEffect(() => {
    if (inView) {
      motionVal.set(to)
    }
  }, [inView, to, motionVal])

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => setDisplay(String(v)))
    return unsubscribe
  }, [rounded])

  return <span ref={ref}>{display}{suffix}</span>
}

export default function StatsCounter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: 0.4 }}
      className="flex justify-center gap-8 sm:gap-12 mt-10"
    >
      {STATS.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + i * 0.15, type: "spring", stiffness: 200 }}
          className="text-center"
        >
          <div className="text-2xl sm:text-3xl font-bold font-heading text-sakura-deep">
            <Counter to={stat.value} suffix={stat.suffix} />
          </div>
          <div className="text-xs text-muted/70 mt-0.5 tracking-wider uppercase">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  )
}
