import type { Metadata } from "next";
import { MobileTopbar, Sidebar } from "@/components/dashboard/sidebar";
import { TalhoesView } from "@/components/dashboard/talhoes-grid";

export const metadata: Metadata = {
  title: "Talhões | Agro+",
};

// Página visual: o modal de criar/editar abre e fecha, mas nada é salvo.
export default function TalhoesPage() {
  return (
    <div className="min-h-svh bg-[#f6f7f9]">
      <Sidebar pagina="talhoes" />
      <MobileTopbar pagina="talhoes" />

      <main className="px-4 py-8 md:px-8 lg:ml-[260px] lg:px-12 lg:py-10 2xl:px-20">
        <TalhoesView />

        <footer className="mt-10 flex justify-between text-[12px] text-ink-soft">
          <span>Agro+</span>
          <span>Dados ilustrativos</span>
        </footer>
      </main>
    </div>
  );
}
