import { Link } from "@tanstack/react-router";
import { BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CompanyMark } from "@/components/site/Logo";
import { FavoriteButton } from "@/components/site/DealDialogs";
import type { Business } from "@/data/businesses";

export function OpportunityCard({ b }: { b: Business }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-card/40 p-5">
      <div className="flex items-start gap-3">
        <CompanyMark name={b.name} hue={b.hue} className="size-10 text-xs" />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs text-muted-foreground">{b.category}</p>
              <h3 className="mt-0.5 flex items-center gap-1.5 font-semibold tracking-tight">
                {b.name}
                {b.verified ? <BadgeCheck className="size-4 text-primary" aria-label="Verified" /> : null}
              </h3>
            </div>
            <FavoriteButton businessId={b.id} />
          </div>
        </div>
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{b.headline}</p>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        {[
          ["Price", b.price],
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
            View listing
          </Link>
        </Button>
      </div>
    </article>
  );
}
