import { useState, type FormEvent, type ReactNode } from "react";
import { Heart, MessageSquare, FileText, Handshake } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Business } from "@/data/businesses";
import {
  addInquiry,
  addOffer,
  openAuth,
  sellerEmailFor,
  toggleFavorite,
  useMarketplace,
} from "@/lib/marketplace";
import { cn } from "@/lib/utils";

type DealKind = "information" | "contact" | "offer" | null;

export function FavoriteButton({
  businessId,
  className,
}: {
  businessId: string;
  className?: string;
}) {
  const { user, favorites } = useMarketplace();
  const saved = favorites.includes(businessId);

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className={className}
      onClick={() => {
        if (!user) {
          openAuth("login", "buyer");
          return;
        }
        if (user.type !== "buyer") {
          toast.error("Favorites are available on buyer accounts.");
          return;
        }
        toggleFavorite(user.email, businessId);
        toast.success(saved ? "Removed from saved SaaS" : "Saved to your list");
      }}
    >
      <Heart className={cn("size-4", saved && "fill-primary text-primary")} />
      {saved ? "Saved" : "Save"}
    </Button>
  );
}

export function DealActions({
  business,
  layout = "stack",
}: {
  business: Business;
  layout?: "stack" | "row";
}) {
  const { user } = useMarketplace();
  const [kind, setKind] = useState<DealKind>(null);

  const requireBuyer = (next: DealKind) => {
    if (!user) {
      openAuth("register", "buyer");
      return;
    }
    if (user.type !== "buyer") {
      toast.error("Switch to a buyer account to contact sellers and send offers.");
      return;
    }
    setKind(next);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !kind) return;
    const form = new FormData(e.currentTarget);
    const message = String(form.get("message") ?? "");
    const amount = String(form.get("amount") ?? "");
    const sellerEmail = sellerEmailFor(business.id);

    if (kind === "offer") {
      addOffer({
        businessId: business.id,
        businessName: business.name,
        buyerEmail: user.email,
        buyerName: user.name,
        sellerEmail,
        amount,
        note: message,
      });
      toast.success("Offer sent", {
        description: `Your offer on ${business.name} is with the seller.`,
      });
    } else {
      addInquiry({
        businessId: business.id,
        businessName: business.name,
        buyerEmail: user.email,
        buyerName: user.name,
        sellerEmail,
        type: kind,
        message,
      });
      toast.success(kind === "information" ? "Information requested" : "Message sent", {
        description: "You can follow the conversation from your buyer workspace.",
      });
    }
    setKind(null);
  };

  return (
    <>
      <div className={cn("flex gap-2", layout === "stack" ? "flex-col" : "flex-wrap")}>
        <Button variant="premium" onClick={() => requireBuyer("information")}>
          <FileText /> Request Information
        </Button>
        <Button variant="glass" onClick={() => requireBuyer("contact")}>
          <MessageSquare /> Contact Seller
        </Button>
        <Button variant="outline" onClick={() => requireBuyer("offer")}>
          <Handshake /> Make an Offer
        </Button>
      </div>

      <Dialog open={kind !== null} onOpenChange={(o) => !o && setKind(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {kind === "offer"
                ? `Offer on ${business.name}`
                : kind === "information"
                  ? `Request information — ${business.name}`
                  : `Contact seller — ${business.name}`}
            </DialogTitle>
            <DialogDescription>
              {kind === "offer"
                ? "Sellers review offers privately. Sensitive records stay gated until they respond."
                : "The seller receives this through the platform. Customer lists and full financials stay private."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit} className="grid gap-4">
            {kind === "offer" ? (
              <div className="grid gap-2">
                <Label htmlFor="amount">Offer amount</Label>
                <Input id="amount" name="amount" required placeholder={business.price} />
              </div>
            ) : null}
            <div className="grid gap-2">
              <Label htmlFor="deal-message">
                {kind === "offer" ? "Note to seller" : "Message"}
              </Label>
              <Textarea
                id="deal-message"
                name="message"
                required
                rows={4}
                placeholder={
                  kind === "information"
                    ? "What additional metrics or materials do you need?"
                    : "Introduce yourself and your acquisition thesis."
                }
              />
            </div>
            <Button type="submit" variant="premium">
              Send
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function EmptyState({
  title,
  copy,
  action,
}: {
  title: string;
  copy: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-border px-6 py-12 text-center">
      <p className="text-sm font-medium">{title}</p>
      <p className="mt-2 text-sm text-muted-foreground">{copy}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
