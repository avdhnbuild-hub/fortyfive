import { ARTICLES } from '@/lib/data';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { getSupabaseAdminClient } from '@/lib/supabase/admin';

const ARTICLES_TABLE = 'articles';
const SECTIONS_TABLE = 'article_sections';

function hasPublicSupabaseEnv() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

function hasAdminSupabaseEnv() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function normalizeArticle(article) {
  if (!article) return null;

  return {
    ...article,
    readTime: article.readTime || article.read_time || '4 min read',
    deepRead: article.deepRead ?? article.deep_read ?? false,
    seoTitle: article.seoTitle || article.seo_title || article.title,
    seoDescription: article.seoDescription || article.seo_description || article.summary || article.subtitle,
    bottomLine: article.bottomLine || article.bottom_line || '',
    pullQuote: article.pullQuote || article.pull_quote || '',
    inBrief: article.inBrief || article.in_brief || '',
    body: article.body || [],
  };
}

function normalizeArticles(articles = []) {
  return articles.map(normalizeArticle).filter(Boolean);
}

function fallbackPublishedArticles() {
  return ARTICLES;
}

function fallbackArticleBySlug(slug) {
  return ARTICLES.find((article) => article.slug === slug) || null;
}

function fallbackArticlesByCategory(category) {
  return ARTICLES.filter((article) => article.category === category);
}

function searchFallbackArticles(query, category) {
  const term = query?.trim().toLowerCase();

  return ARTICLES.filter((article) => {
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

async function safePublicQuery(query, fallback) {
  if (!hasPublicSupabaseEnv()) return fallback();

  try {
    const { data, error } = await query(getSupabaseServerClient());
    if (error) throw error;
    return data;
  } catch {
    return fallback();
  }
}

function requireAdminClient() {
  if (!hasAdminSupabaseEnv()) {
    throw new Error('Supabase admin client is not configured');
  }

  return getSupabaseAdminClient();
}

export async function getPublishedArticles() {
  const data = await safePublicQuery(
    (supabase) =>
      supabase
        .from(ARTICLES_TABLE)
        .select('*')
        .eq('status', 'Published')
        .order('date', { ascending: false }),
    fallbackPublishedArticles
  );

  return normalizeArticles(data);
}

export async function getPublishedArticleBySlug(slug) {
  const data = await safePublicQuery(
    (supabase) =>
      supabase
        .from(ARTICLES_TABLE)
        .select('*')
        .eq('status', 'Published')
        .eq('slug', slug)
        .maybeSingle(),
    () => fallbackArticleBySlug(slug)
  );

  return normalizeArticle(data);
}

export async function getArticlesByCategory(category) {
  const data = await safePublicQuery(
    (supabase) =>
      supabase
        .from(ARTICLES_TABLE)
        .select('*')
        .eq('status', 'Published')
        .eq('category', category)
        .order('date', { ascending: false }),
    () => fallbackArticlesByCategory(category)
  );

  return normalizeArticles(data);
}

export async function searchPublishedArticles(query, category) {
  const term = query?.trim();

  const data = await safePublicQuery(
    (supabase) => {
      let request = supabase.from(ARTICLES_TABLE).select('*').eq('status', 'Published');

      if (category && category !== 'all') {
        request = request.eq('category', category);
      }

      if (term) {
        request = request.or(`title.ilike.%${term}%,subtitle.ilike.%${term}%,summary.ilike.%${term}%`);
      }

      return request.order('date', { ascending: false });
    },
    () => searchFallbackArticles(term, category)
  );

  return normalizeArticles(data);
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
