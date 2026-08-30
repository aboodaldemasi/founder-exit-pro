import { createFileRoute, Link } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CountUp } from "@/components/site/CountUp";
import { Reveal } from "@/components/site/Reveal";
import { Eyebrow, GlassCard, Section } from "@/components/site/Section";
import { BuyerWorkspace } from "@/components/site/BuyerWorkspace";
import { openAuth, registerUser, useMarketplace } from "@/lib/marketplace";

export const Route = createFileRoute("/buyer-network")({
  head: () => ({
    meta: [
      { title: "Buyer Network — Founder Exit" },
      {
        name: "description",
        content:
          "Join the Founder Exit buyer network to receive matched SaaS listings and manage saved companies, requests, and offers.",
      },
      { property: "og:title", content: "Join the Founder Exit Buyer Network" },
      {
        property: "og:description",
        content: "Matched SaaS deal flow for serious buyers.",
      },
    ],
  }),
  component: BuyerNetworkPage,
});

const composition = [
  { value: 42, suffix: "%", label: "Funds & holdcos" },
  { value: 31, suffix: "%", label: "Operator-buyers" },
  { value: 18, suffix: "%", label: "Strategics" },
  { value: 9, suffix: "%", label: "Search funds" },
];

function BuyerNetworkPage() {
  const { user } = useMarketplace();
  const [submitting, setSubmitting] = useState(false);
  const isBuyer = user?.type === "buyer";

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setSubmitting(true);

    const name = String(form.get("bname") ?? "");
    const email = String(form.get("bemail") ?? "");
    const password = String(form.get("bpassword") ?? "");

    if (!user) {
      const result = registerUser({
        name,
        email,
        password,
        type: "buyer",
      });
      if (!result.ok) {
        setSubmitting(false);
        toast.error(result.error, {
          action: { label: "Sign in", onClick: () => openAuth("login", "buyer") },
        });
        return;
      }
    }

    setTimeout(() => {
      setSubmitting(false);
      toast.success("You are on the buyer network", {
        description: "Matched listings will appear in your workspace.",
      });
      (e.target as HTMLFormElement).reset();
    }, 500);
  };

  return (
    <>
      <Section className="pt-16 pb-8">
        <Reveal>
          <div className="max-w-3xl">
            <Eyebrow>Buyer network</Eyebrow>
            <h1 className="text-gradient mt-6 text-4xl font-semibold tracking-tight text-balance md:text-5xl">
              Stay close to new SaaS listings
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              Tell us your mandate. We only surface companies that fit. Membership is free
              and gives you a buyer workspace for saved SaaS, requests, offers, and conversations.
            </p>
            <Button asChild variant="ghost" className="mt-6">
              <Link to="/businesses">Or browse the marketplace</Link>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border lg:grid-cols-4">
            {composition.map((c) => (
              <div key={c.label} className="px-6 py-9 text-center">
                <p className="text-3xl font-semibold md:text-4xl">
                  <span className="text-emerald-gradient">
                    <CountUp value={c.value} suffix={c.suffix} />
                  </span>
                </p>
                <p className="mt-2 text-xs text-muted-foreground">{c.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {isBuyer ? (
        <Section className="pt-4">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">Your buyer workspace</h2>
          <BuyerWorkspace />
        </Section>
      ) : (
        <Section className="pt-4">
          <Reveal>
            <GlassCard className="mx-auto max-w-3xl p-8 md:p-10">
              <h2 className="text-2xl font-semibold tracking-tight">Join the network</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                This also creates a buyer account so you can save listings and send offers.
              </p>
              <form onSubmit={onSubmit} className="mt-8 grid gap-6 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="bname">Full name</Label>
                  <Input id="bname" name="bname" required placeholder="Alex Moreau" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bemail">Work email</Label>
                  <Input id="bemail" name="bemail" type="email" required placeholder="alex@fund.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bpassword">Password</Label>
                  <Input id="bpassword" name="bpassword" type="password" required minLength={6} placeholder="Create a password" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="firm">Firm / entity</Label>
                  <Input id="firm" name="firm" required placeholder="Northbridge Capital" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Buyer type</Label>
                  <Select name="type" defaultValue="Private equity">
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Private equity", "Holdco", "Strategic acquirer", "Search fund", "Individual operator"].map(
                        (t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="budget">Acquisition budget</Label>
                  <Select name="budget" defaultValue="$1M – $5M">
                    <SelectTrigger id="budget">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Under $1M", "$1M – $5M", "$5M – $15M", "$15M+"].map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="timeline">Timeline</Label>
                  <Select name="timeline" defaultValue="Next 3 months">
                    <SelectTrigger id="timeline">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Immediately", "Next 3 months", "Next 6–12 months", "Opportunistic"].map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="thesis">Investment thesis</Label>
                  <Textarea
                    id="thesis"
                    name="thesis"
                    rows={4}
                    placeholder="Categories, revenue profile, geographies…"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit" size="lg" variant="premium" disabled={submitting}>
                    {submitting ? "Submitting…" : "Join buyer network"} <ArrowRight />
                  </Button>
                </div>
              </form>
            </GlassCard>
          </Reveal>
        </Section>
      )}
    </>
  );
}
