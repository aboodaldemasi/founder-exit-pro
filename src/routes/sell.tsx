import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowRight, Lock, ShieldCheck, Timer } from "lucide-react";
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
import { Reveal } from "@/components/site/Reveal";
import { Eyebrow, GlassCard, Section, SectionHeader } from "@/components/site/Section";

export const Route = createFileRoute("/sell")({
  head: () => ({
    meta: [
      { title: "Sell Your Business — Free Valuation | Merideon Advisory" },
      {
        name: "description",
        content:
          "Request a confidential, no-obligation valuation for your SaaS, AI or digital business. Sell-side representation with fees paid only on close.",
      },
      { property: "og:title", content: "Sell Your Business — Merideon Advisory" },
      {
        property: "og:description",
        content: "Confidential valuation and sell-side representation for founders.",
      },
    ],
  }),
  component: SellPage,
});

const assurances = [
  { icon: Lock, title: "Confidential by default", copy: "Nothing is shared, listed or disclosed without your written approval." },
  { icon: ShieldCheck, title: "Success-based fees", copy: "No retainer, no listing fee. We are paid when your deal closes." },
  { icon: Timer, title: "Valuation in 48 hours", copy: "A senior advisor reviews your submission and responds with a range." },
];

function SellPage() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Valuation request received", {
        description: "A senior advisor will reply confidentially within 48 hours.",
      });
      (e.target as HTMLFormElement).reset();
    }, 700);
  };

  return (
    <>
      <Section className="pt-16 pb-10">
        <Reveal>
          <div className="max-w-3xl">
            <Eyebrow>Sell-side representation</Eyebrow>
            <h1 className="text-gradient mt-6 text-4xl font-semibold tracking-tight text-balance md:text-5xl">
              Sell Your Business the Way Institutions Do
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              We run a structured, confidential process that creates competition among
              qualified buyers — so price is set by the market, not by the first offer
              that reaches your inbox.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {assurances.map((a, i) => (
            <Reveal key={a.title} delay={i * 90}>
              <GlassCard className="h-full p-7">
                <a.icon className="size-5 text-primary" />
                <h2 className="mt-8 text-base font-semibold">{a.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.copy}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-6">
        <SectionHeader
          eyebrow="Free valuation"
          title="Request Your Valuation"
          description="Six fields. One senior advisor. A defensible range within two business days."
        />
        <Reveal delay={80}>
          <GlassCard className="mx-auto mt-12 max-w-3xl p-8 md:p-10">
            <form onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" name="name" required placeholder="Jane Fletcher" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Work email</Label>
                <Input id="email" name="email" type="email" required placeholder="jane@company.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="business">Business name</Label>
                <Input id="business" name="business" required placeholder="Company Inc." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select name="category" defaultValue="AI SaaS">
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "AI SaaS",
                      "Micro SaaS",
                      "Software Company",
                      "Shopify App",
                      "Chrome Extension",
                      "WordPress Plugin",
                      "E-commerce Brand",
                      "Website",
                      "Newsletter",
                      "Mobile App",
                    ].map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="mrr">Monthly recurring revenue</Label>
                <Input id="mrr" name="mrr" required placeholder="$45,000" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="profit">Annual net profit</Label>
                <Input id="profit" name="profit" required placeholder="$320,000" />
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="notes">Anything we should know</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  placeholder="Growth trend, churn, customer concentration, timeline expectations…"
                />
              </div>
              <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground">
                  Submissions are treated as confidential and never listed publicly.
                </p>
                <Button type="submit" size="lg" variant="premium" disabled={submitting}>
                  {submitting ? "Sending…" : "Get Free Valuation"} <ArrowRight />
                </Button>
              </div>
            </form>
          </GlassCard>
        </Reveal>
      </Section>
    </>
  );
}
