"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  coverSrc?: string;
  category?: string;
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

export default function BlogCard({
  title,
  excerpt,
  date,
  slug,
  coverSrc,
  category = "行业洞察",
  index = 0,
}: BlogCardProps) {
  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      <Link href={`/blog/${slug}`} className="block group">
        <div className="rounded-2xl overflow-hidden bg-white dark:bg-slate-800/50 shadow-sm border border-border dark:border-slate-700 hover:shadow-lg hover:border-primary/20 dark:hover:border-primary-light/30 transition-all duration-300 hover:scale-[1.01]">
          {coverSrc && (
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={coverSrc}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
          <div className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-medium text-primary dark:text-primary-light bg-primary/10 dark:bg-primary/15 px-2.5 py-0.5 rounded-md">
                {category}
              </span>
              <span className="text-xs text-muted">{date}</span>
            </div>
            <h3 className="font-semibold text-foreground dark:text-foreground group-hover:text-primary dark:group-hover:text-primary-light transition-colors mb-2 line-clamp-2">
              {title}
            </h3>
            <p className="text-sm text-muted line-clamp-2">{excerpt}</p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
