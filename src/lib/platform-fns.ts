import { createServerFn } from "@tanstack/react-start";
import { deleteCookie, getCookie, setCookie } from "@tanstack/react-start/server";
import { z } from "zod";
import type {
  ConversationMessage,
  ListingStatus,
  OfferStatus,
  PlatformStore,
  PlatformUser,
  SellerListing,
  User,
} from "@/lib/marketplace-types";
import { anonymizeListing, isApprovedSeller } from "@/lib/listing-privacy";

const SESSION = "fep_session";
const ADMIN = "fep_admin";

function storeApi() {
  return import("./platform-store.server");
}

function cookieOpts() {
  return {
    httpOnly: true,
    path: "/",
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 30,
    secure: process.env["NODE_ENV"] === "production",
  };
}

async function currentUser(): Promise<User | null> {
  const id = getCookie(SESSION);
  if (!id) return null;
  const { loadStore, publicUser } = await storeApi();
  const user = (await loadStore()).users.find((u) => u.id === id);
  return user ? publicUser(user) : null;
}

async function isAdmin() {
  const { adminToken } = await storeApi();
  return getCookie(ADMIN) === adminToken();
}

async function requireUser() {
  const user = await currentUser();
  if (!user) throw new Error("Sign in required.");
  return user;
}

function isPublicStatus(status: SellerListing["status"]) {
  return status === "Active" || status === "Under Offer";
}

