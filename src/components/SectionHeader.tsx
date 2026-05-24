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
      transition={{ duration: 0.5 }}
      className={`flex flex-col ${alignClass} mb-10 md:mb-14`}
    >
      {label && (
        <span className="text-gold font-medium text-sm tracking-wide mb-2">
          {label}
        </span>
      )}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
        {title}
      </h2>
      {description && (
        <p className="text-muted text-base md:text-lg max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
