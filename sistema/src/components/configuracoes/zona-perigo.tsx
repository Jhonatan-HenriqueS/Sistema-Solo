"use client";

// Zona de perigo (LGPD, art. 18). Só visual: confirmar fecha o modal e nada é apagado.
import { useState } from "react";
import { TriangleAlert } from "lucide-react";
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

const botaoPerigo =
  "h-10 rounded-full border-red-200 bg-white px-4 text-red-600 hover:border-red-600 hover:bg-red-600 hover:text-white";

function Campo({
  id,
  rotulo,
  valor,
  onChange,
}: {
  id: string;
  rotulo: React.ReactNode;
  valor: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="leading-snug font-normal">
        {rotulo}
      </Label>
      <Input
        id={id}
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        className="h-11 rounded-xl"
      />
    </div>
  );
}

/** Modal de confirmação. `pedirPlano` adiciona o segundo campo, usado na exclusão da conta. */
function ModalPerigo({
  open,
  onOpenChange,
  aviso,
  descricao,
  botao,
  pedirPlano,
}: {
  open: boolean;
  onOpenChange: (aberto: boolean) => void;
  aviso: string;
  descricao: React.ReactNode;
  botao: string;
  pedirPlano?: boolean;
}) {
  const [confirmacao, setConfirmacao] = useState("");
  const [plano, setPlano] = useState("");
  const liberado = confirmacao === "confirmar" && (!pedirPlano || plano === "Pro");

  function mudarAberto(novo: boolean) {
    onOpenChange(novo);
    if (!novo) {
      setConfirmacao("");
      setPlano("");
    }
  }

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (liberado) mudarAberto(false);
  }

  return (
    <Dialog open={open} onOpenChange={mudarAberto}>
      <DialogContent className="gap-0 overflow-hidden rounded-[24px] bg-white p-0 sm:max-w-[480px]">
        <form onSubmit={enviar} noValidate>
          <DialogHeader className="px-6 pt-6">
            <DialogTitle className="font-sans text-[24px] leading-tight font-semibold">Zona de perigo</DialogTitle>
            <DialogDescription className="sr-only">{aviso}</DialogDescription>
          </DialogHeader>

          <div className="space-y-5 px-6 py-6">
            <div className="flex items-start gap-3 rounded-2xl bg-red-50 p-4 text-[14px] font-medium text-red-700 ring-1 ring-red-200">
              <TriangleAlert className="mt-0.5 size-4 shrink-0" />
              {aviso}
            </div>
            <div className="space-y-2 text-[14px] leading-relaxed text-ink-soft">{descricao}</div>
            <Campo
              id="perigo-confirmar"
              rotulo={
                <span>
                  Digite <b className="font-semibold text-ink">confirmar</b> para continuar:
                </span>
              }
              valor={confirmacao}
              onChange={setConfirmacao}
            />
            {pedirPlano && (
              <Campo
                id="perigo-plano"
                rotulo={
                  <span>
                    Digite o nome do seu plano: <b className="font-semibold text-ink">Pro</b>
                  </span>
                }
                valor={plano}
                onChange={setPlano}
              />
            )}
          </div>

          <DialogFooter className="mx-0 mb-0 rounded-none bg-smoke px-6 py-4">
            <Button type="button" variant="outline" onClick={() => mudarAberto(false)} className="h-10 rounded-full px-5">
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!liberado}
              className="h-10 rounded-full bg-red-600 px-5 text-white hover:bg-red-700 disabled:bg-red-600/40"
            >
              {botao}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function ZonaPerigo() {
  const [apagarAberto, setApagarAberto] = useState(false);
  const [excluirAberto, setExcluirAberto] = useState(false);

  return (
    <section>
      <h2 className="text-[20px] font-semibold text-red-600">Zona de perigo</h2>
      <div className="mt-3 divide-y divide-red-200 overflow-hidden rounded-[24px] bg-white ring-1 ring-red-300">
        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[15px] font-semibold">Apagar dados</p>
            <p className="mt-1 max-w-[560px] text-[14px] leading-relaxed text-ink-soft">
              Remove leituras, talhões e todo o histórico, conforme a LGPD. Sua conta e seu plano
              continuam ativos.
            </p>
          </div>
          <Button variant="outline" onClick={() => setApagarAberto(true)} className={botaoPerigo}>
            Apagar dados
          </Button>
        </div>
        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[15px] font-semibold">Excluir conta</p>
            <p className="mt-1 max-w-[560px] text-[14px] leading-relaxed text-ink-soft">
              Apaga a conta e todos os dados e encerra o plano. Não há reembolso do período já
              pago, mesmo no meio do mês.
            </p>
          </div>
          <Button variant="outline" onClick={() => setExcluirAberto(true)} className={botaoPerigo}>
            Excluir conta
          </Button>
        </div>
      </div>

      <ModalPerigo
        open={apagarAberto}
        onOpenChange={setApagarAberto}
        aviso="Esta ação não pode ser desfeita."
        descricao={
          <p>
            Vamos apagar <b className="text-ink">todas as leituras, talhões e o histórico</b> da sua
            conta. Sua conta e o plano Pro continuam ativos.
          </p>
        }
        botao="Apagar meus dados"
      />
      <ModalPerigo
        open={excluirAberto}
        onOpenChange={setExcluirAberto}
        aviso="Isto é extremamente importante."
        descricao={
          <>
            <p>
              Vamos <b className="text-ink">excluir sua conta e todos os dados</b> imediatamente, e o
              plano Pro será encerrado.
            </p>
            <p>Não há reembolso do período já pago, mesmo que o plano esteja no meio do mês.</p>
          </>
        }
        botao="Excluir minha conta"
        pedirPlano
      />
    </section>
  );
}
