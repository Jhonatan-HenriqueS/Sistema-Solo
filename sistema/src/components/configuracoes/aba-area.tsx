"use client";

// Aba Unidade de área: escolhe como as áreas são exibidas. Só visual: "Salvar" não grava nada.
import { useState } from "react";
import { Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SecaoCard } from "./secao-card";

// Quantos hectares cada unidade vale (1 ha = 10.000 m²).
const unidades: Record<string, { nome: string; hectares: number; m2: string }> = {
  hectare: { nome: "Hectare", hectares: 1, m2: "10.000 m²" },
  paulista: { nome: "Alqueire paulista", hectares: 2.42, m2: "24.200 m²" },
  norte: { nome: "Alqueire do norte", hectares: 2.7225, m2: "27.225 m²" },
  mineiro: { nome: "Alqueire mineiro", hectares: 4.84, m2: "48.400 m²" },
  goiano: { nome: "Alqueire goiano", hectares: 4.84, m2: "48.400 m²" },
};

// Área total da Fazenda Boa Vista, usada no exemplo de conversão.
const AREA_FAZENDA_HA = 120;

const numero = (n: number, casas = 2) =>
  n.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: casas });

function Opcao({ chave }: { chave: string }) {
  const u = unidades[chave];
  return (
    <span className="flex w-full items-center justify-between gap-4">
      <span>{u.nome}</span>
      <span className="text-ink-soft">{numero(u.hectares, 4)} ha</span>
    </span>
  );
}

export function AbaArea() {
  const [unidade, setUnidade] = useState("hectare");
  const u = unidades[unidade];

  return (
    <div className="space-y-6">
      <SecaoCard
        titulo="Unidade de área"
        descricao="Escolha como as áreas dos talhões e da fazenda aparecem no sistema."
        dica="A conversão usa o valor do alqueire em hectares."
        acao={
          <Button variant="outline" className="h-9 rounded-full px-4">
            Salvar
          </Button>
        }
      >
        <div className="max-w-[420px] space-y-2">
          <Label htmlFor="unidade-area">Unidade</Label>
          <Select value={unidade} onValueChange={(v) => v && setUnidade(v)}>
            <SelectTrigger id="unidade-area" className="h-11! w-full rounded-xl">
              <SelectValue>{(v: string) => <Opcao chave={v} />}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hectare"><Opcao chave="hectare" /></SelectItem>
              <SelectItem value="paulista"><Opcao chave="paulista" /></SelectItem>
              <SelectItem value="norte"><Opcao chave="norte" /></SelectItem>
              <SelectItem value="mineiro"><Opcao chave="mineiro" /></SelectItem>
              <SelectItem value="goiano"><Opcao chave="goiano" /></SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-smoke p-4">
            <p className="flex items-center gap-1.5 text-[12px] text-ink-soft">
              <Ruler className="size-3.5" /> Equivale a
            </p>
            <p className="mt-1 text-[20px] font-semibold">
              1 {u.nome.toLowerCase()} = {numero(u.hectares, 4)} ha
            </p>
            <p className="mt-0.5 text-[13px] text-ink-soft">{u.m2}</p>
          </div>
          <div className="rounded-2xl bg-blue-soft p-4 text-blue">
            <p className="text-[12px]">Fazenda Boa Vista ({AREA_FAZENDA_HA} ha)</p>
            <p className="mt-1 text-[20px] font-semibold">
              {numero(AREA_FAZENDA_HA / u.hectares)} {unidade === "hectare" ? "ha" : "alqueires"}
            </p>
            <p className="mt-0.5 text-[13px]">Exemplo de como a área vai aparecer</p>
          </div>
        </div>
      </SecaoCard>
    </div>
  );
}
