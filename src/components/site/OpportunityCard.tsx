import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CompanyMark } from "@/components/site/Logo";
import { publicListingCode } from "@/lib/listing-privacy";
import type { Business } from "@/data/businesses";

export function OpportunityCard({ b }: { b: Business }) {
  const code = publicListingCode(b);

  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-card/40 p-5">
      <p className="text-[11px] tracking-[0.14em] text-muted-foreground uppercase">Asking price</p>
      <p className="mt-1 text-3xl font-semibold tracking-tight text-primary tabular-nums">
        {b.price || "—"}
      </p>

      <div className="mt-5 flex items-start gap-3">
        <CompanyMark name="SaaS" hue={b.hue} className="size-10 text-xs" />
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{b.category}</p>
          <h3 className="mt-0.5 font-semibold tracking-tight">{code}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">Anonymous SaaS listing</p>
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-3 gap-3 text-sm">
        {[
          ["MRR", b.mrr],
          ["Profit", b.profit],
          ["Growth", b.growthRate],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="text-xs text-muted-foreground">{k}</dt>
            <dd className="mt-0.5 font-medium tabular-nums">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-auto pt-5">
        <Button asChild variant="premium" size="sm" className="w-full">
          <Link to="/businesses/$businessId" params={{ businessId: b.id }}>
            View numbers
          </Link>
        </Button>
      </div>
    </article>
  );
}
