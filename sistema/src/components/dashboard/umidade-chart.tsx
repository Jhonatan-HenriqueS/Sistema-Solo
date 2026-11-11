"use client";

import { Bar, BarChart, CartesianGrid, ReferenceArea, XAxis, YAxis } from "recharts";
import { TrendingUp } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

// Única lista de dados permitida: o Recharts só desenha a partir dela.
const dados = [
  { dia: "Seg", umidade: 58 },
  { dia: "Ter", umidade: 61 },
  { dia: "Qua", umidade: 66 },
  { dia: "Qui", umidade: 64 },
  { dia: "Sex", umidade: 70 },
  { dia: "Sáb", umidade: 63 },
  { dia: "Dom", umidade: 64 },
];

const config = {
  umidade: { label: "Umidade (%)", color: "#0054f9" },
} satisfies ChartConfig;

export function UmidadeChart() {
  return (
    <section className="flex flex-col rounded-[24px] bg-white p-6 ring-1 ring-black/5">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-[16px] font-semibold">Umidade do solo</h2>
        <span className="rounded-full bg-smoke px-3 py-1 text-[12px] text-ink-soft ring-1 ring-black/5">
          Semana atual
        </span>
      </div>
      <p className="mt-3 flex items-baseline gap-2">
        <span className="text-[32px] leading-none font-medium tracking-tight">64%</span>
        <span className="flex items-center gap-1 text-[13px] text-ink-soft">
          <TrendingUp className="size-3.5 text-leaf" />
          média da semana
        </span>
      </p>

      <ChartContainer config={config} className="mt-6 aspect-auto min-h-[260px] w-full flex-1">
        <BarChart data={dados} margin={{ left: -16, right: 4, top: 8 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <ReferenceArea
            y1={55}
            y2={70}
            fill="#22c55e"
            fillOpacity={0.08}
            stroke="#22c55e"
            strokeOpacity={0.25}
            strokeDasharray="4 4"
          />
          <XAxis dataKey="dia" tickLine={false} axisLine={false} tickMargin={10} />
          <YAxis domain={[0, 100]} tickLine={false} axisLine={false} tickMargin={6} />
          <ChartTooltip cursor={{ fill: "rgba(0,84,249,0.06)" }} content={<ChartTooltipContent />} />
          <Bar dataKey="umidade" fill="var(--color-umidade)" radius={[10, 10, 4, 4]} maxBarSize={44} />
        </BarChart>
      </ChartContainer>

      <p className="mt-3 flex items-center gap-2 text-[12px] text-ink-soft">
        <span className="h-3 w-5 rounded-sm border border-dashed border-leaf/50 bg-leaf/10" />
        Faixa ideal de umidade (55–70%)
      </p>
    </section>
  );
}
