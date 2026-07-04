import ArticleDetailContent from '@/components/site/ArticleDetailContent';
import { ARTICLES, getArticleBySlug } from '@/lib/data';

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: 'Story not found: fortyfive' };
  return {
    title: article.seoTitle || `${article.title}: fortyfive`,
    description: article.seoDescription || article.subtitle,
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  return <ArticleDetailContent initialArticle={article} slug={slug} />;
}
