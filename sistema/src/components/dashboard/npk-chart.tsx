"use client";

import { Label, Pie, PieChart } from "recharts";
import { Sparkles } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

// Única lista de dados permitida: o Recharts só desenha a partir dela.
const dados = [
  { nutriente: "n", valor: 42, fill: "var(--color-n)" },
  { nutriente: "p", valor: 23, fill: "var(--color-p)" },
  { nutriente: "k", valor: 35, fill: "var(--color-k)" },
];

const config = {
  valor: { label: "% do total" },
  n: { label: "Nitrogênio", color: "#0054f9" },
  p: { label: "Fósforo", color: "#22c55e" },
  k: { label: "Potássio", color: "#14532d" },
} satisfies ChartConfig;

export function NpkChart() {
  return (
    <section className="rounded-[24px] bg-white p-6 ring-1 ring-black/5">
      <h2 className="text-[16px] font-semibold">Nutrientes do solo</h2>
      <p className="mt-1 text-[13px] text-ink-soft">Proporção de N, P e K na última leitura.</p>

      <ChartContainer config={config} className="mx-auto mt-4 aspect-square h-[220px]">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent nameKey="nutriente" hideLabel />} />
          <Pie
            data={dados}
            dataKey="valor"
            nameKey="nutriente"
            innerRadius={66}
            outerRadius={96}
            paddingAngle={3}
            cornerRadius={8}
            strokeWidth={0}
          >
            <Label
              content={({ viewBox }) =>
                viewBox && "cx" in viewBox ? (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                    <tspan x={viewBox.cx} y={viewBox.cy} className="fill-ink text-[28px] font-semibold">
                      NPK
                    </tspan>
                    <tspan x={viewBox.cx} y={(viewBox.cy ?? 0) + 22} className="fill-ink-soft text-[12px]">
                      100%
                    </tspan>
                  </text>
                ) : null
              }
            />
          </Pie>
        </PieChart>
      </ChartContainer>

      <ul className="mt-4 divide-y divide-black/5 text-[14px]">
        <li className="flex items-center justify-between py-2.5">
          <span className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-blue" /> Nitrogênio
          </span>
          <span className="text-ink-soft">
            84 mg/kg · <b className="font-semibold text-ink">42%</b>
          </span>
        </li>
        <li className="flex items-center justify-between py-2.5">
          <span className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-leaf" /> Fósforo
          </span>
          <span className="text-ink-soft">
            46 mg/kg · <b className="font-semibold text-ink">23%</b>
          </span>
        </li>
        <li className="flex items-center justify-between py-2.5">
          <span className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-forest" /> Potássio
          </span>
          <span className="text-ink-soft">
            70 mg/kg · <b className="font-semibold text-ink">35%</b>
          </span>
        </li>
      </ul>

      <div className="mt-4 rounded-[20px] bg-gradient-to-br from-forest to-[#1f7a43] p-5 text-white">
        <p className="flex items-center gap-2 text-[13px] text-lime">
          <Sparkles className="size-4" /> Nitrogênio em destaque
        </p>
        <div className="mt-2 flex items-end justify-between">
          <span className="text-[36px] leading-none font-medium tracking-tight">42%</span>
          <span className="text-[13px] text-white/75">do total de NPK</span>
        </div>
      </div>
    </section>
  );
}
