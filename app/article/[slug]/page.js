import ArticleDetailContent from '@/components/site/ArticleDetailContent';
import { ARTICLES } from '@/lib/data';
import { getPublishedArticleBySlug, getPublishedArticles } from '@/lib/articlesDb';

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug);
  if (!article) return { title: 'Story not found: fortyfive' };
  const description = article.seoDescription || article.summary || article.subtitle;
  const url = `/article/${article.slug}`;

  return {
    title: article.seoTitle || article.title,
    description,
    authors: [{ name: article.author }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.seoTitle || article.title,
      description,
      siteName: 'fortyfive',
      type: 'article',
      url,
      authors: [article.author],
      section: article.category,
      images: [
        {
          url: '/og-image.svg',
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.seoTitle || article.title,
      description,
      images: ['/og-image.svg'],
    },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug);
  const articles = await getPublishedArticles();
  return <ArticleDetailContent initialArticle={article} initialArticles={articles} slug={slug} />;
}
