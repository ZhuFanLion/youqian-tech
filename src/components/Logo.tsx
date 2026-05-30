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
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer circle */}
      <circle
        cx="50"
        cy="50"
        r="42"
        stroke="currentColor"
        strokeWidth="4.5"
        fill="none"
      />
      {/* Dollar symbol */}
      <text
        x="50"
        y="54"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        fontSize="50"
        fontWeight="700"
        fill="currentColor"
      >
        $
      </text>
    </svg>
  );
}

export default function Logo({
  variant = "full",
  className = "",
  scrolled = false,
}: LogoProps) {
  const textColor = scrolled ? "text-foreground" : "text-foreground";

  if (variant === "icon") {
    return (
      <div className={className}>
        <LogoIcon className={`w-9 h-9 ${textColor}`} />
      </div>
    );
  }

  return (
    <Link href="/" className={`flex items-center gap-2.5 shrink-0 ${className}`}>
      <LogoIcon className={`w-9 h-9 ${textColor}`} />
      <div className="flex flex-col leading-none">
        <span className={`font-bold text-lg tracking-tight ${textColor}`}>
          COIN AI
        </span>
        <span className={`logo-subtitle text-[10px] tracking-widest uppercase font-medium text-muted`}>
          有钱科技
        </span>
      </div>
    </Link>
  );
}
