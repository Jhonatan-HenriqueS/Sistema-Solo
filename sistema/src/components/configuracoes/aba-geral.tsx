"use client";

// Aba Geral: resumo da conta, plano e zona de perigo. Dados fictícios.
import { useState } from "react";
import { CalendarCheck, CalendarX, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SecaoCard } from "./secao-card";
import { PlanosModal } from "./planos-modal";
import { ZonaPerigo } from "./zona-perigo";

export function Avatar({ src, tamanho = "size-16" }: { src?: string | null; tamanho?: string }) {
  return src ? (
    // eslint-disable-next-line @next/next/no-img-element -- prévia local (blob:) da foto escolhida
    <img src={src} alt="Foto de perfil" className={`${tamanho} shrink-0 rounded-full object-cover`} />
  ) : (
    <span className={`${tamanho} grid shrink-0 place-items-center rounded-full bg-forest text-[20px] font-semibold text-lime`}>
      JS
    </span>
  );
}

export function AbaGeral({ onIrParaPerfil }: { onIrParaPerfil: () => void }) {
  const [planosAberto, setPlanosAberto] = useState(false);

  return (
    <div className="space-y-6">
      <SecaoCard
        titulo="Conta"
        descricao="As informações principais da sua conta."
        dica="Para alterar esses dados, use a aba Perfil."
        acao={
          <Button variant="outline" onClick={onIrParaPerfil} className="h-9 rounded-full px-4">
            Editar perfil
          </Button>
        }
      >
        <div className="flex items-center gap-4">
          <Avatar />
          <div className="min-w-0">
            <p className="text-[16px] font-semibold">João Silva</p>
            <p className="mt-0.5 flex items-center gap-1.5 truncate text-[14px] text-ink-soft">
              <Mail className="size-3.5 shrink-0" /> joao@fazendaboavista.com.br
            </p>
          </div>
        </div>
      </SecaoCard>

      <SecaoCard
        titulo="Plano"
        descricao="Assinatura mensal, renovada a cada 30 dias."
        dica="A próxima cobrança é feita no dia do encerramento."
        acao={
          <Button onClick={() => setPlanosAberto(true)} className="h-9 rounded-full px-4">
            Alterar plano
          </Button>
        }
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="flex items-center gap-2">
              <span className="text-[22px] font-semibold">Pro</span>
              <span className="rounded-full bg-leaf-soft px-2.5 py-0.5 text-[12px] font-semibold text-forest">Ativo</span>
            </p>
            <p className="mt-1 flex items-baseline gap-1">
              <span className="text-[32px] leading-none font-medium tracking-tight">R$ 99,90</span>
              <span className="text-[14px] text-ink-soft">/mês</span>
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-6 text-[14px]">
            <div>
              <dt className="flex items-center gap-1.5 text-[12px] text-ink-soft">
                <CalendarCheck className="size-3.5" /> Assinado em
              </dt>
              <dd className="mt-1 font-medium">04/11/2026</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-[12px] text-ink-soft">
                <CalendarX className="size-3.5" /> Encerra em
              </dt>
              <dd className="mt-1 font-medium">04/12/2026</dd>
            </div>
          </dl>
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-[13px]">
            <span className="font-medium">16 dias restantes</span>
            <span className="text-ink-soft">14 de 30 dias usados</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-smoke">
            <div className="h-2 w-[47%] rounded-full bg-blue" />
          </div>
        </div>
      </SecaoCard>

      <ZonaPerigo />

      <PlanosModal open={planosAberto} onOpenChange={setPlanosAberto} />
    </div>
  );
}
