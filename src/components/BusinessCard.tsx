"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface BusinessCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  index?: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.12,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export default function BusinessCard({
  icon,
  title,
  description,
  href,
  index = 0,
}: BusinessCardProps) {
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
        className="block p-6 md:p-8 rounded-2xl border border-border bg-white transition-all duration-300 group hover:shadow-lg hover:border-border/80 hover:scale-[1.01] active:scale-[0.99]"
      >
        <motion.div
          className="w-12 h-12 rounded-xl bg-muted-light flex items-center justify-center mb-5 text-foreground"
          whileHover={{ rotate: 5, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {icon}
        </motion.div>
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-muted text-sm leading-relaxed mb-4">{description}</p>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2 transition-all duration-300">
          了解更多
          <ArrowRight size={16} />
        </span>
      </Link>
    </motion.div>
  );
}
