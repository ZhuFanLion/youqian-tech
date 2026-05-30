"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface CarouselImage {
  src: string;
  alt: string;
}

const defaultImages: CarouselImage[] = [
  {
    src: "/carousel/01-fashion-studio.jpg",
    alt: "AI模特试衣展示 - 虚拟服装试穿效果",
  },
  {
    src: "/carousel/02-fashion-editorial.jpg",
    alt: "时尚服装展示 - AI生成的优质商品图",
  },
  {
    src: "/carousel/03-fashion-model.jpg",
    alt: "AI模特图 - 高品质服装摄影",
  },
  {
    src: "/carousel/04-fashion-retail.jpg",
    alt: "虚拟试衣间 - AI换装效果",
  },
  {
    src: "/carousel/05-fashion-clothing.jpg",
    alt: "服装电商展示 - AI模特实拍效果",
  },
];

interface ImageCarouselProps {
  images?: CarouselImage[];
  autoPlayInterval?: number;
}

export default function ImageCarousel({
  images = defaultImages,
  autoPlayInterval = 5000,
}: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      setCurrent((prev) => {
        const next = prev + newDirection;
        if (next < 0) return images.length - 1;
        if (next >= images.length) return 0;
        return next;
      });
    },
    [images.length]
  );

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => paginate(1), autoPlayInterval);
    return () => clearInterval(timer);
  }, [isPaused, autoPlayInterval, paginate]);

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) =>
    Math.abs(offset) * velocity;

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section
      className="relative w-full bg-background"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 7" }}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.35 },
              scale: { duration: 0.35 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <Image
              src={images[current].src}
              alt={images[current].alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            {/* Dark overlay for text readability if needed */}
            <div className="absolute inset-0 bg-black/10" />
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-foreground shadow-lg hover:bg-white transition-all duration-200 hover:scale-110 active:scale-95"
          aria-label="上一张"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => paginate(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-foreground shadow-lg hover:bg-white transition-all duration-200 hover:scale-110 active:scale-95"
          aria-label="下一张"
        >
          <ChevronRight size={20} />
        </button>

        {/* Dots indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${
                i === current
                  ? "bg-white w-6 md:w-8"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`跳转到第${i + 1}张`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
