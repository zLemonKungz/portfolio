"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import LoadingScreen from "./LoadingScreen"

export default function LoadingGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 1800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Loading screen — mounted only while loading */}
      <AnimatePresence mode="wait">
        {!ready && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-[200]"
          >
            <LoadingScreen />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content — mounts only after loading, then animates in */}
      <AnimatePresence mode="wait">
        {ready && (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
