/**
 * In-process stock snapshot updated by CJ stock webhooks.
 * On Vercel this is per-instance (warm starts keep data briefly).
 * For durable stock across instances, add Redis/KV later — webhook path stays the same.
 */

export type StockRow = {
  vid: string;
  pid: string;
  areaId?: string;
  areaEn?: string;
  countryCode?: string;
  storageNum: number;
  updatedAt: string;
  messageId?: string;
};

const byVid = new Map<string, StockRow>();
const byPid = new Map<string, Map<string, StockRow>>();
const recentMessageIds = new Set<string>();
const RECENT_CAP = 500;

export function rememberMessageId(id: string): boolean {
  if (!id) return false;
  if (recentMessageIds.has(id)) return true; // duplicate
  recentMessageIds.add(id);
  if (recentMessageIds.size > RECENT_CAP) {
    const first = recentMessageIds.values().next().value;
    if (first) recentMessageIds.delete(first);
  }
  return false;
}

export function upsertStockRows(rows: Omit<StockRow, "updatedAt">[], messageId?: string) {
  const updatedAt = new Date().toISOString();
  for (const row of rows) {
    const full: StockRow = { ...row, updatedAt, messageId };
    byVid.set(row.vid, full);
    let pidMap = byPid.get(row.pid);
    if (!pidMap) {
      pidMap = new Map();
      byPid.set(row.pid, pidMap);
    }
    pidMap.set(row.vid, full);
  }
}

export function getStockByVid(vid: string): StockRow | undefined {
  return byVid.get(vid);
}

export function getStockByPid(pid: string): StockRow[] {
  const m = byPid.get(pid);
  return m ? [...m.values()] : [];
}

export function totalStockForPid(pid: string): number {
  return getStockByPid(pid).reduce((sum, r) => sum + (Number(r.storageNum) || 0), 0);
}

export function isLikelyInStock(pid: string, min = 1): boolean | null {
  const rows = getStockByPid(pid);
  if (!rows.length) return null; // unknown (no webhook yet)
  return totalStockForPid(pid) >= min;
}

export function stockCacheStats() {
  return {
    vids: byVid.size,
    pids: byPid.size,
    recentMessages: recentMessageIds.size,
  };
}

/** Parse CJ STOCK webhook params object into rows. */
export function parseStockParams(params: unknown): Omit<StockRow, "updatedAt">[] {
  if (!params || typeof params !== "object") return [];
  const rows: Omit<StockRow, "updatedAt">[] = [];

  for (const value of Object.values(params as Record<string, unknown>)) {
    const list = Array.isArray(value) ? value : [value];
    for (const item of list) {
      if (!item || typeof item !== "object") continue;
      const o = item as Record<string, unknown>;
      const vid = String(o.vid || "");
      const pid = String(o.pid || "");
      if (!vid) continue;
      rows.push({
        vid,
        pid: pid || "unknown",
        areaId: o.areaId != null ? String(o.areaId) : undefined,
        areaEn: o.areaEn != null ? String(o.areaEn) : undefined,
        countryCode: o.countryCode != null ? String(o.countryCode) : undefined,
        storageNum: Number(o.storageNum ?? 0) || 0,
      });
    }
  }
  return rows;
}
