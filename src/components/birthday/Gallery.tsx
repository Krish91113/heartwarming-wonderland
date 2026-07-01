import { motion } from "framer-motion";

const memories = [
  {
    title: "Our crazy adventures",
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
  },
  {
    title: "Late night talks",
    img: "https://images.unsplash.com/photo-1519683109079-d5f539e1542f?w=600&q=80",
  },
  {
    title: "Endless laughter",
    img: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=600&q=80",
  },
  {
    title: "Coffee & confessions",
    img: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&q=80",
  },
  {
    title: "Sunset walks",
    img: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&q=80",
  },
  {
    title: "Best. Team. Ever.",
    img: "https://images.unsplash.com/photo-1522543558187-768b6df7c25c?w=600&q=80",
  },
];

export function Gallery() {
  return (
    <section className="relative px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h3 className="font-script text-5xl text-rose-600 sm:text-6xl">Our Little Memories</h3>
          <p className="mt-3 text-rose-900/70">A tiny scrapbook of the moments I treasure most.</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {memories.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, rotate: i % 2 ? 1 : -1 }}
              className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/50 p-3 shadow-xl shadow-purple-200/40 backdrop-blur-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <img
                  src={m.img}
                  alt={m.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-900/60 via-transparent to-transparent" />
              </div>
              <p className="font-script mt-3 px-2 pb-1 text-2xl text-rose-600">{m.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
