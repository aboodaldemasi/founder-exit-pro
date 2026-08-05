import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { Eyebrow, Section } from "@/components/site/Section";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Merideon Advisory" },
      { name: "description", content: "How Merideon Advisory collects, uses and protects information submitted by founders and buyers." },
      { property: "og:title", content: "Privacy Policy — Merideon Advisory" },
      { property: "og:description", content: "How Merideon Advisory collects, uses and protects information submitted by founders and buyers." },
    ],
  }),
  component: Page,
});

const sections: { h: string; p: string }[] = [
  { h: "Information we collect", p: "We collect the information you submit through valuation requests, buyer applications and consultation forms, together with basic analytics about how the site is used." },
  { h: "How we use it", p: "Submitted information is used solely to assess a mandate, match qualified buyers, and communicate with you. We do not sell or rent personal data to third parties." },
  { h: "Confidential business information", p: "Financial and operational information about a business is treated as privileged. It is disclosed to prospective buyers only in anonymised form, or in full after a signed NDA and with your written approval." },
  { h: "Data retention", p: "Enquiry records are retained for as long as required to service the relationship and to satisfy legal and accounting obligations, and are deleted on request where no obligation applies." },
  { h: "Your rights", p: "You may request access to, correction of, or deletion of your personal data at any time by writing to advisory@merideon.com." },
  { h: "Contact", p: "Questions about this policy can be directed to advisory@merideon.com." },
];

function Page() {
  return (
    <Section className="pt-16">
      <Reveal>
        <Eyebrow>Legal</Eyebrow>
        <h1 className="text-gradient mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated 5 August 2026</p>
      </Reveal>
      <div className="mt-14 max-w-3xl space-y-10">
        {sections.map((s, i) => (
          <Reveal key={s.h} delay={i * 60}>
            <div>
              <h2 className="text-lg font-semibold tracking-tight">{s.h}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.p}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
