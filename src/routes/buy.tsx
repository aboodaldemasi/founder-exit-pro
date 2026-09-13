import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { Eyebrow, Section } from "@/components/site/Section";
import { BRAND } from "@/lib/brand";

export const Route = createFileRoute("/buy")({
  head: () => ({
    meta: [
      { title: "Buy a SaaS — Founder Exit" },
      {
        name: "description",
        content:
          "Browse anonymous SaaS listings, then contact Founder Exit and pay a deposit to buy.",
      },
      { property: "og:title", content: "Buy a SaaS — Founder Exit" },
      {
        property: "og:description",
        content: "We broker the sale. A deposit confirms you are a serious buyer.",
      },
    ],
  }),
  component: BuyPage,
});

const steps = [
  { n: "1", t: "Browse numbers", c: "See price, MRR, profit, and category. No product name." },
  { n: "2", t: "Email us", c: "Tell us which listing code you want. We are the only contact." },
  { n: "3", t: "Pay a deposit", c: "A deposit shows you intend to buy. Payment details by email." },
];

function BuyPage() {
  const mail = `mailto:${BRAND.paymentEmail}?subject=${encodeURIComponent("I want to buy a SaaS")}&body=${encodeURIComponent(
    "Hi Founder Exit,\n\nI want to buy a listed SaaS. Listing code:\n\nPlease send deposit instructions.\n",
  )}`;

  return (
    <>
      <Section className="pt-16 pb-8">
        <Reveal>
          <div className="max-w-2xl">
            <Eyebrow>For buyers</Eyebrow>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">Buy a SaaS</h1>
            <p className="mt-3 text-muted-foreground">
              Visitors can browse listings. To buy, you deal with Founder Exit — not the seller.
              We sit in the middle. A deposit is required so we know you are serious.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="premium">
                <Link to="/businesses">
                  See SaaS for sale <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={mail}>Email {BRAND.paymentEmail}</a>
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section className="py-8">
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-border/70 p-6">
              <p className="text-sm font-medium text-primary">{s.n}</p>
              <h2 className="mt-2 text-base font-semibold">{s.t}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.c}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-xl text-sm text-muted-foreground">
          Deposit payments are arranged by email to {BRAND.paymentEmail}. A dedicated payment
          inbox can replace this later.
        </p>
      </Section>
    </>
  );
}
