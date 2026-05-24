"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface StatItemProps {
  value: number;
  suffix?: string;
  label: string;
}

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = value / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

interface StatsProps {
  items: StatItemProps[];
}

export default function Stats({ items }: StatsProps) {
  return (
    <section className="py-16 md:py-24 bg-muted-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
        >
          {items.map((item, index) => (
            <div key={index} className="text-center">
              <AnimatedNumber value={item.value} suffix={item.suffix} />
              <p className="text-muted text-sm mt-2">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
