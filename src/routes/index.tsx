import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Bot,
  Boxes,
  Brain,
  Chrome,
  FileSearch,
  Gauge,
  Globe,
  Handshake,
  Layers,
  Lock,
  Mail,
  Newspaper,
  Puzzle,
  Quote,
  ScrollText,
  ShoppingBag,
  Smartphone,
  Store,
  Users,
} from "lucide-react";

import heroImage from "@/assets/hero-network.jpg";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/site/CountUp";
import { Reveal } from "@/components/site/Reveal";
import { Eyebrow, GlassCard, Section, SectionHeader } from "@/components/site/Section";
import { businesses } from "@/data/businesses";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Merideon Advisory — Sell Your SaaS With Confidence" },
      {
        name: "description",
        content:
          "We represent founders and help them sell SaaS, AI products, software companies and digital businesses to qualified buyers worldwide.",
      },
      { property: "og:title", content: "Sell Your SaaS With Confidence — Merideon Advisory" },
      {
        property: "og:description",
        content:
          "Confidential, sell-side M&A representation for founders of SaaS, AI and digital businesses.",
      },
    ],
  }),
  component: Home,
});

const stats = [
  { value: 25, prefix: "$", suffix: "M+", label: "Transaction Value" },
  { value: 120, suffix: "+", label: "Qualified Buyers" },
  { value: 50, suffix: "+", label: "Businesses Represented" },
  { value: 95, suffix: "%", label: "Successful Closings" },
];

const steps = [
  { icon: FileSearch, title: "Submit Business", copy: "Share your metrics through a secure intake. Nothing leaves our desk." },
  { icon: ScrollText, title: "Business Review", copy: "Our analysts verify financials, churn, concentration and defensibility." },
  { icon: Gauge, title: "Valuation", copy: "A defensible range built on comparable closed transactions, not guesswork." },
  { icon: Users, title: "Buyer Matching", copy: "Anonymised outreach to a vetted network of funds, operators and strategics." },
  { icon: Lock, title: "Due Diligence", copy: "We manage the data room, Q&A and pace so you keep running the business." },
  { icon: Handshake, title: "Close the Deal", copy: "LOI to wire, with legal coordination and escrow handled end to end." },
];

const categories = [
  { icon: Brain, name: "AI SaaS" },
  { icon: Layers, name: "Micro SaaS" },
  { icon: Boxes, name: "Software Companies" },
  { icon: ShoppingBag, name: "Shopify Apps" },
  { icon: Chrome, name: "Chrome Extensions" },
  { icon: Puzzle, name: "WordPress Plugins" },
  { icon: Store, name: "E-commerce Brands" },
  { icon: Globe, name: "Websites" },
  { icon: Newspaper, name: "Newsletters" },
  { icon: Smartphone, name: "Mobile Apps" },
];

const advantages = [
  {
    icon: Users,
    title: "Qualified Buyer Network",
    copy: "120+ pre-screened acquirers — private equity, search funds, strategics and operator-buyers with verified proof of funds.",
  },
  {
    icon: Lock,
    title: "Confidential Process",
    copy: "Anonymised teasers, staged disclosure and NDA gating. Your team, customers and competitors learn nothing until you decide.",
  },
  {
    icon: Gauge,
    title: "Professional Valuation",
    copy: "Multiples grounded in closed comparable transactions, cohort quality and revenue durability — a range you can defend in a room.",
  },
  {
    icon: Handshake,
    title: "Negotiation & Deal Support",
    copy: "We run the competitive tension, structure earn-outs and coordinate legal and escrow through to a clean wire.",
  },
];

