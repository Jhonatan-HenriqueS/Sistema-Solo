// Leituras de demonstração. Os valores ficam escritos direto no JSX; não há banco nem cálculo.
import { cn } from "@/lib/utils";

type Nivel = "abaixo" | "ideal" | "excelente" | "acima";

const niveis: Record<Nivel, { texto: string; cls: string }> = {
  abaixo: { texto: "Abaixo do ideal", cls: "bg-amber-100 text-amber-800" },
  ideal: { texto: "Dentro do ideal", cls: "bg-blue-soft text-blue" },
  excelente: { texto: "Excelente", cls: "bg-forest text-lime" },
  acima: { texto: "Acima do ideal", cls: "bg-red-100 text-red-700" },
};

function Selo({ nivel, prefixo }: { nivel: Nivel; prefixo?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap",
        niveis[nivel].cls,
      )}
    >
      {prefixo && <b>{prefixo}</b>}
      {niveis[nivel].texto}
    </span>
  );
}

function Rotulo({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-1 block text-[11px] font-semibold tracking-[0.06em] text-ink-soft/70 uppercase lg:hidden">
      {children}
    </span>
  );
}

const colunas =
  "lg:grid lg:grid-cols-[1.5fr_0.9fr_0.6fr_1.9fr_1.3fr_0.7fr_1.1fr] lg:items-center lg:gap-4";

/** Uma linha: tabela no desktop, card no celular. */
function Linha(p: {
  fazenda: string;
  talhao: string;
  data: string;
  hora: string;
  n: Nivel;
  pNivel: Nivel;
  k: Nivel;
  valores: string;
  umidade: string;
  nivel: Nivel;
}) {
  return (
    <li
      className={cn(
        colunas,
        "grid grid-cols-2 gap-x-4 gap-y-4 rounded-2xl bg-white p-4 ring-1 ring-black/5 lg:rounded-none lg:bg-transparent lg:px-5 lg:py-4 lg:ring-0 lg:hover:bg-smoke",
      )}
    >
      <div className="col-span-2 lg:col-span-1">
        <Rotulo>Local</Rotulo>
        <p className="text-[14px] font-semibold">{p.fazenda}</p>
        <p className="text-[13px] text-ink-soft">{p.talhao}</p>
      </div>
      <div>
        <Rotulo>Data</Rotulo>
        <p className="text-[14px]">{p.data}</p>
      </div>
      <div>
        <Rotulo>Hora</Rotulo>
        <p className="text-[14px]">{p.hora}</p>
      </div>
      <div className="col-span-2 lg:col-span-1">
        <Rotulo>Estado do NPK</Rotulo>
        <div className="flex flex-wrap gap-1">
          <Selo nivel={p.n} prefixo="N" />
          <Selo nivel={p.pNivel} prefixo="P" />
          <Selo nivel={p.k} prefixo="K" />
        </div>
      </div>
      <div>
        <Rotulo>NPK (mg/kg)</Rotulo>
        <p className="text-[13px] whitespace-nowrap text-ink-soft">{p.valores}</p>
      </div>
      <div>
        <Rotulo>Umidade</Rotulo>
        <p className="text-[14px] font-medium">{p.umidade}</p>
      </div>
      <div className="col-span-2 lg:col-span-1">
        <Rotulo>Nível do solo</Rotulo>
        <Selo nivel={p.nivel} />
      </div>
    </li>
  );
}

export function LeiturasTabela() {
  return (
    <section className="overflow-hidden rounded-[24px] lg:bg-white lg:ring-1 lg:ring-black/5">
      <div
        className={cn(
          colunas,
          "hidden border-b border-black/5 bg-smoke px-5 py-3 text-[12px] font-semibold tracking-[0.04em] text-ink-soft uppercase",
        )}
      >
        <span>Fazenda · Talhão</span>
        <span>Data</span>
        <span>Hora</span>
        <span>Estado do NPK</span>
        <span>NPK (mg/kg)</span>
        <span>Umidade</span>
        <span>Nível do solo</span>
      </div>

      <ul className="space-y-3 lg:space-y-0 lg:divide-y lg:divide-black/5">
        <Linha fazenda="Fazenda Boa Vista" talhao="Talhão 1" data="04/11/2026" hora="14:20" n="excelente" pNivel="ideal" k="ideal" valores="N 84 · P 46 · K 70" umidade="64%" nivel="excelente" />
        <Linha fazenda="Fazenda Boa Vista" talhao="Talhão 2" data="04/11/2026" hora="13:05" n="ideal" pNivel="ideal" k="excelente" valores="N 72 · P 41 · K 88" umidade="61%" nivel="ideal" />
        <Linha fazenda="Fazenda Santa Luzia" talhao="Talhão 3" data="04/11/2026" hora="11:40" n="excelente" pNivel="excelente" k="ideal" valores="N 90 · P 52 · K 68" umidade="66%" nivel="excelente" />
        <Linha fazenda="Fazenda Santa Luzia" talhao="Talhão 4" data="03/11/2026" hora="18:10" n="ideal" pNivel="abaixo" k="ideal" valores="N 70 · P 28 · K 65" umidade="58%" nivel="abaixo" />
        <Linha fazenda="Fazenda Boa Vista" talhao="Talhão 1" data="03/11/2026" hora="15:45" n="acima" pNivel="ideal" k="ideal" valores="N 132 · P 44 · K 71" umidade="63%" nivel="acima" />
        <Linha fazenda="Fazenda Boa Vista" talhao="Talhão 2" data="03/11/2026" hora="09:30" n="ideal" pNivel="ideal" k="ideal" valores="N 75 · P 43 · K 69" umidade="55%" nivel="ideal" />
        <Linha fazenda="Fazenda Santa Luzia" talhao="Talhão 3" data="02/11/2026" hora="17:20" n="abaixo" pNivel="abaixo" k="ideal" valores="N 48 · P 25 · K 62" umidade="49%" nivel="abaixo" />
        <Linha fazenda="Fazenda Santa Luzia" talhao="Talhão 4" data="02/11/2026" hora="10:05" n="ideal" pNivel="ideal" k="acima" valores="N 73 · P 45 · K 118" umidade="74%" nivel="acima" />
        <Linha fazenda="Fazenda Boa Vista" talhao="Talhão 1" data="01/11/2026" hora="16:40" n="excelente" pNivel="ideal" k="excelente" valores="N 86 · P 47 · K 90" umidade="67%" nivel="excelente" />
        <Linha fazenda="Fazenda Santa Luzia" talhao="Talhão 3" data="01/11/2026" hora="08:15" n="ideal" pNivel="ideal" k="ideal" valores="N 76 · P 42 · K 66" umidade="60%" nivel="ideal" />
      </ul>

      <div className="mt-4 flex items-center justify-between gap-4 text-[13px] text-ink-soft lg:mt-0 lg:border-t lg:border-black/5 lg:px-5 lg:py-4">
        <span>1–10 de 1.240 leituras</span>
        <div className="flex gap-2">
          <span className="cursor-not-allowed rounded-full bg-white px-4 py-2 opacity-50 ring-1 ring-black/10">
            Anterior
          </span>
          <span className="cursor-default rounded-full bg-ink px-4 py-2 text-white">Próximo</span>
        </div>
      </div>
    </section>
  );
}
