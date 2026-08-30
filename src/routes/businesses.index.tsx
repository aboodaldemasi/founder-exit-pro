import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Section } from "@/components/site/Section";
import { OpportunityCard } from "@/components/site/OpportunityCard";
import { businesses, categories } from "@/data/businesses";
import { getVisibleListings, useMarketplace } from "@/lib/marketplace";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/businesses/")({
  head: () => ({
    meta: [
      { title: "SaaS for sale — Founder Exit" },
      {
        name: "description",
        content:
          "Browse SaaS companies for sale. Filter by asking price, MRR, ARR, profit, category, age, and growth.",
      },
      { property: "og:title", content: "SaaS for sale — Founder Exit" },
      {
        property: "og:description",
        content: "Verified SaaS businesses with public metrics and gated diligence data.",
      },
    ],
  }),
  component: BusinessesPage,
});

const PAGE_SIZE = 6;

type Band = { label: string; min: number; max: number };

const ANY_PRICE: Band = { label: "Any price", min: 0, max: Infinity };
const ANY_MRR: Band = { label: "Any MRR", min: 0, max: Infinity };
const ANY_ARR: Band = { label: "Any ARR", min: 0, max: Infinity };
const ANY_PROFIT: Band = { label: "Any profit", min: 0, max: Infinity };
const ANY_AGE: Band = { label: "Any age", min: 0, max: Infinity };
const ANY_GROWTH: Band = { label: "Any growth", min: 0, max: Infinity };

const priceBands: Band[] = [
  ANY_PRICE,
  { label: "Under $1M", min: 0, max: 999999 },
  { label: "$1M – $1.5M", min: 1000000, max: 1500000 },
  { label: "$1.5M+", min: 1500001, max: Infinity },
];

const mrrBands: Band[] = [
  ANY_MRR,
  { label: "Under $25K", min: 0, max: 24999 },
  { label: "$25K – $40K", min: 25000, max: 40000 },
  { label: "$40K+", min: 40001, max: Infinity },
];

const arrBands: Band[] = [
  ANY_ARR,
  { label: "Under $300K", min: 0, max: 299999 },
  { label: "$300K – $500K", min: 300000, max: 500000 },
  { label: "$500K+", min: 500001, max: Infinity },
];

const profitBands: Band[] = [
  ANY_PROFIT,
  { label: "Under $15K / mo", min: 0, max: 14999 },
  { label: "$15K – $25K / mo", min: 15000, max: 25000 },
  { label: "$25K+ / mo", min: 25001, max: Infinity },
];

const ageBands: Band[] = [
  ANY_AGE,
  { label: "Under 5 years", min: 0, max: 4 },
  { label: "5–7 years", min: 5, max: 7 },
  { label: "8+ years", min: 8, max: Infinity },
];

const growthBands: Band[] = [
  ANY_GROWTH,
  { label: "Under 20%", min: 0, max: 19 },
  { label: "20–35%", min: 20, max: 35 },
  { label: "35%+", min: 36, max: Infinity },
];

