"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface TestimonialProps {
  name: string;
  company: string;
  content: string;
  avatar?: string;
  rating?: number;
  index?: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export default function Testimonial({
  name,
  company,
  content,
  rating = 5,
  index = 0,
}: TestimonialProps) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className="bg-white rounded-2xl p-6 md:p-8 border border-border hover:border-border/80 hover:shadow-lg transition-all duration-300 hover:scale-[1.01] relative group"
    >
      <Quote
        size={32}
        className="absolute top-4 right-4 text-muted/15 group-hover:text-muted/25 transition-colors"
      />

      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} size={14} className="fill-foreground/80 text-foreground/80" />
        ))}
      </div>

      <p className="text-muted text-sm leading-relaxed mb-6">
        &ldquo;{content}&rdquo;
      </p>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-muted-light flex items-center justify-center text-foreground font-semibold text-sm border border-border">
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{name}</p>
          <p className="text-xs text-muted">{company}</p>
        </div>
      </div>
    </motion.div>
  );
}
