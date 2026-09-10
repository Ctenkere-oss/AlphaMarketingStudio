/**
 * Consentement aux témoins (Loi 25).
 *
 * Aucun témoin non essentiel n'est déposé avant un choix explicite.
 * Le refus est aussi simple que l'acceptation : un bouton, un clic,
 * même poids visuel. Le choix est conservé un an, puis redemandé.
 */

export const CONSENT_KEY = "ams-consentement";
export const CONSENT_EVENT = "ams:consentement";
const MAX_AGE_DAYS = 365;

export type ConsentValue = "accepte" | "refuse";
export type ConsentRecord = { value: ConsentValue; date: string };

export function readConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const record = JSON.parse(raw) as ConsentRecord;
    const ageDays = (Date.now() - new Date(record.date).getTime()) / 86_400_000;
    if (Number.isNaN(ageDays) || ageDays > MAX_AGE_DAYS) return null;
    return record.value === "accepte" || record.value === "refuse" ? record.value : null;
  } catch {
    return null;
  }
}

export function writeConsent(value: ConsentValue) {
  try {
    const record: ConsentRecord = { value, date: new Date().toISOString() };
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
  } catch {
    // Stockage indisponible (navigation privée) : on continue sans mesure.
  }
  window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_EVENT, { detail: value }));
}

export function clearConsent() {
  try {
    window.localStorage.removeItem(CONSENT_KEY);
  } catch {
    /* rien à faire */
  }
  window.dispatchEvent(new CustomEvent<ConsentValue | null>(CONSENT_EVENT, { detail: null }));
}

/**
 * Abonnement au consentement, au format attendu par `useSyncExternalStore`.
 * C'est la bonne primitive ici : le consentement vit dans le stockage local
 * du navigateur, c'est-à-dire hors de React.
 */
export function subscribeToConsent(onChange: () => void): () => void {
  window.addEventListener(CONSENT_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** Rendu serveur : aucun stockage local, donc aucun consentement connu. */
export function consentServerSnapshot(): ConsentValue | null {
  return null;
}
