"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Film, BookOpen } from "lucide-react"
import portfolio from "@/config/portfolio"

interface Anime {
  title: string
  image: string
  episode: number
  totalEpisodes: number
  url: string
  score: number | null
}

export default function CurrentWatching() {
  const [animeList, setAnimeList] = useState<Anime[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const username = portfolio.malUser
    if (!username) {
      setError(true)
      setLoading(false)
      return
    }

    const cached = localStorage.getItem("mal-watching")
    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached)
        if (Date.now() - timestamp < 3600000) {
          setAnimeList(data)
          setLoading(false)
          return
        }
      } catch { /* ignore */ }
    }

    const fetchWithTimeout = (): Promise<void> => {
      const ctrl = new AbortController()
      const timer = setTimeout(() => ctrl.abort(), 10000)
      return fetch(`https://api.jikan.moe/v4/users/${username}/animelist?status=watching&limit=6`, { signal: ctrl.signal })
        .then((r) => { clearTimeout(timer); if (!r.ok) throw new Error("Jikan error"); return r.json() })
        .then((json) => {
          const list: Anime[] = (json.data || []).map((e: any) => ({
            title: e.anime?.title ?? e.title ?? "Unknown",
            image: e.anime?.images?.jpg?.small_image_url ?? e.images?.jpg?.small_image_url ?? "",
            episode: e.episodes_watched ?? 0,
            totalEpisodes: e.anime?.episodes ?? e.episodes ?? 0,
            url: e.anime?.url ?? e.url ?? "",
            score: e.anime?.score ?? e.score ?? null,
          }))
          setAnimeList(list)
          try { localStorage.setItem("mal-watching", JSON.stringify({ data: list, timestamp: Date.now() })) } catch { /* noop */ }
          setLoading(false)
        })
        .catch((err) => { clearTimeout(timer); throw err })
    }

    fetchWithTimeout()
      .catch(() =>
        new Promise<void>((resolve) => setTimeout(resolve, 2000))
          .then(() => fetchWithTimeout())
          .catch(() => { setError(true); setLoading(false) })
      )
  }, [])

  if (loading) return (
    <section className="px-4 py-20 sm:py-28 relative">
      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 badge-theme text-sakura-deep text-xs font-semibold px-5 py-1.5 rounded-full mb-8 tracking-wider border border-sakura/10">
          <span className="text-sm">📺</span>
          <span>Currently Watching</span>
        </div>
        <div className="flex gap-4 justify-center">
          {[1,2,3,4].map((i) => (
            <div key={i} className="w-64 shrink-0">
              <div className="h-20 rounded-xl bg-sakura/10 animate-pulse" />
              <div className="h-3 w-32 rounded bg-sakura/10 animate-pulse mt-2 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )

  if (error || animeList.length === 0) return null

  return (
    <section id="current-watching" className="px-4 py-20 sm:py-28 relative">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          className="inline-flex items-center gap-2 badge-theme text-sakura-deep text-xs font-semibold px-5 py-1.5 rounded-full mb-8 tracking-wider border border-sakura/10"
        >
          <span className="text-sm">📺</span>
          <span>Currently Watching</span>
        </motion.div>

        <div className="grid gap-4">
          <AnimatePresence mode="popLayout">
            {animeList.map((anime, i) => (
              <motion.a
                key={anime.title + i}
                href={anime.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ scale: 1.01, y: -2 }}
                className="group relative overflow-hidden rounded-xl border border-white/40 shadow-sm transition-all duration-500 hover:shadow-lg hover:shadow-lavender/10 hover:border-lavender/30"
              >
                <div className="relative glass-strong rounded-xl p-4 flex items-center gap-4">
                  {anime.image ? (
                    <div className="w-14 h-20 sm:w-16 sm:h-22 rounded-lg overflow-hidden shrink-0 shadow-md">
                      <img
                        src={anime.image}
                        alt={anime.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-20 rounded-lg bg-gradient-to-br from-sakura/20 to-lavender/20 flex items-center justify-center shrink-0">
                      <Film size={20} className="text-sakura-deep/40" />
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading font-medium text-dark text-sm sm:text-base truncate group-hover:text-sakura-deep transition-colors">
                      {anime.title}
                    </h3>

                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-sakura/15 text-sakura-deep/70">
                        Ep. {anime.episode}
                      </span>
                      {anime.score && (
                        <span className="text-[11px] text-muted/50">★ {anime.score}</span>
                      )}
                    </div>

                    {/* Progress bar */}
                    {anime.totalEpisodes > 0 && (
                      <div className="mt-2 h-1 rounded-full bg-sakura/10 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${Math.min((anime.episode / anime.totalEpisodes) * 100, 100)}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-sakura to-lavender"
                        />
                      </div>
                    )}
                  </div>

                  <motion.div
                    className="shrink-0 text-muted/30 group-hover:text-sakura-deep/50 transition-colors"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <BookOpen size={16} />
                  </motion.div>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>

        {animeList.length > 1 && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-6 text-[11px] font-mono text-muted/40"
          >
            {animeList.length} series in progress
          </motion.p>
        )}
      </div>
    </section>
  )
}
