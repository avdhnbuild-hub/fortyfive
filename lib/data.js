// Mock data for fortyfive. Structured so it can later be swapped for a CMS.

export const CATEGORIES = [
  { slug: 'startups', name: 'Startups', tagline: 'Founder stories, company-building, launches, pivots, and startup strategy.' },
  { slug: 'tech', name: 'Technology', tagline: 'AI, software, products, platforms, infrastructure, and digital markets.' },
  { slug: 'funding', name: 'Funding', tagline: 'Capital movement, investors, acquisitions, and private-market signals.' },
  { slug: 'growth', name: 'Growth', tagline: 'Distribution, revenue, GTM, retention, and business models.' },
  { slug: 'ai', name: 'AI', tagline: 'AI startups, products, infrastructure, adoption, and strategy.' },
  { slug: 'opinion', name: 'Opinion', tagline: 'Sharp takes on startups, technology, capital, markets, and the new economy.' },
];

export const ARTICLES = [
  {
    slug: 'ai-demos-to-distribution',
    category: 'ai',
    title: 'AI companies are moving from demos to distribution',
    subtitle:
      'The next wave of AI startups will be judged less by model novelty and more by workflow ownership, customer trust, and repeat usage.',
    author: 'fortyfive desk',
    date: 'Jun 12, 2025',
    readTime: '6 min read',
    kind: 'Analysis',
    featured: true,
    inBrief:
      'AI products are entering a new phase. The winners may not be the companies with the flashiest demos, but the ones that own workflows, distribution, and trust.',
    pullQuote:
      'AI is becoming less about surprise and more about repeated utility.',
    seoTitle: 'AI companies are moving from demos to distribution - fortyfive',
    seoDescription:
      'The next wave of AI startups will be judged by workflow ownership, customer trust, distribution, and repeat usage.',
    bottomLine:
      'AI is becoming less about surprise and more about repeated utility.',
    body: [
      { type: 'h2', text: 'What changed' },
      { type: 'p', text: 'The first wave of AI products was judged by how impressive the demo felt. That phase made sense: model capability was moving quickly and every week produced a new interface that felt impossible six months earlier.' },
      { type: 'p', text: 'The market is now shifting. Customers are asking whether the product fits into daily work, whether teams trust it, and whether the workflow becomes meaningfully faster after adoption.' },
      { type: 'h2', text: 'Why it matters' },
      { type: 'p', text: 'This is good news for serious founders. Distribution, trust, domain depth, and repeat usage are harder to copy than a thin wrapper around a model endpoint.' },
      { type: 'blockquote', text: 'AI is becoming less about surprise and more about repeated utility.' },
      { type: 'h2', text: 'The bigger context' },
      { type: 'p', text: 'AI is moving from a product novelty into a business-model question. Buyers want measurable outcomes, not just an assistant that can summarize documents.' },
      { type: 'h2', text: 'What founders should watch' },
      { type: 'p', text: 'Watch repeat usage, not trial signups. Watch workflow ownership, not prompt quality. Watch whether teams change behavior after the product enters the stack.' },
      { type: 'p', text: 'The companies that win may be the ones that own boring but valuable workflows: invoices, support queues, compliance reviews, sales operations, and internal knowledge systems.' },
    ],
  },
  {
    slug: 'indian-saas-selling-global-day-one',
    category: 'startups',
    title: 'Indian SaaS founders are selling global earlier',
    subtitle: 'A generation of Indian software founders is treating the world as the first market, not only the expansion market.',
    author: 'fortyfive desk', date: 'Jun 11, 2025', readTime: '5 min read', kind: 'Feature',
    inBrief: 'Indian SaaS founders are moving earlier into global markets, often building sales, pricing, and positioning for US buyers from day one.',
    bottomLine: 'Selling global earlier is becoming a default operating choice, not a vanity signal.',
    body: [
      { type: 'p', text: 'The last generation of Indian SaaS founders often started at home and moved global once they had traction. The current generation is making global positioning part of the original plan.' },
      { type: 'h2', text: 'A quiet inversion' },
      { type: 'p', text: 'A new default has emerged: incorporate in Delaware, price in dollars, hire an SDR in Bangalore, and start cold outbound in North America from month one. The founders who do this are not being ambitious. They are being practical.' },
    ],
  },
  {
    slug: 'ai-indian-back-offices',
    category: 'ai',
    title: 'AI is moving into the back office',
    subtitle: 'The most interesting AI deployment may not be consumer chatbots. It is the quiet automation of internal operations.',
    author: 'fortyfive desk', date: 'Jun 10, 2025', readTime: '7 min read', kind: 'Analysis',
    inBrief: 'Enterprises across banking, insurance, logistics, and SaaS are quietly rewiring back offices with AI — and it is where real revenue is forming.',
    bottomLine: 'The biggest AI story may not be the demo. It may be the back office.',
    body: [
      { type: 'p', text: 'When people talk about AI adoption, they often mean a chatbot on a website. The real story is happening one layer deeper.' },
    ],
  },
  {
    slug: 'funding-winter-founder-storytelling',
    category: 'funding',
    title: 'The funding winter changed founder storytelling',
    subtitle: 'The way founders talk about their companies has become quieter, more specific, and much more disciplined.',
    author: 'fortyfive desk', date: 'Jun 09, 2025', readTime: '5 min read', kind: 'Opinion',
    inBrief: 'Founder narratives have shifted from growth-at-any-cost to path-to-profitability. That change is now visible in decks, posts, and press releases.',
    bottomLine: 'The vocabulary of startups has quietly, permanently changed.',
    body: [
      { type: 'p', text: 'Two years ago, an average Series B deck opened with a hockey stick and closed with a TAM. Today, that same deck opens with unit economics and closes with a discipline slide.' },
    ],
  },
  {
    slug: 'd2c-offline-retail',
    category: 'growth',
    title: 'Digital brands are returning to offline retail',
    subtitle: 'The digitally native brand story is being rewritten. The next chapter is physical, local, and margin-aware.',
    author: 'fortyfive desk', date: 'Jun 08, 2025', readTime: '6 min read', kind: 'Feature',
    inBrief: 'D2C brands are opening physical stores not out of nostalgia, but because online acquisition costs have changed the model.',
    bottomLine: 'For many digital brands, offline is not a distraction. It is distribution.',
    body: [{ type: 'p', text: 'Across markets, serious digital consumer brands are quietly testing stores, retail partnerships, and physical distribution.' }],
  },
  {
    slug: 'ondc-repeat-customers',
    category: 'tech',
    title: "Open commerce networks face the repeat-customer test",
    subtitle: 'Launching a network is one problem. Getting the same buyer back a second time is a completely different one.',
    author: 'fortyfive desk', date: 'Jun 07, 2025', readTime: '5 min read', kind: 'Analysis',
    inBrief: 'Open commerce networks can solve parts of the cold-start problem. The next problem — repeat purchase — is harder and less glamorous.',
    bottomLine: 'The measure of open commerce will not be onboarded merchants. It will be second orders.',
    body: [{ type: 'p', text: 'Open commerce has become one of the most watched pieces of digital infrastructure, especially in India.' }],
  },
  {
    slug: 'fintech-cautious-growth',
    category: 'funding',
    title: 'Fintech startups are becoming more cautious on growth',
    subtitle: "A category built on aggressive expansion is quietly relearning discipline. It is being driven by regulators as much as investors.",
    author: 'fortyfive desk', date: 'Jun 06, 2025', readTime: '4 min read', kind: 'Analysis',
    inBrief: 'Fintechs are trimming ambition. It is a mix of regulatory pressure, capital scarcity, and the realization that growth was not always real.',
    bottomLine: 'The fintech story is not shrinking. It is maturing.',
    body: [{ type: 'p', text: 'Cautious is a strange word to apply to fintech. For a long time, this was one of the loudest, fastest categories.' }],
  },
  {
    slug: 'small-city-founders',
    category: 'startups',
    title: 'Small-city founders are building for different markets',
    subtitle: 'The startup story is no longer only a major-hub story. It is quietly moving into cities that most decks ignore.',
    author: 'fortyfive desk', date: 'Jun 05, 2025', readTime: '6 min read', kind: 'Feature',
    inBrief: 'Founders outside the most obvious hubs are building companies that look nothing like their metro counterparts. That is the point.',
    bottomLine: 'The next generation of founders will come from cities many investors still underread.',
    body: [{ type: 'p', text: 'The default startup profile is quietly losing its grip as talent, customers, and capital spread into a wider set of cities.' }],
  },
  {
    slug: 'consumer-internet-boring',
    category: 'tech',
    title: 'The next consumer internet winners may look boring',
    subtitle: 'The most valuable consumer internet companies of the next decade will not look like the ones we celebrate today.',
    author: 'fortyfive desk', date: 'Jun 04, 2025', readTime: '5 min read', kind: 'Opinion',
    inBrief: 'The next generation of winners will look boring, focused, and unglamorous. That is exactly why they will win.',
    bottomLine: 'The best consumer internet business of the next decade is probably already boring.',
    body: [{ type: 'p', text: 'The most successful consumer internet companies rarely look impressive on day one.' }],
  },
  {
    slug: 'startup-decade-outside-obvious-cities',
    category: 'opinion',
    title: 'The next startup decade will be built outside obvious cities',
    subtitle: 'The next wave of large companies will not come only from the same cities we keep pointing cameras at.',
    author: 'fortyfive desk', date: 'Jun 03, 2025', readTime: '8 min read', kind: 'Deep Read',
    deepRead: true,
    inBrief: 'Look past the usual hubs. The interesting founders are already elsewhere.',
    bottomLine: 'The next decade of startups belongs to founders many decks still ignore.',
    body: [{ type: 'p', text: 'There is a comforting narrative about startups that keeps repeating itself.' }],
  },
  {
    slug: 'indian-ai-not-chatbots',
    category: 'ai',
    title: 'The AI opportunity is not just chatbots',
    subtitle: 'Everyone is building a chat interface. Almost nobody is building the layer underneath it. That is where the durable AI opportunity sits.',
    author: 'fortyfive desk', date: 'Jun 02, 2025', readTime: '9 min read', kind: 'Deep Read',
    deepRead: true,
    inBrief: 'The AI opportunity is not the demo. It is the infrastructure — data, deployment, and workflow — behind it.',
    bottomLine: 'Markets will not win at AI by building the smartest chatbot alone. They will win by building the stack under it.',
    body: [{ type: 'p', text: 'It is easy to look at the current AI landscape and mistake activity for opportunity.' }],
  },
  {
    slug: 'distribution-startup-moat',
    category: 'growth',
    title: 'Why distribution is becoming the real startup moat',
    subtitle: 'Product parity is now the default. The real moat is who can put the product in front of the right customer, cheaply, again and again.',
    author: 'fortyfive desk', date: 'Jun 01, 2025', readTime: '7 min read', kind: 'Deep Read',
    deepRead: true,
    inBrief: 'Distribution — not product, not brand — is emerging as the single hardest thing to copy in startups.',
    bottomLine: 'In a market this competitive, distribution is the moat. Everything else can be rebuilt.',
    body: [{ type: 'p', text: 'The old startup wisdom was simple: build a great product and customers will find you.' }],
  },
];

