import { Resend } from "resend";
import { site } from "@/content/site";
import { budgetOptions, serviceOptions } from "./form-options";
import type { ContactInput } from "./validation";

/**
 * Envoi du formulaire de contact par Resend.
 * La clé d'API ne quitte jamais le serveur : le formulaire passe par
 * un Route Handler, jamais par un appel direct depuis le navigateur.
 */

const label = (options: readonly { value: string; label: string }[], value: string) =>
  options.find((o) => o.value === value)?.label ?? value;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function sendContactEmail(input: ContactInput): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from) {
    console.warn(
      "[contact] RESEND_API_KEY ou CONTACT_FROM_EMAIL absent — message reçu mais non expédié :",
      { nom: input.nom, courriel: input.courriel, service: input.service },
    );
    return false;
  }

  const rows: [string, string][] = [
    ["Nom", input.nom],
    ["Courriel", input.courriel],
    ["Entreprise", input.entreprise || "—"],
    ["Budget mensuel", label(budgetOptions, input.budget)],
    ["Service", label(serviceOptions, input.service)],
    ["Infolettre", input.infolettre ? "Oui, a coché la case" : "Non"],
  ];

  const html = `
    <div style="font-family:ui-sans-serif,system-ui,sans-serif;font-size:15px;line-height:1.6;color:#1a1a1a">
      <h2 style="margin:0 0 16px;font-size:18px">Nouvelle demande depuis ${escapeHtml(site.url)}</h2>
      <table style="border-collapse:collapse;width:100%;max-width:560px">
        ${rows
          .map(
            ([key, value]) =>
              `<tr>
                 <td style="padding:6px 12px 6px 0;color:#666;white-space:nowrap;vertical-align:top">${key}</td>
                 <td style="padding:6px 0"><strong>${escapeHtml(value)}</strong></td>
               </tr>`,
          )
          .join("")}
      </table>
      <h3 style="margin:24px 0 8px;font-size:15px">Message</h3>
      <p style="white-space:pre-wrap;margin:0;padding:14px;background:#f5f5f7;border-radius:8px">${escapeHtml(
        input.message,
      )}</p>
    </div>`;

  const text = [
    ...rows.map(([key, value]) => `${key} : ${value}`),
    "",
    "Message :",
    input.message,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: site.email,
      // Répondre depuis la boîte de réception écrit directement au prospect.
      replyTo: input.courriel,
      subject: `Demande — ${input.nom}${input.entreprise ? ` (${input.entreprise})` : ""}`,
      html,
      text,
    });

    if (error) {
      console.error("[contact] Resend a refusé l'envoi", error);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[contact] échec de l'envoi", error);
    return false;
  }
}
