import type { Business } from "@/data/businesses";
import type { SellerListing, User } from "@/lib/marketplace-types";

export function publicListingCode(listing: { id: string; code?: string }) {
  const code = listing.code?.trim() ?? "";
  if (/^FE-[A-Z0-9]+$/i.test(code)) return code.toUpperCase();
  const tail = listing.id.replace(/[^a-z0-9]/gi, "").slice(-4).toUpperCase() || "SAAS";
  return `FE-${tail}`;
}

function genericModel(model: string) {
  const m = model.toLowerCase();
  if (m.includes("b2c")) return "B2C subscription";
  if (m.includes("usage")) return "Usage-based SaaS";
  return "B2B subscription";
}

/** Strip brand, product, stack, and other details that would identify a live SaaS. */
export function anonymizeBusiness(b: Business): Business {
  const code = publicListingCode(b);
  return {
    ...b,
    name: code,
    code,
    headline: b.category,
    summary:
      "Anonymous SaaS listing. The product name, customers, and tech stay private. Contact Founder Exit if you want to buy.",
    stack: [],
    highlights: [],
    growthProfile: [],
    operations: [],
    assets: [],
    traffic: "",
    reasonForSale: "",
    confidential: [],
    structure: [],
    tags: [b.category],
    model: genericModel(b.model),
    market: b.category,
    geography: "Worldwide",
  };
}

export function anonymizeListing(listing: SellerListing): SellerListing {
  return {
    ...anonymizeBusiness(listing),
    status: listing.status,
    ownerEmail: "",
  };
}

export function isApprovedSeller(user: User | null | undefined) {
  return user?.type === "seller" && user.sellerStatus === "approved";
}

export function isPendingSeller(user: User | null | undefined) {
  return user?.type === "seller" && (user.sellerStatus ?? "pending") === "pending";
}
