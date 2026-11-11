// Telas ilustrativas do app Agro+, no mesmo estilo dos cards de dashboard da referência.
import { ChevronDown, WifiOff, RefreshCw, MapPin, Droplets } from "lucide-react";
import { cn } from "@/lib/utils";

function Shell({
  title,
  filter = "Hoje",
  className,
  children,
}: {
  title: string;
  filter?: string | null;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-[20px] bg-white p-4 text-ink shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_12px_32px_-8px_rgba(16,24,40,0.18)] transition-colors duration-300 group-hover/card:bg-[#eef2f8]",
        className,
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="text-[13px] font-semibold">{title}</span>
        {filter && (
          <span className="inline-flex items-center gap-0.5 rounded-full bg-smoke px-2 py-0.5 text-[10px] text-ink-soft ring-1 ring-black/5">
            {filter}
            <ChevronDown className="size-3" />
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

const status = {
  ruim: { label: "Ruim", cls: "bg-red-100 text-red-700" },
  baixo: { label: "Baixo", cls: "bg-amber-100 text-amber-700" },
  ideal: { label: "Ideal", cls: "bg-blue-soft text-blue" },
  otimo: { label: "Ótimo", cls: "bg-leaf-soft text-forest" },
  excelente: { label: "Excelente", cls: "bg-forest text-lime" },
} as const;

export type Status = keyof typeof status;

export function StatusChip({ s, className }: { s: Status; className?: string }) {
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-[10px] font-semibold",
        status[s].cls,
        className,
      )}
    >
      {status[s].label}
    </span>
  );
}

export function NutrientesCard({ className }: { className?: string }) {
  const rows: { k: string; nome: string; pct: number; s: Status }[] = [
    { k: "N", nome: "Nitrogênio", pct: 72, s: "otimo" },
    { k: "P", nome: "Fósforo", pct: 38, s: "baixo" },
    { k: "K", nome: "Potássio", pct: 58, s: "ideal" },
  ];
  return (
    <Shell title="Nutrientes NPK" className={className}>
      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.k}>
            <div className="mb-1 flex items-center justify-between">
              <span className="flex items-center gap-2 text-[11px] text-ink-soft">
                <span className="grid size-5 place-items-center rounded-full bg-blue text-[10px] font-bold text-white">
                  {r.k}
                </span>
                {r.nome}
              </span>
              <StatusChip s={r.s} />
            </div>
            <div className="h-2 rounded-full bg-smoke">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-blue/40 to-blue"
                style={{ width: `${r.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}

export function UmidadeCard({
  pct = 64,
  className,
}: {
  pct?: number;
  className?: string;
}) {
  const total = 22;
  const ativos = Math.round((pct / 100) * total);
  const cx = 90;
  const cy = 86;
  return (
    <Shell title="Umidade do solo" className={className}>
      <div className="relative mx-auto w-full max-w-[200px]">
        <svg viewBox="0 0 180 120" className="w-full">
          {Array.from({ length: total }).map((_, i) => {
            const ang = ((200 - (i * 220) / (total - 1)) * Math.PI) / 180;
            const r1 = 58;
            const r2 = 76;
            return (
              <line
                key={i}
                x1={cx + r1 * Math.cos(ang)}
                y1={cy - r1 * Math.sin(ang)}
                x2={cx + r2 * Math.cos(ang)}
                y2={cy - r2 * Math.sin(ang)}
                strokeWidth={9}
                strokeLinecap="round"
                className={i < ativos ? "stroke-blue" : "stroke-[#dbe5f7]"}
              />
            );
          })}
        </svg>
        <div className="absolute inset-x-0 bottom-3 text-center">
          <div className="text-3xl font-medium tracking-tight">{pct}%</div>
          <div className="mt-0.5 flex items-center justify-center gap-1 text-[10px] text-ink-soft">
            <Droplets className="size-3 text-blue" /> Nível ideal de água
          </div>
        </div>
      </div>
    </Shell>
  );
}

export function ClassificacaoCard({
  nivel = 3,
  className,
}: {
  nivel?: 0 | 1 | 2 | 3 | 4;
  className?: string;
}) {
  const niveis: Status[] = ["ruim", "baixo", "ideal", "otimo", "excelente"];
  const cores = ["bg-red-400", "bg-amber-400", "bg-blue", "bg-leaf", "bg-forest"];
  return (
    <Shell title="Classificação do solo" filter="Talhão 1" className={className}>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[11px] text-ink-soft">Seu solo hoje</div>
          <div className="font-display text-3xl leading-tight">
            {status[niveis[nivel]].label}
          </div>
        </div>
        <span className="rounded-full bg-leaf-soft px-2 py-0.5 text-[10px] font-semibold text-forest">
          ↑ melhorou
        </span>
      </div>
      <div className="mt-3 grid grid-cols-5 gap-1">
        {cores.map((c, i) => (
          <div key={c} className="space-y-1">
            <div
              className={cn(
                "h-2 rounded-full",
                c,
                i === nivel ? "ring-2 ring-ink/80 ring-offset-1" : "opacity-40",
              )}
            />
            <div
              className={cn(
                "text-center text-[8.5px]",
                i === nivel ? "font-semibold text-ink" : "text-ink-soft",
              )}
            >
              {status[niveis[i]].label}
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}

export function HistoricoCard({ className }: { className?: string }) {
  const barras = [34, 46, 40, 58, 52, 70, 82];
  const meses = ["Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov"];
  return (
    <Shell title="Histórico de Nitrogênio" filter="7 meses" className={className}>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-medium tracking-tight text-blue">+48%</span>
        <span className="text-[10px] text-ink-soft">desde maio</span>
      </div>
      <div className="mt-3 flex h-24 items-end gap-2">
        {barras.map((h, i) => (
          <div key={i} className="flex h-full flex-1 flex-col items-center gap-1">
            <div className="flex w-full flex-1 items-end">
              <div
                className={cn(
                  "w-full rounded-full",
                  i === barras.length - 1
                    ? "bg-gradient-to-t from-blue to-blue/60"
                    : "bg-gradient-to-t from-blue/40 to-blue/10",
                )}
                style={{ height: `${h}%` }}
              />
            </div>
            <span className="text-[8.5px] text-ink-soft">{meses[i]}</span>
          </div>
        ))}
      </div>
    </Shell>
  );
}

export function OfflineCard({ className }: { className?: string }) {
  return (
    <Shell title="Central de coleta" filter={null} className={className}>
      <div className="flex items-center gap-3 rounded-2xl bg-smoke p-3">
        <span className="grid size-9 place-items-center rounded-full bg-white ring-1 ring-black/5">
          <WifiOff className="size-4 text-ink-soft" />
        </span>
        <div>
          <div className="text-[12px] font-semibold">Sem sinal</div>
          <div className="text-[10px] text-ink-soft">
            18 leituras salvas no aparelho
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 text-[10px] text-ink-soft">
        <RefreshCw className="size-3 text-leaf" />
        Sincroniza sozinho quando o sinal voltar
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-smoke">
        <div className="h-1.5 w-2/3 rounded-full bg-leaf" />
      </div>
    </Shell>
  );
}

export function FazendasCard({ className }: { className?: string }) {
  const fazendas: { nome: string; area: string; s: Status }[] = [
    { nome: "Fazenda Boa Vista", area: "Café", s: "otimo" },
    { nome: "Sítio Esperança", area: "Pasto", s: "baixo" },
    { nome: "Fazenda Santa Luzia", area: "Milho", s: "excelente" },
  ];
  return (
    <Shell title="Minhas fazendas" filter="3 de 10" className={className}>
      <ul className="space-y-2">
        {fazendas.map((f) => (
          <li
            key={f.nome}
            className="flex items-center justify-between gap-2 rounded-xl bg-smoke px-3 py-2"
          >
            <span className="flex items-center gap-2">
              <MapPin className="size-3.5 text-blue" />
              <span>
                <span className="block text-[11px] font-semibold">{f.nome}</span>
                <span className="block text-[9.5px] text-ink-soft">{f.area}</span>
              </span>
            </span>
            <StatusChip s={f.s} />
          </li>
        ))}
      </ul>
    </Shell>
  );
}
