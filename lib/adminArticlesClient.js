import { getSupabaseClient } from '@/lib/supabase/client';

const ARTICLES_TABLE = 'articles';
const SECTIONS_TABLE = 'article_sections';
const ARTICLE_IMAGES_BUCKET = 'article-images';

export function normalizeTags(input) {
  if (Array.isArray(input)) {
    return input.map((tag) => String(tag).trim()).filter(Boolean);
  }

  return String(input || '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function normalizeSectionBody(input) {
  if (Array.isArray(input)) {
    return input.map((paragraph) => String(paragraph).trim()).filter(Boolean);
  }

  return String(input || '')
    .split('\n')
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function sectionBodyToForm(input) {
  return normalizeSectionBody(input).join('\n\n');
}

function statusToForm(status) {
  return status === 'published' ? 'Published' : 'Draft';
}

function statusToDb(status) {
  return String(status || 'draft').toLowerCase() === 'published' ? 'published' : 'draft';
}

export function articleFromDbToForm(article) {
  if (!article) return null;

  return {
    id: article.id,
    updatedAt: article.updatedAt || article.updated_at || '',
    title: article.title || '',
    slug: article.slug || '',
    subtitle: article.subtitle || '',
    summary: article.summary || '',
    category: article.category || 'Startups',
    region: article.region || 'Both',
    type: article.type || 'News',
    author: article.author || 'fortyfive desk',
    date: article.date || '',
    publishedAt: article.publishedAt || article.published_at || '',
    readTime: article.readTime || article.read_time || '',
    tags: normalizeTags(article.tags).join(', '),
    status: statusToForm(article.status),
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

export function articleFromFormToDb(article) {
  const status = statusToDb(article.status);
  const shouldSetPublishedAt = status === 'published' && !article.published_at && !article.publishedAt;

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
    tags: normalizeTags(article.tags),
    status,
    published_at: shouldSetPublishedAt ? new Date().toISOString() : article.published_at || article.publishedAt || null,
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
    body: sectionBodyToForm(section.body),
    position: section.position || 0,
  };
}

function toDbSections(articleId, sections) {
  return sections.map((section, index) => ({
    article_id: articleId,
    heading: section.heading || '',
    body: normalizeSectionBody(section.body),
    position: index,
  }));
}

export async function getAdminArticles() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from(ARTICLES_TABLE).select('*').order('updated_at', { ascending: false });

  if (error) throw error;
  return (data || []).map(articleFromDbToForm);
}

export async function getAdminArticle(id) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from(ARTICLES_TABLE).select('*').eq('id', id).maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const sections = await getArticleSections(data.id);
  return {
    ...articleFromDbToForm(data),
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
    ...articleFromDbToForm(data),
    bodySections: sections.length ? sections : [{ heading: '', body: '' }],
  };
}

export async function saveAdminArticle(article) {
  const supabase = getSupabaseClient();
  const payload = articleFromFormToDb(article);
  const request = article.id
    ? supabase.from(ARTICLES_TABLE).update(payload).eq('id', article.id)
    : supabase.from(ARTICLES_TABLE).insert(payload);

  const { data, error } = await request.select('*').single();
  if (error) throw error;

  await saveArticleSections(data.id, article.bodySections || []);

  return {
    ...articleFromDbToForm(data),
    bodySections: article.bodySections || [],
  };
}

export async function deleteArticle(id) {
  if (!id) {
    throw new Error('Article id is required to delete an article.');
  }

  const supabase = getSupabaseClient();

  const { error: sectionsError } = await supabase.from(SECTIONS_TABLE).delete().eq('article_id', id);
  if (sectionsError) throw sectionsError;

  const { error } = await supabase.from(ARTICLES_TABLE).delete().eq('id', id);
  if (error) throw error;

  // Storage cleanup for cover/OG images can be added later once file ownership is tracked safely.
  return { success: true };
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

export async function uploadArticleCoverImage(file, slug) {
  const supabase = getSupabaseClient();
  const timestamp = Date.now();
  const safeSlug = slug || 'untitled';
  const safeFilename = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, '-').replace(/^-+|-+$/g, '');
  const path = `articles/${safeSlug}/${timestamp}-${safeFilename}`;

  const { error } = await supabase.storage.from(ARTICLE_IMAGES_BUCKET).upload(path, file, {
    cacheControl: '31536000',
    upsert: false,
  });

  if (error) throw error;

  const { data } = supabase.storage.from(ARTICLE_IMAGES_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
