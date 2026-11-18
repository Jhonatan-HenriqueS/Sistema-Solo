"use client";

// Os 3 planos da landing page, com os mesmos preços e itens. Escolher um plano é só visual.
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

function Plano({
  nome,
  preco,
  resumo,
  atual,
  onEscolher,
  children,
}: {
  nome: string;
  preco: string;
  resumo: string;
  atual?: boolean;
  onEscolher: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-[20px] bg-white p-5 ring-1",
        atual ? "ring-2 ring-blue" : "ring-black/10",
      )}
    >
      {atual && (
        <span className="absolute -top-2.5 left-5 rounded-full bg-blue px-2.5 py-0.5 text-[11px] font-semibold text-white">
          Plano atual
        </span>
      )}
      <p className="text-[16px] font-semibold">{nome}</p>
      <p className="mt-2 flex items-baseline gap-1">
        <span className="text-[28px] leading-none font-medium tracking-tight">R$ {preco}</span>
        <span className="text-[13px] text-ink-soft">/mês</span>
      </p>
      <p className="mt-1 text-[13px] text-ink-soft">{resumo}</p>
      <ul className="mt-4 flex-1 space-y-2 text-[13px]">{children}</ul>
      <Button
        type="button"
        disabled={atual}
        onClick={onEscolher}
        variant={atual ? "outline" : "default"}
        className="mt-5 h-10 w-full rounded-full"
      >
        {atual ? "Plano atual" : "Escolher este plano"}
      </Button>
    </div>
  );
}

function Item({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <Check className="mt-0.5 size-3.5 shrink-0 text-leaf" strokeWidth={3} />
      {children}
    </li>
  );
}

export function PlanosModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (aberto: boolean) => void;
}) {
  const fechar = () => onOpenChange(false);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100svh-2rem)] gap-0 overflow-y-auto rounded-[24px] bg-white p-0 sm:max-w-[880px]">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="font-sans text-[24px] leading-tight font-semibold">Alterar plano</DialogTitle>
          <DialogDescription className="text-[14px]">
            Planos mensais. A mudança vale a partir do próximo ciclo de cobrança.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 px-6 pt-6 pb-6 md:grid-cols-3">
          <Plano nome="Básico" preco="49,90" resumo="Para começar a medir o solo." onEscolher={fechar}>
            <Item>Coleta completa de N, P, K e umidade</Item>
            <Item>Histórico de todas as leituras</Item>
            <Item>Funciona sem internet</Item>
            <Item>Tutorial passo a passo</Item>
          </Plano>
          <Plano nome="Pro" preco="99,90" resumo="Para decidir com clareza." atual onEscolher={fechar}>
            <Item>Tudo do Básico</Item>
            <Item>Todos os dashboards e gráficos</Item>
            <Item>Classificação do solo: ruim a excelente</Item>
            <Item>Comparação com o valor ideal</Item>
          </Plano>
          <Plano nome="Plus" preco="149,90" resumo="Para quem cuida de várias áreas." onEscolher={fechar}>
            <Item>Tudo do Pro</Item>
            <Item>Até 10 fazendas ou áreas</Item>
            <Item>Todas as áreas no mesmo painel</Item>
            <Item>Use 1 kit ou vários, como preferir</Item>
          </Plano>
        </div>
      </DialogContent>
    </Dialog>
  );
}
