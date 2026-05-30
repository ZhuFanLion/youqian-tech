import { Metadata } from "next";
import { buildPageMeta } from "@/lib/seo";
import SectionHeader from "@/components/SectionHeader";
import CTA from "@/components/CTA";

export const metadata: Metadata = buildPageMeta({
  path: "/ai-model/cases",
  title: "AI模特案例",
  description: "查看AI模特图片与视频的真实案例效果，Before/After对比展示。",
});

export default function AiModelCasesPage() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="案例展示"
            title="AI模特案例"
            description="真实案例效果对比，亲眼见证AI的力量"
          />
        </div>
      </section>

      {/* Cases Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "女装连衣裙系列", brand: "广州某女装批发" },
              { title: "男装T恤系列", brand: "某男装品牌" },
              { title: "童装套装系列", brand: "某童装品牌" },
              { title: "运动装系列", brand: "某运动品牌" },
              { title: "羽绒服系列", brand: "某羽绒品牌" },
              { title: "休闲裤系列", brand: "某休闲品牌" },
            ].map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl overflow-hidden border border-border bg-white hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[3/4] bg-muted-light flex items-center justify-center">
                  <p className="text-muted text-sm">Before / After 对比图（待上传）</p>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted mt-1">{item.brand}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="想看到属于您的案例？"
        description="联系我们，免费生成样品图"
        primaryLabel="获取免费样品"
        primaryHref="/contact"
        secondaryLabel="了解服务详情"
        secondaryHref="/ai-model"
      />
    </>
  );
}
