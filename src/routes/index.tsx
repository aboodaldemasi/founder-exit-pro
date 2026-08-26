import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Building2,
  Cpu,
  FileSearch,
  Globe,
  Handshake,
  LineChart,
  Lock,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Terminal,
  Users,
  Workflow,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { Eyebrow, Section, SectionHeader } from "@/components/site/Section";
import { OpportunityCard } from "@/components/site/OpportunityCard";
import { businesses } from "@/data/businesses";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Merideon Advisory — Micro SaaS M&A Advisory & Brokerage" },
      {
        name: "description",
        content:
          "A boutique M&A advisory specialising exclusively in Micro SaaS. We represent profitable founders and connect them with qualified buyers in confidential transactions.",
      },
      { property: "og:title", content: "Sell Your Micro SaaS With Confidence — Merideon" },
      {
        property: "og:description",
        content:
          "Confidential Micro SaaS M&A advisory. Founder representation, qualified buyers, $100K–$2M+ transactions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const trust = [
  { icon: Lock, label: "Confidential Process" },
  { icon: ShieldCheck, label: "Qualified Buyers" },
  { icon: Handshake, label: "Founder Representation" },
  { icon: Globe, label: "Global Reach" },
];

const marketCategories = [
  { icon: Bot, name: "AI SaaS", copy: "Applied AI products with defensible workflow value." },
  { icon: Building2, name: "B2B SaaS", copy: "Subscription software sold to businesses." },
  { icon: Layers2, name: "Vertical SaaS", copy: "Software built for one industry's workflow." },
  { icon: Terminal, name: "Developer Tools", copy: "Bottom-up adoption inside engineering teams." },
  { icon: Sparkles, name: "Productivity", copy: "Tools embedded in daily operating rhythm." },
  { icon: Megaphone, name: "Marketing SaaS", copy: "Revenue-attached tooling for marketing teams." },
  { icon: Workflow, name: "Automation SaaS", copy: "Systems moving data between business tools." },
  { icon: BarChart3, name: "Analytics SaaS", copy: "Reporting layers with high switching cost." },
  { icon: Wallet, name: "FinTech SaaS", copy: "Finance workflow software in regulated niches." },
];

function Layers2(props: React.ComponentProps<typeof LineChart>) {
  return <LineChart {...props} />;
}

const process = [
  { n: "01", t: "Confidential Consultation", c: "A private conversation about your business and objectives." },
  { n: "02", t: "Screening & Evaluation", c: "We only represent businesses that will withstand diligence." },
  { n: "03", t: "Valuation & Positioning", c: "A defensible range and the narrative that supports it." },
  { n: "04", t: "Qualified Buyer Outreach", c: "Targeted approach to buyers matched to your profile." },
  { n: "05", t: "Diligence & Negotiation", c: "We manage information flow and hold the price line." },
  { n: "06", t: "Closing & Transition", c: "Documentation, escrow and a clean handover." },
];

const reasons = [
  {
    icon: FileSearch,
    t: "We screen before we represent",
    c: "Most businesses that approach us are declined. Buyers know that a Merideon mandate has already been examined.",
  },
  {
    icon: Users,
    t: "We qualify every buyer",
    c: "Capital, mandate fit and acquisition history are verified before any confidential information is released.",
  },
  {
    icon: Lock,
    t: "Confidentiality is structural",
    c: "Opportunities are presented under codename. Identity, customers and financials are released in stages under NDA.",
  },
  {
    icon: Handshake,
    t: "We represent the founder",
    c: "Sell-side only. Our incentive is aligned with your outcome — fees are earned on close.",
  },
];

