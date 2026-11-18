import type { Metadata } from "next";
import { MobileTopbar, Sidebar } from "@/components/dashboard/sidebar";
import { PlantiosView } from "@/components/plantios/plantios-view";

export const metadata: Metadata = {
  title: "Plantios | Agro+",
};

export default function PlantiosPage() {
  return (
    <div className="min-h-svh bg-[#f6f7f9]">
      <Sidebar pagina="plantios" />
      <MobileTopbar pagina="plantios" />

      <main className="px-4 py-8 md:px-8 lg:ml-[260px] lg:px-12 lg:py-10 2xl:px-20">
        <p className="text-[11px] font-semibold tracking-[0.1em] text-blue uppercase">Referências</p>
        <h1 className="font-display mt-2 text-[44px] leading-none md:text-[52px]">Plantios</h1>
        <p className="mt-2 text-[15px] text-ink-soft">
          Valores ideais de NPK e umidade de cada cultura, usados como base dos cálculos do solo.
        </p>

        <PlantiosView />

        <footer className="mt-10 flex justify-between text-[12px] text-ink-soft">
          <span>Agro+</span>
          <span>Valores de referência</span>
        </footer>
      </main>
    </div>
  );
}
