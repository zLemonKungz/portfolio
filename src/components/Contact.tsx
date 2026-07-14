"use client"

import { motion } from "framer-motion"
import portfolio from "@/config/portfolio"
import WordReveal from "./WordReveal"

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 sm:w-7 sm:h-7">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 sm:w-7 sm:h-7">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}
function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 sm:w-7 sm:h-7">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}
function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 sm:w-7 sm:h-7">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  )
}
function PixivIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 sm:w-7 sm:h-7">
      <path d="M4.935 0A4.935 4.935 0 000 4.935v14.13A4.935 4.935 0 004.935 24h14.13A4.935 4.935 0 0024 19.065V4.935A4.935 4.935 0 0019.065 0zm7.138 4.625c.503 0 2.512.017 4.207.795 2.613 1.2 4.13 3.656 4.13 6.569 0 .184 0 .367-.015.55.001 3.145-1.413 5.194-3.782 6.494-1.532.84-3.48 1.25-5.509 1.25-1.408 0-2.814-.233-4.033-.718l-3.912 1.548.883-3.406c-1.053-1.373-1.521-3.074-1.521-4.632 0-3.913 2.652-6.654 5.981-7.764.818-.274 1.522-.686 2.571-.686zm-.258 2.813c-.538 0-1.026.092-1.487.272-1.276.496-2.365 1.642-2.365 3.816 0 1.775.84 3.168 2.216 3.959.489.28 1.067.432 1.799.432 1.866 0 3.698-.816 4.583-2.742.197-.43.297-.919.297-1.467 0-2.228-1.486-3.945-3.908-4.15a3.456 3.456 0 00-.246-.009c-.192-.008-.373-.111-.889-.111z" />
    </svg>
  )
}
function MyAnimeListIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-6 h-6 sm:w-7 sm:h-7">
      <path d="M16 44V20L32 44L48 20V44" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  )
}
const ICON_MAP: Record<string, React.ReactNode> = {
  twitter: <TwitterIcon />,
  instagram: <InstagramIcon />,
  github: <GitHubIcon />,
  mail: <EmailIcon />,
  pixiv: <PixivIcon />,
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
          className="inline-flex items-center gap-2 bg-gradient-to-r from-sakura/20 to-lavender/20 text-sakura-deep text-xs font-semibold px-5 py-1.5 rounded-full mb-10 tracking-wider border border-sakura/10"
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
                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"
                  style={{
                    background: `radial-gradient(circle, ${link.color}99, transparent 70%)`,
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

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="pb-12 pt-4"
        >
          {/* ✿ */}
          <motion.p
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
            className="text-sakura-deep/20 text-lg mb-1"
          >
            ✿
          </motion.p>

          {/* 🌸 */}
          <p className="text-2xl mb-3 opacity-40">🌸</p>

          {/* ✦ © 2026 Lemon ✦ — gradient */}
          <p className="font-heading text-sm sm:text-base font-bold bg-gradient-to-r from-sakura-deep/70 via-lavender/60 to-sky/60 bg-clip-text text-transparent tracking-wide">
            ✦ &copy; {new Date().getFullYear()} {portfolio.name} ✦
          </p>

          {/* Made with ... */}
          <p className="text-muted/40 text-xs sm:text-sm mt-2 tracking-wide">
            {portfolio.footer}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
