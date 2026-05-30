import type { Metadata } from "next";
import { buildPageMeta } from "@/lib/seo";
import ContactContent from "@/components/ContactContent";

export const metadata: Metadata = buildPageMeta({
  path: "/contact",
  title: "联系我们",
  description:
    "联系广州市有钱科技有限公司，获取AI模特、社媒IP、线下活动等服务的专属方案。在线咨询或电话联系我们。",
  keywords: ["联系有钱科技", "AI模特咨询", "服装行业服务", "广州AI公司"],
});

export default function ContactPage() {
  return <ContactContent />;
}
