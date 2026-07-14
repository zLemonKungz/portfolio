import { motion } from "framer-motion"

export default function SectionDivider() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0.5 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex items-center justify-center gap-3 my-4"
    >
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 64 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
        className="h-px sm:w-24 bg-gradient-to-r from-transparent via-sakura/30 to-lavender/30"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
        className="flex items-center gap-1"
      >
        <span className="text-sakura-deep/20 text-xs">✦</span>
        <span className="text-sakura-deep/15 text-[10px]">✧</span>
        <span className="text-sakura-deep/20 text-xs">✦</span>
      </motion.div>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 64 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
        className="h-px sm:w-24 bg-gradient-to-r from-lavender/30 via-sakura/30 to-transparent"
      />
    </motion.div>
  )
}
