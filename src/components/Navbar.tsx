"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/ai-model", label: "AI模特" },
  { href: "/social-ip", label: "社媒IP" },
  { href: "/offline-event", label: "线下活动" },
  { href: "/about", label: "关于我们" },
  { href: "/blog", label: "行业洞察" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Touch handlers for swipe-to-close
  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    currentY.current = e.touches[0].clientY;
    // Swipe down to close
    if (currentY.current - startY.current > 80) {
      setIsOpen(false);
    }
  };

  // Backdrop click to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Logo scrolled={scrolled} />

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors min-h-[44px] flex items-center ${
                  isActive(link.href)
                    ? scrolled
                      ? "text-primary dark:text-primary-light"
                      : "text-white"
                    : scrolled
                    ? "text-foreground/70 hover:text-primary dark:text-foreground/70 dark:hover:text-primary-light"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gold"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <Link
              href="/contact"
              className="bg-gold text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-gold-dark transition-all duration-200 hover:scale-105 active:scale-95 min-h-[44px] flex items-center"
            >
              立即咨询
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center ${
              scrolled ? "text-foreground dark:text-foreground" : "text-white"
            }`}
            aria-label={isOpen ? "关闭菜单" : "打开菜单"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu with backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-16 bg-black/40 md:hidden"
              onClick={handleBackdropClick}
              aria-hidden="true"
            />

            {/* Menu panel */}
            <motion.div
              ref={menuRef}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="md:hidden bg-white dark:bg-slate-900 border-t border-border dark:border-slate-700 shadow-xl"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
            >
              <div className="px-4 py-3 space-y-1 max-h-[70vh] overflow-y-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block text-sm font-medium py-3 px-4 rounded-lg transition-colors min-h-[44px] flex items-center ${
                      isActive(link.href)
                        ? "text-primary dark:text-primary-light bg-primary/5 dark:bg-primary-light/10"
                        : "text-foreground/70 dark:text-foreground/70 hover:text-primary dark:hover:text-primary-light hover:bg-muted-light dark:hover:bg-slate-800"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-2 pb-1">
                  <Link
                    href="/contact"
                    className="block text-center bg-gold text-white text-sm font-medium px-5 py-3.5 rounded-lg hover:bg-gold-dark transition-colors min-h-[44px] flex items-center justify-center"
                  >
                    立即咨询
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
