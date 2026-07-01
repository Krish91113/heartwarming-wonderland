import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function Message() {
  return (
    <section className="relative px-4 py-20">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/50 p-8 shadow-2xl shadow-pink-300/30 backdrop-blur-2xl sm:p-12"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-pink-300/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-purple-300/40 blur-3xl" />

          <div className="relative">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-rose-100/80 px-4 py-1.5 text-sm font-semibold text-rose-600">
              <Heart size={14} fill="currentColor" /> A little note for you
            </div>
            <h3 className="font-script text-5xl text-rose-600 sm:text-6xl">Dear Sneha,</h3>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-rose-950/85 sm:text-xl">
              <p>
                On your special day, I just want to tell you how <strong>grateful</strong> I am
                to have you in my life. Your smile lights up every room, and your laugh has this
                magical way of turning ordinary days into unforgettable memories.
              </p>
              <p>
                You are the friend who listens without judging, who celebrates every tiny win,
                and who reminds me that the world is a softer, kinder place because of hearts
                like yours.
              </p>
              <p>
                May this year bring you unlimited happiness, wild adventures, quiet peace,
                unexpected love, and <em>all the cake you can eat</em>. 🎂
              </p>
              <p className="font-script text-3xl text-rose-500 sm:text-4xl">
                Love you tons, always. ❤️
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
