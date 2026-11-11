"use client";

import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { APP_URL, CTA } from "@/lib/site";
import { CtaLink, Logo } from "./primitives";

const links = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#beneficios", label: "Benefícios" },
  { href: "#planos", label: "Planos" },
  { href: "#duvidas", label: "Dúvidas" },
];

/** Curva invertida que liga a barra branca à moldura do hero. */
function Corner({ side }: { side: "left" | "right" }) {
  return (
    <span
      aria-hidden
      className="absolute top-0 size-6"
      style={{
        [side === "left" ? "right" : "left"]: "100%",
        background: `radial-gradient(circle at ${side === "left" ? "0" : "100%"} 100%, transparent 23.5px, white 24px)`,
      }}
    />
  );
}

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3">
      <nav className="relative flex w-full max-w-[860px] items-center justify-between gap-4 rounded-b-[24px] bg-white py-2.5 pr-2.5 pl-3">
        <Corner side="left" />
        <Corner side="right" />
        <a href="#topo" aria-label="Agro+ início">
          <Logo />
        </a>
        <ul className="hidden items-center gap-6 text-[14px] whitespace-nowrap text-ink-soft lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden items-center gap-2 lg:flex">
          <CtaLink href={`${APP_URL}/login`} variant="outline" className="h-10 px-5 text-[14px]">
            Entrar
          </CtaLink>
          <CtaLink href={CTA.reservar} className="h-10 px-5 text-[14px]">
            Reservar meu kit
          </CtaLink>
        </div>

        <Sheet>
          <SheetTrigger
            className="grid size-10 place-items-center rounded-full bg-smoke lg:hidden"
            aria-label="Abrir menu"
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="top" className="rounded-b-[24px] p-6">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <Logo />
            <ul className="mt-2 flex flex-col gap-1 text-lg">
              {links.map((l) => (
                <li key={l.href}>
                  <SheetClose
                    render={<a href={l.href} />}
                    nativeButton={false}
                    className="block rounded-xl px-2 py-2 hover:bg-smoke"
                  >
                    {l.label}
                  </SheetClose>
                </li>
              ))}
            </ul>
            <div className="grid gap-2">
              <CtaLink href={CTA.reservar} className="w-full">
                Reservar meu kit
              </CtaLink>
              <CtaLink href={`${APP_URL}/login`} variant="outline" className="w-full">
                Entrar
              </CtaLink>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
