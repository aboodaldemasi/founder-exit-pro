import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { OpportunityCard } from "@/components/site/OpportunityCard";
import { EmptyState } from "@/components/site/DealDialogs";
import { ConversationList, TabBar } from "@/components/site/SellerWorkspace";
import { formatTime, publicListings, replyToConversation, useMarketplace } from "@/lib/marketplace";

export function BuyerWorkspace() {
  const { user, favorites, inquiries, offers, conversations, listings } = useMarketplace();
  const [tab, setTab] = useState<"saved" | "requests" | "offers" | "conversations">("saved");

  if (!user) return null;

  const saved = publicListings(listings).filter((b) => favorites.includes(b.id));
  const mineInq = inquiries.filter((i) => i.buyerEmail === user.email);
  const mineOff = offers.filter((o) => o.buyerEmail === user.email);
  const mineCon = conversations.filter((c) => c.buyerEmail === user.email);

  return (
    <div>
      <TabBar
        value={tab}
        onChange={setTab}
        items={[
          ["saved", `Saved SaaS (${saved.length})`],
          ["requests", `Requests (${mineInq.length})`],
          ["offers", `Offers (${mineOff.length})`],
          ["conversations", `Conversations (${mineCon.length})`],
        ]}
      />

      {tab === "saved" ? (
        saved.length === 0 ? (
          <EmptyState
            title="Nothing saved yet"
            copy="Save listings from the marketplace to compare them later."
            action={
              <Button asChild variant="premium">
                <Link to="/businesses">Browse SaaS</Link>
              </Button>
            }
          />
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {saved.map((b) => (
              <OpportunityCard key={b.id} b={b} />
            ))}
          </div>
        )
      ) : null}

      {tab === "requests" ? (
        mineInq.length === 0 ? (
          <EmptyState title="No requests" copy="Information and contact requests you send will appear here." />
        ) : (
          <div className="space-y-3">
            {mineInq.map((i) => (
              <div key={i.id} className="rounded-2xl border border-border p-5">
                <p className="text-sm font-medium">
                  {i.businessName} · {i.type}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{formatTime(i.createdAt)}</p>
                <p className="mt-3 text-sm text-muted-foreground">{i.message}</p>
              </div>
            ))}
          </div>
        )
      ) : null}

      {tab === "offers" ? (
        mineOff.length === 0 ? (
          <EmptyState title="No offers sent" copy="When you make an offer, its status stays here." />
        ) : (
          <div className="space-y-3">
            {mineOff.map((o) => (
              <div key={o.id} className="rounded-2xl border border-border p-5">
                <p className="font-medium">
                  {o.amount} · {o.businessName}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {o.status} · {formatTime(o.createdAt)}
                </p>
                {o.note ? <p className="mt-3 text-sm text-muted-foreground">{o.note}</p> : null}
              </div>
            ))}
          </div>
        )
      ) : null}

      {tab === "conversations" ? (
        mineCon.length === 0 ? (
          <EmptyState title="No conversations" copy="Contact a seller from a listing to open a thread." />
        ) : (
          <ConversationList
            items={mineCon}
            role="buyer"
            onReply={(id, text) => void replyToConversation(id, "buyer", text)}
          />
        )
      ) : null}
    </div>
  );
}
