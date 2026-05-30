"use client";

import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Toast, { useToast } from "@/components/Toast";

interface FormData {
  name: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
}

const PHONE_REGEX = /^1[3-9]\d{9}$/;

function validate(data: FormData): FormErrors | null {
  const errors: FormErrors = {};
  if (!data.name.trim()) {
    errors.name = "请输入您的姓名";
  }
  if (!data.phone.trim()) {
    errors.phone = "请输入联系电话";
  } else if (!PHONE_REGEX.test(data.phone.trim())) {
    errors.phone = "请输入正确的手机号码";
  }
  return Object.keys(errors).length > 0 ? errors : null;
}

export default function ContactContent() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Replace with actual API call when COS backend is ready
      await new Promise((resolve) => setTimeout(resolve, 1500));

      showToast("success", "咨询已提交成功！我们将尽快与您联系。");
      setIsSubmitted(true);
    } catch {
      showToast("error", "提交失败，请稍后重试或直接电话联系我们。");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({ name: "", phone: "", company: "", service: "", message: "" });
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6">
              <Phone size={28} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">提交成功！</h2>
            <p className="text-muted mb-8">
              感谢您的咨询，我们的顾问将在 24 小时内与您联系。
            </p>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-muted-light dark:hover:bg-slate-800 transition-colors"
            >
              继续咨询
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <Toast type={toast.type} message={toast.message} visible={toast.visible} onClose={hideToast} />

      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-white dark:from-primary/10 dark:to-background">
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
              <div className="mt-8 p-6 bg-muted-light dark:bg-slate-800/50 rounded-2xl text-center">
                <p className="text-sm text-muted mb-3">扫码添加企业微信</p>
                <div className="w-40 h-40 bg-border dark:bg-slate-700 rounded-lg mx-auto flex items-center justify-center">
                  <p className="text-xs text-muted">微信二维码（待上传）</p>
                </div>
              </div>
            </div>

            {/* 咨询表单 */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-6">在线咨询</h2>
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-1.5">
                    您的姓名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border bg-white text-foreground placeholder:text-muted focus:outline-none focus:ring-2 transition-colors dark:bg-slate-800 dark:placeholder:text-muted ${
                      errors.name
                        ? "border-red-400 focus:ring-red-200 focus:border-red-400"
                        : "border-border focus:ring-primary/20 focus:border-primary"
                    }`}
                    placeholder="请输入您的姓名"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="contact-phone" className="block text-sm font-medium text-foreground mb-1.5">
                    联系电话 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border bg-white text-foreground placeholder:text-muted focus:outline-none focus:ring-2 transition-colors dark:bg-slate-800 dark:placeholder:text-muted ${
                      errors.phone
                        ? "border-red-400 focus:ring-red-200 focus:border-red-400"
                        : "border-border focus:ring-primary/20 focus:border-primary"
                    }`}
                    placeholder="请输入11位手机号码"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="contact-company" className="block text-sm font-medium text-foreground mb-1.5">
                    公司名称
                  </label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors dark:bg-slate-800 dark:placeholder:text-muted"
                    placeholder="请输入您的公司名称"
                  />
                </div>

                <div>
                  <label htmlFor="contact-service" className="block text-sm font-medium text-foreground mb-1.5">
                    感兴趣的服务
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors dark:bg-slate-800"
                  >
                    <option value="">请选择</option>
                    <option value="ai-model">AI模特图片与视频</option>
                    <option value="social-ip">社媒IP打造</option>
                    <option value="offline-event">线下活动引流</option>
                    <option value="all">全部服务</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-1.5">
                    需求描述
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none dark:bg-slate-800 dark:placeholder:text-muted"
                    placeholder="请简要描述您的需求"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white font-semibold py-3.5 rounded-lg hover:bg-primary-dark transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      提交中...
                    </>
                  ) : (
                    "提交咨询"
                  )}
                </button>

                <p className="text-xs text-muted text-center">
                  提交即表示您同意我们的隐私政策，您的信息将被严格保密。
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
