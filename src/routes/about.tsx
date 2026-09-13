import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { Eyebrow, GlassCard, Section } from "@/components/site/Section";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Founder Exit" },
      {
        name: "description",
        content: "Founder Exit brokers SaaS sales. Listings are anonymous. We do not own the companies.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <Section className="pt-16 pb-10">
        <Reveal>
          <div className="max-w-2xl">
            <Eyebrow>About</Eyebrow>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">SaaS only. Broker only.</h1>
            <p className="mt-3 text-muted-foreground">
              We introduce a verified seller to a serious buyer. We do not take title. Public
              pages never show the product name, so the live SaaS keeps running as usual.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              t: "Anonymous listings",
              c: "Visitors see a code, category, price, MRR, and profit. Brand, stack, and customers stay private.",
            },
            {
              t: "Verified sellers",
              c: "A seller applies with the real company. We approve only if they operate a SaaS.",
            },
            {
              t: "Buy through us",
              c: "Buyers email Founder Exit and pay a deposit. They do not message the seller on the site.",
            },
            {
              t: "SaaS, not everything",
              c: "This marketplace is for subscription software businesses only.",
            },
          ].map((p) => (
            <GlassCard key={p.t} className="p-7">
              <h2 className="text-base font-semibold">{p.t}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.c}</p>
            </GlassCard>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <Button asChild variant="premium">
            <Link to="/businesses">Browse SaaS</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/sell">Sell a SaaS</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
