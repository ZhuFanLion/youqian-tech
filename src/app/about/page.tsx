import { Metadata } from "next";
import { buildPageMeta } from "@/lib/seo";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = buildPageMeta({
  path: "/about",
  title: "关于我们",
  description:
    "广州市有钱科技有限公司，专注为服装行业提供AI视觉生成、社媒IP运营、线下活动引流等一站式数字营销解决方案。",
  keywords: ["关于有钱科技", "公司介绍", "服装行业数字化", "AI营销公司"],
});

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="关于我们"
            title="广州市有钱科技有限公司"
            description="AI + 内容 + 流量，三引擎驱动服装行业增长"
          />
        </div>
      </section>

      {/* 公司简介 */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                我们是谁
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                广州市有钱科技有限公司是一家专注于服装行业数字化营销的服务公司。
                我们利用前沿的AI技术、专业的内容运营能力和丰富的线下活动经验，
                为服装批发商、品牌方和物业方提供一站式数字营销解决方案。
              </p>
              <p className="text-foreground/80 leading-relaxed">
                我们的核心团队拥有深厚的服装行业经验和互联网技术背景，
                深刻理解服装行业在视觉呈现、品牌传播和获客引流方面的痛点，
                并通过技术和服务创新，帮助客户实现降本增效和业务增长。
              </p>
            </div>
            <div className="aspect-[4/3] bg-muted-light rounded-2xl flex items-center justify-center">
              <p className="text-muted text-sm">公司照片（待上传）</p>
            </div>
          </div>
        </div>
      </section>

      {/* 使命愿景 */}
      <section className="py-16 md:py-24 bg-muted-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
              <div className="w-16 h-16 rounded-full bg-muted-light flex items-center justify-center mx-auto mb-4">
                <span className="text-foreground text-2xl font-bold">愿</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">愿景</h3>
              <p className="text-sm text-muted leading-relaxed">
                成为服装行业最信赖的数字化营销伙伴
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-2xl font-bold">使</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">使命</h3>
              <p className="text-sm text-muted leading-relaxed">
                用AI和创新服务，让每一位服装人都能更高效地获客和增长
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-emerald-500 text-2xl font-bold">值</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">价值观</h3>
              <p className="text-sm text-muted leading-relaxed">
                务实创新，客户第一，效果说话
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
