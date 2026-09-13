import { useEffect, useState } from "react";
import type { Business } from "@/data/businesses";
import type {
  AccountType,
  ContactMessage,
  Conversation,
  Inquiry,
  ListingStatus,
  Offer,
  OfferStatus,
  SellerListing,
  User,
} from "@/lib/marketplace-types";
import {
  addInquiryFn,
  addOfferFn,
  decideSellerFn,
  getPlatformFn,
  loginFn,
  logoutFn,
  registerFn,
  replyFn,
  saveListingFn,
  setOfferStatusFn,
  submitContactFn,
  toggleFavoriteFn,
} from "@/lib/platform-fns";
import { anonymizeBusiness } from "@/lib/listing-privacy";

export type {
  AccountType,
  ContactMessage,
  Conversation,
  ConversationMessage,
  Inquiry,
  ListingStatus,
  Offer,
  OfferStatus,
  SellerListing,
  User,
} from "@/lib/marketplace-types";

const EVENT = "fep-store";
export const AUTH_EVENT = "fep-auth";

export function notifyStore() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(EVENT));
}

export function openAuth(mode: "login" | "register", type?: AccountType) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(AUTH_EVENT, { detail: { mode, type } }));
}

export async function registerUser(input: {
  name: string;
  email: string;
  password: string;
  type: AccountType;
  companyName?: string;
  companyWebsite?: string;
  companyNote?: string;
  firm?: string;
  buyerType?: string;
  budget?: string;
  timeline?: string;
  thesis?: string;
}) {
  const result = await registerFn({ data: input });
  notifyStore();
  return result;
}

export async function decideSeller(userId: string, action: "approve" | "reject") {
  const result = await decideSellerFn({ data: { userId, action } });
  notifyStore();
  return result;
}

export async function loginUser(email: string, password: string) {
  const result = await loginFn({ data: { email, password } });
  notifyStore();
  return result;
}

export async function logoutUser() {
  await logoutFn();
  notifyStore();
}

export function publicListings(listings: SellerListing[]): Business[] {
  return listings
    .filter((l) => l.status === "Active" || l.status === "Under Offer")
    .map(({ status: _s, ownerEmail: _o, ...b }) => anonymizeBusiness(b));
}

export function getBusinessFrom(listings: SellerListing[], id: string): Business | undefined {
  const listing = listings.find((l) => l.id === id);
  if (!listing) return undefined;
  if (listing.status !== "Active" && listing.status !== "Under Offer") return undefined;
  const { status: _s, ownerEmail: _o, ...b } = listing;
  return anonymizeBusiness(b);
}

export async function saveSellerListing(listing: SellerListing) {
  const saved = await saveListingFn({ data: listing });
  notifyStore();
  return saved;
}

export async function addInquiry(input: {
  businessId: string;
  businessName: string;
  sellerEmail?: string | undefined;
  type: "information" | "contact";
  message: string;
}) {
  const result = await addInquiryFn({ data: input });
  notifyStore();
  return result;
}

export async function addOffer(input: {
  businessId: string;
  businessName: string;
  sellerEmail?: string | undefined;
  amount: string;
  note: string;
}) {
  const result = await addOfferFn({ data: input });
  notifyStore();
  return result;
}

export async function setOfferStatus(id: string, status: OfferStatus) {
  await setOfferStatusFn({ data: { id, status } });
  notifyStore();
}

export async function toggleFavorite(businessId: string) {
  const next = await toggleFavoriteFn({ data: { businessId } });
  notifyStore();
  return next;
}

export async function replyToConversation(id: string, _from: "buyer" | "seller", text: string) {
  await replyFn({ data: { id, text } });
  notifyStore();
}

export async function submitContact(input: {
  name: string;
  email: string;
  topic: string;
  message: string;
  slot?: string;
}) {
  const result = await submitContactFn({ data: input });
  notifyStore();
  return result;
}

export function sellerEmailFor(listings: SellerListing[], businessId: string): string | undefined {
  return listings.find((l) => l.id === businessId)?.ownerEmail;
}

export type MarketplaceSnapshot = {
  ready: boolean;
  user: User | null;
  admin: boolean;
  favorites: string[];
  listings: SellerListing[];
  inquiries: Inquiry[];
  offers: Offer[];
  conversations: Conversation[];
  users: User[];
  contacts: ContactMessage[];
};

export function useMarketplace(): MarketplaceSnapshot {
  const [state, setState] = useState<MarketplaceSnapshot>({
    ready: false,
    user: null,
    admin: false,
    favorites: [],
    listings: [],
    inquiries: [],
    offers: [],
    conversations: [],
    users: [],
    contacts: [],
  });

  useEffect(() => {
    let active = true;
    const sync = async () => {
      try {
        const data = await getPlatformFn();
        if (!active) return;
        setState({ ready: true, ...data });
      } catch {
        if (!active) return;
        setState((s) => ({ ...s, ready: true }));
      }
    };
    void sync();
    const timer = window.setInterval(() => void sync(), 4000);
    const onChange = () => {
      void sync();
    };
    window.addEventListener(EVENT, onChange);
    return () => {
      active = false;
      window.clearInterval(timer);
      window.removeEventListener(EVENT, onChange);
    };
  }, []);

  return state;
}

export function formatTime(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
