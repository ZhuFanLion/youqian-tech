"use client";

import Link from "next/link";

interface LogoProps {
  variant?: "full" | "icon" | "wordmark";
  className?: string;
  scrolled?: boolean;
}

function LogoIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer hexagonal frame - AI/tech feel */}
      <path
        d="M20 2L36.5 12V28L20 38L3.5 28V12L20 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Inner hanger shape - fashion/apparel */}
      <path
        d="M14 16C14 13.8 16.7 12 20 12C23.3 12 26 13.8 26 16V16.5L30 14.5L28 20L20 24L12 20L10 14.5L14 16.5V16Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Central dot - AI core */}
      <circle cx="20" cy="19" r="2" fill="currentColor" />
    </svg>
  );
}

export default function Logo({
  variant = "full",
  className = "",
  scrolled = false,
}: LogoProps) {
  const textColor = scrolled ? "text-foreground" : "";
  const iconColor = scrolled
    ? "text-gold"
    : "text-gold-light";

  if (variant === "icon") {
    return (
      <div className={className}>
        <LogoIcon className={`w-9 h-9 ${iconColor}`} />
      </div>
    );
  }

  return (
    <Link href="/" className={`flex items-center gap-2.5 shrink-0 ${className}`}>
      <LogoIcon className={`w-9 h-9 ${iconColor}`} />
      <div className="flex flex-col leading-none">
        <span className={`font-bold text-lg tracking-tight ${scrolled ? "text-foreground" : "text-white"}`}>
          有钱科技
        </span>
        <span className={`text-[10px] tracking-widest uppercase font-medium ${scrolled ? "text-muted" : "text-white/50"}`}>
          YouQian Tech
        </span>
      </div>
    </Link>
  );
}
