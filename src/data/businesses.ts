export type Business = {
  id: string;
  name: string;
  code: string;
  headline: string;
  summary: string;
  category: string;
  model: string;
  geography: string;
  market: string;
  founded: string;
  age: string;
  ageYears: number;
  teamSize: string;
  price: string;
  priceNum: number;
  priceBand: string;
  mrr: string;
  mrrNum: number;
  arr: string;
  arrNum: number;
  revenue: string;
  profit: string;
  profitNum: number;
  sde: string;
  grossMargin: string;
  growthRate: string;
  growthNum: number;
  churn: string;
  customers: string;
  arpu: string;
  multiple: string;
  verified: boolean;
  hue: number;
  tags: string[];
  stack: string[];
  highlights: string[];
  growthProfile: string[];
  operations: string[];
  assets: string[];
  traffic: string;
  reasonForSale: string;
  structure: string[];
  confidential: string[];
};

export const businesses: Business[] = [
  {
    id: "project-helix",
    name: "Helix",
    code: "Project Helix",
    headline: "AI document intelligence for regulated B2B teams",
    summary:
      "An AI SaaS extracting structured data from contracts and filings for compliance teams. Annual prepaid contracts across a concentrated, high-retention B2B base.",
    category: "AI SaaS",
    model: "Annual B2B subscription",
    geography: "United States",
    market: "Compliance & legal operations",
    founded: "2021",
    age: "5 years",
    ageYears: 5,
    teamSize: "3 (founder + 2 contractors)",
    price: "$1,850,000",
    priceNum: 1850000,
    priceBand: "$1.5M – $2M",
    mrr: "$52K",
    mrrNum: 52000,
    arr: "$624K",
    arrNum: 624000,
    revenue: "$610K TTM",
    profit: "$34K / mo",
    profitNum: 34000,
    sde: "$412K",
    grossMargin: "89%",
    growthRate: "+41% YoY",
    growthNum: 41,
    churn: "1.4% monthly",
    customers: "68 accounts",
    arpu: "$765 / mo",
    multiple: "3.0× revenue · 4.5× SDE",
    verified: true,
    hue: 163,
    tags: ["Verified", "Profitable", "Founder-led", "AI", "B2B", "High Growth"],
    stack: ["Next.js", "Python", "Postgres", "AWS"],
    highlights: [
      "Net revenue retention above 115% for six consecutive quarters",
      "74% of ARR contracted annually and prepaid",
      "Zero paid acquisition — pipeline is inbound and referral driven",
      "Owner operates under 15 hours per week",
    ],
    growthProfile: [
      "EMEA expansion with no outbound motion to date",
      "Usage-based tier modelled at a material ARR uplift",
      "Two signed integration partners not yet monetised",
    ],
    operations: [
      "Founder handles product direction and enterprise calls only",
      "Support handled by one part-time contractor",
      "Documented runbooks for onboarding and incident response",
    ],
    assets: [
      "Full source code and IP assignment",
      "Domain, trademarks and brand assets",
      "Stripe billing and customer records",
      "Documentation and SOPs",
    ],
    traffic: "48K monthly visits · 72% direct / organic",
    reasonForSale: "Founder is committing full time to a new venture.",
    structure: [
      "Cash at close preferred; limited seller note considered",
      "60-day transition support included",
      "Asset or share purchase both acceptable",
    ],
    confidential: [
      "Customer list and concentration analysis",
      "Full P&L, bank statements and Stripe exports",
      "Codebase review and technical due diligence pack",
    ],
  },
  {
    id: "project-northlane",
    name: "Northlane",
    code: "Project Northlane",
    headline: "Vertical SaaS for regional logistics dispatch teams",
    summary:
      "A vertical SaaS serving dispatch operations at small freight carriers. Deeply embedded in daily workflow with exceptional retention and predictable seat expansion.",
    category: "Vertical SaaS",
    model: "Per-seat monthly subscription",
    geography: "Canada",
    market: "Freight & logistics",
    founded: "2019",
    age: "7 years",
    ageYears: 7,
    teamSize: "4",
    price: "$1,240,000",
    priceNum: 1240000,
    priceBand: "$1M – $1.5M",
    mrr: "$34K",
    mrrNum: 34000,
    arr: "$408K",
    arrNum: 408000,
    revenue: "$396K TTM",
    profit: "$21K / mo",
    profitNum: 21000,
    sde: "$248K",
    grossMargin: "84%",
    growthRate: "+22% YoY",
    growthNum: 22,
    churn: "0.9% monthly",
    customers: "142 accounts",
    arpu: "$239 / mo",
    multiple: "3.1× revenue · 5.0× SDE",
    verified: true,
    hue: 220,
    tags: ["Verified", "Profitable", "Founder-led", "B2B"],
    stack: ["React", "Node.js", "MySQL", "GCP"],
    highlights: [
      "Sub-1% monthly churn across seven years of operation",
      "Workflow-critical system of record for daily dispatch",
      "Seat expansion drives roughly a third of net new revenue",
    ],
    growthProfile: [
      "Adjacent verticals identified with near-identical workflow",
      "Pricing has not been revised since 2022",
      "Telematics integrations requested by a majority of accounts",
    ],
    operations: [
      "Two support staff on documented shifts",
      "Release cadence of two deployments per month",
      "No key-person dependency outside the founder's roadmap role",
    ],
    assets: [
      "Source code and cloud infrastructure",
      "Customer contracts and billing history",
      "Training materials and support macros",
    ],
    traffic: "19K monthly visits · mostly app-direct",
    reasonForSale: "Founder is relocating and stepping back from operations.",
    structure: [
      "Cash at close with a modest earn-out on seat growth",
      "90-day transition support included",
    ],
    confidential: [
      "Account-level revenue and churn cohort data",
      "Verified financial statements",
      "Infrastructure and security review",
    ],
  },
  {
    id: "project-quill",
    name: "Quill",
    code: "Project Quill",
    headline: "Developer SaaS for API observability and contract testing",
    summary:
      "A developer-focused SaaS adopted bottom-up by engineering teams. Self-serve conversion with a strong free-to-paid funnel and negligible support burden.",
    category: "Developer Tools",
    model: "Self-serve subscription",
    geography: "United Kingdom",
    market: "Developer infrastructure",
    founded: "2020",
    age: "6 years",
    ageYears: 6,
    teamSize: "2",
    price: "$780,000",
    priceNum: 780000,
    priceBand: "$500K – $1M",
    mrr: "$21K",
    mrrNum: 21000,
    arr: "$252K",
    arrNum: 252000,
    revenue: "$249K TTM",
    profit: "$15K / mo",
    profitNum: 15000,
    sde: "$178K",
    grossMargin: "91%",
    growthRate: "+34% YoY",
    growthNum: 34,
    churn: "2.1% monthly",
    customers: "410 accounts",
    arpu: "$51 / mo",
    multiple: "3.1× revenue · 4.4× SDE",
    verified: true,
    hue: 280,
    tags: ["Verified", "Profitable", "Founder-led", "High Growth"],
    stack: ["Go", "TypeScript", "ClickHouse", "Fly.io"],
    highlights: [
      "Fully self-serve — no sales team and no demos",
      "Organic and community-led acquisition",
      "Gross margin above 90% with predictable infrastructure cost",
    ],
    growthProfile: [
      "No team or enterprise tier currently offered",
      "Annual billing option not yet introduced",
      "Marketplace distribution channels unexplored",
    ],
    operations: ["Under 10 support tickets per week", "Automated billing, provisioning and dunning"],
    assets: ["Repository and CI/CD", "Domain and docs site", "Stripe and analytics accounts"],
    traffic: "86K monthly visits · 61% organic / community",
    reasonForSale: "Founders are consolidating around a separate product.",
    structure: ["Cash at close", "30-day transition support included"],
    confidential: [
      "Cohort retention and expansion data",
      "Stripe and hosting cost breakdown",
      "Repository access under NDA",
    ],
  },
  {
    id: "project-verdant",
    name: "Verdant",
    code: "Project Verdant",
    headline: "Marketing SaaS for multi-location brand compliance",
    summary:
      "A marketing SaaS used by franchise marketing teams to control brand assets across locations. Annual contracts with strong seasonal renewal concentration.",
    category: "Marketing SaaS",
    model: "Annual B2B subscription",
    geography: "United States",
    market: "Franchise marketing",
    founded: "2018",
    age: "8 years",
    ageYears: 8,
    teamSize: "5",
    price: "$1,420,000",
    priceNum: 1420000,
    priceBand: "$1M – $1.5M",
    mrr: "$41K",
    mrrNum: 41000,
    arr: "$492K",
    arrNum: 492000,
    revenue: "$486K TTM",
    profit: "$24K / mo",
    profitNum: 24000,
    sde: "$284K",
    grossMargin: "81%",
    growthRate: "+16% YoY",
    growthNum: 16,
    churn: "1.1% monthly",
    customers: "54 accounts",
    arpu: "$759 / mo",
    multiple: "2.9× revenue · 5.0× SDE",
    verified: true,
    hue: 145,
    tags: ["Verified", "Profitable", "B2B"],
    stack: ["Rails", "Postgres", "Heroku", "S3"],
    highlights: [
      "Multi-year relationships with the ten largest accounts",
      "Renewal rate above 90% by revenue",
      "Category leadership in a defensible niche",
    ],
    growthProfile: [
      "Upsell modules built but never packaged commercially",
      "Agency reseller channel in early pilot",
    ],
    operations: ["Customer success lead retained post-close", "Documented account handover process"],
    assets: ["Codebase and design system", "Asset library", "Customer contracts"],
    traffic: "22K monthly visits · 54% branded search",
    reasonForSale: "Founder is pursuing a strategic role outside the business.",
    structure: ["Cash at close with a short seller note", "120-day transition"],
    confidential: [
      "Contract terms and renewal schedule",
      "Full financial statements",
      "Account concentration analysis",
    ],
  },
  {
    id: "project-cadence",
    name: "Cadence",
    code: "Project Cadence",
    headline: "Automation SaaS connecting finance and operations systems",
    summary:
      "An automation SaaS moving structured data between accounting and operations tools. Usage-based revenue with high switching costs once implemented.",
    category: "Automation SaaS",
    model: "Usage-based subscription",
    geography: "Germany",
    market: "Back-office automation",
    founded: "2021",
    age: "5 years",
    ageYears: 5,
    teamSize: "3",
    price: "$640,000",
    priceNum: 640000,
    priceBand: "$500K – $1M",
    mrr: "$17K",
    mrrNum: 17000,
    arr: "$204K",
    arrNum: 204000,
    revenue: "$198K TTM",
    profit: "$12K / mo",
    profitNum: 12000,
    sde: "$142K",
    grossMargin: "86%",
    growthRate: "+48% YoY",
    growthNum: 48,
    churn: "1.7% monthly",
    customers: "96 accounts",
    arpu: "$177 / mo",
    multiple: "3.2× revenue · 4.5× SDE",
    verified: true,
    hue: 40,
    tags: ["Verified", "Profitable", "Founder-led", "High Growth", "B2B"],
    stack: ["TypeScript", "Temporal", "Postgres", "Hetzner"],
    highlights: [
      "Revenue expands automatically with customer volume",
      "Implementation creates meaningful switching cost",
      "Fastest growth rate in the current listing set",
    ],
    growthProfile: [
      "Only two of eight planned connectors are live",
      "No presence outside the DACH region",
    ],
    operations: ["Founder-led with one engineer and one support contractor"],
    assets: ["Source code and connectors", "Customer integrations", "Runbooks"],
    traffic: "14K monthly visits · 48% product-led",
    reasonForSale: "Founder prefers building to operating at scale.",
    structure: ["Cash at close", "Earn-out considered on connector milestones"],
    confidential: [
      "Usage and volume data by account",
      "Verified P&L and infrastructure costs",
    ],
  },
  {
    id: "project-ledgerline",
    name: "Ledgerline",
    code: "Project Ledgerline",
    headline: "FinTech SaaS for reconciliation at small accounting firms",
    summary:
      "A FinTech SaaS automating month-end reconciliation for boutique accounting practices. Highly seasonal usage with exceptional renewal behaviour.",
    category: "FinTech SaaS",
    model: "Annual subscription",
    geography: "Australia",
    market: "Accounting services",
    founded: "2019",
    age: "7 years",
    ageYears: 7,
    teamSize: "4",
    price: "$1,060,000",
    priceNum: 1060000,
    priceBand: "$1M – $1.5M",
    mrr: "$29K",
    mrrNum: 29000,
    arr: "$348K",
    arrNum: 348000,
    revenue: "$341K TTM",
    profit: "$18K / mo",
    profitNum: 18000,
    sde: "$212K",
    grossMargin: "87%",
    growthRate: "+19% YoY",
    growthNum: 19,
    churn: "1.0% monthly",
    customers: "121 firms",
    arpu: "$240 / mo",
    multiple: "3.1× revenue · 5.0× SDE",
    verified: true,
    hue: 195,
    tags: ["Verified", "Profitable", "B2B"],
    stack: ["Laravel", "Vue", "Postgres", "AWS"],
    highlights: [
      "Embedded in a compliance-driven monthly workflow",
      "Referral-led growth within a tight professional community",
    ],
    growthProfile: [
      "Adjacent English-speaking markets untouched",
      "Practice-management integrations frequently requested",
    ],
    operations: ["Two support staff; founder handles partnerships only"],
    assets: ["Codebase", "Bank-feed integrations", "Firm onboarding kits"],
    traffic: "11K monthly visits · 70% referral / direct",
    reasonForSale: "Founder is retiring from day-to-day operations.",
    structure: ["Cash at close", "Six-month advisory availability"],
    confidential: ["Firm-level renewal data", "Verified financials and tax filings"],
  },
];

export const categories = [
  "AI SaaS",
  "B2B SaaS",
  "Vertical SaaS",
  "Developer Tools",
  "Productivity",
  "Marketing SaaS",
  "Automation SaaS",
  "Analytics SaaS",
  "FinTech SaaS",
] as const;

export function getCatalogBusiness(id: string): Business | undefined {
  return businesses.find((b) => b.id === id);
}
