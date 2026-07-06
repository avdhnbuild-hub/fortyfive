import ArticleDetailContent from '@/components/site/ArticleDetailContent';
import { getPublishedArticleBySlug, getPublishedArticles } from '@/lib/articlesDb';

const DEFAULT_OG_IMAGE = '/og-default.png';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fortyfive-umber.vercel.app';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function absoluteUrl(value) {
  if (!value) return '';
  if (/^https?:\/\//i.test(value)) return value;
  return new URL(value, siteUrl).toString();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug);
  if (!article) return { title: 'Story not found: fortyfive' };
  const description = article.seoDescription || article.summary || article.subtitle;
  const title = article.seoTitle || article.title;
  const url = absoluteUrl(`/article/${article.slug}`);
  const dynamicOgImage = absoluteUrl(`/article/${article.slug}/opengraph-image`);
  const fallbackImage = absoluteUrl(DEFAULT_OG_IMAGE);
  const image = absoluteUrl(article.ogImageUrl) || absoluteUrl(article.coverImageUrl) || dynamicOgImage || fallbackImage;

  // Social platforms cache previews. After OG image changes, X, LinkedIn, WhatsApp, and others may need time or a preview refresh.

  return {
    title,
    description,
    authors: [{ name: article.author }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      siteName: 'fortyfive',
      type: 'article',
      url,
      authors: [article.author],
      section: article.category,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug);
  const articles = await getPublishedArticles();
  return <ArticleDetailContent initialArticle={article} initialArticles={articles} slug={slug} />;
}
