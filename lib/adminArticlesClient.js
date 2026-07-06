import { getSupabaseClient } from '@/lib/supabase/client';

const ARTICLES_TABLE = 'articles';
const SECTIONS_TABLE = 'article_sections';

function fromDbArticle(article) {
  if (!article) return null;

  return {
    ...article,
    readTime: article.readTime || article.read_time || '',
    inBrief: article.inBrief || article.in_brief || '',
    pullQuote: article.pullQuote || article.pull_quote || '',
    bottomLine: article.bottomLine || article.bottom_line || '',
    seoTitle: article.seoTitle || article.seo_title || '',
    seoDescription: article.seoDescription || article.seo_description || '',
    coverImageUrl: article.coverImageUrl || article.cover_image_url || '',
    ogImageUrl: article.ogImageUrl || article.og_image_url || '',
    bodySections: article.bodySections || article.body_sections || [],
  };
}

function toDbArticle(article) {
  return {
    title: article.title || '',
    slug: article.slug || '',
    subtitle: article.subtitle || '',
    summary: article.summary || '',
    category: article.category || 'Startups',
    region: article.region || 'Both',
    type: article.type || 'News',
    author: article.author || 'fortyfive desk',
    date: article.date || null,
    read_time: article.readTime || '',
    tags: article.tags || '',
    status: article.status || 'Draft',
    in_brief: article.inBrief || '',
    pull_quote: article.pullQuote || '',
    bottom_line: article.bottomLine || '',
    seo_title: article.seoTitle || '',
    seo_description: article.seoDescription || '',
    cover_image_url: article.coverImageUrl || '',
    og_image_url: article.ogImageUrl || '',
  };
}

function fromDbSection(section) {
  return {
    id: section.id,
    heading: section.heading || '',
    body: section.body || '',
    position: section.position || 0,
  };
}

function toDbSections(articleId, sections) {
  return sections.map((section, index) => ({
    article_id: articleId,
    heading: section.heading || '',
    body: section.body || '',
    position: index,
  }));
}

export async function getAdminArticles() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from(ARTICLES_TABLE).select('*').order('updated_at', { ascending: false });

  if (error) throw error;
  return (data || []).map(fromDbArticle);
}

export async function getAdminArticle(id) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from(ARTICLES_TABLE).select('*').eq('id', id).maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const sections = await getArticleSections(data.id);
  return {
    ...fromDbArticle(data),
    bodySections: sections.length ? sections : [{ heading: '', body: '' }],
  };
}

export async function getAdminArticleBySlug(slug) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from(ARTICLES_TABLE).select('*').eq('slug', slug).maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const sections = await getArticleSections(data.id);
  return {
    ...fromDbArticle(data),
    bodySections: sections.length ? sections : [{ heading: '', body: '' }],
  };
}

export async function saveAdminArticle(article) {
  const supabase = getSupabaseClient();
  const payload = toDbArticle(article);
  const request = article.id
    ? supabase.from(ARTICLES_TABLE).update(payload).eq('id', article.id)
    : supabase.from(ARTICLES_TABLE).insert(payload);

  const { data, error } = await request.select('*').single();
  if (error) throw error;

  await saveArticleSections(data.id, article.bodySections || []);

  return {
    ...fromDbArticle(data),
    bodySections: article.bodySections || [],
  };
}

export async function getArticleSections(articleId) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from(SECTIONS_TABLE)
    .select('*')
    .eq('article_id', articleId)
    .order('position', { ascending: true });

  if (error) throw error;
  return (data || []).map(fromDbSection);
}

export async function saveArticleSections(articleId, sections) {
  const supabase = getSupabaseClient();
  const { error: deleteError } = await supabase.from(SECTIONS_TABLE).delete().eq('article_id', articleId);

  if (deleteError) throw deleteError;

  const rows = toDbSections(articleId, sections);
  if (rows.length === 0) return [];

  const { data, error } = await supabase.from(SECTIONS_TABLE).insert(rows).select('*').order('position');

  if (error) throw error;
  return (data || []).map(fromDbSection);
}
