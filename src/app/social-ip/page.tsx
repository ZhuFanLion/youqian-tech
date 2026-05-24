import { Metadata } from "next";
import Hero from "@/components/Hero";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "社媒IP打造",
  description:
    "专业运营小红书、抖音等平台，打造高影响力IP账号，精准触达服装行业目标客户群。",
};

export default function SocialIpPage() {
  return (
    <>
      <Hero
        title="社媒IP打造"
        subtitle="让您的品牌被更多人看见"
        description="专业运营小红书、抖音等主流平台，通过内容策划、账号运营、数据优化，打造高影响力IP账号。"
        primaryCTA={{ label: "获取方案", href: "/contact" }}
        secondaryCTA={{ label: "查看案例", href: "/social-ip/cases" }}
      />

      {/* 服务介绍 */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-medium text-sm tracking-wide">
                核心能力
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2 mb-6">
                全方位社媒运营方案
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: "小红书运营",
                    desc: "账号定位、内容策划、笔记发布、数据复盘，全流程托管。",
                  },
                  {
                    title: "抖音运营",
                    desc: "短视频脚本策划、拍摄指导、剪辑优化、投放策略。",
                  },
                  {
                    title: "内容策划",
                    desc: "根据品牌调性定制内容日历，保持账号活跃度和专业性。",
                  },
                  {
                    title: "数据驱动",
                    desc: "基于平台数据分析，持续优化内容和投放策略，提升ROI。",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-1 bg-primary rounded-full shrink-0 mt-1" />
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
            <div className="aspect-[4/3] bg-muted-light rounded-2xl flex items-center justify-center">
              <p className="text-muted text-sm">社媒运营效果展示图（待上传）</p>
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
              { step: "01", title: "账号诊断", desc: "分析现有账号状态和竞品情况" },
              { step: "02", title: "策略制定", desc: "定制账号定位和内容策略" },
              { step: "03", title: "内容执行", desc: "持续产出高质量内容并发布" },
              { step: "04", title: "数据复盘", desc: "定期复盘数据，优化策略" },
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
        title="想让您的品牌成为下一个爆款？"
        description="联系我们，获取免费的社媒账号诊断报告"
        primaryLabel="免费诊断"
        primaryHref="/contact"
      />
    </>
  );
}
