import { Link } from "@tanstack/react-router";
import { Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-16">
      <div className="mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-lg border border-primary/30 bg-primary/10">
              <span className="size-2.5 rounded-[3px] bg-primary" />
            </span>
            <span className="text-[15px] font-semibold tracking-tight">
              Merideon<span className="text-primary">.</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            A sell-side M&amp;A advisory representing founders of SaaS, AI, software and
            digital businesses in confidential transactions worldwide.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <Linkedin className="size-4" />
            </a>
            <a
              href="mailto:advisory@merideon.com"
              aria-label="Email"
              className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <Mail className="size-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Firm
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link to="/about" className="text-muted-foreground transition-colors hover:text-foreground">
                About
              </Link>
            </li>
            <li>
              <Link to="/businesses" className="text-muted-foreground transition-colors hover:text-foreground">
                Businesses
              </Link>
            </li>
            <li>
              <Link to="/buyer-network" className="text-muted-foreground transition-colors hover:text-foreground">
                Buyer Network
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-muted-foreground transition-colors hover:text-foreground">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Legal
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link to="/privacy" className="text-muted-foreground transition-colors hover:text-foreground">
                Privacy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-muted-foreground transition-colors hover:text-foreground">
                Terms
              </Link>
            </li>
            <li>
              <a
                href="mailto:advisory@merideon.com"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                advisory@merideon.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 flex w-full max-w-6xl flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Merideon Advisory. All rights reserved.</p>
        <p>Information provided is confidential and subject to NDA.</p>
      </div>
    </footer>
  );
}
