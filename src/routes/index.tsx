import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { OpportunityCard } from "@/components/site/OpportunityCard";
import { businesses } from "@/data/businesses";
import { BRAND } from "@/lib/brand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${BRAND.name} — ${BRAND.tagline}` },
      {
        name: "description",
        content: "A marketplace to buy and sell SaaS companies. Browse listings, request details, and make an offer.",
      },
      { property: "og:title", content: `${BRAND.name} — ${BRAND.tagline}` },
      { property: "og:description", content: "Buy and sell SaaS companies." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = businesses.slice(0, 3);

  return (
    <>
      <section className="px-5 pt-20 pb-12 md:pt-28">
        <div className="mx-auto w-full max-w-6xl">
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance md:text-6xl">
            {BRAND.tagline}
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
            {BRAND.name} is a marketplace for software businesses. See the price, revenue,
            and profit. Talk to the seller when you are serious.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="premium">
              <Link to="/businesses">
                Browse listings <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/sell">Sell your company</Link>
            </Button>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            6 live listings · $100K–$2M · Metrics reviewed before they go live
          </p>
        </div>
      </section>

      <section className="px-5 py-10">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-xl font-semibold tracking-tight">For sale now</h2>
            <Link to="/businesses" className="text-sm text-primary hover:underline">
              See all
            </Link>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {featured.map((b) => (
              <OpportunityCard key={b.id} b={b} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14">
        <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-3">
          {[
            { n: "1", t: "Browse", c: "Open a listing. Price, MRR, profit, and stack are public." },
            { n: "2", t: "Ask", c: "Request information or message the seller. Sensitive files stay private." },
            { n: "3", t: "Offer", c: "Send a number. Track the deal from your account." },
          ].map((s) => (
            <div key={s.n}>
              <p className="text-sm font-medium text-primary">{s.n}</p>
              <h3 className="mt-2 text-base font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.c}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
