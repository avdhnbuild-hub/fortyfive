import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import Hero from '@/components/site/Hero';
import ArticleCard from '@/components/site/ArticleCard';
import DeepReadCard from '@/components/site/DeepReadCard';
import CategoryCard from '@/components/site/CategoryCard';
import FundingCard from '@/components/site/FundingCard';
import NewsletterCTA from '@/components/site/NewsletterCTA';
import SectionHeader from '@/components/site/SectionHeader';
import { ARTICLES, CATEGORIES, FUNDING } from '@/lib/data';
import { getPublishedArticles } from '@/lib/articlesDb';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const description = 'fortyfive covers startups, technology, capital, AI, growth, markets, and the companies shaping what comes next.';
const pinnedHomepageSlug = 'why-most-startup-news-is-hard-to-use';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: {
    absolute: 'fortyfive | The new economy, clearly explained',
  },
  description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'fortyfive | The new economy, clearly explained',
    description,
    siteName: 'fortyfive',
    type: 'website',
    url: '/',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'fortyfive',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'fortyfive | The new economy, clearly explained',
    description,
    images: ['/og-image.svg'],
  },
};

function dedupeBySlug(articles = []) {
  const seen = new Set();

  return articles.filter((article) => {
    if (!article?.slug || seen.has(article.slug)) return false;
    seen.add(article.slug);
    return true;
  });
}

export default async function HomePage() {
  const articles = await getPublishedArticles();
  const pinnedArticle = ARTICLES.find((article) => article.slug === pinnedHomepageSlug);
  const homepageArticles = dedupeBySlug(pinnedArticle ? [pinnedArticle, ...articles] : articles);
  const featured = homepageArticles[0];
  const latest = homepageArticles.filter((article) => article.slug !== featured?.slug).slice(0, 8);
  const deep = homepageArticles.filter((article) => article.deepRead);

  if (!featured) {
    return (
      <div className="min-h-screen flex flex-col bg-paper">
        <Header />
        <main className="flex-1">
          <section className="container py-24">
            <p className="font-editorial text-[32px] md:text-[40px] tracking-tight">No articles found.</p>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Header />
      <main className="flex-1">
        <Hero featured={featured} latest={latest} />

        {/* Latest */}
        <section className="container py-20 md:py-24">
          <SectionHeader eyebrow="What's new" title="Latest" cta="All stories" href="/search" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-12 md:gap-y-16">
            {latest.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>

        {/* Explore */}
        <section className="bg-white border-y border-line">
          <div className="container py-20 md:py-24">
            <SectionHeader eyebrow="Sections" title="Explore" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {CATEGORIES.map((c) => (
                <CategoryCard key={c.slug} category={c} />
              ))}
            </div>
          </div>
        </section>

        {/* Deep Reads */}
        <section className="container py-20 md:py-24">
          <SectionHeader eyebrow="Long form" title="Deep Reads" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {deep.slice(0, 3).map((a) => (
              <DeepReadCard key={a.slug} article={a} />
            ))}
          </div>
        </section>

        {/* Funding */}
        <section className="bg-white border-y border-line">
          <div className="container py-20 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="eyebrow text-signal mb-3">Capital</p>
              <h2 className="font-editorial text-[40px] md:text-[52px] leading-none tracking-tight">Funding</h2>
              <p className="mt-5 text-[15px] text-ink/70 leading-relaxed max-w-sm">
                Explainers and analysis on what capital signals, what it hides, and what to watch after the announcement.
              </p>
              <Link href="/category/funding" className="mt-6 inline-flex items-center gap-2 text-[14px] font-medium text-ink hover:text-signal transition-colors group">
                View more funding stories
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="md:col-span-8">
              {FUNDING.map((f) => (
                <FundingCard key={f.name} item={f} />
              ))}
            </div>
          </div>
        </section>

        <NewsletterCTA />

        <section className="container py-16 md:py-20">
          <div className="border-t border-line pt-10 md:grid md:grid-cols-12 md:gap-10">
            <div className="md:col-span-4">
              <div className="flex items-center gap-3">
                <span className="orange-dot" aria-hidden="true" />
                <p className="eyebrow text-signal">Contact</p>
              </div>
              <h2 className="mt-3 font-editorial text-[40px] md:text-[48px] leading-none tracking-tight">Contact</h2>
            </div>
            <div className="mt-6 max-w-xl md:col-span-7 md:mt-0">
              <p className="text-[17px] leading-relaxed text-ink/75">
                For tips, corrections, startup stories, collaborations, or feedback, write to us.
              </p>
              <a
                href="mailto:fortyfive.build@gmail.com"
                className="link-underline focus-ring mt-5 inline-flex rounded-sm text-[16px] font-medium text-ink transition-colors hover:text-signal"
              >
                fortyfive.build@gmail.com
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
