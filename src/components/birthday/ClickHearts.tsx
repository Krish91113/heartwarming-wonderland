import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";

interface Pop {
  id: number;
  x: number;
  y: number;
  color: string;
}

const colors = ["text-rose-500", "text-pink-500", "text-fuchsia-500", "text-purple-500", "text-amber-500"];

export function ClickHearts() {
  const [pops, setPops] = useState<Pop[]>([]);

  useEffect(() => {
    let nextId = 0;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Don't spam hearts when clicking interactive elements
      if (target.closest("button, a, input, textarea, iframe")) return;
      const id = nextId++;
      const color = colors[id % colors.length];
      setPops((p) => [...p, { id, x: e.clientX, y: e.clientY, color }]);
      setTimeout(() => setPops((p) => p.filter((h) => h.id !== id)), 1200);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <AnimatePresence>
        {pops.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0.4, x: p.x - 16, y: p.y - 16 }}
            animate={{ opacity: 0, scale: 1.8, y: p.y - 120 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className={`absolute ${p.color}`}
          >
            <Heart size={32} fill="currentColor" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