function BusinessesPage() {
  const { listings, ready } = useMarketplace();
  const catalog = useMemo(
    () => (ready ? getVisibleListings() : businesses),
    [listings, ready],
  );

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState<Band>(ANY_PRICE);
  const [mrr, setMrr] = useState<Band>(ANY_MRR);
  const [arr, setArr] = useState<Band>(ANY_ARR);
  const [profit, setProfit] = useState<Band>(ANY_PROFIT);
  const [age, setAge] = useState<Band>(ANY_AGE);
  const [growth, setGrowth] = useState<Band>(ANY_GROWTH);
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(false);

  const cats = ["All", ...categories];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = catalog.filter((b) => {
      const matchesQuery =
        !q ||
        [b.name, b.headline, b.summary, b.category, b.model, ...b.stack]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return (
        matchesQuery &&
        (category === "All" || b.category === category) &&
        b.priceNum >= price.min &&
        b.priceNum <= price.max &&
        b.mrrNum >= mrr.min &&
        b.mrrNum <= mrr.max &&
        b.arrNum >= arr.min &&
        b.arrNum <= arr.max &&
        b.profitNum >= profit.min &&
        b.profitNum <= profit.max &&
        b.ageYears >= age.min &&
        b.ageYears <= age.max &&
        b.growthNum >= growth.min &&
        b.growthNum <= growth.max
      );
    });

    if (sort === "price-asc") list = [...list].sort((a, b) => a.priceNum - b.priceNum);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.priceNum - a.priceNum);
    if (sort === "mrr") list = [...list].sort((a, b) => b.mrrNum - a.mrrNum);
    if (sort === "growth") list = [...list].sort((a, b) => b.growthNum - a.growthNum);

    return list;
  }, [catalog, query, category, price, mrr, arr, profit, age, growth, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pages);
  const visible = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const reset = () => {
    setQuery("");
    setCategory("All");
    setPrice(ANY_PRICE);
    setMrr(ANY_MRR);
    setArr(ANY_ARR);
    setProfit(ANY_PROFIT);
    setAge(ANY_AGE);
    setGrowth(ANY_GROWTH);
    setSort("featured");
    setPage(1);
  };

  return (
    <Section className="pt-16 pb-16">
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">SaaS for sale</h1>
      <p className="mt-2 text-muted-foreground">Price, revenue, and profit on every listing.</p>

      <div className="mt-8 space-y-4">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search companies…"
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {cats.slice(0, 6).map((c) => (
            <button
              key={c}
              onClick={() => {
                setCategory(c);
                setPage(1);
              }}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs",
                category === c
                  ? "border-primary/40 bg-primary/12 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">{filtered.length} listings</p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setMore((v) => !v)}>
              {more ? "Fewer filters" : "More filters"}
            </Button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-9 rounded-lg border border-border bg-background px-3 text-sm"
            >
              <option value="featured">Featured</option>
              <option value="price-desc">Price: high to low</option>
              <option value="price-asc">Price: low to high</option>
              <option value="mrr">Highest MRR</option>
              <option value="growth">Highest growth</option>
            </select>
          </div>
        </div>

        {more ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <FilterSelect label="Asking price" value={price.label} options={priceBands} onChange={(v) => { setPrice(v); setPage(1); }} />
            <FilterSelect label="MRR" value={mrr.label} options={mrrBands} onChange={(v) => { setMrr(v); setPage(1); }} />
            <FilterSelect label="ARR" value={arr.label} options={arrBands} onChange={(v) => { setArr(v); setPage(1); }} />
            <FilterSelect label="Profit" value={profit.label} options={profitBands} onChange={(v) => { setProfit(v); setPage(1); }} />
            <FilterSelect label="Business age" value={age.label} options={ageBands} onChange={(v) => { setAge(v); setPage(1); }} />
            <FilterSelect label="Growth rate" value={growth.label} options={growthBands} onChange={(v) => { setGrowth(v); setPage(1); }} />
            <Button variant="ghost" size="sm" onClick={reset}>Reset</Button>
          </div>
        ) : null}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((b) => (
          <OpportunityCard key={b.id} b={b} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-sm text-muted-foreground">
          No SaaS matches these filters. Reset to see all listings.
        </p>
      ) : null}

      {pages > 1 ? (
        <div className="mt-10 flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" disabled={safePage === 1} onClick={() => setPage((p) => p - 1)}>
            Previous
          </Button>
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={cn(
                "grid size-9 place-items-center rounded-lg border text-sm",
                n === safePage
                  ? "border-primary/40 bg-primary/10"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {n}
            </button>
          ))}
          <Button variant="outline" size="sm" disabled={safePage === pages} onClick={() => setPage((p) => p + 1)}>
            Next
          </Button>
        </div>
      ) : null}
    </Section>
  );
}

function FilterSelect<T extends { label: string }>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: T[];
  onChange: (v: T) => void;
}) {
  return (
    <label className="grid gap-1.5 text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
      {label}
      <select
        value={value}
        onChange={(e) => {
          const next = options.find((o) => o.label === e.target.value);
          if (next) onChange(next);
        }}
        className="h-9 rounded-lg border border-border bg-background px-3 text-sm font-normal tracking-normal text-foreground normal-case"
      >
        {options.map((o) => (
          <option key={o.label} value={o.label}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
