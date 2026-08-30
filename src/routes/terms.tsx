import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { Eyebrow, Section } from "@/components/site/Section";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — Founder Exit" },
      { name: "description", content: "Terms governing use of the Founder Exit marketplace." },
      { property: "og:title", content: "Terms of Use — Founder Exit" },
      { property: "og:description", content: "Terms governing use of the Founder Exit marketplace." },
    ],
  }),
  component: Page,
});

const sections: { h: string; p: string }[] = [
  { h: "Scope of services", p: "Founder Exit is a marketplace that connects SaaS founders with buyers. Nothing on this site constitutes an offer to sell or a solicitation to buy any security or business." },
  { h: "No investment advice", p: "Information published about listed businesses is provided for evaluation purposes. It is not financial, legal or tax advice, and prospective buyers must complete their own due diligence." },
  { h: "Listing information", p: "Metrics shown for listed businesses are provided by sellers and reviewed by Founder Exit. While reviewed in good faith, they are not warranted, and full verification occurs during diligence." },
  { h: "Confidentiality and NDAs", p: "Access to complete financial and operational information is conditional on a signed non-disclosure agreement. Breach of an NDA may result in removal from the buyer network and legal action." },
  { h: "Fees", p: "Seller representation is engaged on a success-fee basis unless otherwise agreed in a written mandate letter. Buyer network membership is free of charge." },
  { h: "Governing terms", p: "These terms may be updated from time to time. Continued use of the site constitutes acceptance of the current version." },
];

function Page() {
  return (
    <Section className="pt-16">
      <Reveal>
        <Eyebrow>Legal</Eyebrow>
        <h1 className="text-gradient mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
          Terms of Use
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
