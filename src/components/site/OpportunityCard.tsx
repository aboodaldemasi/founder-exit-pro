import { Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Business } from "@/data/businesses";
import { cn } from "@/lib/utils";

export function Tag({ label }: { label: string }) {
  const accent = ["AI", "High Growth", "Verified"].includes(label);
  return (
    <span
      className={cn(
        "rounded-[4px] border px-2 py-0.5 text-[10px] font-medium tracking-[0.1em] uppercase",
        accent
          ? "border-primary/30 bg-primary/8 text-primary"
          : "border-border text-muted-foreground",
      )}
    >
      {label}
    </span>
  );
}

export function OpportunityCard({ b }: { b: Business }) {
  const metrics: [string, string][] = [
    ["Asking price", b.price],
    ["MRR", b.mrr],
    ["ARR", b.arr],
    ["SDE (TTM)", b.sde],
    ["Gross margin", b.grossMargin],
    ["Growth", b.growthRate],
  ];

  return (
    <article className="group relative flex h-full flex-col border border-border/70 bg-white/[0.015] p-8 transition-colors duration-500 hover:border-primary/30">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-[10px] tracking-[0.22em] text-primary uppercase">{b.category}</p>
          <h3 className="mt-3 text-lg font-semibold tracking-tight">{b.code}</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {b.geography} · Founded {b.founded} · Team {b.teamSize.split(" ")[0]}
          </p>
        </div>
        <span className="shrink-0 border border-border px-2 py-1 text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
          Under representation
        </span>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{b.headline}</p>

      <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-border/70 py-6 sm:grid-cols-3">
        {metrics.map(([k, v]) => (
          <div key={k}>
            <dt className="text-[10px] tracking-[0.16em] text-muted-foreground uppercase">{k}</dt>
            <dd className="mt-1.5 text-sm font-medium tabular-nums">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 flex flex-wrap items-center gap-1.5">
        {b.tags.slice(0, 4).map((t) => (
          <Tag key={t} label={t} />
        ))}
        <span className="ml-auto text-[11px] text-muted-foreground">{b.multiple}</span>
      </div>

      <p className="mt-5 inline-flex items-center gap-2 text-[11px] text-muted-foreground">
        <Lock className="size-3 text-primary" />
        Identity and full financials released to qualified buyers under NDA.
      </p>

      <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
        <Button asChild variant="premium">
          <Link to="/businesses/$businessId" params={{ businessId: b.id }}>
            View Opportunity
          </Link>
        </Button>
        <Button asChild variant="ghost">
          <Link to="/buyer-network">Request Details</Link>
        </Button>
      </div>
    </article>
  );
}
