export type Business = {
  id: string;
  name: string;
  tagline: string;
  category: string;
  country: string;
  mrr: string;
  arr: string;
  profit: string;
  revenue: string;
  margin: string;
  employees: string;
  founded: string;
  age: string;
  industry: string;
  tech: string[];
  price: string;
  traffic: string;
  customers: string;
  reason: string;
  growth: string[];
  overview: string;
  financials: { label: string; value: string }[];
};

export const businesses: Business[] = [
  {
    id: "helix-ai",
    name: "Helix AI",
    tagline: "Enterprise AI document intelligence platform with Fortune 500 logos.",
    category: "AI SaaS",
    country: "United States",
    mrr: "$182K",
    arr: "$2.18M",
    profit: "$1.24M",
    revenue: "$2.18M",
    margin: "57%",
    employees: "11",
    founded: "2020",
    age: "6 years",
    industry: "Artificial Intelligence",
    tech: ["Next.js", "Python", "PostgreSQL", "AWS", "OpenAI"],
    price: "$8,400,000",
    traffic: "142K / mo",
    customers: "310 accounts",
    reason: "Founder relocating to pursue a new venture in climate tech.",
    growth: [
      "Untapped EMEA enterprise pipeline with zero outbound spend to date",
      "Usage-based pricing tier modelled at +28% ARR uplift",
      "Partner channel via three signed system integrators",
    ],
    overview:
      "Helix AI provides document intelligence infrastructure to regulated enterprises. Net revenue retention has held above 118% for eight consecutive quarters with contractual annual prepayment across 74% of the book.",
    financials: [
      { label: "TTM Revenue", value: "$2,180,000" },
      { label: "TTM Net Profit", value: "$1,240,000" },
      { label: "Gross Margin", value: "88%" },
      { label: "Net Revenue Retention", value: "118%" },
      { label: "Customer Churn (annual)", value: "6.1%" },
      { label: "CAC Payback", value: "9 months" },
    ],
  },
  {
    id: "northlane-ops",
    name: "Northlane Ops",
    tagline: "Vertical SaaS for logistics dispatch teams across North America.",
    category: "Software Company",
    country: "Canada",
    mrr: "$96K",
    arr: "$1.15M",
    profit: "$540K",
    revenue: "$1.15M",
    margin: "47%",
    employees: "7",
    founded: "2018",
    age: "8 years",
    industry: "Logistics Software",
    tech: ["React", "Node.js", "MySQL", "GCP"],
    price: "$3,600,000",
    traffic: "58K / mo",
    customers: "820 accounts",
    reason: "Two co-founders seeking liquidity after eight years of operation.",
    growth: [
      "Pricing has not been raised since 2021 — benchmark suggests +20% headroom",
      "Mobile driver app in beta with 40% of accounts requesting access",
      "Adjacent freight-broker segment fully unaddressed",
    ],
    overview:
      "Northlane Ops is a category-leading dispatch platform serving mid-market carriers. Revenue is 96% recurring on annual contracts with a fully remote, documented operating team in place post-close.",
    financials: [
      { label: "TTM Revenue", value: "$1,150,000" },
      { label: "TTM Net Profit", value: "$540,000" },
      { label: "Gross Margin", value: "81%" },
      { label: "Net Revenue Retention", value: "104%" },
      { label: "Customer Churn (annual)", value: "9.4%" },
      { label: "CAC Payback", value: "13 months" },
    ],
  },
  {
    id: "pixelcart",
    name: "PixelCart",
    tagline: "Top-100 Shopify app for conversion-optimised product bundles.",
    category: "Shopify App",
    country: "United Kingdom",
    mrr: "$54K",
    arr: "$648K",
    profit: "$430K",
    revenue: "$648K",
    margin: "66%",
    employees: "3",
    founded: "2021",
    age: "5 years",
    industry: "E-commerce Infrastructure",
    tech: ["Remix", "Shopify API", "Redis", "Fly.io"],
    price: "$1,950,000",
    traffic: "31K / mo",
    customers: "4,100 merchants",
    reason: "Founder consolidating into a single portfolio company.",
    growth: [
      "App-store ranking supports organic install growth with no paid spend",
      "Annual plan option not yet launched",
      "Clear expansion path into BigCommerce and Wix marketplaces",
    ],
    overview:
      "PixelCart operates almost entirely on organic Shopify App Store distribution. Operating overhead is minimal with two contractors covering support and engineering.",
    financials: [
      { label: "TTM Revenue", value: "$648,000" },
      { label: "TTM Net Profit", value: "$430,000" },
      { label: "Gross Margin", value: "92%" },
      { label: "Net Revenue Retention", value: "99%" },
      { label: "Merchant Churn (monthly)", value: "3.2%" },
      { label: "CAC Payback", value: "Organic" },
    ],
  },
  {
    id: "quantfolio",
    name: "Quantfolio Letter",
    tagline: "Premium finance newsletter with 78K engaged subscribers.",
    category: "Newsletter",
    country: "Singapore",
    mrr: "$41K",
    arr: "$492K",
    profit: "$372K",
    revenue: "$492K",
    margin: "76%",
    employees: "2",
    founded: "2019",
    age: "7 years",
    industry: "Media & Publishing",
    tech: ["Beehiiv", "Stripe", "Webflow"],
    price: "$1,480,000",
    traffic: "78K subscribers",
    customers: "3,900 paid members",
    reason: "Editor moving into a full-time fund management role.",
    growth: [
      "Sponsorship inventory sold out 6 months ahead — rate card underpriced",
      "No paid acquisition has ever been run",
      "Community and events tier validated by subscriber survey",
    ],
    overview:
      "Quantfolio Letter monetises through paid memberships and premium sponsorships, with a 52% open rate and audience concentrated in institutional finance.",
    financials: [
      { label: "TTM Revenue", value: "$492,000" },
      { label: "TTM Net Profit", value: "$372,000" },
      { label: "Gross Margin", value: "94%" },
      { label: "Open Rate", value: "52%" },
      { label: "Member Churn (monthly)", value: "2.4%" },
      { label: "Sponsor Renewal Rate", value: "86%" },
    ],
  },
  {
    id: "tabflow",
    name: "TabFlow",
    tagline: "Chrome extension for workspace tab management, 340K installs.",
    category: "Chrome Extension",
    country: "Germany",
    mrr: "$28K",
    arr: "$336K",
    profit: "$246K",
    revenue: "$336K",
    margin: "73%",
    employees: "2",
    founded: "2020",
    age: "6 years",
    industry: "Productivity Software",
    tech: ["TypeScript", "Chrome API", "Supabase"],
    price: "$980,000",
    traffic: "340K installs",
    customers: "9,600 paid users",
    reason: "Founder returning to a full-time engineering role.",
    growth: [
      "Team and enterprise licensing not yet offered",
      "Edge and Firefox ports would extend reach by an estimated 30%",
      "Free-to-paid conversion at 2.8% versus 5%+ category benchmark",
    ],
    overview:
      "TabFlow has a durable install base with best-in-class ratings and near-zero acquisition cost. The codebase is compact and well documented.",
    financials: [
      { label: "TTM Revenue", value: "$336,000" },
      { label: "TTM Net Profit", value: "$246,000" },
      { label: "Gross Margin", value: "95%" },
      { label: "Free-to-Paid Conversion", value: "2.8%" },
      { label: "User Churn (monthly)", value: "4.1%" },
      { label: "Store Rating", value: "4.8 / 5" },
    ],
  },
  {
    id: "verdant-supply",
    name: "Verdant Supply",
    tagline: "DTC sustainable homeware brand with 62% repeat purchase rate.",
    category: "E-commerce Brand",
    country: "Australia",
    mrr: "$134K",
    arr: "$1.61M",
    profit: "$402K",
    revenue: "$1.61M",
    margin: "25%",
    employees: "9",
    founded: "2017",
    age: "9 years",
    industry: "Consumer Goods",
    tech: ["Shopify Plus", "Klaviyo", "3PL"],
    price: "$1,720,000",
    traffic: "210K / mo",
    customers: "48,000 customers",
    reason: "Founders exiting to focus on a wholesale manufacturing business.",
    growth: [
      "Subscription refill programme validated in pilot at 18% attach",
      "Retail wholesale channel entirely unexploited",
      "Email flows contribute only 14% of revenue versus 30% benchmark",
    ],
    overview:
      "Verdant Supply combines a strong owned-audience position with resilient repeat purchase behaviour and a fully outsourced fulfilment stack.",
    financials: [
      { label: "TTM Revenue", value: "$1,610,000" },
      { label: "TTM Net Profit", value: "$402,000" },
      { label: "Gross Margin", value: "58%" },
      { label: "Repeat Purchase Rate", value: "62%" },
      { label: "Blended ROAS", value: "3.4x" },
      { label: "Average Order Value", value: "$96" },
    ],
  },
];

export const getBusiness = (id: string) => businesses.find((b) => b.id === id);
