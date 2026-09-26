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
};

function g(): GlobalUsers {
  const key = "__elarossa_users__";
  const scope = globalThis as unknown as Record<string, GlobalUsers | undefined>;
  if (!scope[key]) scope[key] = { map: new Map() };
  return scope[key]!;
}

function redisConfigured() {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL?.trim() && process.env.UPSTASH_REDIS_REST_TOKEN?.trim()
  );
}

async function redisCommand(command: string[]): Promise<unknown> {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) return null;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!res.ok) return null;
  const json = (await res.json()) as { result?: unknown };
  return json.result ?? null;
}

async function redisGet(email: string): Promise<StoredUser | null> {
  if (!redisConfigured()) return null;
  try {
    const result = await redisCommand(["GET", `elarossa:user:${email}`]);
    if (typeof result !== "string" || !result) return null;
    return JSON.parse(result) as StoredUser;
  } catch {
    return null;
  }
}

async function redisSet(user: StoredUser): Promise<void> {
  if (!redisConfigured()) return;
  try {
    await redisCommand(["SET", `elarossa:user:${user.email}`, JSON.stringify(user)]);
  } catch {
    /* memory map still holds the user on this instance */
  }
}

export async function findUserByEmail(email: string): Promise<StoredUser | null> {
  const key = normalizeEmail(email);
  const store = g();
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
