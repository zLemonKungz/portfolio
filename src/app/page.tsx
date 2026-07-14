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
import BackToTop from "@/components/BackToTop"
import TimeToggle from "@/components/TimeToggle"
import LoadingGate from "@/components/LoadingGate"

export default function Home() {
  const [time, setTime] = useState<TimeOfDay | null>(null)

  useEffect(() => {
    const t = time ?? (new Date().getHours() >= 6 && new Date().getHours() < 18 ? "day" : "night")
    document.documentElement.dataset.theme = t
  }, [time])

  return (
    <LoadingGate>
      <ProgressBar />
      <CustomCursor />
      <TimeToggle time={time} onChange={setTime} />
      <BackgroundEffects timeOverride={time} />
      <Navbar />
      <SectionCounter />
      <BackToTop />
      <main className="relative z-10">
        <Hero />
        <About />
        <Gallery />
        <Contact />
      </main>
    </LoadingGate>
  )
}
