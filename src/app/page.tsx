"use client"

import { useState, useEffect } from "react"
import BackgroundEffects, { type TimeOfDay } from "@/components/BackgroundEffects"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Gallery from "@/components/Gallery"
import Contact from "@/components/Contact"
import ProgressBar from "@/components/ProgressBar"
import SectionCounter from "@/components/SectionCounter"
import CustomCursor from "@/components/CustomCursor"
import NowPlaying from "@/components/NowPlaying"
import BackToTop from "@/components/BackToTop"
import TimeToggle from "@/components/TimeToggle"
import CurrentWatching from "@/components/CurrentWatching"
import EasterEgg from "@/components/EasterEgg"
import LoadingGate from "@/components/LoadingGate"

export default function Home() {
  const [time, setTime] = useState<TimeOfDay | null>(null)

  useEffect(() => {
    if (time) {
      document.documentElement.dataset.theme = time
    } else {
      const h = new Date().getHours()
      document.documentElement.dataset.theme = (h >= 6 && h < 18) ? "day" : "night"
    }
  }, [time])

  return (
    <LoadingGate>
      <ProgressBar />
      <CustomCursor />
      <NowPlaying />
      <TimeToggle time={time} onChange={setTime} />
      <BackgroundEffects timeOverride={time} />
      <Navbar />
      <SectionCounter />
      <BackToTop />
      <EasterEgg />
      <main className="relative z-10">
        <Hero />
        <About />
        <CurrentWatching />
        <Gallery />
        <Contact />
      </main>
    </LoadingGate>
  )
}
