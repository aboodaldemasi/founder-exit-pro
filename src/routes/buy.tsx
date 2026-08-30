import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bookmark, MessageSquare, Search, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { Eyebrow, Section, SectionHeader } from "@/components/site/Section";
import { BuyerWorkspace } from "@/components/site/BuyerWorkspace";
import { openAuth, useMarketplace } from "@/lib/marketplace";

export const Route = createFileRoute("/buy")({
  head: () => ({
    meta: [
      { title: "Buy a SaaS — Founder Exit" },
      {
        name: "description",
        content:
          "Browse SaaS companies, save favorites, request information, and send offers on Founder Exit.",
      },
      { property: "og:title", content: "Buy a SaaS — Founder Exit" },
      {
        property: "og:description",
        content: "A buyer workspace for SaaS acquisitions.",
      },
    ],
  }),
  component: BuyPage,
});

const stages = [
  { icon: Search, title: "Browse", copy: "Search and filter by price, MRR, ARR, profit, age, and growth." },
  { icon: Bookmark, title: "Save", copy: "Keep a shortlist of SaaS companies in your workspace." },
  { icon: MessageSquare, title: "Request", copy: "Ask for information or contact the seller — data stays gated." },
  { icon: Send, title: "Offer", copy: "Send a number and follow the conversation through to close." },
];

function BuyPage() {
  const { user, ready } = useMarketplace();
  const isBuyer = user?.type === "buyer";

  return (
    <>
      <Section className="pt-16 pb-8">
        <Reveal>
          <div className="max-w-3xl">
            <Eyebrow>For buyers</Eyebrow>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">Buy a SaaS</h1>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Browse listings, save a shortlist, then request details or send an offer.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="premium">
                <Link to="/businesses">
                  Browse marketplace <ArrowRight />
                </Link>
              </Button>
              {ready && !user ? (
                <Button size="lg" variant="ghost" onClick={() => openAuth("register", "buyer")}>
                  Create buyer account
                </Button>
              ) : (
                <Button asChild size="lg" variant="ghost">
                  <Link to="/buyer-network">Join buyer network</Link>
                </Button>
              )}
            </div>
          </div>
        </Reveal>
      </Section>

      <Section className="py-10">
        <SectionHeader
          align="left"
          eyebrow="Buyer flow"
          title="From search to offer"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((s, i) => (
            <Reveal key={s.title} delay={i * 50}>
              <div className="h-full rounded-2xl border border-border/70 bg-card/30 p-6">
                <s.icon className="size-5 text-primary" />
                <p className="mt-5 text-[11px] tracking-[0.16em] text-primary uppercase">0{i + 1}</p>
                <h3 className="mt-1 text-base font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-4">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">Buyer workspace</h2>
        {isBuyer ? (
          <BuyerWorkspace />
        ) : (
          <div className="rounded-2xl border border-dashed border-border px-6 py-12 text-center">
            <p className="text-sm font-medium">Sign in as a buyer to use this workspace</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Saved SaaS, requests, offers, and conversations live here.
            </p>
            <Button className="mt-5" variant="premium" onClick={() => openAuth(user ? "register" : "login", "buyer")}>
              {user ? "Need a buyer account" : "Sign in"}
            </Button>
          </div>
        )}
      </Section>
    </>
  );
}
