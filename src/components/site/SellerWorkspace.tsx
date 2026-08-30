import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EmptyState } from "@/components/site/DealDialogs";
import {
  formatTime,
  replyToConversation,
  setOfferStatus,
  updateListingStatus,
  useMarketplace,
  type ListingStatus,
} from "@/lib/marketplace";
import { cn } from "@/lib/utils";

const statuses: ListingStatus[] = ["Draft", "Under Review", "Active", "Under Offer", "Sold"];

export function SellerWorkspace() {
  const { user, listings, inquiries, offers, conversations } = useMarketplace();
  const [tab, setTab] = useState<"listings" | "inquiries" | "offers" | "conversations">("listings");

  if (!user) return null;

  const mine = listings.filter((l) => l.ownerEmail === user.email);
  const myInquiries = inquiries.filter(
    (i) => i.sellerEmail === user.email || mine.some((l) => l.id === i.businessId),
  );
  const myOffers = offers.filter(
    (o) => o.sellerEmail === user.email || mine.some((l) => l.id === o.businessId),
  );
  const myConversations = conversations.filter(
    (c) => c.sellerEmail === user.email || mine.some((l) => l.id === c.businessId),
  );

  return (
    <div>
      <TabBar
        value={tab}
        onChange={setTab}
        items={[
          ["listings", `My listings (${mine.length})`],
          ["inquiries", `Inquiries (${myInquiries.length})`],
          ["offers", `Offers (${myOffers.length})`],
          ["conversations", `Conversations (${myConversations.length})`],
        ]}
      />

      {tab === "listings" ? (
        mine.length === 0 ? (
          <EmptyState title="No listings yet" copy="Submit a SaaS from the form above. It starts as Under Review." />
        ) : (
          <div className="space-y-3">
            {mine.map((l) => (
              <div key={l.id} className="flex flex-col gap-4 rounded-2xl border border-border p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium">{l.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {l.price} · {l.category} · {l.status}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={l.status}
                    onChange={(e) => updateListingStatus(l.id, e.target.value as ListingStatus)}
                    className="h-9 rounded-lg border border-border bg-background px-3 text-sm"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {l.status === "Active" || l.status === "Under Offer" ? (
                    <Button asChild size="sm" variant="ghost">
                      <Link to="/businesses/$businessId" params={{ businessId: l.id }}>
                        View
                      </Link>
                    </Button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )
      ) : null}

      {tab === "inquiries" ? (
        myInquiries.length === 0 ? (
          <EmptyState title="No inquiries" copy="Buyers who request information or contact you will appear here." />
        ) : (
          <div className="space-y-3">
            {myInquiries.map((i) => (
              <div key={i.id} className="rounded-2xl border border-border p-5">
                <p className="text-sm font-medium">
                  {i.buyerName} · {i.businessName}
                </p>
                <p className="mt-1 text-xs capitalize text-muted-foreground">
                  {i.type} · {formatTime(i.createdAt)}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">{i.message}</p>
              </div>
            ))}
          </div>
        )
      ) : null}

      {tab === "offers" ? (
        myOffers.length === 0 ? (
          <EmptyState title="No offers yet" copy="Incoming offers and deal status will show here." />
        ) : (
          <div className="space-y-3">
            {myOffers.map((o) => (
              <div key={o.id} className="rounded-2xl border border-border p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">
                      {o.amount} · {o.businessName}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {o.buyerName} · {o.status} · {formatTime(o.createdAt)}
                    </p>
                  </div>
                  {o.status === "Pending" ? (
                    <div className="flex gap-2">
                      <Button size="sm" variant="premium" onClick={() => setOfferStatus(o.id, "Accepted")}>
                        Accept
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setOfferStatus(o.id, "Declined")}>
                        Decline
                      </Button>
                    </div>
                  ) : null}
                </div>
                {o.note ? <p className="mt-3 text-sm text-muted-foreground">{o.note}</p> : null}
              </div>
            ))}
          </div>
        )
      ) : null}

      {tab === "conversations" ? (
        myConversations.length === 0 ? (
          <EmptyState title="No conversations" copy="Threads open when a buyer contacts you about a listing." />
        ) : (
          <ConversationList
            items={myConversations}
            role="seller"
            onReply={(id, text) => replyToConversation(id, "seller", text)}
          />
        )
      ) : null}
    </div>
  );
}

export function ConversationList({
  items,
  role,
  onReply,
}: {
  items: ReturnType<typeof useMarketplace>["conversations"];
  role: "buyer" | "seller";
  onReply: (id: string, text: string) => void;
}) {
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  return (
    <div className="space-y-4">
      {items.map((c) => (
        <div key={c.id} className="rounded-2xl border border-border p-5">
          <p className="text-sm font-medium">{c.businessName}</p>
          <p className="mt-1 text-xs text-muted-foreground">{c.buyerEmail}</p>
          <div className="mt-4 space-y-2">
            {c.messages.map((m, i) => (
              <p
                key={`${c.id}-${i}`}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm",
                  m.from === "platform"
                    ? "bg-white/[0.03] text-muted-foreground"
                    : m.from === role
                      ? "bg-primary/10"
                      : "bg-white/[0.04]",
                )}
              >
                <span className="mr-2 text-[10px] uppercase tracking-wide text-muted-foreground">
                  {m.from}
                </span>
                {m.text}
              </p>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <Textarea
              rows={2}
              value={drafts[c.id] ?? ""}
              onChange={(e) => setDrafts((d) => ({ ...d, [c.id]: e.target.value }))}
              placeholder="Reply…"
            />
            <Button
              variant="premium"
              onClick={() => {
                const text = drafts[c.id]?.trim();
                if (!text) return;
                onReply(c.id, text);
                setDrafts((d) => ({ ...d, [c.id]: "" }));
              }}
            >
              Send
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export function TabBar<T extends string>({
  value,
  onChange,
  items,
}: {
  value: T;
  onChange: (v: T) => void;
  items: [T, string][];
}) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {items.map(([id, label]) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={cn(
            "rounded-full border px-4 py-2 text-sm transition-colors",
            value === id
              ? "border-primary/40 bg-primary/10 text-foreground"
              : "border-border text-muted-foreground hover:text-foreground",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
