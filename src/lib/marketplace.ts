import { useEffect, useState } from "react";
import { businesses, type Business } from "@/data/businesses";

export type AccountType = "buyer" | "seller";
export type ListingStatus = "Draft" | "Under Review" | "Active" | "Under Offer" | "Sold";
export type OfferStatus = "Pending" | "Accepted" | "Declined";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  type: AccountType;
};

export type SellerListing = Business & {
  status: ListingStatus;
  ownerEmail: string;
};

export type Inquiry = {
  id: string;
  businessId: string;
  businessName: string;
  buyerEmail: string;
  buyerName: string;
  sellerEmail?: string | undefined;
  type: "information" | "contact";
  message: string;
  createdAt: string;
};

export type Offer = {
  id: string;
  businessId: string;
  businessName: string;
  buyerEmail: string;
  buyerName: string;
  sellerEmail?: string | undefined;
  amount: string;
  note: string;
  status: OfferStatus;
  createdAt: string;
};

export type ConversationMessage = {
  from: "buyer" | "seller" | "platform";
  text: string;
  at: string;
};

export type Conversation = {
  id: string;
  businessId: string;
  businessName: string;
  buyerEmail: string;
  sellerEmail?: string | undefined;
  messages: ConversationMessage[];
};

const KEYS = {
  users: "fep.users",
  session: "fep.session",
  favorites: "fep.favorites",
  listings: "fep.listings",
  inquiries: "fep.inquiries",
  offers: "fep.offers",
  conversations: "fep.conversations",
} as const;

const EVENT = "fep-store";
export const AUTH_EVENT = "fep-auth";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event(EVENT));
}

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function now() {
  return new Date().toISOString();
}

export function openAuth(mode: "login" | "register", type?: AccountType) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(AUTH_EVENT, { detail: { mode, type } }));
}

export function getSession(): User | null {
  const email = read<string | null>(KEYS.session, null);
  if (!email) return null;
  return read<User[]>(KEYS.users, []).find((u) => u.email === email) ?? null;
}

export function registerUser(input: {
  name: string;
  email: string;
  password: string;
  type: AccountType;
}): { ok: true; user: User } | { ok: false; error: string } {
  const users = read<User[]>(KEYS.users, []);
  const email = input.email.trim().toLowerCase();
  if (users.some((u) => u.email === email)) {
    return { ok: false, error: "An account with this email already exists." };
  }
  const user: User = {
    id: uid("user"),
    name: input.name.trim(),
    email,
    password: input.password,
    type: input.type,
  };
  write(KEYS.users, [...users, user]);
  write(KEYS.session, email);
  return { ok: true, user };
}

export function loginUser(
  email: string,
  password: string,
): { ok: true; user: User } | { ok: false; error: string } {
  const user = read<User[]>(KEYS.users, []).find(
    (u) => u.email === email.trim().toLowerCase() && u.password === password,
  );
  if (!user) return { ok: false, error: "Invalid email or password." };
  write(KEYS.session, user.email);
  return { ok: true, user };
}

export function logoutUser() {
  write(KEYS.session, null);
}

export function getFavorites(email?: string): string[] {
  if (!email) return [];
  return read<Record<string, string[]>>(KEYS.favorites, {})[email] ?? [];
}

export function toggleFavorite(email: string, businessId: string): string[] {
  const all = read<Record<string, string[]>>(KEYS.favorites, {});
  const current = all[email] ?? [];
  const next = current.includes(businessId)
    ? current.filter((id) => id !== businessId)
    : [...current, businessId];
  write(KEYS.favorites, { ...all, [email]: next });
  return next;
}

export function getSellerListings(): SellerListing[] {
  return read<SellerListing[]>(KEYS.listings, []);
}

export function getVisibleListings(): Business[] {
  const extra = getSellerListings()
    .filter((l) => l.status === "Active" || l.status === "Under Offer")
    .map(({ status: _s, ownerEmail: _o, ...b }) => b);
  return [...businesses, ...extra];
}

export function getBusiness(id: string): Business | undefined {
  return getVisibleListings().find((b) => b.id === id) ?? businesses.find((b) => b.id === id);
}

export function getListingById(id: string): SellerListing | Business | undefined {
  return getSellerListings().find((l) => l.id === id) ?? businesses.find((b) => b.id === id);
}

export function saveSellerListing(listing: SellerListing) {
  const listings = getSellerListings();
  const idx = listings.findIndex((l) => l.id === listing.id);
  if (idx >= 0) listings[idx] = listing;
  else listings.unshift(listing);
  write(KEYS.listings, listings);
}

export function updateListingStatus(id: string, status: ListingStatus) {
  const listings = getSellerListings().map((l) => (l.id === id ? { ...l, status } : l));
  write(KEYS.listings, listings);
}

