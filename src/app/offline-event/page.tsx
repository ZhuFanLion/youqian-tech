import { Metadata } from "next";
import { buildPageMeta } from "@/lib/seo";
import CTA from "@/components/CTA";

export const metadata: Metadata = buildPageMeta({
  path: "/offline-event",
  title: "线下活动引流",
  description:
    "为服装物业方策划执行线下品牌活动，打通线上线下流量闭环，实现精准引流。活动策划、现场执行、效果追踪一条龙服务。",
  keywords: ["线下活动", "服装活动策划", "批发市场引流", "品牌活动"],
});

export default function OfflineEventPage() {
  return (
    <>
      {/* 服务介绍 */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-emerald-500 font-medium text-sm tracking-wide">
                核心能力
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2 mb-6">
                专业活动策划与执行
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: "活动策划",
                    desc: "根据商户特点和目标客群，定制活动主题和执行方案。",
                  },
                  {
                    title: "现场执行",
                    desc: "专业团队全程把控，从搭建到撤展一条龙服务。",
                  },
                  {
                    title: "线上线下联动",
                    desc: "活动前线上预热、活动中实时直播、活动后二次传播。",
                  },
                  {
                    title: "效果追踪",
                    desc: "客流量、扫码量、成交额等数据全面追踪，量化活动效果。",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-1 bg-emerald-500 rounded-full shrink-0 mt-1" />
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
              <p className="text-muted text-sm">线下活动现场图（待上传）</p>
            </div>
          </div>
        </div>
      </section>

      <CTA
        title="想为您的市场策划一场引流活动？"
        description="联系我们，获取免费的活动方案策划"
        primaryLabel="免费策划"
        primaryHref="/contact"
      />
    </>
  );
}
