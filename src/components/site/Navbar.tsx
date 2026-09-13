import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/Logo";
import { logoutUser, openAuth, useMarketplace } from "@/lib/marketplace";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/businesses", label: "SaaS for sale" },
  { to: "/sell", label: "Sell" },
  { to: "/buy", label: "Buy" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, ready } = useMarketplace();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-border/60 bg-background/90 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5">
        <Link to="/" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <div className="hidden items-center gap-0.5 md:flex">
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

        <div className="hidden items-center gap-2 md:flex">
          {ready && user ? (
            <>
              <Button asChild size="sm" variant="ghost">
                <Link to={user.type === "seller" ? "/sell" : "/businesses"}>{user.name.split(" ")[0]}</Link>
              </Button>
              <Button size="sm" variant="outline" onClick={() => void logoutUser()}>
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Button size="sm" variant="ghost" onClick={() => openAuth("login")}>
                Sign in
              </Button>
              <Button size="sm" variant="premium" onClick={() => openAuth("register", "visitor")}>
                Join
              </Button>
            </>
          )}
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="grid size-9 place-items-center rounded-md border border-border md:hidden"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-border bg-background px-5 py-4 md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-sm text-muted-foreground"
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-3 flex gap-2">
            {ready && user ? (
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  void logoutUser();
                  setOpen(false);
                }}
              >
                Sign out
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="flex-1"
                  onClick={() => {
                    setOpen(false);
                    openAuth("login");
                  }}
                >
                  Sign in
                </Button>
                <Button
                  variant="premium"
                  className="flex-1"
                  onClick={() => {
                    setOpen(false);
                    openAuth("register", "visitor");
                  }}
                >
                  Join
                </Button>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
