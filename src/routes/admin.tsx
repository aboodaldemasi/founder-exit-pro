import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { decideSeller, formatTime, notifyStore, useMarketplace, type ListingStatus } from "@/lib/marketplace";
import { adminLoginFn, adminLogoutFn, deleteListingFn, updateListingStatusFn } from "@/lib/platform-fns";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

const statuses: ListingStatus[] = ["Draft", "Under Review", "Active", "Under Offer", "Sold"];

function AdminPage() {
  const { ready, admin, listings, users, inquiries, offers, contacts } = useMarketplace();
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"applications" | "listings" | "users" | "inbox">("applications");

  const onLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const result = await adminLoginFn({
      data: {
        email: String(form.get("email") ?? ""),
        password: String(form.get("password") ?? ""),
      },
    });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setError("");
    notifyStore();
    toast.success("Admin access granted");
  };

  if (!ready) {
    return <div className="grid min-h-[60vh] place-items-center text-sm text-muted-foreground">Loading…</div>;
  }

  if (!admin) {
    return (
      <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-5">
        <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
        <p className="mt-2 text-sm text-muted-foreground">Private desk. Not listed in the public site.</p>
        <form onSubmit={onLogin} className="mt-8 grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="admin-email">Email</Label>
            <Input id="admin-email" name="email" type="email" required autoComplete="username" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="admin-password">Password</Label>
            <Input id="admin-password" name="password" type="password" required autoComplete="current-password" />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button type="submit" variant="premium">
            Enter
          </Button>
        </form>
      </div>
    );
  }

  const pending = listings.filter((l) => l.status === "Under Review");
  const sellerApps = users.filter((u) => u.type === "seller");
  const pendingSellers = sellerApps.filter((u) => (u.sellerStatus ?? "pending") === "pending");

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Admin desk</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {pendingSellers.length} seller applications · {pending.length} listings to review · {users.length} accounts
          </p>
        </div>
        <Button
          variant="outline"
          onClick={async () => {
            await adminLogoutFn();
            notifyStore();
          }}
        >
          Sign out
        </Button>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {(
          [
            ["applications", `Sellers (${pendingSellers.length})`],
            ["listings", `Listings (${listings.length})`],
            ["users", `Users (${users.length})`],
            ["inbox", `Inbox (${inquiries.length + offers.length + contacts.length})`],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`rounded-full border px-4 py-2 text-sm ${
              tab === id ? "border-primary/40 bg-primary/10" : "border-border text-muted-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "applications" ? (
        <div className="mt-6 space-y-3">
          {sellerApps.length === 0 ? (
            <p className="text-sm text-muted-foreground">No seller applications yet.</p>
          ) : (
            sellerApps.map((u) => (
              <div key={u.id} className="rounded-2xl border border-border p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-medium">{u.companyName || "Unnamed SaaS"}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {u.name} · {u.email} · {u.sellerStatus ?? "pending"}
                    </p>
                    {u.companyWebsite ? (
                      <p className="mt-1 text-xs text-muted-foreground">{u.companyWebsite}</p>
                    ) : null}
                    {u.companyNote ? <p className="mt-2 text-sm text-muted-foreground">{u.companyNote}</p> : null}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(u.sellerStatus ?? "pending") !== "approved" ? (
                      <Button
                        size="sm"
                        variant="premium"
                        onClick={async () => {
                          const result = await decideSeller(u.id, "approve");
                          toast.success("Seller approved — send the email");
                          window.location.href = result.mailto;
                        }}
                      >
                        Approve & email
                      </Button>
                    ) : null}
                    {(u.sellerStatus ?? "pending") !== "rejected" ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={async () => {
                          const result = await decideSeller(u.id, "reject");
                          toast.message("Marked rejected");
                          window.location.href = result.mailto;
                        }}
                      >
                        Reject & email
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      ) : null}

      {tab === "listings" ? (
        <div className="mt-6 space-y-3">
          {listings.length === 0 ? (
            <p className="text-sm text-muted-foreground">No listings yet. They appear when an approved seller submits a SaaS.</p>
          ) : (
            listings.map((l) => (
              <div key={l.id} className="rounded-2xl border border-border p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-medium">{l.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {l.ownerEmail} · {l.price} · {l.mrr} MRR · {l.category}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <select
                      value={l.status}
                      onChange={async (e) => {
                        await updateListingStatusFn({
                          data: { id: l.id, status: e.target.value as ListingStatus },
                        });
                        notifyStore();
                        toast.success(`${l.name} → ${e.target.value}`);
                      }}
                      className="h-9 rounded-lg border border-border bg-background px-3 text-sm"
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    {l.status === "Under Review" ? (
                      <Button
                        size="sm"
                        variant="premium"
                        onClick={async () => {
                          await updateListingStatusFn({ data: { id: l.id, status: "Active" } });
                          notifyStore();
                          toast.success(`${l.name} is live`);
                        }}
                      >
                        Approve
                      </Button>
                    ) : null}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={async () => {
                        await deleteListingFn({ data: { id: l.id } });
                        notifyStore();
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      ) : null}

      {tab === "users" ? (
        <div className="mt-6 space-y-3">
          {users.length === 0 ? (
            <p className="text-sm text-muted-foreground">No accounts yet.</p>
          ) : (
            users.map((u) => (
              <div key={u.id} className="flex items-center justify-between rounded-2xl border border-border p-4">
                <div>
                  <p className="text-sm font-medium">{u.name}</p>
                  <p className="text-xs text-muted-foreground">{u.email}</p>
                  {u.firm || u.budget ? (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {[u.firm, u.buyerType, u.budget, u.timeline].filter(Boolean).join(" · ")}
                    </p>
                  ) : null}
                </div>
                <span className="text-xs capitalize text-muted-foreground">
                  {u.type}
                  {u.sellerStatus ? ` · ${u.sellerStatus}` : ""}
                </span>
              </div>
            ))
          )}
        </div>
      ) : null}

      {tab === "inbox" ? (
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div>
            <h2 className="text-sm font-semibold">Contact</h2>
            <div className="mt-3 space-y-3">
              {contacts.length === 0 ? (
                <p className="text-sm text-muted-foreground">None yet.</p>
              ) : (
                contacts.map((m) => (
                  <div key={m.id} className="rounded-2xl border border-border p-4 text-sm">
                    <p className="font-medium">{m.topic}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {m.name} · {m.email} · {formatTime(m.createdAt)}
                      {m.slot ? ` · ${m.slot}` : ""}
                    </p>
                    <p className="mt-2 text-muted-foreground">{m.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
          <div>
            <h2 className="text-sm font-semibold">Inquiries</h2>
            <div className="mt-3 space-y-3">
              {inquiries.length === 0 ? (
                <p className="text-sm text-muted-foreground">None yet.</p>
              ) : (
                inquiries.map((i) => (
                  <div key={i.id} className="rounded-2xl border border-border p-4 text-sm">
                    <p className="font-medium">
                      {i.businessName} · {i.type}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {i.buyerName} · {formatTime(i.createdAt)}
                    </p>
                    <p className="mt-2 text-muted-foreground">{i.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
          <div>
            <h2 className="text-sm font-semibold">Offers</h2>
            <div className="mt-3 space-y-3">
              {offers.length === 0 ? (
                <p className="text-sm text-muted-foreground">None yet.</p>
              ) : (
                offers.map((o) => (
                  <div key={o.id} className="rounded-2xl border border-border p-4 text-sm">
                    <p className="font-medium">
                      {o.amount} · {o.businessName}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {o.buyerName} · {o.status} · {formatTime(o.createdAt)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
