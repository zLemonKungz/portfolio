import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-cream via-sakura-light/20 via-lavender/15 to-sky/10" />
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-sakura/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-lavender/5 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-md">
        {/* Big 404 */}
        <div className="text-8xl sm:text-9xl font-heading font-bold bg-gradient-to-r from-sakura-deep via-lavender to-sky bg-clip-text text-transparent">
          404
        </div>

        {/* Sakura */}
        <div className="text-5xl my-4">🌸</div>

        {/* Message */}
        <h2 className="text-xl sm:text-2xl font-heading font-bold text-dark mb-2">
          Page Not Found
        </h2>
        <p className="text-muted/70 text-sm sm:text-base mb-8 leading-relaxed">
          Oops! This page drifted away like a sakura petal in the wind...
        </p>

        {/* Back home button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 glass-strong px-6 py-3 rounded-full font-medium text-dark hover:shadow-lg hover:shadow-sakura/10 transition-all duration-300 group"
        >
          <span>🌸</span>
          <span>Go Back Home</span>
          <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
        </Link>
      </div>

      {/* Floating petal */}
      <div
        className="absolute text-sakura-deep/20 text-3xl select-none pointer-events-none"
        style={{
          top: "15%",
          left: "20%",
          animation: "float 4s ease-in-out infinite",
        }}
      >
        🌸
      </div>
      <div
        className="absolute text-sakura-deep/15 text-2xl select-none pointer-events-none"
        style={{
          bottom: "20%",
          right: "15%",
          animation: "float 3.5s ease-in-out infinite 1s",
        }}
      >
        ✿
      </div>
    </div>
  )
}
