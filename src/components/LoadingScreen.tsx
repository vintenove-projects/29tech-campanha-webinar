import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const { t } = useTranslation();
  const [counter, setCounter] = useState(0);
  const [showText, setShowText] = useState(false);
  const rafRef = useRef<number>();

  useEffect(() => {
    const duration = 2500;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setCounter(Math.round(progress * 29));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  useEffect(() => {
    if (counter === 29 && !showText) {
      const t = setTimeout(() => setShowText(true), 500);
      return () => clearTimeout(t);
    }
  }, [counter, showText]);

  useEffect(() => {
    if (showText) {
      const t = setTimeout(onComplete, 2000);
      return () => clearTimeout(t);
    }
  }, [showText, onComplete]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "hsl(var(--primary))" }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="relative">
          <motion.div
            className="text-7xl md:text-8xl lg:text-9xl font-bold font-sans text-primary-foreground tabular-nums relative z-10"
          >
            {counter.toString().padStart(2, "0")}
          </motion.div>

          {showText && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-0 px-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span
                className="font-sans font-light text-foreground whitespace-nowrap"
                style={{ fontSize: "clamp(20px, 5vw, 48px)" }}
              >
                {t("loading.text")}
              </span>
            </motion.div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary-foreground/20">
          <motion.div
            className="h-full origin-left bg-primary-foreground"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: counter / 29 }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
