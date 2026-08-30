import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GlassCard } from "@/components/site/Section";
import { categories } from "@/data/businesses";
import { openAuth, saveSellerListing, useMarketplace, type SellerListing } from "@/lib/marketplace";
import { cn } from "@/lib/utils";

const steps = [
  "Basic Information",
  "Financial Information",
  "SaaS Metrics",
  "Technology",
  "Sale Information",
  "Review & Submit",
] as const;

const empty = {
  name: "",
  headline: "",
  summary: "",
  category: "B2B SaaS",
  geography: "",
  founded: "",
  price: "",
  mrr: "",
  arr: "",
  profit: "",
  revenue: "",
  sde: "",
  customers: "",
  churn: "",
  growthRate: "",
  arpu: "",
  grossMargin: "",
  model: "",
  stack: "",
  reasonForSale: "",
  assets: "",
  traffic: "",
};

function parseMoney(value: string) {
  const n = Number(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function formatMoney(n: number) {
  if (!n) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function SellForm({ onSubmitted }: { onSubmitted?: () => void }) {
  const { user } = useMarketplace();
  const [step, setStep] = useState(0);
  const [data, setData] = useState(empty);

  const set = (key: keyof typeof empty, value: string) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const canNext = useMemo(() => {
    if (step === 0) return Boolean(data.name && data.headline && data.summary);
    if (step === 1) return Boolean(data.price && data.mrr && data.arr);
    if (step === 2) return Boolean(data.customers && data.growthRate);
    if (step === 3) return Boolean(data.model && data.stack);
    if (step === 4) return Boolean(data.reasonForSale);
    return true;
  }, [data, step]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      openAuth("register", "seller");
      return;
    }
    if (user.type !== "seller") {
      toast.error("Listings can only be created from a seller account.");
      return;
    }

    const priceNum = parseMoney(data.price);
    const mrrNum = parseMoney(data.mrr);
    const arrNum = parseMoney(data.arr);
    const profitNum = parseMoney(data.profit);
    const growthNum = parseMoney(data.growthRate);
    const foundedYear = Number(data.founded) || new Date().getFullYear();
    const ageYears = Math.max(0, new Date().getFullYear() - foundedYear);
    const id = `listing-${data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString(36)}`;

    const listing: SellerListing = {
      id,
      name: data.name,
      code: data.name,
      headline: data.headline,
      summary: data.summary,
      category: data.category,
      model: data.model,
      geography: data.geography || "Worldwide",
      market: data.category,
      founded: data.founded || String(new Date().getFullYear()),
      age: `${ageYears || 1} year${ageYears === 1 ? "" : "s"}`,
      ageYears: ageYears || 1,
      teamSize: "Founder-led",
      price: formatMoney(priceNum),
      priceNum,
      priceBand: formatMoney(priceNum),
      mrr: formatMoney(mrrNum),
      mrrNum,
      arr: formatMoney(arrNum),
      arrNum,
      revenue: data.revenue || formatMoney(arrNum),
      profit: data.profit ? formatMoney(profitNum) : "—",
      profitNum,
      sde: data.sde || "—",
      grossMargin: data.grossMargin || "—",
      growthRate: data.growthRate.includes("%") ? data.growthRate : `+${data.growthRate}%`,
      growthNum,
      churn: data.churn || "—",
      customers: data.customers,
      arpu: data.arpu || "—",
      multiple: "—",
      verified: false,
      hue: 163,
      tags: ["Founder-led"],
      stack: data.stack.split(",").map((s) => s.trim()).filter(Boolean),
      highlights: [data.headline],
      growthProfile: [],
      operations: [],
      assets: data.assets.split(",").map((s) => s.trim()).filter(Boolean),
      traffic: data.traffic || "Shared after qualification",
      reasonForSale: data.reasonForSale,
      structure: ["Cash at close preferred"],
      confidential: ["Full P&L and customer list", "Codebase access under NDA"],
      status: "Under Review",
      ownerEmail: user.email,
    };

    saveSellerListing(listing);
    toast.success("Listing submitted for review", {
      description: `${data.name} is now Under Review in your seller workspace.`,
    });
    setData(empty);
    setStep(0);
    onSubmitted?.();
  };

  return (
    <GlassCard className="p-6 md:p-8">
      <ol className="mb-8 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {steps.map((label, i) => (
          <li
            key={label}
            className={cn(
              "rounded-lg border px-2 py-2 text-center text-[11px] leading-tight",
              i === step
                ? "border-primary/40 bg-primary/10 text-foreground"
                : i < step
                  ? "border-primary/20 text-primary"
                  : "border-border text-muted-foreground",
            )}
          >
            <span className="block font-medium">0{i + 1}</span>
            {label}
          </li>
        ))}
      </ol>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (step < steps.length - 1) setStep((s) => s + 1);
          else submit(e);
        }}
        className="grid gap-5 sm:grid-cols-2"
      >
        {step === 0 ? (
          <>
            <Field label="Company name" id="name">
              <Input id="name" value={data.name} onChange={(e) => set("name", e.target.value)} required />
            </Field>
            <Field label="Category" id="category">
              <Select value={data.category} onValueChange={(v) => set("category", v)}>
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Short description" id="headline" wide>
              <Input
                id="headline"
                value={data.headline}
                onChange={(e) => set("headline", e.target.value)}
                required
                placeholder="What the product does in one line"
              />
            </Field>
            <Field label="Overview" id="summary" wide>
              <Textarea
                id="summary"
                rows={4}
                value={data.summary}
                onChange={(e) => set("summary", e.target.value)}
                required
              />
            </Field>
            <Field label="Geography" id="geography">
              <Input id="geography" value={data.geography} onChange={(e) => set("geography", e.target.value)} />
            </Field>
            <Field label="Founded (year)" id="founded">
              <Input id="founded" value={data.founded} onChange={(e) => set("founded", e.target.value)} placeholder="2021" />
            </Field>
          </>
        ) : null}

        {step === 1 ? (
          <>
            <Field label="Asking price" id="price">
              <Input id="price" value={data.price} onChange={(e) => set("price", e.target.value)} required placeholder="$850,000" />
            </Field>
            <Field label="Monthly revenue (MRR)" id="mrr">
              <Input id="mrr" value={data.mrr} onChange={(e) => set("mrr", e.target.value)} required placeholder="$18,000" />
            </Field>
            <Field label="Annual revenue (ARR)" id="arr">
              <Input id="arr" value={data.arr} onChange={(e) => set("arr", e.target.value)} required placeholder="$216,000" />
            </Field>
            <Field label="Monthly profit" id="profit">
              <Input id="profit" value={data.profit} onChange={(e) => set("profit", e.target.value)} placeholder="$11,000" />
            </Field>
            <Field label="TTM revenue" id="revenue">
              <Input id="revenue" value={data.revenue} onChange={(e) => set("revenue", e.target.value)} />
            </Field>
            <Field label="SDE / owner earnings" id="sde">
              <Input id="sde" value={data.sde} onChange={(e) => set("sde", e.target.value)} />
            </Field>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <Field label="Customers" id="customers">
              <Input id="customers" value={data.customers} onChange={(e) => set("customers", e.target.value)} required placeholder="86 accounts" />
            </Field>
            <Field label="Growth rate" id="growthRate">
              <Input id="growthRate" value={data.growthRate} onChange={(e) => set("growthRate", e.target.value)} required placeholder="28" />
            </Field>
            <Field label="Churn rate" id="churn">
              <Input id="churn" value={data.churn} onChange={(e) => set("churn", e.target.value)} placeholder="1.8% monthly" />
            </Field>
            <Field label="ARPU" id="arpu">
              <Input id="arpu" value={data.arpu} onChange={(e) => set("arpu", e.target.value)} />
            </Field>
            <Field label="Gross margin" id="grossMargin">
              <Input id="grossMargin" value={data.grossMargin} onChange={(e) => set("grossMargin", e.target.value)} placeholder="87%" />
            </Field>
          </>
        ) : null}

        {step === 3 ? (
          <>
            <Field label="Business model" id="model">
              <Input id="model" value={data.model} onChange={(e) => set("model", e.target.value)} required placeholder="Monthly B2B subscription" />
            </Field>
            <Field label="Tech stack" id="stack">
              <Input id="stack" value={data.stack} onChange={(e) => set("stack", e.target.value)} required placeholder="Next.js, Postgres, Stripe" />
            </Field>
            <Field label="Traffic / analytics" id="traffic" wide>
              <Input id="traffic" value={data.traffic} onChange={(e) => set("traffic", e.target.value)} placeholder="12K monthly visits" />
            </Field>
          </>
        ) : null}

        {step === 4 ? (
          <>
            <Field label="Reason for selling" id="reasonForSale" wide>
              <Textarea
                id="reasonForSale"
                rows={4}
                value={data.reasonForSale}
                onChange={(e) => set("reasonForSale", e.target.value)}
                required
              />
            </Field>
            <Field label="Assets included" id="assets" wide>
              <Input
                id="assets"
                value={data.assets}
                onChange={(e) => set("assets", e.target.value)}
                placeholder="Code, domain, Stripe, docs"
              />
            </Field>
          </>
        ) : null}

        {step === 5 ? (
          <div className="sm:col-span-2 space-y-3 rounded-xl border border-border bg-white/[0.02] p-5 text-sm">
            {[
              ["Company", data.name],
              ["Category", data.category],
              ["Asking price", data.price],
              ["MRR / ARR", `${data.mrr} · ${data.arr}`],
              ["Growth", data.growthRate],
              ["Model", data.model],
              ["Stack", data.stack],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4">
                <span className="text-muted-foreground">{k}</span>
                <span className="font-medium">{v || "—"}</span>
              </div>
            ))}
            <p className="pt-2 text-xs text-muted-foreground">
              Submitted listings start as Under Review. Publish them from your workspace when ready.
            </p>
          </div>
        ) : null}

        <div className="flex items-center justify-between sm:col-span-2">
          <Button type="button" variant="ghost" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
            <ArrowLeft /> Back
          </Button>
          <Button type="submit" variant="premium" disabled={!canNext}>
            {step === steps.length - 1 ? (
              <>
                Submit listing <Check />
              </>
            ) : (
              <>
                Continue <ArrowRight />
              </>
            )}
          </Button>
        </div>
      </form>
    </GlassCard>
  );
}

function Field({
  id,
  label,
  children,
  wide,
}: {
  id: string;
  label: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={cn("grid gap-2", wide && "sm:col-span-2")}>
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
}
