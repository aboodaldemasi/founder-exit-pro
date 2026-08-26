import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/sell", label: "Sell Your Micro SaaS" },
  { to: "/buy", label: "Buy Micro SaaS" },
  { to: "/businesses", label: "Businesses" },
  { to: "/buyer-network", label: "Buyer Network" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="relative grid size-8 place-items-center rounded-md border border-primary/30 bg-primary/8">
            <span className="size-2 rounded-[2px] bg-primary" />
          </span>
          <span className="text-[15px] font-semibold tracking-tight">
            Merideon<span className="text-primary">.</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 xl:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-md px-3 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 xl:flex">
          <Button asChild size="sm" variant="ghost">
            <Link to="/businesses">Explore Businesses</Link>
          </Button>
          <Button asChild size="sm" variant="premium">
            <Link to="/sell">Sell Your Micro SaaS</Link>
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="grid size-9 place-items-center rounded-md border border-border text-foreground xl:hidden"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-border bg-background/95 px-6 py-4 backdrop-blur-xl xl:hidden">
          <div className="flex flex-col">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-2.5 text-sm text-muted-foreground data-[status=active]:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <Button asChild variant="premium" className="mt-4">
              <Link to="/sell" onClick={() => setOpen(false)}>
                Sell Your Micro SaaS
              </Link>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
