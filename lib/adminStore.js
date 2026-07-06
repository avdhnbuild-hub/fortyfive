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
