"use client";

// Referências de NPK e umidade de cada cultura. Os 6 plantios são fixos do sistema e não podem ser editados.
// P e K seguem a tabela geral de interpretação (Mehlich-1), que é a mesma para todas as culturas;
// o que muda entre elas é a dose de N e a faixa de umidade.
import { useState } from "react";
import { Droplets, Info, Lock, Table2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { iconeCultura } from "@/components/dashboard/culturas";
import { cn } from "@/lib/utils";

type DadosPlantio = {
  nome: string;
  /** Dose de N recomendada, em texto curto para o card. */
  nResumo: string;
  /** Detalhe da dose de N para o modal. */
  nDetalhe: React.ReactNode;
  /** Limite inferior da faixa ideal de umidade, em % da água disponível. */
  umidadeMin: number;
  /** O café tem tabelas próprias de P (mais baixa) e de K (mais alta, sem a classe "Muito baixo"). */
  tabelaCafe?: boolean;
};

const classes = ["Muito baixo", "Baixo", "Médio", "Bom", "Muito bom"] as const;
const corClasse = [
  "bg-red-100 text-red-700",
  "bg-amber-100 text-amber-800",
  "bg-blue-soft text-blue",
  "bg-leaf-soft text-forest",
  "bg-forest text-lime",
];

const celula = "px-3 py-2.5 text-center whitespace-nowrap";

function Cabecalho({ primeira }: { primeira: string }) {
  return (
    <thead>
      <tr className="bg-smoke text-[11px] uppercase">
        <th className="px-3 py-2.5 text-left font-semibold text-ink-soft">{primeira}</th>
        {classes.map((c, i) => (
          <th key={c} className="px-1.5 py-2">
            <span className={cn("inline-block rounded-full px-2 py-0.5 font-semibold whitespace-nowrap normal-case", corClasse[i])}>
              {c}
            </span>
          </th>
        ))}
      </tr>
    </thead>
  );
}

/** Tabela de P e K. É a geral para todas as culturas; o café tem as suas próprias. */
function TabelaPK({ tabelaCafe }: { tabelaCafe?: boolean }) {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-[14px] font-semibold">Fósforo (P) · mg/dm³</p>
        <p className="mt-0.5 text-[13px] text-ink-soft">Depende do teor de argila do solo. Ache a linha do seu talhão.</p>
        <div className="mt-2 overflow-x-auto rounded-2xl ring-1 ring-black/5">
          <table className="w-full text-[13px]">
            <Cabecalho primeira="Argila" />
            <tbody className="divide-y divide-black/5">
              {tabelaCafe ? (
                <>
                  <tr><td className="px-3 py-2.5 font-medium whitespace-nowrap">60–100%</td><td className={celula}>≤ 1,9</td><td className={celula}>2,0–4,0</td><td className={celula}>4,1–6,0</td><td className={celula}>6,1–9,0</td><td className={celula}>&gt; 9,0</td></tr>
                  <tr className="bg-blue-soft/40"><td className="px-3 py-2.5 font-medium whitespace-nowrap">35–60%</td><td className={celula}>≤ 3,0</td><td className={celula}>3,1–6,0</td><td className={celula}>6,1–9,0</td><td className={celula}>9,1–13,5</td><td className={celula}>&gt; 13,5</td></tr>
                  <tr><td className="px-3 py-2.5 font-medium whitespace-nowrap">15–35%</td><td className={celula}>≤ 5,0</td><td className={celula}>5,1–9,0</td><td className={celula}>9,1–15,0</td><td className={celula}>15,1–22,5</td><td className={celula}>&gt; 22,5</td></tr>
                  <tr><td className="px-3 py-2.5 font-medium whitespace-nowrap">0–15%</td><td className={celula}>≤ 7,5</td><td className={celula}>7,5–15,0</td><td className={celula}>15,1–22,5</td><td className={celula}>22,6–33,8</td><td className={celula}>&gt; 33,8</td></tr>
                </>
              ) : (
                <>
                  <tr><td className="px-3 py-2.5 font-medium whitespace-nowrap">60–100%</td><td className={celula}>≤ 2,7</td><td className={celula}>2,8–5,4</td><td className={celula}>5,5–8,0</td><td className={celula}>8,1–12,0</td><td className={celula}>&gt; 12,0</td></tr>
                  <tr className="bg-blue-soft/40"><td className="px-3 py-2.5 font-medium whitespace-nowrap">35–60%</td><td className={celula}>≤ 4,0</td><td className={celula}>4,1–8,0</td><td className={celula}>8,1–12,0</td><td className={celula}>12,1–18,0</td><td className={celula}>&gt; 18,0</td></tr>
                  <tr><td className="px-3 py-2.5 font-medium whitespace-nowrap">15–35%</td><td className={celula}>≤ 6,6</td><td className={celula}>6,7–12,0</td><td className={celula}>12,1–20,0</td><td className={celula}>20,1–30,0</td><td className={celula}>&gt; 30,0</td></tr>
                  <tr><td className="px-3 py-2.5 font-medium whitespace-nowrap">0–15%</td><td className={celula}>≤ 10,0</td><td className={celula}>10,1–20,0</td><td className={celula}>20,1–30,0</td><td className={celula}>30,1–45,0</td><td className={celula}>&gt; 45,0</td></tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <p className="text-[14px] font-semibold">Potássio (K) · mg/dm³</p>
        {tabelaCafe && (
          <p className="mt-0.5 text-[13px] text-ink-soft">No café, o K não tem a classe Muito baixo: abaixo de 60 já é Baixo.</p>
        )}
        <div className="mt-2 overflow-x-auto rounded-2xl ring-1 ring-black/5">
          <table className="w-full text-[13px]">
            <Cabecalho primeira="Solo" />
            <tbody>
              {tabelaCafe ? (
                <tr><td className="px-3 py-2.5 font-medium">Todos</td><td className={celula}>—</td><td className={celula}>&lt; 60</td><td className={celula}>60–120</td><td className={celula}>120–200</td><td className={celula}>&gt; 200</td></tr>
              ) : (
                <tr><td className="px-3 py-2.5 font-medium">Todos</td><td className={celula}>≤ 15</td><td className={celula}>16–40</td><td className={celula}>41–70</td><td className={celula}>71–120</td><td className={celula}>&gt; 120</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TabelaModal({
  plantio,
  open,
  onOpenChange,
}: {
  plantio: DadosPlantio | null;
  open: boolean;
  onOpenChange: (aberto: boolean) => void;
}) {
  const Icone = plantio ? iconeCultura[plantio.nome] : null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100svh-2rem)] gap-0 overflow-y-auto rounded-[24px] bg-white p-0 sm:max-w-[720px]">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="flex items-center gap-2 font-sans text-[24px] leading-tight font-semibold">
            {Icone && <Icone className="size-6 text-forest" />}
            {plantio?.nome}
          </DialogTitle>
          <DialogDescription className="text-[14px]">
            Como interpretar o resultado da análise de solo deste plantio.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 px-6 py-6">
          <div className="rounded-2xl bg-smoke p-4 text-[13px] leading-relaxed text-ink-soft">
            <p className="font-semibold text-ink">Como ler</p>
            <ul className="mt-1.5 list-disc space-y-1 pl-4">
              <li><b className="text-ink">Muito baixo e Baixo:</b> o solo precisa de adubação de correção.</li>
              <li><b className="text-ink">Médio:</b> o limite de cima desta classe é o nível crítico. Abaixo dele, a produção cai.</li>
              <li><b className="text-ink">Bom:</b> é o alvo. Basta repor o que a colheita retira.</li>
              <li><b className="text-ink">Muito bom:</b> não precisa adubar com este nutriente por enquanto.</li>
            </ul>
          </div>

          <TabelaPK tabelaCafe={plantio?.tabelaCafe} />

          <div>
            <p className="text-[14px] font-semibold">Nitrogênio (N)</p>
            <div className="mt-2 rounded-2xl p-4 text-[14px] ring-1 ring-black/5">
              <div className="leading-relaxed">{plantio?.nDetalhe}</div>
              <p className="mt-3 flex items-start gap-2 text-[13px] text-ink-soft">
                <Info className="mt-0.5 size-3.5 shrink-0" />
                A análise de solo não classifica o N. A dose é definida pela cultura, pela produtividade
                esperada e pela cultura anterior.
              </p>
            </div>
          </div>

          <div>
            <p className="text-[14px] font-semibold">Umidade</p>
            <div className="mt-2 rounded-2xl p-4 text-[14px] leading-relaxed ring-1 ring-black/5">
              Ideal entre <b>{plantio?.umidadeMin}% e 100%</b> da água disponível do solo. Abaixo de{" "}
              <b>{plantio?.umidadeMin}%</b>, a planta começa a sofrer com a falta de água: é hora de irrigar.
            </div>
          </div>

          <p className="text-[12px] text-ink-soft">
            Valores de referência para apoiar a decisão. A recomendação final de adubação é do engenheiro agrônomo.
          </p>
        </div>

        <DialogFooter className="mx-0 mb-0 rounded-none bg-smoke px-6 py-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="h-10 rounded-full px-5">
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const rotulo = "text-[11px] font-semibold tracking-[0.06em] text-ink-soft/70 uppercase";

function Plantio({ dados, onVerTabela }: { dados: DadosPlantio; onVerTabela: (d: DadosPlantio) => void }) {
  const Icone = iconeCultura[dados.nome];
  return (
    <article className="flex flex-col rounded-[24px] bg-white p-6 ring-1 ring-black/5 transition-[scale,box-shadow] duration-300 hover:scale-[1.01] hover:shadow-[0_20px_40px_-20px_rgba(16,24,40,0.25)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-full bg-leaf-soft">
            {Icone && <Icone className="size-5 text-forest" />}
          </span>
          <h2 className="text-[20px] font-semibold">{dados.nome}</h2>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-smoke px-2.5 py-1 text-[11px] font-medium text-ink-soft">
          <Lock className="size-3" /> Padrão do sistema
        </span>
      </div>

      <div className="mt-5 flex-1 space-y-4">
        <div>
          <p className={rotulo}>NPK ideal</p>
          <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-[14px]">
            <dt className="font-semibold text-blue">N</dt>
            <dd>{dados.nResumo}</dd>
            <dt className="font-semibold text-leaf">P</dt>
            <dd>{dados.tabelaCafe ? "9,1–13,5" : "12,1–18,0"} mg/dm³ <span className="text-ink-soft">(argila 35–60%)</span></dd>
            <dt className="font-semibold text-forest">K</dt>
            <dd>{dados.tabelaCafe ? "120–200" : "71–120"} mg/dm³</dd>
          </dl>
        </div>
        <div>
          <p className={rotulo}>Umidade ideal</p>
          <p className="mt-1.5 flex items-center gap-1.5 text-[14px]">
            <Droplets className="size-3.5 text-blue" />
            {dados.umidadeMin}–100% da água disponível
          </p>
        </div>
      </div>

      <Button variant="outline" onClick={() => onVerTabela(dados)} className="mt-6 h-10 w-full rounded-full px-5 sm:w-fit">
        <Table2 /> Ver tabela
      </Button>
    </article>
  );
}

const soja: DadosPlantio = {
  nome: "Soja",
  nResumo: "Sem N na safra de verão (inoculação)",
  nDetalhe: (
    <>Safra de verão: <b>sem adubação de N</b>, a inoculação com bactérias supre a planta. Cultivo de outono-inverno: <b>50 kg/ha</b>, 1/4 no plantio e o resto em cobertura antes do florescimento.</>
  ),
  umidadeMin: 50,
};
const milho: DadosPlantio = {
  nome: "Milho",
  nResumo: "10–30 kg/ha no plantio + 10–140 kg/ha em cobertura",
  nDetalhe: (
    <>Plantio: <b>10 a 30 kg/ha</b>. Cobertura: <b>10 a 140 kg/ha</b>, conforme a produtividade esperada e a cultura anterior (menos N depois de soja, pastagem ou adubo verde).</>
  ),
  umidadeMin: 45,
};
const cana: DadosPlantio = {
  nome: "Cana-de-açúcar",
  nResumo: "Planta: 30 + 30–60 kg/ha · Soca: 60–120 kg/ha",
  nDetalhe: (
    <>Cana-planta: <b>30 kg/ha</b> no plantio e <b>30 a 60 kg/ha</b> em cobertura. Cana-soca: <b>60 a 120 kg/ha</b>, conforme a produtividade esperada.</>
  ),
  umidadeMin: 35,
};
const cafe: DadosPlantio = {
  nome: "Café",
  nResumo: "80–450 kg/ha/ano, conforme a produção",
  nDetalhe: (
    <>Lavoura em produção: <b>80 a 450 kg/ha por ano</b>, conforme a produtividade esperada e o N nas folhas. Exemplo: para 30–40 sacas/ha, <b>300 kg/ha</b> sem análise foliar ou <b>220 kg/ha</b> com o N das folhas adequado.</>
  ),
  umidadeMin: 60,
  tabelaCafe: true,
};
const algodao: DadosPlantio = {
  nome: "Algodão",
  nResumo: "15–25 kg/ha no plantio + 70–150 kg/ha em cobertura",
  nDetalhe: (
    <>Plantio: <b>15 a 25 kg/ha</b>. Cobertura: <b>70 a 150 kg/ha</b>, conforme a produtividade esperada. Exemplo: para 4.000 kg/ha de algodão em caroço, cerca de <b>120 kg/ha</b> no total. Depois de soja, use até 20% menos.</>
  ),
  umidadeMin: 35,
};
const feijao: DadosPlantio = {
  nome: "Feijão",
  nResumo: "20–40 kg/ha no plantio + 20–60 kg/ha em cobertura",
  nDetalhe: (
    <>Plantio: <b>20 a 40 kg/ha</b>. Cobertura: <b>20 a 60 kg/ha</b>, aos 20–30 dias, conforme a produtividade esperada. Exemplo: para 1.200–2.500 kg/ha, de <b>50 a 70 kg/ha</b> no total.</>
  ),
  umidadeMin: 55,
};

export function PlantiosView() {
  const [aberto, setAberto] = useState(false);
  const [atual, setAtual] = useState<DadosPlantio | null>(null);

  function verTabela(d: DadosPlantio) {
    setAtual(d);
    setAberto(true);
  }

  return (
    <>
      <div className="mt-8 grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
        <Plantio dados={soja} onVerTabela={verTabela} />
        <Plantio dados={milho} onVerTabela={verTabela} />
        <Plantio dados={cana} onVerTabela={verTabela} />
        <Plantio dados={cafe} onVerTabela={verTabela} />
        <Plantio dados={algodao} onVerTabela={verTabela} />
        <Plantio dados={feijao} onVerTabela={verTabela} />
      </div>
      <TabelaModal plantio={atual} open={aberto} onOpenChange={setAberto} />
    </>
  );
}
