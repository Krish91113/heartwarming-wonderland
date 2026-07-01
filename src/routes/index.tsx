import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { FloatingBackground } from "@/components/birthday/FloatingBackground";
import { Hero } from "@/components/birthday/Hero";
import { Message } from "@/components/birthday/Message";
import { Gallery } from "@/components/birthday/Gallery";
import { Wishes } from "@/components/birthday/Wishes";
import { Footer } from "@/components/birthday/Footer";
import { ClickSparks } from "@/components/birthday/ClickSparks";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Gift } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

// Online backup streaming link for Arijit Singh's friendship song "Tera Yaar Hoon Main"
const ARIJIT_SONG_URL =
  "https://archive.org/download/monsterkill_201805/Tera%20Yaar%20Hoon%20Main%20_%20Tu%20Jo%20rutha%20to%20kon%20hasega%20_%20Sonu%20ke%20titu%20ki%20sweety%20Song%20_%20Arijit%20_%20Tu%20Jo%20Rutha.mp3";

function fireConfetti() {
  const defaults = {
    startVelocity: 35,
    spread: 360,
    ticks: 70,
    zIndex: 60,
    scalar: 1.1,
  };
  const colors = ["#ec4899", "#a855f7", "#f59e0b", "#fb7185", "#3b82f6", "#10b981"];
  confetti({ ...defaults, particleCount: 120, origin: { x: 0.2, y: 0.5 }, colors });
  confetti({ ...defaults, particleCount: 120, origin: { x: 0.8, y: 0.5 }, colors });
  confetti({ ...defaults, particleCount: 160, origin: { x: 0.5, y: 0.3 }, colors });
}

function Index() {
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Single persistent audio player ref initialized on mount
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Confetti on load & initialize audio player with local file and gesture unlock
  useEffect(() => {
    const t = setTimeout(fireConfetti, 500);

    // Initialize the Audio object with /moonstruck.mp3
    const audio = new Audio("/moonstruck.mp3");
    audio.loop = true;
    audio.volume = 0.7; // 70% volume as specified
    audioRef.current = audio;

    // Fallback if local "/moonstruck.mp3" is missing or fails to load
    audio.onerror = () => {
      console.warn("Local /moonstruck.mp3 not found or failed to play. Switching to online Arijit backup stream...");
      audio.onerror = null; // prevent infinite loops
      audio.src = ARIJIT_SONG_URL;
      audio.load();
      if (musicPlaying) {
        audio.play().catch((err) => console.error("Arijit fallback play failed:", err));
      }
    };

    // Unlock audio on first page click/touch to comply with browser autoplay restrictions
    const unlockAudio = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => {
            audioRef.current?.pause();
            console.log("Audio player successfully unlocked on first user interaction.");
          })
          .catch((err) => {
            console.log("Audio gesture unlock deferred:", err);
          });
      }
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
    };

    window.addEventListener("click", unlockAudio);
    window.addEventListener("touchstart", unlockAudio);

    return () => {
      clearTimeout(t);
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleBlowCandles = () => {
    setCandlesBlown(true);
    setShowPopup(true);
    fireConfetti();
    
    // Play Moonstruck automatically when the candle is blown
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setMusicPlaying(true);
        })
        .catch((err) => {
          console.error("Autoplay on blow blocked (waiting for interaction):", err);
        });
    }
    
    // Burst confetti repeatedly for celebration
    setTimeout(fireConfetti, 350);
    setTimeout(fireConfetti, 700);
  };

  const handleResetCandles = () => {
    setCandlesBlown(false);
    setShowPopup(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setMusicPlaying(false);
  };

  const handlePlayMusic = () => {
    if (!audioRef.current) return;

    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setMusicPlaying(true);
        })
        .catch((err) => {
          console.error("Play request failed:", err);
        });
      fireConfetti();
    }
  };

  return (
    <main
      className="relative min-h-screen overflow-hidden font-sans text-rose-950"
      style={{
        backgroundImage:
          "linear-gradient(135deg, #fef3c7 0%, #fde68a 15%, #ffe4e6 45%, #fce7f3 75%, #fae8ff 100%)",
      }}
    >
      {/* Soft animated glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-pink-300/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-purple-300/40 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-200/50 blur-3xl" />

      <FloatingBackground />
      <ClickSparks />

      <div className="relative z-10">
        <Hero
          onBlowCandles={handleBlowCandles}
          onPlayMusic={handlePlayMusic}
          musicPlaying={musicPlaying}
          candlesBlown={candlesBlown}
          onResetCandles={handleResetCandles}
        />
        <Message />
        <Gallery />
        <Wishes />
        <Footer />
      </div>

      {/* Birthday Card Popup Modal */}
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPopup(false)}
              className="absolute inset-0 bg-rose-950/40 backdrop-blur-sm"
            />

            {/* Modal Card Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/70 bg-gradient-to-br from-amber-100 via-white to-pink-50 p-6 sm:p-8 md:p-10 shadow-2xl"
            >
              {/* Decorative side blurs */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-yellow-200/50 blur-2xl animate-pulse" />
              <div className="pointer-events-none absolute -left-16 -bottom-16 h-36 w-36 rounded-full bg-pink-200/50 blur-2xl animate-pulse" />

              {/* Close Button */}
              <button
                onClick={() => setShowPopup(false)}
                className="absolute right-6 top-6 rounded-full bg-rose-100 p-1.5 text-rose-500 hover:bg-rose-200 hover:text-rose-600 transition shadow-sm"
              >
                <X size={18} />
              </button>

              <div className="text-center relative">
                {/* Sparkle banner */}
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 shadow-md">
                  <Sparkles size={28} className="text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
                </div>

                <h3 className="font-script text-4xl text-rose-600 sm:text-5xl font-bold leading-tight">
                  Happy Birthday, Sneha! 🎉
                </h3>

                <div className="mt-6 space-y-4 text-rose-950 text-base md:text-lg font-medium leading-relaxed">
                  <p>
                    Yay! You blew out the candle! 🎂✨
                  </p>
                  <p>
                    Sneha, you are one of the most supportive, hilarious, and genuinely awesome friends
                    anyone could ask for. Thank you for always bringing so much positive energy, inside jokes, and smiles wherever you go.
                  </p>
                  <p className="bg-amber-100/60 py-3 px-4 rounded-2xl border border-amber-200/30 text-rose-900/90 font-semibold italic flex items-center justify-center gap-2">
                    <Gift size={16} className="text-amber-600 animate-bounce" /> Here's to more study breaks, epic road trips, and amazing moments ahead!
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-3">
                  <button
                    onClick={() => setShowPopup(false)}
                    className="w-full rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 py-3.5 text-base font-bold text-white shadow-xl shadow-rose-300/50 transition hover:scale-105 active:scale-95"
                  >
                    Explore scrapbooks & wishes 🎈
                  </button>
                  <button
                    onClick={() => {
                      handleResetCandles();
                      fireConfetti();
                    }}
                    className="w-full text-sm font-semibold text-rose-600 hover:text-rose-700 transition hover:underline"
                  >
                    Blow the candle again! 🎤
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
