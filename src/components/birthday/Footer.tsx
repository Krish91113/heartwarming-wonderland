import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative px-4 py-16 text-center">
      <div className="mx-auto max-w-2xl">
        <p className="font-script text-4xl text-rose-600 sm:text-5xl">
          Have the sweetest day, Sneha 🎂
        </p>
        <p className="mt-4 flex items-center justify-center gap-2 text-rose-900/70">
          Made with <Heart size={16} className="text-rose-500" fill="currentColor" /> just for you.
        </p>
      </div>
    </footer>
  );
}
