import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { Eyebrow, GlassCard, Section } from "@/components/site/Section";
import { businesses } from "@/data/businesses";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/businesses/")({
  head: () => ({
    meta: [
      { title: "Businesses for Sale — Merideon Advisory" },
      {
        name: "description",
        content:
          "Confidential SaaS, AI, software and digital businesses currently under representation. Full financials released under NDA.",
      },
      { property: "og:title", content: "Businesses for Sale — Merideon Advisory" },
      {
        property: "og:description",
        content: "Current sell-side mandates across SaaS, AI and digital businesses.",
      },
    ],
  }),
  component: BusinessesPage,
});

function BusinessesPage() {
  const cats = useMemo(
    () => ["All", ...Array.from(new Set(businesses.map((b) => b.category)))],
    [],
  );
  const [active, setActive] = useState("All");
  const list = active === "All" ? businesses : businesses.filter((b) => b.category === active);

  return (
    <Section className="pt-16">
      <Reveal>
        <Eyebrow>Current mandates</Eyebrow>
        <h1 className="text-gradient mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-balance md:text-5xl">
          Businesses Under Representation
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Each mandate below is exclusively represented by Merideon. Summary metrics are
          published; complete financials, customer data and code review are released to
          qualified buyers under NDA.
        </p>
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-10 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "rounded-full border px-4 py-2 text-[13px] transition-all",
                active === c
                  ? "border-primary/40 bg-primary/12 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/25 hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {list.map((b, i) => (
          <Reveal key={b.id} delay={(i % 2) * 90}>
            <GlassCard className="flex h-full flex-col p-8 hover:-translate-y-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold tracking-tight">{b.name}</h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {b.category} · {b.country} · Founded {b.founded}
                  </p>
                </div>
                <span className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-[10px] font-medium tracking-wider text-primary uppercase">
                  Live
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{b.tagline}</p>

              <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/70 sm:grid-cols-4">
                {[
                  ["MRR", b.mrr],
                  ["ARR", b.arr],
                  ["Margin", b.margin],
                  ["Team", b.employees],
                ].map(([k, v]) => (
                  <div key={k} className="bg-white/[0.02] px-4 py-3">
                    <p className="text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                      {k}
                    </p>
                    <p className="mt-1 text-sm font-medium">{v}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {b.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-end justify-between gap-4 border-t border-border pt-6">
                <div>
                  <p className="text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                    Asking price
                  </p>
                  <p className="mt-1 text-2xl font-semibold">
                    <span className="text-emerald-gradient">{b.price}</span>
                  </p>
                </div>
                <Button asChild variant="premium">
                  <Link to="/businesses/$businessId" params={{ businessId: b.id }}>
                    View Details
                  </Link>
                </Button>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
