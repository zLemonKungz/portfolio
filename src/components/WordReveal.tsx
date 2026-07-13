"use client"

import { motion } from "framer-motion"

export default function WordReveal({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ")

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}