function uid(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function now() {
  return new Date().toISOString();
}

function scopedSnapshot(
  store: PlatformStore,
  user: User | null,
  admin: boolean,
  toPublic: (u: PlatformUser) => User,
) {
  if (admin) {
    return {
      listings: store.listings,
      inquiries: store.inquiries,
      offers: store.offers,
      conversations: store.conversations,
      favorites: [] as string[],
      users: store.users.map(toPublic),
      contacts: store.contacts,
    };
  }

  const listings = store.listings
    .filter((l) => isPublicStatus(l.status) || (user != null && l.ownerEmail === user.email))
    .map((l) => {
      if (user && l.ownerEmail === user.email) return l;
      return anonymizeListing(l);
    });

  if (!user || user.type === "visitor") {
    return {
      listings,
      inquiries: [],
      offers: [],
      conversations: [],
      favorites: [] as string[],
      users: [],
      contacts: [],
    };
  }

  const owns = (businessId: string) =>
    store.listings.some((l) => l.id === businessId && l.ownerEmail === user.email);

  if (user.type === "seller") {
    return {
      listings,
      inquiries: store.inquiries.filter((i) => i.sellerEmail === user.email || owns(i.businessId)),
      offers: store.offers.filter((o) => o.sellerEmail === user.email || owns(o.businessId)),
      conversations: store.conversations.filter((c) => c.sellerEmail === user.email || owns(c.businessId)),
      favorites: [] as string[],
      users: [],
      contacts: [],
    };
  }

  return {
    listings,
    inquiries: store.inquiries.filter((i) => i.buyerEmail === user.email),
    offers: store.offers.filter((o) => o.buyerEmail === user.email),
    conversations: store.conversations.filter((c) => c.buyerEmail === user.email),
    favorites: store.favorites[user.email] ?? [],
    users: [],
    contacts: [],
  };
}

export const getPlatformFn = createServerFn({ method: "GET" }).handler(async () => {
  const s = await storeApi();
  const store = await s.loadStore();
  const user = await currentUser();
  const admin = await isAdmin();
  return {
    user,
    admin,
    ...scopedSnapshot(store, user, admin, s.publicUser),
  };
});

export const registerFn = createServerFn({ method: "POST" })
  .validator(
    z.object({
      name: z.string().min(2),
      email: z.string().email(),
      password: z.string().min(6),
      type: z.enum(["visitor", "seller", "buyer"]),
      companyName: z.string().optional(),
      companyWebsite: z.string().optional(),
      companyNote: z.string().optional(),
      firm: z.string().optional(),
      buyerType: z.string().optional(),
      budget: z.string().optional(),
      timeline: z.string().optional(),
      thesis: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const s = await storeApi();
    const store = await s.loadStore();
    const email = data.email.trim().toLowerCase();
    if (store.users.some((u) => u.email === email)) {
      return { ok: false as const, error: "An account with this email already exists." };
    }
    const type = data.type === "seller" ? "seller" : "visitor";
    if (type === "seller" && !data.companyName?.trim()) {
      return { ok: false as const, error: "Sellers must add a company name so we can verify the SaaS." };
    }
    const user: PlatformUser = {
      id: s.uid("user"),
      name: data.name.trim(),
      email,
      type,
      passwordHash: s.hashSecret(data.password),
    };
    if (type === "seller") {
      user.sellerStatus = "pending";
      user.companyName = data.companyName?.trim();
      if (data.companyWebsite?.trim()) user.companyWebsite = data.companyWebsite.trim();
      if (data.companyNote?.trim()) user.companyNote = data.companyNote.trim();
    }
    if (data.firm?.trim()) user.firm = data.firm.trim();
    if (data.buyerType) user.buyerType = data.buyerType;
    if (data.budget) user.budget = data.budget;
    if (data.timeline) user.timeline = data.timeline;
    if (data.thesis?.trim()) user.thesis = data.thesis.trim();
    store.users.push(user);
    await s.saveStore(store);
    setCookie(SESSION, user.id, cookieOpts());
    return { ok: true as const, user: s.publicUser(user) };
  });

export const loginFn = createServerFn({ method: "POST" })
  .validator(z.object({ email: z.string().email(), password: z.string().min(6) }))
  .handler(async ({ data }) => {
    const s = await storeApi();
    const store = await s.loadStore();
    const email = data.email.trim().toLowerCase();
    const user = store.users.find(
      (u) => u.email === email && u.passwordHash === s.hashSecret(data.password),
    );
    if (!user) return { ok: false as const, error: "Invalid email or password." };
    setCookie(SESSION, user.id, cookieOpts());
    return { ok: true as const, user: s.publicUser(user) };
  });

export const logoutFn = createServerFn({ method: "POST" }).handler(async () => {
  deleteCookie(SESSION);
  return { ok: true as const };
});

export const adminLoginFn = createServerFn({ method: "POST" })
  .validator(z.object({ email: z.string(), password: z.string() }))
  .handler(async ({ data }) => {
    const s = await storeApi();
    const email = data.email.trim().toLowerCase();
    if (email !== s.adminEmail() || data.password !== s.adminPassword()) {
      return { ok: false as const, error: "Access denied." };
    }
    setCookie(ADMIN, s.adminToken(), cookieOpts());
    return { ok: true as const };
  });

export const adminLogoutFn = createServerFn({ method: "POST" }).handler(async () => {
  deleteCookie(ADMIN);
  return { ok: true as const };
});

function sellerDecisionMailto(user: PlatformUser, action: "approve" | "reject") {
  const approved = action === "approve";
  const subject = encodeURIComponent(
    approved ? "Your seller account is approved — Founder Exit" : "Seller application update — Founder Exit",
  );
  const body = encodeURIComponent(
    approved
      ? `Hi ${user.name},\n\nYour seller account was approved. You can now list a SaaS on Founder Exit.\n\nThe product name stays private. Visitors only see anonymous metrics (price, MRR, profit, category).\n\nSign in and open Sell to submit a listing.\n\nFounder Exit`
      : `Hi ${user.name},\n\nWe could not approve this seller application yet. Reply to this email if you can share more proof that you operate the SaaS.\n\nFounder Exit`,
  );
  return `mailto:${user.email}?subject=${subject}&body=${body}`;
}

export const decideSellerFn = createServerFn({ method: "POST" })
  .validator(z.object({ userId: z.string(), action: z.enum(["approve", "reject"]) }))
  .handler(async ({ data }) => {
    if (!(await isAdmin())) throw new Error("Admin required.");
    const s = await storeApi();
    const store = await s.loadStore();
    const user = store.users.find((u) => u.id === data.userId);
    if (!user || user.type !== "seller") throw new Error("Seller not found.");
    user.sellerStatus = data.action === "approve" ? "approved" : "rejected";
    await s.saveStore(store);
    return { ok: true as const, mailto: sellerDecisionMailto(user, data.action) };
  });

export const saveListingFn = createServerFn({ method: "POST" })
  .validator(z.custom<SellerListing>())
  .handler(async ({ data }) => {
    const user = await requireUser();
    if (!isApprovedSeller(user)) throw new Error("Only approved sellers can list a SaaS.");
    const s = await storeApi();
    const store = await s.loadStore();
    const listing: SellerListing = {
      ...data,
      ownerEmail: user.email,
      status: "Under Review",
      verified: false,
    };
    const idx = store.listings.findIndex((l) => l.id === listing.id && l.ownerEmail === user.email);
    if (idx >= 0) store.listings[idx] = listing;
    else store.listings.unshift(listing);
    await s.saveStore(store);
    return listing;
  });

export const updateListingStatusFn = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string(), status: z.custom<ListingStatus>() }))
  .handler(async ({ data }) => {
    if (!(await isAdmin())) throw new Error("Admin only.");
    const s = await storeApi();
    const store = await s.loadStore();
    store.listings = store.listings.map((l) =>
      l.id === data.id
        ? { ...l, status: data.status, verified: data.status === "Active" ? true : l.verified }
        : l,
    );
    await s.saveStore(store);
    return { ok: true as const };
  });