export function getInquiries(): Inquiry[] {
  return read<Inquiry[]>(KEYS.inquiries, []);
}

export function addInquiry(input: Omit<Inquiry, "id" | "createdAt">) {
  const inquiry: Inquiry = { ...input, id: uid("inq"), createdAt: now() };
  write(KEYS.inquiries, [inquiry, ...getInquiries()]);
  addMessage(input.businessId, input.businessName, input.buyerEmail, {
    from: "buyer",
    text: input.message,
    sellerEmail: input.sellerEmail,
  });
  addMessage(input.businessId, input.businessName, input.buyerEmail, {
    from: "platform",
    text:
      input.type === "information"
        ? "Information request received. The seller will share additional materials after review."
        : "Your message was sent to the seller.",
    sellerEmail: input.sellerEmail,
  });
  return inquiry;
}

export function getOffers(): Offer[] {
  return read<Offer[]>(KEYS.offers, []);
}

export function addOffer(input: Omit<Offer, "id" | "createdAt" | "status">) {
  const offer: Offer = { ...input, id: uid("off"), status: "Pending", createdAt: now() };
  write(KEYS.offers, [offer, ...getOffers()]);
  const listing = getSellerListings().find((l) => l.id === input.businessId);
  if (listing && listing.status === "Active") {
    updateListingStatus(listing.id, "Under Offer");
  }
  addMessage(input.businessId, input.businessName, input.buyerEmail, {
    from: "buyer",
    text: `Offer submitted: ${input.amount}${input.note ? ` — ${input.note}` : ""}`,
    sellerEmail: input.sellerEmail,
  });
  return offer;
}

export function setOfferStatus(id: string, status: OfferStatus) {
  const offers = getOffers().map((o) => (o.id === id ? { ...o, status } : o));
  write(KEYS.offers, offers);
  const offer = offers.find((o) => o.id === id);
  if (!offer) return;
  if (status === "Accepted") {
    const listing = getSellerListings().find((l) => l.id === offer.businessId);
    if (listing) updateListingStatus(listing.id, "Sold");
    addMessage(offer.businessId, offer.businessName, offer.buyerEmail, {
      from: "seller",
      text: `Offer of ${offer.amount} was accepted.`,
      sellerEmail: offer.sellerEmail,
    });
  } else {
    addMessage(offer.businessId, offer.businessName, offer.buyerEmail, {
      from: "seller",
      text: `Offer of ${offer.amount} was declined.`,
      sellerEmail: offer.sellerEmail,
    });
  }
}

export function getConversations(): Conversation[] {
  return read<Conversation[]>(KEYS.conversations, []);
}

export function addMessage(
  businessId: string,
  businessName: string,
  buyerEmail: string,
  message: Omit<ConversationMessage, "at"> & { sellerEmail?: string | undefined },
) {
  const conversations = getConversations();
  const existing = conversations.find(
    (c) => c.businessId === businessId && c.buyerEmail === buyerEmail,
  );
  const entry: ConversationMessage = { from: message.from, text: message.text, at: now() };
  if (existing) {
    existing.messages.push(entry);
    if (message.sellerEmail) existing.sellerEmail = message.sellerEmail;
    write(KEYS.conversations, conversations);
    return existing;
  }
  const created: Conversation = {
    id: uid("con"),
    businessId,
    businessName,
    buyerEmail,
    sellerEmail: message.sellerEmail,
    messages: [entry],
  };
  write(KEYS.conversations, [created, ...conversations]);
  return created;
}

export function replyToConversation(
  id: string,
  from: "buyer" | "seller",
  text: string,
) {
  const conversations = getConversations().map((c) =>
    c.id === id ? { ...c, messages: [...c.messages, { from, text, at: now() }] } : c,
  );
  write(KEYS.conversations, conversations);
}

export type MarketplaceSnapshot = {
  ready: boolean;
  user: User | null;
  favorites: string[];
  listings: SellerListing[];
  inquiries: Inquiry[];
  offers: Offer[];
  conversations: Conversation[];
};

export function useMarketplace(): MarketplaceSnapshot {
  const [state, setState] = useState<MarketplaceSnapshot>({
    ready: false,
    user: null,
    favorites: [],
    listings: [],
    inquiries: [],
    offers: [],
    conversations: [],
  });

  useEffect(() => {
    const sync = () => {
      const user = getSession();
      setState({
        ready: true,
        user,
        favorites: getFavorites(user?.email),
        listings: getSellerListings(),
        inquiries: getInquiries(),
        offers: getOffers(),
        conversations: getConversations(),
      });
    };
    sync();
    window.addEventListener(EVENT, sync);
    return () => window.removeEventListener(EVENT, sync);
  }, []);

  return state;
}

export function sellerEmailFor(businessId: string): string | undefined {
  return getSellerListings().find((l) => l.id === businessId)?.ownerEmail;
}

export function formatTime(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
