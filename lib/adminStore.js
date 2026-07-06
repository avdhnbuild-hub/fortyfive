export const ADMIN_ARTICLES_KEY = 'fortyfive_admin_articles';

export const emptyArticle = {
  title: '',
  slug: '',
  subtitle: '',
  summary: '',
  category: 'Startups',
  region: 'Both',
  type: 'News',
  author: 'fortyfive desk',
  date: '',
  readTime: '',
  tags: '',
  status: 'Draft',
  inBrief: '',
  pullQuote: '',
  bodySections: [{ heading: '', body: '' }],
  bottomLine: '',
  seoTitle: '',
  seoDescription: '',
  coverImageUrl: '',
  ogImageUrl: '',
};

export function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getAdminArticles() {
  if (typeof window === 'undefined') return [];

  try {
    const stored = JSON.parse(localStorage.getItem(ADMIN_ARTICLES_KEY) || '[]');
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

export function saveAdminArticles(articles) {
  localStorage.setItem(ADMIN_ARTICLES_KEY, JSON.stringify(articles));
}

export function getAdminArticle(id) {
  return getAdminArticles().find((article) => article.id === id);
}

export function upsertAdminArticle(article) {
  const articles = getAdminArticles();
  const existingIndex = articles.findIndex((item) => item.id === article.id);
  const now = new Date().toISOString();
  const nextArticle = {
    ...article,
    id: article.id || crypto.randomUUID(),
    updatedAt: now,
  };

  if (existingIndex >= 0) {
    articles[existingIndex] = nextArticle;
  } else {
    articles.unshift({
      ...nextArticle,
      createdAt: now,
    });
  }

  saveAdminArticles(articles);
  return nextArticle;
}
