import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, CheckCircle2, AlertCircle, HelpCircle, RotateCcw, PartyPopper } from "lucide-react";
import confetti from "canvas-confetti";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
  funFact: string;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    text: "What is Sneha's go-to mood booster? ☀️",
    options: [
      "A hot cup of coffee/chai ☕",
      "Listening to favorite music 🎵",
      "Scrolling through memes 📱",
      "Taking a quick nap 😴",
    ],
    correctIndex: 0,
    funFact: "Chai/coffee is always the answer! It instantly lights up her day. ☕✨",
  },
  {
    id: 2,
    text: "What is Sneha's absolute favorite way to hang out? 🎈",
    options: [
      "Spontaneous road trips 🚗",
      "Cozy cafe chats 🍰",
      "Exploring new places 🗺️",
      "All of the above! (The more the merrier) ✨",
    ],
    correctIndex: 3,
    funFact: "Whether it is a long drive or a cafe hang, she is always down for fun adventures! 🌟",
  },
  {
    id: 3,
    text: "If Sneha had a superpower, what would it be? 🦸‍♀️",
    options: [
      "Eating unlimited cake without getting full 🍰",
      "Spreading positive vibes instantly 🌟",
      "Remembering every single inside joke 🧠",
      "Always being late but arriving in style ⏰",
    ],
    correctIndex: 1,
    funFact: "Her positive energy is infectious and makes everyone around her smile! 💛",
  },
];

export function Gallery() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswerClick = (optIndex: number) => {
    if (selectedAns !== null) return; // prevent multiple clicks
    setSelectedAns(optIndex);
    
    const isCorrect = optIndex === quizQuestions[currentIdx].correctIndex;
    if (isCorrect) {
      setScore((s) => s + 1);
      // Trigger a small confetti pop for correct answer
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }

    setShowExplanation(true);
  };

  const handleNext = () => {
    setSelectedAns(null);
    setShowExplanation(false);
    
    if (currentIdx < quizQuestions.length - 1) {
      setCurrentIdx((idx) => idx + 1);
    } else {
      setQuizFinished(true);
      // Major confetti celebration on completion!
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAns(null);
    setScore(0);
    setShowExplanation(false);
    setQuizFinished(false);
  };

  const q = quizQuestions[currentIdx];

  return (
    <section className="relative px-4 py-20">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h3 className="font-script text-5xl text-rose-600 sm:text-6xl font-bold">Friendship Trivia</h3>
          <p className="mt-3 text-rose-900/70 font-medium">How well do you actually know Sneha? Let's find out! 🧠✨</p>
        </motion.div>

        <motion.div
          layout
          className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/50 p-6 sm:p-8 shadow-2xl shadow-purple-200/40 backdrop-blur-2xl"
        >
          <AnimatePresence mode="wait">
            {!quizFinished ? (
              <motion.div
                key={currentIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {/* Question Progress Tracker */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-bold bg-rose-100 text-rose-600 px-3 py-1 rounded-full flex items-center gap-1">
                    <HelpCircle size={12} /> Question {currentIdx + 1} of {quizQuestions.length}
                  </span>
                  <span className="text-xs font-bold text-rose-900/70">
                    Score: {score}
                  </span>
                </div>

                {/* Question Text */}
                <h4 className="text-xl sm:text-2xl font-bold text-rose-950 leading-snug mb-6">
                  {q.text}
                </h4>

                {/* Option Buttons */}
                <div className="grid grid-cols-1 gap-3">
                  {q.options.map((opt, idx) => {
                    const isSelected = selectedAns === idx;
                    const isCorrect = idx === q.correctIndex;
                    let btnStyle = "border-white/80 bg-white/40 text-rose-950 hover:bg-white/80 hover:scale-[1.01]";
                    
                    if (selectedAns !== null) {
                      if (isCorrect) {
                        btnStyle = "bg-emerald-100 border-emerald-300 text-emerald-950 shadow-emerald-200/50 shadow-md";
                      } else if (isSelected) {
                        btnStyle = "bg-rose-100 border-rose-300 text-rose-950 shadow-rose-200/50 shadow-md";
                      } else {
                        btnStyle = "opacity-60 border-white/40 bg-white/20 text-rose-950/70 cursor-not-allowed";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={selectedAns !== null}
                        onClick={() => handleAnswerClick(idx)}
                        className={`flex justify-between items-center w-full px-5 py-4 rounded-2xl border text-left font-semibold text-base transition-all duration-200 gap-3 ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {selectedAns !== null && isCorrect && (
                          <CheckCircle2 className="text-emerald-600 shrink-0" size={18} />
                        )}
                        {selectedAns !== null && isSelected && !isCorrect && (
                          <AlertCircle className="text-rose-500 shrink-0" size={18} />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Fact Explanation Card */}
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 rounded-2xl bg-amber-100/60 border border-amber-200/40 text-amber-950"
                  >
                    <p className="text-sm font-semibold mb-1 flex items-center gap-1.5">
                      💡 Quick Fact:
                    </p>
                    <p className="text-sm font-medium leading-relaxed">
                      {q.funFact}
                    </p>
                    <button
                      onClick={handleNext}
                      className="mt-4 w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-2.5 px-4 rounded-xl shadow-md transition hover:scale-105 active:scale-95 text-sm"
                    >
                      {currentIdx === quizQuestions.length - 1 ? "Finish Quiz 🎉" : "Next Question →"}
                    </button>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", damping: 20 }}
                className="text-center py-6"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 shadow-md">
                  <Award size={32} className="text-amber-500 animate-bounce" />
                </div>

                <h4 className="text-3xl font-bold text-rose-950 leading-tight">
                  Quiz Completed!
                </h4>

                <p className="mt-2 text-rose-900/70 font-semibold text-lg">
                  You scored <span className="text-rose-600 font-extrabold text-2xl">{score}</span> out of {quizQuestions.length}!
                </p>

                {/* Friendly Certificate Card */}
                <div className="mt-8 border-2 border-dashed border-amber-300 bg-amber-50/50 p-6 rounded-3xl relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-100 px-4 py-0.5 rounded-full border border-amber-300 text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1 whitespace-nowrap">
                    <PartyPopper size={12} /> Certified bestie status
                  </div>
                  <h5 className="font-script text-4xl text-rose-600 mt-2 font-bold">
                    Official Friend of Sneha
                  </h5>
                  <p className="mt-3 text-sm text-rose-950 font-medium max-w-sm mx-auto">
                    {score === quizQuestions.length
                      ? "Flawless score! You know Sneha inside out. You two share the ultimate friendship bond! 🏆👑"
                      : score >= 2
                      ? "Great job! You know Sneha pretty well. Clearly, a wonderful friendship is in play here! 🌟🍰"
                      : "Not bad! Every day is a new opportunity to make more memories and get to know each other better! 💛🎈"}
                  </p>
                </div>

                <button
                  onClick={handleRestart}
                  className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-3 font-bold text-white shadow-xl shadow-rose-300/40 transition hover:scale-105 active:scale-95 text-base"
                >
                  <RotateCcw size={16} /> Play Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
