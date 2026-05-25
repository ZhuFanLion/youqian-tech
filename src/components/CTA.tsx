"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface CTAProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTA({
  title = "准备好让生意更有钱了吗？",
  description = "联系我们，获取专属的行业解决方案",
  primaryLabel = "立即咨询",
  primaryHref = "/contact",
  secondaryLabel = "查看案例",
  secondaryHref = "/ai-model/cases",
}: CTAProps) {
  return (
    <section className="relative py-20 md:py-28 bg-[#0a1628] overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px]" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gold/10 rounded-full blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">
          {title}
        </h2>
        <p className="text-white/50 text-base md:text-lg mb-10 max-w-2xl mx-auto">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={primaryHref}
            className="group inline-flex items-center gap-2 bg-gold text-white font-semibold px-8 py-4 rounded-xl hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,148,46,0.3)] hover:scale-[1.02] active:scale-[0.98]"
          >
            {primaryLabel}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          {secondaryLabel && (
            <Link
              href={secondaryHref}
              className="group inline-flex items-center gap-2 border border-white/20 text-white/90 font-semibold px-8 py-4 rounded-xl hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm"
            >
              {secondaryLabel}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </motion.div>
    </section>
  );
}
