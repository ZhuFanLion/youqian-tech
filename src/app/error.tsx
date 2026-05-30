"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle size={28} className="text-red-500 dark:text-red-400" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-3">出了点问题</h1>
        <p className="text-muted mb-8">
          页面加载遇到了意外错误，请稍后重试。
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors"
          >
            重试
          </button>
          <a
            href="/"
            className="px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-muted-light dark:hover:bg-slate-800 transition-colors"
          >
            返回首页
          </a>
        </div>
      </div>
    </div>
  );
}
