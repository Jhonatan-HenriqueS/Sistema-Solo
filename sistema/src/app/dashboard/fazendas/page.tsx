import type { Metadata } from "next";
import { MobileTopbar, Sidebar } from "@/components/dashboard/sidebar";
import { FazendasView } from "@/components/dashboard/fazendas-grid";

export const metadata: Metadata = {
  title: "Fazendas | Agro+",
};

// Página visual: o modal de criar/editar abre e fecha, mas nada é salvo.
export default function FazendasPage() {
  return (
    <div className="min-h-svh bg-[#f6f7f9]">
      <Sidebar pagina="fazendas" />
      <MobileTopbar pagina="fazendas" />

      <main className="px-4 py-8 md:px-8 lg:ml-[260px] lg:px-12 lg:py-10 2xl:px-20">
        <FazendasView />

        <footer className="mt-10 flex justify-between text-[12px] text-ink-soft">
          <span>Agro+</span>
          <span>Dados ilustrativos</span>
        </footer>
      </main>
    </div>
  );
}
