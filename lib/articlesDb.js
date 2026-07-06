import { ARTICLES } from '@/lib/data';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { getSupabaseAdminClient } from '@/lib/supabase/admin';

const ARTICLES_TABLE = 'articles';
const SECTIONS_TABLE = 'article_sections';
const PUBLISHED_STATUSES = ['Published', 'published'];
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

function hasPublicSupabaseEnv() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

function hasAdminSupabaseEnv() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function normalizeArticle(article) {
  if (!article) return null;

  const category = categorySlugs[article.category] || article.category?.toLowerCase() || 'startups';

  return {
    ...article,
    category,
    categoryName: article.categoryName || article.category_name || article.category,
    kind: article.kind || article.type || 'News',
    readTime: article.readTime || article.read_time || '4 min read',
    deepRead: article.deepRead ?? article.deep_read ?? article.type === 'Deep Read',
    seoTitle: article.seoTitle || article.seo_title || article.title,
    seoDescription: article.seoDescription || article.seo_description || article.summary || article.subtitle,
    bottomLine: article.bottomLine || article.bottom_line || '',
    pullQuote: article.pullQuote || article.pull_quote || '',
    inBrief: article.inBrief || article.in_brief || '',
    coverImageUrl: article.coverImageUrl || article.cover_image_url || '',
    ogImageUrl: article.ogImageUrl || article.og_image_url || '',
    body: article.body || article.bodySections || article.body_sections || [],
  };
}

function normalizeArticles(articles = []) {
  return articles.map(normalizeArticle).filter(Boolean);
}

function dedupeArticles(articles = []) {
  const seen = new Set();

  return articles.filter((article) => {
    if (!article?.slug || seen.has(article.slug)) return false;
    seen.add(article.slug);
    return true;
  });
}

function bodyBlocksFromSections(sections = []) {
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

async function getPublishedSupabaseArticles() {
  if (!hasPublicSupabaseEnv()) return [];

  try {
    const { data, error } = await getSupabaseServerClient()
      .from(ARTICLES_TABLE)
      .select('*')
      .in('status', PUBLISHED_STATUSES)
      .order('date', { ascending: false });

    if (error) throw error;
    return normalizeArticles(data || []);
  } catch {
    return [];
  }
}

function searchFallbackArticles(query, category, sourceArticles = ARTICLES) {
  const term = query?.trim().toLowerCase();

  return sourceArticles.filter((article) => {
    const categoryMatches = !category || category === 'all' || article.category === category;
    if (!term) return categoryMatches;

    const haystack = [
      article.title,
      article.subtitle,
      article.summary,
      article.category,
      article.kind,
      article.author,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return categoryMatches && haystack.includes(term);
  });
}

async function getPublishedSupabaseArticleBySlug(slug) {
  if (!hasPublicSupabaseEnv()) return null;

  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from(ARTICLES_TABLE)
      .select('*')
      .in('status', PUBLISHED_STATUSES)
      .eq('slug', slug)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;

    const { data: sections, error: sectionsError } = await supabase
      .from(SECTIONS_TABLE)
      .select('*')
      .eq('article_id', data.id)
      .order('position', { ascending: true });

    if (sectionsError) throw sectionsError;

    const body = bodyBlocksFromSections(sections || []);
    return normalizeArticle({
      ...data,
      body: body.length ? body : [{ type: 'p', text: data.summary || data.subtitle || data.title }],
    });
  } catch {
    return null;
  }
}

function requireAdminClient() {
  if (!hasAdminSupabaseEnv()) {
    throw new Error('Supabase admin client is not configured');
  }

  return getSupabaseAdminClient();
}

export async function getPublishedArticles() {
  const supabaseArticles = await getPublishedSupabaseArticles();
  if (supabaseArticles.length === 0) return ARTICLES;
  return dedupeArticles([...supabaseArticles, ...ARTICLES]);
}

export async function getPublishedArticleBySlug(slug) {
  const supabaseArticle = await getPublishedSupabaseArticleBySlug(slug);
  return supabaseArticle || ARTICLES.find((article) => article.slug === slug) || null;
}

export async function getArticlesByCategory(category) {
  const articles = await getPublishedArticles();
  return articles.filter((article) => article.category === category);
}

export async function searchPublishedArticles(query, category) {
  const supabaseArticles = await getPublishedSupabaseArticles();
  const articles = supabaseArticles.length ? dedupeArticles([...supabaseArticles, ...ARTICLES]) : ARTICLES;
  return searchFallbackArticles(query, category, articles);
}

export async function getAdminArticles() {
  const supabase = requireAdminClient();
  const { data, error } = await supabase.from(ARTICLES_TABLE).select('*').order('updated_at', { ascending: false });

  if (error) throw error;
  return normalizeArticles(data);
}

export async function createArticle(article) {
  const supabase = requireAdminClient();
  const { data, error } = await supabase.from(ARTICLES_TABLE).insert(article).select('*').single();

  if (error) throw error;
  return normalizeArticle(data);
}

export async function updateArticle(id, article) {
  const supabase = requireAdminClient();
  const { data, error } = await supabase.from(ARTICLES_TABLE).update(article).eq('id', id).select('*').single();

  if (error) throw error;
  return normalizeArticle(data);
}

export async function deleteArticle(id) {
  const supabase = requireAdminClient();
  const { error } = await supabase.from(ARTICLES_TABLE).delete().eq('id', id);

  if (error) throw error;
  return true;
}

export async function getArticleSections(articleId) {
  const supabase = requireAdminClient();
  const { data, error } = await supabase
    .from(SECTIONS_TABLE)
    .select('*')
    .eq('article_id', articleId)
    .order('position', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function saveArticleSections(articleId, sections) {
  const supabase = requireAdminClient();
  const sectionRows = sections.map((section, index) => ({
    ...section,
    article_id: articleId,
    position: section.position ?? index,
  }));

  const { error: deleteError } = await supabase.from(SECTIONS_TABLE).delete().eq('article_id', articleId);
  if (deleteError) throw deleteError;

  if (sectionRows.length === 0) return [];

  const { data, error } = await supabase.from(SECTIONS_TABLE).insert(sectionRows).select('*').order('position');
  if (error) throw error;

  return data || [];
}
