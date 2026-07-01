import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, Sparkle } from "lucide-react";

interface Spark {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  isStar: boolean;
  rotation: number;
}

const colors = [
  "text-amber-400",
  "text-yellow-400",
  "text-pink-400",
  "text-fuchsia-400",
  "text-purple-400",
  "text-cyan-400",
  "text-orange-400",
];

export function ClickSparks() {
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    let nextId = 0;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Don't spam sparks when clicking interactive elements
      if (target.closest("button, a, input, textarea, iframe, [role='button']")) return;

      const burstCount = 6;
      const newSparks: Spark[] = [];

      for (let i = 0; i < burstCount; i++) {
        const id = nextId++;
        // Random angle and speed for outward burst
        const angle = (i * (2 * Math.PI)) / burstCount + (Math.random() - 0.5) * 0.5;
        const speed = 50 + Math.random() * 80;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        const size = 12 + Math.random() * 16;
        const color = colors[id % colors.length];
        const isStar = Math.random() > 0.5;
        const rotation = Math.random() * 360;

        newSparks.push({
          id,
          x: e.clientX,
          y: e.clientY,
          vx,
          vy,
          size,
          color,
          isStar,
          rotation,
        });

        // Clean up individual spark
        setTimeout(() => {
          setSparks((prev) => prev.filter((s) => s.id !== id));
        }, 1000);
      }

      setSparks((prev) => [...prev, ...newSparks]);
    };

    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <AnimatePresence>
        {sparks.map((s) => (
          <motion.div
            key={s.id}
            initial={{
              opacity: 1,
              scale: 0.2,
              x: s.x - s.size / 2,
              y: s.y - s.size / 2,
              rotate: s.rotation,
            }}
            animate={{
              opacity: [1, 1, 0],
              scale: [0.2, 1.2, 0.4],
              x: s.x + s.vx - s.size / 2,
              y: s.y + s.vy - s.size / 2,
              rotate: s.rotation + 180,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className={`absolute ${s.color} drop-shadow-[0_0_8px_rgba(253,224,71,0.6)]`}
            style={{ width: s.size, height: s.size }}
          >
            {s.isStar ? (
              <Star size={s.size} fill="currentColor" />
            ) : (
              <Sparkle size={s.size} fill="currentColor" />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
