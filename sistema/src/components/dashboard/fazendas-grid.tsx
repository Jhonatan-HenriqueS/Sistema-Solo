"use client";

// Fazendas de demonstração. Os valores ficam escritos direto no JSX; não há banco nem cálculo.
import Image from "next/image";
import { ArrowRight, Clock, Droplets, ImageIcon, MapPin, Maximize2, Pencil } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Selo, type Nivel } from "./leituras-tabela";

/** Card de uma fazenda. "Editar" e "Alterar imagem" são só visuais. */
function Fazenda(p: {
  nome: string;
  local: string;
  area: string;
  talhoes: string;
  nivel: Nivel;
  umidade: string;
  ultimaLeitura: string;
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
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label={`Editar ${p.nome}`}
              className="grid size-9 place-items-center rounded-full bg-white/90 text-ink shadow-sm backdrop-blur transition-colors hover:bg-white"
            >
              <Pencil className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44 rounded-xl p-1.5">
              <DropdownMenuItem className="rounded-lg px-2.5 py-2">
                <Pencil /> Editar fazenda
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg px-2.5 py-2">
                <ImageIcon /> Alterar imagem
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-[28px] leading-tight">{p.nome}</h2>
            <p className="mt-1 flex items-center gap-1.5 text-[13px] text-ink-soft">
              <MapPin className="size-3.5" /> {p.local}
            </p>
          </div>
          <Selo nivel={p.nivel} />
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4">
          <div>
            <dt className="text-[11px] font-semibold tracking-[0.06em] text-ink-soft/70 uppercase">Área</dt>
            <dd className="mt-1 flex items-center gap-1.5 text-[15px] font-medium">
              <Maximize2 className="size-3.5 text-blue" /> {p.area}
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

export function FazendasGrid() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Fazenda nome="Fazenda Boa Vista" local="Ji-Paraná/RO" area="120 ha" talhoes="4" nivel="excelente" umidade="64%" ultimaLeitura="04/11 · 14:20" />
      <Fazenda nome="Fazenda Santa Luzia" local="Ouro Preto do Oeste/RO" area="85 ha" talhoes="3" nivel="ideal" umidade="61%" ultimaLeitura="04/11 · 11:40" />
      <Fazenda nome="Sítio Esperança" local="Presidente Médici/RO" area="40 ha" talhoes="2" nivel="abaixo" umidade="47%" ultimaLeitura="03/11 · 18:10" />
      <Fazenda nome="Fazenda Primavera" local="Cacoal/RO" area="150 ha" talhoes="5" nivel="ideal" umidade="59%" ultimaLeitura="04/11 · 09:15" />
      <Fazenda nome="Fazenda Rio Machado" local="Ji-Paraná/RO" area="210 ha" talhoes="6" nivel="excelente" umidade="66%" ultimaLeitura="04/11 · 13:05" />
      <Fazenda nome="Sítio Bela Vista" local="Jaru/RO" area="32 ha" talhoes="2" nivel="acima" umidade="76%" ultimaLeitura="03/11 · 16:30" />
      <Fazenda nome="Fazenda Três Irmãos" local="Rolim de Moura/RO" area="95 ha" talhoes="3" nivel="ideal" umidade="62%" ultimaLeitura="02/11 · 17:50" />
    </div>
  );
}
