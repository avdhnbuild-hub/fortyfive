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

export default async function Image({ params }) {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug);
  const title = article?.title || 'fortyfive';
  const category = article ? categoryName(article) : 'Technology';

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
          padding: '78px 90px 72px',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 54, fontWeight: 700, letterSpacing: -1 }}>fortyfive</div>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: '#ff5a1f' }} />
        </div>

        <div>
          <div
            style={{
              color: '#ff5a1f',
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: 'uppercase',
              marginBottom: 30,
            }}
          >
            {category}
          </div>
          <div
            style={{
              maxWidth: 980,
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: -2.4,
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 18, color: '#a8a8a8', fontSize: 26 }}>
          <div style={{ width: 112, height: 4, background: '#ff5a1f' }} />
          <div>Technology. Startups. Growth.</div>
        </div>
      </div>
    ),
    size
  );
}
