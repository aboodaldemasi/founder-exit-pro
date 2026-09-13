import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/site/Logo";
import { BRAND } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="border-t border-border px-5 py-12">
      <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            We broker SaaS sales only. Listings stay anonymous. Buyers contact us and pay a deposit.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <Link to="/businesses" className="hover:text-foreground">SaaS for sale</Link>
          <Link to="/sell" className="hover:text-foreground">Sell</Link>
          <Link to="/buy" className="hover:text-foreground">Buy</Link>
          <Link to="/about" className="hover:text-foreground">About</Link>
          <Link to="/contact" className="hover:text-foreground">Contact</Link>
        </div>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
          <Link to="/terms" className="hover:text-foreground">Terms</Link>
          <a href={`mailto:${BRAND.email}`} className="hover:text-foreground">
            {BRAND.email}
          </a>
        </div>
      </div>
      <p className="mx-auto mt-10 w-full max-w-6xl text-xs text-muted-foreground">
        © {new Date().getFullYear()} {BRAND.legal}
      </p>
    </footer>
  );
}
