import Image from "next/image";
import { CTA, KIT, KITS_LANCAMENTO, KITS_RESTANTES } from "@/lib/site";
import { CtaLink, Eyebrow, Heading, Reveal } from "./primitives";

export function FinalCta() {
  return (
    <section className="p-3">
      <div className="relative isolate overflow-hidden rounded-[28px] px-4 pt-24 pb-44 text-center text-white md:pb-56">
        <Image
          src="/images/campo-por-do-sol.webp"
          alt=""
          fill
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0b3fa8]/85 via-[#0b3fa8]/50 to-[#0b3fa8]/10" />
        <Reveal className="flex justify-center">
          <Eyebrow tone="glass">Garanta o seu</Eyebrow>
        </Reveal>
        <Heading
          text="Imagine saber, *na hora,* como está sua terra"
          className="mx-auto mt-6 max-w-[820px] text-[42px] leading-[1.05] md:text-[68px]"
        />
        <Reveal delay={0.2}>
          <p className="mx-auto mt-5 max-w-[500px] text-[16px] leading-relaxed text-white/90">
            Sem esperar o laboratório. Sem adubar no chute. Sem depender de sinal.
            Só {KITS_LANCAMENTO} kits saem pelo preço de lançamento.
          </p>
        </Reveal>
        <Reveal delay={0.3} className="mt-8 flex flex-col items-center gap-3">
          <CtaLink href={CTA.reservar}>Reservar meu kit</CtaLink>
          <span className="text-[13px] text-white/80">
            Restam {KITS_RESTANTES} de {KITS_LANCAMENTO} no preço de lançamento
          </span>
        </Reveal>

        <Reveal
          delay={0.4}
          className="mx-auto mt-14 max-w-[620px] rounded-[22px] bg-white/15 p-5 text-left text-[14px] leading-relaxed ring-1 ring-white/25 backdrop-blur-md md:p-6"
        >
          <strong className="font-semibold">PS:</strong> o Agro+ mede N, P, K e
          umidade na sua terra e mostra no celular, mesmo sem internet. Os{" "}
          {KITS_LANCAMENTO} primeiros pagam R$ {KIT.precoLancamento} em vez de R${" "}
          {KIT.precoOriginal}. E antes de decidir, você testa de graça com a
          nossa equipe.
        </Reveal>
      </div>
    </section>
  );
}
