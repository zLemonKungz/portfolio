"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Music } from "lucide-react"
import portfolio from "@/config/portfolio"

interface Track {
  name: string
  artist: string
  image?: string
  isPlaying: boolean
  url: string
}

const CACHE_KEY = "lastfm-nowplaying"
const POLL_INTERVAL = 30_000

export default function NowPlaying() {
  const [track, setTrack] = useState<Track | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  const fetchTrack = useCallback(async () => {
    const key = process.env.NEXT_PUBLIC_LASTFM_KEY
    if (!key) {
      setLoading(false)
      return
    }
    try {
      const ctrl = new AbortController()
      const timer = setTimeout(() => ctrl.abort(), 8000)
      const res = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${portfolio.lastfmUser || "zLemonKungz"}&api_key=${key}&format=json&limit=1`,
        { signal: ctrl.signal }
      )
      clearTimeout(timer)
      if (!res.ok) throw new Error("Failed")
      const data = await res.json()
      const recent = data?.recenttracks?.track?.[0]
      if (!recent) {
        setTrack(null)
        setLoading(false)
        return
      }
      const images = recent.image ?? []
      const result: Track = {
        name: recent.name ?? "Unknown",
        artist: recent.artist?.["#text"] ?? "Unknown",
        image: images.find((i: { size: string }) => i.size === "small")?.["#text"],
        isPlaying: recent["@attr"]?.nowplaying === "true",
        url: recent.url ?? "",
      }
      setTrack(result)
      try { localStorage.setItem(CACHE_KEY, JSON.stringify({ ...result, timestamp: Date.now() })) } catch { /* noop */ }
    } catch {
      // Fallback to cache
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        try {
          const parsed = JSON.parse(cached)
          if (Date.now() - parsed.timestamp < 300_000) { // 5min fallback
            setTrack(parsed)
          }
        } catch { /* noop */ }
      }
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    setMounted(true)
    fetchTrack()
    const interval = setInterval(fetchTrack, POLL_INTERVAL)
    return () => clearInterval(interval)
  }, [fetchTrack])

  const showTrack = mounted && !loading && track

  return (
    <AnimatePresence>
      {showTrack && (
        <motion.a
          key="now-playing"
          href={track!.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 px-3 py-2 rounded-full shadow-lg backdrop-blur-md border transition-all duration-300 hover:scale-105 hover:shadow-xl group"
          style={{
            backgroundColor: track!.isPlaying ? "rgba(212,181,232,0.2)" : "rgba(255,255,255,0.35)",
            borderColor: track!.isPlaying ? "rgba(212,181,232,0.3)" : "rgba(255,255,255,0.4)",
          }}
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 bg-sakura/10 flex items-center justify-center">
            {track!.image ? (
              <img src={track!.image} alt="" className="w-full h-full object-cover" />
            ) : (
              <Music size={14} className="text-sakura-deep" />
            )}
            {track!.isPlaying && (
              <motion.span
                className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </div>

          <div className="flex flex-col min-w-0 max-w-[160px]">
            <span className="text-xs font-medium text-dark truncate leading-tight group-hover:text-dark/80 transition-colors">
              {track!.isPlaying ? track!.name : `♫ ${track!.name}`}
            </span>
            <span className="text-[10px] text-muted/60 truncate leading-tight">
              {track!.artist}
            </span>
          </div>

          {track!.isPlaying && (
            <span className="text-[9px] font-mono tracking-wider text-green-500/70 uppercase shrink-0">
              LIVE
            </span>
          )}
        </motion.a>
      )}
    </AnimatePresence>
  )
}
