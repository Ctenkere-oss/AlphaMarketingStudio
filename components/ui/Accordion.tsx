"use client";

import { Minus, Plus } from "lucide-react";
import { useId, useState } from "react";

export type QaItem = { question: string; answer: React.ReactNode };

/**
 * Accordéon en boutons ARIA plutôt qu'en `<details>` : on garde le
 * contrôle de l'animation de hauteur et de l'état ouvert/fermé côté
 * clavier, avec `aria-expanded` et `aria-controls` correctement câblés.
 */
export function Accordion({ items }: { items: QaItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <ul className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${base}-panel-${i}`;
        const buttonId = `${base}-button-${i}`;
        return (
          <li key={item.question} className="border-b border-line">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-start justify-between gap-6 py-5 text-left
                           text-subtitle text-bone transition-colors hover:text-link"
              >
                <span className="max-w-[52ch]">{item.question}</span>
                <span
                  aria-hidden="true"
                  className="mt-1 grid size-7 shrink-0 place-items-center rounded-full
                             border border-line-strong text-mist"
                >
                  {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-6 text-mist"
            >
              <div className="max-w-[68ch]">{item.answer}</div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
