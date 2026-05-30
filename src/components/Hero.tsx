"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  title: string;
  subtitle: string;
  description?: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  align?: "left" | "center";
}

export default function Hero({
  title,
  subtitle,
  description,
  primaryCTA = { label: "立即咨询", href: "/contact" },
  secondaryCTA = { label: "查看案例", href: "/ai-model/cases" },
  align = "center",
}: HeroProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background pt-20">
      {/* Subtle gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-muted-light/50 rounded-full blur-[120px]" />
      </div>

      <div className={`relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col ${alignClass}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.08] mb-5 tracking-tight"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl lg:text-[28px] text-muted font-medium mb-4 leading-snug"
          >
            {subtitle}
          </motion.p>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-muted text-base md:text-lg leading-relaxed mb-10 max-w-2xl"
            >
              {description}
            </motion.p>
          )}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`flex flex-col sm:flex-row gap-5 ${align === "center" ? "justify-center" : ""}`}
          >
            <Link
              href={primaryCTA.href}
              className="group inline-flex items-center justify-center gap-2 bg-accent text-white font-medium px-7 py-3 rounded-full hover:bg-accent-light transition-all duration-300 text-base"
            >
              {primaryCTA.label}
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href={secondaryCTA.href}
              className="group inline-flex items-center justify-center gap-1 text-accent hover:text-accent-light font-medium px-7 py-3 text-base transition-colors"
            >
              {secondaryCTA.label}
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
