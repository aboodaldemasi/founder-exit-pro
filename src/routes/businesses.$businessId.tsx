import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { GlassCard, Section } from "@/components/site/Section";
import { CompanyMark } from "@/components/site/Logo";
import { BRAND } from "@/lib/brand";
import { anonymizeBusiness, publicListingCode } from "@/lib/listing-privacy";
import { useMarketplace } from "@/lib/marketplace";
import { getPlatformFn } from "@/lib/platform-fns";
import type { Business } from "@/data/businesses";

export const Route = createFileRoute("/businesses/$businessId")({
  loader: async ({ params }): Promise<{ business: Business | null; businessId: string }> => {
    const data = await getPlatformFn();
    const listing = data.listings.find((l) => l.id === params.businessId);
    const allowed =
      listing &&
      (listing.status === "Active" ||
        listing.status === "Under Offer" ||
        data.admin ||
        data.user?.email === listing.ownerEmail);
    if (!allowed || !listing) {
      return { business: null, businessId: params.businessId };
    }
    const { status: _s, ownerEmail: _o, ...business } = listing;
    return {
      business: data.admin ? business : anonymizeBusiness(business),
      businessId: params.businessId,
    };
  },
  head: ({ loaderData }) => {
    const b = loaderData?.business;
    if (!b) {
      return {
        meta: [{ title: "Listing — Founder Exit" }, { name: "robots", content: "noindex" }],
      };
    }
    const code = publicListingCode(b);
    const title = `${code} — ${b.category} SaaS | Founder Exit`;
    return {
      meta: [
        { title },
        { name: "description", content: `Anonymous ${b.category} SaaS. Asking ${b.price}.` },
        { property: "og:title", content: title },
        { property: "og:description", content: "Anonymous SaaS listing. Product name is private." },
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
  const { listings, user, admin } = useMarketplace();
  const listing = listings.find((l) => l.id === businessId);
  const allowed =
    Boolean(listing) &&
    (listing?.status === "Active" ||
      listing?.status === "Under Offer" ||
      admin ||
      listing?.ownerEmail === user?.email);
  const raw: Business | undefined =
    loaded ??
    (listing && allowed
      ? (({ status: _s, ownerEmail: _o, ...business }) => business)(listing)
      : undefined);
  const b = raw ? (admin ? raw : anonymizeBusiness(raw)) : undefined;

  if (!b) {
    return (
      <Section className="pt-20 text-center">
        <h1 className="text-2xl font-semibold">Listing not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">This SaaS is no longer available.</p>
        <Button asChild variant="premium" className="mt-6">
          <Link to="/businesses">Back</Link>
        </Button>
      </Section>
    );
  }

  const code = publicListingCode(b);
  const depositHref = `mailto:${BRAND.paymentEmail}?subject=${encodeURIComponent(`Deposit for ${code}`)}&body=${encodeURIComponent(
    `Hi Founder Exit,\n\nI want to buy listing ${code} (${b.category}).\nPlease send deposit instructions.\n\nThank you.`,
  )}`;

  const metrics: [string, string][] = [
    ["Asking price", b.price],
    ["MRR", b.mrr],
    ["ARR", b.arr],
    ["Monthly profit", b.profit],
    ["Growth", b.growthRate],
    ["Customers", b.customers],
    ["Churn", b.churn],
    ["Gross margin", b.grossMargin],
    ["Age", b.age],
    ["Model", b.model],
  ];

  return (
    <Section className="pt-14">
      <Reveal>
        <Link
          to="/businesses"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" /> SaaS for sale
        </Link>

        <div className="mt-8 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="flex items-start gap-4">
            <CompanyMark name="SaaS" hue={b.hue} className="size-14 text-base" />
            <div>
              <p className="text-xs text-muted-foreground">{b.category}</p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight">{code}</h1>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Anonymous SaaS listing. The product name, customers, and stack stay private so the
                live business is not disrupted.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card/40 px-5 py-4">
            <p className="text-[10px] tracking-[0.16em] text-muted-foreground uppercase">Asking price</p>
            <p className="mt-1 text-3xl font-semibold tabular-nums text-primary">{b.price || "—"}</p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={60}>
        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/70 md:grid-cols-5">
          {metrics.map(([k, v]) => (
            <div key={k} className="bg-white/[0.02] px-5 py-5">
              <p className="text-[10px] tracking-[0.12em] text-muted-foreground uppercase">{k}</p>
              <p className="mt-1.5 text-base font-semibold tabular-nums">{v || "—"}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={80}>
        <GlassCard className="mt-8 p-7">
          <h2 className="text-lg font-semibold tracking-tight">Want to buy this SaaS?</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Founder Exit is the broker. You do not contact the seller directly. Email us, then pay
            a deposit so we know you are serious. Payment details go to{" "}
            {BRAND.paymentEmail} (a dedicated inbox can be added later).
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="premium">
              <a href={depositHref}>Email deposit for {code}</a>
            </Button>
            <Button asChild variant="outline">
              <Link to="/buy">How buying works</Link>
            </Button>
          </div>
        </GlassCard>
      </Reveal>
    </Section>
  );
}
