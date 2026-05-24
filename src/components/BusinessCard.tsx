"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface BusinessCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  color: "gold" | "primary" | "accent";
}

const colorMap = {
  gold: {
    border: "border-gold/20 hover:border-gold/50",
    iconBg: "bg-gold/10",
    arrow: "text-gold",
  },
  primary: {
    border: "border-primary/20 hover:border-primary/50",
    iconBg: "bg-primary/10",
    arrow: "text-primary",
  },
  accent: {
    border: "border-emerald-500/20 hover:border-emerald-500/50",
    iconBg: "bg-emerald-500/10",
    arrow: "text-emerald-500",
  },
};

export default function BusinessCard({
  icon,
  title,
  description,
  href,
  color,
}: BusinessCardProps) {
  const colors = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <Link
        href={href}
        className={`block p-6 md:p-8 rounded-2xl border ${colors.border} bg-white transition-all duration-300 hover:shadow-lg group`}
      >
        <div
          className={`w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center mb-5`}
        >
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted text-sm leading-relaxed mb-4">{description}</p>
        <span
          className={`inline-flex items-center gap-1 text-sm font-medium ${colors.arrow} group-hover:gap-2 transition-all`}
        >
          了解更多
          <ArrowRight size={16} />
        </span>
      </Link>
    </motion.div>
  );
}
