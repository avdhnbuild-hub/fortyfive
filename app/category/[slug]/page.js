import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import ArticleCard from '@/components/site/ArticleCard';
import DeepReadCard from '@/components/site/DeepReadCard';
import NewsletterCTA from '@/components/site/NewsletterCTA';
import { CATEGORIES, getCategory } from '@/lib/data';
import { getArticlesByCategory } from '@/lib/articlesDb';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const CMS_CATEGORIES = [
  { slug: 'markets', name: 'Markets', tagline: 'Market shifts, business models, capital flows, and new-economy signals.' },
  { slug: 'india', name: 'India', tagline: 'India-focused startup, technology, capital, AI, and growth stories.' },
  { slug: 'global', name: 'Global', tagline: 'Global technology and startup stories with context for operators and founders.' },
];

const getPageCategory = (slug) => getCategory(slug) || CMS_CATEGORIES.find((c) => c.slug === slug);

export function generateStaticParams() {
  return [...CATEGORIES, ...CMS_CATEGORIES].map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cat = getPageCategory(slug);
  if (!cat) return { title: 'Category: fortyfive' };
  return {
    title: `${cat.name}: fortyfive`,
    description: cat.tagline,
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = getPageCategory(slug);
  if (!category) notFound();
  const articles = await getArticlesByCategory(slug);
  const featured = articles[0];
  const rest = articles.slice(1);
  const deep = articles.filter((a) => a.deepRead);

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Header />
      <main className="flex-1">
        <section className="border-b border-line">
          <div className="container pt-14 md:pt-20 pb-14 md:pb-20">
            <p className="eyebrow text-signal">Section</p>
            <h1 className="mt-4 font-editorial text-[56px] md:text-[96px] leading-[0.95] tracking-tight">{category.name}</h1>
            <p className="mt-6 text-[17px] md:text-[19px] text-ink/70 leading-relaxed max-w-2xl">{category.tagline}</p>
          </div>
        </section>

        {featured && (
          <section className="container py-16 md:py-20 border-b border-line">
            <p className="eyebrow text-ash mb-6">Featured in {category.name}</p>
            <Link href={`/article/${featured.slug}`} className="group block max-w-4xl">
              <h2 className="font-editorial text-[36px] md:text-[56px] leading-[1.04] tracking-tight group-hover:text-signal transition-colors">
                {featured.title}
              </h2>
              <p className="mt-5 text-[17px] md:text-[18px] text-ink/70 leading-relaxed max-w-2xl">{featured.subtitle}</p>
              <div className="mt-5 flex items-center gap-3 text-[12px] text-ash">
                <span>{featured.date}</span>
                <span className="h-3 w-px bg-line" />
                <span>{featured.readTime}</span>
              </div>
            </Link>
          </section>
        )}

        {rest.length > 0 && (
          <section className="container py-16 md:py-20">
            <p className="eyebrow text-signal mb-8">Latest in {category.name}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8">
              {rest.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </section>
        )}

        {articles.length === 0 && (
          <section className="container py-16 md:py-20">
            <p className="font-editorial text-[32px] md:text-[40px] tracking-tight">No articles found.</p>
          </section>
        )}

        {deep.length > 0 && (
          <section className="bg-white border-y border-line">
            <div className="container py-20">
              <p className="eyebrow text-signal mb-3">Long form</p>
              <h3 className="font-editorial text-[32px] md:text-[44px] leading-none tracking-tight mb-10">Deep Reads in {category.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                {deep.map((a) => (
                  <DeepReadCard key={a.slug} article={a} />
                ))}
              </div>
            </div>
          </section>
        )}

        <NewsletterCTA />
      </main>
      <Footer />
    </div>
  );
}
