/**
 * Cloudflare Turnstile — gratuit, sans témoin de suivi, et moins
 * intrusif que reCAPTCHA du point de vue de la vie privée.
 *
 * Si `TURNSTILE_SECRET_KEY` n'est pas défini, la vérification est
 * ignorée : le site fonctionne en développement sans clé, et le
 * pot-de-miel plus la limitation de débit restent actifs.
 */

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verifyTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  try {
    const body = new URLSearchParams({ secret, response: token, remoteip: ip });
    const response = await fetch(VERIFY_URL, {
      method: "POST",
      body,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      signal: AbortSignal.timeout(8000),
    });
    const result = (await response.json()) as { success?: boolean };
    return result.success === true;
  } catch (error) {
    console.error("[turnstile] vérification impossible", error);
    return false;
  }
}
