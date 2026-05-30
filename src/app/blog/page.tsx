import { Metadata } from "next";
import { buildPageMeta } from "@/lib/seo";
import BlogCard from "@/components/BlogCard";

export const metadata: Metadata = buildPageMeta({
  path: "/blog",
  title: "行业洞察",
  description:
    "AI技术、社媒运营、活动策划的行业前沿分享和干货文章。服装行业数字化营销深度解读。",
  keywords: ["AI服装", "社媒运营", "小红书干货", "服装行业分析"],
});

const blogPosts = [
  {
    title: "AI模特正在改变服装行业：2026趋势报告",
    excerpt: "从AI换脸到虚拟试穿，AI技术如何重塑服装行业的视觉呈现方式。深入分析2026年AI模特技术发展趋势和市场机会。",
    date: "2026-05-20",
    slug: "ai-model-trend-2026",
    category: "AI技术",
  },
  {
    title: "小红书服装账号从0到10万粉的运营方法论",
    excerpt: "拆解3个成功案例，总结出可复制的服装类目小红书增长策略。包括选题技巧、发布时间、互动策略等实操经验。",
    date: "2026-05-15",
    slug: "xiaohongshu-growth-method",
    category: "社媒运营",
  },
  {
    title: "服装批发市场线下活动引流实战复盘",
    excerpt: "一场活动带来500+精准客户，我们是如何做到的？从策划到执行的完整复盘，包含可复用的模板和工具。",
    date: "2026-05-10",
    slug: "offline-event-case-study",
    category: "活动策划",
  },
  {
    title: "服装电商视觉升级：AI生成商品图的5个关键技巧",
    excerpt: "AI生成商品图的质量取决于提示词、角度、光线等多个因素。本文分享5个提升AI出图质量的核心技巧。",
    date: "2026-05-05",
    slug: "ai-product-photo-tips",
    category: "AI技术",
  },
  {
    title: "抖音服装直播带货：从0到月销百万的完整路径",
    excerpt: "详细拆解一个服装账号如何在3个月内实现从0到月销百万，包含直播话术、选品策略和投放技巧。",
    date: "2026-04-28",
    slug: "douyin-live-commerce",
    category: "社媒运营",
  },
  {
    title: "如何用AI为服装档口打造独一无二的视觉风格",
    excerpt: "每个档口都应该有自己的视觉风格。本文介绍如何利用AI工具建立统一的品牌视觉体系。",
    date: "2026-04-20",
    slug: "ai-brand-visual-style",
    category: "AI技术",
  },
];

export default function BlogPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-muted font-medium text-sm tracking-wide">
              行业洞察
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-3">
              最新干货
            </h1>
            <p className="text-muted text-base md:text-lg max-w-2xl mx-auto">
              AI技术、社媒运营、活动策划的行业前沿分享
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
