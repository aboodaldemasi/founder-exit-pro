import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/site/CountUp";
import { Reveal } from "@/components/site/Reveal";
import { Eyebrow, GlassCard, Section, SectionHeader } from "@/components/site/Section";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Founder Exit" },
      {
        name: "description",
        content:
          "Founder Exit is a marketplace for buying and selling SaaS companies — simple, private, and built for founders and investors.",
      },
      { property: "og:title", content: "About Founder Exit" },
      {
        property: "og:description",
        content: "A premium SaaS acquisition marketplace.",
      },
    ],
  }),
  component: AboutPage,
});

const principles = [
  {
    title: "Marketplace, not a store",
    copy: "Every listing is a SaaS company. We do not sell products, services, or side projects dressed up as businesses.",
  },
  {
    title: "Public metrics, private records",
    copy: "Price, MRR, ARR, profit, and growth are enough to screen. Customer data and full financials stay gated.",
  },
  {
    title: "Two roles, one platform",
    copy: "Sellers list and manage deal status. Buyers search, save, request, and offer. Each has a workspace.",
  },
  {
    title: "Simple on purpose",
    copy: "Fewer pages, clearer cards, and buttons that do something. The process should feel calm, not crowded.",
  },
];

const team = [
  { name: "Elena Marchetti", role: "Marketplace", bio: "Sets listing standards and how deals move from inquiry to close." },
  { name: "Julian Okafor", role: "Financial review", bio: "Checks the metrics sellers publish before a listing goes live." },
  { name: "Sofia Lindqvist", role: "Buyer coverage", bio: "Helps qualified buyers find SaaS that matches their thesis." },
];

function AboutPage() {
  return (
    <>
      <Section className="pt-16 pb-10">
        <Reveal>
          <div className="max-w-3xl">
            <Eyebrow>Why Founder Exit</Eyebrow>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">
              A marketplace for SaaS companies
            </h1>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Founders list a business. Buyers see the numbers. Private files stay private until both sides agree.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border lg:grid-cols-4">
            {[
              { value: 6, suffix: "", label: "Live listings" },
              { value: 100, suffix: "K–$2M+", label: "Typical range", prefix: "$" },
              { value: 9, label: "SaaS categories" },
              { value: 48, suffix: "h", label: "Review window" },
            ].map((s) => (
              <div key={s.label} className="px-6 py-9 text-center">
                <p className="text-3xl font-semibold md:text-4xl">
                  <span className="text-emerald-gradient">
                    <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </span>
                </p>
                <p className="mt-2 text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section className="py-12">
        <SectionHeader eyebrow="Principles" title="How the platform works" />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <GlassCard className="h-full p-7">
                <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeader eyebrow="Team" title="People behind the desk" />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {team.map((t, i) => (
            <Reveal key={t.name} delay={i * 60}>
              <GlassCard className="h-full p-7">
                <div className="grid size-12 place-items-center rounded-full border border-primary/25 bg-primary/10 text-sm font-semibold text-primary">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="mt-5 text-base font-semibold">{t.name}</h3>
                <p className="mt-1 text-xs tracking-[0.14em] text-primary uppercase">{t.role}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.bio}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" variant="premium">
              <Link to="/sell">Sell your SaaS</Link>
            </Button>
            <Button asChild size="lg" variant="glass">
              <Link to="/businesses">Browse marketplace</Link>
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
