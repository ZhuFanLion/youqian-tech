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
      ease: [0.16, 1, 0.3, 1],
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
      className="bg-white rounded-2xl p-6 md:p-8 border border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300 hover:scale-[1.01] relative group"
    >
      {/* Quote icon decoration */}
      <Quote
        size={32}
        className="absolute top-4 right-4 text-gold/10 group-hover:text-gold/20 transition-colors"
      />

      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} size={14} className="fill-gold text-gold" />
        ))}
      </div>

      {/* Content */}
      <p className="text-foreground/70 text-sm leading-relaxed mb-6">
        &ldquo;{content}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/10 to-gold/10 flex items-center justify-center text-primary font-semibold text-sm border border-primary/10">
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
