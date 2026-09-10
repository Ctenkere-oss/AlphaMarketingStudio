import { NextResponse } from "next/server";
import { contactSchema, fieldErrors } from "@/lib/validation";
import { sendContactEmail } from "@/lib/mail";
import { subscribe } from "@/lib/newsletter";
import { verifyTurnstile } from "@/lib/turnstile";
import { clientIp, hit } from "@/lib/ratelimit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = clientIp(request);

  const limit = hit(`contact:${ip}`, 4, 15 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        message: `Trop d'envois depuis cette connexion. Réessayez dans ${Math.ceil(
          limit.retryAfterSeconds / 60,
        )} minutes, ou écrivez-moi directement.`,
      },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Requête illisible." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Quelques champs demandent une correction.",
        errors: fieldErrors(parsed.error),
      },
      { status: 422 },
    );
  }

  const data = parsed.data;

  if (data.site_web_secondaire) {
    // Robot : réponse positive, aucun courriel envoyé.
    return NextResponse.json({ ok: true, message: "Merci, votre message est parti." });
  }

  const humanOk = await verifyTurnstile(data.turnstileToken, ip);
  if (!humanOk) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "La vérification anti-robot n'a pas abouti. Rechargez la page et réessayez — ou écrivez-moi directement, ça marche toujours.",
      },
      { status: 400 },
    );
  }

  const sent = await sendContactEmail(data);

  if (!sent) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Le service d'envoi ne répond pas. Écrivez-moi directement à l'adresse affichée à côté du formulaire — je réponds sous 48 h.",
      },
      { status: 502 },
    );
  }

  // Consentement explicite : la case n'est jamais cochée d'avance.
  // Un échec d'inscription ne doit pas faire échouer le message.
  if (data.infolettre) {
    const result = await subscribe(data.courriel, "formulaire-contact");
    if (result.status === "erreur") {
      console.error("[contact] message envoyé, inscription à l'infolettre échouée");
    }
  }

  return NextResponse.json({ ok: true, message: "Message envoyé." });
}
