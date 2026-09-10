import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { site } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  title: "Merci — votre demande est bien arrivée",
  description:
    "Votre demande a été transmise à Alpha Marketing Studio. Réponse sous 48 h ouvrables. Voici ce qui se passe maintenant.",
  path: "/merci",
  // Page de conversion : utile aux visiteurs, sans intérêt en recherche.
  noIndex: true,
});

const steps = [
  {
    title: "Je lis votre demande",
    body: "Généralement le jour même. Si vous m'avez donné l'adresse de votre site, je le regarde avant de répondre.",
  },
  {
    title: "Je vous réponds sous 48 h ouvrables",
    body: "Soit avec des questions précises, soit avec une proposition d'appel de vingt minutes. Jamais avec un courriel automatique de trois pages.",
  },
  {
    title: "Vous recevez l'audit",
    body: "Si on va de l'avant, je vous demande des accès en lecture seule et je vous renvoie le document. Il est à vous, quoi qu'il arrive ensuite.",
  },
];

export default function MerciPage() {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="backdrop-halo opacity-70" aria-hidden="true" />
      <div className="backdrop-grid" aria-hidden="true" />

      <Container className="relative z-10 max-w-3xl py-20 lg:py-28">
        <p className="flex items-center gap-3 text-small text-mute">
          <span aria-hidden="true" className="h-px w-8 bg-accent" />
          Demande reçue
        </p>
        <h1 className="mt-5 text-display-2 text-bone">Merci, c&apos;est bien arrivé</h1>
        <p className="mt-6 text-lead text-mist">
          Votre message est dans ma boîte de réception. Voici exactement ce qui se passe maintenant,
          pour que vous n&apos;ayez pas à vous demander si quelque chose s&apos;est perdu.
        </p>

        <ol className="mt-12 space-y-px overflow-hidden rounded-frame border border-line bg-line">
          {steps.map((step, i) => (
            <li key={step.title} className="flex gap-5 bg-ink-raised p-6">
              <span
                aria-hidden="true"
                className="text-gradient font-display text-[1.8rem] leading-none font-bold"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="font-display text-subtitle font-bold text-bone">{step.title}</h2>
                <p className="mt-2 text-small text-mist">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-10 text-small text-mist">
          Une urgence ou un oubli ? Écrivez-moi directement à{" "}
          <TextLink href={`mailto:${site.email}`}>{site.email}</TextLink>.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/blogue" size="lg" variant="secondary">
            Lire le blogue en attendant
          </ButtonLink>
          <ButtonLink href="/" size="lg" variant="quiet">
            Retour à l&apos;accueil
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
