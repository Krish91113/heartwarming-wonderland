import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const balloons = [
  { color: "bg-pink-300", left: "5%", delay: 0 },
  { color: "bg-purple-300", left: "15%", delay: 1.2 },
  { color: "bg-amber-300", left: "28%", delay: 2.4 },
  { color: "bg-rose-300", left: "42%", delay: 0.6 },
  { color: "bg-fuchsia-300", left: "58%", delay: 1.8 },
  { color: "bg-orange-200", left: "72%", delay: 0.3 },
  { color: "bg-pink-400", left: "85%", delay: 2.1 },
  { color: "bg-violet-300", left: "94%", delay: 1.5 },
];

const hearts = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 7 + 3) % 100}%`,
  delay: (i * 0.7) % 6,
  size: 14 + (i % 4) * 6,
}));

export function FloatingBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Balloons */}
      {balloons.map((b, i) => (
        <motion.div
          key={`b-${i}`}
          className="absolute -bottom-24"
          style={{ left: b.left }}
          initial={{ y: 0 }}
          animate={{ y: "-120vh", x: [0, 20, -20, 0] }}
          transition={{
            y: { duration: 18 + (i % 5), repeat: Infinity, delay: b.delay, ease: "linear" },
            x: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <div className={`h-16 w-14 rounded-full ${b.color} shadow-xl shadow-pink-200/50 opacity-80`} />
          <div className="mx-auto h-16 w-px bg-pink-300/60" />
        </motion.div>
      ))}

      {/* Floating hearts */}
      {hearts.map((h, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute -bottom-10 text-rose-400/60"
          style={{ left: h.left }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: "-110vh", opacity: [0, 1, 1, 0] }}
          transition={{ duration: 12 + (i % 4), repeat: Infinity, delay: h.delay, ease: "linear" }}
        >
          <Heart size={h.size} fill="currentColor" />
        </motion.div>
      ))}

      {/* Sparkles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={`s-${i}`}
          className="absolute h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.9)]"
          style={{ top: `${(i * 13) % 100}%`, left: `${(i * 37) % 100}%` }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.6, 1.2, 0.6] }}
          transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: (i * 0.2) % 3 }}
        />
      ))}
    </div>
  );
}
