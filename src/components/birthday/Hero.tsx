import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cake, Sparkles, PartyPopper, Mic, MicOff, RotateCcw } from "lucide-react";

interface HeroProps {
  onBlowCandles: () => void;
  onPlayMusic: () => void;
  musicPlaying: boolean;
  candlesBlown: boolean;
  onResetCandles: () => void;
}

export function Hero({
  onBlowCandles,
  onPlayMusic,
  musicPlaying,
  candlesBlown,
  onResetCandles,
}: HeroProps) {
  const [isMicActive, setIsMicActive] = useState(false);
  const [blowIntensity, setBlowIntensity] = useState(0);
  const [micError, setMicError] = useState<string | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const startMic = async () => {
    try {
      // Request audio stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContextClass();
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      setIsMicActive(true);
      setMicError(null);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const checkBlow = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);

        // Blowing produces high amplitude low-frequency wind noise.
        // We calculate the average amplitude of the lower frequencies.
        let lowFreqSum = 0;
        const count = Math.min(8, bufferLength);
        for (let i = 0; i < count; i++) {
          lowFreqSum += dataArray[i];
        }
        const averageLow = lowFreqSum / count; // 0 to 255

        // Map sound levels (mostly 0 to 180 in standard mics) to a 0-100% meter
        const intensity = Math.min(100, Math.round((averageLow / 160) * 100));
        setBlowIntensity(intensity);

        // Trigger blow event if sound intensity passes a threshold
        if (averageLow > 105) {
          onBlowCandles();
          stopMic();
        } else {
          animationFrameRef.current = requestAnimationFrame(checkBlow);
        }
      };

      checkBlow();
    } catch (err: any) {
      console.error("Error accessing microphone:", err);
      setMicError("Microphone access denied. Try manual blow!");
      setIsMicActive(false);
    }
  };

  const stopMic = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setIsMicActive(false);
    setBlowIntensity(0);
  };

  const handleToggleMic = () => {
    if (isMicActive) {
      stopMic();
    } else {
      startMic();
    }
  };

  // Clean up mic on unmount
  useEffect(() => {
    return () => {
      stopMic();
    };
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/40 px-4 py-1.5 text-sm font-semibold text-rose-600 backdrop-blur-md"
      >
        <Sparkles size={16} className="text-amber-500 animate-pulse" /> A magical day just for a wonderful friend
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="font-script text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[1.05] tracking-tight text-transparent px-2"
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
        className="font-script mt-2 text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] text-transparent px-2"
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

      {/* Bouncing cake & candles */}
      <motion.div
        animate={{ y: candlesBlown ? 0 : [0, -18, 0], rotate: candlesBlown ? 0 : [-3, 3, -3] }}
        transition={{ duration: 3, repeat: candlesBlown ? 0 : Infinity, ease: "easeInOut" }}
        className="mt-10 relative"
      >
        <div className="relative inline-flex items-center justify-center rounded-full bg-white/60 p-6 shadow-2xl shadow-rose-300/40 backdrop-blur-md">
          <Cake size={72} className="text-rose-500 drop-shadow-lg" strokeWidth={1.5} />
          
          {/* Candle Flame - disappears when candles are blown */}
          <AnimatePresence>
            {!candlesBlown && (
              <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ scaleY: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                exit={{ opacity: 0, scale: 0, y: -20 }}
                transition={{
                  scaleY: { duration: 0.6, repeat: Infinity },
                  exit: { duration: 0.4 }
                }}
                className="absolute -top-3 h-4 w-1.5 rounded-full bg-gradient-to-t from-orange-500 to-yellow-300 shadow-[0_0_12px_4px_rgba(251,191,36,0.7)]"
              />
            )}
          </AnimatePresence>

          {/* Candle smoke when blown */}
          {candlesBlown && (
            <motion.div
              initial={{ opacity: 0.8, scale: 0.2, y: -5 }}
              animate={{ opacity: 0, scale: 2, y: -30, x: [0, 10, -5] }}
              transition={{ duration: 1.5 }}
              className="absolute -top-4 h-2 w-2 rounded-full bg-gray-400/60 blur-[1px]"
            />
          )}
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="mt-8 max-w-xl text-lg text-rose-900/80 sm:text-xl font-medium"
      >
        Today, the whole world sparkles a little brighter — because it's your day! ✨
      </motion.p>

      {/* Mic activation and Blow status */}
      <div className="mt-8 min-h-[50px] flex flex-col items-center">
        {isMicActive && !candlesBlown && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-2"
          >
            <p className="text-sm font-semibold text-rose-700 animate-pulse">
              🌬️ Blow into your microphone now!
            </p>
            {/* Breath meter bar */}
            <div className="h-3 w-48 rounded-full bg-rose-200/50 overflow-hidden border border-rose-300/40 p-0.5">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-rose-500"
                style={{ width: `${blowIntensity}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>
          </motion.div>
        )}

        {micError && (
          <p className="text-xs text-amber-600 font-medium">{micError}</p>
        )}

        {candlesBlown && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 text-emerald-600 font-bold"
          >
            🎉 You blew out the candle!
            <button
              onClick={onResetCandles}
              className="ml-2 inline-flex items-center justify-center p-1 rounded-full hover:bg-emerald-100 transition"
              title="Relight Candle"
            >
              <RotateCcw size={14} />
            </button>
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="mt-6 flex flex-wrap items-center justify-center gap-4"
      >
        {!candlesBlown ? (
          <>
            <button
              onClick={handleToggleMic}
              className={`group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-base font-bold text-white shadow-xl transition hover:scale-105 active:scale-95 ${
                isMicActive
                  ? "bg-amber-500 shadow-amber-400/40"
                  : "bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 shadow-rose-400/40"
              }`}
            >
              {isMicActive ? <MicOff size={20} /> : <Mic size={20} className="animate-bounce" />}
              {isMicActive ? "Cancel Mic Blow" : "🎤 Blow with Mic"}
            </button>

            {/* Click to blow fallback */}
            <button
              onClick={onBlowCandles}
              className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/50 px-6 py-3.5 text-base font-bold text-rose-700 shadow-lg shadow-purple-200/40 backdrop-blur-md transition hover:scale-105 hover:bg-white/70 active:scale-95"
            >
              <PartyPopper size={20} />
              Blow Candle (Tap)
            </button>
          </>
        ) : (
          <button
            onClick={onResetCandles}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3.5 text-base font-bold text-white shadow-xl shadow-teal-400/40 transition hover:scale-105 active:scale-95"
          >
            <RotateCcw size={20} />
            Relight Candle
          </button>
        )}

        <button
          onClick={onPlayMusic}
          className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/50 px-6 py-3.5 text-base font-bold text-rose-700 shadow-lg shadow-purple-200/40 backdrop-blur-md transition hover:scale-105 hover:bg-white/70 active:scale-95"
        >
          {musicPlaying ? "🎵 Pause Music" : "🎶 Play Music"}
        </button>
      </motion.div>
    </section>
  );
}