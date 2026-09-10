import { NextResponse } from "next/server";
import { subscribeSchema } from "@/lib/validation";
import { subscribe } from "@/lib/newsletter";
import { clientIp, hit } from "@/lib/ratelimit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = clientIp(request);

  const limit = hit(`subscribe:${ip}`, 5, 10 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, message: "Trop de tentatives. Réessayez dans quelques minutes." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Requête illisible." }, { status: 400 });
  }

  const parsed = subscribeSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: parsed.error.issues[0]?.message ?? "Vérifiez l'adresse saisie." },
      { status: 422 },
    );
  }

  // Pot-de-miel rempli : on répond comme si tout allait bien plutôt
  // que d'apprendre au robot qu'il a été repéré.
  if (parsed.data.site_web_secondaire) {
    return NextResponse.json({ ok: true, message: "Merci, c'est enregistré." });
  }

  const result = await subscribe(parsed.data.email, parsed.data.source);

  if (result.status === "erreur") {
    return NextResponse.json({ ok: false, message: result.message }, { status: 502 });
  }

  return NextResponse.json({ ok: true, message: result.message });
}
