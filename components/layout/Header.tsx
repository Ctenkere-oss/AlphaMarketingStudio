"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { primaryCta, primaryNav } from "@/content/nav";
import { ButtonLink } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  // Le menu retient la page sur laquelle il a été ouvert. Dès que la
  // navigation change de page, il se referme de lui-même : c'est une
  // valeur dérivée, pas un effet qui court après le rendu.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // L'en-tête ne se densifie qu'une fois le héros dépassé.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu mobile : fermeture à Échap, verrou du défilement, piège à focus.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenedOn(null);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        "supports-[backdrop-filter]:backdrop-blur-[14px]",
        scrolled || open
          ? "border-b border-line bg-ink/78"
          : "border-b border-transparent bg-ink/30",
      )}
    >
      <Container className="flex h-17 items-center justify-between gap-6">
        <Link
          href="/"
          className="tap-safe rounded-md"
          aria-label={`${"Alpha Marketing Studio"} — retour à l'accueil`}
        >
          <Wordmark />
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-md px-3 py-2 text-small font-medium transition-colors",
                isActive(item.href) ? "text-bone" : "text-mist hover:text-bone",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
        </div>

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpenedOn((current) => (current === pathname ? null : pathname))}
          aria-expanded={open}
          aria-controls="menu-mobile"
          className="grid size-11 place-items-center rounded-control border border-line-strong
                     text-bone transition-colors hover:bg-white/6 lg:hidden"
        >
          <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </Container>

      <div
        id="menu-mobile"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 top-17 bottom-0 z-40 overflow-y-auto border-t border-line
                   bg-ink px-gutter pt-8 pb-12 lg:hidden"
      >
        <nav aria-label="Navigation mobile">
          <ul className="flex flex-col">
            {primaryNav.map((item) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "block py-4 font-display text-[1.6rem] font-bold tracking-tight transition-colors",
                    isActive(item.href) ? "text-bone" : "text-mist",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ButtonLink href={primaryCta.href} size="lg" className="mt-8 w-full">
          {primaryCta.label}
        </ButtonLink>
      </div>
    </header>
  );
}
