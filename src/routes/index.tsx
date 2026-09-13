import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { OpportunityCard } from "@/components/site/OpportunityCard";
import { BRAND } from "@/lib/brand";
import { publicListings, useMarketplace } from "@/lib/marketplace";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${BRAND.name} — ${BRAND.tagline}` },
      {
        name: "description",
        content: "Anonymous SaaS for sale. We broker between seller and buyer. Product names stay private.",
      },
      { property: "og:title", content: `${BRAND.name} — ${BRAND.tagline}` },
      { property: "og:description", content: "Browse SaaS numbers. Buy through Founder Exit with a deposit." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { listings } = useMarketplace();
  const featured = publicListings(listings).slice(0, 3);

  return (
    <>
      <section className="px-5 pt-20 pb-12 md:pt-28">
        <div className="mx-auto w-full max-w-6xl">
          <p className="text-sm font-medium text-primary">SaaS broker</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-balance md:text-6xl">
            {BRAND.tagline}
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
            Visitors see price and metrics only — never the product name. Sellers apply, we
            verify, then list. Buyers email us and pay a deposit.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="premium">
              <Link to="/businesses">
                Browse SaaS <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/sell">Sell a SaaS</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="px-5 py-10">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-xl font-semibold tracking-tight">Live listings</h2>
            <Link to="/businesses" className="text-sm text-primary hover:underline">
              See all
            </Link>
          </div>
          {featured.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border px-6 py-14 text-center">
              <p className="font-medium">No SaaS listed yet</p>
              <p className="mt-2 text-sm text-muted-foreground">
                A listing appears here after we approve a seller and their SaaS.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 lg:grid-cols-3">
              {featured.map((b) => (
                <OpportunityCard key={b.id} b={b} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
