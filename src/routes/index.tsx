import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { FloatingBackground } from "@/components/birthday/FloatingBackground";
import { Hero } from "@/components/birthday/Hero";
import { Message } from "@/components/birthday/Message";
import { Gallery } from "@/components/birthday/Gallery";
import { Wishes } from "@/components/birthday/Wishes";
import { Footer } from "@/components/birthday/Footer";
import { ClickHearts } from "@/components/birthday/ClickHearts";

export const Route = createFileRoute("/")({
  component: Index,
});

// A cheerful, royalty-free happy-birthday tune (public domain).
const MUSIC_URL =
  "https://cdn.pixabay.com/audio/2022/10/18/audio_6d9c923c37.mp3";

function fireConfetti() {
  const defaults = {
    startVelocity: 35,
    spread: 360,
    ticks: 70,
    zIndex: 60,
    scalar: 1.1,
  };
  const colors = ["#f43f5e", "#ec4899", "#a855f7", "#f59e0b", "#fb7185", "#fde68a"];
  confetti({ ...defaults, particleCount: 120, origin: { x: 0.2, y: 0.5 }, colors });
  confetti({ ...defaults, particleCount: 120, origin: { x: 0.8, y: 0.5 }, colors });
  confetti({ ...defaults, particleCount: 160, origin: { x: 0.5, y: 0.3 }, colors });
}

function Index() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [musicPlaying, setMusicPlaying] = useState(false);

  // Confetti on load
  useEffect(() => {
    const t = setTimeout(fireConfetti, 500);
    return () => clearTimeout(t);
  }, []);

  const handleBlowCandles = () => {
    fireConfetti();
    // A second burst for extra magic
    setTimeout(fireConfetti, 400);
  };

  const handlePlayMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(MUSIC_URL);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.55;
    }
    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      audioRef.current.play().catch(() => {
        // Autoplay/network failure — silent fallback
      });
      setMusicPlaying(true);
      fireConfetti();
    }
  };

  return (
    <main
      className="relative min-h-screen overflow-hidden font-sans text-rose-950"
      style={{
        backgroundImage:
          "linear-gradient(135deg, #ffe4e6 0%, #fce7f3 20%, #fae8ff 45%, #fef3c7 75%, #fed7aa 100%)",
      }}
    >
      {/* Soft animated glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-pink-300/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-purple-300/50 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-200/40 blur-3xl" />

      <FloatingBackground />
      <ClickHearts />

      <div className="relative z-10">
        <Hero
          onBlowCandles={handleBlowCandles}
          onPlayMusic={handlePlayMusic}
          musicPlaying={musicPlaying}
        />
        <Message />
        <Gallery />
        <Wishes />
        <Footer />
      </div>
    </main>
  );
}
