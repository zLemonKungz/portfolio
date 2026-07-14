"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import SectionDivider from "./SectionDivider"
import Reveal from "./Reveal"
import WordReveal from "./WordReveal"
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import portfolio from "@/config/portfolio"
import { asset } from "@/lib/utils"
import type { Project } from "@/lib/types"

const CATEGORIES = [
  { key: "all", label: "All", icon: "✨" },
  { key: "web", label: "Web", icon: "💻" },
  { key: "design", label: "Design", icon: "🎨" },
  { key: "art", label: "Art", icon: "🎭" },
] as const

type CategoryKey = (typeof CATEGORIES)[number]["key"]

export default function Gallery() {
  const [activeCat, setActiveCat] = useState<CategoryKey>("all")
  const [lightbox, setLightbox] = useState<Project | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(6)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const filtered =
    activeCat === "all"
      ? portfolio.projects
      : portfolio.projects.filter((p) => p.category === activeCat)

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  const [loaded, setLoaded] = useState<Record<string, boolean>>({})

  const openLightbox = (project: Project, index: number) => {
    setLightbox(project)
    setLightboxIndex(index)
  }

  const navigateLightbox = (dir: 1 | -1) => {
    const idx = filtered.findIndex((p) => p.id === lightbox?.id)
    const next = idx + dir
    if (next >= 0 && next < filtered.length) {
      setLightbox(filtered[next])
      setLightboxIndex(next)
    }
  }

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null)
      if (e.key === "ArrowLeft") navigateLightbox(-1)
      if (e.key === "ArrowRight") navigateLightbox(1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [lightbox, lightboxIndex])

  return (
    <section id="gallery" className="px-4 py-20 sm:py-28 relative">
      <SectionDivider />

      <Reveal>
      <div className="max-w-5xl mx-auto">
        {/* Section tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-sakura/20 to-lavender/20 text-sakura-deep text-xs font-semibold px-5 py-1.5 rounded-full mb-8 tracking-wider border border-sakura/10">
            <span className="text-sm">✦</span>
            <WordReveal text="My Projects" />
          </span>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-wrap gap-2 justify-center mb-10"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCat(cat.key)}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden ${
                activeCat === cat.key
                  ? "text-white shadow-md shadow-sakura/15"
                  : "text-muted/70 hover:text-dark bg-sakura/5 hover:bg-sakura/15"
              }`}
            >
              {activeCat === cat.key && (
                <motion.span
                  layoutId="filterPill"
                  className="absolute inset-0 bg-gradient-to-r from-sakura to-lavender"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </span>
            </button>
          ))}
        </motion.div>

        {/* Bento Grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 auto-rows-[130px] sm:auto-rows-[150px]">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <motion.button
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.85, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.85, filter: "blur(4px)" }}
                transition={{ duration: 0.35, delay: i * 0.035, ease: [0.25, 0.46, 0.45, 0.94] }}
                onClick={() => openLightbox(project, i)}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/40 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-sakura/15 hover:border-sakura/30 hover:scale-[1.02] cursor-pointer text-left"
                style={{
                  gridColumn: project.width === 2 ? "span 2" : "span 1",
                  gridRow: project.height === 2 ? "span 2" : "span 1",
                }}
              >
                {/* Shimmer */}
                {!loaded[project.id] && (
                  <div className="absolute inset-0 bg-gradient-to-r from-sakura/10 via-lavender/10 to-sky/10 overflow-hidden">
                    <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)", animation: "shimmerSlide 1.8s ease-in-out infinite" }} />
                  </div>
                )}
                <img src={asset(project.image)} alt={project.title} className="w-full h-full object-cover" draggable={false} loading={i < 4 ? "eager" : "lazy"} onLoad={() => setLoaded((p) => ({ ...p, [project.id]: true }))} />

                {/* Hover overlay */}
                <div className={`pointer-events-none absolute inset-0 transition-all duration-400 flex items-end ${hoveredId === project.id ? "opacity-100" : "opacity-0"}`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-dark/40 to-transparent" />
                  <div className={`relative w-full p-3 sm:p-5 transition-transform duration-400 ${hoveredId === project.id ? "translate-y-0" : "translate-y-4"}`}>
                    <p className="text-white font-heading font-medium text-sm sm:text-base drop-shadow-sm">{project.title}</p>
                    {project.description && <p className="text-white/60 text-xs mt-0.5 line-clamp-1 drop-shadow">{project.description}</p>}
                    {project.tech && project.tech.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {project.tech.map((t) => <span key={t} className="px-1.5 py-[1px] rounded-full text-[9px] font-medium bg-white/15 text-white/70 border border-white/10">{t}</span>)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Category badge */}
                <div className={`pointer-events-none absolute top-2 right-2 transition-all duration-300 ${hoveredId === project.id ? "opacity-100" : "opacity-0"}`}>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/25 backdrop-blur-md text-dark/70 border border-white/30 shadow-sm">{project.category}</span>
                </div>

                {/* Link button */}
                {project.link && (
                  <div className={`absolute top-2 left-2 transition-all duration-300 delay-75 z-20 ${hoveredId === project.id ? "opacity-100" : "opacity-0"}`}>
                    <span onClick={(e) => { e.stopPropagation(); window.open(project.link, "_blank", "noopener") }} className="flex items-center justify-center w-7 h-7 rounded-full bg-white/40 backdrop-blur-md text-dark/60 hover:text-dark hover:bg-white/70 transition-all duration-300 shadow-sm border border-white/30 cursor-pointer" title={`Open ${project.title}`}>
                      <ExternalLink size={13} />
                    </span>
                  </div>
                )}
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <button
              onClick={() => setVisibleCount((c) => c + 6)}
              className="group relative px-7 py-2.5 rounded-full text-sm text-muted hover:text-dark transition-all duration-300"
            >
              <span className="absolute inset-0 rounded-full border border-dashed border-sakura/25 group-hover:border-sakura/50 transition-colors duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="inline-block"
                >+</motion.span>
                <span>Load More</span>
              </span>
            </button>
          </motion.div>
        )}

        {/* Empty state */}
        {visible.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <div className="flex flex-col items-center gap-3">
              <span className="text-4xl">✨</span>
              <p className="text-muted text-lg font-medium">No projects in this category yet</p>
              <p className="text-muted/60 text-sm">Check back later!</p>
            </div>
          </motion.div>
        )}
      </div>
      </Reveal>

      {/* ─── Lightbox ─── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[1000] bg-sakura-light/10 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image card */}
              <div className="bg-white lightbox-card rounded-2xl overflow-hidden shadow-xl shadow-black/5 border border-white/60">
                {/* Image area */}
                <div className="relative w-full h-[45vh] sm:h-[55vh] bg-gradient-to-br from-sakura-light/10 to-lavender/10 group">
                  <img
                    src={asset(lightbox.image)}
                    alt={lightbox.title}
                    className="w-full h-full object-contain p-3 rounded-2xl"
                    draggable={false}
                  />

                  {/* Click hint */}
                  {lightbox.link && (
                    <div className="absolute top-4 left-4">
                      <span className="glass px-3 py-1.5 rounded-full text-xs text-dark/60 font-medium flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink size={12} /> Click to visit
                      </span>
                    </div>
                  )}

                  {/* Nav buttons — on image edges */}
                  <button onClick={() => navigateLightbox(-1)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 hover:bg-white/90 backdrop-blur-md flex items-center justify-center text-muted/70 hover:text-dark shadow-sm transition-all border border-white/60">
                    <ChevronLeft size={20} />
                  </button>
                  <button onClick={() => navigateLightbox(1)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 hover:bg-white/90 backdrop-blur-md flex items-center justify-center text-muted/70 hover:text-dark shadow-sm transition-all border border-white/60">
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Info bar */}
                <div className="px-5 py-4 sm:px-6 sm:py-5 bg-white lightbox-card border-t border-sakura-light/20">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="font-heading font-bold text-dark text-base sm:text-lg">
                          {lightbox.title}
                        </h3>
                        {/* Year badge */}
                        {lightbox.year && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-muted/10 text-muted/60">
                            {lightbox.year}
                          </span>
                        )}
                      </div>
                      {lightbox.description && (
                        <p className="text-muted/60 text-sm mt-0.5">{lightbox.description}</p>
                      )}
                      {/* Tech tags */}
                      {lightbox.tech && lightbox.tech.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {lightbox.tech.map((t) => (
                            <span key={t} className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-gradient-to-r from-sakura/20 to-lavender/15 text-dark/70">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {lightbox.link && (
                        <a href={lightbox.link} target="_blank" rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium
                            bg-gradient-to-r from-sakura/30 to-lavender/25 text-dark hover:from-sakura/40 hover:to-lavender/35 transition-all shadow-sm border border-white/40">
                          <ExternalLink size={14} /> Open
                        </a>
                      )}
                      <button onClick={() => setLightbox(null)}
                        className="w-9 h-9 rounded-full flex items-center justify-center text-muted/40 hover:text-dark hover:bg-muted/10 transition-all">
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Counter */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-mono text-muted/50 font-medium tracking-wider bg-white/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/40">
                {lightboxIndex + 1} / {filtered.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
