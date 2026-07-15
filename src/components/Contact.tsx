"use client"

import { motion } from "framer-motion"
import portfolio from "@/config/portfolio"
import WordReveal from "./WordReveal"

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}
function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}
function MyAnimeListIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true">
      <path d="M16 44V20L32 44L48 20V44" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  )
}
const ICON_MAP: Record<string, React.ReactNode> = {
  twitter: <TwitterIcon />,
  github: <GitHubIcon />,
  myanimelist: <MyAnimeListIcon />,
}

export default function Contact() {
  return (
    <section id="contact" className="relative z-10 px-4 pt-12 sm:pt-16 pb-0">

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Section tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="inline-flex items-center gap-2 badge-theme text-sakura-deep text-xs font-semibold px-5 py-1.5 rounded-full mb-10 tracking-wider border border-sakura/10"
        >
          <span className="text-sm">✨</span>
          <WordReveal text="Get in Touch" />
        </motion.div>

        {/* Social Bubbles — no float, just clean */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-wrap gap-4 sm:gap-5 justify-center mb-6"
        >
          {portfolio.social.map((link, i) => (
            <motion.a
              key={link.platform}
              href={link.url}
              target={link.platform === "Email" ? undefined : "_blank"}
              rel={link.platform === "Email" ? undefined : "noopener noreferrer"}
              aria-label={`Visit ${link.platform}${link.platform !== "Email" ? " (opens in new tab)" : ""}`}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.12, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-2 group"
            >
              <div
                className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-white shadow-md transition-all duration-300 border-2 border-white/60 group-hover:border-white/90 group-hover:shadow-lg shadow-black/5"
                style={{
                  background: `linear-gradient(135deg, ${link.color}, ${link.color}dd)`,
                }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full blur-md"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileHover={{ opacity: 1, scale: 1.3 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{
                    background: `radial-gradient(circle, ${link.color}bb, transparent 70%)`,
                  }}
                />
                <span className="relative z-10">{ICON_MAP[link.icon] || "🌐"}</span>
              </div>
              <span className="text-[11px] font-medium text-muted/70 group-hover:text-muted transition-colors duration-200">
                {link.platform}
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* Footer — framed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="pb-12 pt-8 flex justify-center"
        >
          {/* Decorative frame */}
          <div className="relative max-w-xs sm:max-w-sm w-full mx-auto">
            {/* Corner decorations — theme-aware */}
            <motion.span
              className="absolute -top-4 -left-4 text-muted/30 text-xl"
              animate={{ rotate: [0, 15, 0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            >
              ✿
            </motion.span>
            <motion.span
              className="absolute -top-4 -right-4 text-muted/30 text-xl"
              animate={{ rotate: [0, -15, 0, 15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              aria-hidden="true"
            >
              ✤
            </motion.span>
            <motion.span
              className="absolute -bottom-4 -left-4 text-muted/30 text-xl"
              animate={{ rotate: [0, -15, 0, 15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              aria-hidden="true"
            >
              ✤
            </motion.span>
            <motion.span
              className="absolute -bottom-4 -right-4 text-muted/30 text-xl"
              animate={{ rotate: [0, 15, 0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              aria-hidden="true"
            >
              ✿
            </motion.span>

            {/* Frame border — glass-strong auto-adapts to night mode */}
            <div className="px-5 sm:px-8 py-4 sm:py-5 rounded-2xl border border-white/30 glass-strong">
              {/* Floating sakura */}
              <motion.div
                className="text-lg mb-1"
                aria-hidden="true"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                🌸
              </motion.div>

              {/* ✦ © 2026 Lemon ✦ — fade in, no spring (was causing flicker) */}
              <motion.p
                className="font-heading text-sm sm:text-base font-bold tracking-wide"
                initial={{ opacity: 0, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
              >
                <span className="bg-gradient-to-r from-sakura-deep via-lavender to-sky bg-clip-text text-transparent whitespace-nowrap">
                  <motion.span
                    className="inline-block"
                    animate={{ rotate: [0, 6, 0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    ✦
                  </motion.span>{" "}
                  <span>
                    &copy; {new Date().getFullYear()} {portfolio.name}
                  </span>{" "}
                  <motion.span
                    className="inline-block"
                    animate={{ rotate: [0, -6, 0, 6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                  >
                    ✦
                  </motion.span>
                </span>
              </motion.p>

              {/* Made with ... — faster cascade (0.04s instead of 0.08s) */}
              <motion.p
                className="text-muted/40 text-xs sm:text-sm mt-2 tracking-wide"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.3 }}
              >
                {portfolio.footer.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    animate={{ y: [0, -2, 0] }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.04,
                      ease: "easeInOut",
                    }}
                  >
                    {char === " " ? " " : char}
                  </motion.span>
                ))}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
