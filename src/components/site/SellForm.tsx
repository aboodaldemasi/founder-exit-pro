import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GlassCard } from "@/components/site/Section";
import { categories } from "@/data/businesses";
import { isApprovedSeller } from "@/lib/listing-privacy";
import { openAuth, saveSellerListing, useMarketplace, type SellerListing } from "@/lib/marketplace";
import { cn } from "@/lib/utils";

const steps = ["Numbers", "SaaS metrics", "Private name"] as const;

const empty = {
  name: "",
  category: "B2B SaaS",
  founded: "",
  price: "",
  mrr: "",
  arr: "",
  profit: "",
  customers: "",
  churn: "",
  growthRate: "",
  grossMargin: "",
  model: "B2B subscription",
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
    if (step === 0) return Boolean(data.price && data.mrr && data.arr && data.category);
    if (step === 1) return Boolean(data.customers && data.growthRate && data.model);
    if (step === 2) return Boolean(data.name);
    return true;
  }, [data, step]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      openAuth("register", "seller");
      return;
    }
    if (!isApprovedSeller(user)) {
      toast.error("Your seller account must be approved first.");
      return;
    }

    const priceNum = parseMoney(data.price);
    const mrrNum = parseMoney(data.mrr);
    const arrNum = parseMoney(data.arr);
    const profitNum = parseMoney(data.profit);
    const growthNum = parseMoney(data.growthRate);
    const foundedYear = Number(data.founded) || new Date().getFullYear();
    const ageYears = Math.max(0, new Date().getFullYear() - foundedYear);
    const code = `FE-${Date.now().toString(36).slice(-4).toUpperCase()}`;
    const id = `listing-${code.toLowerCase()}-${Date.now().toString(36)}`;

    const listing: SellerListing = {
      id,
      name: data.name,
      code,
      headline: data.category,
      summary: "Anonymous SaaS listing.",
      category: data.category,
      model: data.model,
      geography: "Worldwide",
      market: data.category,
      founded: data.founded || String(new Date().getFullYear()),
      age: `${ageYears || 1} year${ageYears === 1 ? "" : "s"}`,
      ageYears: ageYears || 1,
      teamSize: "Founder-led",
      price: formatMoney(priceNum) === "—" ? data.price.trim() || "—" : formatMoney(priceNum),
      priceNum,
      priceBand: formatMoney(priceNum),
      mrr: formatMoney(mrrNum),
      mrrNum,
      arr: formatMoney(arrNum),
      arrNum,
      revenue: formatMoney(arrNum),
      profit: data.profit ? formatMoney(profitNum) : "—",
      profitNum,
      sde: "—",
      grossMargin: data.grossMargin || "—",
      growthRate: data.growthRate.includes("%") ? data.growthRate : `+${data.growthRate}%`,
      growthNum,
      churn: data.churn || "—",
      customers: data.customers,
      arpu: "—",
      multiple: "—",
      verified: false,
      hue: 163,
      tags: [data.category],
      stack: [],
      highlights: [],
      growthProfile: [],
      operations: [],
      assets: [],
      traffic: "",
      reasonForSale: "",
      structure: [],
      confidential: [],
      status: "Under Review",
      ownerEmail: user.email,
    };

    try {
      await saveSellerListing(listing);
      toast.success("Listing submitted", {
        description: `Public code will be ${code}. The company name stays private.`,
      });
      setData(empty);
      setStep(0);
      onSubmitted?.();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not submit listing.");
    }
  };

  return (
    <GlassCard className="p-6 md:p-8">
      <ol className="mb-8 grid grid-cols-3 gap-2">
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
            <Field label="Founded (year)" id="founded">
              <Input id="founded" value={data.founded} onChange={(e) => set("founded", e.target.value)} placeholder="2021" />
            </Field>
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
          </>
        ) : null}

        {step === 1 ? (
          <>
            <Field label="Paying customers (count only)" id="customers">
              <Input id="customers" value={data.customers} onChange={(e) => set("customers", e.target.value)} required placeholder="80" />
            </Field>
            <Field label="Growth %" id="growthRate">
              <Input id="growthRate" value={data.growthRate} onChange={(e) => set("growthRate", e.target.value)} required placeholder="28" />
            </Field>
            <Field label="Churn" id="churn">
              <Input id="churn" value={data.churn} onChange={(e) => set("churn", e.target.value)} placeholder="2% monthly" />
            </Field>
            <Field label="Gross margin" id="grossMargin">
              <Input id="grossMargin" value={data.grossMargin} onChange={(e) => set("grossMargin", e.target.value)} placeholder="85%" />
            </Field>
            <Field label="Model" id="model" wide>
              <Select value={data.model} onValueChange={(v) => set("model", v)}>
                <SelectTrigger id="model">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="B2B subscription">B2B subscription</SelectItem>
                  <SelectItem value="B2C subscription">B2C subscription</SelectItem>
                  <SelectItem value="Usage-based SaaS">Usage-based SaaS</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <Field label="Real company / product name (admin only)" id="name" wide>
              <Input id="name" value={data.name} onChange={(e) => set("name", e.target.value)} required />
            </Field>
            <p className="sm:col-span-2 text-sm text-muted-foreground">
              Visitors will see a code like FE-8K2P, not this name. Do not put the brand in the
              numbers fields.
            </p>
          </>
        ) : null}

        <div className="flex items-center justify-between sm:col-span-2">
          <Button type="button" variant="ghost" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
            <ArrowLeft /> Back
          </Button>
          <Button type="submit" variant="premium" disabled={!canNext}>
            {step === steps.length - 1 ? (
              <>
                Submit <Check />
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
