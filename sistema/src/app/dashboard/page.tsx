import type { Metadata } from "next";
import { MobileTopbar, Sidebar } from "@/components/dashboard/sidebar";
import { StatCards } from "@/components/dashboard/stat-cards";
import { UmidadeChart } from "@/components/dashboard/umidade-chart";
import { NpkChart } from "@/components/dashboard/npk-chart";
import { Historico } from "@/components/dashboard/historico";

export const metadata: Metadata = {
  title: "Dashboard | Agro+",
};

export default function DashboardPage() {
  return (
    <div className="min-h-svh bg-[#f6f7f9]">
      <Sidebar pagina="dashboard" />
      <MobileTopbar pagina="dashboard" />

      <main className="px-4 py-8 md:px-8 lg:ml-[260px] lg:px-12 lg:py-10 2xl:px-20">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.1em] text-blue uppercase">
            Sua fazenda, em perspectiva
          </p>
          <h1 className="font-display mt-2 text-[44px] leading-none md:text-[52px]">Dashboard</h1>
          <p className="mt-2 text-[15px] text-ink-soft">
            Fazenda Boa Vista · uma visão clara do seu solo.
          </p>

          <div className="mt-8 space-y-4">
            <StatCards />
            <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
              <UmidadeChart />
              <NpkChart />
            </div>
            <Historico />
          </div>

          <footer className="mt-10 flex justify-between text-[12px] text-ink-soft">
            <span>Agro+</span>
            <span>Dados ilustrativos</span>
          </footer>
        </div>
      </main>
    </div>
  );
}
