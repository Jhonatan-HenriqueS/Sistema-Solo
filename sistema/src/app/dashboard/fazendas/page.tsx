import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { MobileTopbar, Sidebar } from "@/components/dashboard/sidebar";
import { FazendasGrid } from "@/components/dashboard/fazendas-grid";

export const metadata: Metadata = {
  title: "Fazendas | Agro+",
};

// Página visual: "Adicionar fazenda" e o menu de edição não têm função.
export default function FazendasPage() {
  return (
    <div className="min-h-svh bg-[#f6f7f9]">
      <Sidebar pagina="fazendas" />
      <MobileTopbar pagina="fazendas" />

      <main className="px-4 py-8 md:px-8 lg:ml-[260px] lg:px-12 lg:py-10 2xl:px-20">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.1em] text-blue uppercase">
              Plano Plus
            </p>
            <h1 className="font-display mt-2 text-[44px] leading-none md:text-[52px]">Fazendas</h1>
            <p className="mt-2 flex flex-wrap items-center gap-2 text-[15px] text-ink-soft">
              Todas as suas propriedades em um só painel.
              <span className="rounded-full bg-blue-soft px-2.5 py-0.5 text-[12px] font-semibold text-blue">
                7 de 10 fazendas
              </span>
            </p>
          </div>
          <span className="flex h-11 w-full cursor-default items-center justify-center gap-2 rounded-full bg-ink px-5 text-[14px] font-medium text-white md:w-auto">
            <Plus className="size-4" />
            Adicionar fazenda
          </span>
        </div>

        <div className="mt-8">
          <FazendasGrid />
        </div>

        <footer className="mt-10 flex justify-between text-[12px] text-ink-soft">
          <span>Agro+</span>
          <span>Dados ilustrativos</span>
        </footer>
      </main>
    </div>
  );
}
