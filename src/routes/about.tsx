import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/site/CountUp";
import { Reveal } from "@/components/site/Reveal";
import { Eyebrow, GlassCard, Section, SectionHeader } from "@/components/site/Section";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Merideon Advisory — M&A for Digital Businesses" },
      {
        name: "description",
        content:
          "Merideon is a sell-side M&A advisory representing founders of SaaS, AI and digital businesses. Institutional process, founder-first representation.",
      },
      { property: "og:title", content: "About Merideon Advisory" },
      {
        property: "og:description",
        content: "Institutional M&A discipline applied to founder-led digital businesses.",
      },
    ],
  }),
  component: AboutPage,
});

const principles = [
  {
    title: "We only represent one side",
    copy: "We are retained by sellers. Buyers are relationships, never clients — so there is never a question about whose interests we are protecting in a negotiation.",
  },
  {
    title: "Confidentiality is structural",
    copy: "Anonymised teasers, staged disclosure and NDA gating are not features we offer. They are how the process is built from the first email onward.",
  },
  {
    title: "Price comes from competition",
    copy: "A single interested buyer is a negotiation. Four interested buyers is a market. We build the second situation on every mandate we take.",
  },
  {
    title: "Selective mandates",
    copy: "We decline more mandates than we accept. Concentrated attention is the only way a small team delivers institutional outcomes.",
  },
];

const team = [
  { name: "Elena Marchetti", role: "Managing Partner", bio: "Fifteen years in technology M&A. Previously led software coverage at a mid-market investment bank." },
  { name: "Julian Okafor", role: "Head of Valuation", bio: "Former SaaS CFO. Builds every valuation model and financial review in-house." },
  { name: "Sofia Lindqvist", role: "Head of Buyer Coverage", bio: "Maintains the buyer network and runs matching across funds, holdcos and strategics." },
];

function AboutPage() {
  return (
    <>
      <Section className="pt-16 pb-10">
        <Reveal>
          <div className="max-w-3xl">
            <Eyebrow>The firm</Eyebrow>
            <h1 className="text-gradient mt-6 text-4xl font-semibold tracking-tight text-balance md:text-5xl">
              Institutional M&amp;A Discipline, Applied to Founder-Led Businesses
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              Merideon Advisory was founded on a simple observation: the founders building
              the most valuable software businesses in the world were selling them through
              classified-ad marketplaces. We brought the investment-bank playbook down to
              the scale where it was missing.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="glass mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl lg:grid-cols-4">
            {[
              { value: 25, prefix: "$", suffix: "M+", label: "Transaction value" },
              { value: 50, suffix: "+", label: "Mandates represented" },
              { value: 14, label: "Countries transacted" },
              { value: 95, suffix: "%", label: "Close rate" },
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

      <Section className="py-16">
        <SectionHeader eyebrow="Principles" title="How We Operate" />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <GlassCard className="h-full p-8">
                <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeader eyebrow="Team" title="Senior Attention on Every Mandate" />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {team.map((t, i) => (
            <Reveal key={t.name} delay={i * 90}>
              <GlassCard className="h-full p-8">
                <div className="grid size-12 place-items-center rounded-full border border-primary/25 bg-primary/10 text-sm font-semibold text-primary">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="mt-6 text-base font-semibold">{t.name}</h3>
                <p className="mt-1 text-xs tracking-[0.14em] text-primary uppercase">{t.role}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.bio}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" variant="premium">
              <Link to="/sell">Request Free Valuation</Link>
            </Button>
            <Button asChild size="lg" variant="glass">
              <Link to="/contact">Book a consultation</Link>
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
