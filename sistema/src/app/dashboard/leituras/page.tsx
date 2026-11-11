import type { Metadata } from "next";
import { ChevronDown, Download, Search } from "lucide-react";
import { MobileTopbar, Sidebar } from "@/components/dashboard/sidebar";
import { LeiturasTabela } from "@/components/dashboard/leituras-tabela";

export const metadata: Metadata = {
  title: "Leituras | Agro+",
};

// Página visual: busca, filtro, exportar e paginação não têm função.
export default function LeiturasPage() {
  return (
    <div className="min-h-svh bg-[#f6f7f9]">
      <Sidebar pagina="leituras" />
      <MobileTopbar pagina="leituras" />

      <main className="px-4 py-8 md:px-8 lg:ml-[260px] lg:px-12 lg:py-10 2xl:px-20">
        <p className="text-[11px] font-semibold tracking-[0.1em] text-blue uppercase">
          Histórico do solo
        </p>
        <h1 className="font-display mt-2 text-[44px] leading-none md:text-[52px]">Leituras</h1>
        <p className="mt-2 text-[15px] text-ink-soft">
          Todas as medições de NPK e umidade, da mais recente para a mais antiga.
        </p>

        <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center">
          <label className="flex h-11 shrink-0 items-center gap-2 md:flex-1 rounded-full bg-white px-4 ring-1 ring-black/10">
            <Search className="size-4 text-ink-soft" />
            <input
              type="text"
              placeholder="Buscar por fazenda ou talhão"
              className="w-full bg-transparent text-[14px] outline-none placeholder:text-ink-soft/70"
            />
          </label>
          <span className="flex h-11 cursor-default items-center justify-between gap-6 rounded-full bg-white px-4 text-[14px] ring-1 ring-black/10">
            Todas as fazendas
            <ChevronDown className="size-4 text-ink-soft" />
          </span>
          <span className="flex h-11 cursor-default items-center justify-center gap-2 rounded-full bg-ink px-5 text-[14px] font-medium text-white">
            <Download className="size-4" />
            Exportar
          </span>
        </div>

        <div className="mt-4">
          <LeiturasTabela />
        </div>

        <footer className="mt-10 flex justify-between text-[12px] text-ink-soft">
          <span>Agro+</span>
          <span>Dados ilustrativos</span>
        </footer>
      </main>
    </div>
  );
}
