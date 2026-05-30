import Link from "next/link";
import Logo from "./Logo";

const footerLinks = {
  services: [
    { href: "/ai-model", label: "AI模特图片视频" },
    { href: "/social-ip", label: "社媒IP打造" },
    { href: "/offline-event", label: "线下活动引流" },
  ],
  company: [
    { href: "/about", label: "关于我们" },
    { href: "/blog", label: "行业洞察" },
    { href: "/contact", label: "联系我们" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-muted-light border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <Logo variant="full" className="!items-start" />
            </div>
            <p className="text-muted text-sm max-w-md leading-relaxed">
              广州市有钱科技有限公司，专注为服装行业提供AI视觉生成、社媒IP运营、线下活动引流等一站式数字营销解决方案。
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-foreground">服务项目</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-foreground">公司</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} 广州市有钱科技有限公司 版权所有
          </p>
          <div className="flex gap-6 text-xs text-muted">
            <span>粤ICP备XXXXXXXX号</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
