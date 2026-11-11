"use client";

import { Activity, LayoutDashboard, LogOut, MapPin, Menu, Settings } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/brand/primitives";
import { SITE_URL } from "@/lib/config";

type Pagina = "dashboard" | "leituras" | "fazendas";

const ativo = "flex items-center gap-3 rounded-xl bg-blue-soft px-3 py-2.5 font-medium text-blue";
const inativo = "flex items-center gap-3 rounded-xl px-3 py-2.5 text-ink-soft hover:bg-smoke";

/** Conteúdo da barra lateral. "Dashboard", "Leituras" e "Fazendas" têm rota; os outros itens são visuais. */
function SidebarContent({ pagina }: { pagina: Pagina }) {
  return (
    <div className="flex h-full flex-col">
      <a href="/dashboard" aria-label="Agro+ dashboard" className="px-2">
        <Logo />
      </a>

      <nav className="mt-10 flex-1">
        <p className="px-3 text-[11px] font-semibold tracking-[0.08em] text-ink-soft/70 uppercase">
          Menu
        </p>
        <ul className="mt-3 space-y-1 text-[15px]">
          <li>
            <a
              href="/dashboard"
              aria-current={pagina === "dashboard" ? "page" : undefined}
              className={pagina === "dashboard" ? ativo : inativo}
            >
              <LayoutDashboard className="size-[18px]" />
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="/dashboard/leituras"
              aria-current={pagina === "leituras" ? "page" : undefined}
              className={pagina === "leituras" ? ativo : inativo}
            >
              <Activity className="size-[18px]" />
              Leituras
            </a>
          </li>
          <li>
            <a
              href="/dashboard/fazendas"
              aria-current={pagina === "fazendas" ? "page" : undefined}
              className={pagina === "fazendas" ? ativo : inativo}
            >
              <MapPin className="size-[18px]" />
              Fazendas
            </a>
          </li>
          <li>
            <span className="flex cursor-default items-center gap-3 rounded-xl px-3 py-2.5 text-ink-soft hover:bg-smoke">
              <Settings className="size-[18px]" />
              Configurações
            </span>
          </li>
        </ul>
      </nav>

      <div className="rounded-[20px] bg-smoke p-4">
        <div className="flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-forest text-[13px] font-semibold text-lime">
            FB
          </span>
          <div className="min-w-0">
            <p className="truncate text-[14px] font-semibold">Fazenda Boa Vista</p>
            <p className="text-[12px] text-blue">Plano Pro</p>
          </div>
        </div>
        <a
          href={SITE_URL}
          className="mt-4 flex h-10 items-center justify-center gap-2 rounded-full bg-white text-[14px] font-medium ring-1 ring-black/10 transition-colors hover:bg-ink hover:text-white"
        >
          <LogOut className="size-4" />
          Sair
        </a>
      </div>
    </div>
  );
}

export function Sidebar({ pagina }: { pagina: Pagina }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[260px] border-r border-black/5 bg-white p-5 lg:block">
      <SidebarContent pagina={pagina} />
    </aside>
  );
}

export function MobileTopbar({ pagina }: { pagina: Pagina }) {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-black/5 bg-white/90 px-4 py-3 backdrop-blur lg:hidden">
      <Sheet>
        <SheetTrigger
          className="grid size-10 place-items-center rounded-full bg-smoke"
          aria-label="Abrir menu"
        >
          <Menu className="size-5" />
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] p-5">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SidebarContent pagina={pagina} />
        </SheetContent>
      </Sheet>
      <Logo />
    </header>
  );
}
