import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
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

export const Route = createFileRoute("/buyer-network")({
  head: () => ({
    meta: [
      { title: "Buyer Network — Off-Market Deal Flow | Merideon Advisory" },
      {
        name: "description",
        content:
          "Join a vetted network of funds, holdcos and operator-buyers receiving off-market SaaS and digital acquisition opportunities first.",
      },
      { property: "og:title", content: "Join the Merideon Buyer Network" },
      {
        property: "og:description",
        content: "Vetted off-market deal flow for serious acquirers.",
      },
    ],
  }),
  component: BuyerNetworkPage,
});

const composition = [
  { value: 42, suffix: "%", label: "Private equity & holdcos" },
  { value: 31, suffix: "%", label: "Operator-buyers" },
  { value: 18, suffix: "%", label: "Strategic acquirers" },
  { value: 9, suffix: "%", label: "Search funds" },
];

function BuyerNetworkPage() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Application received", {
        description: "We review each buyer application manually and reply within 3 business days.",
      });
      (e.target as HTMLFormElement).reset();
    }, 700);
  };

  return (
    <>
      <Section className="pt-16 pb-8">
        <Reveal>
          <div className="max-w-3xl">
            <Eyebrow>By application</Eyebrow>
            <h1 className="text-gradient mt-6 text-4xl font-semibold tracking-tight text-balance md:text-5xl">
              Looking to Acquire Your Next Business?
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              Our buyer network receives anonymised teasers the day a mandate goes live —
              often weeks before anything is published. Membership is free, manually
              reviewed, and limited to buyers who can demonstrate capital.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="glass mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl lg:grid-cols-4">
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

      <Section className="pt-6">
        <Reveal>
          <GlassCard className="mx-auto max-w-3xl p-8 md:p-10">
            <h2 className="text-2xl font-semibold tracking-tight">Join Buyer Network</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Tell us your mandate. We only send opportunities that match it.
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
                  placeholder="Categories, revenue profile, geographies, involvement level…"
                />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" size="lg" variant="premium" disabled={submitting}>
                  {submitting ? "Submitting…" : "Join Buyer Network"} <ArrowRight />
                </Button>
              </div>
            </form>
          </GlassCard>
        </Reveal>
      </Section>
    </>
  );
}