export const deleteListingFn = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    if (!(await isAdmin())) throw new Error("Admin only.");
    const s = await storeApi();
    const store = await s.loadStore();
    store.listings = store.listings.filter((l) => l.id !== data.id);
    await s.saveStore(store);
    return { ok: true as const };
  });

export const toggleFavoriteFn = createServerFn({ method: "POST" })
  .validator(z.object({ businessId: z.string() }))
  .handler(async ({ data }) => {
    const user = await requireUser();
    const s = await storeApi();
    const store = await s.loadStore();
    const current = store.favorites[user.email] ?? [];
    store.favorites[user.email] = current.includes(data.businessId)
      ? current.filter((id) => id !== data.businessId)
      : [...current, data.businessId];
    await s.saveStore(store);
    return store.favorites[user.email] ?? [];
  });

export const addInquiryFn = createServerFn({ method: "POST" })
  .validator(
    z.object({
      businessId: z.string(),
      businessName: z.string(),
      sellerEmail: z.string().optional(),
      type: z.enum(["information", "contact"]),
      message: z.string().min(1),
    }),
  )
  .handler(async () => {
    await requireUser();
    throw new Error("To buy, email Founder Exit and pay a deposit.");
  });

export const addOfferFn = createServerFn({ method: "POST" })
  .validator(
    z.object({
      businessId: z.string(),
      businessName: z.string(),
      sellerEmail: z.string().optional(),
      amount: z.string().min(1),
      note: z.string(),
    }),
  )
  .handler(async () => {
    await requireUser();
    throw new Error("To buy, email Founder Exit and pay a deposit.");
  });

export const setOfferStatusFn = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string(), status: z.custom<OfferStatus>() }))
  .handler(async ({ data }) => {
    const user = await requireUser();
    const s = await storeApi();
    const store = await s.loadStore();
    const offer = store.offers.find((o) => o.id === data.id);
    if (!offer) throw new Error("Offer not found.");
    const listing = store.listings.find((l) => l.id === offer.businessId);
    const sellerOk = listing?.ownerEmail === user.email;
    if (!sellerOk && !(await isAdmin())) throw new Error("Not allowed.");
    offer.status = data.status;
    if (data.status === "Accepted" && listing) listing.status = "Sold";
    appendMessage(store, {
      businessId: offer.businessId,
      businessName: offer.businessName,
      buyerEmail: offer.buyerEmail,
      sellerEmail: offer.sellerEmail,
      from: "seller",
      text: `Offer of ${offer.amount} was ${data.status.toLowerCase()}.`,
    });
    await s.saveStore(store);
    return { ok: true as const };
  });

export const replyFn = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string(), text: z.string().min(1) }))
  .handler(async ({ data }) => {
    const user = await requireUser();
    const s = await storeApi();
    const store = await s.loadStore();
    const conversation = store.conversations.find((c) => c.id === data.id);
    if (!conversation) throw new Error("Conversation not found.");
    const from = user.type === "seller" ? "seller" : "buyer";
    if (from === "buyer" && conversation.buyerEmail !== user.email) throw new Error("Not allowed.");
    if (from === "seller") {
      const listing = store.listings.find((l) => l.id === conversation.businessId);
      const sellerOk = listing?.ownerEmail === user.email || conversation.sellerEmail === user.email;
      if (!sellerOk) throw new Error("Not allowed.");
    }
    conversation.messages.push({ from, text: data.text, at: now() });
    await s.saveStore(store);
    return { ok: true as const };
  });

export const submitContactFn = createServerFn({ method: "POST" })
  .validator(
    z.object({
      name: z.string().min(2),
      email: z.string().email(),
      topic: z.string().min(1),
      message: z.string().min(8),
      slot: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const s = await storeApi();
    const store = await s.loadStore();
    const contact = {
      id: uid("msg"),
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      topic: data.topic,
      message: data.message.trim(),
      createdAt: now(),
    };
    store.contacts.unshift(data.slot ? { ...contact, slot: data.slot } : contact);
    await s.saveStore(store);
    return { ok: true as const };
  });

function appendMessage(
  store: PlatformStore,
  input: {
    businessId: string;
    businessName: string;
    buyerEmail: string;
    sellerEmail?: string | undefined;
    from: ConversationMessage["from"];
    text: string;
  },
) {
  const existing = store.conversations.find(
    (c) => c.businessId === input.businessId && c.buyerEmail === input.buyerEmail,
  );
  const entry = { from: input.from, text: input.text, at: now() };
  if (existing) {
    existing.messages.push(entry);
    if (input.sellerEmail) existing.sellerEmail = input.sellerEmail;
    return;
  }
  store.conversations.unshift({
    id: uid("con"),
    businessId: input.businessId,
    businessName: input.businessName,
    buyerEmail: input.buyerEmail,
    sellerEmail: input.sellerEmail,
    messages: [entry],
  });
}

