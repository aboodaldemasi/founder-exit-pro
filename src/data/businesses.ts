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

/** Live catalog starts empty. Companies appear only after admin approval. */
export const businesses: Business[] = [];

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
