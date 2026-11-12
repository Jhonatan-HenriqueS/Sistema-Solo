import type { Metadata } from "next";
import { MobileTopbar, Sidebar } from "@/components/dashboard/sidebar";
import { SimuladorUmidade } from "@/components/dashboard/simulador-umidade";

export const metadata: Metadata = {
  title: "Simuladores | Agro+",
};

// Os simuladores só calculam na tela; nenhum valor é salvo.
export default function SimuladoresPage() {
  return (
    <div className="min-h-svh bg-[#f6f7f9]">
      <Sidebar pagina="simuladores" />
      <MobileTopbar pagina="simuladores" />

      <main className="px-4 py-8 md:px-8 lg:ml-[260px] lg:px-12 lg:py-10 2xl:px-20">
        <p className="text-[11px] font-semibold tracking-[0.1em] text-blue uppercase">
          Ferramentas
        </p>
        <h1 className="font-display mt-2 text-[44px] leading-none md:text-[52px]">Simuladores</h1>
        <p className="mt-2 text-[15px] text-ink-soft">
          Calcule na hora o estado do solo a partir do que o medidor mostrou.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <SimuladorUmidade />
        </div>

        <footer className="mt-10 flex justify-between text-[12px] text-ink-soft">
          <span>Agro+</span>
          <span>Os valores não são salvos</span>
        </footer>
      </main>
    </div>
  );
}
