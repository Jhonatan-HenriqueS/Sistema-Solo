"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type DadosFazenda = {
  nome: string;
  cidade: string;
  uf: string;
  area: string;
};

type Estado = { sigla: string; nome: string };

const IBGE_ESTADOS = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

// Guarda a resposta do IBGE para não buscar de novo a cada abertura do modal.
let estadosCache: Estado[] | null = null;

function useEstados() {
  const [estados, setEstados] = useState<Estado[] | null>(estadosCache);
  const [falhou, setFalhou] = useState(false);

  useEffect(() => {
    if (estadosCache) return;
    let ativo = true;
    fetch(IBGE_ESTADOS)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((lista: Estado[]) => {
        estadosCache = [...lista].sort((a, b) => a.sigla.localeCompare(b.sigla));
        if (ativo) setEstados(estadosCache);
      })
      .catch(() => {
        if (ativo) setFalhou(true);
      });
    return () => {
      ativo = false;
    };
  }, []);

  return { estados, falhou };
}

/**
 * Modal de editar/criar fazenda. Só visual: ao confirmar ele fecha e nada é salvo.
 * Abertura e fechamento são controlados pelo pai via `open` / `onOpenChange`.
 */
export function FazendaModal({
  open,
  onOpenChange,
  modo,
  inicial,
}: {
  open: boolean;
  onOpenChange: (aberto: boolean) => void;
  modo: "editar" | "criar";
  inicial: DadosFazenda;
}) {
  const [nome, setNome] = useState(inicial.nome);
  const [cidade, setCidade] = useState(inicial.cidade);
  const [uf, setUf] = useState(inicial.uf);
  const [area, setArea] = useState(inicial.area);
  const [previa, setPrevia] = useState<string | null>(null);
  const arquivoRef = useRef<HTMLInputElement>(null);
  const { estados, falhou } = useEstados();

  // Libera a URL temporária da prévia ao trocar de imagem ou fechar.
  useEffect(() => {
    return () => {
      if (previa) URL.revokeObjectURL(previa);
    };
  }, [previa]);

  const valido =
    nome.trim() !== "" && cidade.trim() !== "" && uf.length === 2 && Number(area) > 0;

  function escolherImagem(e: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = e.target.files?.[0];
    if (arquivo) setPrevia(URL.createObjectURL(arquivo));
  }

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (valido) onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 overflow-hidden rounded-[24px] bg-white p-0 sm:max-w-[480px]">
        <form onSubmit={enviar} noValidate>
          <DialogHeader className="px-6 pt-6">
            <DialogTitle className="text-[24px] leading-tight font-semibold">
              {modo === "editar" ? "Editar fazenda" : "Nova fazenda"}
            </DialogTitle>
            <DialogDescription className="text-[14px]">
              {modo === "editar"
                ? `Altere os dados da ${inicial.nome}.`
                : "Cadastre uma nova propriedade no seu painel."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 px-6 py-6">
            <div>
              <div className="relative h-36 overflow-hidden rounded-2xl bg-smoke">
                <Image
                  src={previa ?? "/images/hero-campo.webp"}
                  alt="Imagem da fazenda"
                  fill
                  unoptimized={previa !== null}
                  sizes="480px"
                  className="object-cover"
                />
              </div>
              <input
                ref={arquivoRef}
                type="file"
                accept="image/*"
                onChange={escolherImagem}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => arquivoRef.current?.click()}
                className="mt-3 h-10 rounded-full px-4"
              >
                <ImageIcon /> Editar imagem
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fazenda-nome">Nome</Label>
              <Input
                id="fazenda-nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex.: Fazenda Boa Vista"
                className="h-11 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-[1fr_96px] gap-3">
              <div className="space-y-2">
                <Label htmlFor="fazenda-cidade">Cidade</Label>
                <Input
                  id="fazenda-cidade"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  placeholder="Ex.: Ji-Paraná"
                  className="h-11 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fazenda-uf">UF</Label>
                {falhou ? (
                  <Input
                    id="fazenda-uf"
                    value={uf}
                    maxLength={2}
                    onChange={(e) => setUf(e.target.value.replace(/[^a-z]/gi, "").toUpperCase())}
                    placeholder="RO"
                    className="h-11 rounded-xl uppercase"
                  />
                ) : (
                  <Select value={uf || null} onValueChange={(v) => setUf(v ?? "")} disabled={!estados}>
                    <SelectTrigger id="fazenda-uf" className="h-11! w-full rounded-xl">
                      <SelectValue placeholder={estados ? "UF" : "Carregando…"} />
                    </SelectTrigger>
                    <SelectContent>
                      {estados?.map((e) => (
                        <SelectItem key={e.sigla} value={e.sigla} title={e.nome}>
                          {e.sigla}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fazenda-area">Área</Label>
              <div className="relative">
                <Input
                  id="fazenda-area"
                  inputMode="numeric"
                  value={area}
                  onChange={(e) => setArea(e.target.value.replace(/\D/g, ""))}
                  placeholder="0"
                  className="h-11 rounded-xl pr-12"
                />
                <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[14px] text-ink-soft">
                  ha
                </span>
              </div>
            </div>
          </div>

          <DialogFooter className="mx-0 mb-0 rounded-none bg-smoke px-6 py-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-10 rounded-full px-5"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={!valido} className="h-10 rounded-full px-5">
              {modo === "editar" ? "Salvar alterações" : "Criar fazenda"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