const testimonials = [
  {
    quote:
      "Merideon ran a genuinely competitive process. We went from one soft inbound offer to four LOIs in eleven weeks, and closed 1.9x above the original number.",
    name: "Daniel Whitmore",
    role: "Founder, vertical SaaS · exited at $6.2M",
  },
  {
    quote:
      "Confidentiality was non-negotiable for us. Not a single employee or customer knew until the day we announced. That alone was worth the mandate.",
    name: "Priya Raghavan",
    role: "Co-founder, AI infrastructure · exited at $11.4M",
  },
  {
    quote:
      "The valuation work was the most rigorous document anyone has ever produced about my company. Buyers stopped negotiating the multiple and started negotiating terms.",
    name: "Marcus Feld",
    role: "Founder, developer tooling · exited at $3.8M",
  },
];

function Home() {
  const featured = businesses.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-20 pb-24 md:pt-28 md:pb-32">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ backgroundImage: "var(--gradient-hero)" }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-px hairline" />
        <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="animate-rise">
            <Eyebrow>Sell-side M&amp;A advisory</Eyebrow>
            <h1 className="text-gradient mt-6 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
              Sell Your SaaS With Confidence
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">
              We represent founders and help them sell SaaS, AI products, software companies
              and digital businesses to qualified buyers worldwide.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" variant="premium">
                <Link to="/sell">
                  Get Free Valuation <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="glass">
                <Link to="/businesses">Browse Businesses</Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <BadgeCheck className="size-4 text-primary" /> No fee until you close
              </span>
              <span className="inline-flex items-center gap-2">
                <Lock className="size-4 text-primary" /> NDA-gated from first contact
              </span>
            </div>
          </div>

          <div className="relative animate-rise [animation-delay:150ms]">
            <div className="glass relative overflow-hidden rounded-[28px] p-2">
              <img
                src={heroImage}
                alt="Illustration of founders and qualified buyers connecting across a global network"
                width={1280}
                height={1024}
                className="w-full rounded-[22px] object-cover"
              />
              <div className="absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/5" />
            </div>
            <div className="glass absolute -bottom-6 -left-4 hidden rounded-2xl px-5 py-4 sm:block">
              <p className="text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                Live mandates
              </p>
              <p className="mt-1 text-2xl font-semibold">
                <span className="text-emerald-gradient">$18.4M</span>
              </p>
              <p className="text-xs text-muted-foreground">Under representation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <Section className="py-16 md:py-20">
        <div className="glass grid grid-cols-2 gap-px overflow-hidden rounded-3xl lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90}>
              <div className="flex flex-col items-center gap-2 px-6 py-10 text-center">
                <p className="text-3xl font-semibold tracking-tight md:text-5xl">
                  <span className="text-emerald-gradient">
                    <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </span>
                </p>
                <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section>
        <SectionHeader
          eyebrow="The process"
          title="How It Works"
          description="A structured six-stage process designed to create competition, protect confidentiality and close cleanly."
        />
        <div className="relative mt-16">
          <div className="absolute top-6 right-0 left-0 hidden h-px hairline lg:block" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div className="relative">
                  <div className="glass relative z-10 grid size-12 place-items-center rounded-full">
                    <s.icon className="size-5 text-primary" />
                  </div>
                  <p className="mt-5 text-[11px] tracking-[0.18em] text-primary uppercase">
                    Step {i + 1}
                  </p>
                  <h3 className="mt-1.5 text-base font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Categories */}
      <Section>
        <SectionHeader
          eyebrow="Coverage"
          title="Business Categories We Represent"
          description="Specialised sell-side coverage across the digital economy — from AI infrastructure to owned-audience media."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((c, i) => (
            <Reveal key={c.name} delay={(i % 5) * 70}>
              <GlassCard className="h-full p-5 hover:-translate-y-1">
                <c.icon className="size-5 text-primary" />
                <h3 className="mt-8 text-sm font-semibold">{c.name}</h3>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Featured businesses */}
      <Section>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            align="left"
            eyebrow="Current mandates"
            title="Featured Businesses"
            description="A selection of businesses currently represented. Full financials released under NDA."
          />
          <Reveal>
            <Button asChild variant="glass">
              <Link to="/businesses">
                View all <ArrowUpRight />
              </Link>
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {featured.map((b, i) => (
            <Reveal key={b.id} delay={i * 100}>
              <GlassCard className="flex h-full flex-col hover:-translate-y-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{b.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {b.category} · {b.country}
                    </p>
                  </div>
                  <span className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-[10px] font-medium tracking-wider text-primary uppercase">
                    Live
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/70">
                  {[
                    ["MRR", b.mrr],
                    ["ARR", b.arr],
                    ["Margin", b.margin],
                    ["Employees", b.employees],
                    ["Founded", b.founded],
                    ["Tech", b.tech[0] ?? "—"],
                  ].map(([k, v]) => (
                    <div key={k} className="bg-white/[0.02] px-4 py-3">
                      <p className="text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                        {k}
                      </p>
                      <p className="mt-1 text-sm font-medium">{v}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-end justify-between border-t border-border pt-5">
                  <div>
                    <p className="text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                      Asking price
                    </p>
                    <p className="mt-1 text-xl font-semibold">
                      <span className="text-emerald-gradient">{b.price}</span>
                    </p>
                  </div>
                  <Button asChild size="sm" variant="premium">
                    <Link to="/businesses/$businessId" params={{ businessId: b.id }}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Why choose us */}
      <Section>
        <SectionHeader
          eyebrow="Why Merideon"
          title="Representation, Not a Listing"
          description="A marketplace posts your business. An advisory firm represents you — and negotiates on your side of the table."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {advantages.map((a, i) => (
            <Reveal key={a.title} delay={i * 90}>
              <GlassCard className="h-full p-8 hover:-translate-y-1">
                <div className="grid size-11 place-items-center rounded-xl border border-primary/25 bg-primary/10">
                  <a.icon className="size-5 text-primary" />
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-tight">{a.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.copy}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section>
        <SectionHeader
          eyebrow="Founder outcomes"
          title="What Founders Say"
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <GlassCard className="flex h-full flex-col justify-between p-8">
                <Quote className="size-6 text-primary/60" />
                <p className="mt-6 text-sm leading-relaxed text-foreground/90">"{t.quote}"</p>
                <div className="mt-8 border-t border-border pt-5">
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{t.role}</p>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Buyer network */}
      <Section>
        <Reveal>
          <div className="glass relative overflow-hidden rounded-[32px] px-8 py-16 text-center md:px-16">
            <div
              className="pointer-events-none absolute inset-0"
              style={{ backgroundImage: "var(--gradient-hero)" }}
            />
            <div className="relative">
              <Bot className="mx-auto size-6 text-primary" />
              <h2 className="text-gradient mx-auto mt-6 max-w-2xl text-3xl font-semibold tracking-tight text-balance md:text-4xl">
                Looking to Acquire Your Next Business?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                Join a vetted network of funds, holdcos and operator-buyers. Receive
                off-market opportunities before they are ever published.
              </p>
              <Button asChild size="lg" variant="premium" className="mt-9">
                <Link to="/buyer-network">
                  Join Buyer Network <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Seller CTA */}
      <Section className="pt-0">
        <Reveal>
          <div className="grid gap-10 rounded-[32px] border border-border p-8 md:grid-cols-2 md:items-center md:p-14">
            <div>
              <Eyebrow>Confidential</Eyebrow>
              <h2 className="text-gradient mt-6 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
                Thinking About Selling?
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                Get a defensible valuation range and a candid read on market appetite. No
                obligation, no fee, and nothing shared without your written consent.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" variant="premium">
                  <Link to="/sell">Request Free Valuation</Link>
                </Button>
                <Button asChild size="lg" variant="glass">
                  <a href="mailto:advisory@merideon.com">
                    <Mail /> Email an advisor
                  </a>
                </Button>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Typical timeline", "90–150 days"],
                ["Median multiple", "3.8x SDE"],
                ["Buyer response", "Under 14 days"],
                ["Success fee", "Only on close"],
              ].map(([k, v]) => (
                <div key={k} className="glass rounded-2xl px-5 py-6">
                  <p className="text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                    {k}
                  </p>
                  <p className="mt-2 text-lg font-semibold">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
