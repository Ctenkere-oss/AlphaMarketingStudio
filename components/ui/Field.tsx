"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";

const control =
  "w-full min-h-11 rounded-control border border-line-strong bg-ink-panel px-3.5 py-2.5 " +
  "text-body text-bone placeholder:text-mute/80 transition-colors " +
  "hover:border-white/22 focus:border-link focus:outline-none " +
  "aria-[invalid=true]:border-danger";

type Common = {
  label: string;
  name: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
};

function Shell({
  label,
  hint,
  error,
  required,
  id,
  hintId,
  errorId,
  className,
  children,
}: Omit<Common, "name"> & {
  id: string;
  hintId: string;
  errorId: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-small font-medium text-bone">
        {label}
        {required ? (
          <span className="ml-1 text-mute" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-2 text-micro font-normal text-mute">facultatif</span>
        )}
      </label>
      {children}
      {hint ? (
        <p id={hintId} className="text-micro text-mute">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-micro font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextField({
  label,
  name,
  hint,
  error,
  required,
  className,
  ...props
}: Common & React.InputHTMLAttributes<HTMLInputElement>) {
  const uid = useId();
  const id = `${uid}-${name}`;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  return (
    <Shell {...{ label, hint, error, required, id, hintId, errorId, className }}>
      <input
        id={id}
        name={name}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={cn(hint && hintId, error && errorId) || undefined}
        className={control}
        {...props}
      />
    </Shell>
  );
}

export function TextArea({
  label,
  name,
  hint,
  error,
  required,
  className,
  ...props
}: Common & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const uid = useId();
  const id = `${uid}-${name}`;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  return (
    <Shell {...{ label, hint, error, required, id, hintId, errorId, className }}>
      <textarea
        id={id}
        name={name}
        required={required}
        rows={5}
        aria-invalid={error ? true : undefined}
        aria-describedby={cn(hint && hintId, error && errorId) || undefined}
        className={cn(control, "resize-y")}
        {...props}
      />
    </Shell>
  );
}

export function SelectField({
  label,
  name,
  hint,
  error,
  required,
  options,
  className,
  ...props
}: Common & {
  options: { value: string; label: string }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const uid = useId();
  const id = `${uid}-${name}`;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  return (
    <Shell {...{ label, hint, error, required, id, hintId, errorId, className }}>
      <div className="relative">
        <select
          id={id}
          name={name}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={cn(hint && hintId, error && errorId) || undefined}
          className={cn(control, "appearance-none pr-10")}
          {...props}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value} className="bg-ink-panel">
              {o.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 12 8"
          className="pointer-events-none absolute top-1/2 right-3.5 h-2 w-3 -translate-y-1/2 fill-mist"
        >
          <path d="M1 1.5 6 6.5 11 1.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </div>
    </Shell>
  );
}

export function CheckboxField({
  label,
  name,
  hint,
  error,
  className,
  ...props
}: Omit<Common, "required"> & React.InputHTMLAttributes<HTMLInputElement>) {
  const uid = useId();
  const id = `${uid}-${name}`;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {/* L'étiquette englobe la case : la zone tactile devient la ligne
          entière plutôt que le carré de 20 px du contrôle natif. */}
      <label
        htmlFor={id}
        className="flex min-h-11 cursor-pointer items-start gap-3 py-1.5 text-small text-mist"
      >
        <input
          id={id}
          name={name}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={cn(hint && hintId, error && errorId) || undefined}
          className="mt-0.5 size-5 shrink-0 cursor-pointer rounded-[5px] border border-line-strong
                     bg-ink-panel accent-indigo-deep"
          {...props}
        />
        <span>{label}</span>
      </label>
      {hint ? (
        <p id={hintId} className="pl-8 text-micro text-mute">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="pl-8 text-micro font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Pot-de-miel : invisible à l'œil, atteignable par un robot, retiré du parcours clavier. */
export function Honeypot({ name = "site_web_secondaire" }: { name?: string }) {
  return (
    <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0">
      <label htmlFor={name}>Ne pas remplir ce champ</label>
      <input id={name} name={name} type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
