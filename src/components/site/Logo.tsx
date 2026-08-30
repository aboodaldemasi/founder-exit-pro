import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/brand";

export function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src="/logo-mark.png"
      alt=""
      width={32}
      height={32}
      className={cn("size-8 rounded-lg object-cover", className)}
    />
  );
}

export function Logo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="text-[15px] font-semibold tracking-[-0.02em] text-foreground">
        {compact ? "FE" : BRAND.name}
      </span>
    </span>
  );
}

export function CompanyMark({
  name,
  hue,
  className,
}: {
  name: string;
  hue?: number;
  className?: string;
}) {
  const initials = name
    .replace(/^Project\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0] ?? "")
    .join("")
    .toUpperCase();

  return (
    <span
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-xl border text-[13px] font-semibold tracking-wide",
        className,
      )}
      style={{
        background: `oklch(0.28 0.06 ${hue ?? 163} / 0.45)`,
        borderColor: `oklch(0.72 0.12 ${hue ?? 163} / 0.35)`,
        color: `oklch(0.88 0.08 ${hue ?? 163})`,
      }}
    >
      {initials}
    </span>
  );
}
