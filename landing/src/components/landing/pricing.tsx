import Image from "next/image";
import { Check, Plus } from "lucide-react";
import { CTA, KIT, KITS_LANCAMENTO, KITS_RESTANTES, PLANOS } from "@/lib/site";
import { cn } from "@/lib/utils";
import { CtaLink, Heading, Reveal, StarBadge } from "./primitives";

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-[14px] leading-snug">
      <span className="mt-px grid size-5 shrink-0 place-items-center rounded-full bg-ink text-white">
        <Check className="size-3" strokeWidth={3} />
      </span>
      {children}
    </li>
  );
}

export function Pricing() {
  const vendidos = KITS_LANCAMENTO - KITS_RESTANTES;
  return (
    <section id="planos" className="scroll-mt-20 p-3">
      <div className="relative isolate overflow-hidden rounded-[28px] bg-gradient-to-b from-[#0047d6] via-[#2f7ae8] to-[#8ec0f0] px-4 pt-24 pb-48 md:pb-64">
        <Image
          src="/images/hero-campo.webp"
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover object-bottom [mask-image:linear-gradient(to_bottom,transparent_60%,black_85%)]"
        />
        <div className="mx-auto max-w-[1180px]">
          <div className="text-center text-white">
            <Reveal className="flex justify-center">
              <StarBadge />
            </Reveal>
            <Heading
              text="Kit + plano, *sem surpresa*"
              className="mt-6 text-[42px] leading-[1.05] md:text-[64px]"
            />
            <Reveal delay={0.2}>
              <p className="mx-auto mt-5 max-w-[460px] text-[16px] leading-relaxed text-white/90">
                Você paga o kit uma vez. Depois escolhe o plano mensal que cabe
                na sua fazenda.
              </p>
            </Reveal>
          </div>

          {/* Kit */}
          <Reveal className="mx-auto mt-14 max-w-[980px] rounded-[28px] bg-white p-6 text-ink md:p-10">
            <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
              <div>
                <div className="flex items-center gap-3">
                  <StarBadge />
                  <h3 className="font-display text-[32px] leading-none">Kit Agro+</h3>
                </div>
                <p className="mt-3 text-[14px] text-ink-soft">
                  Tudo o que você precisa para medir o solo. Pagamento único.
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {KIT.itens.map((item) => (
                    <CheckItem key={item}>{item}</CheckItem>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col justify-between rounded-[22px] bg-smoke p-6">
                <div>
                  <span className="text-[11px] font-semibold tracking-[0.08em] text-blue uppercase">
                    Preço de lançamento
                  </span>
                  <p className="mt-4 text-[14px] text-ink-soft line-through">
                    De R$ {KIT.precoOriginal}
                  </p>
                  <p className="font-display text-[52px] leading-none">
                    R$ {KIT.precoLancamento}
                  </p>
                  <p className="mt-1 text-[13px] text-ink-soft">à vista</p>
                </div>
                <div className="mt-6">
                  <div className="flex justify-between text-[12px]">
                    <span className="font-semibold">
                      Restam {KITS_RESTANTES} de {KITS_LANCAMENTO} kits
                    </span>
                    <span className="text-ink-soft">neste preço</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-white ring-1 ring-black/5">
                    <div
                      className="h-2 rounded-full bg-leaf"
                      style={{ width: `${Math.max(6, (vendidos / KITS_LANCAMENTO) * 100)}%` }}
                    />
                  </div>
                  <p className="mt-2 text-[12px] text-ink-soft">
                    Depois dos {KITS_LANCAMENTO} primeiros, volta para R$ {KIT.precoOriginal}.
                  </p>
                  <CtaLink href={CTA.reservar} className="mt-5 w-full">
                    Reservar meu kit
                  </CtaLink>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="my-10 flex items-center justify-center gap-3 text-white">
            <span className="grid size-9 place-items-center rounded-full bg-white/20 ring-1 ring-white/30 backdrop-blur">
              <Plus className="size-4" />
            </span>
            <span className="text-[15px] font-medium">Escolha seu plano mensal</span>
          </Reveal>

          {/* Planos */}
          <div className="mx-auto grid max-w-[980px] items-start gap-5 md:grid-cols-3">
            {PLANOS.map((p, i) => (
              <Reveal
                key={p.nome}
                delay={i * 0.08}
                className={cn(
                  "relative rounded-[28px] bg-white p-6 text-ink md:p-7 transition-[scale,background-color,box-shadow] duration-300 ease-out hover:scale-[1.04] hover:z-10 hover:bg-[#eef2f8]",
                  p.destaque
                    ? "md:-mt-4 md:shadow-[0_30px_60px_-20px_rgba(0,30,90,0.45)] ring-2 ring-blue"
                    : "md:mt-6",
                )}
              >
                {p.destaque && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue px-3 py-1 text-[11px] font-semibold text-white">
                    Recomendado
                  </span>
                )}
                <div className="flex items-center gap-3">
                  <StarBadge />
                  <h3 className="font-display text-[26px] leading-none">{p.nome}</h3>
                </div>
                <p className="mt-6 flex items-baseline gap-1">
                  <span className="font-display text-[44px] leading-none">R$ {p.preco}</span>
                  <span className="text-[14px] text-ink-soft">/mês</span>
                </p>
                <p className="mt-2 text-[14px] text-ink-soft">{p.resumo}</p>
                <p className="mt-6 text-[14px] font-semibold">Inclui:</p>
                <ul className="mt-3 space-y-3">
                  {p.itens.map((item) => (
                    <CheckItem key={item}>{item}</CheckItem>
                  ))}
                </ul>
                <CtaLink
                  href={CTA.plano(p.nome)}
                  variant={p.destaque ? "blue" : "dark"}
                  className="mt-8 w-full"
                >
                  Reservar com este plano
                </CtaLink>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
