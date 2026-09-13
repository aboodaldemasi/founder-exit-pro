import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { Eyebrow, Section } from "@/components/site/Section";
import { BRAND } from "@/lib/brand";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Founder Exit" },
      { name: "description", content: "How Founder Exit collects and protects information from visitors and sellers." },
      { property: "og:title", content: "Privacy Policy — Founder Exit" },
      { property: "og:description", content: "How Founder Exit collects, uses and protects information submitted by founders and buyers." },
    ],
  }),
  component: Page,
});

const sections: { h: string; p: string }[] = [
  { h: "Information we collect", p: "We collect what you submit when you create a visitor or seller account, apply to sell a SaaS, list metrics, or send a contact message, together with basic analytics about how the site is used." },
  { h: "How we use it", p: "Submitted information is used to operate the marketplace, verify sellers, review listings, and communicate with you. We do not sell or rent personal data to third parties." },
  { h: "Confidential business information", p: "The real company and product name are for admin review only. Public pages show an anonymous code and metrics so a live SaaS is not disrupted." },
  { h: "Data retention", p: "Enquiry records are retained for as long as required to service the relationship and to satisfy legal and accounting obligations, and are deleted on request where no obligation applies." },
  { h: "Your rights", p: `You may request access to, correction of, or deletion of your personal data at any time by writing to ${BRAND.email}.` },
  { h: "Contact", p: `Questions about this policy can be directed to ${BRAND.email}.` },
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
