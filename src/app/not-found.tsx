import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-8xl font-bold text-primary/20 font-display">404</p>
        <h1 className="text-2xl font-bold text-foreground mt-4 mb-3">
          页面不存在
        </h1>
        <p className="text-muted mb-8">
          您访问的页面不存在或已被移除，请检查URL是否正确。
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors"
        >
          <Home size={18} />
          返回首页
        </Link>
      </div>
    </div>
  );
}
