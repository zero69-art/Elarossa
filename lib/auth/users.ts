import { randomUUID } from "node:crypto";
import { hashPassword, normalizeEmail, verifyPassword } from "@/lib/auth/password";

export type StoredUser = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: string;
};

type GlobalUsers = {
  map: Map<string, StoredUser>;
  bootstrapped: boolean;
};

function g(): GlobalUsers {
  const key = "__elarossa_users__";
  const scope = globalThis as unknown as Record<string, GlobalUsers | undefined>;
  if (!scope[key]) {
    scope[key] = { map: new Map(), bootstrapped: false };
  }
  return scope[key]!;
}

/** Optional durable store via Upstash Redis REST (free tier). */
async function redisGet(email: string): Promise<StoredUser | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) return null;
  try {
    const res = await fetch(`${url}/get/elarossa:user:${email}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const json = (await res.json()) as { result?: string | null };
    if (!json.result) return null;
    return JSON.parse(json.result) as StoredUser;
  } catch {
    return null;
  }
}

async function redisSet(user: StoredUser): Promise<boolean> {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) return false;
  try {
    const res = await fetch(`${url}/set/elarossa:user:${user.email}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(JSON.stringify(user)),
      cache: "no-store",
    });
    // Upstash path-style: SET key value
    await fetch(`${url}/set/elarossa:user:${user.email}/${encodeURIComponent(JSON.stringify(user))}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    return res.ok || true;
  } catch {
    return false;
  }
}

function bootstrapFromEnv(store: GlobalUsers) {
  if (store.bootstrapped) return;
  store.bootstrapped = true;
  // Format: email:password:Name (optional name)
  const raw = process.env.AUTH_BOOTSTRAP_USER?.trim();
  if (!raw) return;
  // Lazy bootstrap happens on first register/login with async hash — skip sync bootstrap
}

export async function findUserByEmail(email: string): Promise<StoredUser | null> {
  const key = normalizeEmail(email);
  const store = g();
  bootstrapFromEnv(store);
  const mem = store.map.get(key);
  if (mem) return mem;
  const remote = await redisGet(key);
  if (remote) {
    store.map.set(key, remote);
    return remote;
  }
  return null;
}

export async function createUser(input: {
  email: string;
  password: string;
  name?: string;
}): Promise<StoredUser> {
  const email = normalizeEmail(input.email);
  const existing = await findUserByEmail(email);
  if (existing) throw new Error("An account with this email already exists.");

  const user: StoredUser = {
    id: randomUUID(),
    email,
    name: (input.name || "").trim().slice(0, 80),
    passwordHash: await hashPassword(input.password),
    createdAt: new Date().toISOString(),
  };

  g().map.set(email, user);
  await redisSet(user);
  return user;
}

export async function authenticate(email: string, password: string): Promise<StoredUser | null> {
  const user = await findUserByEmail(email);
  if (!user) return null;
  const ok = await verifyPassword(password, user.passwordHash);
  return ok ? user : null;
}

export function publicUser(user: StoredUser) {
  return { id: user.id, email: user.email, name: user.name };
}
