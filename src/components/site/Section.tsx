import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("px-6 py-24 md:py-32", className)}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-3 py-1 text-[11px] font-medium tracking-[0.18em] text-primary uppercase">
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <Reveal>
      <div
        className={cn(
          "flex max-w-2xl flex-col gap-4",
          align === "center" && "mx-auto items-center text-center",
        )}
      >
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h2 className="text-gradient text-3xl font-semibold tracking-tight text-balance md:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}

export function GlassCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "glass group relative overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:border-primary/30",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px hairline" />
      {children}
    </div>
  );
}
