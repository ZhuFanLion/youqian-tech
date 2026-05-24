"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface CaseShowcaseProps {
  title: string;
  beforeSrc: string;
  afterSrc: string;
  label?: string;
}

export default function CaseShowcase({
  title,
  beforeSrc,
  afterSrc,
  label = "Before / After",
}: CaseShowcaseProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
    >
      <div className="grid grid-cols-2 gap-0">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={beforeSrc}
            alt={`${title} - Before`}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
          <span className="absolute top-3 left-3 bg-black/60 text-white text-xs font-medium px-2 py-1 rounded">
            Before
          </span>
        </div>
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={afterSrc}
            alt={`${title} - After`}
            fill
            className="object-cover"
          />
          <span className="absolute top-3 right-3 bg-gold/90 text-white text-xs font-medium px-2 py-1 rounded">
            After
          </span>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <h4 className="text-white font-medium text-sm">{title}</h4>
      </div>
    </motion.div>
  );
}
