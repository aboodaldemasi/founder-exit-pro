import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AUTH_EVENT, loginUser, registerUser, type AccountType } from "@/lib/marketplace";
import { cn } from "@/lib/utils";

type Mode = "login" | "register";

export function AuthDialog() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("login");
  const [type, setType] = useState<AccountType>("visitor");
  const [error, setError] = useState("");

  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<{ mode?: Mode; type?: AccountType }>).detail;
      setMode(detail?.mode ?? "login");
      if (detail?.type) setType(detail.type);
      setError("");
      setOpen(true);
    };
    window.addEventListener(AUTH_EVENT, onOpen);
    return () => window.removeEventListener(AUTH_EVENT, onOpen);
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");
    const name = String(form.get("name") ?? "");

    const result =
      mode === "login"
        ? await loginUser(email, password)
        : await registerUser({
            name,
            email,
            password,
            type,
            companyName: String(form.get("companyName") ?? ""),
            companyWebsite: String(form.get("companyWebsite") ?? ""),
            companyNote: String(form.get("companyNote") ?? ""),
          });

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setOpen(false);
    const pending = result.user.type === "seller" && result.user.sellerStatus !== "approved";
    toast.success(mode === "login" ? "Welcome back" : pending ? "Application sent" : "Account created", {
      description: pending
        ? "We will review that you operate a real SaaS, then email you."
        : result.user.type === "seller"
          ? "You can list a SaaS from Sell."
          : "Browse anonymous SaaS listings. To buy, contact us and pay a deposit.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{mode === "login" ? "Sign in" : "Create an account"}</DialogTitle>
          <DialogDescription>
            {mode === "login"
              ? "Visitor or seller — same sign-in."
              : "Register as a visitor to browse, or as a seller to apply. We only list SaaS."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex rounded-lg border border-border p-1">
          {(["login", "register"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setMode(m);
                setError("");
              }}
              className={cn(
                "flex-1 rounded-md py-1.5 text-sm font-medium capitalize transition-colors",
                mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {m === "login" ? "Sign in" : "Register"}
            </button>
          ))}
        </div>

        <form onSubmit={onSubmit} className="grid gap-4">
          {mode === "register" ? (
            <>
              <div className="grid gap-2">
                <Label htmlFor="auth-name">Full name</Label>
                <Input id="auth-name" name="name" required placeholder="Your name" />
              </div>
              <div className="grid gap-2">
                <Label>I am a</Label>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      ["visitor", "Visitor"],
                      ["seller", "Seller"],
                    ] as const
                  ).map(([t, label]) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setType(t)}
                      className={cn(
                        "rounded-lg border px-3 py-2 text-sm transition-colors",
                        type === t
                          ? "border-primary/40 bg-primary/10 text-foreground"
                          : "border-border text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              {type === "seller" ? (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="companyName">SaaS / company name (private)</Label>
                    <Input id="companyName" name="companyName" required placeholder="Never shown to visitors" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="companyWebsite">Website</Label>
                    <Input id="companyWebsite" name="companyWebsite" placeholder="https://" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="companyNote">How we can verify you</Label>
                    <Textarea
                      id="companyNote"
                      name="companyNote"
                      rows={3}
                      placeholder="Short note: you own this SaaS, revenue range, etc."
                    />
                  </div>
                </>
              ) : null}
            </>
          ) : null}

          <div className="grid gap-2">
            <Label htmlFor="auth-email">Email</Label>
            <Input id="auth-email" name="email" type="email" required placeholder="you@email.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="auth-password">Password</Label>
            <Input id="auth-password" name="password" type="password" required minLength={6} />
          </div>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <Button type="submit" variant="premium">
            {mode === "login" ? "Sign in" : type === "seller" ? "Apply as seller" : "Create visitor account"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
