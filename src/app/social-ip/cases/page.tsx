import { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "社媒IP案例",
  description: "查看社媒IP打造的真实运营案例，账号增长数据和效果展示。",
};

export default function SocialIpCasesPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="案例展示"
            title="社媒IP运营案例"
            description="真实账号增长数据，用事实说话"
          />
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "小红书女装账号",
                brand: "某女装批发商",
                metric: "3个月0→5万粉",
              },
              {
                title: "抖音男装账号",
                brand: "某男装品牌",
                metric: "月均播放量100万+",
              },
              {
                title: "小红书童装账号",
                brand: "某童装品牌",
                metric: "笔记平均互动率12%",
              },
              {
                title: "抖音女装直播引流",
                brand: "某女装批发市场",
                metric: "单场直播引流2000+",
              },
              {
                title: "小红书穿搭博主",
                brand: "某穿搭品牌",
                metric: "合作笔记CPA低于5元",
              },
              {
                title: "抖音档口号",
                brand: "某服装档口",
                metric: "月均获客300+",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl overflow-hidden border border-border bg-white hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[16/9] bg-muted-light flex items-center justify-center">
                  <p className="text-muted text-sm">运营数据截图（待上传）</p>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-xs text-muted mt-1">{item.brand}</p>
                  <div className="mt-3 inline-flex bg-gold/10 text-gold text-xs font-semibold px-3 py-1 rounded-full">
                    {item.metric}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="想看到属于您的增长数据？"
        description="联系我们，获取免费的社媒账号诊断"
        primaryLabel="免费诊断"
        primaryHref="/contact"
        secondaryLabel="了解服务详情"
        secondaryHref="/social-ip"
      />
    </>
  );
}
