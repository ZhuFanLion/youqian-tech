import { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "联系我们",
  description: "联系广州市有钱科技有限公司，获取AI模特、社媒IP、线下活动等服务的专属方案。",
};

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="联系我们"
            title="准备好开始了吗？"
            description="联系我们，获取专属的行业解决方案"
          />
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* 联系信息 */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-6">联系方式</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">电话咨询</p>
                    <p className="text-sm text-muted mt-1">（请添加您的联系电话）</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">邮箱</p>
                    <p className="text-sm text-muted mt-1">（请添加您的邮箱）</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">公司地址</p>
                    <p className="text-sm text-muted mt-1">广州市（请添加详细地址）</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">工作时间</p>
                    <p className="text-sm text-muted mt-1">周一至周五 9:00 - 18:00</p>
                  </div>
                </div>
              </div>

              {/* 微信二维码占位 */}
              <div className="mt-8 p-6 bg-muted-light rounded-2xl text-center">
                <p className="text-sm text-muted mb-3">扫码添加企业微信</p>
                <div className="w-40 h-40 bg-border rounded-lg mx-auto flex items-center justify-center">
                  <p className="text-xs text-muted">微信二维码（待上传）</p>
                </div>
              </div>
            </div>

            {/* 咨询表单 */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-6">在线咨询</h2>
              <form className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    您的姓名 *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="请输入您的姓名"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    联系电话 *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="请输入您的联系电话"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    公司名称
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="请输入您的公司名称"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    感兴趣的服务
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors">
                    <option value="">请选择</option>
                    <option value="ai-model">AI模特图片与视频</option>
                    <option value="social-ip">社媒IP打造</option>
                    <option value="offline-event">线下活动引流</option>
                    <option value="all">全部服务</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    需求描述
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                    placeholder="请简要描述您的需求"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white font-semibold py-3.5 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  提交咨询
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
