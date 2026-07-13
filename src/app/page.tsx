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
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cream to-cream pointer-events-none" />
          <div className="relative z-10">
            <About />
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-cream via-sakura-light/10 to-cream pointer-events-none" />
          <div className="relative z-10">
            <Gallery />
          </div>
        </div>
        <Contact />
      </main>
    </LoadingGate>
  )
}
