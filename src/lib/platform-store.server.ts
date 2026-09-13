import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import type { Business } from "@/data/businesses";
import type { PlatformStore, PlatformUser, SellerListing, User } from "@/lib/marketplace-types";

type KvBinding = {
  get: (key: string) => Promise<string | null>;
  put: (key: string, value: string) => Promise<void>;
};

type WorkerEnv = {
  PLATFORM?: {
    idFromName: (name: string) => unknown;
    get: (id: unknown) => { fetch: (input: Request) => Promise<Response> };
  };
  PLATFORM_KV?: KvBinding;
  ADMIN_EMAIL?: string;
  ADMIN_PASSWORD?: string;
};

const empty = (): PlatformStore => ({
  users: [],
  listings: [],
  inquiries: [],
  offers: [],
  conversations: [],
  favorites: {},
  contacts: [],
});

const g = globalThis as typeof globalThis & {
  __fepStore?: PlatformStore;
  __fepEnv?: WorkerEnv;
};

const KV_KEY = "platform-store";

function projectRoot() {
  const fromEnv = process.env["FEP_DATA_DIR"] ?? process.env["INIT_CWD"];
  if (fromEnv && existsSync(join(fromEnv, "package.json"))) return fromEnv;
  let dir = process.cwd();
  for (let i = 0; i < 8; i++) {
    if (existsSync(join(dir, "package.json"))) return dir;
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return process.cwd();
}

function filePath() {
  return join(projectRoot(), "data", "platform.json");
}

function normalize(parsed: Partial<PlatformStore> | null | undefined): PlatformStore {
  return {
    ...empty(),
    ...parsed,
    favorites: parsed?.favorites ?? {},
    contacts: parsed?.contacts ?? [],
  };
}

export function hashSecret(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

async function workerEnv(): Promise<WorkerEnv | undefined> {
  return g.__fepEnv;
}

async function readDurable(env: WorkerEnv | undefined): Promise<PlatformStore | null> {
  if (env?.PLATFORM_KV) {
    const raw = await env.PLATFORM_KV.get(KV_KEY);
    if (raw) return normalize(JSON.parse(raw) as PlatformStore);
  }

  if (env?.PLATFORM) {
    const stub = env.PLATFORM.get(env.PLATFORM.idFromName("platform"));
    const res = await stub.fetch(new Request("https://do/platform", { method: "GET" }));
    if (res.ok) return normalize((await res.json()) as PlatformStore);
  }

  try {
    const path = filePath();
    if (existsSync(path)) {
      return normalize(JSON.parse(readFileSync(path, "utf8")) as PlatformStore);
    }
  } catch (error) {
    console.error("Could not read marketplace file", error);
  }
  return null;
}

async function writeDurable(store: PlatformStore, env: WorkerEnv | undefined) {
  const body = JSON.stringify(store, null, 2);

  if (env?.PLATFORM_KV) {
    await env.PLATFORM_KV.put(KV_KEY, body);
  }

  if (env?.PLATFORM) {
    const stub = env.PLATFORM.get(env.PLATFORM.idFromName("platform"));
    await stub.fetch(
      new Request("https://do/platform", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body,
      }),
    );
  }

  try {
    const dir = join(projectRoot(), "data");
    mkdirSync(dir, { recursive: true });
    writeFileSync(filePath(), body);
  } catch (error) {
    console.error("Could not write marketplace file", filePath(), error);
  }
}

export async function loadStore(): Promise<PlatformStore> {
  if (g.__fepStore && (g.__fepStore.users.length > 0 || g.__fepStore.listings.length > 0)) {
    return g.__fepStore;
  }
  const env = await workerEnv();
  const disk = await readDurable(env);
  g.__fepStore = disk ?? g.__fepStore ?? empty();
  return g.__fepStore;
}

export async function saveStore(store: PlatformStore) {
  g.__fepStore = store;
  await writeDurable(store, await workerEnv());
}

export function publicUser(user: PlatformUser): User {
  const type = user.type === "seller" ? "seller" : "visitor";
  const out: User = { id: user.id, name: user.name, email: user.email, type };
  if (type === "seller") out.sellerStatus = user.sellerStatus ?? "pending";
  if (user.companyName) out.companyName = user.companyName;
  if (user.companyWebsite) out.companyWebsite = user.companyWebsite;
  if (user.companyNote) out.companyNote = user.companyNote;
  if (user.firm) out.firm = user.firm;
  if (user.buyerType) out.buyerType = user.buyerType;
  if (user.budget) out.budget = user.budget;
  if (user.timeline) out.timeline = user.timeline;
  if (user.thesis) out.thesis = user.thesis;
  return out;
}

export function publicListing(listing: SellerListing): Business {
  const { status: _s, ownerEmail: _o, ...business } = listing;
  return business;
}

export function uid(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function now() {
  return new Date().toISOString();
}

export function adminEmail() {
  return (g.__fepEnv?.ADMIN_EMAIL ?? process.env["ADMIN_EMAIL"] ?? "admin@founderexit.com")
    .trim()
    .toLowerCase();
}

export function adminPassword() {
  return g.__fepEnv?.ADMIN_PASSWORD ?? process.env["ADMIN_PASSWORD"] ?? "FE-7kP9mQ2x";
}

export function adminToken() {
  return hashSecret(`admin:${adminEmail()}:${adminPassword()}`);
}

export class PlatformDO {
  constructor(private readonly ctx: { storage: { get: (key: string) => Promise<unknown>; put: (key: string, value: string) => Promise<void> } }) {}

  async fetch(request: Request) {
    if (request.method === "GET") {
      const raw = (await this.ctx.storage.get("data")) as string | undefined;
      return new Response(raw ?? JSON.stringify(empty()), {
        headers: { "content-type": "application/json" },
      });
    }
    if (request.method === "PUT") {
      await this.ctx.storage.put("data", await request.text());
      return new Response("ok");
    }
    return new Response("Method Not Allowed", { status: 405 });
  }
}
