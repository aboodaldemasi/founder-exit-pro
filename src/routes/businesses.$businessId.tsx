import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, FileLock2, MessageSquare, TrendingUp } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { Eyebrow, GlassCard, Section } from "@/components/site/Section";
import { getBusiness } from "@/data/businesses";

export const Route = createFileRoute("/businesses/$businessId")({
  loader: ({ params }) => {
    const business = getBusiness(params.businessId);
    if (!business) throw notFound();
    return { business };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Listing unavailable — Merideon Advisory" }, { name: "robots", content: "noindex" }],
      };
    }
    const b = loaderData.business;
    const title = `${b.name} — ${b.category} for Sale | Merideon Advisory`;
    return {
      meta: [
        { title },
        { name: "description", content: b.tagline },
        { property: "og:title", content: title },
        { property: "og:description", content: b.tagline },
      ],
    };
  },
  component: BusinessDetail,
});

function BusinessDetail() {
  const { business: b } = Route.useLoaderData();

  const topMetrics = [
    ["MRR", b.mrr],
    ["ARR", b.arr],
    ["Net Profit", b.profit],
    ["Revenue (TTM)", b.revenue],
    ["Employees", b.employees],
    ["Country", b.country],
    ["Business Age", b.age],
    ["Industry", b.industry],
  ] as const;

  return (
    <Section className="pt-14">
      <Reveal>
        <Link
          to="/businesses"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" /> All businesses
        </Link>

        <div className="mt-8 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Eyebrow>Investment memorandum</Eyebrow>
            <h1 className="text-gradient mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
              {b.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {b.tagline}
            </p>
          </div>
          <div className="glass rounded-2xl px-6 py-5">
            <p className="text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
              Asking price
            </p>
            <p className="mt-1.5 text-3xl font-semibold">
              <span className="text-emerald-gradient">{b.price}</span>
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border/70 md:grid-cols-4">
          {topMetrics.map(([k, v]) => (
            <div key={k} className="bg-white/[0.02] px-5 py-5">
              <p className="text-[10px] tracking-[0.14em] text-muted-foreground uppercase">{k}</p>
              <p className="mt-1.5 text-lg font-semibold">{v}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="flex flex-col gap-6">
          <Reveal>
            <GlassCard className="p-8">
              <h2 className="text-lg font-semibold tracking-tight">Business Overview</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{b.overview}</p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                    Traffic
                  </p>
                  <p className="mt-1.5 text-base font-medium">{b.traffic}</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                    Customers
                  </p>
                  <p className="mt-1.5 text-base font-medium">{b.customers}</p>
                </div>
              </div>
            </GlassCard>
          </Reveal>

          <Reveal>
            <GlassCard className="p-8">
              <h2 className="text-lg font-semibold tracking-tight">Financial Overview</h2>
              <div className="mt-6 divide-y divide-border">
                {b.financials.map((f) => (
                  <div key={f.label} className="flex items-center justify-between py-3.5">
                    <span className="text-sm text-muted-foreground">{f.label}</span>
                    <span className="text-sm font-medium">{f.value}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>

          <Reveal>
            <GlassCard className="p-8">
              <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
                <TrendingUp className="size-4 text-primary" /> Growth Opportunities
              </h2>
              <ul className="mt-6 space-y-4">
                {b.growth.map((g) => (
                  <li key={g} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    {g}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>

        <div className="flex flex-col gap-6">
          <Reveal delay={60}>
            <GlassCard className="p-8">
              <h2 className="text-sm font-semibold tracking-tight">Technology Stack</h2>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {b.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-[11px] text-primary"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <h2 className="mt-8 text-sm font-semibold tracking-tight">Reason for Sale</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.reason}</p>

              <h2 className="mt-8 text-sm font-semibold tracking-tight">Profit Margin</h2>
              <p className="mt-2 text-2xl font-semibold">
                <span className="text-emerald-gradient">{b.margin}</span>
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={120}>
            <GlassCard className="p-8">
              <h2 className="text-sm font-semibold tracking-tight">Next Steps</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Complete financials, customer cohorts and technical review are released to
                qualified buyers following a signed NDA.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Button
                  variant="premium"
                  onClick={() =>
                    toast.success("NDA request received", {
                      description: `An advisor will send the ${b.name} NDA within one business day.`,
                    })
                  }
                >
                  <FileLock2 /> Request NDA
                </Button>
                <Button asChild variant="glass">
                  <Link to="/contact">
                    <MessageSquare /> Contact Advisor
                  </Link>
                </Button>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
