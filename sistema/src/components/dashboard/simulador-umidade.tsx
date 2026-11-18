"use client";

import { useEffect, useRef, useState } from "react";
import { Droplets, Loader2 } from "lucide-react";
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
import { cn } from "@/lib/utils";

import { classificar, niveis, ordem, type NivelUmidade } from "./umidade-niveis";

/** Converte o texto digitado em número de 0 a 100, aceitando vírgula. Vazio ou inválido vira null. */
function lerPercentual(texto: string): number | null {
  if (texto.trim() === "") return null;
  const n = Number(texto.replace(",", "."));
  return Number.isFinite(n) && n >= 0 && n <= 100 ? n : null;
}

/** Simulador de umidade: calcula o nível ao clicar em "Calcular". Nada é salvo. */
export function SimuladorUmidade() {
  const [aberto, setAberto] = useState(false);
  const [talhao, setTalhao] = useState("");
  const [valor, setValor] = useState("");
  const [nivel, setNivel] = useState<NivelUmidade | null>(null);
  const [calculando, setCalculando] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const percentual = lerPercentual(valor);

  function cancelarCalculo() {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    setCalculando(false);
  }

  // Cancela o cálculo pendente se a página for fechada no meio do carregamento.
  useEffect(() => cancelarCalculo, []);

  function mudarAberto(novo: boolean) {
    setAberto(novo);
    if (!novo) {
      cancelarCalculo();
      setTalhao("");
      setValor("");
      setNivel(null);
    }
  }

  function mudarValor(texto: string) {
    // Valor novo invalida o resultado anterior.
    cancelarCalculo();
    setNivel(null);
    setValor(texto.replace(/[^\d.,]/g, ""));
  }

  function mudarTalhao(novo: string) {
    // Outro talhão invalida o resultado anterior.
    cancelarCalculo();
    setNivel(null);
    setTalhao(novo);
  }

  function calcular(e: React.FormEvent) {
    e.preventDefault();
    if (talhao === "" || percentual === null || calculando) return;
    const p = percentual;
    setNivel(null);
    setCalculando(true);
    timer.current = setTimeout(() => {
      setNivel(classificar(p));
      setCalculando(false);
      timer.current = null;
    }, 1000);
  }

  return (
    <>
      <article className="flex flex-col rounded-[24px] bg-white p-6 ring-1 ring-black/5">
        <span className="grid size-11 place-items-center rounded-full bg-blue-soft">
          <Droplets className="size-5 text-blue" />
        </span>
        <h2 className="mt-5 text-[20px] font-semibold">Simulador de umidade</h2>
        <p className="mt-2 flex-1 text-[14px] leading-relaxed text-ink-soft">
          Informe o percentual que o medidor mostrou e veja na hora se o solo está seco, no
          ideal ou encharcado.
        </p>
        <Button onClick={() => setAberto(true)} className="mt-6 h-11 w-full rounded-full px-5 text-[14px] sm:w-fit">
          Abrir simulador
        </Button>
      </article>

      <Dialog open={aberto} onOpenChange={mudarAberto}>
        <DialogContent className="gap-0 overflow-hidden rounded-[24px] bg-white p-0 sm:max-w-[480px]">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle className="font-sans text-[24px] leading-tight font-semibold">
              Simulador de umidade
            </DialogTitle>
            <DialogDescription className="text-[14px]">
              Escolha o talhão e digite o valor que o medidor mostrou no solo.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={calcular} noValidate>
          <div className="space-y-5 px-6 py-6">
            <div className="space-y-2">
              <Label htmlFor="simulador-talhao">Talhão</Label>
              <Select value={talhao || null} onValueChange={(v) => mudarTalhao(v ?? "")}>
                <SelectTrigger id="simulador-talhao" className="h-11! w-full rounded-xl">
                  <SelectValue placeholder="Selecione o talhão" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Talhão 1 · Café">Talhão 1 · Café</SelectItem>
                  <SelectItem value="Talhão 2 · Milho">Talhão 2 · Milho</SelectItem>
                  <SelectItem value="Talhão 3 · Soja">Talhão 3 · Soja</SelectItem>
                  <SelectItem value="Talhão 4 · Feijão">Talhão 4 · Feijão</SelectItem>
                  <SelectItem value="Talhão 5 · Cana-de-açúcar">Talhão 5 · Cana-de-açúcar</SelectItem>
                  <SelectItem value="Talhão 6 · Algodão">Talhão 6 · Algodão</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="simulador-umidade">Umidade do medidor</Label>
              <div className="relative">
                <Input
                  id="simulador-umidade"
                  inputMode="decimal"
                  value={valor}
                  onChange={(e) => mudarValor(e.target.value)}
                  placeholder="Ex.: 64"
                  aria-invalid={valor !== "" && percentual === null}
                  className="h-11 rounded-xl pr-12"
                />
                <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[14px] text-ink-soft">
                  %
                </span>
              </div>
              {valor !== "" && percentual === null && (
                <p className="text-[12px] text-red-600">Informe um valor entre 0 e 100.</p>
              )}
            </div>

            <div aria-live="polite">
              {nivel ? (
                <div className={cn("rounded-2xl p-4 ring-1", niveis[nivel].cls)}>
                  <p className="text-[12px] font-semibold tracking-[0.06em] uppercase opacity-80">
                    Resultado · {talhao}
                  </p>
                  <p className="mt-1 text-[22px] leading-tight font-semibold">
                    {niveis[nivel].titulo}
                  </p>
                  <p className="mt-1 text-[14px] leading-relaxed">{niveis[nivel].mensagem}</p>
                </div>
              ) : calculando ? (
                <div className="flex items-center gap-2 rounded-2xl bg-smoke p-4 text-[14px] text-ink-soft">
                  <Loader2 className="size-4 animate-spin text-blue" />
                  Calculando…
                </div>
              ) : (
                <div className="rounded-2xl bg-smoke p-4 text-[14px] text-ink-soft">
                  Escolha o talhão, digite o valor e clique em Calcular.
                </div>
              )}

              <div className="mt-4 grid grid-cols-5 gap-1.5">
                {ordem.map((n) => (
                  <div key={n} className="space-y-1.5">
                    <div
                      className={cn(
                        "h-2 rounded-full",
                        niveis[n].cls,
                        nivel === n ? "ring-2 ring-ink/70 ring-offset-1" : "opacity-50",
                      )}
                    />
                    <p
                      className={cn(
                        "text-center text-[10px] leading-tight",
                        nivel === n ? "font-semibold text-ink" : "text-ink-soft",
                      )}
                    >
                      {niveis[n].titulo}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="mx-0 mb-0 rounded-none bg-smoke px-6 py-4">
            <Button type="button" variant="outline" onClick={() => mudarAberto(false)} className="h-10 rounded-full px-5">
              Fechar
            </Button>
            <Button type="submit" disabled={talhao === "" || percentual === null || calculando} className="h-10 rounded-full px-5">
              {calculando && <Loader2 className="animate-spin" />}
              {calculando ? "Calculando…" : "Calcular"}
            </Button>
          </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
