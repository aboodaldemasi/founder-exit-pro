import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BadgeCheck, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Reveal } from "@/components/site/Reveal";
import { Eyebrow, GlassCard, Section } from "@/components/site/Section";
import { CompanyMark } from "@/components/site/Logo";
import { DealActions, FavoriteButton } from "@/components/site/DealDialogs";
import { getCatalogBusiness } from "@/data/businesses";
import { getBusiness, useMarketplace } from "@/lib/marketplace";
import type { Business } from "@/data/businesses";

export const Route = createFileRoute("/businesses/$businessId")({
  loader: ({ params }): { business: Business | null; businessId: string } => {
    const business = getCatalogBusiness(params.businessId) ?? getBusiness(params.businessId) ?? null;
    return { business, businessId: params.businessId };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Listing unavailable — Founder Exit" }, { name: "robots", content: "noindex" }],
      };
    }
    const b = loaderData.business;
    if (!b) {
      return {
        meta: [{ title: "Listing — Founder Exit" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${b.name} — ${b.category} for sale | Founder Exit`;
    return {
      meta: [
        { title },
        { name: "description", content: b.headline },
        { property: "og:title", content: title },
        { property: "og:description", content: b.headline },
      ],
    };
  },
  component: BusinessDetail,
});

function BusinessDetail() {
  const { business: loaded, businessId } = Route.useLoaderData() as {
    business: Business | null;
    businessId: string;
  };
  const { listings, user } = useMarketplace();
  const b =
    loaded ?? listings.find((l) => l.id === businessId) ?? getBusiness(businessId);

  if (!b) {
    return (
      <Section className="pt-20 text-center">
        <h1 className="text-2xl font-semibold">Listing not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">This SaaS is no longer available.</p>
        <Button asChild variant="premium" className="mt-6">
          <Link to="/businesses">Back to marketplace</Link>
        </Button>
      </Section>
    );
  }

  const unlocked = Boolean(user);

  const metrics: [string, string][] = [
    ["Asking price", b.price],
    ["MRR", b.mrr],
    ["ARR", b.arr],
    ["Monthly profit", b.profit],
    ["Revenue (TTM)", b.revenue],
    ["Growth", b.growthRate],
    ["Customers", b.customers],
    ["Churn", b.churn],
  ];

  return (
    <Section className="pt-14">
      <Reveal>
        <Link
          to="/businesses"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" /> Marketplace
        </Link>

        <div className="mt-8 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="flex items-start gap-4">
            <CompanyMark name={b.name} hue={b.hue} className="size-14 text-base" />
            <div>
              <Eyebrow>{b.category}</Eyebrow>
              <h1 className="mt-3 flex items-center gap-2 text-4xl font-semibold tracking-tight md:text-5xl">
                <span className="text-gradient">{b.name}</span>
                {b.verified ? <BadgeCheck className="size-6 text-primary" aria-label="Verified" /> : null}
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                {b.headline}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {b.geography} · Founded {b.founded} · {b.age} · {b.model}
              </p>
            </div>
          </div>
          <div className="flex items-end gap-3">
            <FavoriteButton businessId={b.id} />
            <div className="rounded-2xl border border-border bg-card/40 px-5 py-4">
              <p className="text-[10px] tracking-[0.16em] text-muted-foreground uppercase">Asking price</p>
              <p className="mt-1 text-2xl font-semibold">
                <span className="text-emerald-gradient">{b.price}</span>
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={60}>
        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/70 md:grid-cols-4">
          {metrics.map(([k, v]) => (
            <div key={k} className="bg-white/[0.02] px-5 py-5">
              <p className="text-[10px] tracking-[0.12em] text-muted-foreground uppercase">{k}</p>
              <p className="mt-1.5 text-base font-semibold tabular-nums">{v}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.65fr_1fr]">
        <div className="flex flex-col gap-6">
          <GlassCard className="p-7">
            <h2 className="text-lg font-semibold tracking-tight">Overview</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{b.summary}</p>
          </GlassCard>

          <GlassCard className="p-7">
            <h2 className="text-lg font-semibold tracking-tight">Financial metrics</h2>
            <div className="mt-5 divide-y divide-border text-sm">
              {[
                ["Asking price", b.price],
                ["Monthly revenue (MRR)", b.mrr],
                ["Annual revenue (ARR)", b.arr],
                ["Monthly profit", b.profit],
                ["SDE (TTM)", b.sde],
                ["Gross margin", b.grossMargin],
                ["Multiple", b.multiple],
                ["ARPU", b.arpu],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between py-3">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-7">
            <h2 className="text-lg font-semibold tracking-tight">Growth & customers</h2>
            <ul className="mt-5 space-y-3">
              {b.highlights.map((g) => (
                <li key={g} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  {g}
                </li>
              ))}
            </ul>
            {b.growthProfile.length ? (
              <>
                <h3 className="mt-8 text-sm font-semibold">Growth opportunities</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {b.growthProfile.map((g) => (
                    <li key={g}>{g}</li>
                  ))}
                </ul>
              </>
            ) : null}
          </GlassCard>

          <GlassCard className="p-7">
            <h2 className="text-lg font-semibold tracking-tight">Traffic / analytics</h2>
            <p className="mt-3 text-sm text-muted-foreground">{b.traffic}</p>
            <h3 className="mt-8 text-sm font-semibold">Assets included</h3>
            <ul className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
              {b.assets.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </GlassCard>
        </div>

        <div className="flex flex-col gap-6">
          <GlassCard className="p-7">
            <h2 className="text-sm font-semibold tracking-tight">Tech stack</h2>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {b.stack.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-primary/20 bg-primary/8 px-2.5 py-1 text-[11px] text-primary"
                >
                  {t}
                </span>
              ))}
            </div>
            <h2 className="mt-7 text-sm font-semibold tracking-tight">Business model</h2>
            <p className="mt-2 text-sm text-muted-foreground">{b.model}</p>
            <h2 className="mt-7 text-sm font-semibold tracking-tight">Reason for selling</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.reasonForSale}</p>
          </GlassCard>

          <GlassCard className="p-7">
            <h2 className="flex items-center gap-2 text-sm font-semibold tracking-tight">
              <Lock className="size-4 text-primary" /> Sensitive data
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Customer lists, full financials, and code access stay private until the seller
              approves your request.
            </p>
            <ul className="mt-4 space-y-2">
              {b.confidential.map((item) => (
                <li key={item} className="flex items-center justify-between text-sm">
                  <span className={unlocked ? "text-muted-foreground" : "blur-[5px] select-none"}>
                    {unlocked ? item : "Confidential material"}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {unlocked ? "Request to unlock" : "Sign in required"}
                  </span>
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard className="p-7">
            <h2 className="text-sm font-semibold tracking-tight">Next step</h2>
            <p className="mt-2 mb-5 text-sm text-muted-foreground">
              Request information, contact the seller, or make an offer.
            </p>
            <DealActions business={b} />
          </GlassCard>
        </div>
      </div>
    </Section>
  );
}
