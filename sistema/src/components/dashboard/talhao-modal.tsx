"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { iconeCultura } from "./culturas";
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

function Cultura({ nome }: { nome: string }) {
  const Icone = iconeCultura[nome];
  return (
    <span className="flex items-center gap-2">
      {Icone && <Icone className="size-4 text-forest" />}
      {nome}
    </span>
  );
}

export type DadosTalhao = {
  nome: string;
  cultura: string;
  area: string;
};

/**
 * Modal de editar/criar talhão. Só visual: ao confirmar ele fecha e nada é salvo.
 * Abertura e fechamento são controlados pelo pai via `open` / `onOpenChange`.
 */
export function TalhaoModal({
  open,
  onOpenChange,
  modo,
  inicial,
}: {
  open: boolean;
  onOpenChange: (aberto: boolean) => void;
  modo: "editar" | "criar";
  inicial: DadosTalhao;
}) {
  const [nome, setNome] = useState(inicial.nome);
  const [cultura, setCultura] = useState(inicial.cultura);
  const [area, setArea] = useState(inicial.area);
  const [previa, setPrevia] = useState<string | null>(null);
  const arquivoRef = useRef<HTMLInputElement>(null);

  // Libera a URL temporária da prévia ao trocar de imagem ou fechar.
  useEffect(() => {
    return () => {
      if (previa) URL.revokeObjectURL(previa);
    };
  }, [previa]);

  const valido = nome.trim() !== "" && cultura !== "" && Number(area) > 0;

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
            <DialogTitle className="font-sans text-[24px] leading-tight font-semibold">
              {modo === "editar" ? "Editar talhão" : "Novo talhão"}
            </DialogTitle>
            <DialogDescription className="text-[14px]">
              {modo === "editar"
                ? `Altere os dados do ${inicial.nome}.`
                : "Cadastre um novo talhão da Fazenda Boa Vista."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 px-6 py-6">
            <div>
              <div className="relative h-36 overflow-hidden rounded-2xl bg-smoke">
                <Image
                  src={previa ?? "/images/hero-campo.webp"}
                  alt="Imagem do talhão"
                  fill
                  unoptimized={previa !== null}
                  sizes="480px"
                  className="object-cover"
                />
                <div className="absolute inset-0 grid place-items-center bg-black/20">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => arquivoRef.current?.click()}
                    className="h-10 rounded-full border-0 bg-white/90 px-4 shadow-sm backdrop-blur hover:bg-white"
                  >
                    <ImageIcon /> Editar imagem
                  </Button>
                </div>
              </div>
              <input
                ref={arquivoRef}
                type="file"
                accept="image/*"
                onChange={escolherImagem}
                className="hidden"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="talhao-nome">Nome</Label>
              <Input
                id="talhao-nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex.: Talhão 7"
                className="h-11 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="talhao-cultura">Cultura</Label>
              <Select value={cultura || null} onValueChange={(v) => setCultura(v ?? "")}>
                <SelectTrigger id="talhao-cultura" className="h-11! w-full rounded-xl">
                  <SelectValue>
                    {(v: string | null) =>
                      v ? <Cultura nome={v} /> : <span className="text-muted-foreground">Selecione a cultura</span>
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Soja"><Cultura nome="Soja" /></SelectItem>
                  <SelectItem value="Milho"><Cultura nome="Milho" /></SelectItem>
                  <SelectItem value="Cana-de-açúcar"><Cultura nome="Cana-de-açúcar" /></SelectItem>
                  <SelectItem value="Café"><Cultura nome="Café" /></SelectItem>
                  <SelectItem value="Algodão"><Cultura nome="Algodão" /></SelectItem>
                  <SelectItem value="Feijão"><Cultura nome="Feijão" /></SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="talhao-area">Área</Label>
              <div className="relative">
                <Input
                  id="talhao-area"
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
              {modo === "editar" ? "Salvar alterações" : "Criar talhão"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
