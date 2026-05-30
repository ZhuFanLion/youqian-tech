import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://youqiankeji.com";
const SITE_NAME = "有钱科技";

/**
 * Build page-level metadata with Open Graph, Twitter Card, and canonical URL.
 */
export function buildPageMeta(options: {
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
}): Metadata {
  const { path, title, description, keywords, ogImage, noIndex = false } = options;
  const fullUrl = `${SITE_URL}${path}`;
  const image = ogImage || `${SITE_URL}/og-image.png`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: fullUrl,
      siteName: SITE_NAME,
      type: "website",
      locale: "zh_CN",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [image],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
