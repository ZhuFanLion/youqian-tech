"use client";

import { motion } from "framer-motion";
import { SectionHeaderProps } from "./types";

export default function SectionHeader({
  label,
  title,
  description,
  align = "center",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col ${alignClass} mb-10 md:mb-14`}
    >
      {label && (
        <motion.span
          initial={{ opacity: 0, x: align === "center" ? -10 : -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-flex items-center gap-2 text-gold font-medium text-sm tracking-wide mb-3"
        >
          <span className="w-6 h-px bg-gold/50" />
          {label}
          <span className="w-6 h-px bg-gold/50" />
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground dark:text-foreground tracking-tight"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted text-base md:text-lg max-w-2xl leading-relaxed mt-3"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
