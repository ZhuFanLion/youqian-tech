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
  index?: number;
}

const colorMap = {
  gold: {
    border: "border-gold/20 hover:border-gold/50",
    iconBg: "bg-gold/10",
    arrow: "text-gold",
    glow: "group-hover:shadow-[0_0_30px_rgba(186,117,23,0.1)]",
  },
  primary: {
    border: "border-primary/20 hover:border-primary/50",
    iconBg: "bg-primary/10",
    arrow: "text-primary",
    glow: "group-hover:shadow-[0_0_30px_rgba(24,95,165,0.1)]",
  },
  accent: {
    border: "border-emerald-500/20 hover:border-emerald-500/50",
    iconBg: "bg-emerald-500/10",
    arrow: "text-emerald-500",
    glow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]",
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.12,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function BusinessCard({
  icon,
  title,
  description,
  href,
  color,
  index = 0,
}: BusinessCardProps) {
  const colors = colorMap[color];

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={cardVariants}
    >
      <Link
        href={href}
        className={`block p-6 md:p-8 rounded-2xl border ${colors.border} bg-white transition-all duration-300 group hover:scale-[1.02] active:scale-[0.98] ${colors.glow}`}
      >
        <motion.div
          className={`w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center mb-5`}
          whileHover={{ rotate: 5, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {icon}
        </motion.div>
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted text-sm leading-relaxed mb-4">{description}</p>
        <span
          className={`inline-flex items-center gap-1 text-sm font-medium ${colors.arrow} group-hover:gap-2.5 transition-all duration-300`}
        >
          了解更多
          <ArrowRight size={16} />
        </span>
      </Link>
    </motion.div>
  );
}
