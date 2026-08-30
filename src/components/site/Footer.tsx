import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/site/Logo";
import { BRAND } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="border-t border-border px-5 py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">{BRAND.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link to="/businesses" className="hover:text-foreground">Browse</Link>
          <Link to="/sell" className="hover:text-foreground">Sell</Link>
          <Link to="/buy" className="hover:text-foreground">Buy</Link>
          <Link to="/about" className="hover:text-foreground">About</Link>
          <Link to="/contact" className="hover:text-foreground">Contact</Link>
          <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
          <Link to="/terms" className="hover:text-foreground">Terms</Link>
        </div>
      </div>
      <p className="mx-auto mt-10 w-full max-w-6xl text-xs text-muted-foreground">
        © {new Date().getFullYear()} {BRAND.legal}
      </p>
    </footer>
  );
}
