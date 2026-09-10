/**
 * Limitation de débit par adresse IP, en mémoire.
 *
 * Suffisant pour arrêter un robot qui martèle le formulaire depuis une
 * seule adresse, et pour un site à ce volume. La mémoire n'est pas
 * partagée entre les instances sans état de Vercel : si le trafic
 * augmente au point que ça devienne un problème, remplacer le `Map`
 * par Upstash Redis — l'interface `hit()` ne change pas.
 */

type Entry = { count: number; resetAt: number };

const buckets = new Map<string, Entry>();
const MAX_KEYS = 5_000;

export type RateLimitResult = { allowed: boolean; retryAfterSeconds: number };

export function hit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || entry.resetAt <= now) {
    // Purge paresseuse : on évite de faire grandir la carte sans fin.
    if (buckets.size > MAX_KEYS) {
      for (const [k, v] of buckets) if (v.resetAt <= now) buckets.delete(k);
    }
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  entry.count += 1;
  if (entry.count > limit) {
    return { allowed: false, retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { allowed: true, retryAfterSeconds: 0 };
}

/** IP du client derrière le proxy de Vercel. */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "inconnue";
}
