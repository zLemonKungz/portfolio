"use client"

export default function LoadingScreen() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #FFF5F5, #FFD1DC, #FFB7C5, #D4B5E8, #B5D8EB, #FFF5F5)",
          backgroundSize: "400% 400%",
          animation: "gradientShift 8s ease infinite",
        }}
      />

      {/* Sakura petals floating */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="absolute text-sakura-deep/20 select-none pointer-events-none"
          style={{
            left: `${15 + i * 18}%`,
            top: "-30px",
            fontSize: `${16 + i * 6}px`,
            animation: `petalFall ${12 + i * 4}s ${i * 2}s linear infinite`,
          }}
        >
          🌸
        </div>
      ))}

      {/* Sparkles */}
      {[0, 1, 2].map((i) => (
        <div
          key={`s${i}`}
          className="absolute text-gold/20 select-none pointer-events-none"
          style={{
            left: `${10 + i * 35}%`,
            top: `${20 + i * 25}%`,
            fontSize: "18px",
            animation: `twinkle ${2 + i}s ${i * 0.8}s ease-in-out infinite`,
          }}
        >
          ✦
        </div>
      ))}

      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes petalFall {
          0% { transform: translateY(-30px) rotate(0deg) translateX(0); opacity: 0.4; }
          20% { opacity: 0.6; }
          80% { opacity: 0.2; }
          100% { transform: translateY(110vh) rotate(720deg) translateX(80px); opacity: 0; }
        }
      `}</style>

      {/* Skeleton content */}
      <div className="relative z-10 max-w-md w-full flex flex-col items-center gap-5">
        {/* Avatar shimmer */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-2 ring-white/40 shadow-lg relative">
          <div className="w-full h-full bg-white/30 backdrop-blur-sm" />
          <ShimmerLine />
        </div>

        {/* Name shimmer */}
        <div className="h-9 sm:h-10 w-56 rounded-lg relative overflow-hidden shadow-sm">
          <div className="w-full h-full bg-white/30 backdrop-blur-sm" />
          <ShimmerLine />
        </div>

        {/* Title shimmer */}
        <div className="h-5 w-72 rounded-md relative overflow-hidden shadow-sm">
          <div className="w-full h-full bg-white/20 backdrop-blur-sm" />
          <ShimmerLine />
        </div>

        {/* Quote shimmer */}
        <div className="h-4 w-64 rounded relative overflow-hidden shadow-sm">
          <div className="w-full h-full bg-white/20 backdrop-blur-sm" />
          <ShimmerLine />
        </div>

        {/* Button shimmer */}
        <div className="h-11 w-36 rounded-full relative overflow-hidden shadow-sm mt-2">
          <div className="w-full h-full bg-white/30 backdrop-blur-sm" />
          <ShimmerLine />
        </div>

        {/* Brand text */}
        <p className="text-white/40 text-xs tracking-widest uppercase mt-6 font-light animate-pulse">
          Sakura Galaxy
        </p>
      </div>
    </div>
  )
}

function ShimmerLine() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)",
        animation: "shimmerSlide 1.8s ease-in-out infinite",
      }}
    />
  )
}
