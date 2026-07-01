import { motion } from "framer-motion";

const wishes = [
  { text: "May every sunrise bring you a reason to smile.", from: "with love 💕", tint: "from-pink-200 to-rose-200" },
  { text: "You deserve every good thing this world has to offer.", from: "always 🌸", tint: "from-purple-200 to-fuchsia-200" },
  { text: "Keep shining — the world needs your kind of light.", from: "forever ✨", tint: "from-amber-200 to-orange-200" },
  { text: "May your dreams grow wings and your heart stay soft.", from: "yours 💫", tint: "from-rose-200 to-pink-200" },
  { text: "You're not just a friend — you're a whole feeling.", from: "truly 🌷", tint: "from-violet-200 to-purple-200" },
  { text: "Wishing you a year overflowing with love and laughter.", from: "cheers 🥂", tint: "from-peach-200 to-amber-200" },
];

export function Wishes() {
  return (
    <section className="relative px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h3 className="font-script text-5xl text-rose-600 sm:text-6xl">Wishes for You</h3>
          <p className="mt-3 text-rose-900/70">A bouquet of little hopes floating your way.</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {wishes.map((w, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              animate={{ y: [0, -8, 0] }}
              // @ts-expect-error - framer-motion transition typing
              transitionEnd={{}}
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [-1, 1, -1] }}
                transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                className={`relative h-full rounded-3xl border border-white/70 bg-gradient-to-br ${w.tint} p-6 shadow-xl shadow-pink-200/40 backdrop-blur-sm`}
              >
                <div className="absolute -top-3 left-6 rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-rose-500 shadow">
                  Wish #{i + 1}
                </div>
                <p className="mt-2 text-lg font-medium leading-relaxed text-rose-950/90">
                  "{w.text}"
                </p>
                <p className="font-script mt-4 text-2xl text-rose-600">— {w.from}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
