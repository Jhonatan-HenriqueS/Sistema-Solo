"use client";

// Fazendas de demonstração. Os valores ficam escritos direto no JSX; não há banco nem cálculo.
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Clock, Droplets, MapPin, Maximize2, Pencil, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Selo, type Nivel } from "./leituras-tabela";
import { FazendaModal, type DadosFazenda } from "./fazenda-modal";

/** Card de uma fazenda. O lápis abre o modal de edição. */
function Fazenda(p: {
  nome: string;
  cidade: string;
  uf: string;
  area: string;
  talhoes: string;
  nivel: Nivel;
  umidade: string;
  ultimaLeitura: string;
  onEditar: (dados: DadosFazenda) => void;
}) {
  return (
    <article className="overflow-hidden rounded-[24px] bg-white ring-1 ring-black/5 transition-[scale,box-shadow] duration-300 hover:scale-[1.01] hover:shadow-[0_20px_40px_-20px_rgba(16,24,40,0.25)]">
      <div className="relative h-44">
        <Image
          src="/images/hero-campo.webp"
          alt={`Foto da ${p.nome}`}
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
            onClick={() => p.onEditar({ nome: p.nome, cidade: p.cidade, uf: p.uf, area: p.area })}
            className="size-9 rounded-full border-0 bg-white/90 shadow-sm backdrop-blur hover:bg-white"
          >
            <Pencil />
          </Button>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-[28px] leading-tight">{p.nome}</h2>
            <p className="mt-1 flex items-center gap-1.5 text-[13px] text-ink-soft">
              <MapPin className="size-3.5" /> {p.cidade}/{p.uf}
            </p>
          </div>
          <Selo nivel={p.nivel} />
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4">
          <div>
            <dt className="text-[11px] font-semibold tracking-[0.06em] text-ink-soft/70 uppercase">Área</dt>
            <dd className="mt-1 flex items-center gap-1.5 text-[15px] font-medium">
              <Maximize2 className="size-3.5 text-blue" /> {p.area} ha
            </dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold tracking-[0.06em] text-ink-soft/70 uppercase">Talhões</dt>
            <dd className="mt-1 text-[15px] font-medium">{p.talhoes}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold tracking-[0.06em] text-ink-soft/70 uppercase">Umidade</dt>
            <dd className="mt-1 flex items-center gap-1.5 text-[15px] font-medium">
              <Droplets className="size-3.5 text-blue" /> {p.umidade}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold tracking-[0.06em] text-ink-soft/70 uppercase">Última leitura</dt>
            <dd className="mt-1 flex items-center gap-1.5 text-[14px]">
              <Clock className="size-3.5 text-ink-soft" /> {p.ultimaLeitura}
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

const vazia: DadosFazenda = { nome: "", cidade: "", uf: "", area: "" };

/** Topo da página + grade de fazendas + modal. O modal abre e fecha por useState. */
export function FazendasView() {
  const [aberto, setAberto] = useState(false);
  const [modo, setModo] = useState<"editar" | "criar">("criar");
  const [dados, setDados] = useState<DadosFazenda>(vazia);
  // Muda a cada abertura para o modal começar com os campos do zero.
  const [chave, setChave] = useState(0);

  function abrir(novoModo: "editar" | "criar", novosDados: DadosFazenda) {
    setModo(novoModo);
    setDados(novosDados);
    setChave((c) => c + 1);
    setAberto(true);
  }

  function editar(d: DadosFazenda) {
    abrir("editar", d);
  }

  return (
    <>
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.1em] text-blue uppercase">Plano Plus</p>
          <h1 className="font-display mt-2 text-[44px] leading-none md:text-[52px]">Fazendas</h1>
          <p className="mt-2 flex flex-wrap items-center gap-2 text-[15px] text-ink-soft">
            Todas as suas propriedades em um só painel.
            <span className="rounded-full bg-blue-soft px-2.5 py-0.5 text-[12px] font-semibold text-blue">
              7 de 10 fazendas
            </span>
          </p>
        </div>
        <Button onClick={() => abrir("criar", vazia)} className="h-11 w-full rounded-full px-5 text-[14px] md:w-auto">
          <Plus /> Adicionar fazenda
        </Button>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
      <Fazenda nome="Fazenda Boa Vista" cidade="Ji-Paraná" uf="RO" area="120" talhoes="4" nivel="excelente" umidade="64%" onEditar={editar} ultimaLeitura="04/11 · 14:20" />
      <Fazenda nome="Fazenda Santa Luzia" cidade="Ouro Preto do Oeste" uf="RO" area="85" talhoes="3" nivel="ideal" umidade="61%" onEditar={editar} ultimaLeitura="04/11 · 11:40" />
      <Fazenda nome="Sítio Esperança" cidade="Presidente Médici" uf="RO" area="40" talhoes="2" nivel="abaixo" umidade="47%" onEditar={editar} ultimaLeitura="03/11 · 18:10" />
      <Fazenda nome="Fazenda Primavera" cidade="Cacoal" uf="RO" area="150" talhoes="5" nivel="ideal" umidade="59%" onEditar={editar} ultimaLeitura="04/11 · 09:15" />
      <Fazenda nome="Fazenda Rio Machado" cidade="Ji-Paraná" uf="RO" area="210" talhoes="6" nivel="excelente" umidade="66%" onEditar={editar} ultimaLeitura="04/11 · 13:05" />
      <Fazenda nome="Sítio Bela Vista" cidade="Jaru" uf="RO" area="32" talhoes="2" nivel="acima" umidade="76%" onEditar={editar} ultimaLeitura="03/11 · 16:30" />
      <Fazenda nome="Fazenda Três Irmãos" cidade="Rolim de Moura" uf="RO" area="95" talhoes="3" nivel="ideal" umidade="62%" onEditar={editar} ultimaLeitura="02/11 · 17:50" />
      </div>

      <FazendaModal key={chave} open={aberto} onOpenChange={setAberto} modo={modo} inicial={dados} />
    </>
  );
}
