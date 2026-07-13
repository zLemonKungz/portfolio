import BackgroundEffects from "@/components/BackgroundEffects"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Gallery from "@/components/Gallery"
import Contact from "@/components/Contact"
import ProgressBar from "@/components/ProgressBar"
import SectionCounter from "@/components/SectionCounter"
import CustomCursor from "@/components/CustomCursor"
import BackToTop from "@/components/BackToTop"
import LoadingGate from "@/components/LoadingGate"

export default function Home() {
  return (
    <LoadingGate>
      <ProgressBar />
      <CustomCursor />
      <BackgroundEffects />
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
