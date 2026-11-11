// Valores ilustrativos, escritos direto no HTML. Não há banco nem cálculo.
import { Activity, CheckCircle2, Droplets, Leaf, Sprout } from "lucide-react";

const card =
  "rounded-[24px] bg-white p-6 ring-1 ring-black/5 transition-[scale,box-shadow] duration-300 hover:scale-[1.02] hover:shadow-[0_20px_40px_-20px_rgba(16,24,40,0.25)]";

export function StatCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div className={card}>
        <div className="flex items-center justify-between">
          <p className="text-[14px] text-ink-soft">Estado do solo</p>
          <span className="grid size-9 place-items-center rounded-full bg-leaf-soft">
            <Sprout className="size-4 text-forest" />
          </span>
        </div>
        <p className="mt-4 text-[44px] leading-none font-medium tracking-tight text-leaf">Excelente</p>
        <p className="mt-4 flex items-center gap-1.5 text-[13px] text-ink-soft">
          <CheckCircle2 className="size-3.5 text-leaf" />
          Média de N, P, K e umidade
        </p>
      </div>

      <div className={card}>
        <div className="flex items-center justify-between">
          <p className="text-[14px] text-ink-soft">Umidade</p>
          <span className="grid size-9 place-items-center rounded-full bg-blue-soft">
            <Droplets className="size-4 text-blue" />
          </span>
        </div>
        <p className="mt-4 text-[44px] leading-none font-medium tracking-tight">64%</p>
        <p className="mt-4 flex items-center gap-1.5 text-[13px] text-ink-soft">
          <span className="size-1.5 rounded-full bg-blue" />
          Dentro da faixa ideal (55–70%)
        </p>
      </div>

      <div className={card}>
        <div className="flex items-center justify-between">
          <p className="text-[14px] text-ink-soft">NPK</p>
          <span className="grid size-9 place-items-center rounded-full bg-blue-soft">
            <Leaf className="size-4 text-blue" />
          </span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-forest px-3 py-1.5 text-[13px] font-medium text-lime">
            <b className="font-semibold">N</b> Excelente
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-leaf-soft px-3 py-1.5 text-[13px] font-medium text-forest">
            <b className="font-semibold">P</b> Ótimo
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-soft px-3 py-1.5 text-[13px] font-medium text-blue">
            <b className="font-semibold">K</b> Ideal
          </span>
        </div>
        <p className="mt-4 flex items-center gap-1.5 text-[13px] text-ink-soft">
          <span className="size-1.5 rounded-full bg-leaf" />
          Nitrogênio, Fósforo e Potássio
        </p>
      </div>

      <div className={card}>
        <div className="flex items-center justify-between">
          <p className="text-[14px] text-ink-soft">Leituras do mês</p>
          <span className="grid size-9 place-items-center rounded-full bg-blue-soft">
            <Activity className="size-4 text-blue" />
          </span>
        </div>
        <p className="mt-4 text-[44px] leading-none font-medium tracking-tight">1.240</p>
        <p className="mt-4 flex items-center gap-1.5 text-[13px] text-ink-soft">
          <span className="size-1.5 rounded-full bg-blue" />
          Novembro · 4 talhões
        </p>
      </div>
    </div>
  );
}
