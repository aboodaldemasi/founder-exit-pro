import type { Business } from "@/data/businesses";

export type AccountType = "visitor" | "seller";
export type SellerStatus = "pending" | "approved" | "rejected";
export type ListingStatus = "Draft" | "Under Review" | "Active" | "Under Offer" | "Sold";
export type OfferStatus = "Pending" | "Accepted" | "Declined";

export type User = {
  id: string;
  name: string;
  email: string;
  type: AccountType;
  sellerStatus?: SellerStatus;
  companyName?: string;
  companyWebsite?: string;
  companyNote?: string;
  firm?: string;
  buyerType?: string;
  budget?: string;
  timeline?: string;
  thesis?: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  slot?: string;
  createdAt: string;
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

export type PlatformUser = User & { passwordHash: string };

export type PlatformStore = {
  users: PlatformUser[];
  listings: SellerListing[];
  inquiries: Inquiry[];
  offers: Offer[];
  conversations: Conversation[];
  favorites: Record<string, string[]>;
  contacts: ContactMessage[];
};
