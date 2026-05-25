"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Theme = "light" | "dark" | "system";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else if (theme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.removeAttribute("data-theme");
    }
  }, [theme, mounted]);

  const cycle = () => {
    const next: Theme = theme === "system" ? "dark" : theme === "dark" ? "light" : "system";
    setTheme(next);
    localStorage.setItem("theme", next);
  };

  if (!mounted) {
    return (
      <div className="fixed bottom-6 right-6 z-50 w-10 h-10" />
    );
  }

  return (
    <motion.button
      onClick={cycle}
      className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-border dark:border-slate-700 flex items-center justify-center text-foreground hover:scale-110 active:scale-95 transition-transform duration-200"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`Current theme: ${theme}. Click to change.`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
    >
      <AnimatePresence mode="wait">
        {theme === "dark" ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon size={18} />
          </motion.div>
        ) : theme === "light" ? (
          <motion.div
            key="sun"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun size={18} />
          </motion.div>
        ) : (
          <motion.div
            key="system"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            className="text-xs font-bold"
          >
            A
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
