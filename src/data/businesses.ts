export type Business = {
  id: string;
  /** Confidential project codename — real identity released under NDA. */
  code: string;
  headline: string;
  summary: string;
  category: string;
  model: string;
  geography: string;
  market: string;
  founded: string;
  teamSize: string;
  price: string;
  priceBand: string;
  mrr: string;
  arr: string;
  revenue: string;
  sde: string;
  grossMargin: string;
  growthRate: string;
  churn: string;
  customers: string;
  arpu: string;
  multiple: string;
  tags: string[];
  stack: string[];
  highlights: string[];
  growthProfile: string[];
  operations: string[];
  reasonForSale: string;
  structure: string[];
  confidential: string[];
};

export const businesses: Business[] = [
  {
    id: "project-helix",
    code: "Project Helix",
    headline: "AI document intelligence for regulated B2B teams",
    summary:
      "An AI Micro SaaS extracting structured data from contracts and filings for compliance teams. Annual prepaid contracts across a concentrated, high-retention B2B base.",
    category: "AI SaaS",
    model: "Annual B2B subscription",
    geography: "United States",
    market: "Compliance & legal operations",
    founded: "2021",
    teamSize: "3 (founder + 2 contractors)",
    price: "$1,850,000",
    priceBand: "$1.5M – $2M",
    mrr: "$52K",
    arr: "$624K",
    revenue: "$610K TTM",
    sde: "$412K",
    grossMargin: "89%",
    growthRate: "+41% YoY",
    churn: "1.4% monthly logo churn",
    customers: "68 accounts",
    arpu: "$765 / mo",
    multiple: "3.0× revenue · 4.5× SDE",
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
    code: "Project Northlane",
    headline: "Vertical SaaS for regional logistics dispatch teams",
    summary:
      "A vertical Micro SaaS serving dispatch operations at small freight carriers. Deeply embedded in daily workflow with exceptional retention and predictable seat expansion.",
    category: "Vertical SaaS",
    model: "Per-seat monthly subscription",
    geography: "Canada",
    market: "Freight & logistics",
    founded: "2019",
    teamSize: "4",
    price: "$1,240,000",
    priceBand: "$1M – $1.5M",
    mrr: "$34K",
    arr: "$408K",
    revenue: "$396K TTM",
    sde: "$248K",
    grossMargin: "84%",
    growthRate: "+22% YoY",
    churn: "0.9% monthly logo churn",
    customers: "142 accounts",
    arpu: "$239 / mo",
    multiple: "3.1× revenue · 5.0× SDE",
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
    code: "Project Quill",
    headline: "Developer SaaS for API observability and contract testing",
    summary:
      "A developer-focused Micro SaaS adopted bottom-up by engineering teams. Self-serve conversion with a strong free-to-paid funnel and negligible support burden.",
    category: "Developer Tools",
    model: "Self-serve subscription",
    geography: "United Kingdom",
    market: "Developer infrastructure",
    founded: "2020",
    teamSize: "2",
    price: "$780,000",
    priceBand: "$500K – $1M",
    mrr: "$21K",
    arr: "$252K",
    revenue: "$249K TTM",
    sde: "$178K",
    grossMargin: "91%",
    growthRate: "+34% YoY",
    churn: "2.1% monthly logo churn",
    customers: "410 accounts",
    arpu: "$51 / mo",
    multiple: "3.1× revenue · 4.4× SDE",
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
    operations: [
      "Under 10 support tickets per week",
      "Automated billing, provisioning and dunning",
    ],
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
    code: "Project Verdant",
    headline: "Marketing SaaS for multi-location brand compliance",
    summary:
      "A marketing Micro SaaS used by franchise marketing teams to control brand assets across locations. Annual contracts with strong seasonal renewal concentration.",
    category: "Marketing SaaS",
    model: "Annual B2B subscription",
    geography: "United States",
    market: "Franchise marketing",
    founded: "2018",
    teamSize: "5",
    price: "$1,420,000",
    priceBand: "$1M – $1.5M",
    mrr: "$41K",
    arr: "$492K",
    revenue: "$486K TTM",
    sde: "$284K",
    grossMargin: "81%",
    growthRate: "+16% YoY",
    churn: "1.1% monthly logo churn",
    customers: "54 accounts",
    arpu: "$759 / mo",
    multiple: "2.9× revenue · 5.0× SDE",
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
    operations: [
      "Customer success lead retained post-close",
      "Documented account handover process",
    ],
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
    code: "Project Cadence",
    headline: "Automation SaaS connecting finance and operations systems",
    summary:
      "An automation Micro SaaS moving structured data between accounting and operations tools. Usage-based revenue with high switching costs once implemented.",
    category: "Automation SaaS",
    model: "Usage-based subscription",
    geography: "Germany",
    market: "Back-office automation",
    founded: "2021",
    teamSize: "3",
    price: "$640,000",
    priceBand: "$500K – $1M",
    mrr: "$17K",
    arr: "$204K",
    revenue: "$198K TTM",
    sde: "$142K",
    grossMargin: "86%",
    growthRate: "+48% YoY",
    churn: "1.7% monthly logo churn",
    customers: "96 accounts",
    arpu: "$177 / mo",
    multiple: "3.2× revenue · 4.5× SDE",
    tags: ["Verified", "Profitable", "Founder-led", "High Growth", "B2B"],
    stack: ["TypeScript", "Temporal", "Postgres", "Hetzner"],
    highlights: [
      "Revenue expands automatically with customer volume",
      "Implementation creates meaningful switching cost",
      "Fastest growth rate in the current mandate set",
    ],
    growthProfile: [
      "Only two of eight planned connectors are live",
      "No presence outside the DACH region",
    ],
    operations: ["Founder-led with one engineer and one support contractor"],
    reasonForSale: "Founder prefers building to operating at scale.",
    structure: ["Cash at close", "Earn-out considered on connector milestones"],
    confidential: [
      "Usage and volume data by account",
      "Verified P&L and infrastructure costs",
    ],
  },
  {
    id: "project-ledgerline",
    code: "Project Ledgerline",
    headline: "FinTech SaaS for reconciliation at small accounting firms",
    summary:
      "A FinTech Micro SaaS automating month-end reconciliation for boutique accounting practices. Highly seasonal usage with exceptional renewal behaviour.",
    category: "FinTech SaaS",
    model: "Annual subscription",
    geography: "Australia",
    market: "Accounting services",
    founded: "2019",
    teamSize: "4",
    price: "$1,060,000",
    priceBand: "$1M – $1.5M",
    mrr: "$29K",
    arr: "$348K",
    revenue: "$341K TTM",
    sde: "$212K",
    grossMargin: "87%",
    growthRate: "+19% YoY",
    churn: "1.0% monthly logo churn",
    customers: "121 firms",
    arpu: "$240 / mo",
    multiple: "3.1× revenue · 5.0× SDE",
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
    reasonForSale: "Founder is retiring from day-to-day operations.",
    structure: ["Cash at close", "Six-month advisory availability"],
    confidential: [
      "Firm-level renewal data",
      "Verified financials and tax filings",
    ],
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
