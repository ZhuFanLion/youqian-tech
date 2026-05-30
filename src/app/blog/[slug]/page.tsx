import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buildPageMeta } from "@/lib/seo";

export const metadata: Metadata = buildPageMeta({
  path: "/blog",
  title: "文章详情",
  description: "阅读有钱科技行业洞察文章，了解AI技术、社媒运营、活动策划最新干货。",
  noIndex: true,
});

export default function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // In production, this would fetch from Strapi CMS
  return (
    <>
      <section className="pt-32 pb-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-muted hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            返回文章列表
          </Link>
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
            行业洞察
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mt-3 mb-4">
            文章标题（待从CMS加载）
          </h1>
          <p className="text-sm text-muted">2026-05-20</p>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="aspect-[16/9] bg-muted-light rounded-2xl flex items-center justify-center mb-8">
              <p className="text-muted text-sm">文章封面图（待从CMS加载）</p>
            </div>
            <p className="text-foreground/80 leading-relaxed">
              文章内容将从Strapi CMS动态加载。当前为占位页面。
            </p>
            <p className="text-foreground/80 leading-relaxed mt-4">
              安装Strapi CMS后，在此页面通过API获取文章详情数据并渲染。
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
