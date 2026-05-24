import { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "线下活动案例",
  description: "查看线下活动引流的真实案例，活动现场照片和引流数据展示。",
};

export default function OfflineEventCasesPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="案例展示"
            title="线下活动案例"
            description="真实活动回顾，数据说话"
          />
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "夏季服装节",
                brand: "某服装批发市场",
                metric: "单日客流5000+",
              },
              {
                title: "新品发布会",
                brand: "某女装品牌",
                metric: "到场客户300+",
              },
              {
                title: "档口开业活动",
                brand: "某服装档口",
                metric: "首日成交额翻3倍",
              },
              {
                title: "年货节促销",
                brand: "某批发市场",
                metric: "活动期间销售额增长200%",
              },
              {
                title: "直播带货嘉年华",
                brand: "某服装商场",
                metric: "线上观看10万+",
              },
              {
                title: "设计师品牌展",
                brand: "某设计师平台",
                metric: "合作商户满意度98%",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl overflow-hidden border border-border bg-white hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[16/9] bg-muted-light flex items-center justify-center">
                  <p className="text-muted text-sm">活动现场照片（待上传）</p>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-xs text-muted mt-1">{item.brand}</p>
                  <div className="mt-3 inline-flex bg-emerald-500/10 text-emerald-600 text-xs font-semibold px-3 py-1 rounded-full">
                    {item.metric}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="想为您的场地策划一场活动？"
        description="联系我们，获取免费的活动方案"
        primaryLabel="免费策划"
        primaryHref="/contact"
        secondaryLabel="了解服务详情"
        secondaryHref="/offline-event"
      />
    </>
  );
}
