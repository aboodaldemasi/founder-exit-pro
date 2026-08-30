import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Lock, ShieldCheck, Timer } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { Eyebrow, Section } from "@/components/site/Section";
import { SellForm } from "@/components/site/SellForm";
import { SellerWorkspace } from "@/components/site/SellerWorkspace";
import { openAuth, useMarketplace } from "@/lib/marketplace";

export const Route = createFileRoute("/sell")({
  head: () => ({
    meta: [
      { title: "Sell Your SaaS — Founder Exit" },
      {
        name: "description",
        content:
          "List your SaaS in six steps. Manage listings, inquiries, offers, and deal status from your seller workspace.",
      },
      { property: "og:title", content: "Sell Your SaaS — Founder Exit" },
      {
        property: "og:description",
        content: "A simple listing flow for founders ready to exit.",
      },
    ],
  }),
  component: SellPage,
});

const assurances = [
  { icon: Lock, title: "Private until you publish", copy: "Drafts and under-review listings stay off the marketplace." },
  { icon: ShieldCheck, title: "You control access", copy: "Buyers request information. You decide what to share." },
  { icon: Timer, title: "Six steps to list", copy: "Basic, financials, metrics, tech, sale details, then review." },
];

function SellPage() {
  const { user, ready } = useMarketplace();
  const [view, setView] = useState<"form" | "workspace">("form");
  const isSeller = user?.type === "seller";

  return (
    <>
      <Section className="pt-16 pb-8">
        <Reveal>
          <div className="max-w-3xl">
            <Eyebrow>For founders</Eyebrow>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">Sell your company</h1>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Fill in the numbers. We review the listing, then buyers can find it.
            </p>
            {ready && !user ? (
              <Button className="mt-7" variant="premium" onClick={() => openAuth("register", "seller")}>
                Create a seller account
              </Button>
            ) : null}
            {user && !isSeller ? (
              <p className="mt-5 text-sm text-muted-foreground">
                You are signed in as a buyer. Create a seller account to list a company.
              </p>
            ) : null}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {assurances.map((a, i) => (
            <Reveal key={a.title} delay={i * 60}>
              <div className="h-full rounded-2xl border border-border/70 bg-card/30 p-6">
                <a.icon className="size-5 text-primary" />
                <h2 className="mt-5 text-base font-semibold">{a.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-4">
        {isSeller ? (
          <div className="mb-8 flex flex-wrap gap-2">
            <Button variant={view === "form" ? "premium" : "ghost"} onClick={() => setView("form")}>
              Add listing
            </Button>
            <Button variant={view === "workspace" ? "premium" : "ghost"} onClick={() => setView("workspace")}>
              Seller workspace
            </Button>
          </div>
        ) : null}

        {isSeller && view === "workspace" ? (
          <SellerWorkspace />
        ) : (
          <>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight">List your company</h2>
            <SellForm onSubmitted={() => setView("workspace")} />
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Prefer to talk first?{" "}
              <Link to="/contact" className="text-primary hover:underline">
                Contact us
              </Link>
              .
            </p>
          </>
        )}
      </Section>
    </>
  );
}
