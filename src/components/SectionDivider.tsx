export default function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-4">
      <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-sakura/30 to-lavender/30" />
      <div className="flex items-center gap-1">
        <span className="text-sakura-deep/20 text-xs">✦</span>
        <span className="text-sakura-deep/15 text-[10px]">✧</span>
        <span className="text-sakura-deep/20 text-xs">✦</span>
      </div>
      <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-lavender/30 via-sakura/30 to-transparent" />
    </div>
  )
}
