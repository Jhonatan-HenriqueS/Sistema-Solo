"use client";

// Talhões de demonstração da Fazenda Boa Vista. Os valores ficam escritos direto no JSX; não há banco.
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Clock, Droplets, MapPin, Maximize2, Pencil, Plus, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Selo, type Nivel } from "./leituras-tabela";
import { SeloUmidade } from "./umidade-niveis";
import { TalhaoModal, type DadosTalhao } from "./talhao-modal";

const rotulo = "text-[11px] font-semibold tracking-[0.06em] text-ink-soft/70 uppercase";

/** Card de um talhão. O lápis abre o modal de edição. */
function Talhao(p: {
  nome: string;
  cultura: string;
  area: string;
  qualidade: Nivel;
  umidade: number;
  ultimoRegistro: string;
  onEditar: (dados: DadosTalhao) => void;
}) {
  return (
    <article className="overflow-hidden rounded-[24px] bg-white ring-1 ring-black/5 transition-[scale,box-shadow] duration-300 hover:scale-[1.01] hover:shadow-[0_20px_40px_-20px_rgba(16,24,40,0.25)]">
      <div className="relative h-44">
        <Image
          src="/images/hero-campo.webp"
          alt={`Foto do ${p.nome}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="absolute top-3 right-3">
          <Button
            type="button"
            size="icon"
            variant="outline"
            aria-label={`Editar ${p.nome}`}
            onClick={() => p.onEditar({ nome: p.nome, cultura: p.cultura, area: p.area })}
            className="size-9 rounded-full border-0 bg-white/90 shadow-sm backdrop-blur hover:bg-white"
          >
            <Pencil />
          </Button>
        </div>
      </div>

      <div className="p-5">
        <h2 className="text-[20px] leading-tight font-semibold">{p.nome}</h2>
        <p className="mt-1 flex items-center gap-1.5 text-[13px] text-ink-soft">
          <Sprout className="size-3.5" /> {p.cultura}
        </p>

        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-5">
          <div>
            <dt className={rotulo}>Área</dt>
            <dd className="mt-1 flex items-center gap-1.5 text-[15px] font-medium">
              <Maximize2 className="size-3.5 text-blue" /> {p.area} ha
            </dd>
          </div>
          <div>
            <dt className={rotulo}>Último registro</dt>
            <dd className="mt-1 flex items-center gap-1.5 text-[14px]">
              <Clock className="size-3.5 text-ink-soft" /> {p.ultimoRegistro}
            </dd>
          </div>
          <div>
            <dt className={rotulo}>Qualidade do solo</dt>
            <dd className="mt-1.5">
              <Selo nivel={p.qualidade} />
            </dd>
          </div>
          <div>
            <dt className={rotulo}>Umidade da última coleta</dt>
            <dd className="mt-1 flex flex-wrap items-center gap-2 text-[15px] font-medium">
              <span className="flex items-center gap-1.5">
                <Droplets className="size-3.5 text-blue" /> {p.umidade}%
              </span>
              <SeloUmidade percentual={p.umidade} />
            </dd>
          </div>
        </dl>

        <a
          href="/dashboard/leituras"
          className="mt-5 inline-flex h-10 items-center gap-2 rounded-full bg-ink px-5 text-[14px] font-medium text-white transition-colors hover:bg-ink/85"
        >
          Ver leituras <ArrowRight className="size-4" />
        </a>
      </div>
    </article>
  );
}

const vazio: DadosTalhao = { nome: "", cultura: "", area: "" };

/** Topo da página + grade de talhões + modal. O modal abre e fecha por useState. */
export function TalhoesView() {
  const [aberto, setAberto] = useState(false);
  const [modo, setModo] = useState<"editar" | "criar">("criar");
  const [dados, setDados] = useState<DadosTalhao>(vazio);
  // Muda a cada abertura para o modal começar com os campos do zero.
  const [chave, setChave] = useState(0);

  function abrir(novoModo: "editar" | "criar", novosDados: DadosTalhao) {
    setModo(novoModo);
    setDados(novosDados);
    setChave((c) => c + 1);
    setAberto(true);
  }

  function editar(d: DadosTalhao) {
    abrir("editar", d);
  }

  return (
    <>
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.1em] text-blue uppercase">
            <MapPin className="size-3.5" /> Fazenda Boa Vista · Ji-Paraná/RO
          </p>
          <h1 className="font-display mt-2 text-[44px] leading-none md:text-[52px]">Talhões</h1>
          <p className="mt-2 flex flex-wrap items-center gap-2 text-[15px] text-ink-soft">
            Cada área da fazenda com o estado do solo na última coleta.
            <span className="rounded-full bg-blue-soft px-2.5 py-0.5 text-[12px] font-semibold text-blue">
              6 talhões · 120 ha
            </span>
          </p>
        </div>
        <Button onClick={() => abrir("criar", vazio)} className="h-11 w-full rounded-full px-5 text-[14px] md:w-auto">
          <Plus /> Adicionar talhão
        </Button>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <Talhao nome="Talhão 1" cultura="Café" area="25" qualidade="excelente" umidade={64} ultimoRegistro="04/11 · 14:20" onEditar={editar} />
        <Talhao nome="Talhão 2" cultura="Milho" area="30" qualidade="ideal" umidade={61} ultimoRegistro="04/11 · 13:05" onEditar={editar} />
        <Talhao nome="Talhão 3" cultura="Soja" area="20" qualidade="excelente" umidade={66} ultimoRegistro="04/11 · 11:40" onEditar={editar} />
        <Talhao nome="Talhão 4" cultura="Feijão" area="15" qualidade="abaixo" umidade={47} ultimoRegistro="03/11 · 18:10" onEditar={editar} />
        <Talhao nome="Talhão 5" cultura="Cana-de-açúcar" area="18" qualidade="acima" umidade={78} ultimoRegistro="03/11 · 15:45" onEditar={editar} />
        <Talhao nome="Talhão 6" cultura="Algodão" area="12" qualidade="ideal" umidade={32} ultimoRegistro="02/11 · 17:20" onEditar={editar} />
      </div>

      <TalhaoModal key={chave} open={aberto} onOpenChange={setAberto} modo={modo} inicial={dados} />
    </>
  );
}
