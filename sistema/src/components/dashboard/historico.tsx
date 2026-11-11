"use client";

import { useState } from "react";
import { Check, Pencil } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Aba = "leituras" | "acoes";

// Itens ilustrativos, escritos direto no HTML. Ao recarregar, volta para "Últimas leituras".
export function Historico() {
  const [aba, setAba] = useState<Aba>("leituras");
  const item = "flex items-center justify-between gap-4 rounded-2xl bg-smoke px-4 py-3.5";

  return (
    <section className="rounded-[24px] bg-white p-6 ring-1 ring-black/5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-[16px] font-semibold">
            {aba === "leituras" ? "Últimas leituras" : "Próximas ações"}
          </h2>
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label="Trocar lista"
              className="grid size-8 place-items-center rounded-full bg-blue-soft text-blue transition-colors hover:bg-blue hover:text-white"
            >
              <Pencil className="size-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 rounded-xl p-1.5">
              <DropdownMenuItem onClick={() => setAba("leituras")} className="justify-between rounded-lg px-2.5 py-2">
                Últimas leituras
                {aba === "leituras" && <Check className="text-blue" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setAba("acoes")} className="justify-between rounded-lg px-2.5 py-2">
                Próximas ações
                {aba === "acoes" && <Check className="text-blue" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {aba === "leituras" ? (
          <span className="rounded-full bg-leaf-soft px-3 py-1 text-[12px] font-medium text-forest">
            Sincronizado
          </span>
        ) : (
          <span className="rounded-full bg-blue-soft px-3 py-1 text-[12px] font-medium text-blue">
            4 agendadas
          </span>
        )}
      </div>

      {aba === "leituras" ? (
        <ul className="mt-5 space-y-2.5">
          <li className={item}>
            <div>
              <p className="text-[15px] font-medium">Talhão 1</p>
              <p className="text-[13px] text-ink-soft">04/11/2026 · 14:20</p>
            </div>
            <span className="rounded-full bg-forest px-2.5 py-1 text-[12px] font-semibold text-lime">Excelente</span>
          </li>
          <li className={item}>
            <div>
              <p className="text-[15px] font-medium">Talhão 2</p>
              <p className="text-[13px] text-ink-soft">04/11/2026 · 13:05</p>
            </div>
            <span className="rounded-full bg-leaf-soft px-2.5 py-1 text-[12px] font-semibold text-forest">Ótimo</span>
          </li>
          <li className={item}>
            <div>
              <p className="text-[15px] font-medium">Talhão 3</p>
              <p className="text-[13px] text-ink-soft">04/11/2026 · 11:40</p>
            </div>
            <span className="rounded-full bg-forest px-2.5 py-1 text-[12px] font-semibold text-lime">Excelente</span>
          </li>
          <li className={item}>
            <div>
              <p className="text-[15px] font-medium">Talhão 4</p>
              <p className="text-[13px] text-ink-soft">03/11/2026 · 18:10</p>
            </div>
            <span className="rounded-full bg-blue-soft px-2.5 py-1 text-[12px] font-semibold text-blue">Ideal</span>
          </li>
        </ul>
      ) : (
        <ul className="mt-5 space-y-2.5">
          <li className={item}>
            <div>
              <p className="text-[15px] font-medium">Nova leitura · Talhão 1</p>
              <p className="text-[13px] text-ink-soft">05/11/2026</p>
            </div>
            <span className="text-[13px] font-medium text-blue">Amanhã</span>
          </li>
          <li className={item}>
            <div>
              <p className="text-[15px] font-medium">Irrigar · Talhão 4</p>
              <p className="text-[13px] text-ink-soft">06/11/2026</p>
            </div>
            <span className="text-[13px] text-ink-soft">Em 2 dias</span>
          </li>
          <li className={item}>
            <div>
              <p className="text-[15px] font-medium">Revisar potássio · Talhão 4</p>
              <p className="text-[13px] text-ink-soft">08/11/2026</p>
            </div>
            <span className="text-[13px] text-ink-soft">Em 4 dias</span>
          </li>
          <li className={item}>
            <div>
              <p className="text-[15px] font-medium">Análise de laboratório · Talhão 3</p>
              <p className="text-[13px] text-ink-soft">15/11/2026</p>
            </div>
            <span className="text-[13px] text-ink-soft">Em 11 dias</span>
          </li>
        </ul>
      )}
    </section>
  );
}
