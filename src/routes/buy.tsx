import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ClipboardCheck, Compass, FileLock2, Landmark } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { Eyebrow, GlassCard, Section, SectionHeader } from "@/components/site/Section";

export const Route = createFileRoute("/buy")({
  head: () => ({
    meta: [
      { title: "Buy a Business — Acquisition Advisory | Merideon" },
      {
        name: "description",
        content:
          "Access vetted SaaS, AI and digital businesses under exclusive representation. Diligence support, structuring and closing for serious acquirers.",
      },
      { property: "og:title", content: "Buy a Business — Merideon Advisory" },
      {
        property: "og:description",
        content: "Off-market SaaS and digital acquisitions for qualified buyers.",
      },
    ],
  }),
  component: BuyPage,
});

const stages = [
  { icon: ClipboardCheck, title: "Qualification", copy: "Verify mandate, budget and proof of funds. One call, no forms." },
  { icon: Compass, title: "Deal Flow", copy: "Receive anonymised teasers matched to your thesis before publication." },
  { icon: FileLock2, title: "NDA & Data Room", copy: "Full financials, cohorts, contracts and code review in a managed room." },
  { icon: Landmark, title: "Offer to Close", copy: "LOI structuring, diligence coordination, escrow and transition planning." },
];

const criteria = [
  ["Deal size", "$250K – $25M enterprise value"],
  ["Profile", "Profitable, recurring revenue, low concentration"],
  ["Structures", "Cash, seller note, earn-out, equity roll"],
  ["Geography", "North America, EMEA, APAC"],
];

function BuyPage() {
  return (
    <>
      <Section className="pt-16 pb-8">
        <Reveal>
          <div className="max-w-3xl">
            <Eyebrow>Buy-side</Eyebrow>
            <h1 className="text-gradient mt-6 text-4xl font-semibold tracking-tight text-balance md:text-5xl">
              Acquire Businesses Before They Reach the Market
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              Every mandate we represent is exclusive, financially reviewed and founder-verified.
              Qualified buyers see opportunities first — often before any public listing exists.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="premium">
                <Link to="/businesses">
                  Browse Businesses <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="glass">
                <Link to="/buyer-network">Join Buyer Network</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section className="py-16">
        <SectionHeader
          eyebrow="Buy-side process"
          title="From Thesis to Wire"
          description="A managed acquisition path that respects your time and your diligence standards."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stages.map((s, i) => (
            <Reveal key={s.title} delay={i * 90}>
              <GlassCard className="h-full p-7 hover:-translate-y-1">
                <div className="grid size-11 place-items-center rounded-xl border border-primary/25 bg-primary/10">
                  <s.icon className="size-5 text-primary" />
                </div>
                <p className="mt-6 text-[11px] tracking-[0.18em] text-primary uppercase">
                  0{i + 1}
                </p>
                <h3 className="mt-1.5 text-base font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <Reveal>
          <div className="grid gap-10 rounded-[32px] border border-border p-8 md:grid-cols-2 md:items-center md:p-14">
            <div>
              <h2 className="text-gradient text-3xl font-semibold tracking-tight md:text-4xl">
                Acquisition Criteria
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                We work with funds, holdcos, search funds and operator-buyers. Tell us your
                thesis and we will only send what fits.
              </p>
              <Button asChild size="lg" variant="premium" className="mt-8">
                <Link to="/contact">Speak with an advisor</Link>
              </Button>
            </div>
            <div className="divide-y divide-border">
              {criteria.map(([k, v]) => (
                <div key={k} className="flex flex-col gap-1 py-4 sm:flex-row sm:justify-between">
                  <span className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
                    {k}
                  </span>
                  <span className="text-sm font-medium">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
