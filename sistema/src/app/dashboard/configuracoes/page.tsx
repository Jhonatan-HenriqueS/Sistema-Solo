import type { Metadata } from "next";
import { MobileTopbar, Sidebar } from "@/components/dashboard/sidebar";
import { ConfiguracoesView } from "@/components/configuracoes/configuracoes-view";

export const metadata: Metadata = {
  title: "Configurações | Agro+",
};

// Página visual: nenhum botão grava, altera ou apaga dados.
export default function ConfiguracoesPage() {
  return (
    <div className="min-h-svh bg-[#f6f7f9]">
      <Sidebar pagina="configuracoes" />
      <MobileTopbar pagina="configuracoes" />

      <main className="px-4 py-8 md:px-8 lg:ml-[260px] lg:px-12 lg:py-10 2xl:px-20">
        <p className="text-[11px] font-semibold tracking-[0.1em] text-blue uppercase">Sua conta</p>
        <h1 className="font-display mt-2 text-[44px] leading-none md:text-[52px]">Configurações</h1>
        <p className="mt-2 text-[15px] text-ink-soft">Plano, dados da conta e privacidade.</p>

        <ConfiguracoesView />

        <footer className="mt-10 flex justify-between text-[12px] text-ink-soft">
          <span>Agro+</span>
          <span>Dados ilustrativos</span>
        </footer>
      </main>
    </div>
  );
}
