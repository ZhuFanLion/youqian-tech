import { Metadata } from "next";
import { buildPageMeta } from "@/lib/seo";
import CTA from "@/components/CTA";

export const metadata: Metadata = buildPageMeta({
  path: "/ai-model",
  title: "AI模特图片与视频",
  description:
    "利用AI技术为服装行业生成高质量模特图片和视频，大幅降低拍摄成本，提升商品展示效果。支持AI换模特、虚拟试穿、商品视频。",
  keywords: ["AI模特", "AI换装", "虚拟试衣", "AI商品图", "服装摄影"],
});

export default function AiModelPage() {
  return (
    <>
      {/* 服务介绍 */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-muted font-medium text-sm tracking-wide">
                核心能力
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2 mb-6">
                AI驱动的商品视觉方案
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: "AI换模特",
                    desc: "保留服装细节，替换模特面孔，一套衣服适配多种风格。",
                  },
                  {
                    title: "虚拟试穿",
                    desc: "上传服装平铺图，AI自动生成真人穿着效果。",
                  },
                  {
                    title: "商品视频",
                    desc: "AI生成动态展示视频，适用于详情页和社媒传播。",
                  },
                  {
                    title: "批量生产",
                    desc: "支持批量处理，一次上传数百张图，快速生成。",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-1 bg-foreground rounded-full shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* 占位图区域 - 后续替换为实际图片 */}
            <div className="aspect-[4/3] bg-muted-light rounded-2xl flex items-center justify-center">
              <p className="text-muted text-sm">AI模特效果展示图（待上传）</p>
            </div>
          </div>
        </div>
      </section>

      {/* 服务流程 */}
      <section className="py-16 md:py-24 bg-muted-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
            合作流程
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "需求沟通", desc: "了解您的品牌调性和目标客户" },
              { step: "02", title: "素材提供", desc: "您提供服装平铺图或模特原图" },
              { step: "03", title: "AI生成", desc: "我们的AI团队生成高质量图片/视频" },
              { step: "04", title: "交付验收", desc: "您确认效果后交付高清成品" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="想看看AI模特的效果？"
        description="联系我们获取免费样品图，亲眼见证AI的力量"
        primaryLabel="获取免费样品"
        primaryHref="/contact"
      />
    </>
  );
}
