import { motion } from "framer-motion";

const wishes = [
  { text: "May every sunrise bring you a new reason to smile and be happy.", from: "cheers ✨", tint: "from-pink-200 to-rose-200" },
  { text: "You deserve every good thing, every success, and all the joy this world has to offer.", from: "always 🌸", tint: "from-purple-200 to-fuchsia-200" },
  { text: "Keep shining bright — the world is a happier place with your kind of light.", from: "keep shining 🌟", tint: "from-amber-200 to-orange-200" },
  { text: "May your dreams grow wings, and may you conquer every challenge this year.", from: "best wishes 💫", tint: "from-rose-200 to-pink-200" },
  { text: "Good friends are like stars; you don't always see them, but you know they're always there.", from: "truly 🌟", tint: "from-violet-200 to-purple-200" },
  { text: "Wishing you a fantastic year overflowing with success, health, and laughter.", from: "your friend 🥂", tint: "from-peach-200 to-amber-200" },
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
          <h3 className="font-script text-5xl text-rose-600 sm:text-6xl font-bold">Wishes for You</h3>
          <p className="mt-3 text-rose-900/70 font-medium">A bouquet of little hopes floating your way.</p>
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
                <p className="mt-2 text-lg font-semibold leading-relaxed text-rose-950/95 italic">
                  "{w.text}"
                </p>
                <p className="font-script mt-4 text-2xl text-rose-600 font-bold">— {w.from}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
