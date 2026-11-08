interface RateLimitBucket {
  timestamps: number[];
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

const DEFAULT_MAX_REQUESTS = 5;
const DEFAULT_WINDOW_MS = 15 * 60 * 1000;
const buckets = new Map<string, RateLimitBucket>();

function pruneStaleBuckets(now: number, windowMs: number): void {
  if (buckets.size < 250) return;
  for (const [key, bucket] of buckets.entries()) {
    const fresh = bucket.timestamps.filter((ts) => now - ts < windowMs);
    if (fresh.length === 0) {
      buckets.delete(key);
    } else {
      bucket.timestamps = fresh;
    }
  }
}

export function checkContactRateLimit(
  clientKey: string,
  maxRequests = DEFAULT_MAX_REQUESTS,
  windowMs = DEFAULT_WINDOW_MS
): RateLimitResult {
  const now = Date.now();
  pruneStaleBuckets(now, windowMs);

  const normalizedKey = (clientKey || "anonymous").slice(0, 128);
  const existing = buckets.get(normalizedKey);
  const validTimestamps = (existing?.timestamps || []).filter((ts) => now - ts < windowMs);

  if (validTimestamps.length >= maxRequests) {
    const oldest = validTimestamps[0] ?? now;
    const retryAfterMs = Math.max(1000, windowMs - (now - oldest));
    buckets.set(normalizedKey, { timestamps: validTimestamps });
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil(retryAfterMs / 1000),
    };
  }

  validTimestamps.push(now);
  buckets.set(normalizedKey, { timestamps: validTimestamps });

  return {
    allowed: true,
    remaining: Math.max(0, maxRequests - validTimestamps.length),
    retryAfterSeconds: 0,
  };
}

export function resolveClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const firstIp = forwarded.split(",")[0]?.trim();
    if (firstIp) return firstIp;
  }
  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  return "direct-client";
}
