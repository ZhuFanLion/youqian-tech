"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface TestimonialProps {
  name: string;
  company: string;
  content: string;
  avatar?: string;
  rating?: number;
}

export default function Testimonial({
  name,
  company,
  content,
  rating = 5,
}: TestimonialProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-border"
    >
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} size={16} className="fill-gold text-gold" />
        ))}
      </div>
      {/* Content */}
      <p className="text-foreground/80 text-sm leading-relaxed mb-6">
        &ldquo;{content}&rdquo;
      </p>
      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
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
