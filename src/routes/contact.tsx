import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { CalendarClock, Clock, Linkedin, Mail, Send } from "lucide-react";
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
import { Eyebrow, GlassCard, Section } from "@/components/site/Section";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Founder Exit" },
      {
        name: "description",
        content:
          "Talk to Founder Exit about selling or buying a SaaS. Book a call or send a message.",
      },
      { property: "og:title", content: "Contact Founder Exit" },
      {
        property: "og:description",
        content: "A short conversation with the marketplace team.",
      },
    ],
  }),
  component: ContactPage,
});

const slots = ["Tue 09:00", "Tue 13:30", "Wed 11:00", "Wed 16:00", "Thu 10:30", "Fri 14:00"];

function ContactPage() {
  const [slot, setSlot] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Message received", {
        description: slot
          ? `We will confirm your ${slot} slot by email.`
          : "We will reply within one business day.",
      });
      (e.target as HTMLFormElement).reset();
      setSlot(null);
    }, 600);
  };

  return (
    <Section className="pt-16">
      <Reveal>
        <div className="max-w-3xl">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="text-gradient mt-6 text-4xl font-semibold tracking-tight text-balance md:text-5xl">
            Talk to the team
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            Selling, buying, or just checking a listing — send a note. Sensitive details stay
            off the public marketplace.
          </p>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Reveal>
          <GlassCard className="p-8 md:p-10">
            <h2 className="text-xl font-semibold tracking-tight">Send a message</h2>
            <form onSubmit={onSubmit} className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="cname">Full name</Label>
                <Input id="cname" name="cname" required placeholder="Jane Fletcher" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cemail">Email</Label>
                <Input id="cemail" name="cemail" type="email" required placeholder="jane@company.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" name="company" placeholder="Company Inc." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="topic">I am a</Label>
                <Select name="topic" defaultValue="Founder considering a sale">
                  <SelectTrigger id="topic">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Founder considering a sale",
                      "Buyer / investor",
                      "Advisor or intermediary",
                      "Press or other",
                    ].map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-3 sm:col-span-2">
                <Label>Preferred slot (GMT)</Label>
                <div className="flex flex-wrap gap-2">
                  {slots.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSlot(s)}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] transition-all",
                        slot === s
                          ? "border-primary/50 bg-primary/12 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/25 hover:text-foreground",
                      )}
                    >
                      <Clock className="size-3.5" /> {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" rows={4} placeholder="A few lines of context…" />
              </div>

              <div className="sm:col-span-2">
                <Button type="submit" size="lg" variant="premium" disabled={submitting}>
                  {submitting ? "Sending…" : "Send"} <Send />
                </Button>
              </div>
            </form>
          </GlassCard>
        </Reveal>

        <div className="flex flex-col gap-6">
          <Reveal delay={60}>
            <GlassCard className="p-8">
              <CalendarClock className="size-5 text-primary" />
              <h2 className="mt-5 text-base font-semibold">Calls</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Thirty minutes, private line, confirmed by email.
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={100}>
            <GlassCard className="p-8">
              <h2 className="text-base font-semibold">Direct</h2>
              <a
                href="mailto:hello@founderexit.pro"
                className="mt-5 flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="size-4 text-primary" /> hello@founderexit.pro
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer noopener"
                className="mt-4 flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Linkedin className="size-4 text-primary" /> Founder Exit
              </a>
              <Button asChild variant="ghost" className="mt-6 w-full">
                <Link to="/businesses">Browse listings</Link>
              </Button>
            </GlassCard>
          </Reveal>

          <Reveal delay={140}>
            <GlassCard className="p-8">
              <h2 className="text-base font-semibold">Privacy</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Enquiries are not published. Customer data and full financials stay gated until
                both sides agree.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
