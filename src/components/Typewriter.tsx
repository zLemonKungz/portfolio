"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function Typewriter({ text, speed = 45 }: { text: string; speed?: number }) {
  const [display, setDisplay] = useState("")
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplay("")
    setDone(false)
    let i = 0
    const timer = setInterval(() => {
      i++
      setDisplay(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(timer)
        setDone(true)
      }
    }, speed)
    return () => clearInterval(timer)
  }, [text, speed])

  return (
    <span className="font-mono">
      &ldquo;{display}&rdquo;
      {!done && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          className="inline-block w-[2px] h-[1.1em] bg-sakura-deep/70 ml-0.5 align-middle"
        />
      )}
    </span>
  )
}