function HomePage() {
  const featured = businesses.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-32 pb-20 md:pt-40">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ backgroundImage: "var(--gradient-hero)" }}
          aria-hidden
        />
        <div className="mx-auto w-full max-w-6xl">
          <Reveal>
            <Eyebrow>Micro SaaS M&amp;A Advisory</Eyebrow>
            <h1 className="text-gradient mt-8 max-w-4xl text-5xl font-semibold tracking-[-0.03em] text-balance md:text-7xl">
              Sell Your Micro SaaS With Confidence
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              We represent profitable Micro SaaS founders and connect exceptional software
              businesses with qualified buyers worldwide. Transactions typically range from
              $100K to $2M+.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" variant="premium">
                <Link to="/sell">
                  Get a Confidential Valuation <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <Link to="/businesses">Explore Micro SaaS</Link>
              </Button>
            </div>
          </Reveal>

          {/* Transaction flow visual */}
          <Reveal delay={120}>
            <div className="glass mt-20 grid gap-px overflow-hidden rounded-2xl md:grid-cols-[1fr_auto_1fr_auto_1fr]">
              {[
                { k: "Founder", v: "Profitable Micro SaaS, prepared and positioned." },
                { k: "Merideon Advisory", v: "Screening, valuation, confidential process management." },
                { k: "Qualified Buyer", v: "Verified capital, matched mandate, signed NDA." },
              ].map((s, i) => (
                <div key={s.k} className="contents">
                  <div className="px-8 py-10">
                    <p className="text-[10px] tracking-[0.22em] text-primary uppercase">
                      Stage {i + 1}
                    </p>
                    <p className="mt-4 text-base font-semibold tracking-tight">{s.k}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.v}</p>
                  </div>
                  {i < 2 ? (
                    <div className="hidden items-center px-2 md:flex">
                      <ArrowRight className="size-4 text-primary/60" />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-8 md:grid-cols-4">
              {trust.map((t) => (
                <div key={t.label} className="flex items-center gap-2.5">
                  <t.icon className="size-4 text-primary" />
                  <span className="text-xs tracking-[0.08em] text-muted-foreground uppercase">
                    {t.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Firm at a glance — structured for real figures */}
      <Section className="py-20">
        <Reveal>
          <div className="grid gap-px overflow-hidden border border-border/70 md:grid-cols-3">
            {[
              { k: "Specialisation", v: "Micro SaaS only", c: "No e-commerce, no content, no agencies." },
              { k: "Transaction range", v: "$100K – $2M+", c: "Founder-led, profitable software businesses." },
              { k: "Engagement", v: "Sell-side exclusive", c: "Fees earned on a completed transaction." },
            ].map((s) => (
              <div key={s.k} className="bg-white/[0.015] px-8 py-10">
                <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">{s.k}</p>
                <p className="mt-4 text-2xl font-semibold tracking-tight">
                  <span className="text-emerald-gradient">{s.v}</span>
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{s.c}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Market section */}
      <Section className="py-20">
        <SectionHeader
          align="left"
          eyebrow="The market we cover"
          title="The Micro SaaS Categories We Represent"
          description="A narrow mandate produces better outcomes. These are the only categories we advise on."
        />
        <div className="mt-14 grid gap-px overflow-hidden border border-border/70 sm:grid-cols-2 lg:grid-cols-3">
          {marketCategories.map((c, i) => (
            <Reveal key={c.name} delay={(i % 3) * 70}>
              <div className="h-full bg-white/[0.015] px-7 py-9 transition-colors duration-500 hover:bg-primary/[0.04]">
                <c.icon className="size-5 text-primary" strokeWidth={1.5} />
                <h3 className="mt-7 text-sm font-semibold tracking-tight">{c.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Featured opportunities */}
      <Section className="py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            align="left"
            eyebrow="Current mandates"
            title="Confidential Acquisition Opportunities"
            description="Presented under codename. Identity and full financials are released to qualified buyers under NDA."
          />
          <Reveal>
            <Button asChild variant="ghost">
              <Link to="/businesses">
                View all opportunities <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {featured.map((b, i) => (
            <Reveal key={b.id} delay={(i % 2) * 80}>
              <OpportunityCard b={b} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Confidentiality */}
      <Section className="py-20">
        <Reveal>
          <div className="glass grid gap-10 rounded-2xl p-10 md:grid-cols-2 md:p-14">
            <div>
              <Eyebrow>Confidentiality</Eyebrow>
              <h2 className="text-gradient mt-6 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
                Not every detail is public.
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                Company identity, customer data, contracts and complete financials are never
                published. Access is granted in stages once a buyer is qualified and an NDA is
                executed.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="premium">
                  <Link to="/buyer-network">Become a Qualified Buyer</Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link to="/contact">Request Confidential Information</Link>
                </Button>
              </div>
            </div>
            <ol className="grid gap-px self-start overflow-hidden border border-border/70">
              {[
                ["Public", "Category, metrics range, business model."],
                ["Qualified buyer", "Codename teaser and financial snapshot."],
                ["NDA executed", "Confidential Information Memorandum (CIM)."],
                ["Diligence stage", "Customers, contracts, code and bank records."],
              ].map(([k, v], i) => (
                <li key={k} className="bg-white/[0.015] px-6 py-5">
                  <p className="text-[10px] tracking-[0.2em] text-primary uppercase">
                    Level {i + 1} · {k}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{v}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </Section>

      {/* Process */}
      <Section className="py-20">
        <SectionHeader
          align="left"
          eyebrow="Acquisition process"
          title="A Structured, Confidential Transaction"
          description="The same discipline an institutional process would apply, sized for Micro SaaS transactions."
        />
        <div className="mt-14 grid gap-px overflow-hidden border border-border/70 md:grid-cols-2 lg:grid-cols-3">
          {process.map((p, i) => (
            <Reveal key={p.n} delay={(i % 3) * 70}>
              <div className="h-full bg-white/[0.015] px-7 py-9">
                <p className="font-mono text-xs tracking-[0.2em] text-primary">{p.n}</p>
                <h3 className="mt-6 text-sm font-semibold tracking-tight">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.c}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Why us */}
      <Section className="py-20">
        <SectionHeader
          align="left"
          eyebrow="Why founders retain us"
          title="Representation, Not Distribution"
        />
        <div className="mt-14 grid gap-10 md:grid-cols-2">
          {reasons.map((r, i) => (
            <Reveal key={r.t} delay={(i % 2) * 80}>
              <div className="border-t border-border pt-8">
                <r.icon className="size-5 text-primary" strokeWidth={1.5} />
                <h3 className="mt-6 text-base font-semibold tracking-tight">{r.t}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{r.c}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Dual CTA */}
      <Section className="py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="glass flex h-full flex-col rounded-2xl p-10">
              <Eyebrow>Founders</Eyebrow>
              <h2 className="mt-6 text-2xl font-semibold tracking-tight md:text-3xl">
                Considering selling your Micro SaaS?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                A confidential valuation conversation, with no obligation and nothing shared
                without your written approval.
              </p>
              <div className="mt-8">
                <Button asChild variant="premium" size="lg">
                  <Link to="/sell">
                    Request a Confidential Valuation <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <div className="flex h-full flex-col border border-border/70 bg-white/[0.015] p-10">
              <Eyebrow>Buyers</Eyebrow>
              <h2 className="mt-6 text-2xl font-semibold tracking-tight md:text-3xl">
                Private network of Micro SaaS buyers
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Qualified members receive codename teasers the day a mandate opens — before
                anything is published.
              </p>
              <div className="mt-8">
                <Button asChild variant="ghost" size="lg">
                  <Link to="/buyer-network">
                    Apply to Buyer Network <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
