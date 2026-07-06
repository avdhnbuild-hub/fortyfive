import { ImageResponse } from 'next/og';
import { CATEGORIES } from '@/lib/data';
import { getPublishedArticleBySlug } from '@/lib/articlesDb';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

function categoryName(article) {
  return CATEGORIES.find((category) => category.slug === article.category)?.name || article.categoryName || article.category;
}

function shortText(value = '', limit = 150) {
  if (!value || value.length <= limit) return value;
  return `${value.slice(0, limit - 1).trim()}...`;
}

export default async function Image({ params }) {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug);
  const title = article?.title || 'fortyfive';
  const category = article ? categoryName(article) : 'Technology';
  const subtitle = shortText(article?.subtitle || article?.summary || '');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#070707',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 76px 58px',
          fontFamily: 'Arial, sans-serif',
          border: '1px solid #1d1d1d',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 46, fontWeight: 700 }}>fortyfive</div>
            <div style={{ width: 12, height: 12, borderRadius: 999, background: '#ff5a1f' }} />
          </div>
          <div style={{ color: '#8f8f8f', fontSize: 22 }}>Technology. Startups. Growth.</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              alignSelf: 'flex-start',
              border: '1px solid #333333',
              borderRadius: 999,
              padding: '10px 18px',
              color: '#ff5a1f',
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 2.5,
              textTransform: 'uppercase',
              marginBottom: 28,
            }}
          >
            {category}
          </div>
          <div
            style={{
              maxWidth: 1040,
              fontSize: title.length > 72 ? 58 : 66,
              fontWeight: 700,
              lineHeight: 1.02,
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                marginTop: 26,
                maxWidth: 980,
                color: '#c9c9c9',
                fontSize: 30,
                lineHeight: 1.24,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#a8a8a8', fontSize: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 90, height: 4, background: '#ff5a1f' }} />
            <div>The new economy, clearly explained.</div>
          </div>
          <div>fortyfive</div>
        </div>
      </div>
    ),
    size
  );
}
