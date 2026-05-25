"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
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

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors ${
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
              className="bg-gold text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-gold-dark transition-all duration-200 hover:scale-105 active:scale-95"
            >
              立即咨询
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 ${scrolled ? "text-foreground dark:text-foreground" : "text-white"}`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-t border-border dark:border-slate-700 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block text-sm font-medium py-2.5 px-3 rounded-lg transition-colors ${
                    isActive(link.href)
                      ? "text-primary dark:text-primary-light bg-primary/5 dark:bg-primary-light/10"
                      : "text-foreground/70 dark:text-foreground/70 hover:text-primary dark:hover:text-primary-light hover:bg-muted-light dark:hover:bg-slate-800"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="block text-center bg-gold text-white text-sm font-medium px-5 py-3 rounded-lg hover:bg-gold-dark transition-colors mt-3"
              >
                立即咨询
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
