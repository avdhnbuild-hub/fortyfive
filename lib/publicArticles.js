import { ARTICLES } from '@/lib/data';
import { ADMIN_ARTICLES_KEY } from '@/lib/adminStore';

const categorySlugs = {
  Startups: 'startups',
  Technology: 'tech',
  Tech: 'tech',
  AI: 'ai',
  Funding: 'funding',
  Growth: 'growth',
  Markets: 'markets',
  India: 'india',
  Global: 'global',
  Opinion: 'opinion',
};

function toBodyBlocks(sections = []) {
  return sections.flatMap((section) => {
    const blocks = [];
    if (section.heading) blocks.push({ type: 'h2', text: section.heading });

    section.body
      ?.split('\n')
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
      .forEach((paragraph) => blocks.push({ type: 'p', text: paragraph }));

    return blocks;
  });
}

export function normalizeCmsArticle(article) {
  const category = categorySlugs[article.category] || article.category?.toLowerCase() || 'startups';

  return {
    ...article,
    category,
    categoryName: article.category,
    subtitle: article.subtitle || article.summary || '',
    kind: article.type || 'News',
    readTime: article.readTime || '4 min read',
    author: article.author || 'fortyfive desk',
    date: article.date || '',
    deepRead: article.type === 'Deep Read',
    body: toBodyBlocks(article.bodySections).length
      ? toBodyBlocks(article.bodySections)
      : [{ type: 'p', text: article.summary || article.subtitle || article.title }],
  };
}

export function getPublishedCmsArticles() {
  if (typeof window === 'undefined') return [];

  try {
    const stored = JSON.parse(localStorage.getItem(ADMIN_ARTICLES_KEY) || '[]');
    if (!Array.isArray(stored)) return [];

    return stored
      .filter((article) => article.status === 'Published')
      .map(normalizeCmsArticle);
  } catch {
    return [];
  }
}

export function getPublicArticles() {
  return [...getPublishedCmsArticles(), ...ARTICLES];
}
