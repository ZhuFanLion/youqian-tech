import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CTAProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTA({
  title = "准备好让生意更有钱了吗？",
  description = "联系我们，获取专属的行业解决方案",
  primaryLabel = "立即咨询",
  primaryHref = "/contact",
  secondaryLabel = "查看案例",
  secondaryHref = "/ai-model/cases",
}: CTAProps) {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
          {title}
        </h2>
        <p className="text-white/70 text-base md:text-lg mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={primaryHref}
            className="inline-flex items-center gap-2 bg-gold text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-gold-dark transition-colors"
          >
            {primaryLabel}
            <ArrowRight size={18} />
          </Link>
          {secondaryLabel && (
            <Link
              href={secondaryHref}
              className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
