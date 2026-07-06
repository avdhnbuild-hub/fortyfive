// Mock data for fortyfive. Structured so it can later be swapped for a CMS.

export const CATEGORIES = [
  { slug: 'startups', name: 'Startups', tagline: 'Founder stories, company-building, launches, pivots, and startup strategy.' },
  { slug: 'tech', name: 'Technology', tagline: 'AI, software, products, platforms, infrastructure, and digital markets.' },
  { slug: 'funding', name: 'Funding', tagline: 'Capital movement, investors, acquisitions, and private-market signals.' },
  { slug: 'growth', name: 'Growth', tagline: 'Distribution, revenue, GTM, retention, and business models.' },
  { slug: 'ai', name: 'AI', tagline: 'AI startups, products, infrastructure, adoption, and strategy.' },
  { slug: 'opinion', name: 'Opinion', tagline: 'Sharp takes on startups, technology, capital, and markets.' },
];

export const ARTICLES = [
  {
    slug: 'why-most-startup-news-is-hard-to-use',
    category: 'opinion',
    title: 'Why most startup news is hard to use',
    subtitle:
      'Funding announcements tell you what happened. They rarely tell you what changed. fortyfive starts from the second question.',
    summary:
      'Funding announcements tell you what happened. They rarely tell you what changed. fortyfive starts from the second question.',
    author: 'fortyfive desk',
    date: 'Jul 05, 2026',
    readTime: '5 min read',
    kind: 'Essay',
    featured: true,
    deepRead: true,
    inBrief:
      'Most startup coverage stops at announcements. The useful question is not only who raised money, launched a product, or entered a market. The useful question is what the story reveals about customers, capital, distribution, timing, and taste.',
    pullQuote:
      'The useful question is not just what happened. It is what changed.',
    seoTitle: 'Why most startup news is hard to use',
    seoDescription:
      'Funding announcements tell you what happened. They rarely tell you what changed. fortyfive starts from the second question.',
    bottomLine:
      'The goal is simple: fewer empty updates, more useful context.',
    body: [
      { type: 'h2', text: 'What startup news usually misses' },
      { type: 'p', text: 'Startup news often treats the announcement as the story. A funding round, launch, hire, market entry, or shutdown gets turned into a neat update. The facts matter, but facts without context do not travel very far.' },
      { type: 'p', text: 'The harder work is asking what changed. Did customers behave differently? Did capital move toward a new kind of company? Did a category become easier to enter, harder to defend, or more expensive to grow?' },
      { type: 'h2', text: 'Why context matters more than noise' },
      { type: 'p', text: 'Readers do not need more names, numbers, and quotes stacked in a familiar order. They need to know why a story deserves attention, what it says about a market, and what may be easy to misunderstand.' },
      { type: 'blockquote', text: 'The useful question is not just what happened. It is what changed.' },
      { type: 'h2', text: 'How fortyfive will cover companies' },
      { type: 'p', text: 'fortyfive will cover companies as parts of larger systems: customers, capital, distribution, regulation, product taste, hiring, and timing. A company story is rarely only about a company.' },
      { type: 'p', text: 'That means fewer empty updates and more careful reading. Sometimes the most useful part of a story is not the headline, but the shift underneath it.' },
      { type: 'h2', text: 'What readers should expect' },
      { type: 'p', text: 'Expect short, clear stories that respect your time. Expect analysis that explains the business logic without pretending every move is historic. Expect judgment, not noise.' },
    ],
  },
  {
    slug: 'ai-products-are-entering-their-distribution-era',
    category: 'ai',
    title: 'AI products are entering their distribution era',
    subtitle:
      'The first wave of AI products won attention through demos. The next wave will have to win through workflow, trust, and repeated use.',
    summary:
      'The first wave of AI products won attention through demos. The next wave will have to win through workflow, trust, and repeated use.',
    author: 'fortyfive desk',
    date: 'Jul 05, 2026',
    readTime: '6 min read',
    kind: 'Analysis',
    inBrief:
      'AI products are moving from novelty to utility. The question is no longer whether something looks impressive in a demo. The question is whether it fits into a real workflow often enough to become necessary.',
    pullQuote:
      'The hardest part of AI may not be generation. It may be adoption.',
    seoTitle: 'AI products are entering their distribution era',
    seoDescription:
      'AI products are moving from novelty to utility, where workflow, trust, and repeated use matter more than demos.',
    bottomLine:
      'AI is becoming less about surprise and more about repeated utility.',
    body: [
      { type: 'h2', text: 'The demo phase' },
      { type: 'p', text: 'The first phase of AI products was built for surprise. A good demo could make a product feel inevitable. It showed that the model could write, summarize, generate, classify, search, or answer in ways that felt new.' },
      { type: 'p', text: 'That phase mattered. It helped users understand what had become possible. But demos are not habits. A product that impresses once still has to earn a place in the work people repeat every day.' },
      { type: 'h2', text: 'Why distribution is harder than model access' },
      { type: 'p', text: 'Model access keeps getting easier. Distribution does not. The hard part is reaching the right buyer, fitting into existing systems, earning trust, and becoming useful enough that teams return without being pushed.' },
      { type: 'blockquote', text: 'The hardest part of AI may not be generation. It may be adoption.' },
      { type: 'h2', text: 'What buyers actually care about' },
      { type: 'p', text: 'Buyers care about accuracy, reliability, security, workflow fit, and measurable time saved. They care less about whether a product sounds futuristic and more about whether it helps a team do one painful thing better.' },
      { type: 'h2', text: 'What founders should watch' },
      { type: 'p', text: 'Watch repeat usage, not curiosity. Watch workflow ownership, not prompt quality alone. Watch whether a product becomes part of a team ritual, budget line, or operating process.' },
    ],
  },
  {
    slug: 'distribution-is-becoming-the-real-startup-moat',
    category: 'growth',
    title: 'Distribution is becoming the real startup moat',
    subtitle:
      'Products are easier to build than ever. Getting trusted, chosen, paid for, and remembered is the harder problem.',
    summary:
      'Products are easier to build than ever. Getting trusted, chosen, paid for, and remembered is the harder problem.',
    author: 'fortyfive desk',
    date: 'Jul 05, 2026',
    readTime: '6 min read',
    kind: 'Analysis',
    deepRead: true,
    inBrief:
      'Software has become easier to create, but that has made distribution more valuable. The companies that win are often not the ones with the first product, but the ones with the clearest route to customers.',
    pullQuote:
      'In a crowded market, distribution is not a department. It is the business.',
    seoTitle: 'Distribution is becoming the real startup moat',
    seoDescription:
      'Products are easier to build than ever. Distribution is becoming the harder and more durable advantage.',
    bottomLine:
      'A good product matters. A believable path to customers matters more.',
    body: [
      { type: 'h2', text: 'Why building is no longer enough' },
      { type: 'p', text: 'Building software has become cheaper, faster, and more accessible. That is good for founders, but it also means more products now arrive in the same inbox, feed, marketplace, and budget meeting.' },
      { type: 'p', text: 'The result is simple: a working product is no longer enough. Customers need a reason to notice it, trust it, choose it, and keep using it.' },
      { type: 'h2', text: 'The cost of being ignored' },
      { type: 'p', text: 'A startup can lose without being beaten directly. It can lose because the buyer never hears about it, because the category is confusing, because switching feels risky, or because the product is not remembered at the right moment.' },
      { type: 'blockquote', text: 'In a crowded market, distribution is not a department. It is the business.' },
      { type: 'h2', text: 'Trust as distribution' },
      { type: 'p', text: 'Trust is one of the strongest forms of distribution. A recommendation, credible founder, useful point of view, respected customer, or clear category position can reduce the work required to be taken seriously.' },
      { type: 'h2', text: 'What this changes for founders' },
      { type: 'p', text: 'Founders need to design distribution as early as product. That means knowing who the buyer is, where trust comes from, why the timing matters, and how the product will be remembered.' },
    ],
  },
  {
    slug: 'funding-headlines-are-not-the-whole-story',
    category: 'funding',
    title: 'Funding headlines are not the whole story',
    subtitle:
      'A funding round is useful information, but it is not a verdict. The better question is what the capital is meant to prove.',
    summary:
      'A funding round is useful information, but it is not a verdict. The better question is what the capital is meant to prove.',
    author: 'fortyfive desk',
    date: 'Jul 05, 2026',
    readTime: '5 min read',
    kind: 'Explainer',
    inBrief:
      'Funding news is easy to overread. A round can signal momentum, but it can also signal pressure. To understand capital, readers need to ask what milestone the money is supposed to unlock.',
    pullQuote:
      'A funding round is not a finish line. It is a clock.',
    seoTitle: 'Funding headlines are not the whole story',
    seoDescription:
      'A funding round is useful information, but it is not a verdict. The better question is what the capital is meant to prove.',
    bottomLine:
      'Capital is not the story. What a company does with it is.',
    body: [
      { type: 'h2', text: 'What a funding round tells you' },
      { type: 'p', text: 'A funding round tells you that a company convinced investors to take a position at a specific moment. It may suggest momentum, ambition, category interest, or a belief that the company can reach a larger milestone.' },
      { type: 'h2', text: 'What it does not tell you' },
      { type: 'p', text: 'It does not tell you whether the company will win. It does not prove customer love, durable margins, operational strength, or good timing. Capital can buy time, but it cannot remove the need to execute.' },
      { type: 'blockquote', text: 'A funding round is not a finish line. It is a clock.' },
      { type: 'h2', text: 'Why round size can mislead' },
      { type: 'p', text: 'Large rounds create attention, but they also create expectations. A smaller round with a clear use of funds can be healthier than a larger round that forces the company to grow into an expensive story.' },
      { type: 'h2', text: 'What to watch after the announcement' },
      { type: 'p', text: 'Watch hiring, product cadence, customer quality, pricing, burn, and the next proof point. The real story begins after the announcement, when the company has to turn capital into progress.' },
    ],
  },
  {
    slug: 'the-next-media-brand-for-builders-should-be-useful-first',
    category: 'startups',
    title: 'The next media brand for builders should be useful first',
    subtitle:
      'fortyfive is built around a simple belief: ambitious readers do not need more noise. They need clearer ways to read what is changing.',
    summary:
      'fortyfive is built around a simple belief: ambitious readers do not need more noise. They need clearer ways to read what is changing.',
    author: 'fortyfive desk',
    date: 'Jul 05, 2026',
    readTime: '4 min read',
    kind: 'Launch Essay',
    deepRead: true,
    inBrief:
      'The internet has enough takes, threads, summaries, and announcements. fortyfive exists to make startup and technology stories easier to understand, without turning them into hype or homework.',
    pullQuote:
      'A publication earns attention by respecting it.',
    seoTitle: 'The next media brand for builders should be useful first',
    seoDescription:
      'fortyfive is built for ambitious readers who want startup and technology stories explained with care and restraint.',
    bottomLine:
      'The aim is not to publish the most. The aim is to make each story useful.',
    body: [
      { type: 'h2', text: 'Why fortyfive exists' },
      { type: 'p', text: 'fortyfive exists because startup and technology coverage often makes smart readers do too much work. A useful story should not bury the point, inflate the stakes, or confuse motion with meaning.' },
      { type: 'h2', text: 'What we will cover' },
      { type: 'p', text: 'We will cover startups, technology, capital, AI, growth, markets, and the companies shaping what comes next. The common thread is not a sector label. It is whether the story helps readers understand how companies are built, funded, sold, adopted, and remembered.' },
      { type: 'blockquote', text: 'A publication earns attention by respecting it.' },
      { type: 'h2', text: 'What we will avoid' },
      { type: 'p', text: 'We will avoid empty hype, lazy certainty, recycled announcements, and exaggerated language. Not every launch is important. Not every round is validation. Not every trend is a shift.' },
      { type: 'h2', text: 'How to read us' },
      { type: 'p', text: 'Read fortyfive as a filter. The goal is to help you spend less time sorting through noise and more time understanding what a story means for builders, operators, students, and investors.' },
    ],
  },
  {
    slug: 'why-small-teams-can-now-look-much-larger-than-they-are',
    category: 'tech',
    title: 'Why small teams can now look much larger than they are',
    subtitle:
      'AI tools, better software, and internet distribution are changing what a small team can build, sell, and operate.',
    summary:
      'AI tools, better software, and internet distribution are changing what a small team can build, sell, and operate.',
    author: 'fortyfive desk',
    date: 'Jul 05, 2026',
    readTime: '5 min read',
    kind: 'Analysis',
    inBrief:
      'The gap between a small team and a large company is changing. Small teams can now ship faster, automate more, and reach markets that once required heavier organizations.',
    pullQuote:
      'The advantage is not having tools. The advantage is knowing what to do with them.',
    seoTitle: 'Why small teams can now look much larger than they are',
    seoDescription:
      'AI tools, better software, and internet distribution are changing what small teams can build, sell, and operate.',
    bottomLine:
      'Small teams have more leverage than before, but leverage still needs judgment.',
    body: [
      { type: 'h2', text: 'The leverage shift' },
      { type: 'p', text: 'Small teams can now do work that once required larger organizations. They can automate support, draft sales material, analyze usage, ship faster, and reach customers through channels that did not exist a generation ago.' },
      { type: 'h2', text: 'What tools actually change' },
      { type: 'p', text: 'Tools reduce the cost of coordination and production. They help small teams move faster, test more ideas, and cover more surface area. That does not remove the need for judgment. It raises the value of it.' },
      { type: 'blockquote', text: 'The advantage is not having tools. The advantage is knowing what to do with them.' },
      { type: 'h2', text: 'Where small teams still struggle' },
      { type: 'p', text: 'Small teams still face limits: attention, trust, hiring, distribution, capital, and focus. Software can make a team look larger, but customers still care about reliability and follow-through.' },
      { type: 'h2', text: 'Why taste matters more now' },
      { type: 'p', text: 'When more people can build, taste becomes more visible. The difference is often in what a team chooses not to ship, how clearly it explains the product, and how well it understands the customer.' },
    ],
  },
  {
    slug: 'why-markets-reward-clarity',
    category: 'markets',
    categoryName: 'Markets',
    title: 'Why markets reward clarity',
    subtitle:
      'Customers, investors, and employees all respond to the same thing: a company that can explain what it is, why it matters, and why now.',
    summary:
      'Customers, investors, and employees all respond to the same thing: a company that can explain what it is, why it matters, and why now.',
    author: 'fortyfive desk',
    date: 'Jul 05, 2026',
    readTime: '5 min read',
    kind: 'Essay',
    deepRead: true,
    inBrief:
      'Markets are noisy. Clarity helps companies cut through that noise. The best companies are often unusually good at explaining what problem they solve and why the timing matters.',
    pullQuote:
      'A company that cannot explain itself makes every other task harder.',
    seoTitle: 'Why markets reward clarity',
    seoDescription:
      'Customers, investors, and employees respond to companies that can explain what they are, why they matter, and why now.',
    bottomLine:
      'Clarity is not decoration. It is operating leverage.',
    body: [
      { type: 'h2', text: 'The cost of confusion' },
      { type: 'p', text: 'Confusion is expensive. It slows sales, weakens hiring, makes fundraising harder, and gives customers a reason to wait. If a company cannot explain itself, the market will not do that work for it.' },
      { type: 'h2', text: 'Why simple stories travel' },
      { type: 'p', text: 'Simple does not mean shallow. A simple story gives people a handle. It helps them repeat the idea accurately, compare it with alternatives, and understand why the company matters now.' },
      { type: 'blockquote', text: 'A company that cannot explain itself makes every other task harder.' },
      { type: 'h2', text: 'What clarity signals' },
      { type: 'p', text: 'Clarity signals discipline. It shows that a company understands its customer, category, timing, and tradeoffs. It also makes the business easier to evaluate.' },
      { type: 'h2', text: 'How companies lose it' },
      { type: 'p', text: 'Companies lose clarity when they chase too many audiences, stretch the product story, or confuse internal ambition with external relevance. The market usually notices before the company does.' },
    ],
  },
];

export const FUNDING = [
  { name: 'Funding headlines', amount: 'Explainer', detail: 'are useful information, but they are not a verdict', date: 'Launch' },
  { name: 'Round size', amount: 'Analysis', detail: 'can create attention while hiding the milestone that matters', date: 'Launch' },
  { name: 'Capital strategy', amount: 'Explainer', detail: 'starts with what the money is meant to prove next', date: 'Launch' },
  { name: 'After the announcement', amount: 'Watchlist', detail: 'watch customers, hiring, burn, product cadence, and the next proof point', date: 'Launch' },
];

export const getArticleBySlug = (slug) => ARTICLES.find((a) => a.slug === slug);
export const getArticlesByCategory = (cat) => ARTICLES.filter((a) => a.category === cat);
export const getFeatured = () => ARTICLES.find((a) => a.featured);
export const getDeepReads = () => ARTICLES.filter((a) => a.deepRead);
export const getLatest = (limit = 8) => ARTICLES.filter((a) => !a.featured).slice(0, limit);
export const getRelated = (article, limit = 3) =>
  ARTICLES.filter((a) => a.slug !== article.slug && a.category === article.category).slice(0, limit);
export const getCategory = (slug) => CATEGORIES.find((c) => c.slug === slug);
