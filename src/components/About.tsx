"use client"

import { motion } from "framer-motion"
import portfolio from "@/config/portfolio"
import StatsCounter from "./StatsCounter"
import SectionDivider from "./SectionDivider"
import Reveal from "./Reveal"
import WordReveal from "./WordReveal"

const SKILL_ICONS: Record<string, string> = {
  "Next.js":     "▲",
  "React":       "⚛️",
  "TypeScript":  "📘",
  "Tailwind":    "🌊",
  "JavaScript":  "📜",
  "HTML/CSS":    "🌐",
  "Git":         "🔀",
  "Figma":       "🎯",
  "Node.js":     "💚",
  "PostgreSQL":  "🐘",
}

export default function About() {
  return (
    <section id="about" className="px-4 py-20 sm:py-28 relative">
      <SectionDivider />

      <Reveal>
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-sakura/20 to-lavender/20 text-sakura-deep text-xs font-semibold px-5 py-1.5 rounded-full mb-7 tracking-wider border border-sakura/10"
        >
          <span className="text-sm">⭐</span>
          <WordReveal text="About Me" />
        </motion.div>

        {/* Bio card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="relative"
        >
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-sakura/10 via-lavender/10 to-sky/10 blur-sm" />
          <div className="relative glass-strong rounded-2xl p-7 sm:p-9 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-sakura/5 blur-2xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-lavender/5 blur-2xl" />
            <p className="relative text-dark/75 text-base sm:text-lg leading-relaxed whitespace-pre-line font-[450]">
              &ldquo;{portfolio.about}&rdquo;
            </p>
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.25 }}
          className="mt-10"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-lavender/20 to-sky/20 text-dark text-xs font-semibold px-5 py-1.5 rounded-full mb-6 tracking-wider border border-lavender/10">
            <span className="text-sm">🛠️</span>
            Tools &amp; Tech
          </div>

          <div className="flex flex-wrap gap-2.5 justify-center">
            {portfolio.skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.04, type: "spring", stiffness: 250 }}
                whileHover={{ scale: 1.06, y: -3 }}
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-default
                  bg-gradient-to-r from-sakura/15 to-lavender/15
                  text-dark/70 border border-sakura/15
                  hover:from-sakura/30 hover:to-lavender/25
                  hover:text-dark hover:border-sakura/25
                  hover:shadow-md hover:shadow-sakura/10"
              >
                {SKILL_ICONS[skill] && <span className="mr-1">{SKILL_ICONS[skill]}</span>}
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <StatsCounter />
      </div>
      </Reveal>
    </section>
  )
}
