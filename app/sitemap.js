import { CATEGORIES } from '@/lib/data';
import { getPublishedArticles } from '@/lib/articlesDb';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fortyfive.vercel.app';

const extraCategories = [
  { slug: 'markets' },
  { slug: 'india' },
  { slug: 'global' },
];

export default async function sitemap() {
  const now = new Date();
  const staticRoutes = ['', '/about', '/search'];
  const categoryRoutes = [...CATEGORIES, ...extraCategories].map((category) => `/category/${category.slug}`);
  const articles = await getPublishedArticles();
  const articleRoutes = articles.map((article) => `/article/${article.slug}`);

  return [...staticRoutes, ...categoryRoutes, ...articleRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route.startsWith('/article') ? 'monthly' : 'weekly',
    priority: route === '' ? 1 : route.startsWith('/article') ? 0.7 : 0.8,
  }));
}
