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
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-primary-dark via-primary to-primary-light pt-20">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col ${alignClass}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            {title}
          </h1>
          <p className="text-gold-light text-xl md:text-2xl font-medium mb-4">
            {subtitle}
          </p>
          {description && (
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
              {description}
            </p>
          )}
          <div className={`flex flex-col sm:flex-row gap-4 ${align === "center" ? "justify-center" : ""}`}>
            <Link
              href={primaryCTA.href}
              className="inline-flex items-center justify-center gap-2 bg-gold text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-gold-dark transition-colors text-base"
            >
              {primaryCTA.label}
              <ArrowRight size={18} />
            </Link>
            <Link
              href={secondaryCTA.href}
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white/10 transition-colors text-base"
            >
              {secondaryCTA.label}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
