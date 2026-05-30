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
    <section className="relative py-20 md:py-28 bg-muted-light overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
          {title}
        </h2>
        <p className="text-muted text-base md:text-lg mb-10 max-w-xl mx-auto">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={primaryHref}
            className="group inline-flex items-center gap-2 bg-accent text-white font-medium px-8 py-3 rounded-full hover:bg-accent-light transition-all duration-300"
          >
            {primaryLabel}
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          {secondaryLabel && (
            <Link
              href={secondaryHref}
              className="group inline-flex items-center gap-1 text-accent hover:text-accent-light font-medium px-6 py-3 transition-colors"
            >
              {secondaryLabel}
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )}
        </div>
      </motion.div>
    </section>
  );
}
