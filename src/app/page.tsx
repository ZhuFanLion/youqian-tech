import Hero from "@/components/Hero";
import BusinessCard from "@/components/BusinessCard";
import Stats from "@/components/Stats";
import Testimonial from "@/components/Testimonial";
import BlogCard from "@/components/BlogCard";
import CTA from "@/components/CTA";
import SectionHeader from "@/components/SectionHeader";
import { Camera, Smartphone, Megaphone } from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Hero
        title="让服装生意更有钱"
        subtitle="AI + 内容 + 流量，三引擎驱动增长"
        description="广州市有钱科技有限公司，为服装批发商和品牌方提供AI模特图片视频、社媒IP打造、线下活动引流等一站式数字营销解决方案。"
        primaryCTA={{ label: "获取方案", href: "/contact" }}
        secondaryCTA={{ label: "了解服务", href: "/ai-model" }}
      />

      {/* 三大业务 — primary section: larger padding */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="我们的服务"
            title="三大核心业务"
            description="从视觉到内容到流量，全链路赋能服装行业"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <BusinessCard
              icon={<Camera size={24} className="text-gold" />}
              title="AI模特图片与视频"
              description="利用AI技术生成高质量模特图片和视频，大幅降低拍摄成本，提升商品展示效果。"
              href="/ai-model"
              color="gold"
              index={0}
            />
            <BusinessCard
              icon={<Smartphone size={24} className="text-primary" />}
              title="社媒IP打造"
              description="专业运营小红书、抖音等平台，打造高影响力IP账号，精准触达目标客户群。"
              href="/social-ip"
              color="primary"
              index={1}
            />
            <BusinessCard
              icon={<Megaphone size={24} className="text-accent" />}
              title="线下活动引流"
              description="策划执行线下品牌活动，打通线上线下流量闭环，助力服装物业方实现精准引流。"
              href="/offline-event"
              color="accent"
              index={2}
            />
          </div>
        </div>
      </section>

      {/* 数据亮点 — compact section */}
      <Stats
        items={[
          { value: 200, suffix: "+", label: "服务客户" },
          { value: 50000, suffix: "+", label: "产出作品" },
          { value: 10000000, suffix: "+", label: "社媒总曝光" },
          { value: 50, suffix: "+", label: "活动场次" },
        ]}
      />

      {/* 客户评价 — secondary section: moderate padding */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="客户评价"
            title="合作伙伴的真实反馈"
            description="效果和数据不会说谎"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Testimonial
              name="汇泰服装"
              company="广州十三行 · 女装批发"
              content="以前每季拍新品图要花2-3万，现在用AI模特一周就搞定，成本降了80%以上。最重要的是出图速度提了10倍，上新再也不用等拍摄档期了。"
              rating={5}
              index={0}
            />
            <Testimonial
              name="MUSE STUDIO"
              company="独立女装品牌"
              content="社媒运营从0开始，3个月小红书账号做到5万+精准粉，客单价提升了40%。团队对服装行业的理解比一般MCN深很多，不只是做号，是在做品牌。"
              rating={5}
              index={1}
            />
            <Testimonial
              name="时代商务中心"
              company="服装批发市场运营方"
              content="一场换季招商活动带来500+精准商户到场，签约率比去年翻了一倍。活动策划很系统，从预热到执行到后续跟进都有完整方案。"
              rating={5}
              index={2}
            />
          </div>
        </div>
      </section>

      {/* 博客 — secondary section with background */}
      <section className="py-16 md:py-24 bg-muted-light dark:bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="行业洞察"
            title="最新干货"
            description="AI技术、社媒运营、活动策划的行业前沿分享"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BlogCard
              title="AI模特正在改变服装行业：2026趋势报告"
              excerpt="从AI换脸到虚拟试穿，AI技术如何重塑服装行业的视觉呈现方式。"
              date="2026-05-20"
              slug="ai-model-trend-2026"
              category="AI技术"
              index={0}
            />
            <BlogCard
              title="小红书服装账号从0到10万粉的运营方法论"
              excerpt="拆解3个成功案例，总结出可复制的服装类目小红书增长策略。"
              date="2026-05-15"
              slug="xiaohongshu-growth-method"
              category="社媒运营"
              index={1}
            />
            <BlogCard
              title="服装批发市场线下活动引流实战复盘"
              excerpt="一场活动带来500+精准客户，我们是如何做到的？全流程复盘。"
              date="2026-05-10"
              slug="offline-event-case-study"
              category="活动策划"
              index={2}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA />
    </>
  );
}
