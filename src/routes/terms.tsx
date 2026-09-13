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
  { h: "Scope of services", p: "Founder Exit is an intermediary for SaaS sales only. We do not own listed companies, we do not buy them, and nothing on this site is an offer by Founder Exit to sell a business or a security." },
  { h: "The parties", p: "The seller owns the SaaS. Visitors browse anonymous listings. Anyone who wants to buy contacts Founder Exit and arranges a deposit with the operator. A sale agreement is between the parties we introduce — not a purchase from this website." },
  { h: "No investment advice", p: "Listing metrics are provided by sellers for screening. It is not financial, legal or tax advice. Buyers must complete their own due diligence through Founder Exit." },
  { h: "Listing information", p: "Public pages hide the product name. Metrics are supplied by the seller and checked before they go live, but they are not warranted." },
  { h: "Confidentiality", p: "Brand, customers, and stack stay private on the public site. Founder Exit uses the real name only to verify the seller and to broker a serious enquiry." },
  { h: "Fees", p: "Browsing and applying to sell do not create a purchase. A deposit to show buying intent is arranged with the operator by email until a payment inbox or gateway is added. Any success fee is agreed in writing." },
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
        <p className="mt-4 text-sm text-muted-foreground">Last updated 31 August 2026</p>
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
