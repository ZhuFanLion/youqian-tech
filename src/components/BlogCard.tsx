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
}

export default function BlogCard({
  title,
  excerpt,
  date,
  slug,
  coverSrc,
  category = "行业洞察",
}: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/blog/${slug}`} className="block group">
        <div className="rounded-2xl overflow-hidden bg-white shadow-sm border border-border hover:shadow-md transition-shadow">
          {coverSrc && (
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={coverSrc}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <div className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                {category}
              </span>
              <span className="text-xs text-muted">{date}</span>
            </div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
              {title}
            </h3>
            <p className="text-sm text-muted line-clamp-2">{excerpt}</p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
