type Value = string | false | null | undefined;

/** Concaténation de classes, sans dépendance. */
export function cn(...values: Value[]): string {
  return values.filter(Boolean).join(" ");
}
