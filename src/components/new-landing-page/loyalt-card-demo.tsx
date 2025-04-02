"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check } from "lucide-react";
import confetti from "canvas-confetti";

export function LoyaltyCardDemo() {
  const [stamps, setStamps] = useState(7);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const totalStamps = 10;

  const handleAddStamp = () => {
    if (stamps < totalStamps && !isAnimating) {
      setIsAnimating(true);
      setStamps((prev) => Math.min(prev + 1, totalStamps));

      if (stamps + 1 === totalStamps) {
        setTimeout(() => {
          setShowReward(true);
        }, 1000);
      }
    }
  };

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Confetti em posições aleatórias
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const handleResetCard = () => {
    triggerConfetti();
    setShowReward(false);
    setStamps(0);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [isAnimating]);

  return (
    <div className="relative mx-auto max-w-md overflow-hidden rounded-xl bg-white p-6 shadow-2xl">
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-red-100"></div>
      <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-red-50"></div>

      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">Cartão de Fidelidade</h3>
          <div className="text-sm font-medium text-gray-500">
            {stamps}/{totalStamps} carimbos
          </div>
        </div>

        <AnimatePresence>
          {showReward ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center justify-center rounded-lg bg-red-50 p-8 text-center"
            >
              <div className="mb-4 rounded-full bg-red-100 p-3">
                <svg
                  className="h-12 w-12 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h4 className="mb-2 text-2xl font-bold text-gray-900">Parabéns!</h4>
              <p className="mb-6 text-gray-600">
                Você completou seu cartão de fidelidade e ganhou uma recompensa!
              </p>
              <Button onClick={handleResetCard} className="bg-red-600 hover:bg-red-700">
                Resgatar recompensa
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-5 gap-4">
              {Array.from({ length: totalStamps }).map((_, index) => (
                <motion.div
                  key={index}
                  className={`flex h-16 w-16 items-center justify-center rounded-full border-2 ${
                    index < stamps ? "border-red-600 bg-red-50" : "border-gray-200 bg-gray-50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={
                    isAnimating && index === stamps - 1
                      ? {
                          scale: [1, 1.2, 1],
                          borderColor: ["#e5e7eb", "#dc2626", "#dc2626"],
                          backgroundColor: ["#f9fafb", "#fef2f2", "#fef2f2"],
                        }
                      : {}
                  }
                  transition={{ duration: 0.5 }}
                >
                  {index < stamps ? (
                    <Check className="h-6 w-6 text-red-600" />
                  ) : (
                    <span className="text-lg font-medium text-gray-400">{index + 1}</span>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {!showReward && (
          <div className="mt-6 flex justify-center">
            <Button
              onClick={handleAddStamp}
              className="bg-red-600 hover:bg-red-700 cursor-pointer"
              disabled={isAnimating || stamps >= totalStamps}
            >
              Adicionar carimbo
            </Button>
          </div>
        )}
        {/* {!showReward && (
          <div className="absolute md:bottom-2 bottom-1 md:right-6 right-4 flex items-center">
            <ArrowLeft className="h-6 w-6 text-red-600" />
            <span className="ml-2">Clique</span>
          </div>
        )} */}
      </div>
    </div>
  );
}
