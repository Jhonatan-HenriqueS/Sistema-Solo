import Image from "next/image";
import { CTA } from "@/lib/site";
import { CtaLink, Eyebrow, Heading, Reveal } from "./primitives";
import { ClassificacaoCard, NutrientesCard, UmidadeCard } from "./dashboard-cards";

export function Hero() {
  return (
    <section id="topo" className="p-3">
      <div className="relative isolate min-h-[840px] overflow-hidden rounded-[28px] md:h-[min(100svh,900px)] md:min-h-[820px]">
        <Image
          src="/images/hero-campo.webp"
          alt="Lavoura em linhas sob céu azul"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-top"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0b3fa8]/65 via-[#0b3fa8]/35 via-55% to-transparent" />

        <div className="mx-auto flex max-w-[880px] flex-col items-center px-4 pt-32 text-center text-white md:pt-36">
          <Reveal>
            <Eyebrow tone="glass">Do campo para o celular</Eyebrow>
          </Reveal>
          <Heading
            as="h1"
            text="O solo da sua fazenda na *palma da mão*"
            className="mt-6 text-[44px] leading-[1.05] tracking-[-0.03em] md:text-[76px]"
          />
          <Reveal delay={0.3}>
            <p className="mx-auto mt-6 max-w-[560px] text-[16px] leading-relaxed text-white [text-shadow:0_1px_12px_rgba(0,20,80,0.45)] md:text-[17px]">
              Sem ir ao laboratório e sem esperar semanas. Você mesmo mede o solo
              e vê no celular se ele está bom ou ruim. Até sem internet.
            </p>
          </Reveal>
          <Reveal delay={0.4} className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <CtaLink href={CTA.reservar}>Reservar meu kit</CtaLink>
            <CtaLink href="#como-funciona" variant="light">
              Como funciona
            </CtaLink>
          </Reveal>
        </div>

        {/* Cards do app sobrepostos, como na referência: o do meio na frente e os laterais inclinados atrás. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-10 items-end justify-center px-4 md:[zoom:1.2] lg:[zoom:1.32]">
          <Reveal delay={0.6} className="group/card pointer-events-auto relative z-0 -mr-6 mb-6 hidden w-[250px] hover:z-20 md:block">
            <div className="-rotate-6 transition-[scale] duration-300 ease-out group-hover/card:scale-[1.05]">
              <NutrientesCard className="pb-10" />
            </div>
          </Reveal>
          <Reveal delay={0.5} className="group/card pointer-events-auto relative z-10 w-[280px] hover:z-20 md:w-[290px]">
            <UmidadeCard className="pb-10 transition-[scale,background-color] duration-300 ease-out group-hover/card:scale-[1.05] shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_24px_48px_-12px_rgba(16,24,40,0.35)]" />
          </Reveal>
          <Reveal delay={0.7} className="group/card pointer-events-auto relative z-0 -ml-6 mb-6 hidden w-[250px] hover:z-20 md:block">
            <div className="rotate-6 transition-[scale] duration-300 ease-out group-hover/card:scale-[1.05]">
              <ClassificacaoCard className="pb-10" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
