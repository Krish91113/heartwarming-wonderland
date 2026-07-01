import { motion } from "framer-motion";
import { Cake, Sparkles, PartyPopper } from "lucide-react";

interface HeroProps {
  onBlowCandles: () => void;
  onPlayMusic: () => void;
  musicPlaying: boolean;
}

export function Hero({ onBlowCandles, onPlayMusic, musicPlaying }: HeroProps) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/40 px-4 py-1.5 text-sm font-semibold text-rose-600 backdrop-blur-md"
      >
        <Sparkles size={16} /> A magical day just for you
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="font-script text-6xl leading-[1.05] tracking-tight text-transparent sm:text-7xl md:text-8xl lg:text-9xl"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #ec4899 0%, #a855f7 40%, #f59e0b 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          filter: "drop-shadow(0 6px 24px rgba(236,72,153,0.35))",
        }}
      >
        Happy Birthday
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="font-script mt-2 text-7xl text-transparent sm:text-8xl md:text-9xl lg:text-[10rem]"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #f43f5e 0%, #d946ef 50%, #f59e0b 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          filter:
            "drop-shadow(0 0 30px rgba(244,63,94,0.5)) drop-shadow(0 8px 20px rgba(217,70,239,0.4))",
        }}
      >
        Sneha ✨
      </motion.h2>

      {/* Bouncing cake */}
      <motion.div
        animate={{ y: [0, -18, 0], rotate: [-3, 3, -3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="mt-10"
      >
        <div className="relative inline-flex items-center justify-center rounded-full bg-white/60 p-6 shadow-2xl shadow-rose-300/40 backdrop-blur-md">
          <Cake size={72} className="text-rose-500 drop-shadow-lg" strokeWidth={1.5} />
          <motion.div
            animate={{ scaleY: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="absolute -top-3 h-4 w-1.5 rounded-full bg-gradient-to-t from-orange-500 to-yellow-300 shadow-[0_0_12px_4px_rgba(251,191,36,0.7)]"
          />
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="mt-8 max-w-xl text-lg text-rose-900/80 sm:text-xl"
      >
        Today, the whole world sparkles a little brighter — because it's <em>your</em> day. 💕
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <button
          onClick={onBlowCandles}
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 px-7 py-4 text-base font-bold text-white shadow-xl shadow-rose-400/50 transition hover:scale-105 hover:shadow-2xl hover:shadow-rose-500/60 active:scale-95"
        >
          <PartyPopper size={20} className="transition group-hover:rotate-12" />
          Blow the Candles
        </button>
        <button
          onClick={onPlayMusic}
          className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/50 px-7 py-4 text-base font-bold text-rose-700 shadow-lg shadow-purple-200/40 backdrop-blur-md transition hover:scale-105 hover:bg-white/70 active:scale-95"
        >
          {musicPlaying ? "🎵 Pause Music" : "🎶 Play Music"}
        </button>
      </motion.div>
    </section>
  );
}