export const FUNDING = [
  { name: 'NovaAI', amount: 'Seed', detail: 'raises seed round to build workflow automation tools', date: 'Jun 12' },
  { name: 'KiranaGrid', amount: 'Series A', detail: 'raises Series A for commerce infrastructure', date: 'Jun 11' },
  { name: 'PayNest', amount: 'Series B', detail: 'secures funding for credit infrastructure', date: 'Jun 10' },
  { name: 'VoltCart', amount: 'Seed', detail: 'raises seed funding for EV distribution', date: 'Jun 09' },
  { name: 'Loam Labs', amount: 'Pre-Series A', detail: 'closes funding to expand agri-data platform', date: 'Jun 08' },
  { name: 'Trellis Health', amount: 'Series A', detail: 'raises for hospital operations software', date: 'Jun 07' },
];

export const getArticleBySlug = (slug) => ARTICLES.find((a) => a.slug === slug);
export const getArticlesByCategory = (cat) => ARTICLES.filter((a) => a.category === cat);
export const getFeatured = () => ARTICLES.find((a) => a.featured);
export const getDeepReads = () => ARTICLES.filter((a) => a.deepRead);
export const getLatest = (limit = 8) => ARTICLES.filter((a) => !a.featured).slice(0, limit);
export const getRelated = (article, limit = 3) =>
  ARTICLES.filter((a) => a.slug !== article.slug && a.category === article.category).slice(0, limit);
export const getCategory = (slug) => CATEGORIES.find((c) => c.slug === slug);
