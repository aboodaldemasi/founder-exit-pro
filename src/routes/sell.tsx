import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { Eyebrow, Section } from "@/components/site/Section";
import { SellForm } from "@/components/site/SellForm";
import { SellerWorkspace } from "@/components/site/SellerWorkspace";
import { isApprovedSeller, isPendingSeller } from "@/lib/listing-privacy";
import { openAuth, useMarketplace } from "@/lib/marketplace";

export const Route = createFileRoute("/sell")({
  head: () => ({
    meta: [
      { title: "Sell your SaaS — Founder Exit" },
      {
        name: "description",
        content: "Apply as a seller. After we verify you, list a SaaS. The product name stays private.",
      },
    ],
  }),
  component: SellPage,
});

function SellPage() {
  const { user, ready } = useMarketplace();
  const [view, setView] = useState<"form" | "workspace">("form");
  const approved = isApprovedSeller(user);
  const pending = isPendingSeller(user);
  const rejected = user?.type === "seller" && user.sellerStatus === "rejected";

  return (
    <>
      <Section className="pt-16 pb-8">
        <Reveal>
          <div className="max-w-2xl">
            <Eyebrow>For founders</Eyebrow>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">Sell your SaaS</h1>
            <p className="mt-3 text-muted-foreground">
              We only list SaaS. Apply with the real company name — visitors never see it. They
              only see a code and the numbers.
            </p>
            {ready && !user ? (
              <Button className="mt-7" variant="premium" onClick={() => openAuth("register", "seller")}>
                Apply as seller
              </Button>
            ) : null}
            {user?.type === "visitor" ? (
              <p className="mt-5 text-sm text-muted-foreground">
                You are a visitor. Apply as a seller if you own a SaaS.
              </p>
            ) : null}
          </div>
        </Reveal>
      </Section>

      <Section className="pt-4">
        {pending ? (
          <div className="rounded-2xl border border-dashed border-border px-6 py-12 text-center">
            <p className="font-medium">Application received</p>
            <p className="mt-2 text-sm text-muted-foreground">
              We will check that you operate a real SaaS, then email {user?.email}. Listing stays
              locked until then.
            </p>
          </div>
        ) : null}

        {rejected ? (
          <div className="rounded-2xl border border-dashed border-border px-6 py-12 text-center">
            <p className="font-medium">Not approved yet</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Reply from the email we sent, or{" "}
              <Link to="/contact" className="text-primary hover:underline">
                contact us
              </Link>
              .
            </p>
          </div>
        ) : null}

        {approved ? (
          <>
            <div className="mb-8 flex flex-wrap gap-2">
              <Button variant={view === "form" ? "premium" : "ghost"} onClick={() => setView("form")}>
                Add listing
              </Button>
              <Button variant={view === "workspace" ? "premium" : "ghost"} onClick={() => setView("workspace")}>
                My listings
              </Button>
            </div>
            {view === "workspace" ? (
              <SellerWorkspace />
            ) : (
              <>
                <h2 className="mb-2 text-2xl font-semibold tracking-tight">List a SaaS</h2>
                <p className="mb-6 text-sm text-muted-foreground">
                  Put the real name for us. The public page will only show a code and metrics.
                </p>
                <SellForm onSubmitted={() => setView("workspace")} />
              </>
            )}
          </>
        ) : null}

        {!user && ready ? (
          <p className="text-center text-sm text-muted-foreground">
            Already applied?{" "}
            <button type="button" className="text-primary hover:underline" onClick={() => openAuth("login")}>
              Sign in
            </button>
          </p>
        ) : null}
      </Section>
    </>
  );
}
